'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';

export default function RecordAction() {
  const { address } = useAccount();
  const [actionText, setActionText] = useState('');
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleRecord = async () => {
    if (!address || !actionText.trim()) return;
    
    try {
      setStatus('pending');
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'recordAction',
        args: [address, actionText.trim()],
      });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (isSuccess && status !== 'success') {
    setStatus('success');
    setActionText('');
  }

  const actionExamples = [
    'Completed tutorial',
    'Made first transaction',
    'Joined community event',
    'Contributed to project',
    'Verified identity',
  ];

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
      <h3 className="text-2xl font-bold mb-4">📝 Record an Action</h3>
      <p className="text-gray-400 mb-6">
        Record your on-chain activities to build a transparent and verifiable participation history.
      </p>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-gray-300">
          Action Description
        </label>
        <textarea
          value={actionText}
          onChange={(e) => setActionText(e.target.value)}
          placeholder="Describe your action (e.g., Completed onboarding, Made first swap, etc.)"
          className="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
          rows={4}
          maxLength={200}
        />
        <div className="text-right text-sm text-gray-500 mt-1">
          {actionText.length} / 200 characters
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-2">Quick Examples:</p>
        <div className="flex flex-wrap gap-2">
          {actionExamples.map((example, idx) => (
            <button
              key={idx}
              onClick={() => setActionText(example)}
              className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleRecord}
        disabled={!actionText.trim() || isPending || isConfirming || status === 'success'}
        className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
          status === 'success'
            ? 'bg-green-500 hover:bg-green-600'
            : isPending || isConfirming || !actionText.trim()
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isPending && '⏳ Confirm in Wallet...'}
        {isConfirming && '⏳ Recording Action...'}
        {status === 'success' && '✅ Action Recorded!'}
        {!isPending && !isConfirming && status !== 'success' && '📝 Record Action'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-900/20 border border-red-700 rounded-lg text-red-400 text-sm">
          Error: {error.message}
        </div>
      )}

      {isSuccess && (
        <div className="mt-4 p-4 bg-green-900/20 border border-green-700 rounded-lg text-green-400 text-sm">
          <p className="font-bold mb-2">✅ Action recorded successfully!</p>
          <p className="break-all">Transaction: {hash}</p>
        </div>
      )}
    </div>
  );
}
