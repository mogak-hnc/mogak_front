import Button from "@/app/components/ui/button";

type Props = {
  onReset: () => void;
  isDisabled: boolean;
};

export default function EditButton({ onReset, isDisabled }: Props) {
  return (
    <div className="flex gap-2 mt-4">
      <Button type="submit" disabled={isDisabled}>
        저장
      </Button>
      <Button type="button" variant="etc" onClick={onReset}>
        초기화
      </Button>
    </div>
  );
}
