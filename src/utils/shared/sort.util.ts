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
