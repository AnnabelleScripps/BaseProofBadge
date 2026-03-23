# 🚀 Vercel 部署指南

## ✅ 已完成的准备工作

1. ✅ GitHub 仓库已创建：https://github.com/AnnabelleScripps/BaseProofBadge
2. ✅ 代码已推送完毕
3. ✅ Vercel 项目已创建：baseproofbadge (ID: prj_gLkai8PvCy5jYOZtbXiFzFxLlWwm)

## 📋 需要你手动完成的步骤

### 方式一：通过 Vercel Dashboard（推荐）

1. 访问 https://vercel.com/
2. 登录你的账号
3. 点击 "Add New" → "Project"
4. 选择 "Import Git Repository"
5. 找到并选择 `AnnabelleScripps/BaseProofBadge`
6. 项目名称：`baseproofbadge`
7. Framework Preset：自动检测到 **Next.js**
8. 添加环境变量：
   - Key: `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - Value: [你的 WalletConnect Project ID]
   - 获取地址：https://cloud.walletconnect.com/
9. 点击 "Deploy"

### 方式二：通过 Vercel CLI

```bash
# 进入项目目录
cd C:\Users\admin\.openclaw\workspace\baseproofbadge

# 安装 Vercel CLI（如未安装）
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 部署到生产环境
vercel --prod
```

## 🔧 环境变量配置

在 Vercel Dashboard 中配置以下环境变量：

| 变量名 | 值 | 必需？ |
|--------|-----|--------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | 你的 Project ID | ✅ 是 |
| `NEXT_PUBLIC_RPC_URL` | https://sepolia.base.org | ❌ 可选 |

### 获取 WalletConnect Project ID

1. 访问 https://cloud.walletconnect.com/
2. 注册/登录账号
3. 创建新项目
4. 复制 Project ID

## 🎯 Base Mini App 配置

部署完成后，访问以下地址配置你的 Base Mini App：

### 在 Base Builder 中提交

1. 访问：https://www.base.org/builder
2. 提交以下信息：
   - **App Name**: BaseProofBadge
   - **Description**: Generate on-chain verification badges and record user actions
   - **URL**: [你的 Vercel 部署 URL]
   - **Category**: Utility
   - **Base App ID**: 69c0b42b76e804b2a67a9f91

### Metadata 已配置

以下 metadata 已在项目中自动配置：
```html
<meta name="base:app_id" content="69c0b42b76e804b2a67a9f91" />
```

## 📱 测试部署

部署完成后，测试以下功能：

1. ✅ 连接钱包（MetaMask、Coinbase Wallet 等）
2. ✅ 切换到 Base Sepolia 网络
3. ✅ Mint Badge 功能
4. ✅ Record Action 功能
5. ✅ 查看 Profile 页面

## 🔗 关键链接

- **GitHub 仓库**: https://github.com/AnnabelleScripps/BaseProofBadge
- **合约地址**: 0x4c50dc3b966937e42f43ca0b4e334a0e72464409
- **网络**: Base Sepolia (Chain ID: 84532)
- **区块浏览器**: https://sepolia.basescan.org/address/0x4c50dc3b966937e42f43ca0b4e334a0e72464409

## ⚠️ 注意事项

1. 确保在 Vercel 中添加了 `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` 环境变量
2. 首次部署可能需要 3-5 分钟
3. 如果构建失败，检查环境变量是否正确配置
4. Base Sepolia 测试网 ETH 可从这里获取：https://www.coinbase.com/faucets/base-ethereum-goerli-faucet

---

**准备就绪！现在就去 Vercel 完成部署吧** 🚀
