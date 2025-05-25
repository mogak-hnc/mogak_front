type ProgressBarProps = {
  label: string;
  value: number;
};

export function ChallengeSummaryChart({ label, value }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1 text-gray-500">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full h-3 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
