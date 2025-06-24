import { ZoneDetail } from "@/lib/client/zone.client.api";
import ZoneMemberSetting from "./zone-member-setting";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";

export default async function ZoneDetailMember({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const jwt = getJwtFromCookie();

  const data = await ZoneDetail(id);

  return (
    <>
      <ZoneMemberSetting memberData={data.zoneMemberInfoList} />
    </>
  );
}
