import { ProfileBadgeType } from "./profile.type";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  linkTo?: (row: T) => string;
}

export interface AdminTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export interface AdminBadgeProps {
  badgeId: number;
  name: string;
  description: string;
  iconUrl: string;
  badgeType: ProfileBadgeType;
}
