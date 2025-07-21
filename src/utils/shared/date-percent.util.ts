import dayjs from "dayjs";

export function getDatePercent(startArr: number[], endArr: number[]): number {
  const start = dayjs(new Date(startArr[0], startArr[1] - 1, startArr[2]));
  const end = dayjs(new Date(endArr[0], endArr[1] - 1, endArr[2]));
  const today = dayjs();

  const totalDays = end.diff(start, "day");
  const passedDays = today.diff(start, "day");

  if (totalDays <= 0) {
    return 100;
  }
  if (passedDays < 0) {
    return 0;
  }

  const percent = (passedDays / totalDays) * 100;
  return Math.min(Math.max(Math.round(percent), 1), 100);
}
