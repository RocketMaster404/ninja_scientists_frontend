import axios from "axios";
import { api } from "./client";

export interface User{
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type ApiResult =
  | { success: true; message: string }
  | { success: false; errors: string[] };

// Gör om backendens felformat till en lista med texter
function extractErrors(error: unknown): string[] {
  const fallback = ["Något gick fel. Försök igen."];

  if (!axios.isAxiosError(error)) return fallback;
  if (!error.response) return ["Kunde inte nå servern. Försök igen senare."];

  const data = error.response.data as { errors?: unknown; title?: unknown } | undefined;
  if (data && typeof data === "object") {
    const { errors, title } = data;

    // { errors: { Email: ["..."], Password: ["..."] } }
    if (errors && typeof errors === "object" && !Array.isArray(errors)) {
      return Object.values(errors).flat().map(String);
    }
    if (Array.isArray(errors)) return errors.map(String);
    if (typeof title === "string") return [title];
  }
  return fallback;
}

export async function registerUser(input: RegisterInput): Promise<ApiResult> {
  try {
    await api.post("/api/auth/register-user", input);
    return { success: true, message: "Registreringen lyckades" };
  } catch (error) {
    return { success: false, errors: extractErrors(error) };
  }
}

export async function login(email: string, password: string): Promise<ApiResult> {
  try {
    await api.post(
      "/api/auth/login",
      { email, password },
      { params: { useCookies: true } }
    );
    return { success: true, message: "Inloggningen lyckades" };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return { success: false, errors: ["Fel e-post eller lösenord."] };
    }
    return { success: false, errors: extractErrors(error) };
  }
}

// Vem är inloggad? Returnerar null om ingen är det (401)
export async function getMe(): Promise<User | null> {
  try {
    const response = await api.get<User>("/api/auth/me");
    return response.data;
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  try {
    await api.post("/api/auth/logout");
  } catch {
    // Ignorera: vi nollställer användaren i appen ändå
  }
}