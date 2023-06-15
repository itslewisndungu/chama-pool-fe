"use client";

import { getCurrentUser, userLogin } from "@/lib/api/user";
import { LoginCredentials } from "@/types/LoginCredentials";
import { User } from "@/types/User";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  FC,
} from "react";

interface AuthContextType {
  user?: User;
  token?: string;
  state: "loading" | "loggedOut" | "loggedIn";
  error: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  login: (credentials: LoginCredentials) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

// Export the provider as we need to wrap the entire app with it
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<"loading" | "loggedIn" | "loggedOut">(
    "loggedOut"
  );
  const [token, setToken] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    // Run on page load when a user has not logged out
    setState("loading");
    const token = localStorage.getItem("token");

    if (token === null) {
      setState("loggedOut");
      return;
    }

    async function fetchUser(token: string) {
      try {
        const res: { member: User; token: string } = await getCurrentUser(
          token
        ).then(res => res.json());

        setState("loggedIn");
        setUser(res.member);
        setToken(res.token);
      } catch (e) {
        setError("Credentials have expired. Please log in again");
        setToken(undefined);
      }
    }

    fetchUser(token);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState("loading");
    setError(null);

    try {
      const res = await userLogin(credentials);
      const { member, token }: { member: User; token: string } =
        await res.json();

      setUser(member);
      setToken(token);
      setState("loggedIn");
      localStorage.setItem("token", token);
    } catch (e) {
      setError("Invalid username or password");
      setState("loggedOut");
    }
  }, []);

  const logout = useCallback(async () => {
    setState("loading");
    setUser(undefined);
    setToken(undefined);
    localStorage.removeItem("token");
    setState("loggedOut");
    router.push("/login");
  }, [router]);

  const memoedValue = useMemo(
    () => ({
      user,
      state,
      error,
      login,
      logout,
      setUser,
      token,
      setToken,
    }),
    [user, state, error, login, logout, token]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};
