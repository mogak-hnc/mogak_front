import ChatUI from "@/app/components/shared/chat-ui";
import { ZoneDetail } from "@/lib/server/zone.server.api";
import { getJwtFromServerCookie } from "@/utils/server/jwt.server.util";
import UserCard from "@/app/components/shared/user-card";
import { StatusType } from "@/types/zone.type";
import ZoneHeader from "./zone-header";
import { getProfileImage } from "@/utils/shared/profile.util";
import Link from "next/link";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const jwt = await getJwtFromServerCookie();
  const data = await ZoneDetail(id, jwt);

  return {
    title: `모각 | ${data.name}`,
    description: `${data.name} 모각존에서 함께 공부해요.`,
  };
}

export default async function ZoneDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const jwt = await getJwtFromServerCookie();

  const data = await ZoneDetail(id, jwt);

  return (
    <div className="flex gap-4">
      <div className="w-[65%] flex flex-col gap-4">
        <ZoneHeader
          zoneId={id}
          name={data.name}
          imageUrl={data.imageUrl}
          tag={data.tagNames[0]}
          joinedUserCount={data.joinedUserCount}
          hostId={data.hostMemberId}
          joined={data.joined}
          hasPwd={data.passwordRequired}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.zoneMemberInfoList.map((user) => (
            <Link key={user.memberId} href={`/profile/${user.memberId}`}>
              <UserCard
                memberId={user.memberId}
                nickname={user.nickname}
                status={user.status as StatusType}
                role={Number(data.hostMemberId) === user.memberId ? "방장" : ""}
                image={getProfileImage(user.imageUrl)}
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="w-[35%]">
        <ChatUI />
        {/* <ChatUI messages={data.chatHistoryResponses} /> */}
      </div>
    </div>
  );
}
