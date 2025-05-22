import AdvicePreviewCard from "@/app/components/advice-preview-card";
import AdviceBgLight from "@/app/components/img/s_background_light.png";
import AdviceBgDark from "@/app/components/img/s_background_dark.png";
import ImageCard from "@/app/components/shared/image-card";
import { AdviceMain } from "@/lib/shared/advice.api";
import SubTitle from "@/app/components/shared/sub-title";

export default async function AdvicePage() {
  const data = await AdviceMain();
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
        <SubTitle contents="공감이 많은 고민들" />
        <div className="flex flex-wrap gap-4">
          {data.map((m) => (
            <AdvicePreviewCard
              key={`advice-preiview-card-${m.worryId}`}
              {...m}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
