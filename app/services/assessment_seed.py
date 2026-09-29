"""Idempotent assessment content import. Private grading data never enters public config."""
import json
from pathlib import Path

from app.database.schemas.assessment import Assessment, AssessmentQuestion, AssessmentConcept

CONTENT_PATH = Path(__file__).resolve().parents[2] / "content" / "assessments" / "initial.json"


def seed_initial_assessment(db):
    data = json.loads(CONTENT_PATH.read_text(encoding="utf-8"))
    assessment = db.query(Assessment).filter(Assessment.slug == "initial").one_or_none()
    if assessment is None:
        assessment = Assessment(slug="initial")
        db.add(assessment)
    assessment.title = data["title"]
    assessment.description = data["description"]
    assessment.is_published = True
    db.flush()
    for question in assessment.questions:
        question.is_active = False
    for item in data["questions"]:
        question = db.query(AssessmentQuestion).filter_by(
            assessment_id=assessment.id, display_order=item["order"]
        ).one_or_none()
        if question is None:
            question = AssessmentQuestion(assessment_id=assessment.id, display_order=item["order"])
            db.add(question)
        for field in ("prompt", "answer_type", "points", "allow_not_learned", "question_config", "concept_refs", "grading_config"):
            setattr(question, field, item[field])
        question.is_active = True
        question.grading_config = {**item["grading_config"], "content_version": data["version"]}
    for item in data["concepts"]:
        concept = db.get(AssessmentConcept, item["key"])
        if concept is None:
            concept = AssessmentConcept(key=item["key"])
            db.add(concept)
        for field in ("label", "chapter_slug", "lesson_slug", "prerequisites", "planning_config"):
            setattr(concept, field, item[field])
    db.flush()
