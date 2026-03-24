'use client';

import { useEffect, useState } from 'react';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from 'wagmi';
import { base } from 'wagmi/chains';
import { CHAIN_ID } from '@/lib/contract';

export function ConnectWallet() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const [showMenu, setShowMenu] = useState(false);
  const [wrongNetwork, setWrongNetwork] = useState(false);

  useEffect(() => {
    if (isConnected && chain) {
      setWrongNetwork(chain.id !== CHAIN_ID);
    }
  }, [isConnected, chain]);

  const handleConnect = (connector: any) => {
    connect({ connector });
    setShowMenu(false);
  };

  const handleSwitchNetwork = () => {
    switchChain({ chainId: CHAIN_ID });
  };

  if (!isConnected) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          disabled={isPending}
          className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Connecting...' : 'Connect Wallet'}
        </button>

        {showMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowMenu(false)}
            />
            <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-xl shadow-2xl z-20 p-2 border border-gray-700">
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => handleConnect(connector)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-3 text-white"
                >
                  <span>
                    {connector.name.includes('MetaMask')
                      ? '🦊'
                      : connector.name.includes('Coinbase')
                      ? '🔵'
                      : '👛'}
                  </span>
                  <span>{connector.name}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {wrongNetwork && (
        <button
          onClick={handleSwitchNetwork}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg text-sm transition-all"
        >
          Switch to Base
        </button>
      )}

      <div className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700">
        {address?.slice(0, 6)}...{address?.slice(-4)}
      </div>

      <button
        onClick={() => disconnect()}
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all"
      >
        Disconnect
      </button>
    </div>
  );
}
