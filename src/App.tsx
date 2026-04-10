/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Chat } from './components/Chat';
import { Terminal } from './components/Terminal';
import { HistoryView, ArchitectureView, DeploymentsView, ModelsView } from './components/Views';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState('chat');
  const [chatKey, setChatKey] = useState(0);

  const handleNewApp = () => {
    setChatKey(prev => prev + 1);
    setCurrentView('chat');
    if ((window as any).nebulaTerminal) {
      (window as any).nebulaTerminal.addLog("Starting new project session...", "info");
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'chat':
        return <Chat key={chatKey} />;
      case 'history':
        return <HistoryView />;
      case 'architecture':
        return <ArchitectureView />;
      case 'deployments':
        return <DeploymentsView />;
      case 'models':
        return <ModelsView />;
      default:
        return <Chat key={chatKey} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-nebula-bg overflow-hidden nebula-gradient selection:bg-nebula-accent/30">
      {/* Sidebar */}
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        onNewApp={handleNewApp}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-black/20 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Project</span>
              <span className="text-sm font-semibold text-white">
                {currentView === 'chat' ? 'Untitled Nebula App' : currentView.charAt(0).toUpperCase() + currentView.slice(1)}
              </span>
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Status</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-emerald-500">Live</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white/70 hover:bg-white/10 transition-colors">
              Share
            </button>
            <button className="px-4 py-1.5 rounded-lg bg-nebula-accent text-xs font-bold text-white shadow-lg shadow-nebula-accent/20 hover:opacity-90 transition-opacity">
              Deploy App
            </button>
          </div>
        </header>

        {/* Content Grid */}
        <div className="flex-1 p-6 grid grid-cols-12 gap-6 overflow-hidden">
          {/* Left Column: Main View */}
          <div className="col-span-12 lg:col-span-7 h-full overflow-hidden">
            <AnimatePresence mode="wait">
              {renderView()}
            </AnimatePresence>
          </div>

          {/* Right Column: Terminal & Stats */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="col-span-12 lg:col-span-5 flex flex-col gap-6 h-full overflow-hidden"
          >
            {/* Terminal Area */}
            <div className="flex-1 min-h-0">
              <Terminal />
            </div>

            {/* Quick Stats / Info Area */}
            <div className="h-48 glass-panel rounded-lg p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">System Resources</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                      <span className="text-white/60">Neural Processing</span>
                      <span className="text-nebula-cyan">84%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '84%' }}
                        className="h-full bg-nebula-cyan" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                      <span className="text-white/60">Memory Allocation</span>
                      <span className="text-nebula-secondary">42%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '42%' }}
                        className="h-full bg-nebula-secondary" 
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold text-white/30 uppercase tracking-widest">
                <span>Region: Nebula-Prime-1</span>
                <span>Latency: 12ms</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

