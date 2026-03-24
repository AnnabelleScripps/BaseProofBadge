'use client';

import { useEffect, useState } from 'react';
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSwitchChain,
} from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI, CHAIN_ID } from '@/lib/contract';

export default function MintBadge() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');

  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
    chainId: CHAIN_ID,
  });

  useEffect(() => {
    if (isSuccess) setStatus('success');
  }, [isSuccess]);

  const isWrongNetwork = !!chain && chain.id !== CHAIN_ID;

  const handleMint = async () => {
    if (!address) return;

    if (isWrongNetwork) {
      switchChain({ chainId: CHAIN_ID });
      return;
    }

    try {
      setStatus('pending');
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'mintBadge',
        args: [address],
        chainId: CHAIN_ID,
      });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
      <h3 className="text-2xl font-bold text-white">🏅 Mint Your Badge</h3>

      <p className="text-gray-300">
        Mint your unique on-chain verification badge on Base Mainnet.
      </p>

      <div className="text-sm text-gray-400">
        <div>
          Your Address: {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
        </div>
        <div>Network: Base Mainnet</div>
        <div>Target Chain ID: {CHAIN_ID}</div>
      </div>

      {isWrongNetwork ? (
        <button
          onClick={() => switchChain({ chainId: CHAIN_ID })}
          className="w-full py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition-all"
        >
          Switch to Base
        </button>
      ) : (
        <button
          onClick={handleMint}
          disabled={!address || isPending || isConfirming}
          className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending && '⏳ Confirm in Wallet...'}
          {isConfirming && '⏳ Minting Badge...'}
          {!isPending && !isConfirming && status !== 'success' && 'Mint Badge'}
          {status === 'success' && '✅ Badge Minted!'}
        </button>
      )}

      {error && <div className="text-sm text-red-400 break-all">Error: {error.message}</div>}

      {isSuccess && hash && (
        <div className="text-sm text-green-400 break-all">
          ✅ Badge minted successfully!
          <br />
          Transaction: {hash}
        </div>
      )}
    </div>
  );
}
