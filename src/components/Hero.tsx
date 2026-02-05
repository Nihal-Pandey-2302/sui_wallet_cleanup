import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useCurrentAccount, ConnectButton } from '@mysten/dapp-kit';

export function Hero() {
  const account = useCurrentAccount();

  return (
    <div className="relative py-24 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-400 text-sm font-medium mb-8 shadow-sm">
          <ShieldCheck className="w-4 h-4" />
          <span>Professional Wallet Hygiene</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-slate-50">
          Reclaim Your <br />
          <span className="text-indigo-400">Digital Cleanliness</span>
        </h1>
        
        <p className="max-w-2xl text-lg text-slate-400 mb-10 leading-relaxed">
          Securely identify and remove unwanted spam assets, scam NFTs, and clutter from your Sui wallet. Simple, safe, and efficient.
        </p>

        {!account ? (
          <div className="flex flex-col items-center gap-4">
            <ConnectButton />
            <span className="text-slate-500 text-sm">Supported by all major Sui wallets</span>
          </div>
        ) : (
           <button 
             onClick={() => {
               const scanner = document.getElementById('scanner');
               scanner?.scrollIntoView({ behavior: 'smooth', block: 'start' });
             }}
             className="btn-primary flex items-center gap-2 px-8 py-3 rounded-full text-lg"
           >
             View Scanner <ArrowRight className="w-5 h-5" />
           </button>
        )}

      </div>
    </div>
  );
}
