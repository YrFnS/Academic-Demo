'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/components/providers';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LifeBuoy, 
  MessageSquare, 
  Bell, 
  Search, 
  Plus, 
  Send, 
  User, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ChevronRight,
  Headphones,
  Info,
  Megaphone,
  GraduationCap
} from 'lucide-react';

const ANNOUNCEMENTS = [
  { id: 1, title: 'Campus-wide Wi-Fi Upgrade', content: 'Scheduled maintenance on Oct 20. Expect intermittent connectivity in the Engineering block.', date: 'Oct 14, 2025', category: 'IT', priority: 'medium' },
  { id: 2, title: 'Spring 2026 Registration Open', content: 'Early registration for high-achieving students starts next Monday.', date: 'Oct 12, 2025', category: 'Academic', priority: 'high' },
  { id: 3, title: 'New Cafeteria Menu', content: 'Check out our new healthy options available at the Student Center.', date: 'Oct 10, 2025', category: 'Campus Life', priority: 'low' },
];

const TICKETS = [
  { id: 'TKT-1024', subject: 'VPN Access Issue', status: 'open', date: 'Oct 13, 2025', lastUpdate: '2 hours ago' },
  { id: 'TKT-0988', subject: 'Software License Request (MATLAB)', status: 'resolved', date: 'Oct 05, 2025', lastUpdate: '3 days ago' },
];

const CHAT_MESSAGES = [
  { id: 1, sender: 'advisor', text: 'Hello Yasser! How can I help you with your academic plan today?', time: '10:00 AM' },
  { id: 2, sender: 'user', text: 'Hi Dr. Sarah, I wanted to ask about the prerequisites for the Cloud Computing course.', time: '10:05 AM' },
  { id: 3, sender: 'advisor', text: 'You need to have completed CS305 (Operating Systems) first. Have you finished that?', time: '10:06 AM' },
];

export default function SupportPage() {
  const { role, t } = useAppContext();
  const [activeTab, setActiveTab] = useState<'announcements' | 'it-support' | 'chat'>('announcements');
  const [newMessage, setNewMessage] = useState('');

  if (role !== 'student') {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-slate-900">Support & Communication</h1>
          <div className="bg-white/80 border border-slate-200 rounded-3xl p-8 backdrop-blur-xl text-center shadow-xl">
            <Headphones className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Support Staff View</h2>
            <p className="text-slate-500 mb-6">Manage global announcements, respond to IT tickets, and chat with students.</p>
          </div>
        </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Support & Communication</h1>
            <p className="text-slate-500">Stay informed with campus news, get technical help, and talk to your advisor.</p>
          </div>
          
          <div className="flex p-1 bg-slate-100 rounded-2xl w-fit overflow-x-auto">
            <button 
              onClick={() => setActiveTab('announcements')}
              className={`px-4 md:px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'announcements' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Announcements
            </button>
            <button 
              onClick={() => setActiveTab('it-support')}
              className={`px-4 md:px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'it-support' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              IT Helpdesk
            </button>
            <button 
              onClick={() => setActiveTab('chat')}
              className={`px-4 md:px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'chat' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Advisor Chat
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'announcements' && (
            <motion.div 
              key="announcements"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid gap-4">
                {ANNOUNCEMENTS.map((item) => (
                  <motion.div 
                    key={item.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
                  >
                    {item.priority === 'high' && (
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500"></div>
                    )}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                          item.category === 'IT' ? 'bg-blue-100 text-blue-600' : 
                          item.category === 'Academic' ? 'bg-purple-100 text-purple-600' : 'bg-emerald-100 text-emerald-600'
                        }`}>
                          <Megaphone className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{item.category}</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{item.date}</span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                          <p className="text-slate-600 leading-relaxed">{item.content}</p>
                        </div>
                      </div>
                      <button className="text-sm font-bold text-blue-600 hover:underline shrink-0">Read More</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'it-support' && (
            <motion.div 
              key="it-support"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">My Support Tickets</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Ticket
                  </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                  <div className="divide-y divide-slate-100">
                    {TICKETS.map((ticket) => (
                      <div key={ticket.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                            ticket.status === 'resolved' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {ticket.status === 'resolved' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">{ticket.subject}</h4>
                            <p className="text-xs text-slate-500">Opened on {ticket.date} • Last update {ticket.lastUpdate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            ticket.status === 'resolved' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                          }`}>
                            {ticket.status}
                          </span>
                          <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-oxford-blue rounded-3xl p-6 text-white shadow-xl">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <LifeBuoy className="w-5 h-5 text-academic-gold" />
                    Need Immediate Help?
                  </h3>
                  <p className="text-slate-400 text-sm mb-6">Our IT team is available for live support during campus hours.</p>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">IT Hotline</p>
                      <p className="text-xl font-black text-white">0780-IT-HELP</p>
                    </div>
                    <button className="w-full py-3 bg-academic-gold text-oxford-blue font-bold rounded-xl hover:bg-amber-400 transition-all">
                      Start Live Chat
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-blue-900 text-sm mb-1">Knowledge Base</h4>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        Check our FAQ for quick answers about Wi-Fi, email, and software licenses.
                      </p>
                      <button className="mt-2 text-xs font-bold text-blue-600 hover:underline">Browse FAQ</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'chat' && (
            <motion.div 
              key="chat"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl mx-auto h-[600px] flex flex-col bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl"
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    SA
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Dr. Sarah Ahmed</h3>
                    <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Online
                    </p>
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <Info className="w-5 h-5" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
                {CHAT_MESSAGES.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        msg.sender === 'user' ? 'bg-slate-900 text-white' : 'bg-blue-600 text-white'
                      }`}>
                        {msg.sender === 'user' ? <User className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className={`p-4 rounded-2xl text-sm ${
                          msg.sender === 'user' 
                            ? 'bg-blue-600 text-white rounded-tr-none' 
                            : 'bg-white border border-slate-200 text-slate-900 rounded-tl-none shadow-sm'
                        }`}>
                          {msg.text}
                        </div>
                        <p className={`text-[10px] text-slate-400 mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-slate-100 bg-white">
                <form 
                  onSubmit={(e) => { e.preventDefault(); setNewMessage(''); }}
                  className="flex gap-2"
                >
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                    type="submit"
                    className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}
