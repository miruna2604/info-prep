import { apiFetch } from "./api";

type UserApiResponse = {
  id: number;
  username: string;
  email: string;
  created_at: string;
};

export type AuthUser = {
  id: number;
  username: string;
  email: string;
  createdAt: string;
};

export type RegisterInput = {
  username: string;
  email: string;
  password: string;
};

function mapAuthUser(response: UserApiResponse): AuthUser {
  return {
    id: response.id,
    username: response.username,
    email: response.email,
    createdAt: response.created_at,
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