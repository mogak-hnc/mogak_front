import { ZoneDetail } from "@/lib/client/zone.client.api";
import ZoneMemberSetting from "./zone-member-setting";

export default async function ZoneDetailMember({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await ZoneDetail(id);

  return (
    <>
      <ZoneMemberSetting memberData={data.zoneMemberInfoList} />
    </>
  );
}
