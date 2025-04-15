import Link from "next/link";

export default function AdminChallenge() {
  return (
    <div>
      admin challenge
      <Link href={`/admin/challenge/create`}>생성하기</Link>
    </div>
  );
}
