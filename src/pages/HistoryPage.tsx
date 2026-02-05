import { useState, useEffect } from 'react';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { History, ExternalLink, Trash2, Calendar, Hash, Package } from 'lucide-react';
import { BurnHistory, type BurnRecord } from '../utils/burnHistory';

export function HistoryPage() {
  const ctx = useSuiClientContext();
  const [records, setRecords] = useState<BurnRecord[]>([]);

  useEffect(() => {
    setRecords(BurnHistory.getAll());
  }, []);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all burn history? This cannot be undone.')) {
      BurnHistory.clear();
      setRecords([]);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSuiscanUrl = (txDigest: string, network: string) => {
    return `https://suiscan.xyz/${network}/tx/${txDigest}`;
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/20 mb-4">
              <History className="w-8 h-8 text-indigo-400" />
            </div>
            <h1 className="text-4xl font-bold text-slate-100 mb-4">
              Burn History
            </h1>
            <p className="text-slate-400 text-lg">
              Track all your cleaned NFTs and burn transactions
            </p>
          </div>

          {/* Stats */}
          {records.length > 0 && (
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="glass-card p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-indigo-400 mb-1">
                  {records.length}
                </div>
                <div className="text-slate-400 text-sm">Total Burns</div>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">
                  {records.reduce((sum, r) => sum + r.objectCount, 0)}
                </div>
                <div className="text-slate-400 text-sm">NFTs Cleaned</div>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-rose-400 mb-1">
                  {records.filter(r => r.network === ctx.network).length}
                </div>
                <div className="text-slate-400 text-sm capitalize">On {ctx.network}</div>
              </div>
            </div>
          )}

          {/* Info Banner */}
          <div className="mb-8 glass-card p-4 rounded-xl border-indigo-500/30">
            <div className="flex items-start gap-3">
              <History className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-slate-300 mb-1">
                  <strong>How History Works:</strong>
                </p>
                <p className="text-slate-400">
                  This page tracks all burns you perform <em>from now on</em>. Previous burns won't appear here. 
                  History is stored locally in your browser for this wallet.
                </p>
              </div>
            </div>
          </div>

          {/* Clear History Button */}
          {records.length > 0 && (
            <div className="flex justify-end mb-6">
              <button
                onClick={handleClearHistory}
                className="text-sm text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear History
              </button>
            </div>
          )}

          {/* History List */}
          {records.length === 0 ? (
            <div className="glass-card p-12 rounded-xl text-center">
              <History className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 mb-2 font-semibold">No burn history yet</p>
              <p className="text-slate-500 text-sm mb-1">
                Go to the Home page and burn some NFTs to start tracking your cleanup history.
              </p>
              <p className="text-slate-600 text-xs mt-3">
                Note: Only burns performed after this update will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="glass-card p-6 rounded-xl hover:border-indigo-500/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                        <Trash2 className="w-5 h-5 text-rose-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-100">
                          Burned {record.objectCount} NFT{record.objectCount > 1 ? 's' : ''}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          <p className="text-slate-400 text-sm">
                            {formatDate(record.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        record.network === 'testnet' 
                          ? 'bg-amber-500/20 text-amber-400' 
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {record.network}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Hash className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-500 text-xs mb-1">Transaction</p>
                        <a
                          href={getSuiscanUrl(record.txDigest, record.network)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-400 hover:text-indigo-300 font-mono text-xs break-all flex items-center gap-1 group"
                        >
                          {record.txDigest}
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </a>
                      </div>
                    </div>

                    {record.objectIds.length <= 3 && (
                      <div className="flex items-start gap-2">
                        <Package className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-500 text-xs mb-1">Objects</p>
                          <div className="space-y-1">
                            {record.objectIds.map((objId) => (
                              <a
                                key={objId}
                                href={`https://suiscan.xyz/${record.network}/object/${objId}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-400 hover:text-slate-300 font-mono text-xs break-all flex items-center gap-1 group"
                              >
                                {objId}
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
