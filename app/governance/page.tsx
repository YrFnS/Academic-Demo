'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/components/providers';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gavel, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Users, 
  BarChart3,
  ChevronRight,
  Plus,
  Info,
  Scale,
  ClipboardList,
  History,
  Download
} from 'lucide-react';
import dynamic from 'next/dynamic';

const BarChart = dynamic(() => import('recharts').then(m => m.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then(m => m.Bar), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(m => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(m => m.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(m => m.CartesianGrid), { ssr: false });
const RechartsTooltip = dynamic(() => import('recharts').then(m => m.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(m => m.ResponsiveContainer), { ssr: false });
const Cell = dynamic(() => import('recharts').then(m => m.Cell), { ssr: false });

const ACCREDITATION_DATA = [
  { criterion: 'Curriculum', score: 92, target: 85 },
  { criterion: 'Faculty', score: 88, target: 85 },
  { criterion: 'Facilities', score: 78, target: 85 },
  { criterion: 'Research', score: 95, target: 85 },
  { criterion: 'Student Support', score: 82, target: 85 },
];

const QUALITY_AUDITS = [
  { id: 'AUD-2025-01', title: 'Annual Curriculum Review', status: 'completed', date: 'Sep 15, 2025', department: 'Computer Science' },
  { id: 'AUD-2025-04', title: 'ISO 9001 Compliance Audit', status: 'in-progress', date: 'Oct 20, 2025', department: 'Institutional' },
];

const COMMITTEE_MEETINGS = [
  { id: 1, title: 'Academic Council Meeting', date: 'Oct 28, 2025', time: '10:00 AM', location: 'Boardroom A', status: 'scheduled' },
  { id: 2, title: 'Quality Assurance Committee', date: 'Oct 30, 2025', time: '2:00 PM', location: 'Virtual', status: 'scheduled' },
];

export default function GovernancePage() {
  const { role, t } = useAppContext();
  const [activeTab, setActiveTab] = useState<'compliance' | 'audits' | 'committees'>('compliance');

  if (role === 'student') {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-slate-900">Governance & Quality Assurance</h1>
          <div className="bg-white/80 border border-slate-200 rounded-3xl p-8 backdrop-blur-xl text-center shadow-xl">
            <Gavel className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Restricted Access</h2>
            <p className="text-slate-500 mb-6">This module is only accessible to University Administration and Faculty Leadership.</p>
          </div>
        </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Governance & Quality Assurance</h1>
            <p className="text-slate-500">
              {role === 'lecturer' ? 'Participate in curriculum reviews and track quality compliance for your courses.' : 
               'Oversee institutional accreditation, manage committee workflows, and monitor quality audits.'}
            </p>
          </div>
          
          <div className="flex p-1 bg-slate-100 rounded-2xl w-fit overflow-x-auto">
            <button 
              onClick={() => setActiveTab('compliance')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'compliance' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Compliance
            </button>
            <button 
              onClick={() => setActiveTab('audits')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'audits' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Quality Audits
            </button>
            <button 
              onClick={() => setActiveTab('committees')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'committees' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Committees
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'compliance' && (
            <motion.div 
              key="compliance"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Accreditation Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                      Accreditation Readiness (ABET)
                    </h3>
                    <button className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
                      <Download className="w-4 h-4" /> Export Report
                    </button>
                  </div>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ACCREDITATION_DATA} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                        <XAxis type="number" domain={[0, 100]} hide />
                        <YAxis dataKey="criterion" type="category" axisLine={false} tickLine={false} width={120} tick={{fill: '#64748b', fontSize: 12}} />
                        <RechartsTooltip 
                          cursor={{fill: '#f8fafc'}}
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                          {ACCREDITATION_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.score >= entry.target ? '#10b981' : '#f59e0b'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-oxford-blue rounded-3xl p-6 text-white shadow-xl">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Scale className="w-5 h-5 text-academic-gold" />
                      Policy Updates
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Revised Oct 10</p>
                        <p className="font-bold text-sm">Academic Integrity Policy v4.2</p>
                        <button className="mt-2 text-xs font-bold text-academic-gold hover:underline">Review Changes</button>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">New Draft</p>
                        <p className="font-bold text-sm">Hybrid Learning Standards</p>
                        <button className="mt-2 text-xs font-bold text-academic-gold hover:underline">Add Comments</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'audits' && (
            <motion.div 
              key="audits"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Institutional Quality Audits</h2>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Schedule Audit
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="divide-y divide-slate-100">
                  {QUALITY_AUDITS.map(audit => (
                    <div key={audit.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          audit.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                          {audit.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{audit.id}</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{audit.department}</span>
                          </div>
                          <h4 className="font-bold text-slate-900">{audit.title}</h4>
                          <p className="text-xs text-slate-500">Scheduled for {audit.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          audit.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {audit.status}
                        </span>
                        <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'committees' && (
            <motion.div 
              key="committees"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-blue-600" />
                  Committee Calendar
                </h2>
                <div className="grid gap-4">
                  {COMMITTEE_MEETINGS.map(meeting => (
                    <div key={meeting.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex flex-col items-center justify-center border border-slate-100">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Oct</span>
                          <span className="text-lg font-black text-slate-900 leading-none">{meeting.date.split(' ')[1].replace(',', '')}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{meeting.title}</h4>
                          <p className="text-xs text-slate-500">{meeting.time} • {meeting.location}</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors">
                        View Agenda
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <History className="w-5 h-5 text-blue-600" />
                    Recent Minutes
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-blue-100">
                      <span className="text-xs font-medium text-slate-700">Curriculum Board (Oct 10)</span>
                      <Download className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-blue-100">
                      <span className="text-xs font-medium text-slate-700">Faculty Senate (Oct 05)</span>
                      <Download className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-blue-900 text-sm mb-1">Governance Tip</h4>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        Meeting agendas must be circulated at least 48 hours in advance of the scheduled time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}
