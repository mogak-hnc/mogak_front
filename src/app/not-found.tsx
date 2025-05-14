export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center text-border-dark dark:text-borders">
      <h1 className="text-3xl font-bold mb-4">찾을 수 없는 페이지예요</h1>
      <p className="text-sm">잘못된 경로나 삭제된 페이지일 수 있어요.</p>
    </div>
  );
}
