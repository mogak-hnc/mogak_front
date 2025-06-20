"use client";

import Input from "@/app/components/ui/input";
import { AdminLoginValue } from "@/types/auth.type";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AdminLoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginValue>({});

  const onSubmit = async (data: AdminLoginValue) => {
    setErrorMessage("");

    const res = await fetch("/api/internal/admin-login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const message = await res.text();

    if (!res.ok) {
      setErrorMessage(message);
      return;
    }

    router.push("/login/admin/callback?q=admin");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 mx-auto mt-10 flex flex-col items-center"
    >
      <div className="w-full max-w-xs">
        <label className="block mb-1 text-sm font-medium text-text dark:text-text-dark">
          아이디
        </label>
        <Input
          type="text"
          placeholder="아이디"
          {...register("id", { required: "아이디를 입력해 주세요." })}
        />
        {errors.id && (
          <p className="text-error dark:text-error-dark text-sm mt-1">
            {errors.id.message}
          </p>
        )}
      </div>

      <div className="w-full max-w-xs">
        <label className="block mb-1 text-sm font-medium text-text dark:text-text-dark">
          비밀번호
        </label>
        <Input
          type="password"
          placeholder="비밀번호"
          {...register("pw", { required: "비밀번호를 입력해 주세요." })}
        />
        {errors.pw && (
          <p className="text-error dark:text-error-dark text-sm mt-1">
            {errors.pw.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full max-w-xs py-2 px-4 bg-primary dark:bg-primary-dark text-white rounded-lg hover:bg-opacity-90"
      >
        로그인
      </button>
      {errorMessage && (
        <p className="text-error dark:text-error-dark text-sm text-center mt-2">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
