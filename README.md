# BaseProofBadge

**On-chain Proof & Badge System on Base**

Generate verifiable on-chain badges and record user actions to build a transparent, traceable participation history.

🔗 **Live App**: [Vercel Deployment]  
🌐 **Network**: Base Sepolia  
📜 **Contract**: `0x4c50dc3b966937e42f43ca0b4e334a0e72464409`

---

## ✨ Features

- 🎖️ **Mint Badge**: Generate unique on-chain verification badges (ERC721 NFT)
- 📝 **Record Actions**: Log on-chain activities with immutable timestamps
- 👤 **User Profile**: View your badges and complete action history
- 🔗 **Base Mini App**: Fully compatible with Base Builder / base.dev
- 💼 **Simple Wallet Connect**: No Project ID required! Works with MetaMask, Coinbase Wallet, and any injected wallet

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Web3 wallet (MetaMask, Coinbase Wallet, or any browser wallet)
- Base Sepolia testnet ETH ([Get from faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet))

### Installation

```bash
# Clone the repository
git clone https://github.com/AnnabelleScripps/BaseProofBadge.git
cd BaseProofBadge

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Web3**: wagmi v2 + viem (no external dependencies!)
- **Wallet Connect**: Injected connectors only (no Project ID needed)
- **Network**: Base Sepolia (Testnet)
- **Contract**: ERC721 + Action Recording

---

## 💼 Wallet Connection

This project uses **pure wagmi injected connectors** - no WalletConnect Cloud, no Reown, no Project ID required!

### Supported Wallets

- ✅ MetaMask
- ✅ Coinbase Wallet
- ✅ Any browser extension wallet (Rabby, Rainbow, etc.)

### How It Works

The wallet connection uses wagmi's `injected` connector which directly communicates with browser extension wallets via the `window.ethereum` API. This means:

- ✅ **No API keys needed**
- ✅ **No external services**
- ✅ **Works offline**
- ✅ **Privacy-focused**
- ✅ **Zero configuration**

---

## 📦 Project Structure

```
baseproofbadge/
├── app/
│   ├── layout.tsx          # Root layout with Base Mini App metadata
│   ├── page.tsx            # Main landing page
│   ├── providers.tsx       # Web3 providers (Wagmi only)
│   └── globals.css         # Global styles
├── components/
│   ├── ConnectWallet.tsx   # Custom wallet connection UI
│   ├── MintBadge.tsx       # Badge minting component
│   ├── RecordAction.tsx    # Action recording component
│   └── UserProfile.tsx     # User profile & history
├── lib/
│   ├── wagmi.ts            # Wagmi config (injected connectors)
│   └── contract.ts         # Contract ABI & constants
├── public/
│   ├── manifest.json       # PWA manifest
│   └── (icons & images)
└── .env.example            # No variables needed!
```

---

## 🔧 Smart Contract

**Address**: `0x4c50dc3b966937e42f43ca0b4e334a0e72464409`  
**Chain**: Base Sepolia (Chain ID: 84532)

### Functions

- `mintBadge(address to)` - Mint a new badge NFT
- `recordAction(address user, string action)` - Record an on-chain action
- `getUserActions(address user)` - Get all user actions
- `balanceOf(address owner)` - Get badge count

---

## 🌐 Base Mini App Setup

This project is configured as a Base Mini App:

### Metadata (Already Configured)

```typescript
export const metadata: Metadata = {
  // ...
  other: {
    "base:app_id": "69c0b42b76e804b2a67a9f91",
  },
};
```

### Register on Base

1. Visit [Base Builder](https://www.base.org/builder)
2. Submit your deployed URL
3. Use these values:
   - **Name**: BaseProofBadge
   - **Description**: Generate on-chain verification badges and record user actions
   - **URL**: Your Vercel deployment URL
   - **Type**: Utility

---

## 🚀 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AnnabelleScripps/BaseProofBadge)

**Manual Deployment:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables

**None required!** 🎉

This project doesn't need any environment variables. Everything works out of the box.

---

## 📝 Usage Guide

### 1. Connect Wallet
Click "Connect Wallet" and select your preferred wallet (MetaMask, Coinbase Wallet, etc.)

### 2. Switch to Base Sepolia
If you're on the wrong network, click the "Switch to Base Sepolia" button

### 3. Mint Your Badge
- Navigate to "Mint Badge" tab
- Click "Mint Badge" button
- Confirm transaction in your wallet
- Your badge NFT will be minted on-chain

### 4. Record Actions
- Go to "Record Action" tab
- Enter a description of your action
- Click "Record Action"
- Confirm transaction

### 5. View Profile
- Check "My Profile" tab
- See your badge count and complete action history

---

## 🛠️ Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## 🔒 Security Notes

- No API keys or secrets needed
- All wallet connections happen client-side
- Test thoroughly on testnet before mainnet deployment
- Audit smart contracts before production use

---

## ⚡ Why No Project ID?

Traditional wallet connection libraries (WalletConnect, Reown AppKit) require Project IDs for cloud relay services. This project uses a simpler approach:

- **Injected connectors** communicate directly with browser wallets
- No intermediary services
- Faster connection
- Better privacy
- Zero configuration

**Trade-off**: This works great for desktop/browser wallets, but doesn't support WalletConnect mobile QR scanning. For most dApps on Base, browser wallets are sufficient.

---

## 📄 License

MIT License - feel free to use this project as a template for your own Base Mini Apps.

---

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

---

## 🔗 Links

- [Base Documentation](https://docs.base.org/)
- [Base Builder](https://www.base.org/builder)
- [wagmi Documentation](https://wagmi.sh/)
- [viem Documentation](https://viem.sh/)

---

**Built with ❤️ on Base • No Project ID Required! 🚀**
