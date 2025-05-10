export const convertDate = (dateArray: number[]) => {
  const [year, month, day] = dateArray;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const convertTime = (timeArray: number[]) => {
  const [hour, minute, second] = timeArray;
  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${hour}시간 ${pad(minute)}분 ${pad(second)}초`;
};
