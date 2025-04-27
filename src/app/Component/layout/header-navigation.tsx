"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNavigation() {
  const userId = 1;
  const pathname = usePathname();

  const navItems = [
    { href: "/zone", label: "모각존" },
    { href: "/challenge", label: "모각챌" },
    { href: "/advice", label: "커뮤니티" },
    { href: `/profile/${userId}`, label: "프로필" },
    userId
      ? { href: `/login/info/${userId}`, label: "회원정보" }
      : { href: "/login", label: "로그인" },
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
              : "text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
