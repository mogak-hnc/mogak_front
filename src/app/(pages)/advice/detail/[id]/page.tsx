"use client";

import ChatUI from "@/app/Component/shared/chat-ui";
import { AiFillHeart } from "react-icons/ai";

const mockAdvicePost = {
  id: 1,
  title: "고민이있어요",
  content: "제가 고민이 있는데 저녁을 뭘 먹어야 할까요??",
  deleteIn: "7시간 24분 뒤 삭제",
  sympathyCount: 3,
};

const mockComments = [
  {
    id: 1,
    user: "익명1",
    time: "10:11",
    message: "떡볶이",
    isMe: false,
    avatar: "",
  },
  {
    id: 2,
    user: "익명2",
    time: "10:14",
    message: "시리얼",
    isMe: false,
    avatar: "",
  },
  {
    id: 3,
    user: "나",
    time: "10:20",
    message: "감사합니ㄷ다",
    isMe: true,
    avatar: "",
  },
];

export default function AdviceDetail() {
  return (
    <div className="flex gap-4 max-w-screen-xl mx-auto px-8 py-10">
      <div className="w-[65%] flex flex-col gap-6">
        <div className="flex items-center justify-between border-b pb-2">
          <div>
            <h2 className="text-lg font-bold text-primary">
              {mockAdvicePost.title}
            </h2>
            <p className="text-sm text-gray-400">{mockAdvicePost.deleteIn}</p>
          </div>
          <button className="bg-yellow-400 px-3 py-1 text-sm rounded text-white">
            삭제하기
          </button>
        </div>

        <p className="text-sm text-gray-800 whitespace-pre-line">
          {mockAdvicePost.content}
        </p>

        <div className="flex items-center gap-1 text-red-500 text-sm">
          <AiFillHeart size={18} />
          공감 {mockAdvicePost.sympathyCount}개
        </div>
      </div>

      <div className="w-[35%]">
        <ChatUI messages={mockComments} />
      </div>
    </div>
  );
}
