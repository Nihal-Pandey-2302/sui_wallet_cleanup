import { ExternalLink } from 'lucide-react';
import { useSuiClientContext } from '@mysten/dapp-kit';

interface ObjectCardProps {
  object: any; // Using any for now since the exact type structure varies
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export function ObjectCard({ object, isSelected, onToggle }: ObjectCardProps) {
  const ctx = useSuiClientContext();
  const data = object.data;
  if (!data) return null;

  const display = data.display?.data;
  const content = data.content?.fields;
  
  const name = display?.name || content?.name || 'Unknown Object';
  const description = display?.description || content?.description || 'No description available';
  
  // Try multiple fields for image URL
  const imageUrl = display?.image_url || 
                   display?.url || 
                   display?.link || 
                   content?.url || 
                   content?.image_url ||
                   content?.link;
                   
  const objectType = data.type ? data.type.split('::').pop() : 'Unknown Type';

  return (
    <div 
      className={`glass-card relative overflow-hidden group cursor-pointer transition-all duration-200 ${
        isSelected ? 'border-indigo-500 ring-1 ring-indigo-500/50' : 'hover:border-slate-600'
      }`}
      onClick={() => onToggle(data.objectId)}
    >
      <div className="aspect-square relative bg-slate-800/50 border-b border-slate-700/50">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/1e293b/475569?text=No+Image';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600">
            <span className="text-sm font-medium">No Image</span>
          </div>
        )}
        
        <div className="absolute top-2 right-2">
          <input 
            type="checkbox" 
            checked={isSelected}
            onChange={() => {}} // Handle click on parent
            className="w-5 h-5 rounded border-slate-600 text-indigo-500 focus:ring-indigo-500/50 bg-slate-900/80 backdrop-blur-sm cursor-pointer"
          />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
           <h3 className="font-semibold text-slate-100 truncate flex-1" title={name}>
             {name}
           </h3>
           <a 
            href={`https://suiscan.xyz/${ctx.network}/object/${data.objectId}`} 
            target="_blank" 
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-slate-500 hover:text-indigo-400 transition-colors"
           >
             <ExternalLink className="w-4 h-4" />
           </a>
        </div>
        
        <div className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700 mb-3 truncate max-w-full">
          {objectType}
        </div>

        <p className="text-xs text-slate-500 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
}
