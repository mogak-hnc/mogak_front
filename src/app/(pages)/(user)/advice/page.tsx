import AdvicePreviewCard from "@/app/Component/advice-preview-card";
import MainCard from "@/app/Component/shared/main-card";
import H1Title from "@/app/Component/ui/h1-title";
import { AdvicePreviewCardProps } from "@/types";
import AdviceBgLight from "@/app/Component/img/s_background_light.png";
import AdviceBgDark from "@/app/Component/img/s_background_dark.png";

const mockAdviceCards: AdvicePreviewCardProps[] = [
  {
    title: "고민있어요",
    commentCount: 9,
    timeLeftText: "7시간 24분 뒤 삭제",
    href: "/advice/detail/1",
  },
  {
    title: "공부가 안돼요",
    commentCount: 3,
    timeLeftText: "3시간 12분 뒤 삭제",
    href: "/advice/detail/2",
  },
  {
    title: "새벽에 잠이 안 와요",
    commentCount: 5,
    timeLeftText: "1시간 48분 뒤 삭제",
    href: "/advice/detail/3",
  },
];

export default function AdvicePage() {
  return (
    <div className="w-full flex flex-col items-center px-4 gap-8">
      <div className="justify-center px-4 flex flex-col gap-8 w-full max-w-screen-xl">
        <MainCard
          type="secret"
          title="비밀 고민 상담"
          description1="어쩌구.."
          description2="24시간 뒤에 자동으로 삭제돼요."
          button="고민 작성하기"
          buttonUrl="/advice/create"
          img1=""
          img2=""
          img3=""
          bgImageLight={AdviceBgLight.src}
          bgImageDark={AdviceBgDark.src}
        ></MainCard>
        <H1Title>공감이 많은 고민들</H1Title>
        <div className="flex flex-wrap gap-4">
          {mockAdviceCards.map((m, idx) => (
            <AdvicePreviewCard key={`advice-preiview-card-${idx}`} {...m} />
          ))}
        </div>
      </div>
    </div>
  );
}
