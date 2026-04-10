import React, { useEffect, useRef, useState } from 'react';
import { Terminal as TerminalIcon, ChevronRight, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Log {
  id: string;
  text: string;
  type: 'info' | 'success' | 'error' | 'command';
  timestamp: Date;
}

export function Terminal() {
  const [logs, setLogs] = useState<Log[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial boot sequence
    const bootSequence = [
      { text: "Initializing Nebula AI Studio v1.0.0...", type: 'info' },
      { text: "Connecting to core neural engine...", type: 'info' },
      { text: "Nebula Core: ONLINE", type: 'success' },
      { text: "Ready for app generation.", type: 'info' },
    ];

    bootSequence.forEach((log, i) => {
      setTimeout(() => {
        addLog(log.text, log.type as any);
      }, i * 400);
    });
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (text: string, type: Log['type'] = 'info') => {
    setLogs(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      text,
      type,
      timestamp: new Date()
    }].slice(-50)); // Keep last 50 logs
  };

  // Expose addLog to window for simulation
  useEffect(() => {
    (window as any).nebulaTerminal = { addLog };
  }, []);

  return (
    <div className="flex flex-col h-full glass-panel rounded-lg overflow-hidden font-mono text-sm shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <TerminalIcon size={14} className="text-nebula-cyan" />
          <span className="text-xs font-semibold uppercase tracking-wider text-white/70">Nebula AI Studio Terminal</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-1 scrollbar-hide bg-black/20"
      >
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-2"
            >
              <span className="text-white/20 select-none">
                {log.timestamp.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
              <span className={cn(
                "flex-1 break-all",
                log.type === 'success' && "text-emerald-400",
                log.type === 'error' && "text-rose-400",
                log.type === 'command' && "text-nebula-cyan",
                log.type === 'info' && "text-slate-300"
              )}>
                {log.type === 'command' && <ChevronRight size={14} className="inline mr-1" />}
                {log.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="flex items-center gap-2 text-nebula-cyan">
          <ChevronRight size={14} />
          <motion.div 
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-2 h-4 bg-nebula-cyan"
          />
        </div>
      </div>
    </div>
  );
}
