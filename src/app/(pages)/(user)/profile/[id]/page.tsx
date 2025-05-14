"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Button from "@/app/components/ui/button";

import MyBadge from "./my-badge";
import MyChallenge from "./my-challenge";
import MyZone from "./my-zone";
import MyProfile from "./my-profile";
import { UserProps } from "@/types/user.type";

const mockUserProfiles: UserProps = {
  id: "1",
  nickname: "다정",
  bio: "매일매일어쩌구",
  affiliation: "어ㅓㅉ구",
  profileImage:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_tNhjmlgYeAgvZm86aoKUWsE1od65Ja0TCA&s",
  showBadges: true,
  badges: Array(21).fill("/badge.png"),
  challenges: ["알고리즘 챌린지", "영어 단어 외우기"],
  zones: ["카공해요", "스터디룸"],
};

export default function ProfilePage() {
  const params = useParams();
  const userId = params?.id as string;

  const user = mockUserProfiles;

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
      <MyProfile {...user} id={userId} />
      {/* TODO: component 별 Link 추가 */}
      {user.showBadges && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
          <MyBadge badges={user.badges ?? []} />
          <MyChallenge challenges={user.challenges ?? []} />
          <MyZone zones={user.zones ?? []} />
        </div>
      )}
    </div>
  );
}
