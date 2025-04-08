import Link from "next/link";

export default function Challenge() {
  return (
    <div>
      challenge <br />
      <Link href={`/challenge/create`}>create</Link>
    </div>
  );
}
