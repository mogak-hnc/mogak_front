"use client";

import { useRef, useState } from "react";
import Button from "@/app/components/ui/button";
import { ChallengeProofPost } from "@/lib/client/challenge.client.api";
import Input from "@/app/components/ui/input";
import clsx from "clsx";

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
  const [shake, setShake] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async () => {
    if (!file) {
      setUploadError("인증 사진을 첨부해 주세요.");
      return;
    }
    if (!description.trim()) {
      setUploadError("설명을 입력해 주세요.");
      triggerShake();
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

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleDescriptionChange = (value: string) => {
    if (value.length > 100) {
      setUploadError("100자 이하로 입력해 주세요!");
      triggerShake();
      return;
    }
    setUploadError("");
    setDescription(value);
  };

  return (
    <div className="flex flex-col gap-3">
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
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 
                   file:rounded-md file:border-0 file:text-sm file:font-semibold 
                   file:bg-primary file:text-white hover:file:bg-primary-dark 
                   transition"
      />

      <div className="relative">
        <Input
          type="text"
          value={description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          placeholder="오늘 인증을 설명해 주세요! (선택)"
          className={clsx(
            "w-full mt-1 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary transition",
            shake && "animate-shake"
          )}
        />
        <span className="absolute right-2 bottom-1 text-xs text-gray-400">
          {description.length}/100
        </span>
      </div>

      <p
        className={`text-error dark:text-error-dark text-xs min-h-[16px] ${
          uploadError ? "visible" : "invisible"
        }`}
      >
        {uploadError || "placeholder"}
      </p>

      {isUploading ? (
        <Button disabled className="mt-2 bg-gray-400 animate-pulse">
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
