export default function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="bg-primary dark:bg-primary-dark text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
      {...props}
    >
      {children}
    </button>
  );
}
