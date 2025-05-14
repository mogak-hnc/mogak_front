"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

export function useRequireLogin() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      router.replace("/login");
    }
  }, [isLoggedIn]);
}
