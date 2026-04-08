import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { 
  FlaskConical, Zap, Activity, Droplets, BookOpen, 
  Calculator, CheckCircle2, Lightbulb, AlertTriangle, 
  ArrowRightLeft, Thermometer, Beaker, Info, ShieldAlert,
  Target, Layers, Flame, Grid, Hexagon, Wind, Atom, ChevronRight, CircleDot, ArrowUp, Factory
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

const TeacherNote = ({ children, title = "إعداد الأستاذ أحمد قاسم محمد" }: { children: React.ReactNode, title?: string }) => (
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

const ComparisonTable = ({ headers, rows, title }: { headers: string[], rows: any[][], title?: string }) => (
  <div className="my-12 w-full">
    {title && <h5 className="text-2xl font-black text-white mb-6 flex items-center gap-2"><Layers className="w-6 h-6 text-cyan-400" /> {title}</h5>}
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
            className={`p-4 rounded-2xl text-right transition-all border text-lg ${
              showResult 
                ? i === correctAnswer 
                  ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
                  : i === selected ? "bg-red-500/20 border-red-500 text-red-400" : "bg-white/5 border-white/10 text-gray-400 opacity-50"
                : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-cyan-500/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">{String.fromCharCode(65 + i)}</span>
              {opt}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Main Component ---

export default function Ch2_Acids_Bases() {
  return (
    <div className="max-w-6xl mx-auto space-y-20 pb-32 px-4" dir="rtl">
      
      {/* Cover Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-24 border-b border-white/10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_70%)] pointer-events-none" />
        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
          الكيمياء
        </h1>
        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8">
          الفصل الثاني الكورس الاول: الاحماض والقواعد
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <span className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 font-bold">
            إعداد الأستاذ أحمد قاسم محمد
          </span>
          <span className="px-6 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold">
            الكورس الأول
          </span>
          <span className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 font-bold">
          يوسف صباح
          </span>
        </div>
      </motion.div>

      {/* القسم 2-1: خصائص الأحماض والقواعد */}
      <section id="characteristics">
        <SectionHeader title="القسم 2-1: خصائص الأحماض والقواعد" icon={FlaskConical} />
        <GlassCard page="66">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ComparisonTable 
              title="أحماض شائعة في الغذاء"
              headers={["الحمض", "مكان الوجود"]}
              rows={[
                ["حمض اللاكتيك", "في اللبن"],
                ["حمض الأسيتيك", "في الخل"],
                ["حمض السيتريك", "في الحمضيات (ليمون وبرتقال وجريب فروت)"],
                ["حمض الفوسفوريك", "في المشروبات الغازية"],
                ["حمض الطرطريك", "في العنب"],
                ["حمض الماليك", "في التفاح"],
                ["حمض (البنزويك والسوربيك والفوسفوريك والكربونيك)", "موجود في الليمون"],
                ["حمض (الستريك والأسكوربيك)", "موجود في العصائر"]
              ]}
            />
            <ComparisonTable 
              title="قواعد شائعة الاستعمال"
              headers={["القاعدة", "مكان الوجود / الاستعمال"]}
              rows={[
                ["الأمونيا", <><InlineMath math="NH_3" /> في عمليات التنظيف العامة</>],
                ["هيدروكسيد الصوديوم", <><InlineMath math="NaOH" /> مكون المنظفات</>],
                ["كربونات الصوديوم الهيدروجينية", <><InlineMath math="NaHCO_3" /> تستخدم كمضاد للحموضة</>],
                ["هيدروكسيد الألمنيوم", <><InlineMath math="Al(OH)_3" /> مضاد للحموضة</>],
                ["حليب الماغنيسيا", <><InlineMath math="Mg(OH)_2" /> (معلق مائي) يستخدم كمضاد للحموضة وملين</>]
              ]}
            />
          </div>

          <TeacherNote>
            حمض (البنزويك والسوربيك والفوسفوريك والكربونيك) يستخدم لازالة الافرازات الزائدة في المعدة.
          </TeacherNote>

          <ComparisonTable 
            title="مقارنة بين خصائص الأحماض والقواعد"
            headers={["خصائص الأحماض", "خصائص القواعد"]}
            rows={[
              ["مذاق محاليلها المائية حامض. ولكن يجب عدم التذوق لانها مواد سامة.", "مذاق محاليلها المائية مر وتسبب الحروق."],
              ["الكاشف (الى لون الاحمر عند غمصه PH يحول لون ورقة) في الاحماض. تغير ألوان الكواشف", "تغير محاليلها ألوان الكواشف الى اللون الازرق."],
              ["بعضها يتفاعل مع الفلزات النشطة وينطلق غاز الهيدروجين.", "محاليلها المائية المخففة ذات ملمس صابوني."],
              ["تتفاعل مع القواعد معطية ملحا وماء", "تختفي خصائص القاعدة عند اضافة كمية مكافئة من الحمض"],
              ["محاليلها المائية موصلة للكهرباء.", "تتفاعل مع الاحماض معطية ملحا وماء"]
            ]}
          />
          <p className="text-gray-400 text-lg mt-4 border-r-4 border-white/20 pr-4 italic">
            محاليلها المائية موصلة للكهرباء. لانه ينتج اما ايونات كثيرة أو قليلة حسب الحمض او القاعدة.
          </p>
        </GlassCard>
      </section>

      {/* تسمية الأحماض */}
      <section id="naming">
        <SectionHeader title="تسمية الأحماض" icon={BookOpen} />
        <GlassCard page="66">
          <div className="space-y-8">
            <Definition title="تعريف الحمض الثنائي">
              حمض يحتوي على عنصرين فقط هما الهيدروجين وعنصر آخر أكثر سالبية كهربائية / أي هايدروجين و الانيون (الجزء السالب).
            </Definition>

            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h4 className="text-2xl font-black text-cyan-400 mb-6">من الأحماض غير العضوية الشائعة:</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4" dir="ltr">
                <div className="p-4 bg-black/40 rounded-xl text-center font-bold text-xl border border-white/5"><InlineMath math="HF" /></div>
                <div className="p-4 bg-black/40 rounded-xl text-center font-bold text-xl border border-white/5"><InlineMath math="HCl" /></div>
                <div className="p-4 bg-black/40 rounded-xl text-center font-bold text-xl border border-white/5"><InlineMath math="HBr" /></div>
                <div className="p-4 bg-black/40 rounded-xl text-center font-bold text-xl border border-white/5"><InlineMath math="HI" /></div>
                <div className="p-4 bg-black/40 rounded-xl text-center font-bold text-xl border border-white/5"><InlineMath math="H_2S" /></div>
              </div>
              <p className="text-gray-300 text-lg mt-6 leading-relaxed bg-cyan-500/5 p-4 rounded-xl">
                حيث هذه الاحماض عبارة عن غازات في حالتها النقية ولكن محاليلها المائية تكون أحماض.
              </p>
            </div>

            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h4 className="text-2xl font-black text-cyan-400 mb-6">تسمية الأحماض الثنائية:</h4>
              <ul className="space-y-4 text-gray-200 text-xl list-none pr-0">
                <li className="flex items-center gap-3"><CircleDot className="w-5 h-5 text-cyan-500" /> يبدأ بالبادئة (هيدرو - 1)</li>
                <li className="flex items-center gap-3"><CircleDot className="w-5 h-5 text-cyan-500" /> يتبع جذر اسم العنصر الثاني - 2</li>
                <li className="flex items-center gap-3"><CircleDot className="w-5 h-5 text-cyan-500" /> ينتهي باللاحقة (يك - 3)</li>
              </ul>
              <div className="mt-8 p-8 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-center text-2xl font-bold shadow-inner">
                حامض + هيدرو + اسم العنصر اللافلزي + يك
              </div>
              <TeacherNote>
                حيث يعتبر حمض <InlineMath math="HCN" /> من الاحماض شبه الثنائية.
              </TeacherNote>
            </div>

            <ComparisonTable 
              headers={["الصيغة", "اسم الحمض"]}
              rows={[
                [<InlineMath math="HF" />, "حمض هيدروفلوريك"],
                [<InlineMath math="HCl" />, "حمض هيدروكلوريك"],
                [<InlineMath math="HBr" />, "حمض هيدروبروميك"],
                [<InlineMath math="HI" />, "حمض هيدرويوديك"],
                [<InlineMath math="H_2S" />, "حمض هيدروكبريتيك"],
                [<InlineMath math="HCN" />, "حمض هيدروسيانيك"]
              ]}
            />

            <Definition title="تعريف الحمض الأكسجيني" page="67">
              حمض يتكون من الهيدروجين والأكسجين وعنصر ثالث لافلزي في الغالب.
            </Definition>

            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h4 className="text-2xl font-black text-cyan-400 mb-6 italic">قواعد تحويل الأيون إلى حمض:</h4>
              <ul className="space-y-6 text-gray-200 text-xl">
                <li className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                  <span className="text-cyan-400 font-black text-2xl">يك</span>
                  <span>حيث كل أيون ينتهي بـ (أت) فعند تحويله الى حامض يتحول الى (يك)</span>
                </li>
                <li className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                  <span className="text-amber-400 font-black text-2xl">وز</span>
                  <span>حيث كل أيون ينتهي بـ (يت) فعند تحويله الى حامض يتحول الى (وز)</span>
                </li>
              </ul>
            </div>

            <ComparisonTable 
              headers={["ايون متعدد الذرات", "اسم الايون", "اسم الحمض", "اسم الحمض"]}
              rows={[
                [<InlineMath math="NO_2^{-1}" />, "نتريت", "حمض نتروز", <InlineMath math="HNO_2" />],
                [<InlineMath math="NO_3^{-1}" />, "نترات", "حمض نتريك", <InlineMath math="HNO_3" />],
                [<InlineMath math="ClO^{-1}" />, "هيبوكلوريت", "حمض هيبوكلوروز", <InlineMath math="HClO" />],
                [<InlineMath math="ClO_2^{-1}" />, "كلوريت", "حمض كلوروز", <InlineMath math="HClO_2" />],
                [<InlineMath math="ClO_3^{-1}" />, "كلورات", "حمض كلوريك", <InlineMath math="HClO_3" />],
                [<InlineMath math="ClO_4^{-1}" />, "بيركلورات", "حمض بيركلوريك", <InlineMath math="HClO_4" />],
                [<InlineMath math="IO^{-1}" />, "هيبويوديت", "حمض هيبويودوز", <InlineMath math="HIO" />],
                [<InlineMath math="IO_2^{-1}" />, "يوديت", "حمض يودوز", <InlineMath math="HIO_2" />],
                [<InlineMath math="IO_3^{-1}" />, "يودات", "حمض يوديك", <InlineMath math="HIO_3" />],
                [<InlineMath math="IO_4^{-1}" />, "بيريودات", "حمض بيريوديك", <InlineMath math="HIO_4" />],
                [<InlineMath math="SO_3^{-2}" />, "كبريتيت", "حمض كبريتوز", <InlineMath math="H_2SO_3" />],
                [<InlineMath math="SO_4^{-2}" />, "كبريتات", "حمض الكبريتيك", <InlineMath math="H_2SO_4" />],
                [<InlineMath math="CO_3^{-2}" />, "كربونات", "حمض الكاربونيك", <InlineMath math="H_2CO_3" />],
                [<InlineMath math="SeO_4^{-2}" />, "سلينات", "حمض السلينيك", <InlineMath math="H_2SeO_4" />],
                [<InlineMath math="PO_3^{-3}" />, "فوسفيت", "حمض الفوسفوروز", <InlineMath math="H_3PO_3" />],
                [<InlineMath math="PO_4^{-3}" />, "فوسفات", "حمض الفوسفوريك", <InlineMath math="H_3PO_4" />]
              ]}
            />
          </div>
        </GlassCard>
      </section>

      {/* تصنيف الأحماض والقواعد */}
      <section id="classification">
        <SectionHeader title="تصنيف الأحماض والقواعد" icon={Layers} />
        <GlassCard page="67">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h4 className="text-3xl font-black text-red-400 border-r-4 border-red-500 pr-4">أحماض الشائعة القوية</h4>
              <div className="space-y-4" dir="ltr">
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="HCl + H_2O \rightarrow H_3O^+ + Cl^-" /></div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="HBr + H_2O \rightarrow H_3O^+ + Br^-" /></div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="HI + H_2O \rightarrow H_3O^+ + I^-" /></div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="HClO_3 + H_2O \rightarrow H_3O^+ + ClO_3^-" /></div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="HClO_4 + H_2O \rightarrow H_3O^+ + ClO_4^-" /></div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="H_2SO_4 + H_2O \rightarrow H_3O^+ + HSO_4^-" /></div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="HNO_3 + H_2O \rightarrow H_3O^+ + NO_3^-" /></div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="H_2CrO_4 + H_2O \rightarrow H_3O^+ + HCrO_4^-" /></div>
              </div>
              <p className="text-gray-400 font-bold bg-red-500/5 p-3 rounded-lg text-center tracking-widest">تام التأين في محاليلها المائية</p>
              <div className="p-4 bg-red-500/10 rounded-xl space-y-2">
                <p className="text-gray-300">قطبية عالية وطاقة الرابطة للجزيئة ضعيفة</p>
                <p className="text-gray-300">التوصيلية عالية</p>
                <p className="text-gray-300">عند الذوبان في الماء يصبح حمض أرهينيوس</p>
                <p className="text-gray-300">محلول المائي له يحتوي على جزء متأين فقط</p>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-3xl font-black text-amber-400 border-r-4 border-amber-500 pr-4">أحماض الشائعة الضعيفة</h4>
              <div className="space-y-4" dir="ltr">
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="HSO_4^- + H_2O \rightleftharpoons H_3O^+ + SO_4^{-2}" /></div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="H_3PO_4 + H_2O \rightleftharpoons H_3O^+ + H_2PO_4^-" /></div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="HF + H_2O \rightleftharpoons H_3O^+ + F^-" /></div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="CH_3COOH + H_2O \rightleftharpoons H_3O^+ + CH_3COO^-" /></div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="H_2CO_3 + H_2O \rightleftharpoons H_3O^+ + HCO_3^-" /></div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="H_2S + H_2O \rightleftharpoons H_3O^+ + HS^-" /></div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="HCN + H_2O \rightleftharpoons H_3O^+ + CN^-" /></div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="HCO_3^- + H_2O \rightleftharpoons H_3O^+ + CO_3^{-2}" /></div>
              </div>
              <p className="text-gray-400 font-bold bg-amber-500/5 p-3 rounded-lg text-center tracking-widest">ضعيفة التأين في محاليلها المائية</p>
              <div className="p-4 bg-amber-500/10 rounded-xl space-y-2">
                <p className="text-gray-300">قطبية منخفضة وطاقة الرابطة للجزيئة قوية (عالية)</p>
                <p className="text-gray-300">التوصيلية ضعيفة</p>
                <p className="text-gray-300">عند الذوبان في الماء يصبح حمض أرهينيوس</p>
                <p className="text-gray-300">محلول المائي له يحتوي على جزء متأين وغير متأين</p>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="mt-12" page="68">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h4 className="text-3xl font-black text-blue-400 border-r-4 border-blue-500 pr-4">القواعد القوية</h4>
              <p className="text-gray-300 text-lg">مركبات ايونية تحتوي على كاتيون فلزي و انيون الهيدروكسيد</p>
              <div className="space-y-4" dir="ltr">
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="NaOH \rightarrow Na^+ + OH^-" /></div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="KOH \rightarrow K^+ + OH^-" /></div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="LiOH \rightarrow Li^+ + OH^-" /></div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="RbOH \rightarrow Rb^+ + OH^-" /></div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="CsOH \rightarrow Cs^+ + OH^-" /></div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="Ca(OH)_2 \rightarrow Ca^{+2} + 2OH^-" /></div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="Sr(OH)_2 \rightarrow Sr^{+2} + 2OH^-" /></div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="Ba(OH)_2 \rightarrow Ba^{+2} + 2OH^-" /></div>
              </div>
              <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20 space-y-2">
                <p className="text-gray-300">تام التفكك</p>
                <p className="text-gray-300">له اواصر ايونية</p>
                <p className="text-gray-300">توصيلية جيدة للكهرباء</p>
                <p className="text-blue-400 font-bold">OH نسبة عالية</p>
                <p className="text-gray-300">عند اذابته في الماء تصبح قاعدة ارهينيوس</p>
                <p className="text-gray-300">محلول المائي له يحتوي على جزء المتفكك فقط</p>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-3xl font-black text-purple-400 border-r-4 border-purple-500 pr-4">القواعد الضعيفة</h4>
              <p className="text-gray-300 text-lg">مركبات جزيئية تنتج <InlineMath math="OH^-" /> عند تفاعلها مع الماء.</p>
              <div className="space-y-4" dir="ltr">
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="NH_3 + H_2O \rightleftharpoons NH_4^+ + OH^-" /></div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="C_6H_5NH_2 + H_2O \rightleftharpoons C_6H_5NH_3^+ + OH^-" /></div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5"><InlineMath math="C_5H_5N + H_2O \rightleftharpoons C_5H_5NH^+ + OH^-" /></div>
              </div>
              <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/20 space-y-2">
                <p className="text-gray-300">تاين ضعيف</p>
                <p className="text-gray-300">له اواصر تساهمية</p>
                <p className="text-gray-300">ضعيف التوصيل الكهربائي</p>
                <p className="text-purple-400 font-bold">OH نسبة قليلة</p>
                <p className="text-gray-300">عند اذابته في الماء تصبح قاعدة ارهينيوس</p>
                <p className="text-gray-300">محلول المائي له يحتوي على جزء متأين وغير متأين</p>
              </div>
            </div>
          </div>

          <TeacherNote>
            ملاحظة / المركبات العضوية التي تحتوي على النيتروجين يعتبر قواعد ضعيفة مثلا (الكودايين <InlineMath math="C_{18}H_{21}NO_3" />) المستعمل كمسكن للألم ومهدى للسعال قاعدة ضعيفة.
          </TeacherNote>
          <TeacherNote>
            ليس كل مركب يحتوي على H يعني حمض مثل <InlineMath math="NH_3" /> الذي يعتبر قاعدة ضعيفة.
          </TeacherNote>
        </GlassCard>
      </section>

      {/* أسئلة اختبر نفسك 1 */}
      <section>
        <Quiz 
          page="68"
          question="1/ أي الخواص التالية لالاتميز الحمض ؟"
          options={[
            "يغير اللون الكواشف",
            "ينتج أيونات OH-",
            "يتأين في الماء",
            "ينتج أيونات الهيدرونيوم في الماء"
          ]}
          correctAnswer={1}
        />
        <Quiz 
          page="68"
          question="2/ أي مما يلي حمض قوي ؟"
          options={[
            "H3PO4",
            "CH3COOH",
            "H2SO4",
            "HSO4-1"
          ]}
          correctAnswer={2}
        />
        <Quiz 
          page="68"
          question="3/ عندمايتفاعل حامض ما مع فلزنشط؟"
          options={[
            "يزداد تركيز ايونات الهيدرونيوم",
            "ينتج غاز الهيدروجين",
            "يكون الفلز انيونات",
            "ينتج غاز ثنائي اكسيد الكربون"
          ]}
          correctAnswer={1}
        />
      </section>

      {/* بعض الأحماض الصناعية الشائعة */}
      <section id="industrial">
        <SectionHeader title="بعض الأحماض الصناعية الشائعة" icon={Flame} />
        <GlassCard page="69">
          <ComparisonTable 
            headers={["الحمض", "مميزاته", "استعمالاته"]}
            rows={[
              [
                <div className="font-bold">حمض الكبريتيك <InlineMath math="H_2SO_4" /></div>,
                "أ / لها القابلية على امتصاص الماء / ولذلك يستعمل المركز منه لازالة الماء من الغازات التي لالا تتفاعل معها ومن السكر وغيره من المواد العضوية. ب/ حامض الكبريتيك المركز يتفاعل مع الجلد (لان الجلد يحتوي على مركبات عضوية) وتسبب حروقا خطرة (تؤكسد الجلد).",
                "أ / تكرير البترول والتعدين والالاسمدة. ب/ صناعة الورق والدهانات والألأصباغ والمنظفات. ج/ صناعة بطاريات السيارات."
              ],
              [
                <div className="font-bold">حمض النتريك <InlineMath math="HNO_3" /></div>,
                "أ / النقي منه سائل متطاير وغير مستقر ويصبح أكثر استقرارا عند اذابته في الماء. ب/ هذه الحامض يكسب البروتينات لونا اصفر (أي عند غمز ريش الطير التي يحتوي على بروتينات في هذه المحلول فانه يتحول الى لون اصفر). جـ/ رائحة الحامض يسبب الاختناق. د/ تسبب حروقا عند سقوطه على الجلد. هـ / يكون لون الحامض في البداية عديم اللون وبمرور الزمن يصبح اصفر اللون نتيجة تفكك القليل من الحامض وتحوله الى NO2.",
                "أ / صناعة المتفجرات. ب/ صناعة المطاط والبلاستيك والألأصباغ والمستحضرات الطبية."
              ],
              [
                <div className="font-bold">حمض الفوسفوريك <InlineMath math="H_3PO_4" /></div>,
                "أ / المخفف منه له مذاق حمض غير سام. ب/ المخفف منه يستعمل كعامل منكه للمشروبات وعامل منظف لمعدات مصانع الألبان.",
                "أ / صناعة الالاسمدة وعلف الحيوانات. ب/ له دور مهم في صناعة المنظفات والسيراميك."
              ],
              [
                <div className="font-bold">حمض الهيدروكلوريك <InlineMath math="HCl" /></div>,
                "أ / توجد في معدة الالانسان لتساعده في عملية الهضم. ب/ المحلول المركز منه تحافظ على درجة الحموضة الصحيحة لمياه المسابح.",
                "أ / تستعمل في تنظيف اسطح الحديد والفولاذ. ب/ تصنيع المواد الغذائية واستخلاص Mg من مياه البحر."
              ],
              [
                <div className="font-bold">حمض الأسيتيك <InlineMath math="CH_3COOH" /></div>,
                "أ / النقي سائل عديم اللون وله رائحة حادة. ب/ يسمى بالحامض الالاستيتيك الثلجي لالاته يتجمد عند 17C. جـ/ تكون بلورات في الألأوساط الباردة.",
                "أ / تستعمل في صناعة البلاستيك. ب/ كمبيد للفطريات. جـ/ يصنع الخل الذي يحتوي على حامض الالاستيتيك عن طريق تخمير بعض النباتات. حيث يحتوي خل الالابيض على نسبة من 4-8% من حمض الالاستيتيك."
              ]
            ]}
          />
        </GlassCard>
      </section>

      {/* قوة الأحماض والقواعد */}
      <section id="strength">
        <SectionHeader title="قوة الأحماض والقواعد" icon={ShieldAlert} />
        <GlassCard page="71">
          <div className="space-y-8">
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h4 className="text-2xl font-black text-cyan-400 mb-6">تعتمد قوة الحمض على:</h4>
              <ul className="space-y-6 text-gray-200 text-xl">
                <li className="flex items-center gap-3"><CircleDot className="w-5 h-5 text-cyan-500" /> قطبية الرابطة بين الهيدروجين والعنصر المرتبط به 1/</li>
                <li className="flex items-center gap-3"><CircleDot className="w-5 h-5 text-cyan-500" /> طاقة الرابطة (أي سهولة كسره) 2/</li>
              </ul>
              <p className="text-gray-300 text-lg mt-6 bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20">
                تزداد قوة الحمض بـ: <span className="text-cyan-400 font-bold">زيادة قطبية الرابطة 1/</span> و <span className="text-red-400 font-bold">انخفاض طاقة الرابطة 2/</span>.
              </p>
              <TeacherNote>
                لالا تعتمد على عدد ذرات الهايدروجين الموجودة في الجزيئة مثلا <InlineMath math="HCl" /> و <InlineMath math="H_3PO_4" /> حيث يعتبر حمض الهيدروكلوريك هو حمض أقوى من حمض الفوسفوريك.
              </TeacherNote>
            </div>

            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h4 className="text-2xl font-black text-cyan-400 mb-6">تعتمد قوة القواعد على:</h4>
              <ul className="space-y-6 text-gray-200 text-xl">
                <li className="flex items-center gap-3"><CircleDot className="w-5 h-5 text-cyan-500" /> درجة تفككها 1/</li>
                <li className="flex items-center gap-3"><CircleDot className="w-5 h-5 text-cyan-500" /> مدى تزويدها للمحلول المائي بأيونات هيدروكسيد (أي تركيز الهيدروكسيد وليس على عدد أيونات الهيدروكسيد الموجودة في المركب الذائب) 2/</li>
              </ul>
              <TeacherNote>
                س/ تعتبر الألأمونيا إلكتروليتا ضعيفا (قاعدة ضعيفة) على الرغم من أنها جيدة الذوبان في الماء، لماذا؟ الجواب / لألأن تركيز أيونات الهيدروكسيد قليل في محلولها.
              </TeacherNote>
              <TeacherNote>
                عند تحضير محلول حامضي مخفف يتم اضافة حامض الى الماء وليس العكس ؟ وذلك لتجنب تطاير الحامض المركز الاكثر كثافة مع انطلاق طاقة حرارية بشكل بطيء.
              </TeacherNote>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* نظريات الأحماض والقواعد */}
      <section id="theories">
        <SectionHeader title="نظريات الأحماض والقواعد" icon={Activity} />
        
        {/* نظرية أرهينيوس */}
        <GlassCard title="1/ نظرية أرهينيوس" page="77">
          <div className="space-y-8">
            <ul className="space-y-4 text-gray-200 text-xl">
              <li className="flex items-start gap-3"><CircleDot className="w-5 h-5 text-cyan-500 mt-1 shrink-0" /> اساس النظرية هو ان المحاليل المائية للأحماض والقواعد موصلة للتيار الكهربائي.</li>
              <li className="flex items-start gap-3"><CircleDot className="w-5 h-5 text-cyan-500 mt-1 shrink-0" /> استنتج ان الاحماض والقواعد تنتج ايونات موجبة وسالبة في محاليلها المائية.</li>
            </ul>
            <Definition title="حمض أرهينيوس">
              مركب كيميائي (جزيئي) يزيد من تركيز أيون الهيدروجين <InlineMath math="H^+" /> في المحلول المائي.
            </Definition>
            <Definition title="قاعدة أرهينيوس">
              مركب كيميائي (مركب أيوني أو جزيئي) يزيد من تركيز أيون الهيدروكسيد <InlineMath math="OH^-" /> في المحلول المائي.
            </Definition>
            <TeacherNote>
              لالاتوجد تفاعل حمض - قاعدة ارهينيوس. توجد تفاعل حمض مع الماء أو قاعدة مع الماء. الماء يعتبر مذيب فقط.
            </TeacherNote>
            <div className="space-y-4" dir="ltr">
              <div className="p-4 bg-black/20 rounded-xl text-center border border-white/5"><InlineMath math="HNO_3 + H_2O \rightarrow H_3O^+ + NO_3^-" /> (حمض ارهينيوس)</div>
              <div className="p-4 bg-black/20 rounded-xl text-center border border-white/5"><InlineMath math="NH_3 + H_2O \rightleftharpoons NH_4^+ + OH^-" /> (قاعدة ارهينيوس)</div>
            </div>
          </div>
        </GlassCard>

        {/* نظرية برونشتد – لوري */}
        <GlassCard title="2/ نظرية برونشتد – لوري" className="mt-12" page="78">
          <div className="space-y-8">
            <ul className="space-y-4 text-gray-200 text-xl">
              <li className="flex items-start gap-3"><CircleDot className="w-5 h-5 text-cyan-500 mt-1 shrink-0" /> أساس النظرية يركز على دور البروتون (أي منح بروتون أو استقباله).</li>
            </ul>
            <Definition title="حمض برونشتد – لوري">
              جزيء أو أيون مانح للبروتون. يقصد بـ <InlineMath math="H^+" />.
            </Definition>
            <Definition title="قاعدة برونشتد – لوري">
              جزيء أو أيون مستقبل للبروتون. يقصد بـ <InlineMath math="H^+" />.
            </Definition>
            <ul className="space-y-4 text-gray-200 text-xl">
              <li className="flex items-start gap-3"><CircleDot className="w-5 h-5 text-cyan-500 mt-1 shrink-0" /> يوصف تفاعلات الحمض مع القاعدة.</li>
              <li className="flex items-start gap-3"><CircleDot className="w-5 h-5 text-cyan-500 mt-1 shrink-0" /> لالا يشترط ان تكون المواد ذائبة في الماء.</li>
              <li className="flex items-start gap-3"><CircleDot className="w-5 h-5 text-cyan-500 mt-1 shrink-0" /> تعتبر الماء امفوتيري (حمض أو قاعدة) حسب برونشتد – لوري.</li>
              <li className="flex items-start gap-3"><CircleDot className="w-5 h-5 text-cyan-500 mt-1 shrink-0" /> قوة جزيئة الماء تعتمد على قوة الحمض أو القاعدة المتفاعلة معه.</li>
            </ul>
            <div className="space-y-4" dir="ltr">
              <div className="p-4 bg-black/20 rounded-xl text-center border border-white/5"><InlineMath math="HNO_3 + H_2O \rightarrow H_3O^+ + NO_3^-" /> (حمض قوي + قاعدة قوية)</div>
              <div className="p-4 bg-black/20 rounded-xl text-center border border-white/5"><InlineMath math="NH_3 + H_2O \rightleftharpoons NH_4^+ + OH^-" /> (قاعدة ضعيفة + حمض ضعيف)</div>
            </div>
          </div>
        </GlassCard>

        {/* المرافقات */}
        <GlassCard title="المرافقات" className="mt-12" page="81">
          <div className="space-y-8">
            <Definition title="الحمض المرافق">
              (جزيئة أو أيون) ينتج بعد أن تستقبل قاعدة برونشتد - لوري بروتونا.
            </Definition>
            <Definition title="القاعدة المرافقة">
              (جزيئة أو أيون) ينتج بعد أن يعطي حمض برونشتد - لوري بروتونا.
            </Definition>
            <TeacherNote>
              تفاعلات الحمض – القاعدة لبرونشتد و لوري : هي أنظمة اتزان أي أن التفاعلين الأمامي والعكسي يحدثان في نفس الوقت ويتضمان بالتالي: أ/ 2 من الازواج المرافقة، ب/ 2 أحماض و 2 قواعد.
            </TeacherNote>
            <TeacherNote title="قوة الأحماض والقواعد المرافقة">
              تعتمد درجة التفاعل بين حمض وقاعدة برونشتد – لوري على القوة النسبية للأحماض والقواعد المتفاعلة.
              <br/>
              الاستنتاج : كلما كان: الحمض أقوى تكون قاعدته المرافقة أضعف والقاعدة أقوى يكون حمضها المرافق أضعف.
            </TeacherNote>
            <ComparisonTable 
              title="شروط الازواج المرافقة"
              headers={["الشرط", "التوضيح"]}
              rows={[
                ["1/ واحد فقط (H) يجب ان تكون الفرق بروتون", "مثال: HPO4-2 و PO4-3"],
                ["2/ يجب وجود أساس (أساس) متشابه", "مثال: NH3 و NH4+"]
              ]}
            />
          </div>
        </GlassCard>

        {/* نظرية لويس */}
        <GlassCard title="3/ نظرية لويس" className="mt-12" page="84">
          <div className="space-y-8 text-xl text-gray-200">
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><CircleDot className="w-5 h-5 text-cyan-500 mt-1 shrink-0" /> تستند الى روابط الجزيء وتركيبه.</li>
              <li className="flex items-start gap-3"><CircleDot className="w-5 h-5 text-cyan-500 mt-1 shrink-0" /> تمثل الالاوس ع والالاشمل.</li>
              <li className="flex items-start gap-3"><CircleDot className="w-5 h-5 text-cyan-500 mt-1 shrink-0" /> لالا يشترط وجود الهيدروجين في أحماض لويس.</li>
            </ul>
            <Definition title="حمض لويس">
              ذرة أو جزيء أو أيون يستقبل زوجا من الإلكترونات ليكون رابطة تساهمية.
            </Definition>
            <Definition title="قاعدة لويس">
              ذرة أو جزيء أو أيون يمنح زوجا من الإلكترونات ليكون رابطة تساهمية.
            </Definition>
            <p className="text-gray-300 bg-white/5 p-4 rounded-xl border border-white/5">الناتج المركب واحد مرتبط برابطة تساهمية تناسقية.</p>
            <TeacherNote>
              Al و B اغلب المركبات التي تحتوي عليها تعتبر حوامض. كذرة N و O اغلب المركبات التي تحتوي عليها مركزية تعتبر قواعد.
            </TeacherNote>
          </div>
        </GlassCard>
      </section>

      {/* أنواع الأحماض من حيث البروتون */}
      <section id="acid-types">
        <SectionHeader title="أنواع الأحماض من حيث البروتون" icon={Atom} />
        <GlassCard page="88">
          <div className="space-y-10">
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h4 className="text-2xl font-black text-cyan-400 mb-6">1/ الحمض أحادي البروتون</h4>
              <p className="text-gray-200 text-xl leading-relaxed">
                الحمض الذي يمنح بروتون واحدا أيون الهيدروجين فقط من كل جزيء.
              </p>
              <p className="text-gray-400 mt-4 font-mono">أمثلة: <InlineMath math="HCl, HNO_3, HClO_4, CH_3COOH" />.</p>
              <TeacherNote>
                فانه يعتبر احادي البروتون أي فقط الهيدروجين المرتبط بالالاوكسجين قابل للتأين H بالرغم من احتواء حمض الالاستيك على 4.
              </TeacherNote>
            </div>

            <div className="p-8 bg-white/5 rounded-3xl border border-white/10" page="89">
              <h4 className="text-2xl font-black text-cyan-400 mb-6">2/ الحمض متعدد البروتون</h4>
              <p className="text-gray-200 text-xl leading-relaxed">
                الحمض الذي يمنح أكثر من بروتون من كل جزيء تتأين الأحماض المتعددة البروتون في أكثر من خطوة (مراحل متعددة).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h5 className="text-xl font-bold text-white mb-4">أ / الحمض ثنائي البروتون:</h5>
                  <p className="text-gray-300">هو الذي يمنح بروتونين اثنين من كل جزيء. أمثلة: <InlineMath math="H_2SO_4, H_2CO_3, H_2S" />.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10" page="90">
                  <h5 className="text-xl font-bold text-white mb-4">ب / الحمض ثلاثي البروتون:</h5>
                  <p className="text-gray-300">هو الذي يمنح ثلاث بروتونات من كل جزيء. مثال: <InlineMath math="H_3PO_4" />.</p>
                </div>
              </div>
              <TeacherNote>
                في معظم الأحماض متعددة البروتون: يكون تركيز الأيونات المتكونة في المرحلة الأولى هو الأكبر. وينخفض بحسب مراحل التأين.
              </TeacherNote>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* المواد الأمفوتيرية */}
      <section id="amphoteric">
        <SectionHeader title="المواد الأمفوتيرية" icon={ArrowRightLeft} />
        <GlassCard title="تعريف المواد الأمفوتيرية" page="92">
          <p className="text-gray-200 text-xl leading-relaxed mb-8">
            هي مواد تسلك سلوك الحمض في تفاعل وسلوك القاعدة في تفاعل آخر.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10 text-center">
              <h5 className="text-2xl font-black text-cyan-400 mb-4">مركب امفوتري</h5>
              <p className="text-gray-300 text-2xl" dir="ltr"><InlineMath math="H_2O, Cr(OH)_3" /></p>
            </div>
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10 text-center">
              <h5 className="text-2xl font-black text-cyan-400 mb-4">أيون امفوتيري</h5>
              <p className="text-gray-300 text-lg mb-4">الالايونات السالبة التي تحتوي على هيدروجين واحد أو أكثر.</p>
              <p className="text-gray-400 text-xl" dir="ltr"><InlineMath math="HSO_4^-, HCO_3^-, H_2PO_4^-, HPO_4^{-2}, HS^-" /></p>
            </div>
          </div>
          <TeacherNote>
            ملاحظة / الماء وأيونات الامفوتيرية تعتبر حمض أو قاعدة في معادلة واحدة ولالا يمكن اعتباره امفوتيري.
          </TeacherNote>
        </GlassCard>
      </section>

      {/* تفاعلات التعادل */}
      <section id="neutralization">
        <SectionHeader title="تفاعلات التعادل" icon={Droplets} />
        <GlassCard page="96">
          <Definition title="التعادل">
            التفاعل الذي يحدث بين أيونات الهيدرونيوم وأيونات الهيدروكسيد لتكوين جزيئات الماء.
          </Definition>
          <FormulaBox label="المعادلة الأيونية الصرفة للتعادل">
            {"H_3O^+_{(aq)} + OH^-_{(aq)} \\rightarrow 2H_2O_{(l)}"}
          </FormulaBox>
          <Definition title="الملح">
            مركب أيوني يتكون من كاتيوم القاعدة وآنيون الحمض.
          </Definition>
          <ComparisonTable 
            title="أنواع الالاملالاح"
            headers={["نوع الملح", "التكوين", "أمثلة"]}
            rows={[
              ["أملالاح متعادلة", "تتكون حمض قوي و قاعدة قوية", <InlineMath math="NaCl, CaBr_2, KNO_3" />],
              ["أملالاح حمضي ة", "تتكون من حمض قوي وقاعدة ضعيفة", <InlineMath math="NH_4Cl, NH_4NO_3" />],
              ["أملالاح قاعدية", "تتكون من حمض ضعيف وقاعدة قوية", <InlineMath math="KNO_2, CaF_2" />]
            ]}
          />
        </GlassCard>
      </section>

      {/* المطر الحمضي */}
      <section id="acid-rain">
        <SectionHeader title="المطر الحمضي" icon={Wind} />
        <GlassCard page="100">
          <div className="space-y-8">
            <p className="text-xl text-gray-300 leading-relaxed">
              ينتج عن ذوبان غازات ناتجة عن العمليات الصناعية مثل <InlineMath math="CO_2, SO_3, SO_2, NO_2, NO" /> المنتشرة في الجو في مياه الأمطار.
            </p>
            <TeacherNote>
              حيث غالباية الامطار الحامضية تنسب الى <InlineMath math="NO, SO_2" />. حيث يتفاعل <InlineMath math="SO_2" /> مع الالاوكسجين الموجود في الجو مكونا <InlineMath math="SO_3" /> وهذا بدوره يتفاعل مع الماء لتكوين حمض <InlineMath math="H_2SO_4" />.
            </TeacherNote>
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h4 className="text-2xl font-black text-cyan-400 mb-6">أضرار المطر الحمضي:</h4>
              <ul className="space-y-4 text-gray-200 text-xl">
                <li className="flex items-center gap-3"><ArrowRightLeft className="w-5 h-5 text-red-400" /> يفتت المنحوتات. حيث يحتوي</li>
                <li className="flex items-center gap-3"><ArrowRightLeft className="w-5 h-5 text-red-400" /> يؤثر على المحاصيل الزراعية</li>
                <li className="flex items-center gap-3"><ArrowRightLeft className="w-5 h-5 text-red-400" /> يسبب تلوث مصادر المياه</li>
              </ul>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}