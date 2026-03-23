'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MintBadge from '@/components/MintBadge';
import RecordAction from '@/components/RecordAction';
import UserProfile from '@/components/UserProfile';

export default function Home() {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<'mint' | 'record' | 'profile'>('mint');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-xl">
              BP
            </div>
            <h1 className="text-xl font-bold">BaseProofBadge</h1>
          </div>
          <ConnectButton />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            On-chain Proof & Badge System
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Generate verifiable badges and record your on-chain actions. Build a transparent, traceable participation history on Base.
          </p>
          {!isConnected && (
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-8">
              <p className="text-gray-400 mb-4">Connect your wallet to get started</p>
              <ConnectButton />
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      {isConnected && (
        <section className="container mx-auto px-4 pb-16">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8 gap-4">
            <button
              onClick={() => setActiveTab('mint')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'mint'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              🎖️ Mint Badge
            </button>
            <button
              onClick={() => setActiveTab('record')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'record'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              📝 Record Action
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'profile'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              👤 My Profile
            </button>
          </div>

          {/* Tab Content */}
          <div className="max-w-2xl mx-auto">
            {activeTab === 'mint' && <MintBadge />}
            {activeTab === 'record' && <RecordAction />}
            {activeTab === 'profile' && <UserProfile />}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <div className="text-4xl mb-4">🎖️</div>
            <h4 className="text-xl font-bold mb-2">Mint Your Badge</h4>
            <p className="text-gray-400">
              Receive a unique on-chain NFT badge that serves as your verifiable identity and participation proof.
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <div className="text-4xl mb-4">📝</div>
            <h4 className="text-xl font-bold mb-2">Record Actions</h4>
            <p className="text-gray-400">
              Log your on-chain activities and build a transparent, immutable history of your contributions.
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <div className="text-4xl mb-4">🔍</div>
            <h4 className="text-xl font-bold mb-2">View History</h4>
            <p className="text-gray-400">
              Access and verify your complete action history anytime, fully transparent and tamper-proof.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>Built on Base Sepolia • Powered by BaseProofBadge</p>
          <p className="mt-2 text-sm">Contract: {`0x4c50...4409`}</p>
        </div>
      </footer>
    </div>
  );
}
