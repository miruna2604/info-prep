import { apiFetch } from "./api";

type UserApiResponse = {
  id: number;
  username: string;
  email: string;
  created_at: string;
  onboarding_completed: boolean;
};

export type AuthUser = {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  onboardingCompleted: boolean;
};

export type RegisterInput = {
  username: string;
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

function mapAuthUser(response: UserApiResponse): AuthUser {
  return {
    id: response.id,
    username: response.username,
    email: response.email,
    createdAt: response.created_at,
    onboardingCompleted: response.onboarding_completed,
  };
}

export async function registerUser(input: RegisterInput): Promise<AuthUser> {
  const response = await apiFetch<UserApiResponse>(
    "/auth/register",
    {
      method: "POST",
      body: JSON.stringify({
        username: input.username,
        email: input.email,
        password: input.password,
      }),
    },
  );

  return mapAuthUser(response);
}

export async function loginUser(input: LoginInput): Promise<AuthUser> {
  const response = await apiFetch<UserApiResponse>(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify({
        email: input.email,
        password: input.password,
      }),
    },
  );

  return mapAuthUser(response);
}

export async function getCurrentUser(): Promise<AuthUser> {
  const response = await apiFetch<UserApiResponse>("/auth/me");
  return mapAuthUser(response);
}

export async function logoutUser(): Promise<void> {
  await apiFetch<void>(
    "/auth/logout",
    {
      method: "POST",
    },
  );
}
