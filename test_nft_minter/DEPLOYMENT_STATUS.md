# NFT Contract Deployment Status

## Current Setup

**✅ Using Sui's Built-in devnet_nft Package**

The minter is currently configured to use `0x2::devnet_nft::mint` - Sui's example NFT package that's already deployed on testnet. This allows you to start testing immediately!

**Your CLI Wallet Address:** `0xbaa31f372a03c81e69be0042168a49d00029d460e69f1ede38cc01e75de388ac`

---

## Getting Testnet Funds

The testnet faucet is rate-limited. Here are several ways to get SUI:

### Option 1: Web Faucet (Recommended)

Visit: https://faucet.sui.io/?address=0xbaa31f372a03c81e69be0042168a49d00029d460e69f1ede38cc01e75de388ac

### Option 2: Discord Faucet

1. Join Sui Discord: https://discord.gg/sui
2. Go to `#testnet-faucet` channel
3. Type: `!faucet 0xbaa31f372a03c81e69be0042168a49d00029d460e69f1ede38cc01e75de388ac`

### Option 3: Wait and Retry CLI

```bash
# Wait a bit and try again
sleep 120
curl -X POST "https://faucet.testnet.sui.io/gas" \
  -H "Content-Type: application/json" \
  -d '{"FixedAmountRequest":{"recipient":"0xbaa31f372a03c81e69be0042168a49d00029d460e69f1ede38cc01e75de388ac"}}'
```

---

## Deploy Your Custom NFT Contract (Optional)

Once you have testnet funds, you can deploy the custom contract:

```bash
cd test_nft_minter

# Build the contract
sui move build

# Publish to testnet
sui client publish --gas-budget 100000000

# Look for "Published Objects" in the output
# Copy the Package ID (starts with 0x...)
```

Then update `src/components/Minter.tsx`:

```typescript
// Change line 8-9:
const NFT_PACKAGE_ID = 'YOUR_PACKAGE_ID_HERE';

// Also update the moveCall target on line 31:
target: `${NFT_PACKAGE_ID}::testnet_nft::mint_to_sender`,
```

---

## Testing the Minter Right Now

Even without deploying your own contract, you can test minting with the built-in package:

1. **Connect your browser wallet** (Sui Wallet or Ethos)
2. **Switch to Testnet** in your wallet
3. **Make sure you have testnet SUI** in your connected wallet (not the CLI wallet)
4. **Use the Minter UI** to create test NFTs
5. **They'll appear in the Scanner** immediately!

> **Note:** The CLI wallet address above is for deploying contracts. Your browser wallet (used in the app) will be different.

---

## Checking Your Deployment

After deployment, verify your contract:

```bash
sui client gas  # Check you have SUI
sui client objects  # List owned objects
```

View on Suiscan:

- Wallet: https://suiscan.xyz/testnet/account/0xbaa31f372a03c81e69be0042168a49d00029d460e69f1ede38cc01e75de388ac
- Package (after deploy): https://suiscan.xyz/testnet/object/YOUR_PACKAGE_ID
