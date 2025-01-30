import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Token {
  symbol: string;
  name: string;
  icon: string;
}

const tokens: Token[] = [
  { symbol: "SOL", name: "Solana", icon: "☀️" },
  // { symbol: "USDC", name: "USD Coin", icon: "💵" },
  // { symbol: "USDT", name: "Tether", icon: "💰" },
];

interface TokenSelectorProps {
  onSelect: (token: string) => void;
  selected: string;
}

export function TokenSelector({ onSelect, selected }: TokenSelectorProps) {
  return (
    <Select value={selected} onValueChange={onSelect}>
      <SelectTrigger className="w-full bg-ico-card border-ico-primary/20">
        <SelectValue placeholder="Select token" />
      </SelectTrigger>
      <SelectContent className="bg-ico-card border-ico-primary/20">
        {tokens.map((token) => (
          <SelectItem key={token.symbol} value={token.symbol} className="text-ico-text hover:bg-ico-primary/20">
            <span className="flex items-center gap-2">
              {token.icon} {token.symbol}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}