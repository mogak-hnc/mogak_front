import { TagsProps } from "./shared.type";

export interface ZoneChatUiProps {
  messages: ChatHistoryResponse[];
}

export interface ZoneMainResponse {
  mogakZoneId: number;
  tagNames: string[];
  name: string;
  memberImageUrls: string[];
  passwordRequired: boolean;
}

export interface ZoneMainProps {
  mogakZoneId: number;
  tag?: string[];
  title: string;
  participants: (string | null)[];
  hasPwd: boolean;
}

export interface ZoneSearchCardProps {
  title: string;
  description: string;
  tags: TagsProps[];
  sort: string;
  section: string;
}

export interface ZoneUserCardStatusProps {
  zoneId: string;
  memberId: string;
  status: string;
  study: boolean;
  statusColor: string;
  translatedStatus: string;
}

export type StatusType = "공부 중" | "자리비움" | "오프라인";

export interface ZoneMemberCardProps {
  zoneId: string;
  memberId: number;
  image?: string;
  nickname: string;
  role?: string;
  status: string;
}

export interface ZoneCreateRequest {
  name: string;
  tag: string;
  maxCapacity: number;
  password: string;
  chatEnabled: boolean;
  passwordRequired: boolean;
}

export interface ZoneSettingProps {
  spaceName: string;
  tag: string;
  usePassword: boolean;
  password: string;
  useChat: boolean;
}

export interface ZoneCreateInput {
  spaceName: string;
  tag: string;
  capacity: number;
  password: string;
  usePassword: boolean;
  useChat: boolean;
  memberOnly: boolean;
  startDate: string;
  endDate: string;
}

export interface ZoneCreateResponse {
  mogakZoneId: number;
  name: string;
  maxCapacity: number;
  imageUrl: string;
  password: string;
  chatEnabled: boolean;
  startDate: string;
  endDate: string;
  tagNames: string[];
}

export interface ZoneSearchProps {
  search?: string;
  tag?: string;
  sort: string;
  page: number;
  size: number;
}

export interface ZoneStatusResponse {
  status: StatusType;
  memberId: string;
  mogakZoneId: string;
}

interface PageSort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
export interface ChatMessage {
  memberId: number;
  mogakZoneId: number | null;
  nickname: string;
  imageUrl: string;
  message: string;
  now: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ChatHistoryResponse {
  content: ChatMessage[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface ZoneDetailResponse {
  tagNames: string[];
  hostMemberId: string;
  name: string;
  startDate: number[];
  endDate: number[];
  joinedUserCount: number;
  imageUrl: string;
  zoneMemberInfoList: ZoneMemberInfo[];
  joined: boolean;
  passwordRequired: boolean;
  maxCapacity: number;
}

export interface ZoneHeaderProps {
  zoneId: string;
  tag: string[];
  name: string;
  hostId: string;
  joinedUserCount: number;
  imageUrl: string;
  joined: boolean;
  maxCapacity: number;
  hasPwd: boolean;
  onJoinSuccess: (b: boolean) => void;
}

export interface ZoneMemberInfo {
  memberId: number;
  nickname: string;
  imageUrl: string;
  status: "STUDYING" | "WAITING" | "DONE" | string;
}

export interface ZoneInOutButtonProps {
  zoneId: string;
  hostId: string;
  joined: boolean;
  hasPwd?: boolean;
}

export interface ZoneSearchResponse {
  content: MogakZone[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface MogakZone {
  mogakZoneId: number;
  name: string;
  tagNames: string[];
  memberImageUrls: string[];
  passwordRequired: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}
