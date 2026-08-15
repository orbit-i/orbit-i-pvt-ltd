import React, { useState } from 'react';
import {
  LifeBuoy,
  MessageSquare,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
  User,
  Trash2
} from 'lucide-react';
import { SupportTicket } from '../../../types';

interface AdminSupportTicketsTabProps {
  tickets: SupportTicket[];
  setTickets: React.Dispatch<React.SetStateAction<SupportTicket[]>>;
}

export const AdminSupportTicketsTab: React.FC<AdminSupportTicketsTabProps> = ({
  tickets,
  setTickets,
}) => {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(
    tickets[0]?.id || null
  );
  const [replyText, setReplyText] = useState('');

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'support' as const,
      senderName: 'Lead Systems Architect (Orbit-I Staff)',
      text: replyText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setTickets((prev) =>
      prev.map((t) =>
        t.id === selectedTicket.id
          ? {
              ...t,
              status: t.status === 'Open' ? 'In Investigation' : t.status,
              messages: [...t.messages, newMsg],
            }
          : t
      )
    );

    setReplyText('');

    try {
      await fetch(`/api/support/tickets/${selectedTicket.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: 'support',
          senderName: 'Lead Systems Architect (Orbit-I Staff)',
          text: newMsg.text,
        }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (id: string, status: SupportTicket['status']) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
    try {
      await fetch(`/api/support/tickets/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTicket = (id: string) => {
    if (confirm('Delete this support ticket?')) {
      setTickets((prev) => prev.filter((t) => t.id !== id));
      if (selectedTicketId === id) {
        setSelectedTicketId(tickets.find((t) => t.id !== id)?.id || null);
      }
    }
  };

  return (
    <div id="admin-support-desk" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-xl p-5">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <LifeBuoy className="w-5 h-5 text-purple-400" />
            Enterprise Support & Engineering Ticket Desk
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Resolve enterprise SLA tickets, bug reports, and database maintenance requests in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
            SLA Response Target: &lt; 15 Mins
          </span>
        </div>
      </div>

      {/* Ticket Desk Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Tickets List */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Inbound Client Tickets ({tickets.length})
          </div>

          <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1">
            {tickets.map((t) => {
              const isSelected = selectedTicket?.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-purple-950/40 border-purple-500/50 shadow-md'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-semibold text-slate-200 truncate">{t.subject}</span>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        t.status === 'Resolved'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : t.status === 'In Investigation'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>{t.clientName}</span>
                    <span
                      className={`font-bold ${
                        t.priority === 'Urgent'
                          ? 'text-rose-400'
                          : t.priority === 'High'
                          ? 'text-amber-400'
                          : 'text-slate-500'
                      }`}
                    >
                      {t.priority}
                    </span>
                  </div>

                  <div className="text-[10px] text-slate-500 mt-1 font-mono">{t.createdAt}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Cols: Active Thread & Response Desk */}
        {selectedTicket ? (
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4">
            {/* Thread Header */}
            <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">{selectedTicket.subject}</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {selectedTicket.id}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Client: <strong className="text-slate-200">{selectedTicket.clientName}</strong> (
                  <span className="font-mono">{selectedTicket.clientEmail}</span>) • Project:{' '}
                  <span className="text-slate-300">{selectedTicket.projectTitle}</span>
                </div>
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-400">Status:</label>
                <select
                  value={selectedTicket.status}
                  onChange={(e) => handleUpdateStatus(selectedTicket.id, e.target.value as any)}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                >
                  <option value="Open">Open</option>
                  <option value="In Investigation">In Investigation</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
                <button
                  type="button"
                  onClick={() => handleDeleteTicket(selectedTicket.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800"
                  title="Delete ticket"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2 py-2">
              {selectedTicket.messages.map((msg) => {
                const isSupport = msg.sender === 'support' || msg.sender === 'architect';
                return (
                  <div
                    key={msg.id}
                    className={`p-3.5 rounded-xl text-xs space-y-1 ${
                      isSupport
                        ? 'bg-purple-950/30 border border-purple-500/30 ml-8'
                        : 'bg-slate-950/70 border border-slate-800 mr-8'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span
                        className={`font-semibold flex items-center gap-1 ${
                          isSupport ? 'text-purple-300' : 'text-blue-300'
                        }`}
                      >
                        {isSupport ? <ShieldCheck className="w-3 h-3 text-purple-400" /> : <User className="w-3 h-3 text-blue-400" />}
                        {msg.senderName}
                      </span>
                      <span className="text-slate-500 font-mono">{msg.timestamp}</span>
                    </div>
                    <div className="text-slate-200 leading-relaxed whitespace-pre-wrap">{msg.text}</div>
                  </div>
                );
              })}
            </div>

            {/* Reply Box */}
            <form onSubmit={handleSendMessage} className="pt-2 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type official engineering reply..."
                className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-purple-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!replyText.trim()}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md shadow-purple-600/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Reply</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-xl p-12 text-center text-slate-500 text-xs">
            Select a ticket from the left panel to review message thread and respond.
          </div>
        )}
      </div>
    </div>
  );
};
