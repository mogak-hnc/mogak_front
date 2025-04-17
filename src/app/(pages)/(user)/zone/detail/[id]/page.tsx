import ChatUI from "@/app/Component/shared/chat-ui";
import SubCard from "@/app/Component/shared/sub-card";
import ZoneCard, { ZoneCardProps } from "@/app/Component/shared/zone-card";

const participants: ZoneCardProps[] = [
  {
    id: 1,
    image:
      "https://i.pinimg.com/474x/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg",
    nickname: "피자",
    role: "방장",
    state: "자리비움",
  },
  {
    id: 2,
    image:
      "https://i.namu.wiki/i/CRmL4EVjx2M_uQjtPFePVnm5u8NHGwitbF4ZtBZuKFMw2NcWyh9HGmNWUJHL0_iM9_AxDVnns3qisSoXEFWGwg.jpg",
    nickname: "폼폼푸린",
    role: "",
    state: "오프라인",
  },
  {
    id: 3,
    image: "/user1.png",
    nickname: "미니언즈",
    role: "",
    state: "공부 중",
  },
  {
    id: 4,
    image: "/user2.png",
    nickname: "라이언",
    role: "",
    state: "공부 중",
  },
  {
    id: 5,
    image: "/user3.png",
    nickname: "춘식이",
    role: "",
    state: "공부 중",
  },
  {
    id: 6,
    image: "/user4.png",
    nickname: "구데타마",
    role: "",
    state: "자리비움",
  },
  {
    id: 7,
    image: "/user5.png",
    nickname: "산리오",
    role: "",
    state: "공부 중",
  },
  {
    id: 8,
    image: "/user6.png",
    nickname: "어피치",
    role: "",
    state: "오프라인",
  },
  {
    id: 9,
    image: "/user7.png",
    nickname: "무지",
    role: "",
    state: "공부 중",
  },
];

// ✅ 채팅 mock
const mockMessages = [
  {
    id: 1,
    user: "피자",
    time: "09:00",
    message: "dafg",
    isMe: false,
    avatar: participants[0].image,
  },
  {
    id: 2,
    user: "폼폼푸린",
    time: "09:05",
    message: "💪",
    isMe: false,
    avatar: participants[1].image,
  },
  {
    id: 3,
    user: "나",
    time: "09:06",
    message: "ddㅇㅇㄹㅁㅇㄹ",
    isMe: true,
    avatar: "",
  },
  {
    id: 4,
    user: "미니언즈",
    time: "09:08",
    message: "ㅁㄴㅇㄹㅁㅇ",
    isMe: false,
    avatar: participants[2].image,
  },
  {
    id: 5,
    user: "라이언",
    time: "09:10",
    message: "ㄴㄴㄴ",
    isMe: false,
    avatar: participants[3].image,
  },
  {
    id: 6,
    user: "나",
    time: "09:12",
    message: "ㅋㅋㅋㅎ",
    isMe: true,
    avatar: "",
  },
];

export default function ZoneDetail() {
  return (
    <div className="flex gap-4">
      <div className="w-[65%] flex flex-col gap-4">
        <SubCard
          subtitle="카페"
          title="카공해요"
          startDate={new Date(`2025.03.01`)}
          endDate=""
          count={9}
        />
        <div className="flex flex-col gap-2">
          {participants.map((user, index) => (
            <ZoneCard key={index} {...user} />
          ))}
        </div>
      </div>

      <div className="w-[35%]">
        <ChatUI messages={mockMessages} />
      </div>
    </div>
  );
}
