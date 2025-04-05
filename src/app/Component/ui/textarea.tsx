export default function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      className="w-full px-4 py-2 rounded-lg border border-border dark:border-border-dark bg-white dark:bg-background-dark text-text dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark resize-none"
      {...props}
    />
  );
}
