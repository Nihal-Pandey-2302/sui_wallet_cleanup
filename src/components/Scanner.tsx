import { useState } from 'react';
import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClientContext } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { useScanner } from '../hooks/useScanner';
import { ObjectCard } from './ObjectCard';
import { Loader2, Trash2, CheckCircle2 } from 'lucide-react';
import { BurnHistory } from '../utils/burnHistory';

export function Scanner() {
  const account = useCurrentAccount();
  const ctx = useSuiClientContext();
  const { data: objects, isLoading, error, refetch } = useScanner();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isBurning, setIsBurning] = useState(false);
  const [burnStatus, setBurnStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!account) return null;

  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const handleBurn = () => {
    if (selectedIds.size === 0) return;

    const confirmed = window.confirm(
      `Are you sure you want to permanently delete ${selectedIds.size} NFT${selectedIds.size > 1 ? 's' : ''}? This action cannot be undone.`
    );

    if (!confirmed) return;

    setIsBurning(true);
    setBurnStatus('idle');

    const tx = new Transaction();
    const objectIdsArray = Array.from(selectedIds);

    // Transfer each selected object to 0x0 (burn address)
    objectIdsArray.forEach((objectId) => {
      tx.transferObjects(
        [tx.object(objectId)],
        '0x0000000000000000000000000000000000000000000000000000000000000000'
      );
    });

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: (result) => {
          // Save to burn history
          BurnHistory.add({
            txDigest: result.digest,
            objectIds: objectIdsArray,
            network: ctx.network,
            objectCount: selectedIds.size,
          });

          setBurnStatus('success');
          setIsBurning(false);
          setSelectedIds(new Set());
          // Refetch the objects after burning
          setTimeout(() => {
            refetch();
            setBurnStatus('idle');
          }, 2000);
        },
        onError: (error) => {
          console.error('Burn failed:', error);
          setBurnStatus('error');
          setIsBurning(false);
          setTimeout(() => setBurnStatus('idle'), 3000);
        },
      }
    );
  };

  const hasSelection = selectedIds.size > 0;

  return (
    <section id="scanner" className="py-12 px-4 min-h-[500px]">
      <div className="container mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-100">Your Inventory</h2>
            <p className="text-slate-400 text-sm mt-1">
              Select items that you want to clean up from your wallet.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             {hasSelection && (
               <div className="flex items-center gap-4 animate-in fade-in slide-in-from-right-4 duration-200">
                 <span className="text-slate-400 text-sm">
                   {selectedIds.size} selected
                 </span>
                 <button 
                   onClick={handleBurn}
                   disabled={isBurning}
                   className="btn-primary bg-rose-600 hover:bg-rose-500 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   {isBurning ? (
                     <>
                       <Loader2 className="w-4 h-4 animate-spin" />
                       Burning...
                     </>
                   ) : burnStatus === 'success' ? (
                     <>
                       <CheckCircle2 className="w-4 h-4" />
                       Burned!
                     </>
                   ) : (
                     <>
                       <Trash2 className="w-4 h-4" />
                       Burn Selected
                     </>
                   )}
                 </button>
               </div>
             )}
          </div>
        </div>

        {burnStatus === 'error' && (
          <div className="mb-4 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
            Failed to burn NFTs. Please try again.
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-indigo-500" />
            <p>Scanning wallet contents...</p>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-center">
            Failed to scan wallet. Please try again.
          </div>
        )}

        {!isLoading && objects && objects.length === 0 && (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
            <p className="text-slate-400">No NFTs or cleanable objects found in this wallet.</p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {objects?.map((obj) => (
             obj.data && (
               <ObjectCard 
                 key={obj.data.objectId} 
                 object={obj} 
                 isSelected={selectedIds.has(obj.data.objectId)}
                 onToggle={toggleSelection}
               />
             )
          ))}
        </div>

      </div>
    </section>
  );
}
