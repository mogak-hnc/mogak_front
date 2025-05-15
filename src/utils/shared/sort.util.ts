/* 
한글 정렬 기준 라벨을 API에서 사용하는 영문 쿼리 값으로 변환

@param label - UI에서 선택된 정렬 기준 (최신순, 참여순...)
@returns 서버에서 요구하는 정렬 키 ("recent", "participant"...)
*/

export const mapSort = (label: string) => {
  switch (label) {
    case "최신순":
      return "recent";
    case "참여순":
      return "participant";
    default:
      return "recent";
  }
};
