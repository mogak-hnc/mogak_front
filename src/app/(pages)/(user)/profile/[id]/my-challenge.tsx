export default function MyChallenge({ challenges }: { challenges: string[] }) {
  if (challenges.length === 0) return null;

  return (
    <div className="bg-white dark:bg-border-dark p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-bold text-primary mb-4">참여 중인 챌린지</h3>
      <ul className="space-y-2 list-inside list-disc text-sm text-gray-800 dark:text-gray-300">
        {challenges.map((title, i) => (
          <li key={i}>{title}</li>
        ))}
      </ul>
    </div>
  );
}
