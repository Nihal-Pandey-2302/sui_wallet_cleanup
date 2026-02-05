import { Link, useLocation } from 'react-router-dom';
import { Home, Wand2, BookOpen, Network, History } from 'lucide-react';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { WalletConnection } from './WalletConnection';
import { useState } from 'react';

export function Navbar() {
  const location = useLocation();
  const ctx = useSuiClientContext();
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">SC</span>
            </div>
            <span className="font-semibold text-slate-100 hidden sm:inline">Sui Wallet Cleanup</span>
          </Link>
          
          {/* Nav Links */}
          <div className="flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                isActive('/') 
                  ? 'bg-indigo-500/20 text-indigo-400' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            
            <Link
              to="/mint"
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                isActive('/mint') 
                  ? 'bg-indigo-500/20 text-indigo-400' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Wand2 className="w-4 h-4" />
              <span className="hidden sm:inline">Mint NFTs</span>
            </Link>
            
            <Link
              to="/history"
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                isActive('/history') 
                  ? 'bg-indigo-500/20 text-indigo-400' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </Link>
            
            <Link
              to="/docs"
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                isActive('/docs') 
                  ? 'bg-indigo-500/20 text-indigo-400' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Docs</span>
            </Link>
          </div>

          {/* Right side: Network selector + Wallet */}
          <div className="flex items-center gap-3">
            {/* Network Selector */}
            <div className="relative">
              <button
                onClick={() => setIsNetworkOpen(!isNetworkOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg glass-card hover:bg-slate-800/50 transition-colors text-sm"
              >
                <Network className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300 capitalize hidden sm:inline">{ctx.network}</span>
              </button>

              {isNetworkOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-50">
                  <button
                    onClick={() => {
                      ctx.selectNetwork('testnet');
                      setIsNetworkOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-700 transition-colors ${
                      ctx.network === 'testnet' ? 'text-indigo-400 bg-slate-700/50' : 'text-slate-300'
                    }`}
                  >
                    Testnet
                  </button>
                  <button
                    onClick={() => {
                      ctx.selectNetwork('mainnet');
                      setIsNetworkOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-700 transition-colors ${
                      ctx.network === 'mainnet' ? 'text-indigo-400 bg-slate-700/50' : 'text-slate-300'
                    }`}
                  >
                    Mainnet
                  </button>
                </div>
              )}
            </div>

            {/* Wallet Connection */}
            <WalletConnection />
          </div>
        </div>
      </div>
    </nav>
  );
}
