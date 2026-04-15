'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/components/providers';
import { motion } from 'motion/react';
import { FileQuestion, CheckCircle2, AlertCircle, Clock, ArrowRight, BookOpen } from 'lucide-react';

const QUIZZES = [
  { id: 1, title: 'Midterm Exam: Advanced Algorithms', course: 'CS401', duration: '120 mins', questions: 50, status: 'upcoming', date: 'Oct 20, 2025' },
  { id: 2, title: 'Quiz 3: Data Structures', course: 'CS302', duration: '30 mins', questions: 15, status: 'active', date: 'Today' },
  { id: 3, title: 'Final Exam: Operating Systems', course: 'CS405', duration: '180 mins', questions: 100, status: 'completed', date: 'Sep 15, 2025', score: '92/100' },
];

const DEMO_QUESTIONS = [
  {
    id: 1,
    text: 'What is the time complexity of searching in a balanced binary search tree?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
    correct: 2
  },
  {
    id: 2,
    text: 'Which data structure uses LIFO (Last In First Out)?',
    options: ['Queue', 'Stack', 'Linked List', 'Tree'],
    correct: 1
  },
  {
    id: 3,
    text: 'What is the worst-case time complexity of QuickSort?',
    options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
    correct: 2
  }
];

export default function QuizzesPage() {
  const { role, t } = useAppContext();
  const [activeQuiz, setActiveQuiz] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (role !== 'student') {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-slate-50">Quiz Management</h1>
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm text-center">
            <FileQuestion className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-50 mb-2">Lecturer View</h2>
            <p className="text-slate-400 mb-6">Here you would create and manage quizzes, midterms, and final exams.</p>
            <button className="px-6 py-3 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 transition-colors">
              Create New Quiz
            </button>
          </div>
        </div>
    );
  }

  const handleStartQuiz = (id: number) => {
    setActiveQuiz(id);
    setCurrentQuestion(0);
    setAnswers({});
    setIsSubmitted(false);
  };

  const handleAnswer = (optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: optionIndex }));
  };

  const handleNext = () => {
    if (currentQuestion < DEMO_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  if (activeQuiz) {
    const question = DEMO_QUESTIONS[currentQuestion];
    
    if (isSubmitted) {
      const score = Object.entries(answers).reduce((acc, [qIdx, ansIdx]) => {
        return acc + (DEMO_QUESTIONS[Number(qIdx)].correct === ansIdx ? 1 : 0);
      }, 0);

      return (
        <div className="max-w-3xl mx-auto py-12">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-900/50 border border-slate-800 rounded-3xl p-12 backdrop-blur-sm text-center">
              <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              </div>
              <h2 className="text-3xl font-bold text-slate-50 mb-2">Quiz Submitted!</h2>
              <p className="text-slate-400 mb-8">Your answers have been recorded successfully.</p>
              
              <div className="bg-slate-950 rounded-2xl p-6 mb-8 inline-block min-w-[200px]">
                <div className="text-sm text-slate-500 mb-1">Your Score</div>
                <div className="text-4xl font-black text-amber-500">{score} / {DEMO_QUESTIONS.length}</div>
              </div>

              <div>
                <button onClick={() => setActiveQuiz(null)} className="px-8 py-3 bg-slate-800 text-slate-50 font-bold rounded-xl hover:bg-slate-700 transition-colors">
                  Return to Quizzes
                </button>
              </div>
            </motion.div>
          </div>
      );
    }

    return (
      <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between bg-slate-900/50 border border-slate-800 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-500">
                <FileQuestion className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-slate-50">Quiz 3: Data Structures</h2>
                <p className="text-sm text-slate-400">Question {currentQuestion + 1} of {DEMO_QUESTIONS.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-amber-500 font-mono bg-amber-500/10 px-4 py-2 rounded-lg">
              <Clock className="w-4 h-4" />
              29:45
            </div>
          </div>

          <motion.div 
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm"
          >
            <h3 className="text-xl font-medium text-slate-50 mb-8 leading-relaxed">
              {question.text}
            </h3>

            <div className="space-y-3">
              {question.options.map((option, idx) => {
                const isSelected = answers[currentQuestion] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isSelected 
                        ? 'bg-amber-500/10 border-amber-500 text-amber-500' 
                        : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-amber-500' : 'border-slate-600'
                      }`}>
                        {isSelected && <div className="w-3 h-3 bg-amber-500 rounded-full" />}
                      </div>
                      {option}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleNext}
                disabled={answers[currentQuestion] === undefined}
                className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {currentQuestion === DEMO_QUESTIONS.length - 1 ? 'Submit Quiz' : 'Next Question'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-50 mb-2">Quizzes & Exams</h1>
          <p className="text-slate-400">Manage your upcoming midterms, finals, and course quizzes.</p>
        </div>

        <div className="grid gap-4">
          {QUIZZES.map((quiz) => (
            <motion.div 
              key={quiz.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  quiz.status === 'active' ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]' :
                  quiz.status === 'completed' ? 'bg-emerald-500/20 text-emerald-500' :
                  'bg-slate-800 text-slate-400'
                }`}>
                  {quiz.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : <FileQuestion className="w-6 h-6" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">{quiz.course}</span>
                    {quiz.status === 'active' && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-500 animate-pulse">LIVE NOW</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-50">{quiz.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {quiz.duration}</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {quiz.questions} Questions</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 border-t border-slate-800 md:border-t-0 pt-4 md:pt-0">
                <div className="text-left md:text-right">
                  <div className="text-sm text-slate-500 mb-0.5">{quiz.status === 'completed' ? 'Score' : 'Date'}</div>
                  <div className={`font-bold ${quiz.status === 'completed' ? 'text-emerald-500 text-xl' : 'text-slate-300'}`}>
                    {quiz.score || quiz.date}
                  </div>
                </div>
                
                {quiz.status === 'active' && (
                  <button 
                    onClick={() => handleStartQuiz(quiz.id)}
                    className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 transition-colors"
                  >
                    Start Quiz
                  </button>
                )}
                {quiz.status === 'upcoming' && (
                  <button disabled className="px-6 py-2.5 bg-slate-800 text-slate-500 font-bold rounded-xl cursor-not-allowed">
                    Not Started
                  </button>
                )}
                {quiz.status === 'completed' && (
                  <button className="px-6 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl hover:bg-slate-700 transition-colors">
                    Review
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
  );
}
