-- Keep existing profile values readable while allowing MILITARY for new onboarding.
BEGIN;

ALTER TABLE user_profiles
DROP CONSTRAINT IF EXISTS user_profiles_study_profile_check;

ALTER TABLE user_profiles
ADD CONSTRAINT user_profiles_study_profile_check
CHECK (study_profile IN (
    'MATH_INFO',
    'MATH_INFO_INTENSIVE',
    'NATURAL_SCIENCES',
    'OTHER',
    'MILITARY'
));

COMMIT;
