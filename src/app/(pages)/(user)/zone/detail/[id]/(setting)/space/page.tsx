"use client";

import { useState } from "react";
import FormField from "@/app/components/shared/form-field";
import Input from "@/app/components/ui/input";
import Checkbox from "@/app/components/ui/checkbox";
import Button from "@/app/components/ui/button";
import H1Title from "@/app/components/ui/h1-title";
import ConfirmModal from "@/app/components/confirm-modal";

export default function ZoneDetailSpacePage() {
  const [spaceName, setSpaceName] = useState("카공해요");
  const [tag, setTag] = useState("카페");
  const [photo, setPhoto] = useState<File | null>(null);
  const [usePassword, setUsePassword] = useState(true);
  const [password, setPassword] = useState("1234");
  const [useChat, setUseChat] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    // 실제 삭제 로직 들어가야 할 부분
    console.log("모각존 삭제 완료");
    setShowModal(false);
  };

  return (
    <div className="max-w-[500px] mx-auto px-4 flex flex-col gap-4">
      <H1Title>모각존 관리</H1Title>

      <FormField label="모각존 이름">
        <Input
          value={spaceName}
          onChange={(e) => setSpaceName(e.target.value)}
        />
      </FormField>

      <FormField label="모각존 태그">
        <Input value={tag} onChange={(e) => setTag(e.target.value)} />
      </FormField>

      <FormField label="모각존 사진">
        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
          className="text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          {photo ? photo.name : "파일이 선택되지 않았습니다."}
        </p>
      </FormField>

      <FormField label="비밀번호 관리">
        <div className="flex items-center gap-4">
          <Checkbox
            label="비밀번호 사용하기"
            checked={usePassword}
            onChange={() => setUsePassword(!usePassword)}
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!usePassword}
            className="w-40"
          />
        </div>
      </FormField>

      <FormField label="채팅 가능 여부">
        <Checkbox
          label="채팅 사용하기"
          onChange={() => setUseChat(!useChat)}
          checked={useChat}
        />
      </FormField>

      <div className="flex gap-2 mt-4">
        <Button>저장</Button>
        <Button>초기화</Button>
        <Button onClick={() => setShowModal(true)}>모각존 삭제하기</Button>
      </div>

      {showModal && (
        <ConfirmModal
          message="정말로 이 모각존을 삭제하시겠습니까?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
