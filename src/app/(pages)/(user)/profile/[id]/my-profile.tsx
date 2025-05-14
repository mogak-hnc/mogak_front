import Button from "@/app/components/ui/button";
import { UserProps } from "@/types/user.type";

import Link from "next/link";

export default function MyProfile(user: UserProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={user.profileImage}
          alt="profile"
          className="w-16 h-16 rounded-full border border-primary"
        />
        <div>
          <div className="text-xl font-bold text-primary">{user.nickname}</div>
          <div className="text-sm text-gray-500">{user.bio}</div>
          <div className="text-xs text-gray-400 mt-0.5">{user.affiliation}</div>
        </div>
      </div>
      <Link href={`/profile/${user.id}/edit`}>
        <Button variant="secondary">수정하기</Button>
      </Link>
    </div>
  );
}
