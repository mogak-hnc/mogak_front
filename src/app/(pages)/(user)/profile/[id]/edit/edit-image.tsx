"use client";

import { getProfileImage } from "@/utils/shared/profile.util";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  imageUrl: string;
  profileImage: File | null;
  deleteImage: boolean;
  setProfileImage: Dispatch<SetStateAction<File | null>>;
  setDeleteImage: Dispatch<SetStateAction<boolean>>;
  nickname: string;
};

export default function EditImage({
  imageUrl,
  profileImage,
  deleteImage,
  setProfileImage,
  setDeleteImage,
  nickname,
}: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (profileImage) {
      const url = URL.createObjectURL(profileImage);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setPreviewUrl(null);
    }
  }, [profileImage]);

  return (
    <div className="flex flex-col items-center gap-2">
      {deleteImage ? (
        <div className="w-16 h-16 rounded-full border border-primary dark:border-primary-dark bg-gray-100 flex items-center justify-center text-xs text-gray-400">
          이미지 없음
        </div>
      ) : (
        <img
          src={previewUrl || getProfileImage(imageUrl)}
          alt="profile"
          className="w-16 h-16 rounded-full border border-primary dark:border-primary-dark object-cover"
        />
      )}

      <div className="text-sm font-semibold">{nickname}</div>

      <input
        type="file"
        onChange={(e) => {
          setProfileImage(e.target.files?.[0] ?? null);
          setDeleteImage(false);
        }}
        className="text-sm"
        disabled={deleteImage}
      />

      <div className="text-xs text-border-dark dark:text-borders">
        {profileImage
          ? profileImage.name
          : deleteImage
          ? "이미지 삭제 예정"
          : "파일이 선택되지 않았습니다."}
      </div>

      {!deleteImage && imageUrl !== "Default" && (
        <button
          type="button"
          onClick={() => {
            setDeleteImage(true);
            setProfileImage(null);
          }}
          className="text-xs text-error dark:text-error-dark underline"
        >
          프로필 이미지 삭제
        </button>
      )}
    </div>
  );
}
