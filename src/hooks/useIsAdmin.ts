import { useAuth } from "./useAuth";

export function useIsAdmin(): boolean {
  const { user } = useAuth();
  return user?.role === "ROLE_ADMIN";
}
