import { ChallengeSurvivorsList } from "@/lib/client/challenge.client.api";
import { getJwtFromServerCookie } from "@/utils/server/jwt.server.util";
import ChallengeMemberList from "./challenge-member-list";
import SubTitle from "@/app/components/shared/sub-title";

export default async function ChallengeSurvivorsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const jwt = await getJwtFromServerCookie();
  const data = await ChallengeSurvivorsList(id, jwt, 0);

  return (
    <div className="px-4 py-6">
      <SubTitle contents="참가자 목록" />
      <ChallengeMemberList data={data} />
    </div>
  );
}
