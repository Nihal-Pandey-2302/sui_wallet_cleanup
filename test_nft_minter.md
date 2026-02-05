# Minting Test NFTs on Sui Testnet

## Quick Method: Use Published Testnet Contracts

### 1. Get Testnet SUI

```bash
# Make sure you're on testnet
sui client switch --env testnet

# Request SUI from faucet
sui client faucet
```

### 2. Use Example NFT Contracts

Some known testnet NFT packages you can try:

- Search Sui Explorer (https://suiscan.xyz/testnet) for "NFT" or "example_nft"
- Look for package IDs with public mint functions

### 3. Alternative: Simple dApp Method

You can also use browser-based testnet NFT minters:

- Check the Sui Discord #testnet channel for links
- Look for "Sui Testnet NFT Playground" type projects

## Manual Method: Deploy Your Own

If you want full control, you can deploy a simple NFT contract:

```move
module test_nft::simple_nft {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use std::string::{Self, String};
    use sui::url::{Self, Url};

    struct SimpleNFT has key, store {
        id: UID,
        name: String,
        description: String,
        url: Url,
    }

    public entry fun mint(
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
        ctx: &mut TxContext
    ) {
        let nft = SimpleNFT {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            url: url::new_unsafe_from_bytes(url),
        };
        transfer::public_transfer(nft, tx_context::sender(ctx));
    }
}
```

To deploy:

```bash
sui move build
sui client publish --gas-budget 100000000
```

Then mint via CLI or frontend.

## Recommended: Use Existing Testnet Collections

The easiest approach is to find testnet NFT projects via:

1. Sui Discord community
2. Sui Explorer testnet section
3. GitHub repos with "sui testnet nft" examples
