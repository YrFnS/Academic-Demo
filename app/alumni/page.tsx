'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/components/providers';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UsersRound, 
  Gift, 
  Award, 
  Calendar, 
  Briefcase, 
  Search, 
  Plus, 
  Heart, 
  TrendingUp, 
  Globe, 
  Mail, 
  ChevronRight, 
  ExternalLink, 
  Star, 
  ShieldCheck,
  CreditCard,
  HandCoins,
  Building2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Cell,
  LineChart,
  Line
} from 'recharts';

const DONATION_DATA = [
  { year: '2020', amount: 1.2 },
  { year: '2021', amount: 1.5 },
  { year: '2022', amount: 2.1 },
  { year: '2023', amount: 1.8 },
  { year: '2024', amount: 2.8 },
  { year: '2025', amount: 3.4 },
];

const ALUMNI_EVENTS = [
  { id: 1, title: 'Annual Homecoming 2025', date: 'Nov 15, 2025', location: 'Main Campus', type: 'Social' },
  { id: 2, title: 'Tech Alumni Networking', date: 'Dec 05, 2025', location: 'Virtual', type: 'Professional' },
];

const MENTORS = [
  { id: 1, name: 'Eng. Ahmed Mansour', company: 'Google', role: 'Senior Software Engineer', class: '2015' },
  { id: 2, name: 'Dr. Fatima Zahra', company: 'Mayo Clinic', role: 'Medical Researcher', class: '2012' },
];

const TOP_DONORS = [
  { name: 'Al-Maktoum Foundation', amount: '$500k', category: 'Endowment' },
  { name: 'Sumer Tech Group', amount: '$250k', category: 'Scholarships' },
];

export default function AlumniPage() {
  const { role, t } = useAppContext();
  const [activeTab, setActiveTab] = useState<'network' | 'giving' | 'directory'>('network');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Alumni & Development</h1>
            <p className="text-slate-500">
              {role === 'student' ? 'Connect with alumni mentors and explore networking opportunities.' : 
               role === 'lecturer' ? 'Engage with former students and track departmental alumni success.' :
               'Manage institutional giving, alumni relations, and endowment growth.'}
            </p>
          </div>
          
          <div className="flex p-1 bg-slate-100 rounded-2xl w-fit overflow-x-auto">
            <button 
              onClick={() => setActiveTab('network')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'network' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Alumni Network
            </button>
            <button 
              onClick={() => setActiveTab('giving')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'giving' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Giving & Endowments
            </button>
            <button 
              onClick={() => setActiveTab('directory')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'directory' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Directory
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'network' && (
            <motion.div 
              key="network"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-8">
                {/* Mentorship Section */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Star className="w-5 h-5 text-academic-gold" />
                      Alumni Mentors
                    </h3>
                    <button className="text-sm font-bold text-blue-600 hover:underline">View All</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {MENTORS.map(mentor => (
                      <div key={mentor.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all group">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                            {mentor.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{mentor.name}</h4>
                            <p className="text-xs text-slate-500">Class of {mentor.class}</p>
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-xs text-slate-600">
                            <Building2 className="w-3.5 h-3.5" />
                            {mentor.company}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-600">
                            <Briefcase className="w-3.5 h-3.5" />
                            {mentor.role}
                          </div>
                        </div>
                        <button className="w-full py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all">
                          Request Mentorship
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Events Section */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Upcoming Alumni Events
                  </h3>
                  <div className="space-y-4">
                    {ALUMNI_EVENTS.map(event => (
                      <div key={event.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white flex flex-col items-center justify-center border border-slate-200 shadow-sm">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{event.date.split(' ')[0]}</span>
                            <span className="text-lg font-black text-slate-900 leading-none">{event.date.split(' ')[1].replace(',', '')}</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">{event.title}</h4>
                            <p className="text-xs text-slate-500">{event.location} • {event.type}</p>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors">
                          Register
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-oxford-blue rounded-3xl p-6 text-white shadow-xl">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-academic-gold" />
                    Alumni Benefits
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span className="text-sm text-slate-300">Lifetime Library Access</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span className="text-sm text-slate-300">Career Coaching for Life</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span className="text-sm text-slate-300">Exclusive Alumni Discounts</span>
                    </li>
                  </ul>
                  <button className="w-full mt-6 py-3 bg-academic-gold text-oxford-blue font-bold rounded-xl hover:bg-amber-400 transition-all">
                    Get Alumni Card
                  </button>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-blue-900 text-sm mb-1">Global Chapters</h4>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        Join one of our 45 international alumni chapters and stay connected wherever you are.
                      </p>
                      <button className="mt-2 text-xs font-bold text-blue-600 hover:underline">Find a Chapter</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'giving' && (
            <motion.div 
              key="giving"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Giving Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-emerald-500" />
                      Annual Giving Growth ($M)
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                      <TrendingUp className="w-4 h-4" />
                      +21% vs 2024
                    </div>
                  </div>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={DONATION_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <RechartsTooltip 
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={4} dot={{r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff'}} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-emerald-600 rounded-3xl p-8 text-white shadow-xl">
                    <HandCoins className="w-12 h-12 text-emerald-200 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Make an Impact</h3>
                    <p className="text-emerald-100 text-sm mb-8">Support the next generation of Sumerians by contributing to our scholarship fund.</p>
                    <button className="w-full py-4 bg-white text-emerald-600 font-bold rounded-2xl hover:bg-emerald-50 transition-all shadow-lg">
                      Give Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Top Donors & Endowments */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-500" />
                    Top Institutional Donors
                  </h3>
                  <div className="space-y-4">
                    {TOP_DONORS.map((donor, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{donor.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{donor.category}</p>
                        </div>
                        <p className="text-lg font-black text-emerald-600">{donor.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    Endowment Distribution
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-500">Scholarships</span>
                        <span className="font-bold text-slate-900">45%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-500">Research Chairs</span>
                        <span className="font-bold text-slate-900">35%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: '35%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-500">Capital Projects</span>
                        <span className="font-bold text-slate-900">20%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-academic-gold" style={{ width: '20%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'directory' && (
            <motion.div 
              key="directory"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-slate-900">Alumni Directory</h2>
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search by name, class, or company..." 
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm">
                <UsersRound className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Connect with 50,000+ Alumni</h3>
                <p className="text-slate-500 max-w-md mx-auto mb-8">
                  Our global directory allows you to find former classmates and industry leaders within the Sumer community.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all">
                    Search Directory
                  </button>
                  <button className="px-6 py-2.5 bg-slate-100 text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-all">
                    Update My Profile
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                  <h4 className="font-bold text-blue-900 mb-2">Legacy Students</h4>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Are you a child of an alumnus? You may be eligible for legacy scholarships and priority admissions.
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
                  <h4 className="font-bold text-emerald-900 mb-2">Class Notes</h4>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Share your latest career updates, life milestones, and achievements with the Sumer community.
                  </p>
                </div>
                <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
                  <h4 className="font-bold text-purple-900 mb-2">Job Referrals</h4>
                  <p className="text-xs text-purple-700 leading-relaxed">
                    Alumni at top firms often post exclusive referral opportunities for current Sumer students.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}
