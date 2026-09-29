"""Deterministic grading. Only safe summaries leave this module, never Judge0 output."""
import re
from decimal import Decimal, ROUND_HALF_UP

from fastapi import HTTPException

from app.services import judge0_service

# Tokenize before inspecting restrictions so comments, ==, <=, etc. cannot
# masquerade as declarations or assignments. Unknown syntax fails closed.
TOKEN = re.compile(
    r'\s+|//[^\n]*|/\*[\s\S]*?\*/|'
    r'0[xX][0-9a-fA-F]+[uUlL]*|0[bB][01]+[uUlL]*|'
    r'(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?[uUlLfF]*|'
    r'[A-Za-z_]\w*|<<=|>>=|\+\+|--|==|!=|<=|>=|&&|\|\||'
    r'\+=|-=|\*=|/=|%=|&=|\|=|\^=|<<|>>|[{}()\[\];?:,+*/%<>=!&|^~.\-]'
)
ASSIGNMENTS = {'=', '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '<<=', '>>=', '++', '--'}
CONTROL_WORDS = {'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'break', 'continue', 'true', 'false'}


def restriction_error(code: str, config: dict) -> str | None:
    if not config:
        return None
    tokens = []
    position = 0
    while position < len(code):
        match = TOKEN.match(code, position)
        if match is None:
            return 'Fragmentul poate folosi doar variabilele i, j, a, expresii și instrucțiuni de control, fără declarații.'
        token = match.group()
        position = match.end()
        if not token.isspace() and not token.startswith(('//', '/*')):
            tokens.append(token)
    identifiers = set(config.get('identifiers', [])) | CONTROL_WORDS
    if any(re.fullmatch(r'[A-Za-z_]\w*', token) and token not in identifiers for token in tokens):
        return 'Nu declara alte variabile. Sunt disponibile doar i, j și a.'
    if sum(token in ASSIGNMENTS for token in tokens) > config.get('max_assignments', 3):
        return 'Fragmentul completat depășește numărul maxim de trei atribuiri (inclusiv actualizări).'
    # Blocks must stay inside the harness, with no directives or escaped newlines.
    depth = 0
    for token in tokens:
        if token == '{':
            depth += 1
        elif token == '}':
            depth -= 1
            if depth < 0:
                return 'Acoladele fragmentului trebuie să fie echilibrate.'
    if depth:
        return 'Acoladele fragmentului trebuie să fie echilibrate.'
    return None


def compare_output(actual: str, expected, comparator: str) -> bool:
    if comparator == 'whitespace':
        return ' '.join(actual.split()) == ' '.join(str(expected).split())
    if comparator in ('integer_sequence', 'integer_set'):
        words = actual.split()
        if any(not re.fullmatch(r'[+-]?\d{1,20}', word) for word in words):
            return False
        values = [int(word) for word in words]
        return sorted(values) == sorted(expected) if comparator == 'integer_set' else values == expected
    raise HTTPException(503, 'Configurația corectării nu este disponibilă.')


def grade_answer(question: dict, answer) -> dict:
    config = question.get('grading_config') or {}
    result = {'outcome': answer.state, 'verdict': answer.state, 'earned_points': 0.0,
              'max_points': question['points'], 'passed_tests': 0, 'total_tests': 0,
              'feedback': '', 'explanation': config.get('explanation', '')}
    if question['answer_type'] in ('multiple_choice', 'output'):
        result['correct_answer'] = config.get('correct_answer')
    if answer.state != 'answered':
        result['feedback'] = ('Ai indicat că nu ai învățat încă acest concept.' if answer.state == 'not_learned'
                              else 'Nu ai trimis un răspuns pentru acest exercițiu.')
        return result
    text = answer.answer_data['text']
    if config.get('kind') in ('choice', 'output'):
        passed = (text == config['correct_answer'] if config['kind'] == 'choice'
                  else compare_output(text, config['correct_answer'], config.get('normalization', 'whitespace')))
        result.update(outcome='correct' if passed else 'incorrect', verdict='accepted' if passed else 'wrong_answer',
                      earned_points=float(question['points']) if passed else 0.0)
        return result
    if config.get('kind') != 'judge0' or not config.get('tests') or '{{CODE}}' not in config.get('harness', ''):
        raise HTTPException(503, 'Configurația corectării nu este disponibilă. Răspunsurile sunt salvate.')
    tests = config['tests']
    result['total_tests'] = len(tests)
    error = restriction_error(text, config.get('restrictions', {}))
    if error:
        result.update(outcome='incorrect', verdict='constraint_violation', feedback=error)
        return result
    source = config['harness'].replace('{{CODE}}', text)
    failures = []
    for test in tests:
        try:
            judged = judge0_service.execute_submission(source, stdin=test['stdin'], limits=config.get('limits', {
                'cpu_time_limit': 2, 'wall_time_limit': 5, 'memory_limit': 128000,
                'max_file_size': 64, 'enable_network': False,
            }))
        except HTTPException as error:
            raise HTTPException(503, 'Serviciul de corectare nu este disponibil momentan. Răspunsurile sunt salvate; încearcă din nou.') from error
        status = judged.status.id
        if status in (1, 2, 13) or status not in range(3, 13):
            raise HTTPException(503, 'Corectarea nu este disponibilă momentan. Răspunsurile sunt salvate; poți retrimite evaluarea.')
        if status == 6:
            result.update(outcome='compilation_error', verdict='compilation_error',
                          feedback='Codul nu compilează în contextul cerinței. Verifică sintaxa, numele și variabilele disponibile.')
            return result
        passed = status == 3 and compare_output(judged.stdout or '', test['expected'], config['comparator'])
        if passed:
            result['passed_tests'] += 1
        else:
            failures.append('time_limit_exceeded' if status == 5 else 'runtime_error' if status >= 7 else 'wrong_answer')
    passed, total = result['passed_tests'], result['total_tests']
    fraction = Decimal(passed) / Decimal(total) if config.get('partial_credit') else Decimal(passed == total)
    result['earned_points'] = float((Decimal(question['points']) * fraction).quantize(Decimal('.01'), rounding=ROUND_HALF_UP))
    result['outcome'] = 'correct' if passed == total else 'partial' if passed else 'incorrect'
    result['verdict'] = 'accepted' if passed == total else failures[0]
    result['feedback'] = f'{passed} din {total} teste trecute.'
    if 'time_limit_exceeded' in failures:
        result['feedback'] += ' Unele rulări au depășit limita de timp.'
    if 'runtime_error' in failures:
        result['feedback'] += ' Unele rulări s-au oprit cu o eroare de execuție.'
    return result
