import { ChallengeSurvivorsList } from "@/lib/client/challenge.client.api";
import { getProfileImage } from "@/utils/shared/profile.util";
import Image from "next/image";
import { getJwtFromServerCookie } from "@/utils/server/jwt.server.util";
import Link from "next/link";

export default async function ChallengeSurvivorsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const jwt = await getJwtFromServerCookie();
  const data = await ChallengeSurvivorsList(id, jwt, 0);

  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-bold mb-4 text-primary dark:text-primary-dark">
        생존자 목록
      </h2>

      <ul className="grid grid-cols-5 gap-4">
        {data.content.map((member) => (
          <Link key={member.memberId} href={`/profile/${member.memberId}`}>
            <li className="flex flex-col items-center gap-1">
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
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
