"use client";

import Link from "next/link";

export default function HeaderNavigation() {
  const userId = 1;

  return (
    <>
      <Link href="/zone">모각존</Link>
      <Link href="/challenge">모각챌</Link>
      <Link href="/advice">커뮤니티</Link>
      <Link href={`/profile/${userId}`}>프로필</Link>
      {userId ? (
        <Link href={`/login/info/${userId}`}>회원정보</Link>
      ) : (
        <Link href="/login">로그인</Link>
      )}
    </>
  );
}
