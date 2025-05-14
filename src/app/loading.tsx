export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] py-24 text-center text-primary dark:text-primary-dark">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary dark:border-primary-dark mb-4"></div>
      <p className="text-sm">로딩 중입니다... 잠시만 기다려 주세요.</p>
    </div>
  );
}
