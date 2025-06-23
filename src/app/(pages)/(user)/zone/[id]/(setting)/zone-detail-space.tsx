import type { Metadata } from "next";
import ZoneSpaceSetting from "./zone-space-setting";
import { ZoneDetail } from "@/lib/server/zone.server.api";
import { getJwtFromServerCookie } from "@/utils/server/jwt.server.util";

export const metadata: Metadata = {
  title: "모각 | 모각존 관리",
  description: "모여서 각자",
};

export default async function ZoneDetailSpace({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const jwt = await getJwtFromServerCookie();
  const data = await ZoneDetail(id, jwt);
  return <ZoneSpaceSetting data={data} />;
}
