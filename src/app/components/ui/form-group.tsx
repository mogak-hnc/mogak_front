import { FormGroupProps } from "@/types/shared.type";

export default function FormGroup({
  label,
  htmlFor,
  children,
}: FormGroupProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor={htmlFor}
        className="block mb-1 text-sm font-medium text-text dark:text-text-dark"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
