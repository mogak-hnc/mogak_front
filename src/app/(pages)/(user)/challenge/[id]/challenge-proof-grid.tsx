"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChallengeProofList } from "@/lib/client/challenge.client.api";
import Pagination from "@/app/components/shared/paginaiton";
import { ChallengeProofItem } from "@/types/challenge.type";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";
interface ChallengeProofGridProps {
  challengeId: string;
}

export default function ChallengeProofGrid({
  challengeId,
}: ChallengeProofGridProps) {
  const [proofImages, setProofImages] = useState<ChallengeProofItem[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchProofs() {
      try {
        const jwt = getJwtFromCookie();
        const res = await ChallengeProofList(challengeId, jwt, page);
        setProofImages(res.content);
        setTotalPages(res.totalPages);
      } catch (err) {
        console.error("인증 목록 불러오기 실패:", err);
      }
    }

    fetchProofs();
  }, [challengeId, page]);

  return (
    <div>
      <h3 className="text-primary font-semibold mt-6 mb-2">인증</h3>

      {proofImages.length > 0 ? (
        <>
          <div className="grid grid-cols-5 gap-2">
            {proofImages.map((src, i) => (
              <Image
                key={i}
                src={src.thumbnailUrl}
                alt={`proof-${i}`}
                width={64}
                height={64}
                className="aspect-square object-cover rounded border border-gray-300"
              />
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      ) : (
        <div className="text-borders dark:text-border-dark text-sm">
          아직 등록된 인증이 없습니다.
        </div>
      )}
    </div>
  );
}
