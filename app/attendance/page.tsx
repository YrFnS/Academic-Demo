'use client';

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/components/providers';
import { motion } from 'motion/react';
import { QrCode, History, Users } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

export default function AttendancePage() {
  const { t } = useAppContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrValue, setQrValue] = useState('');
  const [scannedCount, setScannedCount] = useState(0);

  const handleGenerate = () => {
    setIsGenerating(true);
    setQrValue(`attendance-${Date.now()}`);
    setScannedCount(0);
  };

  // Simulate students scanning the QR code over time
  useEffect(() => {
    if (!isGenerating) return;
    
    const interval = setInterval(() => {
      setScannedCount(prev => {
        if (prev >= 45) {
          clearInterval(interval);
          return prev;
        }
        // Randomly add 1 or 2 students every few seconds
        return prev + (Math.random() > 0.5 ? 1 : 2);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isGenerating]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-slate-50">{t('attendance.title')}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="lg:col-span-1 bg-amber-500 rounded-3xl p-8 text-slate-950 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(245,158,11,0.2)]">
            {!isGenerating ? (
              <>
                <QrCode className="w-24 h-24 mb-6" />
                <h3 className="text-2xl font-bold mb-2">Generate QR</h3>
                <p className="text-amber-900 mb-8">Create a dynamic QR code for today&apos;s lecture attendance.</p>
                <button onClick={handleGenerate} className="w-full py-3 bg-slate-950 text-amber-500 font-bold rounded-xl hover:bg-slate-900 transition-colors">Generate Now</button>
              </>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-2xl mb-6 shadow-xl">
                  <QRCodeCanvas value={qrValue} size={200} level="H" includeMargin={false} />
                </div>
                <h3 className="text-xl font-bold mb-2">Scan to Attend</h3>
                <p className="text-amber-900 mb-6 font-medium">Ask students to scan this code from their app.</p>
                
                <div className="flex items-center gap-3 bg-slate-950/10 px-6 py-3 rounded-2xl mb-6">
                  <Users className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-sm font-bold">Present</div>
                    <div className="text-2xl font-black">{Math.min(scannedCount, 45)} / 45</div>
                  </div>
                </div>

                <button onClick={() => setIsGenerating(false)} className="w-full py-3 bg-slate-950 text-amber-500 font-bold rounded-xl hover:bg-slate-900 transition-colors">End Session</button>
              </motion.div>
            )}
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-3xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2"><History className="w-5 h-5 text-amber-500" /> Recent Sessions</h3>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex justify-between items-center p-4 bg-slate-950/50 rounded-xl border border-slate-800/50">
                  <div>
                    <p className="font-medium text-slate-200">Advanced Algorithms</p>
                    <p className="text-sm text-slate-500">Oct {14 - i}, 2025 • Hall 4</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-amber-500">42/45</p>
                    <p className="text-xs text-slate-500">Present</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
  );
}
