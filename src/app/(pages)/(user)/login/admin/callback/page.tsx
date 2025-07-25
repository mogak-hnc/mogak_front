"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Loading from "@/app/loading";

export default function AdminCallbackPage() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const admin = params.get("q");

    if (admin) {
      localStorage.setItem("isAdmin", "admin");
    }

    window.dispatchEvent(new Event("member:changed"));
    router.replace("/admin/zone");
  }, [params, router]);

  return <Loading />;
}
