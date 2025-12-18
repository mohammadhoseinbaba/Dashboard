import { http, setAccessToken } from "./http";
import type { AuthResponse, LoginRequest, RegisterRequest } from "./types";

export async function register(payload: RegisterRequest): Promise<AuthResponse> {
  const res = await http.post<AuthResponse>("/auth/register", payload);
  setAccessToken(res.data.accessToken);
  return res.data;
}

export async function login(payload: LoginRequest): Promise<AuthResponse> {
  const res = await http.post<AuthResponse>("/auth/login", payload);
  setAccessToken(res.data.accessToken);
  return res.data;
}

export async function logout(): Promise<void> {
  // backend may clear cookies / invalidate refresh token
  await http.post("/auth/logout");
  setAccessToken(null);
}

// Optional helper if backend supports refreshing token
export async function refresh(): Promise<{ accessToken: string }> {
  const res = await http.post<{ accessToken: string }>("/auth/refresh");
  setAccessToken(res.data.accessToken);
  return res.data;
}
