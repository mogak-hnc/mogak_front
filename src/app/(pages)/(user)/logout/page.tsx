"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    document.cookie = "jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    localStorage.removeItem("memberId");

    window.dispatchEvent(new Event("member:changed"));
    router.push("/");
  }, [router]);

  return <div>로그아웃 중입니다...</div>;
}
