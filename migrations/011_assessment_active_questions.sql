-- Keep retired question rows for historical answers; new attempts use active rows.
BEGIN;
ALTER TABLE assessment_questions
ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE;
COMMIT;
