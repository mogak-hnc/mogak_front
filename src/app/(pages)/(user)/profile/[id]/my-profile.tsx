import Button from "@/app/components/ui/button";
import { ProfileProps } from "@/types/profile.type";

import Link from "next/link";

export default function MyProfile(user: ProfileProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={user.imageUrl}
          alt="profile"
          className="w-16 h-16 rounded-full border border-primary"
        />
        <div>
          <div className="text-xl font-bold text-primary">{user.nickname}</div>
        </div>
      </div>
      {/* <Link href={`/profile/${user.id}/edit`}>
        <Button variant="secondary">수정하기</Button>
      </Link> */}
    </div>
  );
}
