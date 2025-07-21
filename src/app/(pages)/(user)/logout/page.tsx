"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Loading from "@/app/loading";

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuthStore();

  useEffect(() => {
    document.cookie = "jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    localStorage.removeItem("jwt");
    localStorage.removeItem("memberId");
    localStorage.removeItem("isAdmin");

    logout();

    window.dispatchEvent(new Event("member:changed"));
    router.push("/");
  }, [router, logout]);

  return <Loading />;
}
