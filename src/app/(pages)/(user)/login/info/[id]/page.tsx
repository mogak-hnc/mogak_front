"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Input from "@/app/Component/ui/input";
import Button from "@/app/Component/ui/button";

const mockLoginInfo = {
  nickname: "다정",
  birth: "2000-01-01",
  email: "매일매일워어커구",
  userId: "매일매일워어커구",
  profileImage: "/profile.png",
};

export default function LoginInfo() {
  const { id } = useParams();
  const [birth, setBirth] = useState(mockLoginInfo.birth);
  const [email, setEmail] = useState(mockLoginInfo.email);
  const [userId, setUserId] = useState(mockLoginInfo.userId);

  return (
    <div className="max-w-xl mx-auto py-10 px-6 ">
      <h1 className="text-center text-xl font-bold text-primary mb-6">
        회원 정보 수정하기
      </h1>

      <div className="flex items-center gap-4 mb-8">
        <img
          src={mockLoginInfo.profileImage}
          alt="profile"
          className="w-16 h-16 rounded-full border border-primary"
        />
        <div className="text-lg font-semibold text-primary">
          {mockLoginInfo.nickname}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">생년월일</label>
          <Input
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            placeholder="YYYY-MM-DD"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">이메일</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">아이디</label>
          <Input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="아이디를 입력하세요"
          />
        </div>

        <div className="flex gap-3 mt-6">
          <Button type="submit">저장</Button>
          <Button variant="etc">탈퇴</Button>
        </div>
      </div>
    </div>
  );
}
