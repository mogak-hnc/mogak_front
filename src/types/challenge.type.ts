import { TagsProps } from "./shared.type";

export interface ChallengeHeaderProps {
  title: string;
  description: string;
  creatorMemberId: number;
  startDate: string;
  endDate: string;
  official: boolean;
  totalParticipants: number;
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
  ownerOnly: boolean;
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
  isOfficial: boolean;
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
  official: string;
  sort: string;
  page: number;
  size: number;
}

export interface ChallengeSearchResponse {
  content: ChallengeMainProps[];
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

export interface ChallengeDetileResponse {
  official: boolean;
  title: string;
  startDate: number[];
  endDate: number[];
  totalParticipants: number;
  survivorCount: number;
  memberImageList: string[];
  challengeArticlesThumbnail: string[];
}
