import React, { createContext, useContext, useState, ReactNode } from 'react';
import { connectWallet, disconnectWallet, PhantomProvider } from '@/utils/wallet';
import { useToast } from '@/hooks/use-toast';

interface WalletContextType {
  isWalletConnected: boolean;
  walletAddress: string;
  handleWalletConnection: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const { toast } = useToast();

  const handleWalletConnection = async () => {
    if (!isWalletConnected) {
      try {
        const address = await connectWallet();
        setWalletAddress(address);
        setIsWalletConnected(true);
        toast({
          title: "Wallet Connected",
          description: `Connected to ${address.slice(0, 4)}...${address.slice(-4)}`,
        });
      } catch (error) {
        toast({
          title: "Connection Failed",
          description: "Failed to connect to Phantom wallet",
          variant: "destructive",
        });
      }
    } else {
      try {
        await disconnectWallet();
        setWalletAddress('');
        setIsWalletConnected(false);
        toast({
          title: "Wallet Disconnected",
          description: "Successfully disconnected wallet",
        });
      } catch (error) {
        toast({
          title: "Disconnection Failed",
          description: "Failed to disconnect wallet",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <WalletContext.Provider
      value={{
        isWalletConnected,
        walletAddress,
        handleWalletConnection,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}