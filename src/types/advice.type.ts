import { AdviceDuration } from "@/utils/shared/advice-duration";

export interface AdviceCardProps {
  title: string;
  // commentCount: number;
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
  commentResponses: AdviceDetailCommentProps[];
}

export interface AdviceDetailCommentProps {
  comment: string;
  createdAt: number[];
}

export interface AdviceCommentRequest {
  worryId: string;
  comment: string;
}

export interface AdviceCommentResponse {
  comment: string;
  createdAt: string;
}

export interface AdviceEmpathyResponse {
  worryId: number;
  empathyCount: number;
  hasEmpathized: boolean;
}
