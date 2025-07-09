import { ChallengeSurvivorsResponse } from "@/types/challenge.type";
import { getProfileImage } from "@/utils/shared/profile.util";
import Image from "next/image";
import Link from "next/link";

export default function ChallengeMemberList({
  data,
}: {
  data: ChallengeSurvivorsResponse;
}) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {data.content.map((member) => (
        <Link key={member.memberId} href={`/profile/${member.memberId}`}>
          <div className="flex flex-col items-center gap-1 transition-transform duration-200 hover:scale-105">
            <Image
              src={getProfileImage(member.memberImageUrl)}
              alt={member.nickname}
              width={64}
              height={64}
              className={`rounded-full object-cover border ${
                member.survivor ? "" : "grayscale"
              }`}
            />
            <span className="text-sm">{member.nickname}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
