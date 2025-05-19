export interface MainRequest {
  mogakZoneMainResponses: MainZoneRequest[];
  mogakChallengeResponses: MainChallengeRequest[];
}

export interface MainZoneRequest {
  mogakZoneId: number;
  tagNames: string[];
  name: string;
  memberImageUrls: string[] | null[];
}

export interface MainChallengeRequest {
  challengeId: number;
  official: boolean;
  title: string;
  memberImageUrls: string[] | null[];
  startDate: number[];
  endDate: number[];
}
