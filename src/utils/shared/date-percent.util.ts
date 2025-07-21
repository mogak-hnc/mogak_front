import dayjs from "dayjs";

export function getDatePercent(startArr: number[], endArr: number[]): number {
  const start = dayjs(new Date(startArr[0], startArr[1] - 1, startArr[2]));
  const end = dayjs(new Date(endArr[0], endArr[1] - 1, endArr[2]));
  const today = dayjs();

  const totalDays = end.diff(start, "day") + 1;
  const passedDays = today.diff(start, "day") + 1;

  if (totalDays <= 0) {
    return 100;
  }
  if (passedDays <= 0) {
    return 0;
  }

  return Math.min(Math.round((passedDays / totalDays) * 100), 100);
}
