"use client";

import { decodeToken, JwtPayload } from "@/utils/decode-token";
import { useEffect, useState } from "react";

interface AuthState {
  isLoggedIn: boolean;
  user: JwtPayload | null;
}

export function useAuth(): AuthState {
  const [auth, setAuth] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
  });

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jwt") : null;

    if (!token) {
      setAuth({ isLoggedIn: false, user: null });
      return;
    }

    const decoded = decodeToken(token);

    if (!decoded) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("memberId");
      setAuth({ isLoggedIn: false, user: null });
      return;
    }

    const now = Date.now() / 1000;
    if (decoded.exp < now) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("memberId");
      setAuth({ isLoggedIn: false, user: null });
      return;
    }

    setAuth({ isLoggedIn: true, user: decoded });
  }, []);

  return auth;
}
