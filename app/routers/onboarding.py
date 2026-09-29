from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.schemas.user import User
from app.dependencies.auth import get_current_user
from app.models.onboarding import (
    OnboardingRequest,
    OnboardingStatusResponse,
    AssessmentStatus,
    AssessmentStatusResponse,
    UserProfileResponse,
)
from app.services.onboarding_service import defer_initial_assessment, get_user_profile, save_onboarding

from app.services.assessment_state import initial_status

router = APIRouter(prefix="/onboarding", tags=["onboarding"])


@router.get("/me", response_model=OnboardingStatusResponse)
def get_onboarding_status(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> OnboardingStatusResponse:
    db.query(User).filter(User.id == current_user.id).with_for_update().one()
    profile = get_user_profile(db, current_user.id)
    if profile is not None:
        profile.assessment_status = initial_status(db, current_user.id, profile)
        db.commit()
    return OnboardingStatusResponse(
        onboarding_completed=profile.onboarding_completed if profile else False,
        assessment_status=AssessmentStatus(profile.assessment_status) if profile else AssessmentStatus.NOT_STARTED,
        profile=UserProfileResponse.model_validate(profile) if profile else None,
    )


@router.put("", response_model=UserProfileResponse)
def complete_onboarding(
    onboarding: OnboardingRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> UserProfileResponse:
    profile = save_onboarding(db, current_user, onboarding)
    return UserProfileResponse.model_validate(profile)


@router.post("/assessment/defer", response_model=AssessmentStatusResponse)
def defer_assessment(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> AssessmentStatusResponse:
    profile = defer_initial_assessment(db, current_user)

    if profile is None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Onboarding must be completed before deferring the assessment",
        )

    return AssessmentStatusResponse(
        assessment_status=AssessmentStatus(profile.assessment_status),
    )
