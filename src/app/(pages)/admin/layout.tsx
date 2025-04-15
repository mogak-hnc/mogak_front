import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "모각",
  description: "모여서 각자",
  icons: {
    icon: `/favicon.ico`,
  },
};

export default function ZoneDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-grow w-full">
      <aside className="w-1/5 min-w-[200px] border-r px-4 py-8">
        <Link href={`/admin/zone`}>모각존</Link>
        <br />
        <Link href={`/admin/challenge`}>챌린지</Link>
        <br />
        <Link href={`/admin/badge`}>뱃지</Link>
        <br />
        <Link href={`/admin/advice`}>고민 상담 게시판</Link>
      </aside>
      <main className="flex-grow p-4">{children}</main>
    </div>
  );
}
