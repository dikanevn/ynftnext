'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export function MintPage() {
  const { publicKey } = useWallet();

  return (
    <div className="p-3">
      <WalletMultiButton className="rounded-none bg-purple-700 text-white shadow-xl" />
      {publicKey && (
        <div className="mt-4 text-center">
          <p>Кошелек подключен!</p>
        </div>
      )}
    </div>
  );
}

export default MintPage; 