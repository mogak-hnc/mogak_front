"use client";

import { useState } from "react";

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
}

export default function Checkbox({
  label,
  checked = false,
  onChange,
  id,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    setIsChecked(!isChecked);
    onChange?.(!isChecked);
  };

  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        id={id}
        className="w-4 h-4 rounded border border-gray-300 accent-primary focus:ring-primary"
        checked={isChecked}
        onChange={handleChange}
      />
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
}
