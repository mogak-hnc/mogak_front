import { TagsProps } from "./shared.type";

export interface ZoneChatProps {
  id: number;
  user: string;
  time: string;
  message: string;
  isMe: boolean;
  avatar: string;
}

export interface ZoneChatUiProps {
  messages: ZoneChatProps[];
}

export interface ZoneMainProps {
  tag?: string;
  title: string;
  participants: (string | null)[];
}

export interface ZoneSearchCardProps {
  title: string;
  description: string;
  tags: TagsProps[];
  sort: string;
  section: string;
}

export type StatusType = "공부 중" | "자리비움" | "오프라인";

export interface ZoneMemberCardProps {
  memberId: number;
  image?: string;
  nickname: string;
  role?: string;
  status: StatusType;
}

export interface ZoneCreateRequest {
  name: string;
  tag: string;
  maxCapacity: number;
  password: string;
  chatEnabled: boolean;
  period: string;
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
  search: string;
  tag: string;
  sort: string;
  page: number;
  size: number;
}

export interface ZoneDetailResponse {
  tagNames: string[];
  hostMemberId: number;
  name: string;
  startDate: number[];
  endDate: number[];
  joinedUserCount: number;
  imageUrl: string;
  zoneMemberInfoList: ZoneMemberInfo[];
  chatHistoryResponses: ChatHistoryResponse[];
}

export interface ZoneHeaderProps {
  tag: string;
  name: string;
  hostId: number;
  startDate: string;
  endDate: string;
  joinedUserCount: number;
  imageUrl: string;
}

export interface ZoneMemberInfo {
  memberId: number;
  nickname: string;
  imageUrl: string;
  status: "STUDYING" | "WAITING" | "DONE" | string;
}

export interface ChatHistoryResponse {
  memberId: number;
  mogakZoneId: number;
  nickname: string;
  imageUrl: string;
  message: string;
  now: string;
}
