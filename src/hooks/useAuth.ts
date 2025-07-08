import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const { isLoggedIn, user, jwt } = useAuthStore();
  return { isLoggedIn, user, jwt };
}
