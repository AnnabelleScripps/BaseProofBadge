'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectWallet } from '@/components/ConnectWallet';
import MintBadge from '@/components/MintBadge';
import RecordAction from '@/components/RecordAction';
import UserProfile from '@/components/UserProfile';

export default function Home() {
  const { isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<'mint' | 'record' | 'profile'>(
    'mint'
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-12">
          <div>
            <div className="text-sm text-blue-400 font-semibold mb-2">BP</div>
            <h1 className="text-4xl font-bold">BaseProofBadge</h1>
          </div>
          <ConnectWallet />
        </header>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">
            On-chain Proof & Badge System
          </h2>
          <p className="text-gray-300 max-w-3xl">
            Generate verifiable badges and record your on-chain actions. Build a
            transparent, traceable participation history on Base Mainnet.
          </p>
        </section>

        {!isConnected && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center mb-10">
            <p className="text-lg text-gray-300">
              Connect your wallet to get started
            </p>
          </div>
        )}

        {isConnected && (
          <>
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => setActiveTab('mint')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'mint'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                Mint Badge
              </button>

              <button
                onClick={() => setActiveTab('record')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'record'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                Record Action
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'profile'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                My Profile
              </button>
            </div>

            <div className="mb-12">
              {activeTab === 'mint' && <MintBadge />}
              {activeTab === 'record' && <RecordAction />}
              {activeTab === 'profile' && <UserProfile />}
            </div>
          </>
        )}

        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-3">Mint Your Badge</h3>
            <p className="text-gray-300">
              Receive a unique on-chain NFT badge that serves as your verifiable
              identity and participation proof.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-3">Record Actions</h3>
            <p className="text-gray-300">
              Log your on-chain activities and build a transparent, immutable
              history of your contributions.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-3">View History</h3>
            <p className="text-gray-300">
              Access and verify your complete action history anytime, fully
              transparent and tamper-proof.
            </p>
          </div>
        </section>

        <footer className="text-center text-sm text-gray-500 border-t border-gray-800 pt-6">
          <div>Built on Base Mainnet • Powered by BaseProofBadge</div>
          <div className="mt-2">Contract: 0x4c50...4409</div>
        </footer>
      </div>
    </main>
  );
}
