-- Assessment state only: no assessment attempts, scores, progress, or mastery.
BEGIN;

ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS assessment_status VARCHAR(20) NOT NULL DEFAULT 'NOT_STARTED';

ALTER TABLE user_profiles
DROP CONSTRAINT IF EXISTS user_profiles_assessment_status_check;

ALTER TABLE user_profiles
ADD CONSTRAINT user_profiles_assessment_status_check
CHECK (assessment_status IN ('NOT_STARTED', 'DEFERRED', 'IN_PROGRESS', 'COMPLETED'));

COMMIT;
