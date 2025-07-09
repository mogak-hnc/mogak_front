import AdviceMainWrapper from "./advice-main-wrapper";
import ImageCard from "@/app/components/shared/image-card";
import AdviceBgLight from "@/app/components/img/s_background_light.png";
import AdviceBgDark from "@/app/components/img/s_background_dark.png";

export const metadata = {
  title: "모각 | 고민상담",
  description:
    "24시간 뒤 자동으로 삭제되는 비밀 고민 상담 공간, 모각에서 익명으로 고민을 나눠 보세요.",
};

export default async function AdvicePage() {
  return (
    <div className="w-full flex flex-col items-center px-4 gap-8">
      <div className="justify-center px-4 flex flex-col gap-8 w-full max-w-screen-xl">
        <ImageCard
          type="secret"
          title="비밀 고민 상담"
          description1="말 못할 고민을 모각에서 털어놓아요."
          description2="24시간 뒤에 자동으로 삭제돼요."
          button="고민 작성하기"
          buttonUrl="/advice/create"
          bgImageLight={AdviceBgLight.src}
          bgImageDark={AdviceBgDark.src}
        ></ImageCard>
        <AdviceMainWrapper />
      </div>
    </div>
  );
}
