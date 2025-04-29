import AdvicePreviewCard from "@/app/Component/advice-preview-card";
import MainCard from "@/app/Component/shared/main-card";
import H1Title from "@/app/Component/ui/h1-title";
import Background from "@/app/Component/img/s_secret.png";
import { AdvicePreviewCardProps } from "@/types";

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
    <div>
      <MainCard
        type="secret"
        image={Background.src}
        title="비밀 고민 상담"
        description1="어쩌구.."
        description2="24시간 뒤에 자동으로 삭제돼요."
        button="고민 작성하기"
        buttonUrl="/advice/create"
        img1=""
        img2=""
        img3=""
      ></MainCard>
      <H1Title>공감이 많은 고민들</H1Title>
      <div className="flex flex-wrap gap-4">
        {mockAdviceCards.map((m, idx) => (
          <AdvicePreviewCard key={`advice-preiview-card-${idx}`} {...m} />
        ))}
      </div>
    </div>
  );
}
