"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeaderNavigation() {
  const [memberId, setMemberId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<string | null>(null);

  const syncLoginStatus = () => {
    setMemberId(localStorage.getItem("memberId"));
    setIsAdmin(localStorage.getItem("isAdmin"));
  };

  useEffect(() => {
    syncLoginStatus();

    window.addEventListener("member:changed", syncLoginStatus);

    return () => {
      window.removeEventListener("member:changed", syncLoginStatus);
    };
  }, []);

  const pathname = usePathname();

  const navItems = [
    { href: "/zone", label: "모각존" },
    { href: "/challenge", label: "모각챌" },
    { href: "/advice", label: "커뮤니티" },
    ...(isAdmin
      ? [
          { href: "/admin/zone", label: "관리자" },
          { href: "/logout", label: "로그아웃" },
        ]
      : memberId
      ? [
          { href: `/profile/${memberId}`, label: "프로필" },
          { href: "/logout", label: "로그아웃" },
        ]
      : [{ href: "/login", label: "로그인" }]),
  ];

  return (
    <nav className="flex gap-6 items-center">
      {navItems.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`text-sm ${
            pathname.startsWith(href)
              ? "font-bold text-primary"
              : "text-border-dark dark:text-borders hover:text-primary transition-colors"
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
