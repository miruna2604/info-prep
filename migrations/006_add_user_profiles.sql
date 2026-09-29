-- Adds educational onboarding data without changing existing user accounts.
BEGIN;

CREATE TABLE IF NOT EXISTS user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE REFERENCES users(id),
    grade VARCHAR(20) NOT NULL CHECK (grade IN ('GRADE_9', 'GRADE_10', 'GRADE_11', 'GRADE_12', 'GRADUATED')),
    study_profile VARCHAR(30) NOT NULL CHECK (study_profile IN ('MATH_INFO', 'MATH_INFO_INTENSIVE', 'NATURAL_SCIENCES', 'OTHER', 'MILITARY')),
    self_assessment VARCHAR(30) NOT NULL CHECK (self_assessment IN ('BEGINNER', 'BASIC_WITH_GAPS', 'COMFORTABLE', 'ADVANCED')),
    onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

COMMIT;
