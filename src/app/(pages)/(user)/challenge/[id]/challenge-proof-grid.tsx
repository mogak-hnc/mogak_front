import { ChallengeProofGridProps } from "@/types/challenge.type";
import Image from "next/image";

export default function ChallengeProofGrid({
  proofImages,
}: ChallengeProofGridProps) {
  return (
    <div>
      <h3 className="text-primary font-semibold mt-6 mb-2">인증</h3>
      {proofImages && proofImages.length > 0 ? (
        <div className="grid grid-cols-5 gap-2">
          {proofImages.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`proof-${i}`}
              width={32}
              height={32}
              className="aspect-square object-cover rounded border border-gray-300"
            />
          ))}
        </div>
      ) : (
        <div className="text-borders dark:text-border-dark text-sm">
          아직 등록된 인증이 없습니다.
        </div>
      )}
    </div>
  );
}
