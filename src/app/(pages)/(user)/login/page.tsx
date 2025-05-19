"use client";

import SubTitle from "@/app/components/shared/sub-title";
import kakaoLogin from "./kakao_login.png";
import naverLogin from "./naver_login.png";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getClientUser } from "@/utils/client/user.client.util";

export default function LoginPage() {
  const router = useRouter();
  useEffect(() => {
    if (getClientUser()) {
      router.push("/");
    }
  }, []);

  const handleKakaoLogin = () => {
    window.location.href = "/api/auth/kakao/login";
  };

  const handleNaverLogin = () => {
    window.location.href = "/api/auth/naver/login";
  };

  return (
    <div>
      <SubTitle contents="로그인" />
      <span className="flex justify-center items-center mt-4 text-center">
        소셜 로그인을 통해 간편하게 로그인 / 회원가입 해 보세요!
      </span>
      <div className="flex flex-col items-center m-10 justify-center gap-y-5">
        <img
          className="w-60 cursor-pointer"
          src={kakaoLogin.src}
          alt="카카오 로그인"
          onClick={handleKakaoLogin}
        />
        <img
          className="w-60 cursor-pointer"
          src={naverLogin.src}
          alt="네이버 로그인"
          onClick={handleNaverLogin}
        />
      </div>
      <hr className="dark:border-border-dark border-borders" />
      <div className="flex text-sm text-borders dark:text-border-dark justify-center items-center mt-4 text-center">
        관리자 페이지는
        <Link
          className="mx-2 underline italic text-secondary dark:text-secondary-dark"
          href="/login/admin"
        >
          여기
        </Link>
        를 클릭해 주세요.
      </div>
    </div>
  );
}
