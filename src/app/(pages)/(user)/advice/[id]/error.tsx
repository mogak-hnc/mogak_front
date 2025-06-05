"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] py-24 text-center text-error dark:text-error-dark">
      <h1 className="text-3xl font-bold mb-4">문제가 발생했어요</h1>
      <p className="text-sm">해당 고민을 찾을 수 없습니다.</p>
      <br />
      <Link href="/" className="underline">
        메인으로
      </Link>
    </div>
  );
}
