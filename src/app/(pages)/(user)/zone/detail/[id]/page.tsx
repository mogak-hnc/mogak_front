import ChatUI from "@/app/components/shared/chat-ui";
import SubCard from "@/app/components/shared/sub-card";
import ZoneCard from "@/app/components/shared/zone-card";
import { StatusType, ZoneCardProps, ZoneDetailProps } from "@/types";

export default async function ZoneDetailPage() {
  // const data = await
  return (
    <div className="flex gap-4">
      {/* <div className="w-[65%] flex flex-col gap-4">
        <SubCard {...mockInfo} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockInfo.zoneMemberInfoList.map((user, index) => (
            <ZoneCard
              key={index}
              memberId={user.memberId}
              nickname={user.nickname}
              status={user.status as StatusType}
              role={mockInfo.hostMemberId === user.memberId ? "방장" : ""}
              image={user.image}
            />
          ))}
        </div>
      </div>

      <div className="w-[35%]"><ChatUI messages={mockMessages} /></div> */}
    </div>
  );
}
