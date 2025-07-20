import { ZoneDetail } from "@/lib/server/zone.server.api";
import { getJwtFromServerCookie } from "@/utils/server/jwt.server.util";
import ZoneWrapper from "./zone-wrapper";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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

  return <ZoneWrapper id={id} data={data} />;
}
