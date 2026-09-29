export type Grade = "GRADE_9" | "GRADE_10" | "GRADE_11" | "GRADE_12";

export type StudyProfile = "MATH_INFO" | "NATURAL_SCIENCES" | "MILITARY";

export type SelfAssessment = "BEGINNER" | "BASIC_WITH_GAPS" | "COMFORTABLE" | "ADVANCED";

export type AssessmentStatus = "NOT_STARTED" | "DEFERRED" | "IN_PROGRESS" | "COMPLETED";

export type OnboardingInput = {
  grade: Grade;
  studyProfile: StudyProfile;
  selfAssessment: SelfAssessment;
};

export type UserProfile = {
  id: number;
  grade: Grade | "GRADUATED";
  studyProfile: StudyProfile | "MATH_INFO_INTENSIVE" | "OTHER";
  selfAssessment: SelfAssessment;
  onboardingCompleted: boolean;
  assessmentStatus: AssessmentStatus;
};

export type OnboardingStatus = {
  onboardingCompleted: boolean;
  assessmentStatus: AssessmentStatus;
  profile: UserProfile | null;
};
