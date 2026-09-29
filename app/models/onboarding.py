from enum import Enum
from typing import Literal

from pydantic import BaseModel, ConfigDict


class Grade(str, Enum):
    GRADE_9 = "GRADE_9"
    GRADE_10 = "GRADE_10"
    GRADE_11 = "GRADE_11"
    GRADE_12 = "GRADE_12"


class StudyProfile(str, Enum):
    MATH_INFO = "MATH_INFO"
    NATURAL_SCIENCES = "NATURAL_SCIENCES"
    MILITARY = "MILITARY"


class SelfAssessment(str, Enum):
    BEGINNER = "BEGINNER"
    BASIC_WITH_GAPS = "BASIC_WITH_GAPS"
    COMFORTABLE = "COMFORTABLE"
    ADVANCED = "ADVANCED"


class AssessmentStatus(str, Enum):
    NOT_STARTED = "NOT_STARTED"
    DEFERRED = "DEFERRED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"


class OnboardingRequest(BaseModel):
    grade: Grade
    study_profile: StudyProfile
    self_assessment: SelfAssessment


class UserProfileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    grade: Grade | Literal["GRADUATED"]
    study_profile: StudyProfile | Literal["MATH_INFO_INTENSIVE", "OTHER"]
    self_assessment: SelfAssessment
    onboarding_completed: bool
    assessment_status: AssessmentStatus


class OnboardingStatusResponse(BaseModel):
    onboarding_completed: bool
    assessment_status: AssessmentStatus
    profile: UserProfileResponse | None


class AssessmentStatusResponse(BaseModel):
    assessment_status: AssessmentStatus
