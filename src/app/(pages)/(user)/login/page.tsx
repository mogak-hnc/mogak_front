"use client";

import SubTitle from "@/app/Component/shared/sub-title";
import kakaoLogin from "./kakao_login.png";
import naverLogin from "./naver_login.png";

export default function LoginPage() {
  const handleKakaoLogin = () => {
    window.location.href = "/api/auth/kakao/login";
  };

  const handleNaverLogin = () => {
    window.location.href = "/api/auth/naver/login";
  };

  return (
    <div>
      <SubTitle contents="로그인" />
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
    </div>
  );
}
