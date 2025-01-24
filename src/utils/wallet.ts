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
  window.open('https://phantom.app/', '_blank');
};

export const connectWallet = async (): Promise<string> => {
  const provider = getProvider();
  
  if (!provider) {
    throw new Error('No provider found');
  }

  try {
    const resp = await provider.connect();
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
  } catch (err) {
    console.error("Error disconnecting wallet:", err);
    throw err;
  }
};