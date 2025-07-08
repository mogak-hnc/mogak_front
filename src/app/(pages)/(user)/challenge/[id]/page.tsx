import { ChallengeDetail } from "@/lib/server/challenge.server.api";
import { getJwtFromServerCookie } from "@/utils/server/jwt.server.util";
import ChallengeWrapper from "./challenge-wrapper";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const jwt = await getJwtFromServerCookie();
  const data = await ChallengeDetail(id, jwt);

  return {
    title: `모각 | ${data.title}`,
    description: `${data.title} 챌린지에서 인증샷을 올려 함께하세요.`,
  };
}

export default async function ChallengeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const jwt = await getJwtFromServerCookie();

  const data = await ChallengeDetail(id, jwt);

  console.log(data);
  return (
    <div className="max-w-screen-xl mx-auto px-8 py-10">
      <ChallengeWrapper id={id} initial={data} />
    </div>
  );
}
