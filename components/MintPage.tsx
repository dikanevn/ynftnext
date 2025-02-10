'use client';

import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';

const RECIPIENT_ADDRESS = new PublicKey("3HE6EtGGxMRBuqqhz2gSs3TDRXebSc8HDDikZd1FYyJj");
const TRANSFER_AMOUNT = 0.001 * LAMPORTS_PER_SOL; // 0.001 SOL в лампортах

export function MintPage() {
  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const wallet = useWallet();

  const onTransferSol = async () => {
    if (!publicKey || !signTransaction) {
      alert("Пожалуйста, подключите кошелек!");
      return;
    }
    try {
      setLoading(true);

      // Создаем инструкцию для трансфера SOL
      const instruction = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: RECIPIENT_ADDRESS,
        lamports: TRANSFER_AMOUNT,
      });

      // Создаем транзакцию
      const transaction = new Transaction().add(instruction);
      transaction.feePayer = publicKey;
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

      // Подписываем и отправляем транзакцию
      const signedTx = await signTransaction(transaction);
      const txid = await connection.sendRawTransaction(signedTx.serialize());
      
      console.log("Transaction ID:", txid);
      alert("Транзакция отправлена. TXID: " + txid);

    } catch (error) {
      console.error("Ошибка при отправке SOL:", error);
      alert(`Ошибка: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  const onCreatePNFT = async () => {
    if (!publicKey) {
      alert("Пожалуйста, подключите кошелек!");
      return;
    }
    try {
      setLoading(true);

      // Инициализируем Metaplex с подключенным кошельком
      const metaplex = Metaplex.make(connection)
        .use(walletAdapterIdentity(wallet));

      // Создаём программируемый NFT (pNFT)
      const { nft } = await metaplex.nfts().create({
        uri: "https://arweave.net/123", // Замените на реальный URI с метаданными
        name: "My Programmable NFT",
        sellerFeeBasisPoints: 500, // 5% роялти
        symbol: "PNFT",
        creators: [
          {
            address: publicKey,
            share: 100,
          },
        ],
        isMutable: true,
        tokenStandard: 4, // TokenStandard.ProgrammableNonFungible
        ruleSet: null, // Можно добавить правила для pNFT
      });

      const mintAddress = nft.address.toString();
      console.log("Created pNFT:", {
        mintAddress,
        name: nft.name,
        symbol: nft.symbol,
        uri: nft.uri,
      });
      alert(`pNFT создан успешно! Mint address: ${mintAddress}`);

    } catch (error) {
      console.error("Ошибка при создании pNFT:", error);
      alert(`Ошибка: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3">
      <WalletMultiButton className="rounded-none bg-purple-700 text-white shadow-xl" />
      {publicKey && (
        <div className="flex flex-col gap-4">
          <button 
            onClick={onTransferSol} 
            disabled={loading}
            className="mt-5 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Processing...' : 'Send 0.001 SOL'}
          </button>
          <button 
            onClick={onCreatePNFT} 
            disabled={loading}
            className="px-4 py-2 bg-purple-500 text-white  hover:bg-purple-600 disabled:bg-gray-400"
          >
            {loading ? 'Creating pNFT...' : 'Create pNFT'}
          </button>
        </div>
      )}
    </div>
  );
}

export default MintPage; 