import Link from "next/link";

export default function HeaderNavigation() {
  const userId = 0;
  return (
    <div className="text-sm gap-x-4 sm:gap-x-6 md:gap-x-9 lg:gap-x-18 flex">
      <Link href={`/zone`}>모각존</Link>
      <Link href={`/challenge`}>챌린지</Link>
      <Link href={`/advice`}>고민상담</Link>
      <Link href={`/profile/${userId}`}>프로필</Link>
      {userId ? (
        <Link href={`/profile/${userId}`}>회원정보</Link>
      ) : (
        <Link href={`/login`}>로그인</Link>
      )}
    </div>
  );
}
