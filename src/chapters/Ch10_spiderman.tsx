import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { 
  FlaskConical, Zap, Activity, Droplets, BookOpen, 
  Calculator, CheckCircle2, Lightbulb, AlertTriangle, 
  ArrowRightLeft, Thermometer, Beaker, Info, ShieldAlert,
  Target, Layers, Flame, Grid, Hexagon, Wind, Atom, ChevronRight, CircleDot, ArrowUp, Factory,
  FlaskRound, TestTube2, Microscope, Sparkles, ClipboardList, GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';
import 'katex/dist/katex.min.css';

// --- Reusable UI Components ---

const GlassCard = ({ children, className = "", title, page }: { children: React.ReactNode, className?: string, title?: string, page?: string }) => (
  <div className={`p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden break-words ${className}`}>
    {(title || page) && (
      <div className="flex justify-between items-center mb-8 border-r-4 border-cyan-500 pr-4">
        {title && <h4 className="text-2xl font-black text-white">{title}</h4>}
        {page && <span className="text-cyan-500/50 text-xs font-mono">ص {page}</span>}
      </div>
    )}
    {children}
  </div>
);

const SectionHeader = ({ title, icon: Icon }: { title: string, icon: any }) => (
  <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6 mt-16">
    <div className="p-4 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
      {Icon && <Icon className="w-10 h-10 text-cyan-400" />}
    </div>
    <h3 className="text-4xl font-black text-white tracking-tight">{title}</h3>
  </div>
);

const Definition = ({ title, children, page }: { title: string, children: React.ReactNode, page?: string }) => (
  <div className="bg-cyan-500/10 border-r-8 border-cyan-500 p-8 my-8 rounded-l-3xl shadow-2xl relative overflow-hidden break-words">
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-cyan-500/5 to-transparent pointer-events-none" />
    <div className="flex justify-between items-start mb-3">
      <h4 className="text-cyan-300 font-black text-2xl tracking-tight flex items-center gap-2">
        <Target className="w-6 h-6" />
        {title}
      </h4>
      {page && <span className="text-cyan-500/50 text-xs font-mono">ص {page}</span>}
    </div>
    <div className="text-gray-200 leading-relaxed text-xl relative z-10">{children}</div>
  </div>
);

const FormulaBox = ({ children, label }: { children: string, label?: string }) => (
  <div className="my-10 group">
    {label && (
      <div className="flex items-center gap-2 mb-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/50" />
        <span className="text-sm font-black text-cyan-500 uppercase tracking-[0.3em] px-4">{label}</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/50" />
      </div>
    )}
    <div className="w-full overflow-x-auto my-4 custom-scrollbar bg-black/40 rounded-3xl border border-white/10 shadow-inner p-6 md:p-10 transition-all group-hover:border-cyan-500/30 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]" dir="ltr">
      <div className="min-w-max flex items-center justify-center text-2xl md:text-4xl font-bold text-cyan-300 px-4">
        <BlockMath math={children} />
      </div>
    </div>
  </div>
);

const TeacherNote = ({ children, title = "إعداد الأستاذ يوسف صباح" }: { children: React.ReactNode, title?: string }) => (
  <div className="bg-amber-500/10 border-2 border-dashed border-amber-500/30 p-8 rounded-3xl my-10 relative overflow-hidden break-words">
    <div className="absolute -top-5 right-10 px-6 py-2 bg-amber-500 rounded-full shadow-lg z-20">
      <div className="flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-white" />
        <span className="text-white font-black text-sm">{title}</span>
      </div>
    </div>
    <div className="text-gray-200 text-xl leading-relaxed mt-4 italic font-medium relative z-10">
      {children}
    </div>
  </div>
);

const ComparisonTable = ({ headers, rows, title, page }: { headers: string[], rows: any[][], title?: string, page?: string }) => (
  <div className="my-12 w-full">
    {(title || page) && (
      <div className="flex justify-between items-center mb-6">
        {title && <h5 className="text-2xl font-black text-white flex items-center gap-2"><Layers className="w-6 h-6 text-cyan-400" /> {title}</h5>}
        {page && <span className="text-cyan-500/50 text-xs font-mono">ص {page}</span>}
      </div>
    )}
    <div className="overflow-x-auto rounded-3xl border border-white/10 shadow-2xl bg-white/5 backdrop-blur-md custom-scrollbar">
      <table className="w-full text-right border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-b border-white/10">
            {headers.map((h, i) => (
              <th key={i} className="p-6 text-cyan-400 font-black text-xl whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/10 transition-all duration-300">
              {row.map((cell, j) => (
                <td key={j} className="p-6 text-gray-200 text-lg break-words">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SolvedExample = ({ page, question, solution }: { page?: string, question: React.ReactNode, solution: React.ReactNode }) => (
  <div className="my-12 rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl">
    <div className="bg-emerald-500/20 p-6 border-b border-emerald-500/30 flex justify-between items-center">
      <h5 className="text-2xl font-black text-emerald-400 flex items-center gap-3">
        <Zap className="w-7 h-7" />
        مثال محلول
      </h5>
      {page && <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">صفحة {page}</span>}
    </div>
    <div className="p-8 bg-white/5 space-y-6">
      <div className="text-gray-200 text-xl leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/5">
        {question}
      </div>
      <div className="space-y-4">
        <h6 className="text-emerald-400 font-black text-lg flex items-center gap-2">
          <ChevronRight className="w-5 h-5" />
          الحل:
        </h6>
        <div className="text-gray-300 text-xl leading-relaxed pr-6 border-r-2 border-emerald-500/30">
          {solution}
        </div>
      </div>
    </div>
  </div>
);

const Quiz = ({ question, options, correctAnswer, page }: { question: string, options: string[], correctAnswer: number, page?: string }) => {
  const [selected, setSelected] = React.useState<number | null>(null);
  const [showResult, setShowResult] = React.useState(false);

  return (
    <div className="my-8 p-6 bg-white/5 rounded-3xl border border-white/10 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-cyan-400 font-bold">
          <CheckCircle2 className="w-5 h-5" />
          <span>اختبر نفسك</span>
        </div>
        {page && <span className="text-white/30 text-xs font-mono">ص {page}</span>}
      </div>
      <h5 className="text-xl font-bold text-white mb-6 leading-relaxed">{question}</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => { setSelected(i); setShowResult(true); }}
            className={`p-4 rounded-2xl text-right transition-all duration-300 border ${
              showResult 
                ? i === correctAnswer 
                  ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" 
                  : selected === i 
                    ? "bg-rose-500/20 border-rose-500 text-rose-400" 
                    : "bg-white/5 border-white/10 text-gray-400"
                : "bg-white/5 border-white/10 text-gray-200 hover:bg-white/10 hover:border-cyan-500/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </div>
          </button>
        ))}
      </div>
      {showResult && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-4 rounded-2xl flex items-center gap-3 ${
            selected === correctAnswer ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
          }`}
        >
          {selected === correctAnswer ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
          <span className="font-bold">
            {selected === correctAnswer ? "إجابة صحيحة! أحسنت." : `إجابة خاطئة. الإجابة الصحيحة هي: ${options[correctAnswer]}`}
          </span>
        </motion.div>
      )}
    </div>
  );
};

const Ch10_spiderman = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-cyan-500/30" dir="rtl">
      {/* Hero Section */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 to-[#0a0a0a] z-10" />
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src="https://picsum.photos/seed/organic/1920/1080" 
            alt="Organic Chemistry" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="relative z-20 text-center px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="inline-block px-6 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-sm font-black tracking-[0.2em] mb-6 uppercase">
              الكيمياء العضوية
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
              الفصل <span className="text-cyan-500">العاشر</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-300 max-w-3xl mx-auto leading-tight">
              المركبات العضوية الأخرى
            </h2>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-32">
        {/* Introduction */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <GlassCard className="mt-[-100px] relative z-30 border-t-4 border-t-cyan-500">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
                  <FlaskRound className="text-cyan-400 w-8 h-8" />
                  مقدمة الفصل
                </h3>
                <p className="text-xl text-gray-300 leading-relaxed mb-6">
                  في هذا الفصل، سنتعرف على عائلات جديدة من المركبات العضوية التي تتميز بوجود مجاميع وظيفية محددة تمنحها خصائص كيميائية وفيزيائية فريدة.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['الكحولات', 'الإيثرات', 'الألديهايدات', 'الكيتونات', 'الأحماض', 'الاسترات'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                      <Hexagon className="w-4 h-4 text-cyan-500" />
                      <span className="text-sm font-bold text-gray-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-64 h-64 bg-cyan-500/10 rounded-3xl border border-cyan-500/20 flex items-center justify-center relative group overflow-hidden">
                <Atom className="w-32 h-32 text-cyan-500/40 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent" />
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Section 1: Functional Groups */}
        <SectionHeader title="المجاميع الوظيفية" icon={Layers} />
        
        <Definition title="المجموعة الوظيفية" page="208">
          هي ذرة أو مجموعة من الذرات التي تتفاعل دائماً بالطريقة نفسها، وتحدد الخصائص الفيزيائية والكيميائية للمركب العضوي.
        </Definition>

        {/* 1. Alcohols */}
        <SectionHeader title="أولاً: الكحولات (Alcohols)" icon={Droplets} />
        
        <Definition title="الكحولات" page="208">
          هي مركبات عضوية ناتجة عن إحلال مجموعة هيدروكسيل <InlineMath math="(OH)" /> محل ذرة هيدروجين في الهيدروكربون.
        </Definition>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
          <GlassCard title="الصيغة العامة">
            <FormulaBox label="General Formula">R-OH</FormulaBox>
          </GlassCard>
          <GlassCard title="المجموعة الوظيفية">
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="text-4xl font-black text-cyan-400" dir="ltr">-OH</div>
              <div className="text-xl font-bold text-gray-300">مجموعة الهيدروكسيل</div>
            </div>
          </GlassCard>
        </div>

        <GlassCard title="شروط تسمية الكحولات" page="208">
          <ul className="space-y-4 text-lg text-gray-200">
            <li className="flex items-start gap-3">
              <CircleDot className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" />
              <span>نختار أطول سلسلة كربونية مستمرة تحتوي على مجموعة الهيدروكسيل <InlineMath math="(OH)" />.</span>
            </li>
            <li className="flex items-start gap-3">
              <CircleDot className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" />
              <span>نرقم السلسلة من الطرف الأقرب لمجموعة <InlineMath math="(OH)" />.</span>
            </li>
            <li className="flex items-start gap-3">
              <CircleDot className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" />
              <span>نضيف المقطع (ول) إلى نهاية اسم الألكان المقابل.</span>
            </li>
            <li className="flex items-start gap-3">
              <CircleDot className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" />
              <span>نحدد موقع مجموعة <InlineMath math="(OH)" /> برقم يسبق اسم الكحول.</span>
            </li>
          </ul>
        </GlassCard>

        <ComparisonTable 
          title="أمثلة على تسمية الكحولات"
          headers={["الصيغة البنائية", "الاسم الشائع", "الاسم النظامي (IUPAC)"]}
          rows={[
            [<InlineMath math="CH_3-OH" />, "كحول الميثيل", "ميثانول"],
            [<InlineMath math="CH_3-CH_2-OH" />, "كحول الإيثيل", "إيثانول"],
            [<InlineMath math="CH_3-CH_2-CH_2-OH" />, "كحول البروبيل", "1-بروبانول"],
            [<InlineMath math="CH_3-CH(OH)-CH_3" />, "كحول أيزوبروبيل", "2-بروبانول"],
            [<InlineMath math="CH_3-CH_2-CH_2-CH_2-OH" />, "كحول البيوتيل", "1-بيوتانول"],
            [<InlineMath math="CH_3-CH_2-CH(OH)-CH_3" />, "كحول بيوتيل ثانوي", "2-بيوتانول"]
          ]}
        />

        <GlassCard title="أمثلة إضافية على الصيغ البنائية" page="209">
          <div className="space-y-8">
            <div className="p-6 bg-black/20 rounded-2xl border border-white/5">
              <h5 className="text-cyan-400 font-bold mb-4">3,2-بنتاديول</h5>
              <BlockMath math="CH_3-CH_2-CH(OH)-CH(OH)-CH_3" />
            </div>
            <div className="p-6 bg-black/20 rounded-2xl border border-white/5">
              <h5 className="text-cyan-400 font-bold mb-4">5,2-هكسانديول</h5>
              <BlockMath math="CH_3-CH(OH)-CH_2-CH_2-CH(OH)-CH_3" />
            </div>
          </div>
        </GlassCard>

        <GlassCard title="تمرين: رسم التراكيب البنائية" page="210">
          <p className="text-xl text-gray-200 mb-6 font-bold">ارسم التراكيب البنائية المختصرة لكل من أنواع الكحول التالية:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "2,1-بروبانديول",
              "3,2-بنتاديول",
              "3,2,1-بيوتان تريول",
              "بنتانول-1",
              "هكسانول-3"
            ].map((name, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                <span className="text-cyan-300 font-bold">{name}</span>
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <ArrowRightLeft className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-6 my-12">
          <Quiz 
            page="211"
            question="أي من التالي هو الصيغة العامة للكحولات؟"
            options={["R-O-R", "R-OH", "R-CHO", "R-COOH"]}
            correctAnswer={1}
          />
          <Quiz 
            page="211"
            question="ما هو الاسم النظامي للمركب التالي: CH3-CH2-CH(OH)-CH3؟"
            options={["1-بيوتانول", "2-بيوتانول", "2-بروبانول", "بيوتانال"]}
            correctAnswer={1}
          />
          <Quiz 
            page="211"
            question="أي من الكحولات التالية يحتوي على ثلاث مجموعات هيدروكسيل؟"
            options={["إيثانول", "إيثيلين جلايكول", "الجلسرين", "2-بروبانول"]}
            correctAnswer={2}
          />
          <Quiz 
            page="211"
            question="ما هو الاسم الشائع للميثانول؟"
            options={["كحول الإيثيل", "كحول الميثيل", "كحول البروبيل", "الأسيتون"]}
            correctAnswer={1}
          />
        </div>

        {/* 2. Ethers */}
        <SectionHeader title="ثانياً: الإيثرات (Ethers)" icon={Wind} />
        
        <Definition title="الإيثرات" page="212">
          هي مركبات عضوية ترتبط فيها ذرة أكسجين بمجموعتي ألكيل <InlineMath math="(R-O-R)" />.
        </Definition>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
          <GlassCard title="الصيغة العامة">
            <FormulaBox label="General Formula">R-O-R'</FormulaBox>
          </GlassCard>
          <GlassCard title="المجموعة الوظيفية">
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="text-4xl font-black text-cyan-400" dir="ltr">-O-</div>
              <div className="text-xl font-bold text-gray-300">مجموعة الإيثر (ألوكسي)</div>
            </div>
          </GlassCard>
        </div>

        <GlassCard title="تسمية الإيثرات" page="212">
          <p className="text-lg text-gray-200 mb-6">
            تتم التسمية بذكر أسماء مجموعتي الألكيل المرتبطتين بالأكسجين متبوعة بكلمة "إيثر". إذا كانت المجموعتان متماثلتين نستخدم البادئة "ثنائي".
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <BlockMath math="CH_3-O-CH_3" />
              <p className="mt-2 font-bold text-cyan-400">ثنائي ميثيل إيثر</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <BlockMath math="CH_3-O-CH_2-CH_3" />
              <p className="mt-2 font-bold text-cyan-400">إيثيل ميثيل إيثر</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <BlockMath math="CH_3-CH_2-O-CH_2-CH_3" />
              <p className="mt-2 font-bold text-cyan-400">ثنائي إيثيل إيثر</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <BlockMath math="CH_3-CH(O-CH_2-CH_3)-CH_3" />
              <p className="mt-2 font-bold text-cyan-400">2-إيثوكسي بروبان</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="تمرين: كتابة الصيغ" page="213">
          <p className="text-xl text-gray-200 mb-6 font-bold">اكتب صيغة كل من:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "إيثيل بروبيل إيثر",
              "ثنائي هكسيل حلقي إيثر",
              "بيوتيل ميثيل إيثر",
              "ميثيل بنتيل حلقي إيثر"
            ].map((name, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                <span className="text-cyan-300 font-bold">{name}</span>
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <ArrowRightLeft className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-6 my-12">
          <Quiz 
            page="213"
            question="ما هي المجموعة الوظيفية في الإيثرات؟"
            options={["-OH", "-O-", "-CHO", "-CO-"]}
            correctAnswer={1}
          />
          <Quiz 
            page="213"
            question="ما هو الاسم الصحيح للمركب CH3-O-CH2-CH3؟"
            options={["ثنائي ميثيل إيثر", "إيثيل ميثيل إيثر", "ثنائي إيثيل إيثر", "ميثيل إيثانول"]}
            correctAnswer={1}
          />
        </div>

        <TeacherNote>
          الكحولات والإيثرات لهما نفس الصيغة الجزيئية العامة <InlineMath math="C_nH_{2n+2}O" /> ولكنهما يختلفان في الصيغة البنائية، مما يجعلهما متشاكلات بنائية.
        </TeacherNote>

        <div className="space-y-6 my-12">
          <Quiz 
            page="214"
            question="أي من المركبات التالية يعتبر إيثراً؟"
            options={["CH3-OH", "CH3-O-CH3", "CH3-CHO", "CH3-COOH"]}
            correctAnswer={1}
          />
          <Quiz 
            page="214"
            question="ما هي الصيغة الجزيئية العامة للكحولات والإيثرات؟"
            options={["CnH2nO", "CnH2n+2O", "CnH2nO2", "CnH2n-2O"]}
            correctAnswer={1}
          />
        </div>

        {/* 3. Aldehydes */}
        <SectionHeader title="ثالثاً: الألديهايدات (Aldehydes)" icon={Activity} />
        
        <Definition title="الألديهايدات" page="215">
          مركبات عضوية تحتوي على مجموعة كربونيل <InlineMath math="(C=O)" /> تقع في نهاية السلسلة الكربونية ومرتبطة بذرة هيدروجين.
        </Definition>

        <FormulaBox label="الصيغة العامة">R-CHO</FormulaBox>

        <GlassCard title="تسمية الألديهايدات" page="215">
          <ul className="space-y-4 text-lg text-gray-200">
            <li className="flex items-start gap-3">
              <CircleDot className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" />
              <span>نضيف المقطع (ال) إلى نهاية اسم الألكان المقابل.</span>
            </li>
            <li className="flex items-start gap-3">
              <CircleDot className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" />
              <span>تأخذ ذرة كربون مجموعة الكربونيل دائماً الرقم (1).</span>
            </li>
          </ul>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-black/40 rounded-2xl border border-white/10 text-center">
              <BlockMath math="H-CHO" />
              <p className="mt-2 font-bold text-cyan-400">ميثانال (فورمالديهايد)</p>
            </div>
            <div className="p-4 bg-black/40 rounded-2xl border border-white/10 text-center">
              <BlockMath math="CH_3-CHO" />
              <p className="mt-2 font-bold text-cyan-400">إيثانال (أسيتالديهايد)</p>
            </div>
            <div className="p-4 bg-black/40 rounded-2xl border border-white/10 text-center">
              <BlockMath math="CH_3-CH_2-CHO" />
              <p className="mt-2 font-bold text-cyan-400">بروبانال</p>
            </div>
            <div className="p-4 bg-black/40 rounded-2xl border border-white/10 text-center">
              <BlockMath math="CH_3-CH_2-CH_2-CHO" />
              <p className="mt-2 font-bold text-cyan-400">بيوتانال</p>
            </div>
          </div>
        </GlassCard>

        {/* 4. Ketones */}
        <SectionHeader title="رابعاً: الكيتونات (Ketones)" icon={Activity} />
        
        <Definition title="الكيتونات" page="217">
          مركبات عضوية تحتوي على مجموعة كربونيل <InlineMath math="(C=O)" /> تقع داخل السلسلة الكربونية ومرتبطة بذرتي كربون.
        </Definition>

        <FormulaBox label="الصيغة العامة">R-CO-R'</FormulaBox>

        <GlassCard title="تسمية الكيتونات" page="217">
          <ul className="space-y-4 text-lg text-gray-200">
            <li className="flex items-start gap-3">
              <CircleDot className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" />
              <span>نضيف المقطع (ون) إلى نهاية اسم الألكان المقابل.</span>
            </li>
            <li className="flex items-start gap-3">
              <CircleDot className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" />
              <span>نحدد موقع مجموعة الكربونيل برقم يسبق الاسم (للسلاسل التي تزيد عن 4 ذرات كربون).</span>
            </li>
          </ul>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-black/40 rounded-2xl border border-white/10 text-center">
              <BlockMath math="CH_3-CO-CH_3" />
              <p className="mt-2 font-bold text-cyan-400">2-بروبانون (أسيتون)</p>
            </div>
            <div className="p-6 bg-black/40 rounded-2xl border border-white/10 text-center">
              <BlockMath math="CH_3-CO-CH_2-CH_3" />
              <p className="mt-2 font-bold text-cyan-400">2-بيوتانون</p>
            </div>
            <div className="p-6 bg-black/40 rounded-2xl border border-white/10 text-center">
              <BlockMath math="CH_3-CH_2-CO-CH_2-CH_3" />
              <p className="mt-2 font-bold text-cyan-400">3-بنتانون</p>
            </div>
            <div className="p-6 bg-black/40 rounded-2xl border border-white/10 text-center">
              <BlockMath math="CH_3-CH_2-CH_2-CO-CH_3" />
              <p className="mt-2 font-bold text-cyan-400">2-بنتانون</p>
            </div>
          </div>
        </GlassCard>

        <TeacherNote>
          الألديهايدات والكيتونات لهما نفس الصيغة الجزيئية العامة <InlineMath math="C_nH_{2n}O" /> ولكنهما يختلفان في موقع مجموعة الكربونيل.
        </TeacherNote>

        <div className="space-y-6 my-12">
          <Quiz 
            page="219"
            question="ما هي الصيغة الجزيئية العامة للألديهايدات والكيتونات؟"
            options={["CnH2n+2O", "CnH2nO", "CnH2nO2", "CnH2n-2O"]}
            correctAnswer={1}
          />
          <Quiz 
            page="220"
            question="أي من التالي يعتبر ألديهايداً؟"
            options={["CH3-CO-CH3", "CH3-CHO", "CH3-COOH", "CH3-OH"]}
            correctAnswer={1}
          />
          <Quiz 
            page="220"
            question="ما هو الاسم النظامي للأسيتون؟"
            options={["إيثانال", "2-بروبانون", "ميثانال", "2-بيوتانون"]}
            correctAnswer={1}
          />
        </div>

        {/* 5. Carboxylic Acids */}
        <SectionHeader title="خامساً: الأحماض الكربوكسيلية" icon={Flame} />
        
        <Definition title="الأحماض الكربوكسيلية" page="221">
          مركبات عضوية تحتوي على مجموعة الكربوكسيل <InlineMath math="(-COOH)" /> الوظيفية.
        </Definition>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
          <GlassCard title="الصيغة العامة">
            <FormulaBox label="General Formula">R-COOH</FormulaBox>
          </GlassCard>
          <GlassCard title="المجموعة الوظيفية">
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="text-4xl font-black text-cyan-400" dir="ltr">-COOH</div>
              <div className="text-xl font-bold text-gray-300">مجموعة الكربوكسيل</div>
            </div>
          </GlassCard>
        </div>

        <GlassCard title="تسمية الأحماض الكربوكسيلية" page="221">
          <p className="text-lg text-gray-200 mb-6">
            نبدأ بكلمة "حمض" ثم نضيف المقطع (ويك) إلى نهاية اسم الألكان المقابل.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <BlockMath math="H-COOH" />
              <p className="mt-2 font-bold">حمض الميثانويك (حمض الفورميك)</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <BlockMath math="CH_3-COOH" />
              <p className="mt-2 font-bold">حمض الإيثانويك (حمض الأسيتيك)</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <BlockMath math="CH_3-CH_2-COOH" />
              <p className="mt-2 font-bold">حمض البروبانويك</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <BlockMath math="CH_3-CH_2-CH_2-COOH" />
              <p className="mt-2 font-bold">حمض البيوتانويك</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="أحماض كربوكسيلية متنوعة" page="221">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-center">
              <h6 className="font-black text-cyan-400 mb-2">حمض اللاكتيك</h6>
              <p className="text-sm">أحادي الكربوكسيل</p>
            </div>
            <div className="p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-center">
              <h6 className="font-black text-cyan-400 mb-2">حمض الأوكساليك</h6>
              <p className="text-sm">ثنائي الكربوكسيل</p>
            </div>
            <div className="p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-center">
              <h6 className="font-black text-cyan-400 mb-2">حمض الستريك</h6>
              <p className="text-sm">ثلاثي الكربوكسيل</p>
            </div>
          </div>
        </GlassCard>

        {/* 6. Esters */}
        <SectionHeader title="سادساً: الاسترات (Esters)" icon={Sparkles} />
        
        <Definition title="الاسترات" page="223">
          مركبات عضوية مشتقة من الأحماض الكربوكسيلية حلت فيها مجموعة ألكيل محل هيدروجين مجموعة الكربوكسيل.
        </Definition>

        <FormulaBox label="الصيغة العامة">R-COOR'</FormulaBox>

        <GlassCard title="تسمية الاسترات" page="223">
          <p className="text-lg text-gray-200 mb-6">
            يتكون الاسم من جزأين: الأول مشتق من الحمض بإضافة المقطع (وات)، والثاني هو اسم مجموعة الألكيل المرتبطة بالأكسجين.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <BlockMath math="H-COOCH_3" />
              <p className="mt-2 font-bold text-cyan-400">ميثانوات الميثيل</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <BlockMath math="CH_3-COOCH_3" />
              <p className="mt-2 font-bold text-cyan-400">إيثانوات الميثيل</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <BlockMath math="CH_3-COOCH_2-CH_3" />
              <p className="mt-2 font-bold text-cyan-400">إيثانوات الإيثيل</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <BlockMath math="CH_3-CH_2-COOCH_2-CH_3" />
              <p className="mt-2 font-bold text-cyan-400">بروبانوات الإيثيل</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="تمرين: رسم صيغ الاسترات" page="224">
          <p className="text-xl text-gray-200 mb-6 font-bold">ارسم الصيغ البنائية للاسترات التالية:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["بروبيل إيثانوات", "بروبيل بروبانوات", "ميثيل بيوتانوات"].map((name, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                <span className="text-cyan-300 font-bold">{name}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <TeacherNote>
          الأحماض الكربوكسيلية والاسترات لهما نفس الصيغة الجزيئية العامة <InlineMath math="C_nH_{2n}O_2" /> ولكنهما يختلفان في الصيغة البنائية.
        </TeacherNote>

        <div className="space-y-6 my-12">
          <Quiz 
            page="225"
            question="ما هي الصيغة الجزيئية العامة للأحماض الكربوكسيلية والاسترات؟"
            options={["CnH2nO", "CnH2n+2O", "CnH2nO2", "CnH2n-2O"]}
            correctAnswer={2}
          />
          <Quiz 
            page="226"
            question="أي من التالي يعتبر استراً؟"
            options={["CH3-COOH", "CH3-COOCH3", "CH3-CHO", "CH3-OH"]}
            correctAnswer={1}
          />
          <Quiz 
            page="226"
            question="ما هو الاسم الشائع لحمض الإيثانويك؟"
            options={["حمض الفورميك", "حمض الأسيتيك", "حمض اللاكتيك", "حمض الستريك"]}
            correctAnswer={1}
          />
        </div>

        {/* 7. Alkyl Halides */}
        <SectionHeader title="سابعاً: هاليدات الألكيل" icon={ShieldAlert} />
        
        <Definition title="هاليدات الألكيل" page="227">
          مركبات عضوية تحتوي على ذرة هالوجين واحدة أو أكثر <InlineMath math="(F, Cl, Br, I)" /> مرتبطة بذرة كربون ألكيلية.
        </Definition>

        <FormulaBox label="الصيغة العامة">R-X</FormulaBox>

        <GlassCard title="تسمية هاليدات الألكيل" page="227">
          <p className="text-lg text-gray-200 mb-6">
            نسمي الهالوجين كفرع بإضافة المقطع (و) لاسم الهالوجين (فلورو، كلورو، برومو، أيودو) مع تحديد موقعه برقم.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <BlockMath math="CH_3-Cl" />
              <p className="mt-2 font-bold">كلورو ميثان</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <BlockMath math="CH_3-CH_2-Cl" />
              <p className="mt-2 font-bold">كلورو إيثان</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <BlockMath math="CH_3-CH(Br)-CH_3" />
              <p className="mt-2 font-bold">2-برومو بروبان</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <BlockMath math="CH_3-CH(Br)-CH_2-CH_2-CH(Cl)-CH_3" />
              <p className="mt-2 font-bold">2-برومو-5-كلورو هكسان</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="أمثلة هامة على هاليدات الألكيل" page="228">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20 text-center">
              <h6 className="font-black text-rose-400 mb-2">تفلون</h6>
              <BlockMath math="C_2F_4" />
            </div>
            <div className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20 text-center">
              <h6 className="font-black text-rose-400 mb-2">فريون 11</h6>
              <BlockMath math="CCl_3F" />
            </div>
            <div className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20 text-center">
              <h6 className="font-black text-rose-400 mb-2">فريون 12</h6>
              <BlockMath math="CCl_2F_2" />
            </div>
          </div>
        </GlassCard>

        <Quiz 
          page="229"
          question="ما هو الاسم النظامي للمركب CH3-CH2-Cl؟"
          options={["كلورو ميثان", "كلورو إيثان", "كلورو بروبان", "إيثيل كلوريد"]}
          correctAnswer={1}
        />

        {/* 8. Amines */}
        <SectionHeader title="ثامناً: الأمينات (Amines)" icon={Atom} />
        
        <Definition title="الأمينات" page="230">
          مركبات عضوية تحتوي على ذرات نيتروجين مرتبطة مع ذرات كربون في سلاسل أليفاتية أو حلقات أروماتية.
        </Definition>

        <GlassCard title="أنواع الأمينات" page="230">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
              <h6 className="font-black text-cyan-400 mb-2">أولية</h6>
              <BlockMath math="R-NH_2" />
              <p className="text-xs mt-2 text-gray-400">مثال: ميثيل أمين</p>
            </div>
            <div className="p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
              <h6 className="font-black text-cyan-400 mb-2">ثانوية</h6>
              <BlockMath math="R-NH-R" />
              <p className="text-xs mt-2 text-gray-400">مثال: ثنائي ميثيل أمين</p>
            </div>
            <div className="p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
              <h6 className="font-black text-cyan-400 mb-2">ثالثية</h6>
              <BlockMath math="R-N(R)-R" />
              <p className="text-xs mt-2 text-gray-400">مثال: ثلاثي ميثيل أمين</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="أمثلة على تسمية الأمينات" page="231">
          <div className="space-y-4">
            <div className="flex justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <span className="font-mono text-cyan-400">CH3-CH2-NH2</span>
              <span className="font-bold">إيثيل أمين</span>
            </div>
            <div className="flex justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <span className="font-mono text-cyan-400">CH3-CH2-NH-CH2-CH3</span>
              <span className="font-bold">ثنائي إيثيل أمين</span>
            </div>
            <div className="flex justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <span className="font-mono text-cyan-400">(CH3)3N</span>
              <span className="font-bold">ثلاثي ميثيل أمين</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="تمرين: رسم صيغ الأمينات" page="231">
          <p className="text-xl text-gray-200 mb-6 font-bold">ارسم التراكيب البنائية المختصرة للأمينات التالية:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["بيوتيل إيثيل أمين", "إيثيل أمين", "إيثيل بروبيل أمين"].map((name, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                <span className="text-cyan-300 font-bold">{name}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Section 2: Explanations (Properties & Uses) */}
        <SectionHeader title="الشرحيات: الخصائص والاستخدامات" icon={ClipboardList} />

        <div className="space-y-12">
          {/* Alcohols & Ethers Explanations */}
          <GlassCard title="خصائص واستخدامات الكحولات" page="232-234">
            <div className="space-y-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h5 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5" /> الخصائص الفيزيائية
                </h5>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>درجة غليانها مرتفعة مقارنة بالألكانات المقابلة بسبب تكوين روابط هيدروجينية.</li>
                  <li>تذوب في الماء بسبب قطبيتها وقدرتها على تكوين روابط هيدروجينية مع جزيئات الماء.</li>
                </ul>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h5 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5" /> الاستخدامات
                </h5>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>الميثانول: يستخدم كمذيب صناعي وفي إنتاج الفورمالديهايد.</li>
                  <li>الإيثانول: يستخدم في المشروبات الكحولية، كمطهر، وفي الوقود (Gasohol).</li>
                  <li>إيثيلين جلايكول: يستخدم كمانع لتجمد الماء في رادياتير السيارات.</li>
                </ul>
              </div>
            </div>
          </GlassCard>

          <GlassCard title="خصائص واستخدامات الإيثرات" page="235-236">
            <div className="space-y-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h5 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5" /> الخصائص الفيزيائية
                </h5>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>درجة غليانها منخفضة جداً مقارنة بالكحولات لعدم قدرتها على تكوين روابط هيدروجينية بين جزيئاتها.</li>
                  <li>قليلة الذوبان في الماء.</li>
                </ul>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h5 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5" /> الاستخدامات
                </h5>
                <p className="text-gray-300">كان ثنائي إيثيل إيثر يستخدم قديماً كمخدر في العمليات الجراحية.</p>
              </div>
            </div>
          </GlassCard>

          <div className="space-y-6 my-12">
            <Quiz 
              page="236"
              question="لماذا درجة غليان الكحولات أعلى من الإيثرات المقابلة؟"
              options={["بسبب كبر كتلتها", "بسبب تكوين روابط هيدروجينية", "بسبب وجود الكربون", "بسبب لونها"]}
              correctAnswer={1}
            />
            <Quiz 
              page="237"
              question="أي كحول يستخدم كمانع لتجمد الماء؟"
              options={["ميثانول", "إيثانول", "إيثيلين جلايكول", "جلسرين"]}
              correctAnswer={2}
            />
          </div>

          {/* Aldehydes & Ketones Explanations */}
          <GlassCard title="الألديهايدات والكيتونات: الاستخدامات" page="238">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h5 className="text-cyan-400 font-bold mb-4">الفورمالديهايد</h5>
                <p className="text-gray-300">يستخدم في حفظ العينات البيولوجية وفي صناعة البلاستيك.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h5 className="text-cyan-400 font-bold mb-4">الأسيتون</h5>
                <p className="text-gray-300">يستخدم كمذيب لطلاء الأظافر وفي المختبرات الكيميائية.</p>
              </div>
            </div>
          </GlassCard>

          {/* Carboxylic Acids & Esters Explanations */}
          <GlassCard title="الأحماض الكربوكسيلية والاسترات" page="239-240">
            <div className="space-y-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h5 className="text-cyan-400 font-bold mb-4">الأحماض الكربوكسيلية</h5>
                <p className="text-gray-300">حمض الإيثانويك (الخل) يستخدم في الغذاء وحفظ الأطعمة.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h5 className="text-cyan-400 font-bold mb-4">الاسترات</h5>
                <p className="text-gray-300">تستخدم في صناعة العطور والنكهات الغذائية بسبب روائحها المميزة.</p>
              </div>
            </div>
          </GlassCard>

          {/* Alkyl Halides & Amines Explanations */}
          <GlassCard title="هاليدات الألكيل والأمينات" page="241-243">
            <div className="space-y-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h5 className="text-cyan-400 font-bold mb-4">هاليدات الألكيل (CFCs)</h5>
                <p className="text-gray-300">تستخدم في التبريد ولكنها تسبب ثقب الأوزون.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h5 className="text-cyan-400 font-bold mb-4">الأمينات (الألكلويدات)</h5>
                <p className="text-gray-300">مركبات طبيعية مستخلصة من النباتات مثل الكافيين والنيكوتين.</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Section 3: Organic Reactions */}
        <SectionHeader title="القسم الثاني: التفاعلات العضوية" icon={FlaskRound} />
        
        <div className="space-y-12">
          <GlassCard title="1. تفاعلات الاستبدال (Substitution)" page="245">
            <p className="text-lg text-gray-200 mb-6">
              تفاعل تحل فيه ذرة أو مجموعة ذرية محل ذرة أو مجموعة ذرية أخرى في المركب.
            </p>
            <div className="bg-black/40 p-6 rounded-2xl border border-white/10 mb-6" dir="ltr">
              <BlockMath math="CH_4 + Cl_2 \xrightarrow{UV} CH_3Cl + HCl" />
            </div>
            <Quiz 
              page="246"
              question="ما نوع التفاعل التالي: CH3CH3 + Cl2 -> CH3CH2Cl + HCl؟"
              options={["إضافة", "استبدال", "حذف", "تكاثف"]}
              correctAnswer={1}
            />
          </GlassCard>

          <GlassCard title="2. تفاعلات الإضافة (Addition)" page="247">
            <p className="text-lg text-gray-200 mb-6">
              تفاعل يتم فيه كسر الرابطة الثنائية أو الثلاثية لإضافة ذرات جديدة للمركب.
            </p>
            <div className="space-y-4 mb-6" dir="ltr">
              <div className="bg-black/40 p-4 rounded-xl border border-white/10">
                <BlockMath math="CH_2=CH_2 + H_2 \xrightarrow{Pt} CH_3-CH_3" />
              </div>
              <div className="bg-black/40 p-4 rounded-xl border border-white/10">
                <BlockMath math="CH \equiv CH + 2H_2 \xrightarrow{Pt} CH_3-CH_3" />
              </div>
              <div className="bg-black/40 p-4 rounded-xl border border-white/10">
                <BlockMath math="CH_2=CH_2 + Cl_2 \to CH_2Cl-CH_2Cl" />
              </div>
            </div>
            <Quiz 
              page="248"
              question="تفاعل الهدرجة (إضافة الهيدروجين) يحول الألكين إلى:"
              options={["ألكان", "ألكاين", "كحول", "إيثر"]}
              correctAnswer={0}
            />
          </GlassCard>

          <GlassCard title="3. تفاعلات الحذف (Elimination)" page="249">
            <p className="text-lg text-gray-200 mb-6">
              تفاعل يتم فيه سحب ذرات من المركب لتكوين رابطة ثنائية أو ثلاثية.
            </p>
            <div className="bg-black/40 p-6 rounded-2xl border border-white/10 mb-6" dir="ltr">
              <BlockMath math="CH_3-CH_2-OH \xrightarrow{H_2SO_4} CH_2=CH_2 + H_2O" />
            </div>
            <Quiz 
              page="249"
              question="ماذا ينتج عن حذف الماء من الإيثانول؟"
              options={["إيثان", "إيثين", "إيثاين", "إيثانال"]}
              correctAnswer={1}
            />
          </GlassCard>

          <GlassCard title="4. تفاعلات التكاثف (Condensation)" page="250">
            <p className="text-lg text-gray-200 mb-6">
              ارتباط جزيئين صغيرين لتكوين جزيء أكبر مع فقد جزيء صغير مثل الماء.
            </p>
            <div className="bg-black/40 p-6 rounded-2xl border border-white/10 mb-6" dir="ltr">
              <BlockMath math="CH_3-CH_2-OH + CH_3-OH \to CH_3-CH_2-O-CH_3 + H_2O" />
            </div>
            <Quiz 
              page="250"
              question="تفاعل تكوين الإيثر من كحولين يعتبر تفاعل:"
              options={["إضافة", "حذف", "تكاثف", "استبدال"]}
              correctAnswer={2}
            />
          </GlassCard>

          <ComparisonTable 
            title="تحديد نوع التفاعل"
            page="251"
            headers={["المعادلة الكيميائية", "نوع التفاعل"]}
            rows={[
              [<InlineMath math="CH_3CH_3 + Br_2 \to CH_3CH_2Br + HBr" />, "استبدال"],
              [<InlineMath math="CH_2=CH_2 + H_2O \to CH_3CH_2OH" />, "إضافة"],
              [<InlineMath math="CH_3CH_2Cl \to CH_2=CH_2 + HCl" />, "حذف"],
              [<InlineMath math="RCOOH + ROH \to RCOOR + H_2O" />, "تكاثف"]
            ]}
          />
        </div>

        {/* Section 3: Polymers */}
        <SectionHeader title="القسم الثالث: البوليمرات" icon={Grid} />
        
        <Definition title="البوليمر" page="252">
          جزيئات كبيرة جداً تتكون من العديد من الوحدات البنائية المتكررة (المونومرات).
        </Definition>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <GlassCard title="أنواع البوليمرات حسب المصدر" page="252">
            <ul className="space-y-4 text-lg text-gray-200">
              <li className="flex items-start gap-3">
                <CircleDot className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" />
                <span><strong>طبيعية:</strong> مثل السليلوز، النشا، والبروتينات.</span>
              </li>
              <li className="flex items-start gap-3">
                <CircleDot className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" />
                <span><strong>صناعية:</strong> مثل البلاستيك، النايلون، والبولي إيثيلين.</span>
              </li>
            </ul>
          </GlassCard>
          <GlassCard title="التصنيف حسب الحرارة" page="252">
            <ul className="space-y-4 text-lg text-gray-200">
              <li className="flex items-start gap-3">
                <CircleDot className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" />
                <span><strong>مطاوعة للحرارة:</strong> تلين بالحرارة ويمكن إعادة تشكيلها (مثل البولي إيثيلين).</span>
              </li>
              <li className="flex items-start gap-3">
                <CircleDot className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" />
                <span><strong>غير مطاوعة للحرارة:</strong> لا تلين بالحرارة وتتحلل عند تسخينها (مثل الباكليت).</span>
              </li>
            </ul>
          </GlassCard>
        </div>

        <div className="space-y-8">
          <GlassCard title="المطاط والفلكنة" page="253">
            <p className="text-lg text-gray-200 leading-relaxed">
              المطاط الطبيعي بوليمر يتكون من وحدات الأيزوبرين. <strong>الفلكنة</strong> هي عملية تسخين المطاط مع الكبريت لجعله أكثر صلابة ومرونة وأقل تأثراً بالحرارة.
            </p>
          </GlassCard>

          <GlassCard title="بوليمرات التكاثف الهامة" page="254">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h5 className="text-cyan-400 font-black mb-3">النايلون 66</h5>
                <p className="text-gray-300">يستخدم في صناعة الألياف والمنسوجات والحبال.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h5 className="text-cyan-400 font-black mb-3">الكفلار (Kevlar)</h5>
                <p className="text-gray-300">بوليمر قوي جداً يستخدم في صناعة السترات الواقية من الرصاص.</p>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6 my-12">
          <Quiz 
            page="255"
            question="أي من البوليمرات التالية يعتبر طبيعياً؟"
            options={["النايلون", "البولي إيثيلين", "النشا", "PVC"]}
            correctAnswer={2}
          />
          <Quiz 
            page="255"
            question="ما هي المادة المضافة للمطاط في عملية الفلكنة؟"
            options={["الكلور", "الكبريت", "الهيدروجين", "الأكسجين"]}
            correctAnswer={1}
          />
          <Quiz 
            page="256"
            question="أي بوليمر يستخدم في صناعة السترات الواقية من الرصاص؟"
            options={["النايلون", "البوليستر", "الكفلار", "المطاط"]}
            correctAnswer={2}
          />
          <Quiz 
            page="256"
            question="الوحدات البنائية المتكررة في البوليمر تسمى:"
            options={["أيونات", "مونومرات", "نظائر", "محفزات"]}
            correctAnswer={1}
          />
        </div>

        <TeacherNote title="خاتمة الفصل">
          بهذا نكون قد انتهينا من دراسة المركبات العضوية وتفاعلاتها والبوليمرات. تمنياتي لكم بالتوفيق والنجاح الدائم.
        </TeacherNote>

      </div>
    </div>
  );
};

export default Ch10_spiderman;
