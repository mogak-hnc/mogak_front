import ChatUI from "@/app/Component/shared/chat-ui";
import SubCard from "@/app/Component/shared/sub-card";
import ZoneCard from "@/app/Component/shared/zone-card";

const test = [
  {
    id: 1,
    user: "피자",
    time: "10:11",
    message: "ㅇㅇㅇㅇㅇ",
    isMe: false,
    avatar:
      "https://i.pinimg.com/474x/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg",
  },
  {
    id: 2,
    user: "폼폼푸린",
    time: "10:14",
    message: "어쩌구저쩌구",
    isMe: false,
    avatar:
      "https://i.namu.wiki/i/CRmL4EVjx2M_uQjtPFePVnm5u8NHGwitbF4ZtBZuKFMw2NcWyh9HGmNWUJHL0_iM9_AxDVnns3qisSoXEFWGwg.jpg",
  },
  {
    id: 3,
    user: "나",
    time: "10:20",
    message: "ㄴㄴㄴㄴㄴㄴㄴ",
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
        <div>
          <ZoneCard
            image={`https://i.pinimg.com/474x/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg`}
            nickname={`피자`}
            role={`방장`}
            state={`자리비움`}
          />
          <ZoneCard
            image={`https://i.namu.wiki/i/CRmL4EVjx2M_uQjtPFePVnm5u8NHGwitbF4ZtBZuKFMw2NcWyh9HGmNWUJHL0_iM9_AxDVnns3qisSoXEFWGwg.jpg`}
            nickname={`폼폼푸린`}
            role={``}
            state={`오프라인`}
          />
        </div>
      </div>

      <div className="w-[35%]">
        <ChatUI messages={test} />
      </div>
    </div>
  );
}
