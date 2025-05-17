type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "etc";
};

export default function Button({
  children,
  variant = "secondary",
  className = "",
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: "bg-primary dark:bg-primary-dark text-white",
    secondary: "bg-secondary dark:bg-secondary-dark text-text",
    danger: "bg-error dark:bg-error-dark text-white",
    etc: "bg-borders bg-border-dark dark:bg-borders text-text",
  };

  return (
    <button
      className={`${variantClasses[variant]} px-2 py-1 mt-2 rounded-lg hover:opacity-90 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
