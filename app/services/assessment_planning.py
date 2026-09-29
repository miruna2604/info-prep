"""Rule-based evidence and prerequisite-aware recommendations, separate from score."""
from collections import defaultdict

from app.database.schemas.assessment import AssessmentConcept, PersonalizedPlan
from app.database.schemas.chapter import Chapter
from app.database.schemas.lesson import Lesson


LABELS = {
    'strong_evidence': 'Ai arătat că te descurci cu acest concept în exercițiul evaluat.',
    'needs_review': 'Rezultatul sugerează că merită să consolidezi acest concept.',
    'not_learned': 'Ai indicat că acest concept nu a fost parcurs încă.',
    'inconclusive': 'Nu avem suficiente informații pentru o concluzie despre acest concept.',
}


def build_evidence(questions: list[dict], evaluations: dict[int, dict], catalog: dict) -> list[dict]:
    observations = defaultdict(list)
    for question in questions:
        for key in question['concept_refs']:
            observations[key].append({'question_id': question['id'], 'outcome': evaluations[question['id']]['outcome']})
    evidence = []
    for key, sources in observations.items():
        outcomes = {source['outcome'] for source in sources}
        if outcomes == {'not_learned'}:
            classification = 'not_learned'
        elif outcomes == {'correct'}:
            classification = 'strong_evidence'
        elif outcomes & {'incorrect', 'partial'}:
            classification = 'needs_review'
        else:
            classification = 'inconclusive'
        concept = catalog.get(key)
        evidence.append({'concept': key, 'label': concept.label if concept else key,
                         'classification': classification, 'sources': sources,
                         'explanation': LABELS[classification]})
    return evidence


def create_plan(db, attempt, profile, evidence: list[dict]) -> PersonalizedPlan:
    catalog = {concept.key: concept for concept in db.query(AssessmentConcept).all()}
    by_key = {entry['concept']: entry for entry in evidence}
    relevant = set(by_key)
    # Include prerequisite concepts even when no item directly assessed them.
    def include_dependencies(key):
        for dependency in catalog[key].prerequisites if key in catalog else []:
            if dependency not in relevant:
                relevant.add(dependency)
                include_dependencies(dependency)
    for key in list(relevant):
        include_dependencies(key)
    grade_value = profile.grade if profile else 'GRADE_12'
    grade = int(grade_value.split('_')[-1]) if grade_value.startswith('GRADE_') else 12
    study_profile = profile.study_profile if profile else 'OTHER'
    classifications = {key: by_key.get(key, {}).get('classification', 'inconclusive') for key in relevant}
    required_by = defaultdict(list)
    for key in sorted(relevant):
        for dependency in catalog[key].prerequisites if key in catalog else []:
            required_by[dependency].append(key)

    def ranking(key):
        config = catalog[key].planning_config if key in catalog else {}
        state = classifications[key]
        if state != 'strong_evidence' and (config.get('fundamental') or required_by[key]):
            tier = 0
        else:
            tier = {'not_learned': 1, 'needs_review': 2, 'inconclusive': 3, 'strong_evidence': 4}[state]
        return (tier, max(0, config.get('recommended_grade', grade) - grade),
                -config.get('profile_weights', {}).get(study_profile, 1), -config.get('bac_importance', 1), key)

    ordered = []
    remaining = set(relevant)
    while remaining:
        # Positive prerequisite evidence does not force a repetition before new work.
        available = [key for key in remaining if not any(
            dependency in remaining and classifications.get(dependency) != 'strong_evidence'
            for dependency in (catalog[key].prerequisites if key in catalog else [])
        )]
        # Deterministic fallback for a misconfigured cyclic graph: no hard locks.
        chosen = min(available or remaining, key=ranking)
        ordered.append(chosen)
        remaining.remove(chosen)

    routes = {}
    for chapter, lesson in db.query(Chapter, Lesson).join(Lesson, Lesson.chapter_id == Chapter.id).filter(
        Chapter.is_published.is_(True), Lesson.is_published.is_(True)
    ).all():
        if lesson.content and lesson.content.strip():
            routes[(chapter.slug, lesson.slug)] = f'/chapters/{chapter.slug}/lessons/{lesson.slug}'
    items = []
    for index, key in enumerate(ordered, 1):
        concept = catalog.get(key)
        state = classifications[key]
        reason = LABELS[state]
        if required_by[key] and state != 'strong_evidence':
            reason = 'Începe cu acest prerechizit: te ajută în conceptele următoare. ' + reason
        config = concept.planning_config if concept else {}
        if config.get('recommended_grade', 9) > grade:
            reason += ' Îl poți aborda treptat, după bazele recomandate pentru clasa ta.'
        items.append({'concept': key, 'label': concept.label if concept else key,
                      'chapter': concept.chapter_slug if concept else None,
                      'reason': reason, 'status': 'recommended', 'priority': index,
                      'classification': state,
                      'lesson_route': routes.get((concept.chapter_slug, concept.lesson_slug)) if concept else None})
    plan = PersonalizedPlan(attempt_id=attempt.id, user_id=attempt.user_id, items=items,
                            context={'grade': grade_value, 'study_profile': study_profile,
                                     'policy_version': 1, 'guidance': 'Ordinea ține cont de prerechizite, rezultatele evaluării, clasa și profilul tău. Este o recomandare; poți explora orice capitol.'})
    db.add(plan)
    return plan
