import { http, createConfig } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { injected, metaMask, coinbaseWallet } from 'wagmi/connectors';

// No Project ID needed! Using only injected connectors
export const config = createConfig({
  chains: [base, baseSepolia],
  connectors: [
    injected({ 
      target: 'metaMask',
      shimDisconnect: true,
    }),
    injected({
      target: 'coinbaseWallet', 
      shimDisconnect: true,
    }),
    // Fallback for any injected wallet
    injected({ shimDisconnect: true }),
  ],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
  ssr: true,
});
