import { ChallengeStatusType } from "./challenge.type";

export interface MainResponse {
  mogakZoneMainResponses: PaginationResponse<MainZoneItem>;
  mogakChallengeResponses: PaginationResponse<MainChallengeItem>;
}

export interface PaginationResponse<T> {
  totalElements: number;
  totalPages: number;
  size: number;
  content: T[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface MainZoneItem {
  mogakZoneId: number;
  tagNames: string[];
  name: string;
  memberImageUrls: (string | null)[];
  passwordRequired: boolean;
}

export interface MainChallengeItem {
  challengeId: number;
  official: boolean;
  title: string;
  memberImageUrl: string[];
  startDate: number[];
  endDate: number[];
  status: ChallengeStatusType;
}
