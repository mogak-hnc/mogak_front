export interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  linkTo?: (row: any) => string;
}

export interface AdminTableProps {
  columns: Column[];
  data: any[];
}
