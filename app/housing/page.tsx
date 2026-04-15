'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/components/providers';
import { motion } from 'motion/react';
import { 
  Home, 
  Utensils, 
  Wrench, 
  Users, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  Plus,
  Coffee,
  Info
} from 'lucide-react';

const DORM_INFO = {
  building: 'Al-Jadriya Campus - Block B',
  room: '304',
  type: 'Double Suite',
  roommate: 'Ahmed Hassan',
  status: 'Occupied',
  checkIn: 'Sep 1, 2025'
};

const MEAL_PLANS = [
  { id: 1, name: 'Standard Plan', balance: 145, total: 200, resetDate: 'Nov 1, 2025', active: true },
  { id: 2, name: 'Coffee & Snacks Add-on', balance: 12, total: 50, resetDate: 'Nov 1, 2025', active: false },
];

const MAINTENANCE_REQUESTS = [
  { id: 'REQ-4421', issue: 'Leaking Faucet', location: 'Bathroom', status: 'completed', date: 'Oct 10, 2025' },
  { id: 'REQ-4510', issue: 'AC Filter Cleaning', location: 'Bedroom', status: 'pending', date: 'Oct 14, 2025' },
];

export default function HousingPage() {
  const { role, t } = useAppContext();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  if (role !== 'student') {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-slate-900">Housing & Campus Life</h1>
          <div className="bg-white/80 border border-slate-200 rounded-3xl p-8 backdrop-blur-xl text-center shadow-xl">
            <Home className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Housing Admin View</h2>
            <p className="text-slate-500 mb-6">Manage room assignments, process maintenance tickets, and oversee cafeteria operations.</p>
          </div>
        </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Housing & Campus Life</h1>
          <p className="text-slate-500">Manage your dormitory stay, meal plans, and maintenance requests.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Dorm & Meal Plan */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* My Dorm Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-oxford-blue rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-academic-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-academic-gold flex items-center justify-center text-oxford-blue">
                      <Home className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">My Dormitory</h2>
                      <p className="text-slate-400 text-sm">Room {DORM_INFO.room} • {DORM_INFO.type}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30">
                    {DORM_INFO.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Building</p>
                    <p className="font-medium text-sm">{DORM_INFO.building}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Roommate</p>
                    <p className="font-medium text-sm">{DORM_INFO.roommate}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Check-in</p>
                    <p className="font-medium text-sm">{DORM_INFO.checkIn}</p>
                  </div>
                  <div className="flex items-end">
                    <button className="text-xs font-bold text-academic-gold hover:underline flex items-center gap-1">
                      View Rules <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Meal Plans */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-emerald-500" />
                Meal Plans & Dining
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MEAL_PLANS.map((plan) => (
                  <div key={plan.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-slate-900">{plan.name}</h3>
                      {plan.active && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">ACTIVE</span>}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-500">Remaining Swipes</span>
                          <span className="font-bold text-slate-900">{plan.balance} / {plan.total}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 transition-all duration-1000" 
                            style={{ width: `${(plan.balance / plan.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Resets {plan.resetDate}
                        </p>
                        <button className="text-xs font-bold text-blue-600 hover:underline">Add Funds</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Maintenance Requests */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-amber-500" />
                  Maintenance Requests
                </h2>
                <button 
                  onClick={() => setIsRequestModalOpen(true)}
                  className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  New Request
                </button>
              </div>
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="divide-y divide-slate-100">
                  {MAINTENANCE_REQUESTS.map((req) => (
                    <div key={req.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          req.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                          {req.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{req.issue}</h4>
                          <p className="text-xs text-slate-500">{req.location} • {req.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                          req.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Campus Life & Info */}
          <div className="space-y-8">
            
            {/* Campus Security */}
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                Campus Security
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl">
                  <p className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-1">Emergency Hotline</p>
                  <p className="text-2xl font-black text-rose-600">999-CAMPUS</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    24/7 Patrol Active
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    Blue Light Stations Operational
                  </div>
                </div>
                <button className="w-full py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors">
                  Report Incident
                </button>
              </div>
            </section>

            {/* Cafeteria Menu */}
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Coffee className="w-5 h-5 text-academic-gold" />
                Today&apos;s Menu
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Grilled Chicken Mandi</p>
                    <p className="text-xs text-slate-500">Main Hall • 12:00 PM - 3:00 PM</p>
                  </div>
                  <span className="text-sm font-bold text-slate-900">$4.50</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Vegetarian Pasta</p>
                    <p className="text-xs text-slate-500">Student Center • All Day</p>
                  </div>
                  <span className="text-sm font-bold text-slate-900">$3.75</span>
                </div>
                <button className="w-full py-3 bg-slate-100 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-200 transition-colors">
                  View Full Menu
                </button>
              </div>
            </section>

            {/* Roommate Info */}
            <section className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 mb-1">Roommate Info</h4>
                  <p className="text-sm text-blue-800 font-medium mb-2">{DORM_INFO.roommate}</p>
                  <button className="text-xs font-bold text-blue-600 hover:underline">Message Ahmed</button>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Maintenance Request Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-oxford-blue/60 backdrop-blur-sm" onClick={() => setIsRequestModalOpen(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-2">New Maintenance Request</h3>
            <p className="text-slate-500 mb-6">Tell us what needs fixing in your room.</p>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Issue Category</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Plumbing</option>
                  <option>Electrical</option>
                  <option>Furniture</option>
                  <option>HVAC (Heating/Cooling)</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea 
                  rows={3}
                  placeholder="Describe the problem in detail..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setIsRequestModalOpen(false)} className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                Cancel
              </button>
              <button onClick={() => setIsRequestModalOpen(false)} className="flex-1 px-4 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
                Submit Request
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
