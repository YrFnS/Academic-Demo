'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/components/providers';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Microscope, 
  FlaskConical, 
  FileText, 
  Globe, 
  Award, 
  Search, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  BarChart3,
  Users,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Database,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';

const RESEARCH_DATA = [
  { month: 'Jan', publications: 4, citations: 12 },
  { month: 'Feb', publications: 6, citations: 18 },
  { month: 'Mar', publications: 5, citations: 25 },
  { month: 'Apr', publications: 8, citations: 40 },
  { month: 'May', publications: 12, citations: 55 },
  { month: 'Jun', publications: 10, citations: 70 },
];

const GRANTS = [
  { id: 'GR-2025-01', title: 'AI in Sustainable Energy', amount: '$150,000', status: 'active', agency: 'National Science Fund' },
  { id: 'GR-2025-04', title: 'Quantum Computing Primitives', amount: '$85,000', status: 'pending', agency: 'Ministry of Higher Ed' },
];

const PUBLICATIONS = [
  { id: 1, title: 'Neural Networks for Power Grid Optimization', journal: 'IEEE Transactions', date: 'Oct 2025', citations: 12 },
  { id: 2, title: 'Blockchain in Academic Records', journal: 'Nature Digital', date: 'Sep 2025', citations: 45 },
];

const LAB_EQUIPMENT = [
  { id: 'LAB-01', name: 'High-Performance GPU Cluster', status: 'operational', location: 'Room 402' },
  { id: 'LAB-02', name: 'Scanning Electron Microscope', status: 'maintenance', location: 'Basement Lab' },
];

export default function ResearchPage() {
  const { role, t } = useAppContext();
  const [activeTab, setActiveTab] = useState<'overview' | 'grants' | 'publications' | 'ethics'>('overview');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Research & Innovation</h1>
            <p className="text-slate-500">
              {role === 'student' ? 'Explore research opportunities and track your academic contributions.' : 
               role === 'lecturer' ? 'Manage your grants, publications, and research ethics submissions.' :
               'Monitor departmental research output, funding, and laboratory assets.'}
            </p>
          </div>
          
          <div className="flex p-1 bg-slate-100 rounded-2xl w-fit overflow-x-auto">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'overview' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('grants')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'grants' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {role === 'admin' ? 'Funding' : 'Grants'}
            </button>
            <button 
              onClick={() => setActiveTab('publications')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'publications' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Publications
            </button>
            {role !== 'student' && (
              <button 
                onClick={() => setActiveTab('ethics')}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === 'ethics' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Ethics (IRB)
              </button>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Top Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Publications</p>
                      <p className="text-2xl font-black text-slate-900">142</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                    +12% from last year
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-academic-gold/20 text-academic-gold flex items-center justify-center">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Grants</p>
                      <p className="text-2xl font-black text-slate-900">$2.4M</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-600">
                    <Globe className="w-4 h-4" />
                    4 International Partners
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Research Staff</p>
                      <p className="text-2xl font-black text-slate-900">34</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <Clock className="w-4 h-4" />
                    8 New Assistantships
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Section */}
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Research Impact Analytics
                  </h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={RESEARCH_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="publications" fill="#2563eb" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="citations" fill="#d4af37" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Sidebar Section */}
                <div className="space-y-6">
                  {role === 'admin' ? (
                    <div className="bg-oxford-blue rounded-3xl p-6 text-white shadow-xl">
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <FlaskConical className="w-5 h-5 text-academic-gold" />
                        Lab Inventory
                      </h3>
                      <div className="space-y-4">
                        {LAB_EQUIPMENT.map(item => (
                          <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-slate-400 uppercase">{item.id}</span>
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                item.status === 'operational' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                              }`}>
                                {item.status}
                              </span>
                            </div>
                            <p className="font-bold text-sm">{item.name}</p>
                            <p className="text-xs text-slate-500">{item.location}</p>
                          </div>
                        ))}
                        <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/10 transition-all">
                          Manage Assets
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
                      <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-blue-600" />
                        Opportunities
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-white rounded-2xl border border-blue-100 shadow-sm">
                          <p className="text-xs font-bold text-blue-600 uppercase mb-1">Internship</p>
                          <p className="font-bold text-slate-900 text-sm">AI Lab Assistant</p>
                          <p className="text-xs text-slate-500 mb-3">Under Dr. Sarah Ahmed</p>
                          <button className="text-xs font-bold text-blue-600 hover:underline">Apply Now</button>
                        </div>
                        <div className="p-4 bg-white rounded-2xl border border-blue-100 shadow-sm">
                          <p className="text-xs font-bold text-purple-600 uppercase mb-1">Grant</p>
                          <p className="font-bold text-slate-900 text-sm">Student Travel Fund</p>
                          <p className="text-xs text-slate-500 mb-3">For IEEE Conference 2026</p>
                          <button className="text-xs font-bold text-blue-600 hover:underline">View Details</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'grants' && (
            <motion.div 
              key="grants"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Research Funding & Grants</h2>
                {role !== 'student' && (
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Submit Proposal
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {GRANTS.map(grant => (
                  <div key={grant.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                        <Database className="w-6 h-6" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        grant.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {grant.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{grant.title}</h3>
                    <p className="text-sm text-slate-500 mb-4">{grant.agency}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Amount</p>
                        <p className="text-lg font-black text-slate-900">{grant.amount}</p>
                      </div>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'publications' && (
            <motion.div 
              key="publications"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Publication Repository</h2>
                <div className="flex gap-2">
                  <button className="p-2 bg-slate-100 rounded-xl text-slate-600 hover:bg-slate-200 transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                  {role !== 'student' && (
                    <button className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Publication
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="divide-y divide-slate-100">
                  {PUBLICATIONS.map(pub => (
                    <div key={pub.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 leading-tight mb-1">{pub.title}</h4>
                          <p className="text-sm text-slate-500">{pub.journal} • {pub.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Citations</p>
                          <p className="text-lg font-black text-slate-900">{pub.citations}</p>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                          <ExternalLink className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'ethics' && (
            <motion.div 
              key="ethics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-3xl bg-purple-100 text-purple-600 flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Research Ethics (IRB)</h2>
                    <p className="text-slate-500">Submit and track your Institutional Review Board applications.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">IRB-2025-082: Human-AI Interaction Study</p>
                        <p className="text-xs text-slate-500">Approved on Oct 01, 2025</p>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-blue-600 hover:underline">View Certificate</button>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">IRB-2025-114: Privacy in Social Networks</p>
                        <p className="text-xs text-slate-500">Under Review (Expected Oct 25)</p>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-slate-400 cursor-not-allowed">In Progress</button>
                  </div>
                </div>

                <button className="w-full mt-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" />
                  New IRB Application
                </button>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-amber-900 text-sm mb-1">Ethics Compliance Reminder</h4>
                    <p className="text-xs text-amber-700 leading-relaxed">
                      All research involving human subjects must receive IRB approval BEFORE data collection begins. Failure to comply may result in research suspension.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}
