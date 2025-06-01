import { TagsProps } from "./shared.type";

export interface ChallengeHeaderProps {
  title: string;
  description: string;
  creatorMemberId: number;
  startDate: string;
  endDate: string;
  official: boolean;
  totalParticipants: number;
  status: ChallengeStatusType;
}

export interface ChallengeProofGridProps {
  proofImages: string[];
}

export interface ChallengeSurvivorsProps {
  avatars: string[];
  extraCount?: number;
}

export type ChallengeForm = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
};

export interface ChallengeCreateFormProps {
  isAdmin?: boolean;
  onSubmit?: (data: ChallengeForm & { isOfficial: boolean }) => void;
}

export interface ChallengeMainProps {
  challengeId: number;
  title: string;
  participants: (string | null)[];
  description: string;
  official: boolean;
  status: ChallengeStatusType;
}

export interface ChallengeSearchCardProps {
  title: string;
  description: string;
  tags: TagsProps[];
  sort: string;
  section: string;
}

export interface ChallengeSearchRequest {
  search: string;
  official: boolean;
  sort: string;
  page: number;
  size: number;
  status: ChallengeStatusType;
}

export interface ChallengeMainResponse {
  challengeId: number;
  title: string;
  participants: (string | null)[];
  official: boolean;
  startDate: number[];
  endDate: number[];
}

export interface ChallengeSearchContentResponse {
  challengeId: number;
  title: string;
  memberImageUrl: (string | null)[];
  description: string;
  official: boolean;
  startDate: number[];
  endDate: number[];
  status: ChallengeStatusType;
}

export interface ChallengeSearchResponse {
  content: ChallengeSearchContentResponse[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
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

export interface ChallengePageProps {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export type ChallengeStatusType = "BEFORE" | "ONGOING" | "COMPLETED";

export interface ChallengeDetailSummaryProps {
  challengeId: string;
  official: boolean;
  title: string;
  startDate: number[];
  endDate: number[];
  totalParticipants: number;
  survivorCount: number;
  memberImageList: string[];
  challengeOwnerId: number;
  status: ChallengeStatusType;
  joined: boolean;
}

export interface ChallengeDetileResponse {
  official: boolean;
  title: string;
  startDate: number[];
  endDate: number[];
  totalParticipants: number;
  survivorCount: number;
  memberImageList: string[];
  challengeArticlesThumbnail: string[];
  challengeOwnerId: number;
  status: ChallengeStatusType;
  joined: boolean;
}

export interface ChallengeCreateInput {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface ChallengeCreateRequest {
  title: string;
  description: string;
  period: string;
}

export interface ChallengeCreateResponse {
  challengeId: number;
  title: string;
  description: string;
  createMemberId: number;
  startDate: string;
  endDate: string;
  official: boolean;
}

export interface ChallengeProofPostRequest {
  challengeId: string;
  title: string;
  images: File;
}
