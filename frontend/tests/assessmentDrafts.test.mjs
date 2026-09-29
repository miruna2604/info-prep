import assert from 'node:assert/strict';
import test from 'node:test';
import { draftMatchesAnswer, restoreAssessmentDrafts } from '../lib/assessmentDrafts.ts';

const answer = { questionId: 1, state: 'answered', answerData: { text: 'c' } };
const attempt = { id: 1, assessmentId: 1, status: 'IN_PROGRESS', questions: [{ id: 1 }, { id: 2 }], answers: [answer] };
const draft = (text, notLearned = false) => ({ text, notLearned });
const cache = (value, base) => JSON.stringify({ version: 2, answers: { 1: { value, base } } });

test('unchanged server answers never become dirty on load', () => {
  const restored = restoreAssessmentDrafts(attempt, null);
  assert.equal(restored.drafts[1].text, 'c');
  assert.equal(restored.dirty.size, 0);
  assert.equal(draftMatchesAnswer(draft('c'), answer), true);
});

test('stale empty and stale nonempty drafts cannot overwrite a newer answer', () => {
  for (const value of [draft(''), draft('a')]) {
    const restored = restoreAssessmentDrafts(attempt, cache(value, null));
    assert.equal(restored.drafts[1].text, 'c');
    assert.equal(restored.dirty.size, 0);
    assert.equal(restored.discarded, true);
  }
});

test('unsaved edit can recover when its server baseline still matches', () => {
  const restored = restoreAssessmentDrafts(attempt, cache(draft('b'), answer));
  assert.equal(restored.drafts[1].text, 'b');
  assert.deepEqual([...restored.dirty], [1]);
});

test('an intentional clear recovers only against the unchanged saved answer', () => {
  const restored = restoreAssessmentDrafts(attempt, cache(draft(''), answer));
  assert.equal(restored.drafts[1].text, '');
  assert.deepEqual([...restored.dirty], [1]);
});

test('returning an edit to its server value is not dirty', () => {
  assert.equal(restoreAssessmentDrafts(attempt, cache(draft('c'), answer)).dirty.size, 0);
  assert.equal(draftMatchesAnswer(draft(''), undefined), true);
});

test('not learned is distinct from both unanswered and answered', () => {
  assert.equal(draftMatchesAnswer(draft('', true), undefined), false);
  assert.equal(draftMatchesAnswer(draft('c', true), answer), false);
  const restored = restoreAssessmentDrafts(attempt, cache(draft('c', true), answer));
  assert.equal(restored.drafts[1].notLearned, true);
  assert.deepEqual([...restored.dirty], [1]);
});

test('legacy, malformed and unrelated cached drafts are ignored safely', () => {
  for (const value of ['{', 'null', JSON.stringify({ 1: draft('a') }), JSON.stringify({ version: 2, answers: { 99: { value: draft('a'), base: null } } })]) {
    const restored = restoreAssessmentDrafts(attempt, value);
    assert.equal(restored.drafts[1].text, 'c');
    assert.equal(restored.dirty.size, 0);
  }
});
