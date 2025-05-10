export const convertDate = (dateArray: number[]) => {
  const [year, month, day] = dateArray;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
