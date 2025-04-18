export default function MyZone({ zones }: { zones: string[] }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-700 mb-3">참여 중인 모각존</h3>
      <ul className="list-disc pl-5">
        {zones.map((title, i) => (
          <li key={i}>{title}</li>
        ))}
      </ul>
    </div>
  );
}
