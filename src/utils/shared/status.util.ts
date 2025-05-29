import { StatusType } from "@/types/zone.type";

export const statusMap: Record<string, StatusType> = {
  STUDYING: "공부 중",
  RESTING: "자리비움",
  DONE: "오프라인",
};

export const challengeMap: Record<string, string> = {
  BEFORE: "진행 전",
  ONGOING: "진행 중",
  COMPLETED: "종료",
};
