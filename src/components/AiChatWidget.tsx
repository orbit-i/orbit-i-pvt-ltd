import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Loader2,
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { apiFetch } from '../lib/apiClient';

export const AiChatWidget: React.FC<{ settings?: any; setActiveTab?: (tab: any) => void }> = ({ settings, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: "👋 Welcome to **ORBIT-I**!\n\nI am your **AI Solutions Advisor**, trained on our full catalog of **Enterprise AI**, **Python RPA & Playwright Scraping**, **React 19 / TypeScript Web & Mobile Platforms**, and **MySQL** architectures.\n\nHow can I help you today? Feel free to ask about project costs, current openings, or portal demos!",
      time: 'Just now',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim() || loading) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user' as const, text: queryText.trim(), time: timeNow };
    
    // Prepare history snapshot
    const currentHistory = [...messages, userMsg];
    setMessages(currentHistory);
    setInput('');
    setLoading(true);

    try {
      const res = await apiFetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryText.trim(),
          history: currentHistory.map((m) => ({
            sender: m.sender === 'user' ? 'user' : 'model',
            text: m.text,
          })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: data.reply || "I am here to assist you with Orbit-I enterprise services, pricing, and architectures.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: "Thank you for reaching out to **Orbit-I Private Limited**. Our senior engineering team is directly reachable at `contact@orbit-i.com` or via our Contact form!",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuery(input);
  };

  // Helper to format basic markdown-style text (bold, bullet points, headers) cleanly
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-1.5 text-xs leading-relaxed text-left">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-1" />;

          // Heading
          if (trimmed.startsWith('### ')) {
            return (
              <h5 key={idx} className="font-bold text-white text-xs pt-1 pb-0.5 text-blue-300">
                {trimmed.replace(/^###\s+/, '')}
              </h5>
            );
          }
          if (trimmed.startsWith('## ')) {
            return (
              <h4 key={idx} className="font-bold text-white text-sm pt-1 pb-0.5">
                {trimmed.replace(/^##\s+/, '')}
              </h4>
            );
          }

          // Bullet point
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const content = trimmed.substring(2);
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-blue-400 font-bold">•</span>
                <span className="flex-1">{parseInlineFormatting(content)}</span>
              </div>
            );
          }

          // Numbered list
          const matchNum = trimmed.match(/^(\d+)\.\s+(.*)/);
          if (matchNum) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-cyan-400 font-semibold">{matchNum[1]}.</span>
                <span className="flex-1">{parseInlineFormatting(matchNum[2])}</span>
              </div>
            );
          }

          return <p key={idx}>{parseInlineFormatting(line)}</p>;
        })}
      </div>
    );
  };

  // Simple inline parser for **bold** and `code`
  const parseInlineFormatting = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="px-1 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono text-[11px]">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 text-left">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          id="orbit-ai-floating-btn"
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl shadow-indigo-600/40 hover:shadow-indigo-600/60 hover:scale-105 transition-all duration-300 cursor-pointer border border-cyan-400/30"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold leading-tight">Orbit-I AI Advisor</div>
            <div className="text-[10px] text-cyan-200">Online • Verified Knowledge</div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[420px] h-[540px] max-h-[85vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200 text-left">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-blue-900/80 via-indigo-900/70 to-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-cyan-300 shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  Orbit-I AI Solutions Advisor
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                </h4>
                <p className="text-[10px] text-cyan-300 font-mono">Gemini 3.7 Verified Knowledge</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Action Chips */}
          <div className="px-3 py-2 bg-slate-950/70 border-b border-slate-800/70 flex items-center gap-1.5 overflow-x-auto text-[10px] no-scrollbar text-left">
            {setActiveTab && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  setActiveTab('contact');
                }}
                className="px-2.5 py-1 rounded-lg bg-blue-600/30 text-cyan-300 border border-blue-500/30 whitespace-nowrap hover:bg-blue-600/50 flex items-center gap-1 cursor-pointer font-medium"
              >
                <Sparkles className="w-3 h-3 text-cyan-300" />
                <span>Contact Orbit-I</span>
              </button>
            )}
            <button
              onClick={() => sendQuery('What internship or career openings do you currently have?')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 whitespace-nowrap hover:bg-slate-700 hover:text-white cursor-pointer"
            >
              Internships 2026
            </button>
            <button
              onClick={() => sendQuery('What are your services, pricing, and project turnaround times?')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 whitespace-nowrap hover:bg-slate-700 hover:text-white cursor-pointer"
            >
              Pricing & Services
            </button>
            <button
              onClick={() => sendQuery('How do you connect Python automation scraping to Hostinger MySQL?')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 whitespace-nowrap hover:bg-slate-700 hover:text-white cursor-pointer"
            >
              Python & MySQL
            </button>
            <button
              onClick={() => sendQuery('How can I test the SuperAdmin and Client portal demo accounts?')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 whitespace-nowrap hover:bg-slate-700 hover:text-white cursor-pointer"
            >
              Portals Demo
            </button>
          </div>

          {/* Message Stream */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/50 text-left">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2.5 ${
                  m.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-md bg-blue-600/30 border border-blue-500/40 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none text-left'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none text-left shadow-md'
                  }`}
                >
                  {renderFormattedText(m.text)}
                  <span className="block text-[9px] text-slate-400 mt-1.5 text-right font-mono">{m.time}</span>
                </div>
                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-md bg-indigo-600/40 border border-indigo-500/40 text-indigo-200 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs py-1.5 pl-2">
                <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                <span className="text-slate-400 font-mono text-[11px]">Orbit-I AI analyzing knowledge base...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about AI, Python scraping, pricing, internships..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
