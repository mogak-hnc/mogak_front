import MainCard from "./Component/shared/main-card";
import MainSubCard from "./Component/shared/main-sub-card";

function MainSubTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-10 items-center my-5">
      <div className="bg-primary dark:bg-primary-dark text-background dark:text-dark px-2 py-1 rounded-md text-sm font-semibold w-fit">
        {title}
      </div>
      <div className="text-xs">{description}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <MainCard
        image="https://cdn.imweb.me/thumbnail/20230228/25687782da912.png"
        title="모여서 각자, 모각"
        description1="모각에 처음 오셨나요?"
        description2="간단한 챌린지로 시작해 보세요!"
        button="챌린지 시작하기"
        buttonUrl="/challenge"
      ></MainCard>
      <MainSubTitle
        title={`핫한 모각존`}
        description={`현재 가장 많은 유저들이 공부 중인 모각존을 살펴 보세요.`}
      />
      <MainSubCard
        type="studySpace"
        tag="#카페"
        title="카공해요"
        participants={["/user1.png", "/user2.png", "/user3.png"]}
      />
      <MainSubTitle
        title={`지금은 챌린지 할 시간`}
        description={`현재 가장 많은 유저들이 참여 중인 챌린지를 살펴 보세요.`}
      />
      <MainSubCard
        type="challenge"
        tag="매일 공부 인증하기"
        title="매일 공부 인증하기"
        description="2025. 01. 01 ~ 2025. 03. 25"
        participants={["/user1.png", "/user2.png", "/user3.png", "/user4.png"]}
        isOfficial={true}
      />
    </div>
  );
}
