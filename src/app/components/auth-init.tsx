"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";

export default function AuthInit() {
  const { login } = useAuthStore();

  useEffect(() => {
    const jwt = getJwtFromCookie();
    if (jwt) {
      login(jwt);
    } else {
      console.log("[AuthInit] 쿠키에 jwt 없음");
    }
  }, []);

  return null;
}
