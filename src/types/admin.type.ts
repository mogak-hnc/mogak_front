export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  linkTo?: (row: T) => string;
}

export interface AdminTableProps<T> {
  columns: Column<T>[];
  data: T[];
}
