import ChatUI from "@/app/components/shared/chat-ui";
import { ZoneDetail } from "@/lib/server/zone.server.api";
import { getJwtFromServerCookie } from "@/utils/server/jwt.server.util";
import UserCard from "@/app/components/shared/user-card";
import { StatusType } from "@/types/zone.type";
import ZoneHeader from "../../zone-header";
import { convertDate } from "@/utils/shared/date.util";

export const dynamic = "force-dynamic";

export default async function ZoneDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const jwt = await getJwtFromServerCookie();

  const data = await ZoneDetail(id, jwt);

  return (
    <div className="flex gap-4">
      <div className="w-[65%] flex flex-col gap-4">
        <ZoneHeader
          name={data.name}
          startDate={convertDate(data.startDate)}
          endDate={convertDate(data.endDate)}
          imageUrl={data.imageUrl}
          tag={data.tagNames[0]}
          joinedUserCount={data.joinedUserCount}
          hostId={data.hostMemberId}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.zoneMemberInfoList.map((user, index) => (
            <UserCard
              key={index}
              memberId={user.memberId}
              nickname={user.nickname}
              status={user.status as StatusType}
              role={data.hostMemberId === user.memberId ? "방장" : ""}
              image={user.imageUrl}
            />
          ))}
        </div>
      </div>

      <div className="w-[35%]">
        {/* <ChatUI messages={data.chatHistoryResponses} /> */}
      </div>
    </div>
  );
}
