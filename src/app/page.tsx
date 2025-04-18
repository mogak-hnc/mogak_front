import { MainSubCardProps } from "@/types";
import { MainSubTitle } from "./Component/main-sub-title";
import MainCard from "./Component/shared/main-card";
import MainSubCard from "./Component/shared/main-sub-card";
import student from "@/app/Component/img/c_student.png";
import designer from "@/app/Component/img/c_designer.png";
import coding from "@/app/Component/img/c_coding.png";

const mockStudySpaces: MainSubCardProps[] = [
  {
    type: "studySpace",
    tag: "#카페",
    title: "카공해요",
    participants: ["/user1.png", "/user2.png", "/user3.png", "/user4.png"],
  },
  {
    type: "studySpace",
    tag: "#스터디룸",
    title: "조용한 방",
    participants: ["/user1.png"],
  },
  {
    type: "studySpace",
    tag: "#도서관",
    title: "같이 집중해요",
    participants: ["/user1.png", "/user2.png"],
  },
];

const mockChallenges: MainSubCardProps[] = [
  {
    type: "challenge",
    tag: "매일 인증",
    title: "매일 공부 인증하기",
    description: "2025. 01. 01 ~ 2025. 03. 25",
    participants: ["/user1.png", "/user2.png", "/user3.png", "/user4.png"],
    isOfficial: true,
  },
  {
    type: "challenge",
    tag: "영어 단어",
    title: "단어 100개 외우기",
    description: "2025. 04. 01 ~ 2025. 04. 30",
    participants: ["/user1.png", "/user2.png"],
    isOfficial: false,
  },
  {
    type: "challenge",
    tag: "코테 대비",
    title: "백준 매일 1문제",
    description: "2025. 03. 20 ~ 2025. 05. 01",
    participants: ["/user1.png", "/user2.png", "/user3.png"],
    isOfficial: true,
  },
];

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center px-4 gap-8">
      <div className="justify-center px-4 flex flex-col gap-8">
        <MainCard
          type="home"
          image="https://cdn.imweb.me/thumbnail/20230228/25687782da912.png"
          title="모여서 각자, 모각"
          description1="모각에 처음 오셨나요?"
          description2="간단한 챌린지로 시작해 보세요!"
          button="챌린지 시작하기"
          buttonUrl="/challenge"
          img1={student.src}
          img2={coding.src}
          img3={designer.src}
        ></MainCard>
        <div className="w-full max-w-screen-xl">
          <MainSubTitle
            title={`핫한 모각존`}
            description={`현재 가장 많은 유저들이 공부 중인 모각존을 살펴 보세요.`}
          />
          <div className="flex flex-wrap gap-4">
            {mockStudySpaces.map((space, idx) => (
              <MainSubCard key={idx} {...space} />
            ))}
          </div>
          <MainSubTitle
            title={`지금은 챌린지 할 시간`}
            description={`현재 가장 많은 유저들이 참여 중인 챌린지를 살펴 보세요.`}
          />
          <div className="flex flex-wrap gap-4">
            {mockChallenges.map((challenge, idx) => (
              <MainSubCard key={idx} {...challenge} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
