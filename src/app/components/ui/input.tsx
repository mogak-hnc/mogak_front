import React, { forwardRef, InputHTMLAttributes } from "react";

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      ref={ref}
      className="w-full px-4 py-2 rounded-lg border 
        border-borders dark:border-border-dark bg-white dark:bg-border-dark text-text dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
