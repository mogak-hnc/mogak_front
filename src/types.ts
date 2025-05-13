export interface MainZoneProps {
  tagNames: string[];
  name: string;
  memberImageUrls: string[] | null[];
}

export interface MainChallengeProps {
  official: boolean;
  title: string;
  memberImageUrls: string[] | null[];
  startDate: number[];
  endDate: number[];
}

export interface SubCardProps {
  mogakZoneMainResponses: MainZoneProps[];
  mogakChallengeResponses: MainChallengeProps[];
}

export interface ChallengeHeaderProps {
  title: string;
  description: string;
  creatorMemberId: number;
  startDate: string;
  endDate: string;
}

export interface ChallengeProofGridProps {
  proofImages: string[];
}

export interface UserProfile {
  id: string;
  nickname: string;
  bio: string;
  affiliation: string;
  profileImage: string;
  showBadges: boolean;
  badges?: string[];
  challenges?: string[];
  zones?: string[];
}

export interface ChallengeSurvivorsProps {
  avatars: string[];
  extraCount?: number;
}

export interface AdvicePreviewCardProps {
  title: string;
  commentCount: number;
  restTime: number[];
  worryId: number;
}

export type ChallengeForm = {
  name: string;
  description: string;
  ownerOnly: boolean;
  startDate: string;
  endDate: string;
};

export interface ChallengeCreateFormProps {
  isAdmin?: boolean;
  onSubmit?: (data: ChallengeForm & { isOfficial: boolean }) => void;
}

export interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

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

export interface ChatMessage {
  id: number;
  user: string;
  time: string;
  message: string;
  isMe: boolean;
  avatar: string;
}

export interface ChatUiProps {
  messages: ChatMessage[];
}

export interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

export interface MainCardProps {
  type: string;
  title: string;
  description1: string;
  description2?: string;
  button: string;
  buttonUrl: string;
  img1?: string;
  img2?: string;
  img3?: string;
  bgImageLight: string;
  bgImageDark: string;
}

export interface MainSubCardProps {
  type: "studySpace" | "challenge";
  tag?: string;
  title: string;
  participants: (string | null)[];
  description?: string;
  isOfficial?: boolean;
}

export interface SearchCardProps {
  type: "studySpace" | "challenge";
  title: string;
  description: string;
  tags: string[];
  sort: string;
  section: string;
}

export type StatusType = "공부 중" | "자리비움" | "오프라인";

export interface ZoneCardProps {
  memberId: number;
  image?: string;
  nickname: string;
  role?: string;
  status: StatusType;
}

export interface FormGroupProps {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface ZoneDetailMemberProps {
  memberId: number;
  nickname: string;
  status: string;
  image: string;
}

export interface CommentProps {
  id: number;
  message: string;
  time: string;
  isMe: boolean;
}

export interface ZoneFormProps {
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

export interface ZoneDetailProps {
  mogakZoneId: number;
  name: string;
  maxCapacity: number;
  imageUrl: string;
  password: string;
  chatEnabled: boolean;
  loginRequired: boolean;
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
