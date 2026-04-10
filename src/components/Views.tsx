import React from 'react';
import { motion } from 'motion/react';
import { History, Layers, Globe, Cpu, Clock, CheckCircle2, AlertCircle, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

export function HistoryView() {
  const historyItems = [
    { id: 1, title: 'E-commerce Dashboard', date: '2 hours ago', status: 'completed' },
    { id: 2, title: 'Portfolio Website', date: 'Yesterday', status: 'completed' },
    { id: 3, title: 'Auth Service API', date: '3 days ago', status: 'failed' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full glass-panel rounded-lg p-8 overflow-y-auto">
      <div className="flex items-center gap-3 mb-8">
        <History className="text-nebula-accent" size={24} />
        <h2 className="text-xl font-bold text-white">Project History</h2>
      </div>
      <div className="space-y-4">
        {historyItems.map(item => (
          <div key={item.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                item.status === 'completed' ? "bg-emerald-500/20 text-emerald-500" : "bg-rose-500/20 text-rose-500"
              )}>
                {item.status === 'completed' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
              </div>
              <div>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-xs text-white/40">{item.date}</p>
              </div>
            </div>
            <button className="text-xs font-bold text-nebula-accent uppercase tracking-widest hover:underline">Restore</button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function ArchitectureView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full glass-panel rounded-lg p-8 overflow-y-auto">
      <div className="flex items-center gap-3 mb-8">
        <Layers className="text-nebula-accent" size={24} />
        <h2 className="text-xl font-bold text-white">System Architecture</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-sm font-bold text-nebula-cyan uppercase tracking-widest mb-4">Frontend Layer</h3>
          <ul className="space-y-2 text-sm text-white/60">
            <li>• React 19 (Concurrent Mode)</li>
            <li>• Tailwind CSS 4.0</li>
            <li>• Framer Motion Animations</li>
            <li>• Client-side State Management</li>
          </ul>
        </div>
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-sm font-bold text-nebula-secondary uppercase tracking-widest mb-4">Backend Layer</h3>
          <ul className="space-y-2 text-sm text-white/60">
            <li>• Node.js Runtime</li>
            <li>• Express API Gateway</li>
            <li>• Serverless Functions</li>
            <li>• Real-time WebSocket Support</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export function DeploymentsView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full glass-panel rounded-lg p-8 overflow-y-auto">
      <div className="flex items-center gap-3 mb-8">
        <Globe className="text-nebula-accent" size={24} />
        <h2 className="text-xl font-bold text-white">Active Deployments</h2>
      </div>
      <div className="p-12 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <Globe size={32} className="text-white/20" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No Active Deployments</h3>
        <p className="text-sm text-white/40 max-w-xs">Deploy your first application to see its status, logs, and analytics here.</p>
        <button className="mt-6 px-6 py-2 rounded-xl bg-nebula-accent text-sm font-bold text-white">Start New Deployment</button>
      </div>
    </motion.div>
  );
}

export function ModelsView() {
  const models = [
    { name: 'Gemini 3 Flash', type: 'Fast & Efficient', active: true },
    { name: 'Gemini 3.1 Pro', type: 'High Reasoning', active: false },
    { name: 'Nebula Core 1.0', type: 'Proprietary', active: false },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full glass-panel rounded-lg p-8 overflow-y-auto">
      <div className="flex items-center gap-3 mb-8">
        <Cpu className="text-nebula-accent" size={24} />
        <h2 className="text-xl font-bold text-white">AI Model Configuration</h2>
      </div>
      <div className="space-y-4">
        {models.map(model => (
          <div key={model.name} className="p-6 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-white">{model.name}</h3>
              <p className="text-xs text-white/40">{model.type}</p>
            </div>
            <div className="flex items-center gap-4">
              {model.active ? (
                <span className="px-3 py-1 rounded-full bg-nebula-accent/20 text-nebula-accent text-[10px] font-bold uppercase tracking-widest">Active</span>
              ) : (
                <button className="text-xs font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest">Select</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
