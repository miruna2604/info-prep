BEGIN;

CREATE TABLE IF NOT EXISTS assessments (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS assessment_questions (
    id SERIAL PRIMARY KEY,
    assessment_id INTEGER NOT NULL REFERENCES assessments(id),
    display_order INTEGER NOT NULL,
    prompt TEXT NOT NULL,
    answer_type VARCHAR(30) NOT NULL,
    question_config JSON NOT NULL DEFAULT '{}',
    concept_refs JSON NOT NULL DEFAULT '[]',
    grading_config JSON,
    CONSTRAINT uq_assessment_question_order UNIQUE (assessment_id, display_order)
);

CREATE TABLE IF NOT EXISTS assessment_attempts (
    id SERIAL PRIMARY KEY,
    assessment_id INTEGER NOT NULL REFERENCES assessments(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    status VARCHAR(20) NOT NULL DEFAULT 'IN_PROGRESS'
        CHECK (status IN ('IN_PROGRESS', 'SUBMITTED')),
    started_at TIMESTAMP NOT NULL DEFAULT NOW(),
    submitted_at TIMESTAMP,
    CONSTRAINT assessment_attempt_submission_consistency CHECK (
        (status = 'IN_PROGRESS' AND submitted_at IS NULL)
        OR (status = 'SUBMITTED' AND submitted_at IS NOT NULL)
    )
);

CREATE INDEX IF NOT EXISTS ix_assessment_attempts_user
    ON assessment_attempts (user_id, assessment_id, status);

CREATE TABLE IF NOT EXISTS assessment_answers (
    id SERIAL PRIMARY KEY,
    attempt_id INTEGER NOT NULL REFERENCES assessment_attempts(id),
    question_id INTEGER NOT NULL REFERENCES assessment_questions(id),
    state VARCHAR(20) NOT NULL CHECK (state IN ('answered', 'not_learned', 'unanswered')),
    answer_data JSON,
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_assessment_answer_question UNIQUE (attempt_id, question_id),
    CONSTRAINT assessment_answer_data_consistency CHECK (
        (state = 'answered' AND answer_data IS NOT NULL)
        OR (state <> 'answered' AND answer_data IS NULL)
    )
);

COMMIT;
