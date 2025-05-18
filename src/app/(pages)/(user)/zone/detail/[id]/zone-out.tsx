import Button from "@/app/components/ui/button";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";
import { decodeToken } from "@/utils/client/decode-token.client.util";

export default function ZoneOut({
  zoneId,
  hostId,
}: {
  zoneId: string;
  hostId: string;
}) {
  const jwt = getJwtFromCookie();
  let user;
  if (jwt) {
    user = decodeToken(jwt);
  }
  return <>{hostId !== user?.memberId && <Button>탈퇴하기</Button>}</>;
}
