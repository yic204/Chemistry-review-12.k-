import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Beaker, BookOpen, Menu, X, ChevronLeft, FileText, Calculator, Loader2, Pipette, Flame, Activity, Droplets, FlaskConical, Layers, HelpCircle, Hexagon } from 'lucide-react';

// --- Interfaces ---
interface Tab {
  id: string;
  title: string;
  icon: React.ElementType;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
}

// --- Lazy Loading Components ---
const Ch1_Ions_Solutions = lazy(() => import('./chapters/Ch1_Ions_Solutions'));
const Ch2_Acids_Bases = lazy(() => import('./chapters/Ch2_Acids_Bases'));
const Ch3_Titration_pH = lazy(() => import('./chapters/Ch3_Titration_pH'));
const Ch4_Thermochemistry = lazy(() => import('./chapters/Ch4_Thermochemistry'));
const Ch5_ReactionRate = lazy(() => import('./chapters/Ch5_ReactionRate'));
const Ch6_Solubility_Equilibrium = lazy(() => import('./chapters/Ch6_Solubility_Equilibrium'));
const Ch9_Organic_Chemistry = lazy(() => import('./chapters/Ch9_Organic_Chemistry'));
const Ch10_spiderman = lazy(() => import('./chapters/Ch10_spiderman'));
const MinisterialQuiz = lazy(() => import('./components/MinisterialQuiz'));

// --- Tabs Configuration (Scalable) ---
const TABS: Tab[] = [
  { 
    id: 'ch1', 
    title: 'الفصل الأول: الأيونات في المحاليل المائية', 
    icon: Droplets, 
    component: Ch1_Ions_Solutions 
  },
  { 
    id: 'ch2', 
    title: 'الفصل الثاني: الأحماض والقواعد', 
    icon: Beaker, 
    component: Ch2_Acids_Bases 
  },
  { 
    id: 'ch3', 
    title: 'الفصل الثالث: المعايرة و pH', 
    icon: Pipette, 
    component: Ch3_Titration_pH 
  },
  { 
    id: 'ch4', 
    title: 'الفصل الرابع: الكيمياء الحرارية', 
    icon: Flame, 
    component: Ch4_Thermochemistry 
  },
  { 
    id: 'ch5', 
    title: 'الفصل الخامس: سرعة التفاعل', 
    icon: Activity, 
    component: Ch5_ReactionRate 
  },
  { 
    id: 'ch6', 
    title: 'الفصل السادس: الاتزان والذوبانية', 
    icon: Layers, 
    component: Ch6_Solubility_Equilibrium 
  },
  { 
    id: 'ch9', 
    title: 'الفصل التاسع: الكيمياء العضوية', 
    icon: FlaskConical, 
    component: Ch9_Organic_Chemistry 
  },
  { 
    id: 'ch10', 
    title: 'الفصل العاشر: المركبات العضوية الأخرى', 
    icon: Hexagon, 
    component: Ch10_spiderman 
  },
  {
    id: 'quiz',
    title: 'الاختبارات الوزارية الشاملة',
    icon: HelpCircle,
    component: MinisterialQuiz
  }
];

// --- Loading Component (Glassmorphism) ---
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
    <div className="relative">
      <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full animate-pulse" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="relative z-10 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl"
      >
        <Loader2 className="w-12 h-12 text-cyan-400" />
      </motion.div>
    </div>
    <div className="text-center">
      <h3 className="text-xl font-black text-white tracking-tight">جاري تحميل الفصل...</h3>
      <p className="text-sm text-cyan-500/60 font-bold uppercase tracking-widest mt-1">Chemistry 12 Guide</p>
    </div>
  </div>
);

export default function App() {
  const [activeTabId, setActiveTabId] = useState(TABS[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeTab = TABS.find(t => t.id === activeTabId) || TABS[0];
  const ActiveComponent = activeTab.component;

  return (
    <div className="min-h-screen bg-[#070A10] text-white overflow-hidden selection:bg-cyan-500/30 font-sans" dir="rtl">
      
      {/* القائمة الجانبية (Sidebar) */}
      <nav className={`fixed top-0 right-0 h-full w-80 z-50 transition-transform duration-500 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 bg-[#0B0F19]/80 backdrop-blur-2xl border-l border-white/10 shadow-2xl`}>
        <div className="h-full p-8 flex flex-col">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)] border border-cyan-400/50">
              <Beaker className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-white">كيمياء 12</h1>
              <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-[0.2em]">الدليل الشامل 2026</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTabId(tab.id);
                  setIsSidebarOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                  activeTabId === tab.id 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-lg' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                {activeTabId === tab.id && (
                  <motion.div layoutId="nav-glow" className="absolute inset-0 bg-cyan-500/5 blur-xl" />
                )}
                <span className={`transition-colors duration-300 ${activeTabId === tab.id ? 'text-cyan-400' : 'text-gray-500 group-hover:text-cyan-300'}`}>
                  <tab.icon className="w-5 h-5" />
                </span>
                <span className="font-bold text-sm z-10 text-right">{tab.title}</span>
                {activeTabId === tab.id && (
                  <ChevronLeft className="w-4 h-4 mr-auto animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* هيدر الموبايل */}
      <header className="lg:hidden fixed top-0 left-0 w-full z-40 backdrop-blur-xl bg-[#070A10]/80 border-b border-white/10 px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center border border-cyan-400/50">
            <Beaker className="text-white w-5 h-5" />
          </div>
          <span className="font-black text-xl tracking-tight">كيمياء 12</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-3 rounded-xl bg-white/5 border border-white/10 text-cyan-400 hover:bg-cyan-500/10 transition-colors"
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* منطقة عرض الشرح */}
      <main className="lg:mr-80 min-h-screen pt-28 lg:pt-16 px-6 md:px-12 pb-24 z-10 relative">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTabId}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="mb-16">
                <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tighter">
                  {activeTab.title}
                </h2>
              </div>

              <div className="space-y-16">
                <Suspense fallback={<LoadingState />}>
                  <ActiveComponent />
                </Suspense>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="lg:mr-80 border-t border-white/5 bg-[#070A10]/60 backdrop-blur-xl py-12 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            
            {/* جهة اليمين: معلومات المنصة */}
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-gray-400 font-bold text-sm uppercase tracking-widest">Interactive Chemistry Platform</span>
              </div>
              <p className="text-gray-500 text-xs max-w-xs leading-relaxed">
                جميع الحقوق محفوظة لطلبة الصف الثاني عشر. تم استخراج البيانات بدقة لضمان التفوق العلمي 2026.
              </p>
            </div>

            {/* المنتصف: توقيعك الملكي (البصمة) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center group cursor-default"
            >
              <span className="text-[9px] uppercase tracking-[0.4em] text-gray-600 group-hover:text-cyan-500 transition-colors duration-500 mb-1">
                Developed & Designed by
              </span>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black italic tracking-tighter transition-all duration-500">
                  <span className="text-white group-hover:text-cyan-400">youssef website</span>
                  <span className="text-gray-600 mx-2">by</span>
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(0,229,255,0.3)]">YIC</span>
                </h3>
              </div>
              <div className="w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent transition-all duration-700 mt-2 opacity-50" />
            </motion.div>

            {/* جهة اليسار: اختصارات سريعة */}
            <div className="flex gap-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all cursor-pointer">
                 <Calculator className="w-5 h-5" />
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all cursor-pointer">
                 <FileText className="w-5 h-5" />
              </div>
            </div>

          </div>

          {/* سطر النهاية السفلي */}
          <div className="mt-12 text-center">
            <p className="text-[10px] text-gray-700 font-medium">
              &copy; 2026 YOUSSEF CHEMISTRY GUIDE. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
