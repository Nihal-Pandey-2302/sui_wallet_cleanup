# Test NFT Minter - Deployment & Usage Guide

## Setup (You'll need to do this)

Since the Sui CLI is not installed, you'll need to either:

### Option A: Install Sui CLI

```bash
cargo install --locked --git https://github.com/MystenLabs/sui.git --branch testnet sui
```

### Option B: Use an existing deployed package

I'll provide you with commands to use a pre-deployed testnet NFT package if available.

## Deploying the Contract (if you install Sui CLI)

```bash
cd test_nft_minter

# Switch to testnet
sui client switch --env testnet

# Get some testnet SUI
sui client faucet

# Build the package
sui move build

# Publish to testnet
sui client publish --gas-budget 100000000

# Note the Package ID from the output!
```

## Minting NFTs

After deployment, you can mint NFTs with:

```bash
export PACKAGE_ID="<your-package-id-here>"
export RECIPIENT="0x58504b29c7d40284ef4118b8688a086d9e91a1619c6b7a12c907657a1d287aab"

# Mint NFT #1
sui client call \
  --package $PACKAGE_ID \
  --module testnet_nft \
  --function mint_to_sender \
  --args "Test NFT #1" "A spam NFT for testing cleanup" "https://picsum.photos/400/400?random=1" \
  --gas-budget 10000000

# Mint NFT #2
sui client call \
  --package $PACKAGE_ID \
  --module testnet_nft \
  --function mint_to_sender \
  --args "Dubious Airdrop" "Suspicious looking NFT" "https://picsum.photos/400/400?random=2" \
  --gas-budget 10000000

# Mint NFT #3
sui client call \
  --package $PACKAGE_ID \
  --module testnet_nft \
  --function mint_to_sender \
  --args "Scam NFT" "Definitely a scam" "https://picsum.photos/400/400?random=3" \
  --gas-budget 10000000
```

## Alternative: Use Pre-deployed Package

If there's already a testnet NFT package deployed, you can use it directly.

Common testnet NFT packages can be found on:

- https://suiscan.xyz/testnet

Search for "testnet_nft" or "example_nft" packages.

## Easier Alternative: Manual Browser Testing

You can also interact with Sui Move contracts directly via Sui Explorer:

1. Go to https://suiscan.xyz/testnet
2. Find an NFT package
3. Use the "Write Contract" interface to call mint functions
