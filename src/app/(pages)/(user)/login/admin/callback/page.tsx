"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Loading from "@/app/loading";

export default function AdminCallbackPage() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const role = params.get("q");

    if (role === "admin") {
      localStorage.setItem("isAdmin", "admin");
      window.dispatchEvent(new Event("member:changed"));
      router.replace("/admin/zone");
    } else if (role === "user") {
      localStorage.removeItem("isAdmin");
      localStorage.setItem("memberId", "3");
      window.dispatchEvent(new Event("member:changed"));
      router.replace("/");
    } else {
      router.replace("/login");
    }
  }, [params, router]);

  return <Loading />;
}
