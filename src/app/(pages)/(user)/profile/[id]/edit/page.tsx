"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import SubTitle from "@/app/components/shared/sub-title";
import { ProfileFormProps, ProfileInfoResponse } from "@/types/profile.type";
import {
  profileDelete,
  profileInfo,
  profilePatch,
} from "@/lib/client/profile.client.api";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";
import EditImage from "./edit-image";
import EditForm from "./edit-form";
import EditButton from "./edit-button";
import ConfirmModal from "@/app/components/confirm-modal";

export default function ProfileEditPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params?.id as string;

  const [data, setData] = useState<ProfileInfoResponse | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [deleteImage, setDeleteImage] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | Error | null | unknown>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<ProfileFormProps>({
    defaultValues: { nickname: "", showBadge: true },
  });

  useEffect(() => {
    const fetchInitial = async () => {
      const jwt = getJwtFromCookie();
      if (!jwt) {
        return;
      }

      try {
        const fetched = await profileInfo(userId, jwt);
        setData(fetched);
        reset({
          nickname: fetched.nickname,
          showBadge: fetched.showBadge,
        });
        setProfileImage(null);
        setDeleteImage(false);
      } catch (e) {
        setError(e);
        console.error("유저 정보 불러오기 실패", e);
      }
    };

    fetchInitial();
  }, [userId, reset]);

  const onSubmit = async (formData: ProfileFormProps) => {
    const jwt = getJwtFromCookie();
    if (!jwt || !data) {
      return;
    }

    try {
      await profilePatch(jwt, {
        nickname: formData.nickname,
        showBadge: formData.showBadge,
        deleteImage,
        image: deleteImage ? null : profileImage,
      });
      router.push(`/profile/${userId}`);
    } catch (e) {
      console.error("수정 실패", e);
    }
  };

  const handleReset = () => {
    if (!data) {
      return;
    }
    reset({ nickname: data.nickname, showBadge: data.showBadge });
    setProfileImage(null);
    setDeleteImage(false);
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/auth/kakao/withdraw`, { method: "POST" });
      await profileDelete();

      router.push(`/`);
    } catch (err) {
      setDeleteModal(true);
      console.log(`탈퇴 실패 : ${err}`);
    }
  };

  const nickname = watch("nickname");

  if (!data) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  return (
    <div className="max-w-xl mx-auto py-10 px-6">
      <SubTitle contents="프로필 수정하기" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <EditImage
          imageUrl={data.imageUrl}
          profileImage={profileImage}
          deleteImage={deleteImage}
          setProfileImage={setProfileImage}
          setDeleteImage={setDeleteImage}
          nickname={nickname}
        />
        <EditForm
          register={register}
          watch={watch}
          setValue={setValue}
          errors={errors}
        />
        {error instanceof Error && (
          <p className="text-error dark:text-error-dark">{error.message}</p>
        )}

        <div className="flex justify-center items-center gap-4">
          <EditButton
            onReset={handleReset}
            isDisabled={!isDirty && !profileImage && !deleteImage}
          />
        </div>
      </form>

      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setShowModal(true)}
          className="text-sm text-error hover:text-error-dark transition"
        >
          모각 탈퇴하기
        </button>
      </div>

      {showModal && (
        <ConfirmModal
          message="정말 탈퇴하시겠습니까?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
      {deleteModal && (
        <ConfirmModal
          message="탈퇴에 실패했습니다. 다시 시도하시겠어요?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
