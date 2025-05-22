import Input from "@/app/components/ui/input";
import Checkbox from "@/app/components/ui/checkbox";
import { ProfileEditProps } from "@/types/profile.type";

export default function EditForm({
  register,
  watch,
  setValue,
  errors,
}: ProfileEditProps) {
  const showBadge = watch("showBadge");

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="닉네임"
        {...register("nickname", {
          required: "닉네임은 필수입니다.",
          maxLength: {
            value: 15,
            message: "닉네임은 15자 이하로 입력해 주세요.",
          },
          onChange: (e) => {
            const value = e.target.value;
            if (value.length <= 15) {
              return e;
            } else {
              e.target.value = value.slice(0, 15);
              return e;
            }
          },
        })}
      />
      {errors.nickname && (
        <p className="text-sm text-error mt-1">{errors.nickname.message}</p>
      )}
      <div className="flex justify-center">
        <Checkbox
          label="뱃지 공개 여부"
          checked={showBadge}
          onChange={(e) => {
            setValue("showBadge", e.target.checked, { shouldDirty: true });
          }}
        />
      </div>
    </div>
  );
}
