import { ScanLine, ShieldAlert, Trash2 } from 'lucide-react';

export function Features() {
  const steps = [
    {
      icon: <ScanLine className="w-6 h-6 text-indigo-400" />,
      title: "Deep Scan",
      description: "Analyze every object in your wallet to uncover hidden metadata and ownership details.",
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-amber-400" />,
      title: "Risk Assessment",
      description: "Flag known scams, phishing attempts, and low-quality spam airdrops automatically.",
    },
    {
      icon: <Trash2 className="w-6 h-6 text-rose-500" />,
      title: "Secure Disposal",
      description: "Permanently burn unwanted assets to clean your inventory and reclaim object storage fees.",
    },
  ];

  return (
    <section className="py-20 px-4 border-t border-slate-800/50 bg-slate-900/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-center mb-12 text-slate-200">
          Workflow
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-xl flex flex-col items-start hover:border-indigo-500/30 transition-colors group"
            >
              <div className="bg-slate-800 p-3 rounded-lg mb-4 group-hover:bg-slate-700 transition-colors">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-100">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
