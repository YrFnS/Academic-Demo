'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/components/providers';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ClipboardCheck, 
  BookPlus, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ArrowRight, 
  Search, 
  Info, 
  Plus, 
  Trash2,
  GraduationCap,
  Calendar,
  Users,
  ChevronRight
} from 'lucide-react';

const AVAILABLE_COURSES = [
  { id: 'CS402', title: 'Machine Learning', credits: 3, instructor: 'Dr. Sarah Ahmed', schedule: 'Sun/Tue 10:00 AM', capacity: 40, enrolled: 35, prerequisites: ['CS301'] },
  { id: 'CS405', title: 'Network Security', credits: 3, instructor: 'Prof. Khalid Ali', schedule: 'Mon/Wed 11:30 AM', capacity: 30, enrolled: 28, prerequisites: ['CS302'] },
  { id: 'CS410', title: 'Cloud Computing', credits: 4, instructor: 'Dr. Omar Farooq', schedule: 'Thu 09:00 AM', capacity: 50, enrolled: 12, prerequisites: ['CS305'] },
  { id: 'CS420', title: 'Mobile App Development', credits: 3, instructor: 'Dr. Layla Hassan', schedule: 'Sun/Tue 01:00 PM', capacity: 25, enrolled: 25, waitlist: 4, prerequisites: ['CS201'] },
];

const ADMISSION_DOCUMENTS = [
  { id: 1, name: 'High School Transcript', status: 'verified', date: 'Aug 15, 2025' },
  { id: 2, name: 'National ID / Passport', status: 'verified', date: 'Aug 15, 2025' },
  { id: 3, name: 'Medical Fitness Certificate', status: 'pending', date: 'Oct 10, 2025' },
];

export default function AdmissionsPage() {
  const { role, t } = useAppContext();
  const [activeTab, setActiveTab] = useState<'registration' | 'documents'>('registration');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  if (role !== 'student') {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-slate-900">Admissions & Registration</h1>
          <div className="bg-white/80 border border-slate-200 rounded-3xl p-8 backdrop-blur-xl text-center shadow-xl">
            <ClipboardCheck className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Registrar View</h2>
            <p className="text-slate-500 mb-6">Manage enrollment periods, approve course overrides, and verify student documentation.</p>
          </div>
        </div>
    );
  }

  const toggleCourse = (id: string) => {
    setSelectedCourses(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const totalCredits = AVAILABLE_COURSES
    .filter(c => selectedCourses.includes(c.id))
    .reduce((acc, c) => acc + c.credits, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Admissions & Registration</h1>
            <p className="text-slate-500">Manage your course enrollment for the upcoming semester and track your documents.</p>
          </div>
          
          <div className="flex p-1 bg-slate-100 rounded-2xl w-fit">
            <button 
              onClick={() => setActiveTab('registration')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'registration' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Course Registration
            </button>
            <button 
              onClick={() => setActiveTab('documents')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'documents' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              My Documents
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'registration' ? (
            <motion.div 
              key="registration"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Course Selection */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <BookPlus className="w-5 h-5 text-blue-600" />
                    Available Courses (Spring 2026)
                  </h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search courses..." 
                      className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid gap-4">
                  {AVAILABLE_COURSES.map((course) => {
                    const isSelected = selectedCourses.includes(course.id);
                    const isFull = course.enrolled >= course.capacity;
                    
                    return (
                      <motion.div 
                        key={course.id}
                        whileHover={{ scale: 1.01 }}
                        className={`bg-white border rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                          isSelected ? 'border-blue-500 ring-1 ring-blue-500 shadow-lg shadow-blue-500/5' : 'border-slate-200 shadow-sm'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                          }`}>
                            <GraduationCap className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">{course.id}</span>
                              <span className="text-xs font-medium text-slate-400">{course.credits} Credits</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">{course.title}</h3>
                            <p className="text-sm text-slate-500 mt-1 flex items-center gap-4">
                              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {course.instructor}</span>
                              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {course.schedule}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0">
                          <div className="text-left md:text-right">
                            <div className="text-xs text-slate-400 mb-1">Capacity</div>
                            <div className={`text-sm font-bold ${isFull ? 'text-rose-500' : 'text-slate-900'}`}>
                              {course.enrolled} / {course.capacity}
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => toggleCourse(course.id)}
                            disabled={isFull && !isSelected}
                            className={`px-6 py-2.5 rounded-xl font-bold transition-all ${
                              isSelected 
                                ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' 
                                : isFull 
                                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20'
                            }`}
                          >
                            {isSelected ? 'Remove' : isFull ? 'Full (Waitlist)' : 'Add Course'}
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Summary Sidebar */}
              <div className="space-y-6">
                <div className="bg-oxford-blue rounded-3xl p-6 text-white shadow-xl sticky top-24">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5 text-academic-gold" />
                    Registration Summary
                  </h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Selected Courses</span>
                      <span className="font-bold">{selectedCourses.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Total Credits</span>
                      <span className="font-bold">{totalCredits} / 18</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-academic-gold transition-all duration-500" 
                        style={{ width: `${(totalCredits / 18) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {selectedCourses.length === 0 ? (
                      <p className="text-xs text-slate-500 italic text-center py-4">No courses selected yet.</p>
                    ) : (
                      selectedCourses.map(id => {
                        const course = AVAILABLE_COURSES.find(c => c.id === id);
                        return (
                          <div key={id} className="flex items-center justify-between text-sm bg-white/5 p-3 rounded-xl border border-white/5">
                            <span className="font-medium">{course?.title}</span>
                            <span className="text-slate-400">{course?.credits} CR</span>
                          </div>
                        );
                      })
                    )}
                  </div>

                  <button 
                    disabled={selectedCourses.length === 0}
                    className="w-full py-4 bg-academic-gold text-oxford-blue font-bold rounded-2xl hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-academic-gold/20 flex items-center justify-center gap-2"
                  >
                    Complete Registration
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  
                  <p className="text-[10px] text-slate-500 text-center mt-4 uppercase tracking-widest">
                    Spring 2026 Enrollment Period
                  </p>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-blue-900 text-sm mb-1">Important Note</h4>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        Registration closes on Jan 15. Make sure you have cleared all financial holds before submitting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="documents"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    Required Documentation
                  </h2>
                </div>
                <div className="divide-y divide-slate-100">
                  {ADMISSION_DOCUMENTS.map((doc) => (
                    <div key={doc.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          doc.status === 'verified' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                          {doc.status === 'verified' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{doc.name}</h4>
                          <p className="text-xs text-slate-500">Uploaded on {doc.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          doc.status === 'verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {doc.status}
                        </span>
                        <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div>
                  <h3 className="text-xl font-bold mb-2">Missing something?</h3>
                  <p className="text-slate-400 text-sm">You can upload additional supporting documents for your scholarship application.</p>
                </div>
                <button className="px-8 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors shrink-0">
                  Upload Document
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}
