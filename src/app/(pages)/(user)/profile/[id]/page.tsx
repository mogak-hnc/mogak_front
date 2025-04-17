"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { UserProfile } from "./edit/page";
import Button from "@/app/Component/ui/button";

const mockUserProfiles: Record<string, UserProfile> = {
  "1": {
    nickname: "다정",
    bio: "매일매일워어커구",
    affiliation: "매일매일워어커구",
    profileImage: "/profile.png",
    showBadges: true,
    badges: Array(21).fill("/badge.png"),
  },
};

export default function ProfilePage() {
  const params = useParams();
  const userId = params?.id as string;

  const user = mockUserProfiles[userId];

  if (!user)
    return (
      <div className="max-w-4xl mx-auto py-24 px-6 flex flex-col items-center gap-6 text-center">
        <h2 className="text-xl font-bold text-primary dark:text-primary-dark">
          유저를 찾을 수 없습니다.
        </h2>
        <Link href="/">
          <Button variant="secondary">홈 화면으로 돌아가기</Button>
        </Link>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={user.profileImage}
            alt="profile"
            className="w-16 h-16 rounded-full border border-primary"
          />
          <div>
            <div className="text-xl font-bold text-primary">
              {user.nickname}
            </div>
            <div className="text-sm text-gray-500">{user.bio}</div>
            <div className="text-xs text-gray-400 mt-0.5">
              {user.affiliation}
            </div>
          </div>
        </div>
        <Link
          href={`/profile/${userId}/edit`}
          className="px-3 py-1 rounded bg-yellow-400 text-white text-sm"
        >
          수정하기
        </Link>
      </div>

      {user.showBadges && (
        <div>
          <h3 className="text-lg font-bold text-gray-700 mb-3">뱃지</h3>
          <div className="grid grid-cols-6 gap-3">
            {user.badges?.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`badge-${i}`}
                className="w-full h-auto object-contain"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
