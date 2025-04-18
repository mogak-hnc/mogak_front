export default function MyChallenge({ challenges }: { challenges: string[] }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-700 mb-3">참여 중인 챌린지</h3>
      <ul className="list-disc pl-5">
        {challenges.map((title, i) => (
          <li key={i}>{title}</li>
        ))}
      </ul>
    </div>
  );
}
