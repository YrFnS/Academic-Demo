'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/components/providers';
import { motion } from 'motion/react';
import { 
  CreditCard, 
  Receipt, 
  Download, 
  Building, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Wallet, 
  ShieldCheck,
  Clock
} from 'lucide-react';

const TRANSACTIONS = [
  { id: 'TRX-9921', date: 'Oct 1, 2025', description: 'Fall Semester Tuition Installment 1', amount: 2000, status: 'paid', type: 'tuition' },
  { id: 'TRX-9844', date: 'Sep 15, 2025', description: 'Dormitory Fee (Al-Jadriya Housing)', amount: 1200, status: 'paid', type: 'housing' },
  { id: 'TRX-9710', date: 'Sep 10, 2025', description: 'Engineering Lab Materials', amount: 250, status: 'paid', type: 'fee' },
];

export default function FinancialsPage() {
  const { role, t } = useAppContext();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentState, setPaymentState] = useState<'idle' | 'processing' | 'success'>('idle');

  if (role !== 'student') {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-slate-900">Financials & Bursar</h1>
          <div className="bg-white/80 border border-slate-200 rounded-3xl p-8 backdrop-blur-xl text-center shadow-xl">
            <Wallet className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Staff View</h2>
            <p className="text-slate-500 mb-6">Here you would manage student accounts, process refunds, and view financial reports.</p>
          </div>
        </div>
    );
  }

  const handlePayment = () => {
    setPaymentState('processing');
    setTimeout(() => {
      setPaymentState('success');
    }, 2000);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setTimeout(() => setPaymentState('idle'), 300);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Financials & Bursar</h1>
          <p className="text-slate-500">Manage your tuition, housing fees, and view your transaction history.</p>
        </div>

        {/* Top Section: Balance Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-oxford-blue rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-academic-gold/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <p className="text-slate-300 font-medium mb-2 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-academic-gold" />
                Current Outstanding Balance
              </p>
              <div className="text-5xl md:text-6xl font-black tracking-tight mb-2">
                $3,450<span className="text-3xl text-slate-400">.00</span>
              </div>
              <p className="text-sm text-slate-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                Due by November 15, 2025
              </p>
            </div>
            
            <div className="shrink-0">
              <button 
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full md:w-auto px-8 py-4 bg-academic-gold hover:bg-amber-400 text-oxford-blue font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 text-lg"
              >
                <CreditCard className="w-6 h-6" />
                Make a Payment
              </button>
            </div>
          </div>
        </motion.div>

        {/* Middle Section: Breakdown & Aid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fee Breakdown */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 shadow-xl"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-blue-600" />
              Fall 2025 Charges
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Tuition (15 Credits)</div>
                    <div className="text-xs text-slate-500">Engineering Program</div>
                  </div>
                </div>
                <div className="font-bold text-slate-900">$4,000.00</div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Housing</div>
                    <div className="text-xs text-slate-500">Al-Jadriya Dorms</div>
                  </div>
                </div>
                <div className="font-bold text-slate-900">$1,200.00</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Lab Fees</div>
                    <div className="text-xs text-slate-500">Materials & Equipment</div>
                  </div>
                </div>
                <div className="font-bold text-slate-900">$250.00</div>
              </div>
            </div>
          </motion.div>

          {/* Financial Aid */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 shadow-xl flex flex-col"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              Financial Aid & Scholarships
            </h3>
            
            <div className="flex-1 flex flex-col justify-center">
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-emerald-900 mb-1">Merit Scholarship Applied</h4>
                <p className="text-emerald-700 text-sm mb-4">Congratulations! Your academic excellence has earned you a discount for this semester.</p>
                <div className="text-3xl font-black text-emerald-600">-$2,000.00</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Transaction History */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Recent Transactions</h3>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <Download className="w-4 h-4" />
              Download Statement
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 text-sm">
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Description</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TRANSACTIONS.map((trx) => (
                  <tr key={trx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 text-sm text-slate-600 whitespace-nowrap">{trx.date}</td>
                    <td className="p-4">
                      <div className="font-medium text-slate-900">{trx.description}</div>
                      <div className="text-xs text-slate-500">{trx.id}</div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                        <CheckCircle2 className="w-3 h-3" />
                        Paid
                      </span>
                    </td>
                    <td className="p-4 text-right font-bold text-slate-900 whitespace-nowrap">
                      ${trx.amount.toLocaleString()}.00
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-oxford-blue/60 backdrop-blur-sm" onClick={paymentState === 'idle' ? closePaymentModal : undefined}></div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {paymentState === 'idle' && (
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Secure Payment</h3>
                <p className="text-slate-500 mb-8">Complete your payment for the Fall 2025 semester.</p>

                <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                  <div className="text-sm text-slate-500 mb-1">Amount to Pay</div>
                  <div className="text-4xl font-black text-slate-900">$3,450.00</div>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="text" value="•••• •••• •••• 4242" readOnly className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Expiry</label>
                      <input type="text" value="12/26" readOnly className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">CVC</label>
                      <input type="password" value="•••" readOnly className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={closePaymentModal} className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handlePayment} className="flex-1 px-4 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                    Pay $3,450
                  </button>
                </div>
              </div>
            )}

            {paymentState === 'processing' && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Processing Payment</h3>
                <p className="text-slate-500">Please do not close this window...</p>
              </div>
            )}

            {paymentState === 'success' && (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h3>
                <p className="text-slate-500 mb-8">Your balance has been updated. A receipt has been sent to your email.</p>
                <button onClick={closePaymentModal} className="w-full px-4 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}
