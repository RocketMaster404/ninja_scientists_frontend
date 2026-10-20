import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getMe,
  login as loginRequest,
  logout as logoutRequest,
  type ApiResult,
  type User,
} from "../api/auth";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<ApiResult>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // När appen startar: fråga backend vem som är inloggad (cookien skickas med)
  useEffect(() => {
    getMe().then((me) => {
      setUser(me);
      setLoading(false);
    });
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<ApiResult> => {
    const result = await loginRequest(email, password);
    if (!result.success) return result;

    const me = await getMe();
    if (!me) {
      return {
        success: false,
        errors: ["Inloggningen lyckades men användaren kunde inte hämtas. Kontrollera att cookies är tillåtna."],
      };
    }

    setUser(me);
    return result;
  }, []);

  const logout = useCallback(async () => {
    await logoutRequest();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth måste användas inom en AuthProvider");
  return context;
}