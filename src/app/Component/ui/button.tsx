export default function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="bg-secondary dark:bg-secondary-dark text-text px-2 py-1 mt-2 rounded-lg hover:opacity-90 transition"
      {...props}
    >
      {children}
    </button>
  );
}
