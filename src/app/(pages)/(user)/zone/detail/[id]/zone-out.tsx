import Button from "@/app/components/ui/button";
import { ZoneInOutButtonProps } from "@/types/zone.type";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";
import { decodeToken } from "@/utils/client/decode-token.client.util";

export default function ZoneOut({
  zoneId,
  hostId,
  joined,
}: ZoneInOutButtonProps) {
  const jwt = getJwtFromCookie();
  let user;
  if (jwt) {
    user = decodeToken(jwt);
  }

  if (!joined || !user || user.memberId !== hostId) {
    return null;
  }

  return <>{hostId !== user?.memberId && <Button>탈퇴하기</Button>}</>;
}
