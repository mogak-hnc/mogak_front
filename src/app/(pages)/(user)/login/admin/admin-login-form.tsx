"use client";

import Input from "@/app/components/ui/input";
import { useForm } from "react-hook-form";

export default function AdminLoginForm() {
  type AdminLoginValue = {
    id: string;
    pwd: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminLoginValue>({});

  const onSubmit = (data: AdminLoginValue) => {
    console.log("관리자 로그인 시도:", data);

    reset();
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
          placeholder="아이디를 입력하세요"
          {...register("id", { required: "아이디를 입력해주세요" })}
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
          placeholder="비밀번호를 입력하세요"
          {...register("pwd", { required: "비밀번호를 입력해주세요" })}
        />
        {errors.pwd && (
          <p className="text-error dark:text-error-dark text-sm mt-1">
            {errors.pwd.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full max-w-xs py-2 px-4 bg-primary dark:bg-primary-dark text-white rounded-lg hover:bg-opacity-90"
      >
        로그인
      </button>
    </form>
  );
}
