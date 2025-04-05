export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background dark:bg-background-dark text-text dark:text-text-dark p-6 rounded-xl shadow-lg min-w-[300px]">
        {children}
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="text-sm text-error dark:text-error-dark hover:underline"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
