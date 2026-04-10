import React from 'react';
import { 
  Plus, 
  MessageSquare, 
  History, 
  Settings, 
  Zap, 
  Layers, 
  Globe, 
  Cpu,
  LogOut
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onNewApp: () => void;
}

export function Sidebar({ currentView, onViewChange, onNewApp }: SidebarProps) {
  const navItems = [
    { id: 'chat', icon: MessageSquare, label: 'New Project' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'architecture', icon: Layers, label: 'Architecture' },
    { id: 'deployments', icon: Globe, label: 'Deployments' },
    { id: 'models', icon: Cpu, label: 'AI Models' },
  ];

  return (
    <div className="w-64 h-full glass-panel border-r border-white/10 flex flex-col shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nebula-accent to-nebula-secondary flex items-center justify-center shadow-lg shadow-nebula-accent/20">
          <Zap size={24} className="text-white fill-white" />
        </div>
        <div>
          <h1 className="text-lg font-black tracking-tighter text-white">NEBULA</h1>
          <p className="text-[10px] font-bold text-nebula-cyan tracking-widest uppercase -mt-1">AI Studio</p>
        </div>
      </div>

      <div className="px-4 mb-6">
        <button 
          onClick={onNewApp}
          className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-3 text-sm font-semibold text-white group"
        >
          <Plus size={18} className="text-nebula-accent group-hover:scale-110 transition-transform" />
          Create New App
        </button>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
              currentView === item.id 
                ? "bg-nebula-accent/10 text-nebula-accent" 
                : "text-white/50 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all">
          <Settings size={18} />
          Settings
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400/70 hover:text-rose-400 hover:bg-rose-400/5 transition-all">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
