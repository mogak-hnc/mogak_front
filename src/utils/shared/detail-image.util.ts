import defaultBg from "@/app/components/img/d_background.png";

export function getDetailImage(src: string) {
  return src === "Default" ? defaultBg.src : src;
}
