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
