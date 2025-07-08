import { create } from "zustand";
import { JwtPayload } from "@/utils/client/decode-token.client.util";
import { decodeToken } from "@/utils/client/decode-token.client.util";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";

interface AuthState {
  isLoggedIn: boolean;
  jwt: string | null;
  user: JwtPayload | null;
  login: (jwt: string) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  jwt: null,
  user: null,
  login: (jwt) => {
    const decoded = decodeToken(jwt);
    if (!decoded) return;

    set({
      isLoggedIn: true,
      jwt,
      user: decoded,
    });
  },
  logout: () => {
    set({
      isLoggedIn: false,
      jwt: null,
      user: null,
    });
  },
  hydrate: () => {
    const jwt = getJwtFromCookie();
    console.log("[hydrate] jwt from cookie:", jwt);
    if (!jwt) return;

    const decoded = decodeToken(jwt);
    if (!decoded) return;

    set({
      isLoggedIn: true,
      jwt,
      user: decoded,
    });
  },
}));
