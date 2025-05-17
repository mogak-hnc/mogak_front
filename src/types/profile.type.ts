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
