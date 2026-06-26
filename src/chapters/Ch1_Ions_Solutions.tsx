import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { 
  Layers, 
  Zap, 
  Activity, 
  Droplets, 
  FlaskConical, 
  BookOpen, 
  Calculator,
  CheckCircle2,
  Lightbulb,
  ArrowRightLeft,
  Waves,
  Thermometer,
  Gauge,
  ChevronLeft,
  ChevronRight,
  ArrowUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import 'katex/dist/katex.min.css';

// --- المكونات المساعدة للـ UI ---

const GlassCard = ({ children, title, className = "" }: { children: React.Node, title?: string, className?: string }) => (
  <div className={`p-6 md:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl my-10 ${className}`}>
    {title && <h4 className="text-3xl font-black text-white mb-8 border-r-4 border-cyan-500 pr-4">{title}</h4>}
    {children}
  </div>
);

const SectionHeader = ({ title, icon: Icon }: { title: string, icon: any }) => (
  <div className="flex items-center gap-5 mb-12 border-b border-white/10 pb-6 mt-20">
    <div className="p-4 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
      {Icon && <Icon className="w-10 h-10 text-cyan-400" />}
    </div>
    <h3 className="text-4xl font-black text-white tracking-tight">{title}</h3>
  </div>
);

const Definition = ({ title, children }: { title: React.Node, children: React.Node }) => (
  <div className="bg-gradient-to-l from-purple-500/20 to-transparent border-r-8 border-purple-500 p-8 my-8 rounded-l-3xl shadow-xl">
    <h4 className="text-cyan-300 font-black mb-3 text-2xl tracking-tight flex items-center gap-2">
      <BookOpen className="w-6 h-6" /> {title}
    </h4>
    <div className="text-gray-100 leading-relaxed text-xl font-medium">{children}</div>
  </div>
);

const TeacherNote = ({ children }: { children: React.Node }) => (
  <div className="p-8 bg-yellow-500/10 border border-yellow-500/30 rounded-3xl my-10 relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-3 bg-yellow-500 text-black font-black text-xs uppercase tracking-tighter rounded-bl-xl shadow-lg">
      ملاحظة الأستاذ أحمد قاسم
    </div>
    <div className="flex gap-4 items-start mt-4">
      <Lightbulb className="w-8 h-8 text-yellow-500 shrink-0 animate-pulse" />
      <div className="text-gray-200 text-xl leading-relaxed italic font-medium">
        {children}
      </div>
    </div>
  </div>
);

const FormulaBox = ({ children, label }: { children: string, label?: string }) => (
  <div className="my-10 group" dir="ltr">
    {label && (
      <div className="flex items-center justify-end gap-2 mb-4" dir="rtl">
        <Calculator className="w-5 h-5 text-cyan-500" />
        <span className="text-sm font-black text-cyan-500 uppercase tracking-[0.3em]">{label}</span>
      </div>
    )}
    <div className="w-full overflow-x-auto my-4 custom-scrollbar bg-black/80 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-10 transition-all group-hover:border-cyan-500/50">
      <div className="min-w-max flex items-center justify-center text-4xl font-bold text-cyan-300">
        <BlockMath math={children} />
      </div>
    </div>
  </div>
);

const SolvedExample = ({ 
  question, 
  solution, 
  page 
}: { 
  question: string | React.Node, 
  solution: React.Node, 
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

const Quiz = ({ 
  question, 
  options, 
  correctAnswer, 
  page 
}: { 
  question: string | React.Node, 
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

// --- المكون الأساسي للفصل الأول ---

export default function Ch1_Ions_Solutions() {
  return (
    <div className="max-w-6xl mx-auto space-y-24 pb-40 text-right selection:bg-cyan-500/30" dir="rtl">
      
      {/* أساسيات الكورس */}
      <section id="basics">
        <SectionHeader title="أساسيات الكورس" icon={Layers} />
        
        <GlassCard title="تصنيف الجدول الدوري">
          <p className="text-2xl text-gray-300 leading-relaxed mb-10">
            ينقسم الجدول الدوري الى قسمين رئيسين من حيث الشحنة:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-cyan-500/10 rounded-3xl border border-cyan-500/20 shadow-inner group hover:bg-cyan-500/20 transition-all">
              <span className="text-cyan-400 font-black text-3xl block mb-4 border-r-4 border-cyan-500 pr-4">الموجبة (+)</span>
              <p className="text-gray-200 text-xl font-bold">التي تتمثل بالفلزات.</p>
            </div>
            <div className="p-8 bg-red-500/10 rounded-3xl border border-red-500/20 shadow-inner group hover:bg-red-500/20 transition-all">
              <span className="text-red-400 font-black text-3xl block mb-4 border-r-4 border-red-500 pr-4">السالبة (-)</span>
              <p className="text-gray-200 text-xl font-bold">التي تتمثل باللافلزات.</p>
            </div>
          </div>
          
          <div className="mt-12 space-y-6">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
              <div>
                <h5 className="text-2xl font-black text-cyan-400 mb-2">المركب الأيوني</h5>
                <p className="text-gray-300">لافلز + فلز</p>
              </div>
              <Layers className="text-cyan-500 w-12 h-12 opacity-30" />
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
              <div>
                <h5 className="text-2xl font-black text-purple-400 mb-2">المركب التساهمي</h5>
                <p className="text-gray-300">لافلز + لافلز</p>
              </div>
              <Zap className="text-purple-500 w-12 h-12 opacity-30" />
            </div>
          </div>
        </GlassCard>

        <TeacherNote>
          ملاحظة عند تسمية حسب نظام <span className="text-yellow-500 font-black">ستوك</span> يجب معرفة عدد التأكسد أو التكافؤ للأيون الموجب.
        </TeacherNote>

        <GlassCard title="نظام التسمية">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-xl font-black text-cyan-400 mb-4">عادي (لا يلفظ الأرقام)</h5>
              <ul className="space-y-2 text-gray-300">
                <li><InlineMath math="MgCl_2" />: كلوريد المغنيسيوم</li>
                <li><InlineMath math="AlCl_3" />: كلوريد الالمنيوم</li>
                <li><InlineMath math="Na_2O" />: أوكسيد الصوديوم</li>
              </ul>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-xl font-black text-yellow-500 mb-4">ستوك (يؤخذ الأرقام الرومانية للعناصر الذين لهم أكثر من حالات تأكسد واحدة)</h5>
              <ul className="space-y-2 text-gray-300">
                <li><InlineMath math="VO" />: أوكسيد الفانديوم (II)</li>
                <li><InlineMath math="Cr_2O_3" />: أوكسيد الكروم (III)</li>
              </ul>
              <p className="mt-4 text-sm text-gray-400">حيث الفناديوم لديه أكثر من حالة تأكسد واحدة وهي <InlineMath math="+2, +3, +4" />.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-xl font-black text-cyan-400 mb-4">عادي أو بادئات (يلفظ الأرقام)</h5>
              <ul className="space-y-2 text-gray-300">
                <li><InlineMath math="NO_2" />: ثنائي أوكسيد النايتروجين</li>
                <li><InlineMath math="SO_3" />: ثلاثي أوكسيد الكبريت</li>
              </ul>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-xl font-black text-yellow-500 mb-4">ستوك (يؤخذ الأرقام الرومانية للجميع)</h5>
              <ul className="space-y-2 text-gray-300">
                <li><InlineMath math="NO_2" />: أوكسيد النايتروجين (IV)</li>
                <li><InlineMath math="SO_3" />: أوكسيد الكبريت (VI)</li>
              </ul>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="الذرات الفعالة واللافلزات">
          <p className="text-xl text-gray-300 mb-8">
            يوجد حوالي 10 ذرات لافلز فعال في الجدول الدوري و 6 ذرات غير فعالة وهم الغازات النبيلة. و <InlineMath math="H" /> يعتبر أيضا من اللافلزات ولكن موجبة الشحنة.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { group: "مجموعة F", detail: "كلهم يكتسبون الكترون واحد فقط لكي يكون ايون سالب واحد ويكون اصرة واحدة" },
              { group: "مجموعة O", detail: "يكتسبون الكترونين لكي يكونوا ايون سالب اثنين ويكون اصرتين" },
              { group: "مجموعة N", detail: "يكتسبون ثلاثة الكترونات لكي يكونوا ايون سالب ثلاثة ويكون ثلاث اواصر" },
              { group: "مجموعة C", detail: "يكتسبون الالكترونات اذا اتى مع الفلزات ويشارك بالالكترونات اذا اتى مع اللافلزات ويكون اربعة اواصر" }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white/5 rounded-2xl border-r-4 border-cyan-500 shadow-lg">
                <h6 className="text-white font-black text-xl mb-3">{item.group}</h6>
                <p className="text-gray-400 text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Definition title="الملح">
            يتكون من ايونات سالبة وموجبة (على الاغلب فلز مع لافلز) مثل <InlineMath math="NaCl, MgCl_2, Al_2O_3" />.
          </Definition>
          <Definition title="ايون متعدد الذرات">
            هو الذي يتكون من لافلزات فقط ويحمل شحنة موجبة او سالبة.
          </Definition>
          <Definition title="الحامض">
            يتكون على الاغلب من (<InlineMath math="H" /> + لافلز) مثل <InlineMath math="HCl" />.
          </Definition>
          <Definition title="القاعدة">
            يتكون على الاغلب من (فلز + <InlineMath math="OH" />) مثل <InlineMath math="NaOH" />.
          </Definition>
        </div>
        <Definition title="الأيون">
          هو عبارة عن ذرة أو مجموعة ذرات تحمل شحنة أو شحنات كهربائية، سواء أكانت موجبة أم سالبة.
        </Definition>
      </section>

      {/* المواد والقطبية */}
      <section id="polarity">
        <SectionHeader title="المواد والقطبية" icon={Waves} />
        
        <GlassCard title="تصنيف المواد من حيث الامتزاج">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="p-8 bg-cyan-500/5 border-r-8 border-cyan-500 rounded-l-3xl shadow-xl">
              <h5 className="text-3xl font-black text-cyan-400 mb-6">المواد القطبية</h5>
              <p className="text-gray-200 mb-6 text-lg">هو جزيء الذي يوجد فيها استقطاب بين الذرتين أحدهما أعلى سالبية والآخر اقل سالبية.</p>
              <ul className="space-y-4 text-gray-300 font-medium">
                <li>• الماء <InlineMath math="H_2O" /></li>
                <li>• الالكتروليتات (القوية والضعيفة) ملح وحمض وقاعدة</li>
                <li>• ويعتبر الاملاح مركبات قطبية</li>
              </ul>
              <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-sm text-gray-400">مركب ايوني، مركب تساهمي</p>
              </div>
            </div>
            <div className="p-8 bg-purple-500/5 border-r-8 border-purple-500 rounded-l-3xl shadow-xl">
              <h5 className="text-3xl font-black text-purple-400 mb-6">المواد اللاقاطبية</h5>
              <p className="text-gray-200 mb-6 font-medium text-lg">هو الذي يتكون من جزيئين متشابهين أي لا يوجد استقطاب بينهم أي فرق في السالبية قليل جدا أو صفر.</p>
              <div className="space-y-4">
                <div className="p-4 bg-black/30 rounded-xl border border-white/5">
                  <h6 className="text-white font-bold mb-2">الامثلة:</h6>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>• احادي الذرة: الغازات النبيلة <InlineMath math="Ne, Kr, Ar" /></li>
                    <li>• ثنائي الذرة: <InlineMath math="F_2, N_2, O_2, H_2, Cl_2, Br_2, I_2" /></li>
                    <li>• غير متشابهات: <InlineMath math="CO_2, CCl_4" /></li>
                    <li>• الهيدروكاربونات: اي المركبات التي يتكون من هيدروجين وكاربون (البنزين، التولون، الميثان، الزيوت، الشحوم، النفط الابيض)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="ترتيب السالبية من الاعلى الى الاقل">
           <div className="flex flex-wrap justify-center items-center gap-8 py-10" dir="ltr">
             {['F', 'O', 'Cl', 'Br', 'I', 'S', 'H', 'N', 'P', 'C'].map((atom, index) => (
               <div key={index} className="flex items-center gap-4">
                 <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-2xl font-black text-white shadow-lg">
                   <InlineMath math={atom} />
                 </div>
                 {index < 9 && <span className="text-gray-600 text-3xl font-black">&gt;</span>}
               </div>
             ))}
           </div>
        </GlassCard>
      </section>

      {/* تركيز المحاليل */}
      <section id="concentration">
        <SectionHeader title="تركيز المحاليل" icon={Calculator} />
        
        <GlassCard>
          <Definition title="التركيز (concentration)">
            قياس كمية المذاب في كمية معينة من المذيب (أو المحلول). لا يتم حساب التركيز ان لم يحدث الذوبانية.
          </Definition>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-2xl font-black text-cyan-400 mb-4">المحلول نوعين:</h4>
              <ul className="space-y-3 text-gray-300 text-lg">
                <li>1. مخفف: كمية المذاب في المذيب قليلة.</li>
                <li>2. المركز: كمية المذاب في المذيب كبيرة أو عالية.</li>
              </ul>
              <p className="mt-4 text-sm text-gray-500">ملاحظة: حيث المحلول المركز والمخفف ليس له علاقة بدرجة التشبع للمحلول.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="p-8 bg-cyan-500/10 rounded-3xl border border-cyan-500/20">
              <h5 className="text-2xl font-black text-cyan-400 mb-6">المولارية (Molarity - M)</h5>
              <p className="text-gray-300 mb-6">هي عدد مولات المذاب الموجودة في لتر واحد من المحلول.</p>
              <FormulaBox label="قانون المولارية">{"M = \\frac{n_{\\text{mol}}}{V_{\\text{L}}}"}</FormulaBox>
              <div className="mt-6 p-4 bg-red-500/10 border-r-4 border-red-500 rounded-xl text-red-400 font-bold">
                تعتمد على درجة الحرارة.
              </div>
            </div>

            <div className="p-8 bg-purple-500/10 rounded-3xl border border-purple-500/20">
              <h5 className="text-2xl font-black text-purple-400 mb-6">المولالية (Molality - m)</h5>
              <p className="text-gray-300 mb-6">هو عدد مولات المذاب في Kg واحد من المذيب (وليس المحلول).</p>
              <FormulaBox label="قانون المولالية">{"m = \\frac{n_{\\text{mol}}}{m_{\\text{kg}}}"}</FormulaBox>
              <div className="mt-6 p-4 bg-green-500/10 border-r-4 border-green-500 rounded-xl text-green-400 font-bold">
                لا تعتمد على درجة الحرارة.
              </div>
            </div>
          </div>

          <FormulaBox label="قانون عدد المولات">{"n_{\\text{mol}} = \\frac{m_{\\text{g}}}{M_{\\text{g/mol}}}"}</FormulaBox>

          <div className="mt-12 p-8 bg-black/20 rounded-3xl border border-white/10">
            <h6 className="text-white font-black mb-6">قواعد التحويل:</h6>
            <ul className="space-y-4 text-gray-300">
              <li>• اذا اعطيت حجم المحلول بالسؤال بـ <InlineMath math="ml" /> فيجب تحويلها الى <InlineMath math="L" /> وذلك بقسمتها على 1000.</li>
              <li>• اذا كانت كتلة المذاب بـ <InlineMath math="g" /> فيجب تحويلها الى <InlineMath math="Kg" /> وذلك بقسمتها على 1000.</li>
              <li>• <InlineMath math="ml = cm^3" /></li>
            </ul>
          </div>

          <TeacherNote>
            اذا اعطيت في السؤال سائلين مثلا (الايثانول والماء) كيف نعرف المذاب والمذيب؟ وذلك من خلال الملاحظات التالية:
            <br />
            أ / من المولالية يمكننا ان نعرف. مثلا (جد تركيز المولالي للايثانول) أو اذا كان مولالية الايثانول. الايثانول هو المذاب والماء هو المذيب. وهكذا.
            <br />
            ب / من خلال اعطاء الكتلة المولية أو عدد المولات مثلا (اذا كانت الكتلة المولية للماء تساوي <InlineMath math="18 g/mol" />) فهنا الماء هو المذيب وهكذا.
          </TeacherNote>

          <div className="space-y-12 mt-20">
            <div className="p-8 bg-cyan-500/5 border border-cyan-500/20 rounded-3xl">
              <h5 className="text-2xl font-black text-cyan-400 mb-6">أمثلة محلولة:</h5>
              
              <SolvedExample 
                page="4"
                question="س1/ احسب مولارية محلول يحتوي على 0.5 mol من NaCl في 500 ml من المحلول؟"
                solution={
                  <div className="space-y-4 font-mono text-cyan-300" dir="ltr">
                    <p>V = 500 / 1000 = 0.5 L</p>
                    <p>M = n / V = 0.5 / 0.5 = 1 M</p>
                  </div>
                }
              />

              <SolvedExample 
                page="4"
                question="س2/ احسب مولالية محلول يتكون من 20 g من NaOH في 200 g من الماء؟ (الكتلة المولية لـ NaOH = 40 g/mol)"
                solution={
                  <div className="space-y-4 font-mono text-purple-300" dir="ltr">
                    <p>n = m / M_w = 20 / 40 = 0.5 mol</p>
                    <p>m_solvent = 200 / 1000 = 0.2 kg</p>
                    <p>m = n / m_solvent = 0.5 / 0.2 = 2.5 m</p>
                  </div>
                }
              />
            </div>
          </div>
        </GlassCard>
      </section>

      {/* التخفيف */}
      <section id="dilution">
        <SectionHeader title="التخفيف" icon={Droplets} />
        <GlassCard>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            عملية تقليل تركيز المحلول بإضافة كمية إضافية من المذيب. في عملية التخفيف، يبقى عدد مولات المذاب ثابتاً، بينما يزداد حجم المحلول ويقل تركيزه.
          </p>

          <FormulaBox label="قانون التخفيف">{"M_1 V_1 = M_2 V_2"}</FormulaBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
            <div className="p-6 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
              <h6 className="text-white font-bold mb-2">قبل التخفيف (المركز):</h6>
              <p className="text-gray-400"><InlineMath math="M_1, V_1" /></p>
            </div>
            <div className="p-6 bg-purple-500/10 rounded-2xl border border-purple-500/20">
              <h6 className="text-white font-bold mb-2">بعد التخفيف (المخفف):</h6>
              <p className="text-gray-400"><InlineMath math="M_2, V_2" /></p>
            </div>
          </div>

          <TeacherNote>
            <InlineMath math="V_2" /> هو الحجم الكلي للمحلول بعد الإضافة، أي: <InlineMath math="V_2 = V_1 + V_{\text{added}}" />.
          </TeacherNote>

          <SolvedExample 
            page="6"
            question="س/ ما حجم الماء اللازم إضافته إلى 100 ml من محلول حمض بتركيز 2M ليصبح تركيزه 0.5M؟"
            solution={
              <div className="space-y-4 font-mono text-cyan-300" dir="ltr">
                <p>M1 = 2M, V1 = 100 ml</p>
                <p>M2 = 0.5M, V2 = ?</p>
                <p>M1 V1 = M2 V2</p>
                <p>2 * 100 = 0.5 * V2</p>
                <p>V2 = 200 / 0.5 = 400 ml</p>
                <p className="text-white font-sans" dir="rtl">حجم الماء المضاف = 400 - 100 = 300 ml</p>
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الأيونات في المحاليل المائية */}
      <section id="ions">
        <SectionHeader title="الأيونات في المحاليل المائية" icon={Droplets} />
        
        <GlassCard title="المركبات في المحاليل المائية">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-8 bg-cyan-500/5 border-r-8 border-cyan-500 rounded-l-3xl shadow-xl">
              <h5 className="text-2xl font-black text-cyan-400 mb-6">المركبات الأيونية</h5>
              <p className="text-gray-300 leading-relaxed">يتكون تركيبها البلوري من جسيمات مشحونة متماسكة بواسطة قوى الجذب الايونية وهي قوى بينية غير تساهمية. عند اذابته في الماء تتفكك.</p>
              <p className="mt-4 text-white font-bold">الامثلة: أملاح، قواعد</p>
            </div>
            <div className="p-8 bg-purple-500/5 border-r-8 border-purple-500 rounded-l-3xl shadow-xl">
              <h5 className="text-2xl font-black text-purple-400 mb-6">المركبات الجزيئية</h5>
              <p className="text-gray-300 leading-relaxed">تتألف الجزيئات من ذرات ترتبط فيما بينها بروابط تساهمية. عند اذابته في الماء تتأين.</p>
              <p className="mt-4 text-white font-bold">الامثلة: أحماض قوية، أحماض ضعيفة، قواعد ضعيفة</p>
            </div>
          </div>
          
          <div className="mt-12 p-6 bg-black/40 rounded-2xl border border-white/10">
            <h6 className="text-cyan-400 font-black mb-4">بعض الرموز الدالة:</h6>
            <p className="text-gray-300"><InlineMath math="S" /> يعني صلب، <InlineMath math="L" /> يعني سائل، <InlineMath math="g" /> يعني غاز، <InlineMath math="aq" /> يعني محلول مائي.</p>
          </div>
        </GlassCard>

        <GlassCard title="أولا / التفكك">
          <p className="text-xl text-gray-300 mb-8">
            عملية انفصال الأيونات لدى ذوبان المركب الأيوني. مثل الاملاح والقواعد القوية.
          </p>
          <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
            <h6 className="text-white font-bold mb-6">مثال: عند تفكك 1mol من كلوريد الصوديوم (الصلب الايوني):</h6>
            <BlockMath math="NaCl_{(s)} \rightarrow Na^+_{(aq)} + Cl^-_{(aq)}" />
            <div className="grid grid-cols-2 gap-4 mt-6 text-center">
              <div className="p-4 bg-cyan-500/10 rounded-xl">عدد مولات أيونات الصوديوم = 1mol</div>
              <div className="p-4 bg-cyan-500/10 rounded-xl">عدد مولات أيونات الكلوريد = 1mol</div>
            </div>
            <p className="text-center text-2xl font-black text-cyan-400 mt-8">العدد الكلي لمولات الأيونات الناتجة (المنتشرة) = 2mol</p>
          </div>
          
          <div className="mt-10 space-y-6">
             <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
               <h6 className="text-white font-bold mb-4">مثال: عند تفكك 1mol من كلوريد الكالسيوم:</h6>
               <BlockMath math="CaCl_{2(s)} \rightarrow Ca^{2+}_{(aq)} + 2Cl^-_{(aq)}" />
               <p className="text-center font-black text-cyan-400">العدد الكلي للأيونات الناتجة هو 3mol</p>
             </div>
             <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
               <h6 className="text-white font-bold mb-4">مثال: معادلة تفكك كبريتات الألمنيوم في الماء:</h6>
               <BlockMath math="Al_2(SO_4)_{3(s)} \xrightarrow{H_2O} 2Al^{3+}_{(aq)} + 3SO_{4(aq)}^{2-}" />
               <p className="text-center font-black text-cyan-400">العدد الكلي للمولات الناتجة = 2mol + 3mol = 5mol</p>
             </div>
          </div>
          <p className="mt-8 text-sm text-gray-500">ملاحظة: الحد الادنى للأيونات الناتجة لدى تفكك مركب ايوني هو 2.</p>
        </GlassCard>
      </section>

      {/* أعداد الأكسدة للأيونات متعددة الذرات */}
      <section id="oxidation">
        <SectionHeader title="أعداد الأكسدة للأيونات متعددة الذرات" icon={CheckCircle2} />
        
        <GlassCard>
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-white/10 text-cyan-400">
                  <th className="p-4 border border-white/10">شحنة سالب واحد (-1)</th>
                  <th className="p-4 border border-white/10">شحنة سالب اثنين (-2)</th>
                  <th className="p-4 border border-white/10">شحنة سالب ثلاثة / موجب واحد</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr>
                  <td className="p-4 border border-white/10">
                    هيبوكلوريت: <InlineMath math="ClO^-" /><br/>
                    كلوريت: <InlineMath math="ClO_2^-" /><br/>
                    كلورات: <InlineMath math="ClO_3^-" /><br/>
                    بيركلورات: <InlineMath math="ClO_4^-" /><br/>
                    هيبوبروميت: <InlineMath math="BrO^-" /><br/>
                    بروميت: <InlineMath math="BrO_2^-" /><br/>
                    برومات: <InlineMath math="BrO_3^-" /><br/>
                    بيربرومات: <InlineMath math="BrO_4^-" /><br/>
                    هيبويوديت: <InlineMath math="IO^-" /><br/>
                    يوديت: <InlineMath math="IO_2^-" /><br/>
                    يودات: <InlineMath math="IO_3^-" /><br/>
                    بيريودات: <InlineMath math="IO_4^-" /><br/>
                    سيانيد: <InlineMath math="CN^-" /><br/>
                    نتريت: <InlineMath math="NO_2^-" /><br/>
                    نيترات: <InlineMath math="NO_3^-" /><br/>
                    أسيتات: <InlineMath math="CH_3COO^-" /><br/>
                    هيدروكسيد: <InlineMath math="OH^-" /><br/>
                    بيرمنجنات: <InlineMath math="MnO_4^-" />
                  </td>
                  <td className="p-4 border border-white/10 align-top">
                    كبريتيت: <InlineMath math="SO_3^{2-}" /><br/>
                    كبريتات: <InlineMath math="SO_4^{2-}" /><br/>
                    كاربونات: <InlineMath math="CO_3^{2-}" /><br/>
                    سيليكات: <InlineMath math="SiO_3^{2-}" /><br/>
                    سلينات: <InlineMath math="SeO_4^{2-}" /><br/>
                    كرومات: <InlineMath math="CrO_4^{2-}" />
                  </td>
                  <td className="p-4 border border-white/10 align-top">
                    فوسفيت: <InlineMath math="PO_3^{3-}" /><br/>
                    فوسفات: <InlineMath math="PO_4^{3-}" /><br/>
                    زرنيخات: <InlineMath math="AsO_4^{3-}" /><br/>
                    <hr className="my-2 border-white/10"/>
                    أمونيوم: <InlineMath math="NH_4^{+1}" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </GlassCard>
      </section>

      {/* تفاعلات الترسيب */}
      <section id="precipitation">
        <SectionHeader title="تفاعلات الترسيب" icon={FlaskConical} />
        
        <GlassCard>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            لا توجد مواد غير قابلة للذوبان كليا وعلى الرغم من ذلك يمكن اعتبار هذه المواد أو المركبات غير قابلة للذوبان (ذات ذوبانية متدنية).
          </p>
          <Definition title="متى يحصل الترسيب؟">
            عندما تكون قوة الجذب بين ايونات المذاب أكبر من قوة الجذب بين ايونات المذاب وجزيئات الماء المحيطة بها.
          </Definition>
          
          <div className="p-8 bg-black/40 rounded-3xl border border-white/10 my-10">
            <h5 className="text-cyan-400 font-black mb-6">قواعد عامة للذوبانية:</h5>
            <ul className="space-y-4 text-gray-300 text-lg">
              <li>1. مركبات الصوديوم (<InlineMath math="Na^+" />) والبوتاسيوم (<InlineMath math="K^+" />) والأمونيوم (<InlineMath math="NH_4^+" />) والنيترات (<InlineMath math="NO_3^-" />) والأسيتات (<InlineMath math="CH_3COO^-" />) والكلورات (<InlineMath math="ClO_3^-" />) قابلة للذوبان في الماء.</li>
              <li>2. معظم الكلوريدات (<InlineMath math="Cl^-" />) قابلة للذوبان في الماء، عدا كلوريد الفضة (<InlineMath math="AgCl" />) والزئبق (<InlineMath math="Hg_2Cl_2" />) والرصاص (<InlineMath math="PbCl_2" />).</li>
              <li>3. معظم الكبريتات (<InlineMath math="SO_4^{2-}" />) قابلة للذوبان في الماء، عدا كبريتات الباريوم (<InlineMath math="BaSO_4" />) والسترونتيوم (<InlineMath math="SrSO_4" />) والرصاص (<InlineMath math="PbSO_4" />) والزئبق (<InlineMath math="HgSO_4" />) والكالسيوم (<InlineMath math="CaSO_4" />).</li>
              <li>4. معظم الكربونات (<InlineMath math="CO_3^{2-}" />) والفوسفات (<InlineMath math="PO_4^{3-}" />) والسيليكات (<InlineMath math="SiO_3^{2-}" />) غير قابلة للذوبان فقط اذا اتوا مع مركبات الصوديوم والبوتاسيوم والأمونيوم.</li>
              <li>5. معظم الكبريتيدات (<InlineMath math="S^{2-}" />) غير قابلة للذوبان، فقط اذا اتى مع مركبات الكالسيوم والسترونتيوم و الصوديوم والبوتاسيوم والأمونيوم.</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xl">
            <div className="p-8 bg-green-500/5 rounded-3xl border border-green-500/20 shadow-2xl">
              <h6 className="text-green-400 font-black mb-4">لماذا تذوب المادة؟</h6>
              <p className="text-gray-300">بسبب قوة جذب الكبيرة بين أيونات المذاب وجزيئات المذيب.</p>
            </div>
            <div className="p-8 bg-red-500/5 rounded-3xl border border-red-500/20 shadow-2xl">
              <h6 className="text-red-400 font-black mb-4">لماذا لا تذوب المادة؟</h6>
              <p className="text-gray-300">بسبب قوة جذب الكبيرة بين أيونات المذاب مع بعضها.</p>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* المعادلة الأيونية الصرفة */}
      <section id="net-ionic">
        <SectionHeader title="المعادلة الأيونية الصرفة" icon={ArrowRightLeft} />
        
        <GlassCard>
          <p className="text-xl text-gray-300 mb-8">
            تتضمن فقط المركبات والأيونات التي تتعرض لتغير كيميائي في المحاليل المائية.
          </p>
          <Definition title="الأيونات المتفرجة (Spectator Ions)">
            الأيونات التي لا تدخل في أي تفاعل كيميائي وتبقى في المحلول قبل عملية التفاعل وبعدها، وتوجد في طرفي المعادلة.
          </Definition>
          
          <div className="p-8 bg-white/5 rounded-3xl border border-white/10 mt-10">
            <h6 className="text-white font-bold mb-6">خطوات كتابة المعادلة:</h6>
            <ol className="space-y-4 text-gray-300">
              <li>1. كتابة تفاعل استبدال الثنائي (المعادلة بالصيغ).</li>
              <li>2. تحويل المعادلة الكيميائية الى معادلة ايونية عامة مع توضيح المركبات الايونية الذائبة والرواسب كمواد صلبة.</li>
              <li>3. تحويل المعادلة الايونية العامة الى معادلة ايونية صرفة وذلك بحذف الايونات المتفرجة من طرفي المعادلة.</li>
            </ol>
          </div>

          <TeacherNote>
            في الاستبدال الثنائي لكي تحدث التفاعل يجب ان تكون المتفاعلات <InlineMath math="aq" />. واذا كان أحد المتفاعلات صلب فلا يحدث التفاعل.
            <br />
            فتعتبر أيونات متفرجة (<InlineMath math="aq" />) في الاستبدال الثنائي اذا كان في النواتج.
            <br />
            عندما يتحد محلولا مركبين أيونيين ويتكون صلب فالعملية تسمى الترسيب.
            <br />
            الترسيب يعد مثالا على تفاعلات الاستبدال الثنائي.
          </TeacherNote>

          <SolvedExample 
            page="16"
            question="س / يتفاعل كبريتيد الامونيوم مع نترات الكادميوم لتكوين كبريتيد الكادميوم و نترات الامونيوم"
            solution={
              <div className="space-y-6">
                <div>
                  <h6 className="text-cyan-400 font-bold mb-2">1/ المعادلة بالصيغ (تفاعل استبدال الثنائي):</h6>
                  <BlockMath math="(NH_4)_2S_{(aq)} + Cd(NO_3)_{2(aq)} \rightarrow CdS_{(s)} + 2NH_4NO_{3(aq)}" />
                </div>
                <div>
                  <h6 className="text-cyan-400 font-bold mb-2">2/ المعادلة الايونية العامة:</h6>
                  <BlockMath math="2NH_4^+_{(aq)} + S^{2-}_{(aq)} + Cd^{2+}_{(aq)} + 2NO_3^-_{(aq)} \rightarrow CdS_{(s)} + 2NH_4^+_{(aq)} + 2NO_3^-_{(aq)}" />
                </div>
                <div>
                  <h6 className="text-cyan-400 font-bold mb-2">3/ المعادلة الايونية الصرفة:</h6>
                  <BlockMath math="Cd^{2+}_{(aq)} + S^{2-}_{(aq)} \rightarrow CdS_{(s)}" />
                </div>
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* التأين */}
      <section id="ionization">
        <SectionHeader title="التأين (Ionization)" icon={Zap} />
        
        <GlassCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-8 bg-cyan-500/5 border-r-8 border-cyan-500 rounded-l-3xl shadow-xl">
              <h5 className="text-2xl font-black text-cyan-400 mb-6">التأين</h5>
              <p className="text-gray-300 leading-relaxed">خاص بالمركبات الجزيئية القطبية. عملية تكون الأيونات من جزيئات المذاب نتيجة لفعل المذيب. الأيونات غير موجودة أصلا وتتكون عند تأين المركب الجزيئي.</p>
              <p className="mt-4 text-white font-bold">الامثلة: احماض قوية وضعيفة وقواعد ضعيفة</p>
            </div>
            <div className="p-8 bg-purple-500/5 border-r-8 border-purple-500 rounded-l-3xl shadow-xl">
              <h5 className="text-2xl font-black text-purple-400 mb-6">التفكك</h5>
              <p className="text-gray-300 leading-relaxed">خاص بالمركبات الايونية. عملية انفصال الأيونات لدى ذوبان المركب الأيوني. الايونات تكون موجودة في الأصل.</p>
              <p className="mt-4 text-white font-bold">الامثلة: الاملاح والقواعد القوية</p>
            </div>
          </div>

          <div className="mt-12">
            <h5 className="text-2xl font-black text-white mb-6">أيون الهيدرونيوم (<InlineMath math="H_3O^+" />)</h5>
            <p className="text-gray-300 leading-relaxed mb-6">لا يوجد أيون <InlineMath math="H^+" /> بصورة حرة ولكن يكون على شكل <InlineMath math="H_3O^+" />. أي تكوين أيون هيدرونيوم في محلول <InlineMath math="HCl" /> مفضل وطارد للحرارة.</p>
            <FormulaBox label="تأين HCl في الماء">{"HCl_{(g)} + H_2O_{(l)} \\rightarrow H_3O^+_{(aq)} + Cl^-_{(aq)}"}</FormulaBox>
            <Definition title="أيون الهيدرونيوم">
              يتكون ايون الهيدرونيوم من اتحاد بروتون الحمض مع الماء.
            </Definition>
          </div>

          <div className="mt-12 p-8 bg-black/20 rounded-3xl border border-white/10">
            <h6 className="text-white font-black mb-6">البروتونات المميأة:</h6>
            <p className="text-gray-300 mb-4">مثل <InlineMath math="H_3O^+, H_5O_2^+, H_7O_3^+, H_9O_4^+" />.</p>
            <FormulaBox label="القانون الذهبي لعدد ذرات الهيدروجين في البروتون المميأ">{"\\{ 1 + (\\text{رقم السفلي للاوكسجين} \\times 2) \\}"}</FormulaBox>
          </div>

          <TeacherNote>
            لماذا <InlineMath math="HCl" /> إلكتروليت قوي و <InlineMath math="HF" /> إلكتروليت ضعيف؟
            <br />
            حمض الهيدروكلوريك يتأين بشكل تام وتكون الرابطة تساهمية بين <InlineMath math="H-Cl" /> ضعيفة بينما حمض الهيدروفلوريك يتأين بشكل ضعيف وذلك بسبب الرابطة تساهمية بين <InlineMath math="F-H" /> القوية. وتكون الطاقة المنطلقة كحرارة خلال عملية تميؤ الايونات مصدرا للطاقة اللازمة لتكسير الروابط تساهمية.
          </TeacherNote>
        </GlassCard>
      </section>

      {/* الإلكتروليتات */}
      <section id="electrolytes">
        <SectionHeader title="الإلكتروليتات" icon={Zap} />
        
        <GlassCard title="تصنيف المواد من حيث التوصيلية">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-8 bg-green-500/5 border-r-8 border-green-500 rounded-l-3xl shadow-xl">
              <h5 className="text-2xl font-black text-green-400 mb-6">الالكتروليتات</h5>
              <p className="text-gray-300">يذوب في الماء ويوصل كهرباء. سبب التوصيلية هو الايونات الناتجة.</p>
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <h6 className="text-white font-bold">القوي (تفكك أو تأين تام):</h6>
                  <p className="text-sm text-gray-400">معادلة ذو سهم واحد. المتفاعلات تتحول الى نواتج ولا يبقى متفاعل في المحلول المائي.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <h6 className="text-white font-bold">الضعيف (تأين جزئي):</h6>
                  <p className="text-sm text-gray-400">معادلة ذو سهمين انعكاسي. المحلول المائي يحتوي على المتفاعلات على شكل جزيئة وايضا نواتج على شكل ايونات.</p>
                </div>
              </div>
            </div>
            <div className="p-8 bg-red-500/5 border-r-8 border-red-500 rounded-l-3xl shadow-xl">
              <h5 className="text-2xl font-black text-red-400 mb-6">لا الكتروليتات</h5>
              <p className="text-gray-300">يذوب في الماء ولا يوصل كهرباء. سبب عدم التوصيلية عدم انتاج ايونات.</p>
              <p className="mt-4 text-white font-bold">الامثلة: السكر <InlineMath math="C_6H_{12}O_6" />، الايثانول <InlineMath math="C_2H_5OH" /></p>
            </div>
          </div>
        </GlassCard>

        <TeacherNote>
          حمض الهيدروكلوريك هو إلكتروليت قوي دائما حتى وان كان مخففا جدا (تركيز <InlineMath math="0.00001 M" />).
          <br />
          وحمض الاسيتيك هو إلكتروليت ضعيف دائما حتى وان كان عالي التركيز (<InlineMath math="10 M" /> مثلا).
        </TeacherNote>
      </section>

      {/* الخصائص التجميعية */}
      <section id="colligative">
        <SectionHeader title="الخصائص التجميعية" icon={Activity} />
        
        <GlassCard>
          <Definition title="الخصائص التجميعية (Colligative Properties)">
            هي خصائص المذاب + خصائص المذيب في المحلول. خصائص المحلول التي تعتمد على تركيز جسيمات المذاب (نسبة عدد جزيئات المذيب الى المذاب) وليس على طبيعة (نوعية) هذه الجسيمات. وتقاس هذه الخصائص بالتركيز المولالي.
          </Definition>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
            {[
              { t: "انخفاض الضغط البخاري", icon: Gauge, c: "text-blue-400" },
              { t: "انخفاض درجة التجمد", icon: Thermometer, c: "text-cyan-400" },
              { t: "ارتفاع درجة الغليان", icon: Thermometer, c: "text-red-400" },
              { t: "الضغط الأسموزي", icon: Waves, c: "text-purple-400" }
            ].map((p, i) => (
              <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center gap-4 hover:bg-white/10 transition-all shadow-xl">
                <p.icon className={`w-12 h-12 ${p.c}`} />
                <span className="text-center font-bold text-gray-200">{p.t}</span>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-red-500/10 border-r-4 border-red-500 rounded-xl text-red-400 font-bold">
              التوصيل الكهربائي لا يعتبر خاصية تجميعية (وذلك لان التوصيل الكهربائي يعتمد على طبيعة المذاب).
            </div>
            <div className="p-6 bg-blue-500/10 border-r-4 border-blue-500 rounded-xl text-blue-400 font-bold">
              هنا نستخدم m فقط وليس M وذلك لانه لا تتغير بتغير درجة الحرارة.
            </div>
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <GlassCard title="انخفاض الضغط البخاري">
            <Definition title="الضغط البخاري">
              ضغط الجزيئات في الحالة الغازية وهي في حالة اتزان مع الحالة السائلة.
            </Definition>
            <p className="text-gray-300 leading-relaxed mb-6 font-medium">
              لماذا يقل الضغط البخاري للمحلول الذي يحتوي على مذاب غير متطاير أقل من الضغط البخاري للماء النقي؟
              <br />
              الجواب: لأن جسيمات المذاب تحتل جزءا من سطح المحلول فيقل عدد جزيئات الماء على السطح فيتبخر عدد أقل منها إلى الطور الغازي.
            </p>
          </GlassCard>

          <GlassCard title="الضغط الأسموزي">
            <Definition title="الغشاء شبه المنفذ">
              غشاء يسمح بمرور بعض الجزيئات فقط. يسمح بمرور جزيئات المذيب (الماء) ولا يسمح بمرور جزيئات المذاب.
            </Definition>
            <Definition title="الضغط الأسموزي">
              الضغط الخارجي اللازم لإيقاف عملية الأسموزية.
            </Definition>
            <p className="text-gray-300 mt-6">
              تستخدم الأسموزية العكسية في تحلية مياه البحر وتنقية مياه الصرف الصحي وتكريرها ليكون صالحة للاستخدام.
            </p>
          </GlassCard>
        </div>

        <GlassCard title="قوانين التجمد والغليان">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h6 className="text-cyan-400 font-black text-2xl mb-6 underline underline-offset-8">انخفاض درجة التجمد</h6>
              <FormulaBox>{"\\Delta T_f = K_f \\times m \\times n"}</FormulaBox>
              <p className="text-sm text-gray-500 font-medium">ثابت درجة الانجماد المولالي للماء (<InlineMath math="K_f" />) = <InlineMath math="1.86 \, ^{\circ}C/m" /></p>
            </div>
            <div>
              <h6 className="text-red-400 font-black text-2xl mb-6 underline underline-offset-8">ارتفاع درجة الغليان</h6>
              <FormulaBox>{"\\Delta T_b = K_b \\times m \\times n"}</FormulaBox>
              <p className="text-sm text-gray-500 font-medium">ثابت درجة الغليان المولالي للماء (<InlineMath math="K_b" />) = <InlineMath math="0.51 \, ^{\circ}C/m" /></p>
            </div>
          </div>
          
          <div className="mt-12 p-8 bg-black/20 rounded-3xl border border-white/10 shadow-2xl">
            <h5 className="text-xl font-black text-white mb-6">جدول قيمة (n) للمواد:</h5>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div className="p-3 bg-white/5 rounded-xl">سكر: <InlineMath math="1" /></div>
              <div className="p-3 bg-white/5 rounded-xl"><InlineMath math="NaCl" />: <InlineMath math="2" /></div>
              <div className="p-3 bg-white/5 rounded-xl"><InlineMath math="CaCl_2" />: <InlineMath math="3" /></div>
              <div className="p-3 bg-white/5 rounded-xl"><InlineMath math="K_3PO_4" />: <InlineMath math="4" /></div>
              <div className="p-3 bg-white/5 rounded-xl"><InlineMath math="Al_2(SO_4)_3" />: <InlineMath math="5" /></div>
            </div>
          </div>

          <div className="space-y-10 mt-12">
            <SolvedExample 
              page="34"
              question="س/ احسب درجة غليان محلول مائي يحتوي على 0.2m من سكر الجلوكوز؟"
              solution={
                <div className="space-y-4 font-mono text-red-300" dir="ltr">
                  <p>ΔTb = Kb * m * i</p>
                  <p>ΔTb = 0.51 * 0.2 * 1 = 0.102 °C</p>
                  <p className="text-white font-sans" dir="rtl">درجة غليان المحلول = 100 + 0.102 = 100.102 °C</p>
                </div>
              }
            />

            <SolvedExample 
              page="34"
              question="س/ احسب مقدار الانخفاض في درجة التجمد لمحلول 0.1m من CaCl2؟"
              solution={
                <div className="space-y-4 font-mono text-cyan-300" dir="ltr">
                  <p>i = 3 (Ca + 2Cl)</p>
                  <p>ΔTf = Kf * m * i</p>
                  <p>ΔTf = 1.86 * 0.1 * 3 = 0.558 °C</p>
                  <p className="text-white font-sans" dir="rtl">درجة تجمد المحلول = 0 - 0.558 = -0.558 °C</p>
                </div>
              }
            />
          </div>
        </GlassCard>

        <TeacherNote>
          لماذا تختلف القيمة الفعلية للانخفاض درجة تجمد محلول ألكتروليتي عن قيمة انخفاض درجة تجمده المحسوبة علي أساس تركيز الجسيمات؟
          <br />
          الجواب / يعود سبب الاختلاف إلى قوة التجاذب بين الأيونات في المحلول. تكون قوى الجذب أقوى في المحاليل المركزة.
        </TeacherNote>
      </section>

      {/* الأسئلة الوزارية والتمارين */}
      <section id="ministerial">
        <SectionHeader title="الأسئلة الوزارية والتمارين" icon={BookOpen} />
        
        <GlassCard title="نماذج من الأسئلة الوزارية">
          <Quiz 
            page="51"
            question="2020/ عند تفكك كبريتات الالمنيوم Al2(SO4)3 في الماء ما عدد مولات الايونات الناتجة من اذابة 1.4 mol من كبريتات الالمنيوم؟"
            options={["5 mol", "7 mol", "4.2 mol", "2.4 mol"]}
            correctAnswer={1}
          />

          <Quiz 
            page="52"
            question="2013/ ما الانخفاض التقريبي لدرجة تجمد محلول مائي 0.05m FeCl3؟"
            options={["-0.019", "-0.093", "-0.28", "-0.372"]}
            correctAnswer={3}
          />

          <SolvedExample 
            page="58"
            question="س/ اكتب معادلة التفكك في الماء لمركب MgCl2 وحدد عدد مولات كل أيون ناتج؟"
            solution={
              <div className="space-y-4">
                <BlockMath math="MgCl_{2(s)} \xrightarrow{H_2O} Mg^{2+}_{(aq)} + 2Cl^-_{(aq)}" />
                <p className="text-gray-300">ينتج 1mol من أيونات المغنيسيوم و 2mol من أيونات الكلوريد.</p>
                <p className="text-cyan-400 font-bold">العدد الكلي للمولات الناتجة = 3mol</p>
              </div>
            }
          />
        </GlassCard>

        <GlassCard title="أسئلة الفصل الأول">
          <Quiz 
            page="54"
            question="1. حمض الاسيتيك الكتروليت ضعيف لانه:"
            options={[
              "يمتزج مع الماء",
              "يكون ايونات الهيدرونيوم والهيدروكسيد في المحلول المائي",
              "يخفض درجة تجمد الماء",
              "يتأين قليل منه في المحلول المائي"
            ]}
            correctAnswer={3}
          />

          <Quiz 
            page="54"
            question="2. أي المحاليل التالية يحتوي على أعلى تركيز من أيونات الهيدرونيوم H3O+؟"
            options={["0.10 M HCl", "0.10 M HF", "0.10 M CH3COOH", "0.10 M NaCl"]}
            correctAnswer={0}
          />

          <SolvedExample 
            page="53"
            question="س/ احسب الانخفاض المتوقع في درجة تجمد محلول من 0.200 m KNO3؟"
            solution={
              <div className="space-y-4 font-mono text-cyan-300" dir="ltr">
                <p>i = 2 (K+ + NO3-)</p>
                <p>ΔTf = Kf * m * i</p>
                <p>ΔTf = 1.86 * 0.200 * 2 = 0.744 °C</p>
                <p className="text-white font-sans" dir="rtl">الانخفاض في درجة التجمد = 0.744 °C</p>
              </div>
            }
          />
        </GlassCard>

        <GlassCard title="مراجعة المفاهيم">
          <Definition title="قوة المذاب كإلكتروليت">
            الحد الذي بموجبه يكون المركب أيونات لدى ذوبانه (صفحة 57).
          </Definition>
          
          <TeacherNote>
            يختلف معنى (قوي وضعيف) عن (مركز ومخفف). القوي والضعيف يعود لدرجة التفكك أو التأين، بينما المركز والمخفف يعود لكمية المذاب في كمية محددة من المذيب.
          </TeacherNote>
        </GlassCard>

        <GlassCard title="المسائل الحسابية">
          <SolvedExample 
            page="60"
            question="س/ حدد المولالية لمحلول يحتوي على لالاإلكتروليت مجهول في الماء إذا كان انخفاض درجة تجمده يساوي -0.930 °C؟"
            solution={
              <div className="space-y-4 font-mono text-cyan-300" dir="ltr">
                <p>ΔTf = Kf * m</p>
                <p>0.930 = 1.86 * m</p>
                <p>m = 0.930 / 1.86 = 0.500 m</p>
              </div>
            }
          />

          <SolvedExample 
            page="61"
            question="س/ كم جراما من المادة المضادة للتجمد C2H4(OH)2 يلزم لكل 500g من الماء لمنعه من التجمد عند -20.0 °C؟ (الكتلة المولية = 62 g/mol)"
            solution={
              <div className="space-y-4 font-mono text-cyan-300" dir="ltr">
                <p>ΔTf = Kf * m</p>
                <p>20.0 = 1.86 * m</p>
                <p>m = 20.0 / 1.86 = 10.75 mol/kg</p>
                <p>n = m * mass_solvent = 10.75 * 0.5 = 5.375 mol</p>
                <p>mass = n * Molar_mass = 5.375 * 62 = 333.25 g ≈ 334 g</p>
              </div>
            }
          />
        </GlassCard>
      </section>

      <div className="text-center py-20">
        <p className="text-gray-500 text-sm underline underline-offset-8 decoration-white/10">
          جميع البيانات مستخرجة بدقة من ملزمة الأستاذ أحمد قاسم - الفصل الأول.
        </p>
      </div>

      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 left-8 p-4 bg-cyan-500 text-white rounded-full shadow-2xl hover:bg-cyan-600 transition-all hover:scale-110 active:scale-95 z-50 group"
      >
        <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
      </button>

    </div>
  );
}
