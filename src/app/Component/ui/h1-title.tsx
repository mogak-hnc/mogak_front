export default function H1Title({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full text-center py-2">
      <h1 className="text-2xl font-bold text-primary dark:text-primary-dark">
        {children}
      </h1>
    </div>
  );
}
