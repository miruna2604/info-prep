"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ApiError } from "../../services/api";
import { getOnboardingStatus } from "../../services/onboardingService";

export function AssessmentRouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);

  useEffect(() => {
    let isCurrent = true;

    async function checkAccess() {
      try {
        const status = await getOnboardingStatus();

        if (!status.onboardingCompleted) {
          router.replace("/onboarding");
          return;
        }
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          router.replace("/login");
          return;
        }
      } finally {
        if (isCurrent) {
          setIsCheckingAccess(false);
        }
      }
    }

    void checkAccess();
    return () => { isCurrent = false; };
  }, [router]);

  if (isCheckingAccess) {
    return <main className="flex min-h-screen items-center justify-center bg-[#06101d] text-sm text-slate-400">Se pregătește evaluarea...</main>;
  }

  return <>{children}</>;
}
