const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL nu este configurat.");
}

type ApiErrorResponse = {
  detail?: string;
};

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${apiUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    let message = `Cererea a eșuat cu statusul ${response.status}.`;

    try {
      const errorData = (await response.json()) as ApiErrorResponse;

      if (errorData.detail) {
        message = errorData.detail;
      }
    } catch {
      // Dacă răspunsul nu este JSON, păstrăm mesajul general.
    }

    throw new ApiError(response.status, message);
  }

  return response.json() as Promise<T>;
}