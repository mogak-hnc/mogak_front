"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function AuthInit() {
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      useAuthStore.getState().login(jwt);
    }
  }, []);

  return null;
}
