// src/feature/Profile/api/profileApi.ts
import { api } from "../../../shared/api/client";
import type { MyProfileOverview } from "../types/profile";

export async function getMyProfile(): Promise<MyProfileOverview> {
  const response = await api.get<MyProfileOverview>("/api/me/meetups");
  return response.data;
}