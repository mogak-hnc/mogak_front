"use client";

import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="fixed top-16 left-16 z-50 backdrop-blur px-3 py-1 rounded-md text-sm shadow-md hover:backdrop-blur-md"
    >
      ← 뒤로가기
    </button>
  );
}
