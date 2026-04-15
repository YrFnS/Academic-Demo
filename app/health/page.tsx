'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/components/providers';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HeartPulse, 
  Stethoscope, 
  Brain, 
  Accessibility, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  ChevronRight, 
  Info, 
  Activity,
  ShieldAlert,
  FileText,
  Search,
  Phone
} from 'lucide-react';

const CLINIC_APPOINTMENTS = [
  { id: 1, type: 'General Checkup', doctor: 'Dr. Ahmed Hassan', date: 'Oct 18, 2025', time: '09:00 AM', status: 'confirmed' },
  { id: 2, type: 'Dental Cleaning', doctor: 'Dr. Layla Ali', date: 'Oct 22, 2025', time: '11:30 AM', status: 'pending' },
];

const ACCESSIBILITY_REQUESTS = [
  { id: 'ACC-101', title: 'Extended Time for Exams', status: 'approved', date: 'Sep 15, 2025' },
  { id: 'ACC-105', title: 'Ergonomic Chair Request', status: 'under-review', date: 'Oct 10, 2025' },
];

const WELLNESS_RESOURCES = [
  { id: 1, title: 'Stress Management Workshop', type: 'Event', date: 'Oct 25, 2025' },
  { id: 2, title: 'Mindfulness Meditation Guide', type: 'Resource', format: 'PDF' },
];

export default function HealthPage() {
  const { role, t } = useAppContext();
  const [activeTab, setActiveTab] = useState<'clinic' | 'wellness' | 'accessibility'>('clinic');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Health, Wellness & Accessibility</h1>
            <p className="text-slate-500">
              {role === 'student' ? 'Manage your health appointments, wellness resources, and accessibility needs.' : 
               role === 'lecturer' ? 'Access occupational health services, wellness programs, and student support resources.' :
               'Monitor campus health trends, manage accessibility compliance, and oversee wellness initiatives.'}
            </p>
          </div>
          
          <div className="flex p-1 bg-slate-100 rounded-2xl w-fit overflow-x-auto">
            <button 
              onClick={() => setActiveTab('clinic')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'clinic' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              University Clinic
            </button>
            <button 
              onClick={() => setActiveTab('wellness')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'wellness' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Wellness & Counseling
            </button>
            <button 
              onClick={() => setActiveTab('accessibility')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'accessibility' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Accessibility Services
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'clinic' && (
            <motion.div 
              key="clinic"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                    My Appointments
                  </h2>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Book Appointment
                  </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                  <div className="divide-y divide-slate-100">
                    {CLINIC_APPOINTMENTS.map(apt => (
                      <div key={apt.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                            apt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                          }`}>
                            <Calendar className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">{apt.type}</h4>
                            <p className="text-xs text-slate-500">{apt.doctor} • {apt.date} at {apt.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            apt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {apt.status}
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
                <div className="bg-rose-600 rounded-3xl p-6 text-white shadow-xl">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-white" />
                    Emergency Contact
                  </h3>
                  <p className="text-rose-100 text-sm mb-6">In case of a medical emergency on campus, call the 24/7 response team.</p>
                  <div className="p-4 bg-white/10 border border-white/20 rounded-2xl mb-4">
                    <p className="text-[10px] font-bold text-rose-200 uppercase tracking-widest mb-1">Campus Emergency</p>
                    <p className="text-2xl font-black text-white flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      999-MED
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-blue-900 text-sm mb-1">Clinic Hours</h4>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        Mon - Fri: 8:00 AM - 6:00 PM<br />
                        Sat: 9:00 AM - 1:00 PM<br />
                        Sun: Closed (Emergency Only)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'wellness' && (
            <motion.div 
              key="wellness"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Mental Health Support</h3>
                  <p className="text-sm text-slate-500 mb-6">Confidential counseling services for students and staff. Book a session with our specialists.</p>
                  <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all">
                    Book Counseling
                  </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Fitness & Nutrition</h3>
                  <p className="text-sm text-slate-500 mb-6">Access gym schedules, nutrition plans, and personal training sessions on campus.</p>
                  <button className="w-full py-3 bg-slate-100 text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-all">
                    View Programs
                  </button>
                </div>

                <div className="bg-oxford-blue rounded-3xl p-6 text-white shadow-xl">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-academic-gold" />
                    Wellness Events
                  </h3>
                  <div className="space-y-4">
                    {WELLNESS_RESOURCES.filter(r => r.type === 'Event').map(event => (
                      <div key={event.id} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{event.date}</p>
                        <p className="font-bold text-sm">{event.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900">Resource Library</h3>
                    <p className="text-blue-700 text-sm">Download guides on mindfulness, sleep hygiene, and stress management.</p>
                  </div>
                </div>
                <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shrink-0">
                  Browse Library
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'accessibility' && (
            <motion.div 
              key="accessibility"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Accessibility className="w-5 h-5 text-blue-600" />
                    My Requests
                  </h2>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Request
                  </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                  <div className="divide-y divide-slate-100">
                    {ACCESSIBILITY_REQUESTS.map(req => (
                      <div key={req.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                            req.status === 'approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                          }`}>
                            <FileText className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">{req.title}</h4>
                            <p className="text-xs text-slate-500">Submitted on {req.date}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          req.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {req.status.replace('-', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-academic-gold" />
                    Accessibility Policy
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    Sumer University is committed to providing an inclusive environment. If you require any accommodations, please submit a request with supporting documentation.
                  </p>
                  <button className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all">
                    View Policy
                  </button>
                </div>
                
                <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-amber-900 text-sm mb-1">Documentation Required</h4>
                      <p className="text-xs text-amber-700 leading-relaxed">
                        Accessibility requests typically require up-to-date medical documentation. Please ensure your files are ready before submitting.
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
