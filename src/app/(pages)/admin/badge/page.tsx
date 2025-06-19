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
  };

  useEffect(() => {
    loadBadges();
  }, []);

  const onSubmit = async (formData: FormValues) => {
    const imageFile = formData.image?.[0];
    if (!imageFile) return;

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
    { key: "description", label: "설명" },
    {
      key: "badgeId" as any,
      label: "관리",
      render: (_value, row) => (
        <div className="flex gap-2 justify-center">
          <button
            className="text-sm px-2 py-1 bg-borders text-text rounded"
            onClick={() => alert(`조건 추가: ${row.badgeId}`)}
          >
            조건 추가
          </button>
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

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg font-bold text-primary">뱃지 관리</h1>

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
        <select
          {...register("badgeType")}
          className="w-40 text-sm border px-3 py-2 rounded"
        >
          <option value="DURATION">DURATION</option>
          <option value="COUNT">COUNT</option>
          <option value="OFFICIAL">OFFICIAL</option>
        </select>
        <Input
          type="number"
          placeholder="조건값"
          {...register("conditionValue", { valueAsNumber: true })}
          className="w-28"
        />
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
