import Link from "next/link";
import Button from "@/app/components/ui/button";

// import MyBadge from "./my-badge";
// import MyChallenge from "./my-challenge";
// import MyZone from "./my-zone";
import MyProfile from "./my-profile";
import { ProfileInfo } from "@/lib/server/profile.server.api";
import { getJwtFromServerCookie } from "@/utils/server/jwt.server.util";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const jwt = await getJwtFromServerCookie();
  const data = await ProfileInfo(id, jwt);

  return {
    title: `모각 | ${data.nickname} 님`,
    description: `${data.nickname} 님의 프로필`,
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const jwt = await getJwtFromServerCookie();

  const data = await ProfileInfo(id, jwt);

  if (!data)
    return (
      <div className="max-w-4xl mx-auto py-24 px-6 flex flex-col items-center gap-6 text-center">
        <h2 className="text-xl font-bold text-primary dark:text-primary-dark">
          유저를 찾을 수 없습니다.
        </h2>
        <Link href="/">
          <Button variant="secondary">홈 화면으로 돌아가기</Button>
        </Link>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 flex flex-col gap-6">
      <MyProfile {...data} memberId={data.memberId} />
      {data.showBadge && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
          {/* <MyBadge badges={data.badges ?? []} />
          <MyChallenge challenges={data.challenges ?? []} />
          <MyZone zones={data.zones ?? []} /> */}
        </div>
      )}
    </div>
  );
}
