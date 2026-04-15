'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/components/providers';
import { motion } from 'motion/react';
import { 
  Search, 
  Book, 
  Clock, 
  Calendar, 
  Bookmark, 
  ExternalLink, 
  Info, 
  CheckCircle2, 
  AlertCircle,
  Library,
  ChevronRight,
  Filter
} from 'lucide-react';

const BORROWED_BOOKS = [
  { id: 1, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', dueDate: 'Oct 25, 2025', status: 'active', cover: 'https://picsum.photos/seed/algorithms/200/300' },
  { id: 2, title: 'Operating System Concepts', author: 'Abraham Silberschatz', dueDate: 'Oct 18, 2025', status: 'overdue', cover: 'https://picsum.photos/seed/os/200/300' },
];

const SEARCH_RESULTS = [
  { id: 3, title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell', available: 5, location: 'Floor 3, Shelf B-12' },
  { id: 4, title: 'Computer Networks', author: 'Andrew S. Tanenbaum', available: 0, location: 'Floor 2, Shelf C-04', waitlist: 3 },
  { id: 5, title: 'Database System Concepts', author: 'Silberschatz, Korth, Sudarshan', available: 2, location: 'Floor 3, Shelf A-08' },
];

const STUDY_ROOMS = [
  { id: 'R-101', capacity: 4, features: ['Whiteboard', 'TV'], status: 'available' },
  { id: 'R-102', capacity: 6, features: ['Whiteboard', 'Projector'], status: 'occupied' },
  { id: 'R-205', capacity: 2, features: ['Quiet Zone'], status: 'available' },
];

export default function LibraryPage() {
  const { role, t } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');

  if (role !== 'student') {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-slate-900">Library Management</h1>
          <div className="bg-white/80 border border-slate-200 rounded-3xl p-8 backdrop-blur-xl text-center shadow-xl">
            <Library className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Librarian View</h2>
            <p className="text-slate-500 mb-6">Manage book inventory, process returns, and handle room bookings.</p>
          </div>
        </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Library Management</h1>
            <p className="text-slate-500">Search the digital catalog, manage your loans, and book study spaces.</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search books, journals, or authors..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Borrowed Items & Search Results */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* My Borrowed Items */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-blue-600" />
                  My Borrowed Items
                </h2>
                <button className="text-sm font-medium text-blue-600 hover:underline">View All</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BORROWED_BOOKS.map((book) => (
                  <motion.div 
                    key={book.id}
                    whileHover={{ y: -4 }}
                    className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-4 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="w-20 h-28 bg-slate-100 rounded-lg overflow-hidden shrink-0 shadow-inner">
                      <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-between py-1">
                      <div>
                        <h3 className="font-bold text-slate-900 line-clamp-1">{book.title}</h3>
                        <p className="text-xs text-slate-500">{book.author}</p>
                      </div>
                      <div className="space-y-2">
                        <div className={`text-xs font-bold flex items-center gap-1 ${book.status === 'overdue' ? 'text-rose-500' : 'text-emerald-600'}`}>
                          <Clock className="w-3 h-3" />
                          Due: {book.dueDate}
                        </div>
                        <button className="text-xs font-bold px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                          Renew
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Catalog Search Results (Demo) */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Library className="w-5 h-5 text-purple-600" />
                  Catalog Highlights
                </h2>
                <button className="p-2 bg-slate-100 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="divide-y divide-slate-100">
                  {SEARCH_RESULTS.map((item) => (
                    <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                          <Book className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{item.title}</h4>
                          <p className="text-xs text-slate-500">{item.author} • <span className="text-slate-400">{item.location}</span></p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        {item.available > 0 ? (
                          <div className="flex flex-col items-end gap-2">
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                              {item.available} Available
                            </span>
                            <button className="text-xs font-bold text-blue-600 hover:underline">Reserve</button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-end gap-2">
                            <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded-md">
                              Waitlist: {item.waitlist}
                            </span>
                            <button className="text-xs font-bold text-slate-400 cursor-not-allowed">Notify Me</button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Study Rooms & Digital Resources */}
          <div className="space-y-8">
            
            {/* Study Room Booking */}
            <section className="bg-oxford-blue rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-academic-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-academic-gold" />
                Study Room Booking
              </h3>
              
              <div className="space-y-3">
                {STUDY_ROOMS.map((room) => (
                  <div key={room.id} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">Room {room.id}</div>
                      <div className="text-xs text-slate-400">Capacity: {room.capacity} • {room.features.join(', ')}</div>
                    </div>
                    {room.status === 'available' ? (
                      <button className="px-3 py-1.5 bg-academic-gold text-oxford-blue text-xs font-bold rounded-lg hover:bg-amber-400 transition-colors">
                        Book
                      </button>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Occupied</span>
                    )}
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2">
                View All Rooms
                <ChevronRight className="w-4 h-4" />
              </button>
            </section>

            {/* Digital Resources */}
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-emerald-500" />
                Digital Resources
              </h3>
              <div className="space-y-4">
                <a href="#" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <Book className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">IEEE Xplore Digital Library</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors" />
                </a>
                <a href="#" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                      <Book className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">ACM Digital Library</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors" />
                </a>
                <a href="#" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                      <Book className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">ScienceDirect Journals</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors" />
                </a>
              </div>
            </section>

            {/* Library Info */}
            <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-blue-900 text-sm mb-1">Library Hours</h4>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Mon - Fri: 8:00 AM - 10:00 PM<br />
                    Sat - Sun: 10:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
  );
}
