import { useState } from 'react';
import { useSignAndExecuteTransaction, useCurrentAccount } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { Wand2, Loader2, CheckCircle2, XCircle } from 'lucide-react';

// Deployed test NFT contract on Sui Testnet
const NFT_PACKAGE_ID = '0x8a2992052324f906d79b2f9408c640cd1dde86e4acd85a0dc7317a1452539de9';

export function Minter() {
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'minting' | 'success' | 'error'>('idle');
  const [txDigest, setTxDigest] = useState('');

  const mintNFT = () => {
    if (!account) {
      alert('Please connect your wallet first!');
      return;
    }

    setStatus('minting');

    const tx = new Transaction();
    
    tx.moveCall({
      target: `${NFT_PACKAGE_ID}::testnet_nft::mint_to_sender`,
      arguments: [
        tx.pure.string(name),
        tx.pure.string(description),
        tx.pure.string(imageUrl),
      ],
    });

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: (result) => {
          console.log('Mint success:', result);
          setTxDigest(result.digest);
          setStatus('success');
          // Reset form
          setTimeout(() => {
            setName('');
            setDescription('');
            setImageUrl('');
            setStatus('idle');
          }, 3000);
        },
        onError: (error) => {
          console.error('Mint failed:', error);
          setStatus('error');
          setTimeout(() => setStatus('idle'), 3000);
        },
      }
    );
  };

  const quickMintSpam = (index: number) => {
    const templates = [
      {
        name: 'Suspicious Airdrop',
        description: 'Free tokens! Click here to claim your prize! (Definitely a scam)',
        imageUrl: 'https://picsum.photos/seed/spam1/400/400',
      },
      {
        name: 'Fake NFT Collection',
        description: 'Limited edition! Only 10,000 available! (Spam)',
        imageUrl: 'https://picsum.photos/seed/spam2/400/400',
      },
      {
        name: 'Dubious Project',
        description: 'Join our community! 1000x guaranteed! (Scam)',
        imageUrl: 'https://picsum.photos/seed/spam3/400/400',
      },
    ];
    
    const template = templates[index];
    setName(template.name);
    setDescription(template.description);
    setImageUrl(template.imageUrl);
  };

  if (!account) {
    return null;
  }


  return (
    <section className="py-12 px-4 border-t border-slate-800/50">
      <div className="container mx-auto max-w-2xl">
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-slate-100 mb-2 flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-indigo-400" />
            Test NFT Minter
          </h3>
          <p className="text-slate-400 text-sm mb-6">
            Mint test NFTs to try out the cleanup scanner. For judges/demo purposes.
          </p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                NFT Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Spam NFT #1"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., A suspicious looking NFT for testing cleanup"
                rows={3}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Image URL
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://picsum.photos/400/400"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => quickMintSpam(0)}
              className="text-xs px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
            >
              Quick Fill #1
            </button>
            <button
              onClick={() => quickMintSpam(1)}
              className="text-xs px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
            >
              Quick Fill #2
            </button>
            <button
              onClick={() => quickMintSpam(2)}
              className="text-xs px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
            >
              Quick Fill #3
            </button>
          </div>

          <button
            onClick={mintNFT}
            disabled={status === 'minting' || !name || !description || !imageUrl}
            className="w-full btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'minting' && <Loader2 className="w-4 h-4 animate-spin" />}
            {status === 'success' && <CheckCircle2 className="w-4 h-4 text-green-400" />}
            {status === 'error' && <XCircle className="w-4 h-4 text-rose-400" />}
            {status === 'idle' && 'Mint NFT'}
            {status === 'minting' && 'Minting...'}
            {status === 'success' && 'Minted!'}
            {status === 'error' && 'Failed'}
          </button>

          {status === 'success' && txDigest && (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-green-400 text-sm">
                Success! View on{' '}
                <a
                  href={`https://suiscan.xyz/testnet/tx/${txDigest}`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-green-300"
                >
                  Suiscan
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
