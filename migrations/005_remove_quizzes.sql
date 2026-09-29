-- Apply to an existing database after deploying code without quiz models.
-- Quiz data is permanently removed when this migration is executed.
BEGIN;
DROP TABLE IF EXISTS quiz_options;
DROP TABLE IF EXISTS quiz_questions;
DROP TABLE IF EXISTS quizzes;
COMMIT;
