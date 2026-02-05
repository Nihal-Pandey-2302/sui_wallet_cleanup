# Quick NFT Contract Deployment

## The Error You're Seeing

The `0x2::devnet_nft::mint` function doesn't exist on Sui testnet. You need to deploy your own contract.

## ✅ Easy Deployment Using Browser Wallet (Recommended)

Since you have 1 SUI in your browser wallet, use this method:

### Option 1: Using Sui Wallet Extension's Developer Tools

Some Sui wallet extensions have built-in Move contract deployment. Check your wallet's settings.

### Option 2: Deploy via CLI with Your Browser Wallet

1. **Export your browser wallet's private key:**
   - Open your Sui Wallet extension
   - Go to Settings → Export Private Key
   - Copy the private key

2. **Import into Sui CLI:**

   ```bash
   sui keytool import "YOUR_PRIVATE_KEY_HERE" ed25519

   # Switch to the new address
   sui client switch --address YOUR_BROWSER_WALLET_ADDRESS

   # Verify you have SUI
   sui client gas
   ```

3. **Deploy the contract:**

   ```bash
   cd test_nft_minter
   sui client publish --gas-budget 100000000
   ```

4. **Copy the Package ID from the output** (look for "Published Objects")

5. **Update `src/components/Minter.tsx` line 8:**

   ```typescript
   const NFT_PACKAGE_ID = "YOUR_PACKAGE_ID_HERE";
   ```

6. **Restart your dev server:**
   ```bash
   # In the main terminal (Ctrl+C first if running)
   npm run dev
   ```

---

## 🔄 Alternative: Get CLI Wallet Funded

If you don't want to export your browser wallet's key:

1. **Transfer SUI from browser wallet to CLI wallet:**
   - In your browser wallet, send 0.5 SUI to:
   - `0xbaa31f372a03c81e69be0042168a49d00029d460e69f1ede38cc01e75de388ac`

2. **Then deploy:**
   ```bash
   cd test_nft_minter
   sui client publish --gas-budget 100000000
   ```

---

## After Deployment

Once deployed, update the Minter component:

**File:** `src/components/Minter.tsx`

**Line 8-9:** Change from:

```typescript
const NFT_PACKAGE_ID = "0x2";
```

To:

```typescript
const NFT_PACKAGE_ID = "0xYOUR_ACTUAL_PACKAGE_ID";
```

**Line 31:** Change the target from:

```typescript
target: `${NFT_PACKAGE_ID}::devnet_nft::mint`,
```

To:

```typescript
target: `${NFT_PACKAGE_ID}::testnet_nft::mint_to_sender`,
```

Then the minter will work perfectly!
