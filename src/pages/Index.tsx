import { useState, useEffect } from "react";
import * as anchor from "@coral-xyz/anchor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProgressBar } from "@/components/ProgressBar";
import { Stats } from "@/components/Stats";
import { Buffer } from "buffer";
import {
  useWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useConnection, AnchorWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { IDL, BuzeiraSale } from "@/anchor/idl";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { BN } from "@coral-xyz/anchor";
import { getAssociatedTokenAddress, createAssociatedTokenAccountInstruction } from "@solana/spl-token";



export default function Index() {
  const { connection } = useConnection();
  const walletContext = useWallet();
  const { publicKey, sendTransaction } = useWallet();
  const [selectedToken, setSelectedToken] = useState("SOL");
  const [amount, setAmount] = useState("");

  const tokenPrice = 0.00045;
  const PROGRAM_ID = new PublicKey("Fgrg9Ft47mgZ3R7fqo4rdBpaxvCdwrjmgYF8FBapuyfm");
  const systemProgram = new PublicKey("11111111111111111111111111111111");
  const tokenProgram = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
  const signer = new PublicKey("E3bsxBhdhQcSKoxiQsGQEuvu59FTtwZWcaqtQjHFjeY");

  const provider = new anchor.AnchorProvider(connection, walletContext as AnchorWallet, {});
  anchor.setProvider(provider);
  const program = new anchor.Program(IDL, PROGRAM_ID, provider);


  const [protocolStatusPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("protocol_status")],
    program.programId
  );

  const [vaultPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("vault")],
    program.programId
  );

  const [vaultAtaPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("vault_ata")],
    program.programId
  );

  console.log("programs:", protocolStatusPDA.toBase58(), vaultPDA.toBase58(), vaultAtaPDA.toBase58());
  // Placeholder data - would be fetched from blockchain in real implementation
  const [icoData, setIcoData] = useState({
    totalRaised: 0,
    participants: 0,
    tokenPrice: tokenPrice,
    currentTokens: 0,
    totalTokens: 1000000,
    tokenAddress: null
  });

  useEffect(() => {
    fetchProtocolStatus();
  }, []);

  const fetchProtocolStatus = async () => {
    try {
      const protocolStatus = await program.account.protocolStatus.fetch(protocolStatusPDA.toBase58());
      console.log("protocolStatus", protocolStatus);
      calIcoData(protocolStatus);
    } catch (error) {
      console.error("Error fetching protocol status:", error);
    }
  };

  const calIcoData = (protocolStatus) => {
    const totalParticipants = protocolStatus.totalParticipants.toNumber();
    const tokenPrice = protocolStatus.tokenPrice.toNumber() / (Math.pow(10, 9));
    const totalSaleAmount = protocolStatus.totalSaleAmount.toNumber() / protocolStatus.tokenPrice.toNumber();
    const totalRaised = tokenPrice * totalSaleAmount;
    const tokenAddress = protocolStatus.tokenMint;
    const icoData = {
      totalRaised: totalRaised,
      participants: totalParticipants,
      tokenPrice: tokenPrice,
      currentTokens: totalSaleAmount,
      totalTokens: 10000000,
      tokenAddress: tokenAddress,
    }
    setIcoData(icoData);
  }

  const handleBuy = async () => {
    // Implement wallet connection and transaction logic
    if (Number(amount) <= 0) return;
    const buyAmount = new BN(Number(amount) * Math.pow(10, 9));

    const [ata] = PublicKey.findProgramAddressSync(
      [
        publicKey.toBuffer(),          // Owner's public key buffer
        TOKEN_PROGRAM_ID.toBuffer(),        // Token Program ID (always the same)
        icoData.tokenAddress.toBuffer(),             // The mint address of the token (e.g., SOL-wrapped token)
      ],
      ASSOCIATED_TOKEN_PROGRAM_ID         // The Associated Token Program ID
    );

    console.log("buytokens:", ata.toBase58());

    try {
      const tokenAta = await getAssociatedTokenAddress(
        new PublicKey(icoData.tokenAddress),
        publicKey
      );

      console.log("ATA Address:", tokenAta.toBase58());

      // Check if the account exists
      const accountInfo = await connection.getAccountInfo(tokenAta);
      const transaction = new Transaction()
      const buyTransaction = await program.methods
        .buyToken(buyAmount)
        .accounts({
          protocolStatus: protocolStatusPDA,
          vault: vaultPDA,
          mint: new PublicKey(icoData.tokenAddress),
          fromAta: vaultAtaPDA,
          toAta: ata,
          signer: publicKey,
          systemProgram: systemProgram,
          tokenProgram: tokenProgram,
        })
        .instruction();

      console.log("transaction;", buyTransaction);

      if (!accountInfo) {
        console.log("Creating Associated Token Account...");
        const createAtaTransaction = createAssociatedTokenAccountInstruction(
          publicKey,
          tokenAta,
          publicKey,
          new PublicKey(icoData.tokenAddress),
        );
        console.log("createAtaTransaction;", createAtaTransaction);
        transaction.add(
          createAtaTransaction,
          buyTransaction
        );
      } else {
        transaction.add(
          buyTransaction
        );
      }

      const transactionSignature = await sendTransaction(
        transaction,
        connection
      );

      setTimeout(() => {
        fetchProtocolStatus();
      }, 1000)

      console.log(`View on explorer: https://solana.fm/tx/${transactionSignature}?cluster=devnet-alpha`);


    } catch (error) {
      console.error("Buy tokens failed:", error);
    }
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
            Join our revolutionary project on Solana. Purchase tokens using SOL.
          </p>
          <WalletMultiButton className="w-full" />
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
            <Button
              onClick={handleBuy}
              className="w-full bg-gradient-to-r from-ico-primary to-ico-secondary hover:opacity-90 transition-opacity"
              disabled={!amount || Number(amount) <= 0}
            >
              Buy Tokens
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
