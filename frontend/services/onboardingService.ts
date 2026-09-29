import { apiFetch } from "./api";
import type { AssessmentStatus, OnboardingInput, OnboardingStatus, UserProfile } from "../types/onboarding";

type UserProfileApiResponse = {
  id: number;
  grade: UserProfile["grade"];
  study_profile: UserProfile["studyProfile"];
  self_assessment: UserProfile["selfAssessment"];
  onboarding_completed: boolean;
  assessment_status: AssessmentStatus;
};

type OnboardingStatusApiResponse = {
  onboarding_completed: boolean;
  assessment_status: AssessmentStatus;
  profile: UserProfileApiResponse | null;
};

function mapUserProfile(response: UserProfileApiResponse): UserProfile {
  return {
    id: response.id,
    grade: response.grade,
    studyProfile: response.study_profile,
    selfAssessment: response.self_assessment,
    onboardingCompleted: response.onboarding_completed,
    assessmentStatus: response.assessment_status,
  };
}

export async function getOnboardingStatus(): Promise<OnboardingStatus> {
  const response = await apiFetch<OnboardingStatusApiResponse>("/onboarding/me");
  return {
    onboardingCompleted: response.onboarding_completed,
    assessmentStatus: response.assessment_status,
    profile: response.profile ? mapUserProfile(response.profile) : null,
  };
}

export async function deferInitialAssessment(): Promise<AssessmentStatus> {
  const response = await apiFetch<{ assessment_status: AssessmentStatus }>(
    "/onboarding/assessment/defer",
    { method: "POST" },
  );
  return response.assessment_status;
}

export async function completeOnboarding(input: OnboardingInput): Promise<UserProfile> {
  const response = await apiFetch<UserProfileApiResponse>("/onboarding", {
    method: "PUT",
    body: JSON.stringify({
      grade: input.grade,
      study_profile: input.studyProfile,
      self_assessment: input.selfAssessment,
    }),
  });
  return mapUserProfile(response);
}
