import { BookOpen, Github, ExternalLink, Wallet, Wand2, Trash2, Network } from 'lucide-react';

export function DocsPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/20 mb-4">
              <BookOpen className="w-8 h-8 text-indigo-400" />
            </div>
            <h1 className="text-4xl font-bold text-slate-100 mb-4">
              Documentation
            </h1>
            <p className="text-slate-400 text-lg">
              Everything you need to know about Sui Wallet Cleanup
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            <a
              href="https://github.com/yourusername/sui-wallet-cleanup"
              target="_blank"
              rel="noreferrer"
              className="glass-card p-6 rounded-xl hover:border-indigo-500/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-2">
                <Github className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                <h3 className="font-semibold text-slate-100">GitHub Repository</h3>
              </div>
              <p className="text-sm text-slate-500">View source code and contribute</p>
            </a>
            
            <a
              href="https://suiscan.xyz/testnet/object/0x8a2992052324f906d79b2f9408c640cd1dde86e4acd85a0dc7317a1452539de9"
              target="_blank"
              rel="noreferrer"
              className="glass-card p-6 rounded-xl hover:border-indigo-500/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-2">
                <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                <h3 className="font-semibold text-slate-100">NFT Contract</h3>
              </div>
              <p className="text-sm text-slate-500">View on Suiscan</p>
            </a>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Overview */}
            <section className="glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Overview</h2>
              <p className="text-slate-300 mb-4">
                Sui Wallet Cleanup is a tool designed to help users manage and clean up unwanted NFTs and objects in their Sui wallets. The application provides an intuitive interface to scan, select, and burn spam or unwanted digital assets.
              </p>
              <p className="text-slate-300">
                Built with React, TypeScript, and the Sui SDK, this app demonstrates modern web3 development practices on the Sui blockchain.
              </p>
            </section>

            {/* Features */}
            <section className="glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">Features</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100 mb-2">Wallet Integration</h3>
                    <p className="text-slate-400 text-sm">
                      Seamless connection with Sui Wallet, Ethos, and other popular Sui wallets. Automatic wallet detection and connection.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Network className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100 mb-2">Network Support</h3>
                    <p className="text-slate-400 text-sm">
                      Switch between Mainnet and Testnet with a single click. Full support for both networks.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Wand2 className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100 mb-2">Test NFT Minter</h3>
                    <p className="text-slate-400 text-sm">
                      Built-in NFT minting functionality for testing. Includes quick-fill templates for spam NFTs. Perfect for demos and testing.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-rose-500/20 flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100 mb-2">Batch Cleanup</h3>
                    <p className="text-slate-400 text-sm">
                      Select multiple NFTs and burn them in a single transaction. Clean up your wallet efficiently.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Getting Started */}
            <section className="glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">Getting Started</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-100 mb-3">1. Connect Your Wallet</h3>
                  <p className="text-slate-400 text-sm mb-2">
                    Click the "Connect Wallet" button in the top right corner and select your preferred Sui wallet.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-100 mb-3">2. Switch Network (Optional)</h3>
                  <p className="text-slate-400 text-sm mb-2">
                    Use the network selector to switch between Mainnet and Testnet. For testing, select Testnet.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-100 mb-3">3. Scan Your Wallet</h3>
                  <p className="text-slate-400 text-sm mb-2">
                    The scanner automatically fetches all non-coin objects from your wallet. View images, names, and types of your NFTs.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-100 mb-3">4. Select and Cleanup</h3>
                  <p className="text-slate-400 text-sm mb-2">
                    Choose unwanted NFTs by clicking the checkboxes, then click "Burn Selected" to remove them permanently.
                  </p>
                </div>
              </div>
            </section>

            {/* Smart Contract */}
            <section className="glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">NFT Contract Details</h2>
              
              <div className="bg-slate-800/50 rounded-lg p-4 mb-4 font-mono text-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-500">Package ID:</span>
                  <span className="text-slate-300 break-all text-right ml-2">
                    0x8a2992052324f906d79b2f9408c640cd1dde86e4acd85a0dc7317a1452539de9
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-500">Module:</span>
                  <span className="text-slate-300">testnet_nft</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Network:</span>
                  <span className="text-slate-300">Testnet</span>
                </div>
              </div>

              <p className="text-slate-400 text-sm mb-4">
                The NFT contract is deployed on Sui Testnet and provides a simple minting function for creating test NFTs with custom name, description, and image URL.
              </p>

              <a
                href="https://suiscan.xyz/testnet/object/0x8a2992052324f906d79b2f9408c640cd1dde86e4acd85a0dc7317a1452539de9"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
              >
                View on Suiscan
                <ExternalLink className="w-4 h-4" />
              </a>
            </section>

            {/* Tech Stack */}
            <section className="glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">Tech Stack</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-slate-100 mb-2">Frontend</h3>
                  <ul className="text-slate-400 text-sm space-y-1">
                    <li>• React 18</li>
                    <li>• TypeScript</li>
                    <li>• Vite</li>
                    <li>• React Router</li>
                    <li>• TailwindCSS</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-100 mb-2">Blockchain</h3>
                  <ul className="text-slate-400 text-sm space-y-1">
                    <li>• Sui SDK</li>
                    <li>• @mysten/dapp-kit</li>
                    <li>• @mysten/sui</li>
                    <li>• Move Language</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">FAQ</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-100 mb-2">Is this safe to use?</h3>
                  <p className="text-slate-400 text-sm">
                    Yes! This is a client-side application. Your private keys never leave your wallet. All transactions require your explicit approval.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-100 mb-2">Can I recover burned NFTs?</h3>
                  <p className="text-slate-400 text-sm">
                    No. Burning NFTs is permanent and irreversible. Make sure you only select NFTs you truly want to remove.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-100 mb-2">What are gas fees?</h3>
                  <p className="text-slate-400 text-sm">
                    Each transaction (minting or burning) requires a small amount of SUI to pay for gas. Typical costs are around 0.001-0.01 SUI.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-100 mb-2">Why can't I see my NFTs?</h3>
                  <p className="text-slate-400 text-sm">
                    Make sure you're connected to the correct network (Mainnet/Testnet) and that your wallet has NFTs. The scanner automatically filters out standard SUI coins.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
