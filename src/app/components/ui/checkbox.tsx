import { InputHTMLAttributes, forwardRef } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...props }, ref) => {
    return (
      <label className="inline-flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          ref={ref}
          className="w-4 h-4 rounded border border-gray-300 accent-primary focus:ring-primary"
          {...props}
        />
        {label && (
          <span className="text-sm text-text dark:text-text-dark">{label}</span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
