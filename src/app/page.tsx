import student from "@/app/components/img/c_student.png";
import designer from "@/app/components/img/c_designer.png";
import coding from "@/app/components/img/c_coding.png";
import MainBgLight from "@/app/components/img/c_background_light.png";
import MainBgDark from "@/app/components/img/c_background_dark.png";
import ImageCard from "./components/shared/image-card";
import { MainSubTitle } from "./components/main-sub-title";
import { convertDate } from "@/utils/shared/date.util";
import ChallengeMainCard from "./(pages)/(user)/challenge/challenge-main-card";
import ZoneMainCard from "./(pages)/(user)/zone/zone-main-card";
import { MainZoneChallenge } from "@/lib/shared/main.api";
import Link from "next/link";

export default async function Home() {
  const data = await MainZoneChallenge();

  return (
    <div className="w-full flex flex-col items-center px-4 lg:px-8 gap-8">
      <div className="w-full max-w-screen-xl flex flex-col gap-12">
        <ImageCard
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
          <div className="flex justify-between items-center whitespace-nowrap overflow-hidden">
            <MainSubTitle
              title="핫한 모각존"
              description="현재 가장 많은 유저들이 공부 중인 모각존을 살펴 보세요."
            />
            <Link href="/zone">
              <span className="text-sm text-secondary dark:text-secondary-dark">
                더보기
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.mogakZoneMainResponses.map((space) => (
              <ZoneMainCard
                key={space.mogakZoneId}
                mogakZoneId={space.mogakZoneId}
                tag={space.tagNames}
                title={space.name}
                participants={(space.memberImageUrls ?? []).filter(
                  (img): img is string => img !== null
                )}
                hasPwd={space.passwordRequired}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <MainSubTitle
              title="지금은 챌린지 할 시간"
              description="현재 가장 많은 유저들이 참여 중인 챌린지를 살펴보세요."
            />
            <Link href="/challenge">
              <span className="text-sm text-secondary dark:text-secondary-dark  ">
                더보기
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.mogakChallengeResponses.map((challenge) => (
              <ChallengeMainCard
                key={challenge.challengeId}
                challengeId={challenge.challengeId}
                title={challenge.title}
                description={`${convertDate(
                  challenge.startDate
                )} ~ ${convertDate(challenge.endDate)}`}
                participants={(challenge.memberImageUrls ?? []).filter(
                  (img): img is string => img !== null
                )}
                official={challenge.official}
                status={challenge.status}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
