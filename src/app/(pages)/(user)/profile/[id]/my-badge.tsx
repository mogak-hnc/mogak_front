export default function MyBadge({ badges }: { badges: string[] }) {
  if (badges.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-700 mb-3">뱃지</h3>
      <div className="grid grid-cols-6 gap-3">
        {badges.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`badge-${i}`}
            className="w-full h-auto object-contain"
          />
        ))}
      </div>
    </div>
  );
}
