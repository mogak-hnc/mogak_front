import { TagsProps } from "./shared.type";

export interface ChallengeHeaderProps {
  title: string;
  description: string;
  creatorMemberId: number;
  startDate: string;
  endDate: string;
}

export interface ChallengeProofGridProps {
  proofImages: string[];
}

export interface ChallengeSurvivorsProps {
  avatars: string[];
  extraCount?: number;
}

export type ChallengeForm = {
  name: string;
  description: string;
  ownerOnly: boolean;
  startDate: string;
  endDate: string;
};

export interface ChallengeCreateFormProps {
  isAdmin?: boolean;
  onSubmit?: (data: ChallengeForm & { isOfficial: boolean }) => void;
}

export interface ChallengeMainProps {
  type: "studySpace" | "challenge";
  tag?: string;
  title: string;
  participants: (string | null)[];
  description?: string;
  isOfficial?: boolean;
}

export interface ChallengeResultProps {
  type: "studySpace" | "challenge";
  title: string;
  description: string;
  tags: TagsProps[];
  sort: string;
  section: string;
}
