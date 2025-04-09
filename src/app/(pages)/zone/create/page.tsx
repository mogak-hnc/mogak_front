"use client";

import { useState } from "react";
import FormField from "@/app/Component/shared/form-field";
import Checkbox from "@/app/Component/ui/checkbox";
import Input from "@/app/Component/ui/input";

export default function ZoneCreate() {
  const [spaceName, setSpaceName] = useState("");
  const [usePassword, setUsePassword] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <div>
      <div className="flex flex-col gap-4">
        <FormField label="스페이스 이름">
          <Input
            placeholder="입력하세요"
            value={spaceName}
            onChange={(e) => setSpaceName(e.target.value)}
          />
        </FormField>

        <FormField label="비밀번호 관리">
          <div className="flex items-center gap-2">
            <Checkbox
              label="비밀번호 사용하기"
              checked={usePassword}
              onChange={(checked) => setUsePassword(checked)}
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!usePassword}
              placeholder="비밀번호"
            />
          </div>
        </FormField>
      </div>
    </div>
  );
}
