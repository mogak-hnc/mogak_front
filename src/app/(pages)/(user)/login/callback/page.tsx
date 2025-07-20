"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Loading from "@/app/loading";
import { useAuthStore } from "@/store/authStore";

export default function AuthCallbackPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { login } = useAuthStore();

  useEffect(() => {
    const memberId = params.get("memberId");
    const token = params.get("token");
    const next = params.get("next") || "/";

    if (memberId) {
      localStorage.setItem("memberId", memberId);
    }

    if (token) {
      localStorage.setItem("jwt", token);
      login(token);
    }

    window.dispatchEvent(new Event("member:changed"));
    router.replace(next);
  }, [params, router, login]);

  return <Loading />;
}
