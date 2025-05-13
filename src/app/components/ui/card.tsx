export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background dark:bg-background-dark text-text dark:text-text-dark shadow-md p-6 rounded-2xl">
      {children}
    </div>
  );
}
