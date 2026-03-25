'use client';

import { useMemo, useState } from 'react';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from 'wagmi';
import { APP_NAME, CHAIN_ID } from '@/lib/contract';

export function ConnectWallet() {
  const { address, isConnected, chain } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const [activeConnectorId, setActiveConnectorId] = useState<string | null>(null);

  const allowedConnectors = useMemo(
    () =>
      connectors.filter(
        (connector) =>
          connector.id === 'coinbaseWalletSDK' || connector.id === 'injected',
      ),
    [connectors],
  );

  if (!isConnected) {
    return (
      <div className="wallet-panel">
        <div>
          <div className="section-kicker">Wallet</div>
          <h2>Connect with Coinbase Wallet or an injected wallet</h2>
        </div>
        <div className="wallet-row">
          {allowedConnectors.map((connector) => (
            <button
              key={connector.uid}
              type="button"
              className="primary-button"
              disabled={isPending}
              onClick={() => {
                setActiveConnectorId(connector.uid);
                connect({ connector });
              }}
            >
              {isPending && activeConnectorId === connector.uid
                ? `Connecting ${connector.name}...`
                : `Connect ${connector.name}`}
            </button>
          ))}
        </div>
        <p className="support-copy">
          {APP_NAME} only enables Coinbase Wallet and injected connectors to stay
          compatible with Base app wallets and avoid WalletConnect routing.
        </p>
      </div>
    );
  }

  return (
    <div className="wallet-panel">
      <div>
        <div className="section-kicker">Connected</div>
        <div className="wallet-address">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </div>
      </div>
      <div className="wallet-row">
        <span className="tag-pill">
          {chain?.id === CHAIN_ID ? 'Base mainnet ready' : 'Wrong network'}
        </span>
        {chain?.id !== CHAIN_ID && (
          <button
            type="button"
            className="secondary-button"
            disabled={isSwitching}
            onClick={() => switchChain({ chainId: CHAIN_ID })}
          >
            {isSwitching ? 'Switching...' : 'Switch to Base'}
          </button>
        )}
        <button type="button" className="ghost-button" onClick={() => disconnect()}>
          Disconnect
        </button>
      </div>
    </div>
  );
}
