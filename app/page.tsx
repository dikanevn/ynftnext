'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Динамический импорт WalletProvider без SSR
const ClientWalletProviderWithNoSSR = dynamic(
  () => import('../components/WalletProvider').then(mod => mod.ClientWalletProvider),
  { ssr: false }
);

// Динамический импорт MintPage без SSR
const MintPageWithNoSSR = dynamic(
  () => import('../components/MintPage').then(mod => mod.MintPage),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <Suspense fallback={<div>Loading...</div>}>
        <ClientWalletProviderWithNoSSR>
          <MintPageWithNoSSR />
        </ClientWalletProviderWithNoSSR>
      </Suspense>
    </main>
  );
}
