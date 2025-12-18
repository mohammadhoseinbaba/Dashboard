import axios, { AxiosError } from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.toString() || "http://localhost:3000";

export const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // helpful if backend uses HttpOnly cookies (refresh token)
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Token handling (simple) ---
let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

// Attach Authorization header if token exists
http.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Optional: normalize errors
export function getApiErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const e = err as AxiosError<any>;
    return (
      e.response?.data?.message ||
      e.response?.data?.error ||
      e.message ||
      "Request failed"
    );
  }
  return "Request failed";
}
