export function ZoneMainCardSkeleton() {
  return (
    <div className="rounded-3xl p-4 shadow-md bg-white dark:bg-border-dark flex flex-col justify-between min-w-[280px] max-w-[320px] h-[180px] animate-pulse">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="w-12 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
        <div className="w-3/4 h-6 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>

      <div className="flex justify-between items-center pt-4">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 dark:bg-gray-700"
            />
          ))}
        </div>
        <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}
