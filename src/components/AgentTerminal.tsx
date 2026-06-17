import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, X, Send, Loader2 } from 'lucide-react';

interface Entry {
  id: string;
  type: 'user' | 'system';
  content: string;
  timestamp: string;
}

const HighlightedText = ({ content }: { content: string }) => {
  const parts = content.split(/(\[CEO\]|\bERROR\b|\bWARN(?:ING)?\b|\bSUCCESS(?:FULLY)?\b|\bINFO\b)/ig);
  
  return (
    <span>
      {parts.map((part, i) => {
        if (!part) return null;
        const lower = part.toLowerCase();
        if (lower === '[ceo]') return <span key={i} className="text-indigo-300 font-semibold">{part}</span>;
        if (lower === 'error') return <span key={i} className="text-rose-400 font-semibold">{part}</span>;
        if (lower === 'warn' || lower === 'warning') return <span key={i} className="text-amber-400 font-semibold">{part}</span>;
        if (lower.startsWith('success')) return <span key={i} className="text-emerald-400 font-semibold">{part}</span>;
        if (lower === 'info') return <span key={i} className="text-sky-400 font-semibold">{part}</span>;
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

export function AgentTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Entry[]>([
    {
      id: 'init',
      type: 'system',
      content: 'HERMES CEO Orchestrator initialized. Ready for natural language instruction.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen, isProcessing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userEntry: Entry = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setHistory((prev) => [...prev, userEntry]);
    setInput('');
    setIsProcessing(true);

    // Simulate agent working sequence
    setTimeout(() => {
      setHistory((prev) => [
        ...prev,
        {
          id: Date.now().toString() + '-ack',
          type: 'system',
          content: `[CEO] Intent parsed. Decomposing workflow "${userEntry.content}"...`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);

      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          {
            id: Date.now().toString() + '-route',
            type: 'system',
            content: '[CEO] Routed: UiPath Maestro (1 task), Cognitive Agent (2 tasks). Execution initiated successfully.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setIsProcessing(false);
      }, 1500);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-8 w-[400px] max-w-[calc(100vw-2rem)] bg-slate-950 border border-indigo-500/30 rounded-xl shadow-[0_0_40px_rgba(99,102,241,0.15)] flex flex-col overflow-hidden z-50 font-mono"
          >
            {/* Header */}
            <div className="bg-slate-900 border-b border-indigo-500/30 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">CEO Orchestrator</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 h-[320px] overflow-y-auto p-4 text-sm scroll-smooth bg-slate-950/50 backdrop-blur-sm relative">
              <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none" />
              
              <div className="space-y-4">
                {history.map((entry) => (
                  <div key={entry.id} className={`flex flex-col ${entry.type === 'user' ? 'items-end' : 'items-start'}`}>
                    <span className="text-[10px] text-slate-600 mb-1 font-sans">{entry.timestamp}</span>
                    <div
                      className={`p-3 rounded-lg max-w-[90%] text-xs leading-relaxed ${
                        entry.type === 'user'
                          ? 'bg-indigo-600/20 text-indigo-100 border border-indigo-500/30 font-sans'
                          : 'bg-slate-900 text-slate-300 border border-slate-800'
                      }`}
                    >
                      {entry.type === 'user' ? (
                        <span>{entry.content}</span>
                      ) : (
                        <div className="flex items-start gap-2">
                          <span className="text-indigo-400 select-none mt-0.5">&gt;</span>
                          <HighlightedText content={entry.content} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isProcessing && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-start"
                  >
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 flex items-center gap-3 w-full">
                      <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                      <span className="text-xs font-sans">Orchestrating workflows...</span>
                    </div>
                  </motion.div>
                )}
                <div ref={bottomRef} className="h-2" />
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Instruct CEO Agent..."
                className="flex-1 bg-slate-950 border border-slate-700/50 rounded-md px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 placeholder:text-slate-600 font-sans shadow-inner shadow-black/20"
                autoFocus={isOpen}
              />
              <button
                type="submit"
                disabled={!input.trim() || isProcessing}
                className="px-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-indigo-500/20 flex items-center justify-center"
                title="Send Command"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-50 h-14 w-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border ${
          isOpen 
            ? 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-700' 
            : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-110 active:scale-95 border-indigo-500 shadow-indigo-500/30'
        }`}
        aria-label="Toggle Agent Terminal"
      >
        <motion.div
           initial={false}
           animate={{ rotate: isOpen ? 90 : 0 }}
           transition={{ duration: 0.2 }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Terminal className="w-6 h-6" />}
        </motion.div>
      </button>
    </>
  );
}
