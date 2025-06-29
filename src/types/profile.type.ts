import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

export interface ProfileProps {
  memberId: number;
  imageUrl: string;
  nickname: string;
  showBadge: boolean;
}

export interface ProfileZoneResponse {
  zoneId: string;
  name: string;
}

export interface ProfileChallengeResponse {
  challengeId: string;
  name: string;
}

export type ProfileBadgeType = "DURATION" | "COUNT" | "OFFICIAL";

export interface ProfileBadgeProps {
  badgeId: number;
  name: string;
  description: string;
  iconUrl: string;
  badgeType: ProfileBadgeType;
}

export interface ProfileInfoResponse {
  memberId: number;
  imageUrl: string;
  nickname: string;
  showBadge: boolean;
}

export interface ProfileUpdateRequest {
  nickname: string;
  deleteImage: boolean;
  showBadge: boolean;
  image?: File | null;
}

export interface ProfileFormProps {
  nickname: string;
  showBadge: boolean;
}

export interface ProfileEditProps {
  register: UseFormRegister<ProfileFormProps>;
  watch: UseFormWatch<ProfileFormProps>;
  setValue: UseFormSetValue<ProfileFormProps>;
  errors: FieldErrors<ProfileFormProps>;
}
