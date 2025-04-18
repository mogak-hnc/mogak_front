export default function MyBadge({ badges }: { badges: string[] }) {
  if (badges.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-border-dark p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-bold text-primary mb-4">보유 뱃지</h3>
      <div className="grid grid-cols-5 lg:grid-cols-3 gap-2">
        {badges.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`badge-${i}`}
            className="w-full h-auto object-contain rounded-md"
          />
        ))}
      </div>
    </div>
  );
}
