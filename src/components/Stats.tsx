interface StatsProps {
  totalRaised: number;
  participants: number;
  price: number;
}

export function Stats({ totalRaised, participants, price }: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {[
        { label: "Total Raised", value: `$${totalRaised.toLocaleString()}` },
        { label: "Participants", value: participants.toLocaleString() },
        { label: "Token Price", value: `$${price.toFixed(3)}` },
      ].map((stat) => (
        <div key={stat.label} className="bg-ico-card p-4 rounded-lg border border-ico-primary/20">
          <p className="text-ico-text/60 text-sm">{stat.label}</p>
          <p className="text-ico-text text-xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}