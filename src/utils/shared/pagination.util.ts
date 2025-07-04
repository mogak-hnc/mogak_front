export interface PaginationInfo {
  page: number;
  size: number;
  totalPages: number;
}

export function createPageRange(
  current: number,
  total: number,
  delta = 2
): number[] {
  const range = [];

  const start = Math.max(0, current - delta);
  const end = Math.min(total - 1, current + delta);

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
}
