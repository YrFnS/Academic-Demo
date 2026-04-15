'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/components/providers';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PackageSearch, 
  ShoppingCart, 
  Truck, 
  Boxes, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  ChevronRight, 
  Search, 
  BarChart3,
  Building2,
  DollarSign,
  History,
  ShieldCheck,
  Tag,
  TrendingUp,
  Info
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const PROCUREMENT_DATA = [
  { category: 'IT Hardware', spent: 120000, budget: 150000 },
  { category: 'Lab Supplies', spent: 85000, budget: 100000 },
  { category: 'Office Furniture', spent: 45000, budget: 50000 },
  { category: 'Maintenance', spent: 30000, budget: 40000 },
  { category: 'Library Books', spent: 25000, budget: 30000 },
];

const RECENT_ORDERS = [
  { id: 'PO-2025-082', item: 'Dell XPS 15 Laptops (x10)', vendor: 'Dell Technologies', status: 'delivered', date: 'Oct 10, 2025', amount: '$18,500' },
  { id: 'PO-2025-085', item: 'Lab Reagents & Chemicals', vendor: 'Sigma-Aldrich', status: 'shipped', date: 'Oct 14, 2025', amount: '$4,200' },
  { id: 'PO-2025-089', item: 'Ergonomic Office Chairs', vendor: 'Steelcase', status: 'pending', date: 'Oct 15, 2025', amount: '$6,800' },
];

const ASSETS = [
  { id: 'AST-001', name: 'Core Server Rack', location: 'Data Center', value: '$45,000', status: 'active' },
  { id: 'AST-042', name: '3D Printer Pro', location: 'Engineering Lab', value: '$3,500', status: 'maintenance' },
];

export default function ProcurementPage() {
  const { role, t } = useAppContext();
  const [activeTab, setActiveTab] = useState<'requests' | 'inventory' | 'vendors'>('requests');

  if (role === 'student') {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-slate-900">Procurement & Asset Management</h1>
          <div className="bg-white/80 border border-slate-200 rounded-3xl p-8 backdrop-blur-xl text-center shadow-xl">
            <PackageSearch className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Restricted Access</h2>
            <p className="text-slate-500 mb-6">This module is only accessible to University Staff and Procurement Officers.</p>
          </div>
        </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Procurement & Asset Management</h1>
            <p className="text-slate-500">
              {role === 'lecturer' ? 'Request equipment for your department and track purchase orders.' : 
               'Manage university-wide procurement, vendor relations, and high-value asset tracking.'}
            </p>
          </div>
          
          <div className="flex p-1 bg-slate-100 rounded-2xl w-fit overflow-x-auto">
            <button 
              onClick={() => setActiveTab('requests')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'requests' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Purchase Requests
            </button>
            <button 
              onClick={() => setActiveTab('inventory')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'inventory' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Asset Inventory
            </button>
            <button 
              onClick={() => setActiveTab('vendors')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'vendors' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Vendors
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'requests' && (
            <motion.div 
              key="requests"
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
                      <ShoppingCart className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active POs</p>
                      <p className="text-2xl font-black text-slate-900">24</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-600">
                    <Clock className="w-4 h-4" />
                    8 Awaiting Approval
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Monthly Spend</p>
                      <p className="text-2xl font-black text-slate-900">$324k</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                    Within Budget (82%)
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">In Transit</p>
                      <p className="text-2xl font-black text-slate-900">12</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <History className="w-4 h-4" />
                    Avg. Lead Time: 5 Days
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Orders Section */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Recent Purchase Orders
                    </h3>
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      New Request
                    </button>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                    <div className="divide-y divide-slate-100">
                      {RECENT_ORDERS.map(order => (
                        <div key={order.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                              order.status === 'delivered' ? 'bg-emerald-100 text-emerald-600' : 
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                            }`}>
                              <Boxes className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.id}</span>
                                <span className="text-slate-300">•</span>
                                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{order.date}</span>
                              </div>
                              <h4 className="font-bold text-slate-900">{order.item}</h4>
                              <p className="text-xs text-slate-500">{order.vendor}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="text-[10px] font-bold text-slate-400 uppercase">Amount</p>
                              <p className="text-lg font-black text-slate-900">{order.amount}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600' : 
                              order.status === 'shipped' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Budget Section */}
                <div className="space-y-6">
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      Budget Utilization
                    </h3>
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={PROCUREMENT_DATA} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                          <XAxis type="number" hide />
                          <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} width={100} tick={{fill: '#64748b', fontSize: 10}} />
                          <RechartsTooltip 
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          />
                          <Bar dataKey="spent" fill="#2563eb" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-oxford-blue rounded-3xl p-6 text-white shadow-xl">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-academic-gold" />
                      Compliance Alert
                    </h3>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-300 leading-relaxed">
                        3 vendors require updated insurance certificates before new POs can be issued.
                      </p>
                    </div>
                    <button className="w-full mt-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/10 transition-all">
                      View Compliance
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'inventory' && (
            <motion.div 
              key="inventory"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-slate-900">Asset Inventory</h2>
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search by asset ID, name, or location..." 
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ASSETS.map(asset => (
                  <div key={asset.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                        <Tag className="w-6 h-6" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        asset.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {asset.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{asset.name}</h3>
                    <p className="text-sm text-slate-500 mb-4">{asset.location}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Asset ID</p>
                        <p className="text-sm font-bold text-slate-900">{asset.id}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase text-right">Value</p>
                        <p className="text-sm font-bold text-slate-900">{asset.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-400 transition-all group">
                  <Plus className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-sm">Add New Asset</span>
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'vendors' && (
            <motion.div 
              key="vendors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Preferred Vendors</h2>
                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                  <div className="divide-y divide-slate-100">
                    <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">DT</div>
                        <div>
                          <h4 className="font-bold text-slate-900">Dell Technologies</h4>
                          <p className="text-xs text-slate-500">IT Hardware & Infrastructure</p>
                        </div>
                      </div>
                      <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">SA</div>
                        <div>
                          <h4 className="font-bold text-slate-900">Sigma-Aldrich</h4>
                          <p className="text-xs text-slate-500">Scientific & Lab Supplies</p>
                        </div>
                      </div>
                      <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    Vendor Performance
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">On-time Delivery</span>
                      <span className="font-bold text-emerald-600">94%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Quality Rating</span>
                      <span className="font-bold text-blue-600">4.8/5.0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Price Competitiveness</span>
                      <span className="font-bold text-amber-600">High</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-blue-900 text-sm mb-1">Onboarding New Vendors</h4>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        New vendors must complete the university&apos;s compliance questionnaire and provide valid tax documentation.
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
