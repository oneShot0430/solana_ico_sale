interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 text-ico-text">
        <span>{percentage.toFixed(2)}%</span>
        <span>{current.toLocaleString()} / {total.toLocaleString()} Tokens</span>
      </div>
      <div className="h-2 bg-ico-card rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-ico-primary to-ico-secondary transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}