import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TokenSelector } from "@/components/TokenSelector";
import { ProgressBar } from "@/components/ProgressBar";
import { Stats } from "@/components/Stats";
import { Wallet } from "lucide-react";

export default function Index() {
  const [selectedToken, setSelectedToken] = useState("SOL");
  const [amount, setAmount] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // Placeholder data - would be fetched from blockchain in real implementation
  const icoData = {
    totalRaised: 1250000,
    participants: 3456,
    tokenPrice: 0.085,
    currentTokens: 14750000,
    totalTokens: 20000000,
  };

  const handleBuy = () => {
    // Implement wallet connection and transaction logic
    console.log("Buy tokens with", amount, selectedToken);
  };

  return (
    <div className="min-h-screen bg-ico-background text-white p-4">
      <div className="container max-w-4xl mx-auto py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 animate-float">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-ico-primary to-ico-secondary bg-clip-text text-transparent">
            Token ICO Sale
          </h1>
          <p className="text-ico-text text-lg max-w-2xl mx-auto">
            Join our revolutionary project on Solana. Purchase tokens using SOL, USDT, or USDC.
          </p>
        </div>

        {/* Stats */}
        <Stats
          totalRaised={icoData.totalRaised}
          participants={icoData.participants}
          price={icoData.tokenPrice}
        />

        {/* Progress */}
        <div className="bg-ico-card p-6 rounded-lg border border-ico-primary/20">
          <h2 className="text-xl font-bold mb-4 text-ico-text">ICO Progress</h2>
          <ProgressBar
            current={icoData.currentTokens}
            total={icoData.totalTokens}
          />
        </div>

        {/* Purchase Form */}
        <div className="bg-ico-card p-6 rounded-lg border border-ico-primary/20 space-y-4">
          <h2 className="text-xl font-bold mb-4 text-ico-text">Purchase Tokens</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ico-text mb-2">
                Select Payment Token
              </label>
              <TokenSelector selected={selectedToken} onSelect={setSelectedToken} />
            </div>

            <div>
              <label className="block text-sm font-medium text-ico-text mb-2">
                Amount
              </label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-ico-background border-ico-primary/20 text-ico-text"
              />
              {amount && (
                <p className="text-sm text-ico-text mt-2">
                  ≈ {(Number(amount) / icoData.tokenPrice).toFixed(2)} Tokens
                </p>
              )}
            </div>

            {!isWalletConnected ? (
              <Button
                onClick={() => setIsWalletConnected(true)}
                className="w-full bg-gradient-to-r from-ico-primary to-ico-secondary hover:opacity-90 transition-opacity"
              >
                <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
              </Button>
            ) : (
              <Button
                onClick={handleBuy}
                className="w-full bg-gradient-to-r from-ico-primary to-ico-secondary hover:opacity-90 transition-opacity"
                disabled={!amount || Number(amount) <= 0}
              >
                Buy Tokens
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}