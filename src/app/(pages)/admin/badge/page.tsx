"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AdminTable from "@/app/components/admin/admin-table";
import Input from "@/app/components/ui/input";
import Button from "@/app/components/ui/button";
import {
  adminBadgeDelete,
  adminBadgeList,
  adminBadgePost,
} from "@/lib/client/badge.client.api";
import {
  AdminBadgePostRequest,
  AdminBadgeProps,
  Column,
} from "@/types/admin.type";

import Loading from "@/app/loading";

type FormValues = AdminBadgePostRequest & {
  image: FileList;
};

export default function AdminBadgePage() {
  const [badges, setBadges] = useState<AdminBadgeProps[]>([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      badgeType: "DURATION",
      conditionValue: 0,
    },
  });

  const loadBadges = async () => {
    const data = await adminBadgeList();

    if (data) {
      setBadges(data);
    }
    console.log(data);
  };

  useEffect(() => {
    loadBadges();
  }, []);

  const onSubmit = async (formData: FormValues) => {
    const imageFile = formData.image?.[0];
    if (!imageFile) {
      return;
    }

    try {
      setLoading(true);

      await adminBadgePost(
        {
          name: formData.name,
          description: formData.description,
          badgeType: formData.badgeType,
          conditionValue: formData.conditionValue,
        },
        imageFile
      );
      await loadBadges();
      reset();
    } catch (err) {
      console.log(`뱃지 생성 실패 : ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await adminBadgeDelete(id);
    console.log("뱃지 삭제 성공 : ", id);
    await loadBadges();
  };

  const columns: Column<AdminBadgeProps>[] = [
    { key: "badgeId", label: "일련번호" },
    {
      key: "iconUrl",
      label: "이미지",
      render: (src) => (
        <img
          src={String(src)}
          alt="badge"
          className="w-10 h-10 object-contain mx-auto"
        />
      ),
    },
    { key: "name", label: "이름" },
    { key: "badgeType", label: "타입" },
    { key: "description", label: "설명" },
    {
      key: "badgeIdSetting",
      label: "관리",
      render: (_value, row) => (
        <div className="flex gap-2 justify-center">
          <button
            className="text-sm px-2 py-1 bg-error dark:bg-error-dark text-white rounded"
            onClick={() => handleDelete(String(row.badgeId))}
          >
            삭제
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg font-bold text-primary dark:text-primary-dark">
        뱃지 관리
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap gap-4 items-center"
      >
        <Input
          placeholder="이름"
          {...register("name", { required: true })}
          className="w-40"
        />
        <Input
          placeholder="설명"
          {...register("description")}
          className="w-40"
        />
        <div className="flex flex-col gap-1">
          <select
            {...register("badgeType")}
            className="w-40 text-sm border px-3 py-2 rounded"
          >
            <option value="DURATION">연속 성공</option>
            <option value="COUNT">총 성공</option>
            <option value="OFFICIAL">공식</option>
          </select>
          <p className="text-xs text-borders dark:text-border-dark">
            뱃지 타입을 선택하세요.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="number"
            placeholder="조건값"
            {...register("conditionValue", { valueAsNumber: true })}
            className="w-28"
          />
          <p className="text-xs text-borders dark:text-border-dark">
            뱃지를 부여할 조건 횟수를 입력하세요.
          </p>
        </div>

        <input
          type="file"
          {...register("image", { required: true })}
          className="text-sm"
        />
        <Button type="submit">등록</Button>
      </form>

      <AdminTable columns={columns} data={badges} />
    </div>
  );
}
