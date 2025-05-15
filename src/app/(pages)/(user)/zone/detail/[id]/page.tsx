import ChatUI from "@/app/components/shared/chat-ui";
import SubCard from "@/app/components/shared/sub-card";
import { ZoneDetail } from "@/lib/server/zone.server.api";

export default async function ZoneDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const zoneId = params.id;
  const data = await ZoneDetail(zoneId);
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

      <div className="w-[35%]">
        <ChatUI messages={mockMessages} />
      </div> */}
    </div>
  );
}
