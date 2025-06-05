import { CustomModalProps } from "@/types/shared.type";

export default function CustomModal({
  message,
  onConfirm,
  onMove,
  confirmMsg,
  moveMsg,
}: CustomModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-[320px]">
        <p className="text-sm text-gray-800 mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onMove}
            className="text-sm px-3 py-1 bg-secondary dark:bg-secondary-dark text-white rounded"
          >
            {moveMsg}
          </button>{" "}
          <button
            onClick={onConfirm}
            className="text-sm px-3 py-1 bg-borders dark:bg-border-dark text-white rounded"
          >
            {confirmMsg}
          </button>
        </div>
      </div>
    </div>
  );
}
