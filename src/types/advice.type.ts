import { AdviceDuration } from "@/utils/shared/advice-duration.util";

export interface AdviceCardProps {
  title: string;
  restTime: number[];
  worryId: number;
}

export interface AdviceMainResponse {
  content: AdviceContentProps[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export type AdviceSearchResponse = AdviceMainResponse;

export interface AdviceSearchRequest {
  sort: string;
  page: number;
  size: number;
}

export interface AdviceContentProps {
  title: string;
  commnetCount: number;
  worryId: number;
  restTime: number[];
}

export interface AdviceCreateProps {
  title: string;
  contents: string;
  duration: AdviceDuration;
}

export interface AdviceDetailResponse {
  title: string;
  body: string;
  empathyCount: number;
  restTime: number[];
  hasEmpathized: boolean;
}

export interface AdviceCommentPaginationRequest {
  worryId: string;
  page: number;
  size: number;
}

export interface AdviceCommentContentProps {
  memberId: number;
  commentId: number;
  comment: string;
  createdAt: string;
}

export interface AdviceCommentPaginationResponse {
  content: AdviceCommentContentProps[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface AdviceCommentRequest {
  worryId: string;
  comment: string;
}

export interface AdviceCommentResponse {
  memberId: string;
  comment: string;
  commentId: string;
  createdAt: number[];
}

export interface AdviceEmpathyResponse {
  worryId: number;
  empathyCount: number;
  hasEmpathized: boolean;
}
