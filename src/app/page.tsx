import { SubCardProps } from "@/types";
import student from "@/app/components/img/c_student.png";
import designer from "@/app/components/img/c_designer.png";
import coding from "@/app/components/img/c_coding.png";

import MainBgLight from "@/app/components/img/c_background_light.png";
import MainBgDark from "@/app/components/img/c_background_dark.png";
import { MainZoneChallenge } from "@/lib/main.api";

import MainCard from "./components/shared/main-card";
import { MainSubTitle } from "./components/main-sub-title";
import MainSubCard from "./components/shared/main-sub-card";
import { convertDate } from "@/utils/date";

export default async function Home() {
  const data = await MainZoneChallenge();

  return (
    <div className="w-full flex flex-col items-center px-4 gap-8">
      <div className="w-full max-w-screen-xl flex flex-col gap-12">
        <MainCard
          type="home"
          title="모여서 각자, 모각"
          description1="모각에 처음 오셨나요?"
          description2="간단한 챌린지로 시작해 보세요!"
          button="챌린지 시작하기"
          buttonUrl="/challenge"
          img1={student.src}
          img2={coding.src}
          img3={designer.src}
          bgImageLight={MainBgLight.src}
          bgImageDark={MainBgDark.src}
        />
        <div className="flex flex-col gap-4">
          <MainSubTitle
            title="핫한 모각존"
            description="현재 가장 많은 유저들이 공부 중인 모각존을 살펴 보세요."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.mogakZoneMainResponses.map((space, idx) => (
              <MainSubCard
                key={idx}
                type="studySpace"
                tag={space.tagNames[0]}
                title={space.name}
                participants={(space.memberImageUrls ?? []).filter(
                  (img): img is string => img !== null
                )}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <MainSubTitle
            title="지금은 챌린지 할 시간"
            description="현재 가장 많은 유저들이 참여 중인 챌린지를 살펴 보세요."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.mogakChallengeResponses.map((challenge, idx) => (
              <MainSubCard
                key={idx}
                type="challenge"
                tag="챌린지"
                title={challenge.title}
                description={`${convertDate(
                  challenge.startDate
                )} ~ ${convertDate(challenge.endDate)}`}
                participants={(challenge.memberImageUrls ?? []).filter(
                  (img): img is string => img !== null
                )}
                isOfficial={challenge.official}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
