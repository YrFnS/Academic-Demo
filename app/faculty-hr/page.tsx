'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/components/providers';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserCheck, 
  Calendar, 
  TrendingUp, 
  Award, 
  Clock, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  BarChart3,
  ChevronRight,
  Briefcase,
  Star,
  ShieldCheck,
  Target,
  Plus
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
  Legend
} from 'recharts';

const WORKLOAD_DATA = [
  { name: 'Teaching', value: 45, color: '#2563eb' },
  { name: 'Research', value: 35, color: '#d4af37' },
  { name: 'Admin', value: 20, color: '#64748b' },
];

const FACULTY_MEMBERS = [
  { id: 1, name: 'Dr. Sarah Ahmed', rank: 'Associate Professor', workload: 92, status: 'On Track', rating: 4.8 },
  { id: 2, name: 'Prof. Khalid Ali', rank: 'Professor', workload: 105, status: 'Overloaded', rating: 4.9 },
  { id: 3, name: 'Dr. Omar Farooq', rank: 'Assistant Professor', workload: 75, status: 'Available', rating: 4.5 },
];

const LEAVE_REQUESTS = [
  { id: 'LV-442', type: 'Sabbatical', duration: '6 Months', status: 'pending', date: 'Oct 12, 2025' },
  { id: 'LV-439', type: 'Sick Leave', duration: '2 Days', status: 'approved', date: 'Oct 08, 2025' },
];

export default function FacultyHRPage() {
  const { role, t } = useAppContext();
  const [activeTab, setActiveTab] = useState<'performance' | 'workload' | 'leave'>('performance');

  if (role === 'student') {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-slate-900">Faculty HR & Performance</h1>
          <div className="bg-white/80 border border-slate-200 rounded-3xl p-8 backdrop-blur-xl text-center shadow-xl">
            <UserCheck className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Restricted Access</h2>
            <p className="text-slate-500 mb-6">This module is only accessible to Faculty members and Department Heads.</p>
          </div>
        </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Faculty HR & Performance</h1>
            <p className="text-slate-500">
              {role === 'lecturer' ? 'Track your professional development, workload, and leave requests.' : 
               'Manage department faculty workload, performance appraisals, and tenure tracking.'}
            </p>
          </div>
          
          <div className="flex p-1 bg-slate-100 rounded-2xl w-fit overflow-x-auto">
            <button 
              onClick={() => setActiveTab('performance')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'performance' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Performance
            </button>
            <button 
              onClick={() => setActiveTab('workload')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'workload' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Workload
            </button>
            <button 
              onClick={() => setActiveTab('leave')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'leave' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Leave & Admin
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'performance' && (
            <motion.div 
              key="performance"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {role === 'admin' ? (
                <div className="grid gap-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">Faculty Performance Overview</h2>
                    <button className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors">
                      Generate Annual Report
                    </button>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                    <div className="divide-y divide-slate-100">
                      {FACULTY_MEMBERS.map(member => (
                        <div key={member.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900">{member.name}</h4>
                              <p className="text-xs text-slate-500">{member.rank}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                            <div className="text-center md:text-left">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Rating</p>
                              <div className="flex items-center gap-1 font-bold text-slate-900">
                                <Star className="w-3.5 h-3.5 text-academic-gold fill-academic-gold" />
                                {member.rating}
                              </div>
                            </div>
                            <div className="text-center md:text-left">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                member.status === 'On Track' ? 'bg-emerald-50 text-emerald-600' : 
                                member.status === 'Overloaded' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
                              }`}>
                                {member.status}
                              </span>
                            </div>
                            <button className="hidden md:flex items-center justify-center p-2 text-slate-400 hover:text-slate-900 transition-colors">
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        Professional Growth
                      </h3>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-500">Tenure Progress</span>
                            <span className="font-bold text-slate-900">75%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Student Rating</p>
                            <p className="text-2xl font-black text-slate-900">4.8/5.0</p>
                          </div>
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Publications</p>
                            <p className="text-2xl font-black text-slate-900">12</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-oxford-blue rounded-3xl p-6 text-white shadow-xl">
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-academic-gold" />
                        Achievements
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm">Excellence in Teaching 2025</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm">IEEE Senior Member</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'workload' && (
            <motion.div 
              key="workload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Workload Distribution
                </h3>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={WORKLOAD_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {WORKLOAD_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Semester Load
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Teaching Hours</span>
                      <span className="font-bold text-slate-900">12 hrs/wk</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Office Hours</span>
                      <span className="font-bold text-slate-900">4 hrs/wk</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Committee Work</span>
                      <span className="font-bold text-slate-900">2 hrs/wk</span>
                    </div>
                    <div className="pt-4 border-t border-blue-200 flex justify-between items-center">
                      <span className="font-bold text-blue-900">Total Load</span>
                      <span className="font-black text-blue-600">18 hrs/wk</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-bold rounded-xl transition-colors text-left px-4 flex items-center justify-between">
                      Request Overload
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-bold rounded-xl transition-colors text-left px-4 flex items-center justify-between">
                      Update Office Hours
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'leave' && (
            <motion.div 
              key="leave"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Leave Requests
                  </h2>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Request
                  </button>
                </div>
                <div className="divide-y divide-slate-100">
                  {LEAVE_REQUESTS.map(req => (
                    <div key={req.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          req.status === 'approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                          {req.status === 'approved' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{req.type}</h4>
                          <p className="text-xs text-slate-500">{req.duration} • Submitted on {req.date}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        req.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl">
                  <ShieldCheck className="w-10 h-10 text-academic-gold mb-4" />
                  <h3 className="text-xl font-bold mb-2">Professional Development</h3>
                  <p className="text-slate-400 text-sm mb-6">You have $2,500 remaining in your annual conference and training fund.</p>
                  <button className="px-6 py-2.5 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors">
                    Claim Expenses
                  </button>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8">
                  <Briefcase className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Sabbatical Eligibility</h3>
                  <p className="text-blue-700 text-sm mb-6">You are eligible for a one-semester sabbatical starting Fall 2026.</p>
                  <button className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}
