export default function ZoneHeaderSkeleton() {
  return (
    <div className="relative w-full min-h-[180px] rounded-xl overflow-hidden animate-pulse mb-6">
      <div className="absolute inset-0 z-0" />

      <div className="relative z-10 px-6 py-8 space-y-3">
        <div className="w-24 h-6 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="w-1/2 h-8 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="w-1/3 h-4 bg-gray-300 dark:bg-gray-700 rounded" />

        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-20 h-8 bg-gray-300 dark:bg-gray-700 rounded"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
