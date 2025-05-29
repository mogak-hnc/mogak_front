import Button from "@/app/components/ui/button";
import { ProfileProps } from "@/types/profile.type";
import { getServerUser } from "@/utils/server/user.server.util";
import { getProfileImage } from "@/utils/shared/profile.util";

import Link from "next/link";

export default async function MyProfile(user: ProfileProps) {
  const serverUser = await getServerUser();
  const memberId = serverUser?.memberId;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={getProfileImage(user.imageUrl)}
          alt="profile"
          className="w-16 h-16 rounded-full border border-primary"
        />
        <div>
          <div className="text-xl font-bold text-primary">{user.nickname}</div>
        </div>
      </div>
      {String(memberId) === String(user.memberId) && (
        <Link href={`/profile/${user.memberId}/edit`}>
          <Button variant="secondary">수정하기</Button>
        </Link>
      )}
    </div>
  );
}
