const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL nu este configurat.");
}

type ValidationErrorDetail = {
  msg?: string;
};

type ApiErrorResponse = {
  detail?: string | ValidationErrorDetail[];
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

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${apiUrl}${path}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

  if (!response.ok) {
    let message = `Cererea a eșuat cu statusul ${response.status}.`;

    try {
      const errorData = (await response.json()) as ApiErrorResponse;

      if (typeof errorData.detail === "string") {
        message = errorData.detail;
      } else if (Array.isArray(errorData.detail)) {
        const firstValidationMessage = errorData.detail.find(
          (error) => error.msg,
        )?.msg;

        if (firstValidationMessage) {
          message = firstValidationMessage;
        }
      }
    } catch {
      // Dacă răspunsul nu este JSON, păstrăm mesajul general.
    }

    throw new ApiError(response.status, message);
  }

  return response.json() as Promise<T>;
}
