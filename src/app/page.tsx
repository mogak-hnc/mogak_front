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
    participants: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3XilJeR7lqZAQ2rTEsm8XwZqguESjy-QoRQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRym6mPR9y_beR-ZMYSLxfQrFRqXkGXZkAeMA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh_3ZDacLygCOTvV-d1OJL8VJsJP4D-wFKaw&s",
      "https://archive.myvibrary.com/original/1712540654041_a7befb52b5.jpeg",
    ],
  },
  {
    type: "studySpace",
    tag: "#스터디룸",
    title: "조용한 방",
    participants: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJrc4NYGO3_gSoBuYSfw3JPWTpkYTuGOljJQ&s",
    ],
  },
  {
    type: "studySpace",
    tag: "#도서관",
    title: "같이 집중해요",
    participants: [
      "https://archive.myvibrary.com/thumb/1720405364977_071dfd85af.jpeg?d=1080",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGzG4Ax9zxjUMh3I5W0diZaO7KWHNxPAIUrQ&s",
    ],
  },
];

const mockChallenges: MainSubCardProps[] = [
  {
    type: "challenge",
    tag: "매일 인증",
    title: "매일 공부 인증하기",
    description: "2025. 01. 01 ~ 2025. 03. 25",
    participants: [
      "https://pbs.twimg.com/media/Fln7fcJakAM-W7m?format=jpg&name=4096x4096",
      "https://pbs.twimg.com/media/GUtosR8bkAAAfaF?format=jpg&name=large",
      "https://archive.myvibrary.com/thumb/1720405359192_6cd92d1f31.jpeg?d=1080",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhf8BpZb3z-P-9DGNw7tS8RdcTq_h0CEuuzA&s",
    ],
    isOfficial: true,
  },
  {
    type: "challenge",
    tag: "영어 단어",
    title: "단어 100개 외우기",
    description: "2025. 04. 01 ~ 2025. 04. 30",
    participants: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGzG4Ax9zxjUMh3I5W0diZaO7KWHNxPAIUrQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkqjXM1b8mgbzIdJg5qVj-0ABUy7XvI1V37g&s",
    ],
    isOfficial: false,
  },
  {
    type: "challenge",
    tag: "코테 대비",
    title: "백준 매일 1문제",
    description: "2025. 03. 20 ~ 2025. 05. 01",
    participants: [
      "https://pbs.twimg.com/media/Fliv5LMaUAAd4wi?format=jpg&name=4096x4096",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoXgQ9r3KP0Qcki63OTV-hv_A_M6LFXwWhag&s",
      "https://mblogthumb-phinf.pstatic.net/MjAyNDA4MDhfMTE0/MDAxNzIzMDgwODcyNjcy.eJhik_0f-Qv8KE3pQUmbsFSVwrktZlKoXbDPkBOdd3Yg.IdjDUJw49i7YrhD5BtURj8d-uCmE1hfq9MiU-nleQ9Ag.JPEG/SE-EA447C4B-7780-4EC4-B63E-5BF5FDCF64FC.jpg?type=w800",
    ],
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
