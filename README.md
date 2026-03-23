# BaseProofBadge

**On-chain Proof & Badge System on Base**

Generate verifiable on-chain badges and record user actions to build a transparent, traceable participation history.

🔗 **Live App**: [Coming Soon]  
🌐 **Base Network**: Base Sepolia  
📜 **Contract**: `0x4c50dc3b966937e42f43ca0b4e334a0e72464409`

---

## ✨ Features

- 🎖️ **Mint Badge**: Generate unique on-chain verification badges (ERC721 NFT)
- 📝 **Record Actions**: Log on-chain activities with immutable timestamps
- 👤 **User Profile**: View your badges and complete action history
- 🔗 **Base Mini App**: Fully compatible with Base Builder / base.dev
- 💼 **Wallet Connect**: Seamless wallet integration via RainbowKit

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Web3 wallet (MetaMask, Coinbase Wallet, etc.)
- Base Sepolia testnet ETH ([Get from faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet))

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/BaseProofBadge.git
cd BaseProofBadge

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Environment Setup

Edit `.env` and configure:

```bash
# Required: Get from https://cloud.walletconnect.com/
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Optional: Custom RPC (uses public Base Sepolia by default)
NEXT_PUBLIC_RPC_URL=https://sepolia.base.org
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Web3**: wagmi + RainbowKit + viem
- **Network**: Base Sepolia (Testnet)
- **Contract**: ERC721 + Action Recording

---

## 📦 Project Structure

```
baseproofbadge/
├── app/
│   ├── layout.tsx          # Root layout with Base Mini App metadata
│   ├── page.tsx            # Main landing page
│   ├── providers.tsx       # Web3 providers (Wagmi + RainbowKit)
│   └── globals.css         # Global styles
├── components/
│   ├── MintBadge.tsx       # Badge minting component
│   ├── RecordAction.tsx    # Action recording component
│   └── UserProfile.tsx     # User profile & history
├── lib/
│   ├── wagmi.ts            # Wagmi configuration
│   └── contract.ts         # Contract ABI & constants
├── public/
│   ├── manifest.json       # PWA manifest
│   └── (icons & images)
└── .env.example            # Environment template
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

```html
<meta name="base:app_id" content="69c0b42b76e804b2a67a9f91" />
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

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/BaseProofBadge)

**Manual Deployment:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# - NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
```

### Environment Variables on Vercel

Go to your Vercel project → Settings → Environment Variables and add:

| Variable | Value | Required |
|----------|-------|----------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Your WalletConnect Project ID | ✅ Yes |
| `NEXT_PUBLIC_RPC_URL` | Custom RPC URL | ❌ Optional |

---

## 📝 Usage Guide

### 1. Connect Wallet
Click "Connect Wallet" and select your preferred wallet.

### 2. Mint Your Badge
- Navigate to "Mint Badge" tab
- Click "Mint Badge" button
- Confirm transaction in your wallet
- Your badge NFT will be minted on-chain

### 3. Record Actions
- Go to "Record Action" tab
- Enter a description of your action
- Click "Record Action"
- Confirm transaction

### 4. View Profile
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

- Never commit `.env` files with real keys
- Use environment variables for sensitive data
- Test thoroughly on testnet before mainnet deployment
- Audit smart contracts before production use

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
- [RainbowKit Docs](https://www.rainbowkit.com/)
- [wagmi Documentation](https://wagmi.sh/)

---

**Built with ❤️ on Base**
