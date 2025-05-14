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
