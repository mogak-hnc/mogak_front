export default function UserCardSkeleton() {
  return (
    <div className="flex items-center p-4 w-fit animate-pulse">
      <div className="w-20 aspect-square rounded-full bg-gray-300 dark:bg-gray-700" />

      <div className="ml-4 flex flex-col justify-center">
        <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-600 rounded mb-2" />
        <div className="flex items-center gap-1 mt-1">
          <div className="h-4 w-4 bg-gray-300 dark:bg-gray-700 rounded-full" />
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
}
