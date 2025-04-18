export interface SubCardProps {
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
  nickname: string;
  bio: string;
  affiliation: string;
  profileImage: string;
  showBadges: boolean;
  badges?: string[];
}

export interface ChallengeSurvivorsProps {
  avatars: string[];
  extraCount?: number;
}

export interface AdvicePreviewCardProps {
  title: string;
  commentCount: number;
  timeLeftText: string;
  href: string;
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
  image: string;
  title: string;
  description1: string;
  description2?: string;
  button: string;
  buttonUrl: string;
}

export interface MainSubCardProps {
  type: "studySpace" | "challenge";
  tag: string;
  title: string;
  participants: string[];
  description?: string;
  isOfficial?: boolean;
}

export interface SearchCardProps {
  title: string;
  description: string;
  tags: string[];
  sort: string;
  section: string;
}

export type StatusType = "공부 중" | "자리비움" | "오프라인";

export interface ZoneCardProps {
  id: number;
  image: string;
  nickname: string;
  role?: string;
  state: StatusType;
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
