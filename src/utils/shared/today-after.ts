import dayjs from "dayjs";

export function isTodayOrAfter(dateArr: number[]): boolean {
  const target = dayjs(new Date(dateArr[0], dateArr[1] - 1, dateArr[2]));
  const today = dayjs().startOf("day");

  return target.isSame(today) || target.isAfter(today);
}
