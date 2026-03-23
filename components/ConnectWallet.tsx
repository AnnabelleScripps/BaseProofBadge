'use client';

import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { useState, useEffect } from 'react';

export function ConnectWallet() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [showMenu, setShowMenu] = useState(false);
  const [wrongNetwork, setWrongNetwork] = useState(false);

  const supportedChains = [base.id, baseSepolia.id];

  useEffect(() => {
    if (isConnected && chain) {
      setWrongNetwork(!supportedChains.includes(chain.id));
    }
  }, [isConnected, chain]);

  const handleConnect = (connector: any) => {
    connect({ connector });
    setShowMenu(false);
  };

  const handleSwitchNetwork = (chainId: number) => {
    switchChain({ chainId });
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
              className="fixed inset-0 z-40" 
              onClick={() => setShowMenu(false)}
            />
            <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
              <div className="p-2">
                {connectors.map((connector) => (
                  <button
                    key={connector.id}
                    onClick={() => handleConnect(connector)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                      {connector.name.includes('MetaMask') ? '🦊' : 
                       connector.name.includes('Coinbase') ? '🔵' : '💼'}
                    </div>
                    <span className="font-medium">{connector.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {wrongNetwork && (
        <div className="flex gap-2">
          <button
            onClick={() => handleSwitchNetwork(baseSepolia.id)}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg text-sm transition-all"
          >
            Switch to Base Sepolia
          </button>
        </div>
      )}
      
      <div className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="font-mono text-sm">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
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
