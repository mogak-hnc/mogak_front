/* 
숫자 배열을 한국어 날짜 문자열로 변환

@param dateArray - [year, month, day] 형태의 숫자 배열
@returns "YYYY년 M월 D일" 형식의 문자열
*/

export const convertDate = (dateArray: number[]) => {
  const [year, month, day] = dateArray;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/* 
숫자 배열을 "시:분:초" 형식의 한국어 문자열로 변환

@param timeArray - [hour, minute, second] 형태의 숫자 배열 
@returns "1시간 09분 05초" 형태의 문자열
*/

export const convertTime = (timeArray: number[]) => {
  const [hour, minute, second] = timeArray;
  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${hour}시간 ${pad(minute)}분 ${pad(second)}초`;
};

/* 
초 값을 [hour, minute, second] 형태의 숫자 배열로 변환

@param seconds - 초 
@returns [hour, minute, second] 형태의 숫자 배열
*/

export const secondToTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}시간 ${m}분`;
};
