import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader2, Code, Layout, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';
import { generateAppResponse } from '../lib/gemini';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isGenerating?: boolean;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm Nebula AI. What kind of application can I build for you today? I can handle frontend, backend, and everything in between."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate terminal activity
    if ((window as any).nebulaTerminal) {
      (window as any).nebulaTerminal.addLog(`Processing request: "${input.substring(0, 30)}..."`, 'command');
      setTimeout(() => (window as any).nebulaTerminal.addLog("Analyzing requirements...", "info"), 500);
      setTimeout(() => (window as any).nebulaTerminal.addLog("Generating architecture plan...", "info"), 1200);
    }

    try {
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const response = await generateAppResponse(input, history);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response || "I'm sorry, I couldn't generate a response."
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      if ((window as any).nebulaTerminal) {
        (window as any).nebulaTerminal.addLog("App structure generated successfully.", "success");
        (window as any).nebulaTerminal.addLog("Ready for deployment.", "info");
      }
    } catch (error) {
      console.error(error);
      if ((window as any).nebulaTerminal) {
        (window as any).nebulaTerminal.addLog("Generation failed: Internal Error", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full glass-panel rounded-lg overflow-hidden shadow-2xl">
      <div className="flex items-center gap-3 px-6 py-4 bg-white/5 border-b border-white/10">
        <div className="p-2 rounded-lg bg-nebula-accent/20">
          <Sparkles size={20} className="text-nebula-accent" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">Nebula Chat</h2>
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Neural Engine Active</p>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 p-6 overflow-y-auto space-y-6 scroll-smooth"
      >
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex gap-4 max-w-[85%]",
              message.role === 'user' ? "ml-auto flex-row-reverse" : ""
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
              message.role === 'user' ? "bg-nebula-secondary/20 text-nebula-secondary" : "bg-nebula-accent/20 text-nebula-accent"
            )}>
              {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={cn(
              "p-4 rounded-2xl text-sm leading-relaxed",
              message.role === 'user' 
                ? "bg-nebula-accent text-white rounded-tr-none" 
                : "bg-white/5 text-slate-200 border border-white/10 rounded-tl-none"
            )}>
              <div className="markdown-body prose prose-invert prose-sm max-w-none">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-4 max-w-[85%]"
          >
            <div className="w-8 h-8 rounded-full bg-nebula-accent/20 text-nebula-accent flex items-center justify-center">
              <Loader2 size={16} className="animate-spin" />
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 rounded-tl-none flex items-center gap-2">
              <span className="text-xs text-white/40 italic">Nebula is thinking...</span>
            </div>
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-white/5 border-t border-white/10">
        <div className="relative flex items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe the app you want to build..."
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-nebula-accent/50 transition-colors placeholder:text-white/20"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 text-nebula-accent hover:text-nebula-accent/80 disabled:text-white/10 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
        <div className="flex gap-4 mt-3 px-2">
          <div className="flex items-center gap-1.5 text-[10px] text-white/30 font-medium uppercase tracking-wider">
            <Layout size={12} /> Frontend
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-white/30 font-medium uppercase tracking-wider">
            <Database size={12} /> Backend
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-white/30 font-medium uppercase tracking-wider">
            <Code size={12} /> Logic
          </div>
        </div>
      </form>
    </div>
  );
}
