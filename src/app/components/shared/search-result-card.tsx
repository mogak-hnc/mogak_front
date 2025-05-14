"use client";

import dynamic from "next/dynamic";

const ChallengeResultCard = dynamic(
  () => import("@/app/(pages)/(user)/challenge/challenge-result-card")
);
const ZoneResultCard = dynamic(
  () => import("@/app/(pages)/(user)/zone/zone-result-card")
);

export default function SearchResultCard({
  type,
}: {
  type: "studySpace" | "challenge";
}) {
  return type === "studySpace" ? <ZoneResultCard /> : <ChallengeResultCard />;
}
