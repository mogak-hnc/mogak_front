import { ZoneDetail } from "@/lib/server/zone.server.api";
import { getJwtFromServerCookie } from "@/utils/server/jwt.server.util";
import ZoneMemberSetting from "./zone-member-setting";

export default async function ZoneDetailMember({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const jwt = await getJwtFromServerCookie();

  const data = await ZoneDetail(id, jwt);

  return (
    <>
      <ZoneMemberSetting memberData={data.zoneMemberInfoList} />
    </>
  );
}
