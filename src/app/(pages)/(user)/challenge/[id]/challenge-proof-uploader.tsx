"use client";

import { useRef, useState } from "react";
import Button from "@/app/components/ui/button";
import { ChallengeProofPost } from "@/lib/client/challenge.client.api";

interface ChallengeProofUploaderProps {
  challengeId: string;
  onSuccess: () => void;
}

export default function ChallengeProofUploader({
  challengeId,
  onSuccess,
}: ChallengeProofUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async () => {
    if (!file) {
      setUploadError("인증 사진을 첨부해 주세요.");
      return;
    }
    if (!description.trim()) {
      setUploadError("설명을 입력해 주세요.");
      return;
    }
    setUploadError("");
    setIsUploading(true);

    try {
      await ChallengeProofPost({
        challengeId,
        title: description.trim() || "오늘의 챌린지를 완료했어요!",
        images: file,
      });

      setFile(null);
      setDescription("");
      if (fileInputRef.current) fileInputRef.current.value = "";

      onSuccess();
    } catch (err) {
      console.error("인증 업로드 실패:", err);
      setUploadError("업로드에 실패했습니다. 다시 시도해 주세요!");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const selected = e.target.files?.[0];
          if (selected) {
            setFile(selected);
            setUploadError("");
          }
        }}
        className="text-sm"
      />

      <input
        type="text"
        value={description}
        maxLength={100}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="인증 사진 설명 (최대 100자)"
        className="w-full mt-2 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <p
        className={`text-error dark:text-error-dark text-xs mt-1 ${
          uploadError ? "visible" : "invisible"
        }`}
      >
        {uploadError || "placeholder"}
      </p>

      {isUploading ? (
        <Button disabled className="mt-2 bg-gray-400">
          업로드 중...
        </Button>
      ) : (
        <Button onClick={handleUpload} className="mt-2">
          등록하기
        </Button>
      )}
    </div>
  );
}
