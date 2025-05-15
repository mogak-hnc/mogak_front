"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Input from "@/app/components/ui/input";
import Checkbox from "@/app/components/ui/checkbox";
import Button from "@/app/components/ui/button";
import { ProfileProps } from "@/types/profile.type";

const mockUserProfiles: Record<string, ProfileProps> = {
  "1": {
    id: "1",
    nickname: "다정",
    bio: "매일매일워어커구",
    affiliation: "매일매일워어커구",
    profileImage: "/profile.png",
    showBadges: true,
    badges: Array(21).fill("/badge.png"),
  },
};

export default function ProfileEditPage() {
  const params = useParams();
  const userId = params?.id as string;

  const user = mockUserProfiles[userId];
  const [nickname, setNickname] = useState(user.nickname);
  const [bio, setBio] = useState(user.bio);
  const [affiliation, setAffiliation] = useState(user.affiliation);
  const [showBadges, setShowBadges] = useState(user.showBadges);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  return (
    <div className="max-w-xl mx-auto py-10 px-6">
      <h1 className="text-center text-xl font-bold text-primary mb-6">
        프로필 수정하기
      </h1>

      <div className="flex flex-col items-center gap-2 mb-6">
        <img
          src={user.profileImage}
          alt="profile"
          className="w-16 h-16 rounded-full border border-primary"
        />
        <div className="text-sm font-semibold">{nickname}</div>
        <input
          type="file"
          onChange={(e) => setProfileImage(e.target.files?.[0] ?? null)}
          className="text-sm"
        />
        <div className="text-xs text-gray-500">
          {profileImage ? profileImage.name : "파일이 선택되지 않았습니다."}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Input
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Input
          placeholder="한마디"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <Input
          placeholder="소속"
          value={affiliation}
          onChange={(e) => setAffiliation(e.target.value)}
        />
        <Checkbox
          label="뱃지 내역 비공개하기"
          checked={!showBadges}
          onChange={(checked) => setShowBadges(!checked)}
        />

        <div className="flex gap-2 mt-4">
          <Button>저장</Button>
          <button className="text-sm px-3 py-2 border rounded text-gray-500">
            초기화
          </button>
        </div>
      </div>
    </div>
  );
}
