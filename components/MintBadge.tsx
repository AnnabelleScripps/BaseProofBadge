'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';

export default function MintBadge() {
  const { address } = useAccount();
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleMint = async () => {
    if (!address) return;
    
    try {
      setStatus('pending');
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'mintBadge',
        args: [address],
      });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (isSuccess && status !== 'success') {
    setStatus('success');
  }

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
      <h3 className="text-2xl font-bold mb-4">🎖️ Mint Your Badge</h3>
      <p className="text-gray-400 mb-6">
        Mint your unique on-chain verification badge. This NFT proves your participation and serves as your identity in the BaseProofBadge ecosystem.
      </p>

      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-400">Your Address:</span>
          <span className="font-mono text-sm">{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Network:</span>
          <span className="text-blue-400">Base Sepolia</span>
        </div>
      </div>

      <button
        onClick={handleMint}
        disabled={isPending || isConfirming || status === 'success'}
        className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
          status === 'success'
            ? 'bg-green-500 hover:bg-green-600'
            : isPending || isConfirming
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isPending && '⏳ Confirm in Wallet...'}
        {isConfirming && '⏳ Minting Badge...'}
        {status === 'success' && '✅ Badge Minted!'}
        {!isPending && !isConfirming && status !== 'success' && '🎖️ Mint Badge'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-900/20 border border-red-700 rounded-lg text-red-400 text-sm">
          Error: {error.message}
        </div>
      )}

      {isSuccess && (
        <div className="mt-4 p-4 bg-green-900/20 border border-green-700 rounded-lg text-green-400 text-sm">
          <p className="font-bold mb-2">✅ Badge minted successfully!</p>
          <p className="break-all">Transaction: {hash}</p>
        </div>
      )}
    </div>
  );
}
