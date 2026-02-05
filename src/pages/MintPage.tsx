import { Minter } from '../components/Minter';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { Wand2 } from 'lucide-react';

export function MintPage() {
  const account = useCurrentAccount();
  
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/20 mb-4">
              <Wand2 className="w-8 h-8 text-indigo-400" />
            </div>
            <h1 className="text-4xl font-bold text-slate-100 mb-4">
              Test NFT Minter
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Mint test NFTs to try out the cleanup scanner. Perfect for judges and demo purposes.
            </p>
          </div>
          
          {!account ? (
            <div className="glass-card p-12 rounded-xl text-center">
              <p className="text-slate-400 mb-4">
                Connect your wallet to start minting test NFTs
              </p>
              <p className="text-sm text-slate-500">
                Click "Connect Wallet" in the top right corner
              </p>
            </div>
          ) : (
            <>
              <Minter />
              
              <div className="mt-8 glass-card p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-slate-100 mb-3">
                  💡 Quick Tips
                </h3>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>• Use the "Quick Fill" buttons for pre-configured spam NFT templates</li>
                  <li>• Minted NFTs will appear in the Scanner on the Home page</li>
                  <li>• Each mint costs a small amount of testnet SUI (~0.001 SUI)</li>
                  <li>• You can view your NFTs on <a href="https://suiscan.xyz/testnet" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">Suiscan</a></li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
