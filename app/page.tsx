'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Динамический импорт WalletProvider без SSR
const ClientWalletProviderWithNoSSR = dynamic(
  () => import('../components/WalletProvider').then(mod => mod.ClientWalletProvider),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen p-1">
      <ClientWalletProviderWithNoSSR>
        <div className="p-4 text-center">
          <h1 className="text-2xl font-bold">Hello World!</h1>
        </div>
      </ClientWalletProviderWithNoSSR>
    </main>
  );
} 