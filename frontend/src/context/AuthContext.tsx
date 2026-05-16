import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { authApi, getApiErrorMessage } from "@/services/api";
import type { User } from "@/types";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const persistSession = useCallback((nextToken: string, nextUser: User) => {
    localStorage.setItem("token", nextToken);
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const { data } = await authApi.me();
        setUser(data.data);
      } catch {
        logout();
      } finally {
        setIsLoading(false);
      }
    };
    void bootstrap();
  }, [token, logout]);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const { data } = await authApi.login({ email, password });
      persistSession(data.data.token, data.data.user);
    } catch (err) {
      setError(getApiErrorMessage(err));
      throw err;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setError(null);
      const { data } = await authApi.register({ name, email, password });
      persistSession(data.data.token, data.data.user);
    } catch (err) {
      setError(getApiErrorMessage(err));
      throw err;
    }
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      isAuthenticated: !!user && !!token,
      login,
      register,
      logout,
      error,
      clearError: () => setError(null),
    }),
    [user, token, isLoading, error, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
