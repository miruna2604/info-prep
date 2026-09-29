from sqlalchemy.orm import Session

from app.database.schemas.user import User
from app.database.schemas.user_profile import UserProfile
from app.models.onboarding import AssessmentStatus, OnboardingRequest
from app.services.assessment_state import initial_status


def get_user_profile(db: Session, user_id: int) -> UserProfile | None:
    return db.query(UserProfile).filter(UserProfile.user_id == user_id).one_or_none()


def save_onboarding(db: Session, user: User, onboarding: OnboardingRequest) -> UserProfile:
    profile = get_user_profile(db, user.id)

    if profile is None:
        profile = UserProfile(user_id=user.id)
        db.add(profile)

    profile.grade = onboarding.grade.value
    profile.study_profile = onboarding.study_profile.value
    profile.self_assessment = onboarding.self_assessment.value
    profile.onboarding_completed = True

    db.commit()
    db.refresh(profile)
    return profile


def defer_initial_assessment(db: Session, user: User) -> UserProfile | None:
    db.query(User).filter(User.id == user.id).with_for_update().one()
    profile = get_user_profile(db, user.id)

    if profile is None or not profile.onboarding_completed:
        return None

    state = initial_status(db, user.id, profile)
    profile.assessment_status = state if state in ("COMPLETED", "IN_PROGRESS") else AssessmentStatus.DEFERRED.value
    db.commit()
    db.refresh(profile)
    return profile
