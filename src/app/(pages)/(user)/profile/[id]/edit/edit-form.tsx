import { UseFormRegister, UseFormWatch, UseFormReset } from "react-hook-form";
import Input from "@/app/components/ui/input";
import Checkbox from "@/app/components/ui/checkbox";

type FormValues = {
  nickname: string;
  showBadge: boolean;
};

type Props = {
  register: UseFormRegister<FormValues>;
  watch: UseFormWatch<FormValues>;
  reset: UseFormReset<FormValues>;
};

export default function EditForm({ register, watch, reset }: Props) {
  const nickname = watch("nickname");
  const showBadge = watch("showBadge");

  return (
    <div className="flex flex-col gap-4">
      <Input placeholder="닉네임" {...register("nickname")} />
      <Checkbox
        label="뱃지 내역 비공개하기"
        checked={!showBadge}
        onChange={(val) => {
          reset({ nickname, showBadge: !val }, { keepDirty: true });
        }}
      />
    </div>
  );
}
