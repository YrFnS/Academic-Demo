'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/components/providers';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  FileText, 
  Calendar, 
  Users, 
  Search, 
  Building2, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Upload, 
  Target,
  GraduationCap,
  ExternalLink
} from 'lucide-react';

const JOBS = [
  { id: 1, title: 'Software Engineering Intern', company: 'Zain Iraq', location: 'Baghdad (Hybrid)', type: 'Internship', posted: '2 days ago', logo: 'https://picsum.photos/seed/zain/100/100' },
  { id: 2, title: 'Junior Data Analyst', company: 'Asiacell', location: 'Sulaymaniyah', type: 'Full-time', posted: '5 days ago', logo: 'https://picsum.photos/seed/asia/100/100' },
  { id: 3, title: 'Network Security Trainee', company: 'Earthlink', location: 'Baghdad', type: 'Internship', posted: '1 week ago', logo: 'https://picsum.photos/seed/earth/100/100' },
];

const EVENTS = [
  { id: 1, title: 'Tech Career Fair 2025', date: 'Oct 28, 2025', time: '10:00 AM', location: 'Main Hall', type: 'Fair' },
  { id: 2, title: 'Resume Writing Workshop', date: 'Oct 30, 2025', time: '2:00 PM', location: 'Room 204', type: 'Workshop' },
];

export default function CareersPage() {
  const { role, t } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');

  if (role !== 'student') {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-slate-900">Career Services</h1>
          <div className="bg-white/80 border border-slate-200 rounded-3xl p-8 backdrop-blur-xl text-center shadow-xl">
            <Briefcase className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Employer & Advisor View</h2>
            <p className="text-slate-500 mb-6">Manage job postings, review student applications, and schedule career advising sessions.</p>
          </div>
        </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Career Services</h1>
            <p className="text-slate-500">Launch your professional journey with exclusive job opportunities and career guidance.</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search jobs, companies, or roles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Job Board */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Featured Opportunities */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Recommended for You
                </h2>
                <button className="text-sm font-medium text-blue-600 hover:underline">View All Jobs</button>
              </div>
              <div className="space-y-4">
                {JOBS.map((job) => (
                  <motion.div 
                    key={job.id}
                    whileHover={{ x: 4 }}
                    className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-100 shrink-0">
                        <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 mt-1">
                          <span className="text-sm font-medium text-slate-600 flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5" /> {job.company}
                          </span>
                          <span className="text-sm text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" /> {job.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-4 md:pt-0">
                      <div className="text-left md:text-right">
                        <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 uppercase tracking-wider mb-1">
                          {job.type}
                        </span>
                        <p className="text-xs text-slate-400 flex items-center md:justify-end gap-1">
                          <Clock className="w-3 h-3" /> {job.posted}
                        </p>
                      </div>
                      <button className="p-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Resume Builder / Profile */}
            <section className="bg-oxford-blue rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-academic-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
                  <FileText className="w-10 h-10 text-academic-gold" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">Your Professional Profile</h3>
                  <p className="text-slate-400 mb-6 max-w-md">Your resume is 85% complete. Add your latest project to stand out to employers.</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <button className="px-6 py-2.5 bg-academic-gold text-oxford-blue font-bold rounded-xl hover:bg-amber-400 transition-all flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Update Resume
                    </button>
                    <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all">
                      View Public Profile
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Events & Advising */}
          <div className="space-y-8">
            
            {/* Career Events */}
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-500" />
                Upcoming Events
              </h3>
              <div className="space-y-4">
                {EVENTS.map((event) => (
                  <div key={event.id} className="group cursor-pointer">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center shrink-0 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors">
                        <span className="text-[10px] font-bold text-slate-400 group-hover:text-emerald-600 uppercase">Oct</span>
                        <span className="text-lg font-black text-slate-900 group-hover:text-emerald-700 leading-none">{event.date.split(' ')[1].replace(',', '')}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">{event.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{event.time} • {event.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full mt-2 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-bold rounded-xl transition-colors">
                  View Career Calendar
                </button>
              </div>
            </section>

            {/* Career Advising */}
            <section className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 mb-1">Career Advising</h4>
                  <p className="text-xs text-blue-700 leading-relaxed">Book a 1-on-1 session with a career counselor to discuss your path.</p>
                </div>
              </div>
              <button className="w-full py-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                Book a Session
              </button>
            </section>

            {/* Quick Links */}
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-purple-500" />
                Resources
              </h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <span className="text-sm font-medium text-slate-700">Interview Prep Guide</span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors" />
                </a>
                <a href="#" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <span className="text-sm font-medium text-slate-700">Salary Negotiation</span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors" />
                </a>
                <a href="#" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <span className="text-sm font-medium text-slate-700">Alumni Network</span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors" />
                </a>
              </div>
            </section>

          </div>
        </div>
      </div>
  );
}
