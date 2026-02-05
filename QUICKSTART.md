# Quick Start: Deploy & Test NFTs

## Step 1: Install Sui CLI

```bash
cargo install --locked --git https://github.com/MystenLabs/sui.git --branch testnet sui
```

## Step 2: Setup Sui Client

```bash
# Initialize if first time
sui client

# Switch to testnet
sui client switch --env testnet

# Get testnet SUI
sui client faucet

# Verify you have SUI
sui client gas
```

## Step 3: Deploy the NFT Contract

```bash
cd test_nft_minter

# Build
sui move build

# Publish to testnet
sui client publish --gas-budget 100000000
```

**IMPORTANT**: Copy the Package ID from the output! It will look like:

```
│ Published Objects:  │
│  ┌──                │
│  │ PackageID: 0xabcd1234...  ← COPY THIS
```

## Step 4: Update the Frontend

Open `src/components/Minter.tsx` and update line 9:

```typescript
const NFT_PACKAGE_ID = "0xYOUR_PACKAGE_ID_HERE";
```

## Step 5: Test!

1. Reload the app at http://localhost:5173
2. Switch to Testnet (header)
3. Connect your wallet
4. Scroll to the "Test NFT Minter" section
5. Click "Quick Fill" buttons for templates
6. Click "Mint NFT"
7. Check the Scanner section to see your NFT appear!

## One-Line Deploy (for convenience)

```bash
cd test_nft_minter && sui client switch --env testnet && sui client faucet && sui move build && sui client publish --gas-budget 100000000
```

Then just copy the Package ID and update `Minter.tsx`.

## Minting NFTs for Your Wallet

After deployment, you can mint directly to your wallet address:

```bash
export PACKAGE_ID="0xYOUR_PACKAGE_ID"

sui client call \
  --package $PACKAGE_ID \
  --module testnet_nft \
  --function mint_to_sender \
  --args "Spam NFT #1" "Suspicious airdrop" "https://picsum.photos/400" \
  --gas-budget 10000000
```

## For Judges/Demo

The minter is built into the web app! Just:

1. Visit the app on testnet
2. Connect wallet
3. Use the "Test NFT Minter" section
4. Use "Quick Fill" for instant templates
5. Mint and watch it appear in the Scanner!
