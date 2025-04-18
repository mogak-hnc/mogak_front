import ChatUI from "@/app/Component/shared/chat-ui";
import SubCard from "@/app/Component/shared/sub-card";
import ZoneCard from "@/app/Component/shared/zone-card";
import { ZoneCardProps } from "@/types";

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
    image:
      "https://i.namu.wiki/i/WxKy3rXTVi9Z4tp540N5SvHJAGfNfAPPBIvQsQgTaEHAxKtTTNYM1XtI5UCLOeEV4-eGQFqNdK83SxLjoswqJA.webp",
    nickname: "미니언즈",
    role: "",
    state: "공부 중",
  },
  {
    id: 4,
    image:
      "https://i.namu.wiki/i/TGhPJv3WWyjOQrmKrYH-kiCFEIdemLcjfcoDPvDGTph3BvNWLTGCM8pMykEsVUUdkzc2NVt7xazWT3bwu8_k2Q.webp",
    nickname: "라이언",
    role: "",
    state: "공부 중",
  },
  {
    id: 5,
    image: "https://media.nudge-community.com/7698172",
    nickname: "춘식이",
    role: "",
    state: "공부 중",
  },
  {
    id: 6,
    image:
      "https://i.namu.wiki/i/Hsgfnzg--y95EQ72KmpWWv9okhDxTA0Vyyukb5NpDLk06-vIBTi6JMugHGX1BgcnmqNWXW86ISnn9a2fTUN1iA.webp",
    nickname: "구데타마",
    role: "",
    state: "자리비움",
  },
  {
    id: 7,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT16tyR3rn799XVlRKNipCupkli1YZE1mSUgg&s",
    nickname: "산리오",
    role: "",
    state: "공부 중",
  },
  {
    id: 8,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0G28eXw351gBnJ86GQmAk_hbVKM1v_KVOwQ&s",
    nickname: "어피치",
    role: "",
    state: "오프라인",
  },
  {
    id: 9,
    image:
      "https://www.elle.co.kr/resources_old/online/org_thumnail_image/el/20589ccb-24eb-4a18-ad58-a7a1353fc24a.jpg",
    nickname: "무지",
    role: "",
    state: "공부 중",
  },
];

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

const mockInfo = {
  name: "열공모각코",
  maxCapacity: 10,
  imageUrl: "",
  password: "1234",
  chatEnabled: true,
  loginRequired: true,
  startDate: "2025-04-18",
  endDate: "2025-04-25",
  tagNames: ["개발", "코딩", "공부"],
};

export default function ZoneDetailPage() {
  return (
    <div className="flex gap-4">
      <div className="w-[65%] flex flex-col gap-4">
        <SubCard {...mockInfo} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
