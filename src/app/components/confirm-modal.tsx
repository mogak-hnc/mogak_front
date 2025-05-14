import { ConfirmModalProps } from "@/types/shared.type";

export default function ConfirmModal({
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-[320px]">
        <p className="text-sm text-gray-800 mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="text-sm px-3 py-1 border rounded text-gray-500"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="text-sm px-3 py-1 bg-red-500 text-white rounded"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
