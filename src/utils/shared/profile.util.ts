import defaultProfile from "@/app/components/img/default_profile.png";

export function getProfileImage(src: string) {
  return src === "Default" ? defaultProfile.src : src;
}
