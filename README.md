# 🏅 BaseProofBadge

A simple on-chain badge system built on Base Mainnet.

Users can mint NFT badges and record actions on-chain, creating a transparent and verifiable participation history.

---

## ✨ Features

- 🏅 Mint on-chain NFT badges
- 📝 Record user actions on-chain
- 🔍 View personal action history
- 🔗 Wallet connection (MetaMask, Coinbase Wallet)
- ⚡ Fast and low-cost transactions on Base

---

## 🚀 Tech Stack

- **Next.js 16**
- **React 18**
- **Wagmi + Viem**
- **Tailwind CSS**
- **Base Mainnet**

---

## 🔗 Smart Contract

- **Network:** Base Mainnet
- **Chain ID:** 8453
- **Contract Address:** `0x4c50dc3b966937e42f43ca0b4e334a0e72464409`

### Key Functions

```solidity
function mintBadge(address to) returns (uint256)
function recordAction(address user, string action)
function getUserActions(address user) view returns (string[])
