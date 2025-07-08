import { create } from "zustand";
import { JwtPayload } from "@/utils/client/decode-token.client.util";
import { decodeToken } from "@/utils/client/decode-token.client.util";

interface AuthState {
  isLoggedIn: boolean;
  jwt: string | null;
  user: JwtPayload | null;
  login: (jwt: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  jwt: null,
  user: null,
  login: (jwt) => {
    const decoded = decodeToken(jwt);
    if (!decoded) return;

    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("memberId", String(decoded.memberId));
    }

    set({
      isLoggedIn: true,
      jwt,
      user: decoded,
    });
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
      localStorage.removeItem("memberId");
    }

    set({
      isLoggedIn: false,
      jwt: null,
      user: null,
    });
  },
}));
