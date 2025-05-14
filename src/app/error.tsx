"use client";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center text-error dark:text-error-dark">
      <h1 className="text-3xl font-bold mb-4">문제가 발생했어요</h1>
      <p className="text-sm">페이지를 불러오는 중 오류가 발생했습니다.</p>
    </div>
  );
}
