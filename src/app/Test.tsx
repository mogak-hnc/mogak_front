"use client";

import { useState } from "react";
import Card from "./Component/ui/card";
import FormGroup from "./Component/ui/form-group";
import Input from "./Component/ui/input";
import Textarea from "./Component/ui/textarea";
import Modal from "./Component/ui/modal";
import Button from "./Component/ui/button";

export default function Test() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">🧪 UI 컴포넌트 테스트</h1>

      <Card>
        <FormGroup label="이름" htmlFor="name">
          <Input
            id="name"
            placeholder="이름을 입력하세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </FormGroup>

        <FormGroup label="소개" htmlFor="bio">
          <Textarea id="bio" placeholder="자기소개를 입력하세요" rows={4} />
        </FormGroup>

        <Button onClick={() => setModalOpen(true)}>모달 열기</Button>
      </Card>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-2">모달 제목</h2>
        <p className="mb-4">모달 내용을 여기에 넣을 수 있습니다.</p>
        <Button onClick={() => setModalOpen(false)}>확인</Button>
      </Modal>
    </div>
  );
}
