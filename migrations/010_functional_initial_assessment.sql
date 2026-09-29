BEGIN;

ALTER TABLE assessment_questions ADD COLUMN IF NOT EXISTS points INTEGER NOT NULL DEFAULT 0;
ALTER TABLE assessment_questions ADD COLUMN IF NOT EXISTS allow_not_learned BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE assessment_attempts ADD COLUMN IF NOT EXISTS question_snapshot JSON;
ALTER TABLE assessment_attempts ADD COLUMN IF NOT EXISTS result JSON;
ALTER TABLE assessment_answers ADD COLUMN IF NOT EXISTS evaluation JSON;

CREATE TABLE IF NOT EXISTS assessment_concepts (
    key VARCHAR(160) PRIMARY KEY,
    label VARCHAR(200) NOT NULL,
    chapter_slug VARCHAR(150),
    lesson_slug VARCHAR(150),
    prerequisites JSON NOT NULL DEFAULT '[]',
    planning_config JSON NOT NULL DEFAULT '{}'
);
CREATE TABLE IF NOT EXISTS personalized_plans (
    id SERIAL PRIMARY KEY,
    attempt_id INTEGER NOT NULL UNIQUE REFERENCES assessment_attempts(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    items JSON NOT NULL,
    context JSON NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS ix_personalized_plans_user_id ON personalized_plans(user_id);

COMMIT;
