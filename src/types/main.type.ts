import { ChallengeStatusType } from "./challenge.type";

export interface MainResponse {
  mogakZoneMainResponses: MainZoneRequest[];
  mogakChallengeResponses: MainChallengeRequest[];
}

export interface MainZoneRequest {
  mogakZoneId: number;
  tagNames: string[];
  name: string;
  memberImageUrls: string[] | null[];
  passwordRequired: boolean;
}

export interface MainChallengeRequest {
  challengeId: number;
  official: boolean;
  title: string;
  memberImageUrls: string[] | null[];
  startDate: number[];
  endDate: number[];
  status: ChallengeStatusType;
}
