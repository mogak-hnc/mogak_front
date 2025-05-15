/* 
현재 날짜를 기준으로 offset 만큼 더한 날짜를 YYYY-MM-DD 문자열로 변환 

@param offset - 오늘 기준 날짜에서 며칠 더하거나 뺄지
@returns YYYY-MM-DD 포맷의 날짜 문자열
*/

export const getDateString = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().split("T")[0];
};
