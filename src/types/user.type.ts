export interface UserProps {
  id: string;
  nickname: string;
  bio: string;
  affiliation: string;
  profileImage: string;
  showBadges: boolean;
  badges?: string[];
  challenges?: string[];
  zones?: string[];
}
