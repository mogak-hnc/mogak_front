export interface AdviceCardProps {
  title: string;
  commentCount: number;
  restTime: number[];
  worryId: number;
}

export interface AdviceSearchRequest {
  sort: string;
  page: number;
  size: number;
}

export interface AdviceSearchResponse {
  title: string;
  commnetCount: number;
  worryId: number;
  restTime: number[];
}

export interface AdviceCreateProps {
  title: string;
  contents: string;
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
