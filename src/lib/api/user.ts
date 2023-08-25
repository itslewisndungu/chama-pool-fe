import { LoginCredentials } from "@/types/LoginCredentials";
import { getEndpointPath } from "@/lib/utils";

export async function userLogin(credentials: LoginCredentials) {
  const loginRequest = new Request(getEndpointPath(`/auth/login`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return fetch(loginRequest);
}

export async function getCurrentUser(token: string) {
  const req = new Request(getEndpointPath(`/auth/me`), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return fetch(req);
}
