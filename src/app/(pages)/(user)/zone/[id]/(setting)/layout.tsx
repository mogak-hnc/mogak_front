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
        <div className="flex flex-col gap-4">
          <Link href={`/zone/1/space`} className="hover:underline">
            모각존 관리
          </Link>
          <Link href={`/zone/1/member`} className="hover:underline">
            멤버 관리
          </Link>
        </div>
      </aside>
      <main className="flex-grow p-4">{children}</main>
    </div>
  );
}
