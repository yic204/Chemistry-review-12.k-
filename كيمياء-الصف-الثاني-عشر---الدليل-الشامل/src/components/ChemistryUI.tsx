import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { 
  Info, 
  AlertCircle, 
  CheckCircle2, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight,
  Calculator,
  Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import 'katex/dist/katex.min.css';

// --- GlassCard ---
export const GlassCard = ({ 
  children, 
  className = "", 
  title, 
  page 
}: { 
  children: React.ReactNode, 
  className?: string, 
  title?: string | React.ReactNode, 
  page?: string | number 
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group ${className}`}
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl -mr-16 -mt-16 group-hover:bg-cyan-500/20 transition-colors duration-500" />
    {page && (
      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-cyan-400 z-10">
        PAGE {page}
      </div>
    )}
    {title && (
      <h3 className="text-2xl font-black text-white mb-8 border-r-4 border-cyan-500 pr-4 leading-none">
        {title}
      </h3>
    )}
    <div className="relative z-10">{children}</div>
  </motion.div>
);

// --- SectionHeader ---
export const SectionHeader = ({ 
  title, 
  icon: Icon, 
  subtitle 
}: { 
  title: string, 
  icon: any, 
  subtitle?: string 
}) => (
  <div className="flex flex-col gap-2 mb-12 border-r-8 border-cyan-500 pr-6 py-2 mt-20">
    <div className="flex items-center gap-4">
      <div className="p-4 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
        {Icon && <Icon className="w-10 h-10 text-cyan-400" />}
      </div>
      <h2 className="text-5xl font-black text-white tracking-tighter uppercase">{title}</h2>
    </div>
    {subtitle && <p className="text-cyan-400/60 font-mono text-lg mr-16">{subtitle}</p>}
  </div>
);

// --- Definition ---
export const Definition = ({ 
  title, 
  children 
}: { 
  title: string | React.ReactNode, 
  children: React.ReactNode 
}) => (
  <div className="bg-cyan-500/10 border-r-4 border-cyan-500 p-8 my-8 rounded-l-3xl shadow-xl hover:bg-cyan-500/15 transition-all duration-300">
    <h4 className="text-cyan-300 font-black mb-3 text-2xl tracking-tight flex items-center gap-2">
      <Info className="w-6 h-6" /> {title}
    </h4>
    <div className="text-gray-200 leading-relaxed text-xl font-medium">{children}</div>
  </div>
);

// --- FormulaBox ---
export const FormulaBox = ({ 
  children, 
  label, 
  page 
}: { 
  children: string, 
  label?: string, 
  page?: string | number 
}) => (
  <div className="my-10 group relative">
    {page && (
      <div className="absolute -top-3 -left-3 px-2 py-1 bg-white/10 border border-white/20 rounded text-[10px] text-gray-400 font-mono z-10">
        PAGE {page}
      </div>
    )}
    {label && (
      <div className="flex items-center gap-2 mb-4">
        <div className="h-px w-8 bg-cyan-500/50" />
        <span className="text-sm font-black text-cyan-500 uppercase tracking-[0.4em]">{label}</span>
      </div>
    )}
    <div className="w-full overflow-x-auto custom-scrollbar bg-black/40 rounded-3xl border border-white/10 shadow-2xl p-10 group-hover:border-cyan-500/30 transition-all duration-500" dir="ltr">
      <div className="min-w-max flex items-center justify-center text-4xl font-bold text-white group-hover:scale-105 transition-transform duration-500">
        <BlockMath math={children} />
      </div>
    </div>
  </div>
);

// --- TeacherNote ---
export const TeacherNote = ({ 
  children, 
  page 
}: { 
  children: React.ReactNode, 
  page?: string | number 
}) => (
  <div className="bg-orange-500/10 border border-orange-500/30 p-8 rounded-3xl my-10 flex gap-6 items-start relative overflow-hidden group">
    <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
    {page && (
      <div className="absolute top-0 left-0 p-2 bg-orange-500 text-black font-black text-[10px] rounded-br-xl z-10">
        P.{page}
      </div>
    )}
    <div className="p-3 rounded-2xl bg-orange-500/20">
      <AlertCircle className="w-8 h-8 text-orange-400 shrink-0" />
    </div>
    <div className="space-y-2">
      <span className="text-orange-400 font-black text-sm uppercase tracking-widest">ملاحظة الأستاذ أحمد قاسم</span>
      <div className="text-gray-200 text-xl leading-relaxed italic">{children}</div>
    </div>
  </div>
);

// --- SolvedExample ---
export const SolvedExample = ({ 
  question, 
  solution, 
  page 
}: { 
  question: string | React.ReactNode, 
  solution: React.ReactNode, 
  page?: string | number 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="my-8 rounded-3xl border border-white/10 overflow-hidden bg-white/5 shadow-xl">
      <div className="p-8 bg-white/5 flex justify-between items-start gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold uppercase">مثال محلول</span>
            {page && <span className="text-xs text-gray-500 font-mono">P. {page}</span>}
          </div>
          <div className="text-2xl font-bold text-white leading-snug">{question}</div>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 rounded-2xl bg-cyan-500 text-black hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] shrink-0"
        >
          {isOpen ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/10"
          >
            <div className="p-8 bg-black/20">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <span className="text-green-400 font-black uppercase tracking-widest text-sm">خطوات الحل</span>
              </div>
              <div className="text-gray-300 space-y-4">{solution}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Quiz ---
export const Quiz = ({ 
  question, 
  options, 
  correctAnswer, 
  page 
}: { 
  question: string, 
  options: string[], 
  correctAnswer: number, 
  page?: string | number 
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 my-8 shadow-xl">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-purple-400" />
          </div>
          <h6 className="text-xl font-bold text-white">{question}</h6>
        </div>
        {page && <span className="text-xs text-gray-500 font-mono">P. {page}</span>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => { setSelected(idx); setShowResult(true); }}
            className={`p-5 rounded-2xl text-right transition-all duration-300 border-2 text-lg font-medium ${
              showResult 
                ? idx === correctAnswer 
                  ? "bg-green-500/20 border-green-500 text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                  : selected === idx 
                    ? "bg-red-500/20 border-red-500 text-red-300"
                    : "bg-white/5 border-transparent text-gray-500"
                : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-cyan-500/50"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-black/30 flex items-center justify-center text-sm font-mono">{String.fromCharCode(65 + idx)}</span>
              {opt}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
