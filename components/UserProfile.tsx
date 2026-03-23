'use client';

import { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';

export default function UserProfile() {
  const { address } = useAccount();
  const [badgeCount, setBadgeCount] = useState<number | null>(null);
  const [actions, setActions] = useState<string[]>([]);

  const { data: balanceData } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  const { data: actionsData } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getUserActions',
    args: address ? [address] : undefined,
  });

  useEffect(() => {
    if (balanceData !== undefined) {
      setBadgeCount(Number(balanceData));
    }
    if (actionsData) {
      setActions(actionsData as string[]);
    }
  }, [balanceData, actionsData]);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
      <h3 className="text-2xl font-bold mb-6">👤 My Profile</h3>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <div className="text-3xl mb-2">🎖️</div>
          <p className="text-gray-400 text-sm mb-1">Badges Owned</p>
          <p className="text-3xl font-bold">
            {badgeCount !== null ? badgeCount : '...'}
          </p>
        </div>
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <div className="text-3xl mb-2">📝</div>
          <p className="text-gray-400 text-sm mb-1">Actions Recorded</p>
          <p className="text-3xl font-bold">
            {actions.length}
          </p>
        </div>
      </div>

      {/* Wallet Info */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8">
        <h4 className="font-bold mb-3">Wallet Information</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Address:</span>
            <span className="font-mono">{address ? `${address.slice(0, 10)}...${address.slice(-8)}` : 'Not connected'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Network:</span>
            <span className="text-blue-400">Base Sepolia</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Contract:</span>
            <span className="font-mono text-xs">0x4c50...4409</span>
          </div>
        </div>
      </div>

      {/* Action History */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h4 className="font-bold mb-4 flex items-center gap-2">
          <span>📜</span>
          <span>Action History</span>
        </h4>
        {actions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No actions recorded yet. Start by recording your first action!
          </p>
        ) : (
          <div className="space-y-3">
            {actions.map((action, idx) => (
              <div
                key={idx}
                className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 font-bold text-sm">
                      {actions.length - idx}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white">{action}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      Recorded on-chain
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
