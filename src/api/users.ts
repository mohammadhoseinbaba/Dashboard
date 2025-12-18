import { http } from "./http";
import type { MeResponse, UsersListResponse } from "./types";

export async function me(): Promise<MeResponse> {
  const res = await http.get<MeResponse>("/auth/me");
  return res.data;
}

export async function listUsers(): Promise<UsersListResponse> {
  // Typically boss/admin only
  const res = await http.get<UsersListResponse>("/users");
  return res.data;
}
