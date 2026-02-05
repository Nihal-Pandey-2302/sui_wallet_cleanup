import '@mysten/dapp-kit/dist/index.css';
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getJsonRpcFullnodeUrl } from '@mysten/sui/jsonRpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { MintPage } from './pages/MintPage';
import { DocsPage } from './pages/DocsPage';
import { HistoryPage } from './pages/HistoryPage';

const queryClient = new QueryClient();

const { networkConfig } = createNetworkConfig({
  mainnet: { url: getJsonRpcFullnodeUrl('mainnet'), network: 'mainnet' },
  testnet: { url: getJsonRpcFullnodeUrl('testnet'), network: 'testnet' },
});


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider autoConnect>
          <BrowserRouter>
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
              {/* Navigation */}
              <Navbar />

              {/* Main Content */}
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/mint" element={<MintPage />} />
                  <Route path="/history" element={<HistoryPage />} />
                  <Route path="/docs" element={<DocsPage />} />
                </Routes>
              </main>

              {/* Footer */}
              <footer className="border-t border-slate-800/50 py-8 mt-12">
                <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
                  <p>Built with ❤️ for the Sui ecosystem</p>
                  <p className="mt-2">
                    <a 
                      href="https://github.com/yourusername/sui-wallet-cleanup" 
                      target="_blank" 
                      rel="noreferrer"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      View on GitHub
                    </a>
                  </p>
                </div>
              </footer>
            </div>
          </BrowserRouter>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

export default App;
