export interface MainProps {
  mogakZoneMainResponses: MainZoneProps[];
  mogakChallengeResponses: MainChallengeProps[];
}

export interface MainZoneProps {
  tagNames: string[];
  name: string;
  memberImageUrls: string[] | null[];
}

export interface MainChallengeProps {
  official: boolean;
  title: string;
  memberImageUrls: string[] | null[];
  startDate: number[];
  endDate: number[];
}
