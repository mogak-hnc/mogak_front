import { create } from "zustand";
import { persist } from "zustand/middleware";
import { JwtPayload } from "@/utils/client/decode-token.client.util";
import { decodeToken } from "@/utils/client/decode-token.client.util";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";

interface AuthState {
  isLoggedIn: boolean;
  jwt: string | null;
  user: JwtPayload | null;
  login: (jwt: string) => void;
  logout: () => void;
  restoreFromCookie: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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
      restoreFromCookie: () => {
        const currentJwt = getJwtFromCookie();
        if (!currentJwt) {
          return;
        }

        const decoded = decodeToken(currentJwt);
        if (!decoded) {
          return;
        }

        set({
          isLoggedIn: true,
          jwt: currentJwt,
          user: decoded,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
