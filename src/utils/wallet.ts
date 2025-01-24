import { PublicKey, Connection } from '@solana/web3.js';

export type PhantomEvent = "disconnect" | "connect" | "accountChanged";

export interface PhantomProvider {
  connect: () => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, callback: (args: any) => void) => void;
  isPhantom: boolean;
}

export type Status = 'connected' | 'disconnected' | 'connecting';

export const getProvider = (): PhantomProvider | undefined => {
  if ('solana' in window) {
    const provider = (window as any).solana;
    if (provider.isPhantom) {
      return provider;
    }
  }
  // If Phantom is not installed, redirect to extension install page
  window.open('https://phantom.app/download', '_blank');
  return undefined;
};

export const connectWallet = async (): Promise<string> => {
  const provider = getProvider();
  
  if (!provider) {
    throw new Error('Please install Phantom wallet extension first');
  }

  try {
    const resp = await provider.connect();
    console.log("Wallet connected with public key:", resp.publicKey.toString());
    return resp.publicKey.toString();
  } catch (err) {
    console.error("Error connecting to wallet:", err);
    throw err;
  }
};

export const disconnectWallet = async (): Promise<void> => {
  const provider = getProvider();
  
  if (!provider) {
    throw new Error('No provider found');
  }

  try {
    await provider.disconnect();
    console.log("Wallet disconnected successfully");
  } catch (err) {
    console.error("Error disconnecting wallet:", err);
    throw err;
  }
};