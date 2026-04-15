'use client';

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/components/providers';
import { motion } from 'motion/react';
import Link from 'next/link';
import { 
  AlertTriangle, 
  ScanLine, 
  CheckCircle2, 
  ArrowLeft,
  Camera
} from 'lucide-react';

export default function ScanPage() {
  const { role, t } = useAppContext();
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success'>('idle');

  if (role !== 'student') {
    return (
      <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
            <h2 className="text-xl font-bold">Access Denied</h2>
            <p className="text-slate-400">Only students can scan attendance QR codes.</p>
          </div>
        </div>
    );
  }

  const handleScan = () => {
    setScanState('scanning');
    // Simulate network delay and processing
    setTimeout(() => {
      setScanState('success');
    }, 2500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-50 transition-colors">
            <ArrowLeft className="w-6 h-6 rtl:rotate-180" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-slate-50">{t('scan.title')}</h1>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-12 backdrop-blur-sm flex flex-col items-center text-center">
          
          {scanState === 'idle' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8 w-full"
            >
              <div className="w-full max-w-sm mx-auto aspect-square bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 flex items-center justify-center relative overflow-hidden">
                <Camera className="w-12 h-12 text-slate-600" />
                
                {/* Corner markers */}
                <div className="absolute top-4 start-4 w-8 h-8 border-t-4 border-s-4 border-amber-500 rounded-tl-lg"></div>
                <div className="absolute top-4 end-4 w-8 h-8 border-t-4 border-e-4 border-amber-500 rounded-tr-lg"></div>
                <div className="absolute bottom-4 start-4 w-8 h-8 border-b-4 border-s-4 border-amber-500 rounded-bl-lg"></div>
                <div className="absolute bottom-4 end-4 w-8 h-8 border-b-4 border-e-4 border-amber-500 rounded-br-lg"></div>
              </div>
              
              <p className="text-slate-400 max-w-sm mx-auto">{t('scan.instruction')}</p>
              
              <button 
                onClick={handleScan}
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
              >
                <ScanLine className="w-5 h-5" />
                Simulate Scan
              </button>
            </motion.div>
          )}

          {scanState === 'scanning' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8 w-full py-12"
            >
              <div className="w-full max-w-sm mx-auto aspect-square bg-slate-950 rounded-2xl border-2 border-amber-500/50 flex items-center justify-center relative overflow-hidden">
                {/* Simulated QR Code */}
                <QrCodePattern />
                
                {/* Scanning Laser */}
                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,1)]"
                />
              </div>
              <p className="text-amber-500 font-medium animate-pulse">{t('scan.simulating')}</p>
            </motion.div>
          )}

          {scanState === 'success' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 w-full py-12"
            >
              <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                </motion.div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-slate-50 mb-2">{t('scan.success')}</h2>
                <p className="text-slate-400">{t('scan.success_desc')}</p>
              </div>

              <div className="pt-8">
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-50 font-medium rounded-xl transition-all"
                >
                  {t('scan.back')}
                </Link>
              </div>
            </motion.div>
          )}

        </div>
      </div>
  );
}

// A simple SVG pattern to look like a QR code for the scanning animation
function QrCodePattern() {
  return (
    <div className="opacity-20">
      <svg width="200" height="200" viewBox="0 0 200 200" fill="currentColor" className="text-slate-400">
        <rect x="20" y="20" width="40" height="40" />
        <rect x="30" y="30" width="20" height="20" fill="#0f172a" />
        <rect x="140" y="20" width="40" height="40" />
        <rect x="150" y="30" width="20" height="20" fill="#0f172a" />
        <rect x="20" y="140" width="40" height="40" />
        <rect x="30" y="150" width="20" height="20" fill="#0f172a" />
        <rect x="80" y="20" width="20" height="20" />
        <rect x="110" y="40" width="20" height="20" />
        <rect x="80" y="80" width="40" height="40" />
        <rect x="20" y="80" width="20" height="40" />
        <rect x="140" y="80" width="40" height="20" />
        <rect x="160" y="110" width="20" height="40" />
        <rect x="80" y="140" width="20" height="40" />
        <rect x="110" y="160" width="40" height="20" />
      </svg>
    </div>
  );
}
