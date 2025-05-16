export interface AdviceCardProps {
  title: string;
  commentCount: number;
  restTime: number[];
  worryId: number;
}

export interface AdviceCommentProps {
  id: number;
  message: string;
  time: string;
  isMe: boolean;
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
