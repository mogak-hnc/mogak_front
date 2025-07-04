"use client";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (nextPage: number) => void;
}

function createPageRange(current: number, total: number, delta = 2): number[] {
  const range = [];

  const start = Math.max(0, current - delta);
  const end = Math.min(total - 1, current + delta);

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
}

function classNames(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = createPageRange(page, totalPages);

  return (
    <div className="flex items-center justify-center mt-10 gap-2 text-sm select-none">
      <button
        className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-border-dark disabled:opacity-40"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 0}
      >
        이전
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={classNames(
            "px-3 py-1 border rounded hover:bg-primary/10",
            page === p
              ? "bg-primary text-white font-bold border-primary"
              : "text-gray-600 dark:text-gray-300"
          )}
        >
          {p + 1}
        </button>
      ))}

      <button
        className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-border-dark disabled:opacity-40"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages - 1}
      >
        다음
      </button>
    </div>
  );
}
