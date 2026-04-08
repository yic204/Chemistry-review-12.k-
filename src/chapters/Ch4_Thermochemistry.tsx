import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { 
  Flame, 
  Thermometer, 
  Activity, 
  Zap, 
  Scale, 
  Info, 
  AlertTriangle,
  Layers,
  Wind,
  Calculator,
  Target,
  Droplets,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  ArrowRightLeft,
  ArrowUpRight,
  ArrowDownRight,
  Coffee
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import 'katex/dist/katex.min.css';

// --- UI Components ---

const GlassCard = ({ children, title, page, className = "" }: { children: React.ReactNode, title?: string, page?: string | number, className?: string }) => (
  <div className={`p-6 md:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl my-10 relative ${className}`}>
    {page && (
      <div className="absolute top-4 left-4 px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-lg text-orange-400 text-[10px] font-black uppercase tracking-widest">
        الصفحة {page}
      </div>
    )}
    {title && <h4 className="text-3xl font-black text-white mb-8 border-r-4 border-orange-500 pr-4">{title}</h4>}
    {children}
  </div>
);

const SectionHeader = ({ title, icon: Icon }: { title: string, icon: any }) => (
  <div className="flex items-center gap-5 mb-12 border-b border-white/10 pb-6 mt-20">
    <div className="p-4 rounded-2xl bg-orange-500/20 border border-orange-500/30">
      <Icon className="w-10 h-10 text-orange-400" />
    </div>
    <h3 className="text-4xl font-black text-white tracking-tight">{title}</h3>
  </div>
);

const Definition = ({ title, children }: { title: string | React.ReactNode, children: React.ReactNode }) => (
  <div className="mb-6 p-6 bg-white/5 rounded-2xl border-r-4 border-orange-500">
    <h4 className="text-orange-400 font-bold mb-2 text-xl">{title}</h4>
    <div className="text-gray-200 leading-relaxed text-lg">{children}</div>
  </div>
);

const TeacherNote = ({ children, page }: { children: React.ReactNode, page?: string | number }) => (
  <div className="p-8 bg-yellow-500/10 border border-yellow-500/30 rounded-3xl my-10 relative overflow-hidden">
    {page && (
      <div className="absolute top-0 left-0 p-2 bg-yellow-500 text-black font-black text-[10px] rounded-br-xl">
        P.{page}
      </div>
    )}
    <div className="absolute top-0 right-0 p-3 bg-yellow-500 text-black font-black text-xs uppercase tracking-tighter rounded-bl-xl shadow-lg">
      ملاحظة الأستاذ أحمد قاسم
    </div>
    <div className="flex gap-4 items-start mt-4 font-medium text-gray-200 text-xl leading-relaxed">
      <Lightbulb className="w-8 h-8 text-yellow-500 shrink-0 animate-pulse" />
      <div>{children}</div>
    </div>
  </div>
);

const FormulaBox = ({ children, label, page }: { children: string, label?: string, page?: string | number }) => (
  <div className="my-10 relative group" dir="ltr">
    {page && (
      <div className="absolute -top-3 -left-3 px-2 py-1 bg-white/10 border border-white/20 rounded text-[10px] text-gray-400 font-mono">
        PAGE {page}
      </div>
    )}
    {label && (
      <div className="flex items-center justify-end gap-2 mb-4" dir="rtl">
        <Calculator className="w-5 h-5 text-orange-500" />
        <span className="text-sm font-black text-orange-500 uppercase tracking-[0.3em]">{label}</span>
      </div>
    )}
    <div className="w-full overflow-x-auto custom-scrollbar bg-black/80 rounded-3xl border border-white/10 p-10 transition-all group-hover:border-orange-500/50 shadow-2xl">
      <div className="min-w-max flex items-center justify-center text-4xl font-bold text-orange-300">
        <BlockMath math={children} />
      </div>
    </div>
  </div>
);

const SolvedExample = ({ question, solution, page }: { question: React.ReactNode, solution: React.ReactNode, page?: string | number }) => (
  <div className="p-8 bg-orange-500/5 border border-orange-500/20 rounded-3xl my-10 relative overflow-hidden">
    {page && (
      <div className="absolute top-0 left-0 p-2 bg-orange-500 text-black font-black text-[10px] rounded-br-xl">
        P.{page}
      </div>
    )}
    <div className="flex gap-4 items-start mb-6">
      <div className="p-3 rounded-xl bg-orange-500/20 text-orange-400">
        <Calculator className="w-6 h-6" />
      </div>
      <div className="text-xl font-bold text-white leading-relaxed">{question}</div>
    </div>
    <div className="p-6 bg-black/40 rounded-2xl border border-white/5 font-medium text-gray-300 leading-relaxed">
      <div className="text-orange-400 font-black mb-4 flex items-center gap-2">
        <Zap className="w-4 h-4" /> الحل:
      </div>
      {solution}
    </div>
  </div>
);

const Quiz = ({ question, options, correctAnswer, explanation, page }: { question: React.ReactNode, options: string[], correctAnswer: number, explanation?: React.ReactNode, page?: string | number }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="p-8 bg-white/5 border border-white/10 rounded-3xl my-10 relative overflow-hidden">
       {page && (
        <div className="absolute top-0 left-0 p-2 bg-white/20 text-white font-black text-[10px] rounded-br-xl">
          P.{page}
        </div>
      )}
      <div className="flex items-center gap-3 mb-8">
        <Target className="w-6 h-6 text-orange-400" />
        <h4 className="text-xl font-black text-white uppercase tracking-widest">اختبر نفسك</h4>
      </div>
      <div className="text-white text-2xl mb-8 font-bold leading-snug">{question}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelected(idx);
              setShowResult(true);
            }}
            disabled={showResult}
            className={`text-right px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
              showResult 
                ? idx === correctAnswer 
                  ? 'bg-green-500/20 border-green-500 text-green-400' 
                  : selected === idx 
                    ? 'bg-red-500/20 border-red-500 text-red-400' 
                    : 'bg-white/5 border-white/10 text-gray-600'
                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-orange-500/50'
            }`}
          >
            <span className="font-bold">{option}</span>
          </button>
        ))}
      </div>
      {showResult && explanation && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-8 p-6 bg-orange-500/10 rounded-2xl border border-orange-500/20 text-gray-200"
        >
          <div className="font-black text-orange-400 mb-2">التوضيح:</div>
          {explanation}
        </motion.div>
      )}
    </div>
  );
};

export default function Ch4_Thermochemistry_Final() {
  return (
    <div className="max-w-6xl mx-auto space-y-24 pb-40 text-right selection:bg-orange-500/30" dir="rtl">

      {/* الصفحة 1: الغلاف */}
      <section id="page-1">
        <div className="h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-orange-500/10 to-transparent rounded-[3rem] border border-white/10 relative overflow-hidden">
          <div className="absolute top-10 right-10 text-gray-500 font-black text-sm tracking-widest">صفحة 1</div>
          <Flame className="w-32 h-32 text-orange-400 mb-8 animate-pulse" />
          <h1 className="text-7xl font-black text-white mb-4 tracking-tighter">الكيمياء</h1>
          <h2 className="text-4xl font-bold text-orange-400 uppercase tracking-[0.2em]">فصل الرابع الكورس الاول</h2>
          <h3 className="text-3xl font-bold text-white mt-4 tracking-tight">الكيمياء الحرارية</h3>
          <div className="mt-12 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-center">
             <p className="text-gray-400 font-bold">اعداد استاذ أحمد قاسم محمد</p>
             <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">  يوسف صباح</p>
          </div>
        </div>
      </section>

      {/* الصفحة 2 */}
      <section id="page-2">
        <SectionHeader title="القسم 4-1: الكيمياء الحرارية" icon={Flame} />
        
        <GlassCard page="2">
          <p className="text-2xl text-gray-200 leading-relaxed mb-10">
            دراسة انتقال الطاقة على صورة حرارة الذي يصاحب التفاعلات الكيميائية والتغيرات الفيزيائية.
          </p>

          <Definition title="الطاقة المنتقلة">
            هي الطاقة المنطلقة أو الممتصة.
          </Definition>

          <div className="p-8 bg-orange-500/5 border border-orange-500/20 rounded-3xl my-10">
            <h5 className="text-xl font-bold text-white mb-4">س/ ما الجهاز المستخدم لقياس الطاقة المنتقلة؟</h5>
            <p className="text-gray-300 text-lg">جواب / الكالوريمتر أو المسعر الحراري.</p>
          </div>

          <div className="p-8 bg-white/5 rounded-3xl border border-white/10 my-10">
            <h6 className="text-xl font-bold text-orange-400 mb-6">مبدأ عمل المسعر الحراري:</h6>
            <p className="text-gray-300 text-lg leading-relaxed">
              يتم وضع عينة من مادة ذو كتلة معلومة لمعرفة طاقة احتراقه في صحن ويتم احتراق العينة بواسطة الاشرارة الكهربائية وبوجود اوكسجين نقي. تعمل الطاقة المتولدة نتيجة الاحتراق على تسخين الحاوية الفولاذية الماء المحيطة بها ومن خلال المحرار يتم قياس درجة حرارة الماء بدائية ونهائية ومن خلال تغير في الدرجة الحرارة يتم حساب كمية الطاقة التي يطلقها التفاعل.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-bl-full -mr-10 -mt-10 group-hover:bg-orange-500/20 transition-all" />
              <h5 className="text-orange-400 font-black mb-6 flex items-center gap-2 text-2xl">
                <Thermometer className="w-8 h-8" /> درجة الحرارة (T)
              </h5>
              <ul className="space-y-4 text-gray-300 font-medium text-lg">
                <li className="flex items-start gap-2">• التعريف: هو قياس معدل الطاقة الحركية لجسيمات عينة من المادة.</li>
                <li className="flex items-start gap-2">• العلاقة بين T ومعدل الطاقة الحركية طردية.</li>
                <li className="flex items-start gap-2">• وحدته: <InlineMath math="^{\circ}\text{C}" /> أو <InlineMath math="\text{K}" />.</li>
                <li className="flex items-start gap-2">• تقاس مباشرة.</li>
              </ul>
            </div>

            <div className="p-8 bg-orange-500/5 rounded-3xl border border-orange-500/20 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-bl-full -mr-10 -mt-10 group-hover:bg-orange-500/20 transition-all" />
              <h5 className="text-orange-400 font-black mb-6 flex items-center gap-2 text-2xl">
                <Zap className="w-8 h-8" /> الحرارة
              </h5>
              <ul className="space-y-4 text-gray-300 font-medium text-lg">
                <li className="flex items-start gap-2">• التعريف: صورة للطاقة تنتقل تلقائياً من جسم أعلى في درجة حرارته إلى جسم أقل في درجة حرارته.</li>
                <li className="flex items-start gap-2">• تعتمد على: طبيعة المادة، كتلة المادة، مقدار التغير في درجة الحرارة.</li>
                <li className="flex items-start gap-2">• وحدته: <InlineMath math="\text{J}" /> أو <InlineMath math="\text{KJ}" />.</li>
                <li className="flex items-start gap-2">• لا تقاس مباشرة.</li>
              </ul>
            </div>
          </div>

          <div className="p-8 bg-black/40 rounded-3xl border border-white/10 text-center">
            <p className="text-2xl text-white font-bold">** كلما زادت الطاقة الحركية لجسيمات المادة زادت درجة الحرارة وصارت المادة أكثر سخونة</p>
          </div>

          <div className="mt-16 space-y-8">
            <Quiz 
              page="2"
              question="1/ أي مما يلي يقيس معدل الطاقة الحركية لجسيمات عينة من مادة؟"
              options={["الكيمياء الحرارية", "سرعة التفاعلات", "الكيمياء الحركية", "درجة الحرارة"]}
              correctAnswer={3}
            />
            <Quiz 
              page="2"
              question="2/ تزداد الطاقة الحركية للجسيمات عينة من المادة عند:"
              options={["رفع درجة الحرارة", "خفض درجة الحرارة", "تثبيت درجة الحرارة", "اطلاق العينة طاقة على شكل حرارة"]}
              correctAnswer={0}
            />
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 3 */}
      <section id="page-3">
        <GlassCard page="3">
          <h5 className="text-2xl font-black text-white mb-8 border-r-4 border-orange-500 pr-4">العلاقة بين المقياس المئوي والكلفن</h5>
          
          <FormulaBox page="3" label="تحويل درجة الحرارة">
            {"K = 273 + ^{\circ}\text{C}"}
          </FormulaBox>

          <SolvedExample 
            page="3"
            question={<span>حول <InlineMath math="20 \, ^{\circ}\text{C}" /> إلى كلفن.</span>}
            solution={
              <div className="text-2xl font-mono" dir="ltr">
                <BlockMath math="K = 273 + ^{\circ}\text{C}" />
                <BlockMath math="K = 273 + 20" />
                <BlockMath math="K = 293" />
              </div>
            }
          />

          <Quiz 
            page="3"
            question="س/ كيف تحول درجة حرارة من الدرجة المئوية الى الكلفن؟"
            options={["باضافة 273", "بطرح 273", "بالضرب في 273", "بالقسمة على 273"]}
            correctAnswer={0}
          />

          <div className="mt-20">
            <SectionHeader title="الحرارة النوعية Cp" icon={Scale} />
            <Definition title="الحرارة النوعية">
              كمية الطاقة اللازمة لرفع درجة حرارة جرام واحد من المادة درجة مئوية واحدة أو كلفناً واحداً. وتقاس الحرارة النوعية تحت ضغط ثابت ورمزها <InlineMath math="C_p" />.
            </Definition>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <h6 className="text-orange-400 font-black mb-4 text-xl">وحداتها:</h6>
                <div className="flex flex-wrap gap-4 text-2xl font-mono text-cyan-300" dir="ltr">
                  <InlineMath math="\text{J/g.}^{\circ}\text{C}" />
                  <InlineMath math="\text{J/g.K}" />
                  <InlineMath math="\text{Cal/g.}^{\circ}\text{C}" />
                </div>
              </div>
              <div className="p-8 bg-orange-500/5 rounded-3xl border border-orange-500/20">
                <h6 className="text-orange-400 font-black mb-4 text-xl">الفائدة:</h6>
                <p className="text-gray-200 text-lg leading-relaxed">
                  تستخدم الحرارة النوعية لمقارنة الاختلاف بين المواد في قدرتها على امتصاص الطاقة.
                </p>
              </div>
            </div>

            <SolvedExample 
              page="3"
              question="مثال توضيحي للحرارة النوعية (الحديد والفضة)"
              solution={
                <div className="space-y-4">
                  <p>عند تسخين جرام واحد من الحديد حتى درجة حرارة <InlineMath math="100 \, ^{\circ}\text{C}" /> ثم تبريده الى درجة حرارة <InlineMath math="50 \, ^{\circ}\text{C}" /> في الكالوريمتر، ينقل الى الماء المحيط به ما مقداره <InlineMath math="22.5 \, \text{J}" /> من الطاقة.</p>
                  <p className="text-orange-400 font-bold">لكن مقدار ما ينقله جرام واحد من الفضة تحت نفس الشروط هو <InlineMath math="11.8 \, \text{J}" /> من الطاقة.</p>
                </div>
              }
            />
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 4 */}
      <section id="page-4">
        <GlassCard page="4" title="قوانين الحرارة النوعية">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h6 className="text-orange-400 font-black mb-6 text-xl">القانون الأول (باستخدام الكتلة):</h6>
              <FormulaBox label="قانون الكتلة">{"C_p = \\frac{q}{m \\times \\Delta T}"}</FormulaBox>
              <ul className="text-gray-400 space-y-2 mt-4">
                <li>أ / تستخدم عندما يعطى في السؤال الكتلة ولا تعطى الكتلة المولية.</li>
                <li>ب / تعطى في السؤال mol ويعطى كتلة المولية.</li>
              </ul>
            </div>
            <div className="p-8 bg-orange-500/5 rounded-3xl border border-orange-500/20">
              <h6 className="text-orange-400 font-black mb-6 text-xl">القانون الثاني (باستخدام المولات):</h6>
              <FormulaBox label="قانون المولات">{"C_p = \\frac{q}{mol \\times \\Delta T}"}</FormulaBox>
              <ul className="text-gray-400 space-y-2 mt-4">
                <li>أ / تستخدم عندما يعطى في السؤال عدد المولات ولا تعطى الكتلة المولية.</li>
                <li>ب / تعطى في السؤال g ويعطى كتلة المولية.</li>
              </ul>
            </div>
          </div>

          <TeacherNote page="4">
            قانون الأول والثاني بصورة رئيسية تعتمد على وحدة <InlineMath math="C_p" />.
          </TeacherNote>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-16">
            <div className="space-y-4 text-xl">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-orange-400 font-bold">q</span>
                <span className="text-gray-300">الطاقة المنطلقة أو الممتصة.</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-orange-400 font-bold">m</span>
                <span className="text-gray-300">كتلة العينة (g).</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-orange-400 font-bold">{"\\Delta T"}</span>
                <span className="text-gray-300">الفرق بين درجتي الحرارة الابتدائية والنهائية.</span>
              </div>
              <div className="bg-black/40 p-6 rounded-2xl border border-white/5 text-center">
                <BlockMath math="\\Delta T = T_2 - T_1" />
                <div className="flex justify-around mt-4 text-sm text-gray-400">
                  <span><InlineMath math="T_2" />: درجة الحرارة النهائية</span>
                  <span><InlineMath math="T_1" />: درجة الحرارة الابتدائية</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center p-8 bg-cyan-500/5 rounded-3xl border border-cyan-500/20">
              <Info className="w-12 h-12 text-cyan-400 mb-4" />
              <p className="text-xl text-white text-center leading-relaxed">
                أعلى حرارة نوعية يكون <span className="text-cyan-400 font-black">للماء</span> وأقل حرارة نوعية يكون <span className="text-orange-400 font-black">للرصاص الصلب</span>.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/10 mt-10">
            <table className="w-full text-center bg-black/20 border-collapse">
              <thead>
                <tr className="bg-orange-900/50 text-white">
                  <th className="p-6 border-b border-white/10 text-xl font-black">معاملات التحويل</th>
                  <th className="p-6 border-b border-white/10 text-xl font-black">العلاقة</th>
                </tr>
              </thead>
              <tbody className="text-gray-300 text-lg font-medium">
                <tr className="border-b border-white/5">
                  <td className="p-6 border-l border-white/5 font-mono">1 J = 0.2390 cal</td>
                  <td className="p-6 text-center font-mono">
                    <div className="flex flex-col gap-2">
                      <InlineMath math="\\frac{1 J}{0.2390 cal}" />
                      <InlineMath math="\\frac{0.2390 cal}{1 J}" />
                    </div>
                  </td>
                </tr>
                <tr className="bg-white/5">
                  <td className="p-6 border-l border-white/5 font-mono">1 cal = 4.184 J</td>
                  <td className="p-6 text-center font-mono">
                    <div className="flex flex-col gap-2">
                      <InlineMath math="\\frac{1 cal}{4.184 J}" />
                      <InlineMath math="\\frac{4.184 J}{1 cal}" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 5 */}
      <section id="page-5">
        <GlassCard page="5" title="أمثلة محلولة (1)">
          <SolvedExample 
            page="5"
            question="1- احسب الحرارة النوعية لمادة تمتص عينة منها كتلتها 35g كمية 48J من الطاقة عند تسخينها من 293K إلى 313K."
            solution={
              <div className="space-y-6 text-xl" dir="ltr">
                <BlockMath math="\\Delta T = T_2 - T_1" />
                <BlockMath math="\\Delta T = 313 - 293 = 20K" />
                <BlockMath math="C_p = \\frac{q}{m \\times \\Delta T}" />
                <BlockMath math="C_p = \\frac{48 \, J}{35 \, g \\times 20K} = 0.069 \, J/g.K" />
              </div>
            }
          />

          <SolvedExample 
            page="5"
            question="2- إذا أضيف 980KJ من الطاقة إلى 6.2L من الماء عند درجة حرارة 291K فما درجة الحرارة النهائية للماء علماً أن كثافة الماء 1g/ml وحرارته النوعية 4.18 J/g.K؟"
            solution={
              <div className="space-y-6 text-xl" dir="ltr">
                <div className="grid grid-cols-2 gap-4 text-sm text-cyan-400 mb-4" dir="rtl">
                  <span>q = 980 KJ</span>
                  <span>V = 6.2 L</span>
                  <span>T1 = 291 K</span>
                  <span>Cp = 4.18 J/g.K</span>
                  <span>D = 1 g/ml</span>
                </div>
                <BlockMath math="q = 980 \, KJ \\times 1000 = 980000 \, J" />
                <BlockMath math="V = 6.2L \\times \\frac{1000 \, mL}{1L} = 6200 \, mL" />
                <BlockMath math="m = D \\times V = 1 \, g/mL \\times 6200 \, mL = 6200 \, g" />
                <BlockMath math="\\Delta T = \\frac{q}{m \\times C_p} = \\frac{980000J}{6200 \, g \\times 4.18J/g.K} = 38K" />
                <BlockMath math="T_2 = \\Delta T + T_1 = 38K + 291K = 329K" />
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الصفحة 6 */}
      <section id="page-6">
        <GlassCard page="6" title="أمثلة محلولة (2)">
          <SolvedExample 
            page="6"
            question="3- احسب Cp لمعدن الانديوم علماً أن 1.0mol منه يمتص 53J عندما ترتفع درجة حرارته من 297.5K إلى 299.5K (In = 114 g/mol)."
            solution={
              <div className="space-y-6 text-xl" dir="ltr">
                <div className="text-sm text-cyan-400 mb-4" dir="rtl">
                  1.0 mol In = 114g = m
                </div>
                <BlockMath math="\\Delta T = T_2 - T_1 = 299.5 - 297.5 = 2K" />
                <BlockMath math="C_p = \\frac{q}{m \\times \\Delta T} = \\frac{53 \, J}{114 \, g \\times 2K} = 0.2324 \, J/g.K" />
              </div>
            }
          />

          <SolvedExample 
            page="6"
            question="4- إذا أضيف 340kJ من الطاقة إلى 1.7L من الزئبق عند درجة حرارة 293K، فما درجة الحرارة النهائية للزئبق بالسيليزي؟ (الحرارة النوعية للزئبق 0.140 J/g.°K وكثافة الزئبق هي 13.60 g/mL)."
            solution={
              <div className="space-y-6 text-xl" dir="ltr">
                <BlockMath math="m = D \\times V = \\frac{13.60g}{1mL} \\times \\frac{1.7L \\times 1000mL}{1L} = 23120g" />
                <BlockMath math="\\Delta T = \\frac{q}{C \\cdot m} = \\frac{3.4 \\times 10^5 J}{0.140 \\frac{J}{g.^{\circ}K} \\times 23120g} = 105.04K" />
                <BlockMath math="105.04K = T_2 - 293" />
                <BlockMath math="T_2 = 105.04 + 293 = 398.04K" />
                <div className="p-4 bg-orange-500/20 rounded-xl text-center text-orange-300 font-bold">
                  <InlineMath math="T_2 = 125.04 \, ^{\circ}\text{C}" />
                </div>
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الصفحة 7 */}
      <section id="page-7">
        <GlassCard page="7" title="تحديد هوية الفلز">
          <SolvedExample 
            page="7"
            question="5- امتصت قطعة من فلز غير معلوم كتلتها 50.0g كمية من الحرارة مقدارها 800J وارتفعت درجة حرارتها بمقدار 41.6°C. ما الحرارة النوعية للفلز؟ حدد هوية الفلز مستعيناً بالجدول."
            solution={
              <div className="space-y-8">
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full text-center bg-black/40">
                    <thead>
                      <tr className="bg-orange-500/20 text-orange-400">
                        <th className="p-4 border border-white/10">الفلز</th>
                        <th className="p-4 border border-white/10">الحديد (s)</th>
                        <th className="p-4 border border-white/10">النحاس (s)</th>
                        <th className="p-4 border border-white/10">الفضة (s)</th>
                        <th className="p-4 border border-white/10">الجاليوم (s)</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr>
                        <td className="p-4 border border-white/10 font-bold">الحرارة النوعية</td>
                        <td className="p-4 border border-white/10">0.44</td>
                        <td className="p-4 border border-white/10 text-cyan-400 font-black">0.385</td>
                        <td className="p-4 border border-white/10">0.240</td>
                        <td className="p-4 border border-white/10">0.900</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-2xl font-mono" dir="ltr">
                  <BlockMath math="C_p = \\frac{q}{\\Delta T \\cdot m} = \\frac{800J}{50.0g \\times 41.6^{\circ}C} = 0.385 \, J/g.^{\circ}K" />
                </div>
                <p className="text-xl text-center text-cyan-400 font-black">والفلز هو النحاس.</p>
              </div>
            }
          />

          <div className="mt-10 space-y-4">
            <Quiz 
              page="7"
              question="ب/ أي من الفلزات الموجودة في جدول أعلاه له حرارة نوعية الأعلى؟"
              options={["الحديد", "النحاس", "الفضة", "الجاليوم"]}
              correctAnswer={3}
            />
            <Quiz 
              page="7"
              question="ج/ أي من الفلزات الموجودة في جدول أعلاه يظهر تغيراً أقل في درجة حرارة؟"
              options={["الحديد", "النحاس", "الفضة", "الجاليوم"]}
              correctAnswer={3}
            />
            <Quiz 
              page="7"
              question="د/ أي من الفلزات الموجودة في جدول أعلاه يمتص طاقة أكبر؟"
              options={["الحديد", "النحاس", "الفضة", "الجاليوم"]}
              correctAnswer={3}
            />
          </div>

          <SolvedExample 
            page="7"
            question="6- سخن 1mol من الانديوم (In) الى 299.5K فأمتص طاقة مقدارها 53J فما درجة الحرارة قبل التسخين علماً Cp = 26.5 J/mol.K؟"
            solution={
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">2 K</div>
                <div className="p-4 bg-orange-500/20 rounded-xl border border-orange-500/30 text-orange-400 font-bold">24.5°C</div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">301.5 K</div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">55°C</div>
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الصفحة 8 */}
      <section id="page-8">
        <GlassCard page="8" title="تطبيقات إضافية على الحرارة النوعية">
          <SolvedExample 
            page="8"
            question="7- سخن 35g من مادة ما من 293K الى 313K وامتص 48J من الطاقة. كم يكتسب من الطاقة هذا النوع من المادة عند تسخينها من 313K الى 343K؟"
            solution={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-black/20 rounded-xl border border-white/5" dir="ltr">
                  <BlockMath math="C_p = \\frac{q}{m \\times \\Delta T}" />
                  <BlockMath math="C_p = \\frac{48 \, J}{35g \\times 20 \, K} = 0.06857 \, J/g.K" />
                </div>
                <div className="p-4 bg-orange-500/10 rounded-xl border border-orange-500/20" dir="ltr">
                  <BlockMath math="q = C_p \\times m \\times \\Delta T" />
                  <BlockMath math="q = 0.06857 \\times 35g \\times 30 \, K" />
                  <BlockMath math="q = 72 \, J" />
                </div>
              </div>
            }
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 text-center">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-gray-400">72.45J</div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-gray-400">0.069J</div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-gray-400">74.25J</div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-gray-400">7.245J</div>
          </div>

          <SolvedExample 
            page="8"
            question="8- سخنت قطعة من سبيكة نحاس كتلتها 85.0g من درجة حرارة 30°C إلى 45°C خلال عملية التسخين امتصت القطعة 523J من الطاقة على شكل حرارة؟"
            solution={
              <ul className="space-y-4 text-lg">
                <li className="flex items-center gap-3">
                  <span className="text-orange-400 font-black">• ما الحرارة النوعية لسبيكة النحاس؟</span>
                  <span className="px-4 py-1 bg-cyan-500/20 rounded-lg text-cyan-300 font-mono">0.41 J/g.°C</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-orange-400 font-black">• كم تفقد هذه القطعة من طاقة إذا بردت من 45°C إلى 25°C؟</span>
                  <span className="px-4 py-1 bg-red-500/20 rounded-lg text-red-300 font-mono">-697 J</span>
                </li>
              </ul>
            }
          />

          <SolvedExample 
            page="8"
            question="9- احسب كمية الطاقة اللازمة لرفع درجة الحرارة 175g من الفضة من درجة 22.5°C إلى 40°C علماً Cp = 0.234 J/g.°C."
            solution={
              <div className="text-center">
                <div className="inline-block px-8 py-4 bg-orange-500/20 border border-orange-500/30 rounded-2xl text-3xl font-black text-orange-400">
                  الجواب: 717J
                </div>
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الصفحة 9 */}
      <section id="page-9">
        <GlassCard page="9" title="بنك الأسئلة (الحرارة النوعية)">
          <div className="space-y-8">
            <Quiz 
              page="9"
              question="10/ الحرارة النوعية هي:"
              options={[
                "كمية الطاقة المنطلقة لرفع درجة حرارة جرام واحد من المادة درجة مئوية واحدة (1°C) و كلفناً واحداً (1K)",
                "كمية الطاقة اللازمة لرفع درجة حرارة جرام واحد من المادة درجة مئوية واحدة (1°C) و كلفناً واحداً (1K)",
                "كمية الحرارة المنبعثة او الممتصة من تكوين مول واحد من المركب من عناصره الاولية",
                "قياس معدل الطاقة الحركية لجسيمات عينة من المادة"
              ]}
              correctAnswer={1}
            />
            <Quiz 
              page="9"
              question="11/ اي مما يلي يقيس معدل الطاقة الحركية لجسيمات عينة من المادة؟"
              options={["الكيمياء الحركية", "الحرارة", "درجة الحرارة", "سرعة التفاعلات"]}
              correctAnswer={2}
            />
            <Quiz 
              page="9"
              question="12/ الطاقة المنتقلة بين مادتين بسبب الفرق بين درجتي حرارتهما يسمى؟"
              options={["المحتوى الحراري", "الكيمياء الحركية", "درجة الحرارة", "الحرارة"]}
              correctAnswer={3}
            />
            <Quiz 
              page="9"
              question="13/ كمية الحرارة اللازمة لرفع درجة حرارة غرام واحد من المادة ما 1°C أو 1K تسمى؟"
              options={["الحرارة النوعية", "طاقة التكوين", "الطاقة الحرارية", "حرارة التفاعل"]}
              correctAnswer={0}
            />
            <Quiz 
              page="9"
              question="14/ تعتمد كمية الطاقة المنتقلة كحرارة خلال عملية التغير في درجة الحرارة على؟"
              options={["طبيعة المادة", "كتلة المادة", "مقدار التغير في درجة الحرارة", "كل الاجابات صحيحة"]}
              correctAnswer={3}
            />
            <Quiz 
              page="9"
              question="15/ احسب الحرارة النوعية لمادة تمتص عينة منها كتلتها 35g كمية 48J من الطاقة عند تسخينها من 293K الى 313K؟"
              options={["0.087", "0.068", "0.05", "0.03"]}
              correctAnswer={1}
            />
            <Quiz 
              page="9"
              question="16/ اذا اضيف 980KJ من الطاقة الى 6.2L من الماء عند درجة حرارة 291K فما درجة الحرارة النهائية للماء؟ (حرارة النوعية للماء 4.18 J/g.K، كثافة الماء 1g/ml)"
              options={["499 K", "329 K", "400 K", "621 K"]}
              correctAnswer={1}
            />
            <Quiz 
              page="9"
              question="17/ ما الطاقة التي تمتصها 20g من الذهب على صورة حرارة اذا سخنت من درجة حرارة 25°C الى 35°C علماً ان الحرارة النوعية للذهب 0.13 J/g.K؟"
              options={["26.1 J", "26 J/g.C", "0.0006 J", "0.0006 J/g.C"]}
              correctAnswer={0}
            />
            <Quiz 
              page="9"
              question="18/ امتص 100g من الماء عند 20°C، 20920J من الطاقة الحرارية، ما درجة الحرارة النهائية للماء علماً بأن Cp = 4.18 J/g.C؟"
              options={["50°C", "343 K", "30°C", "323 K"]}
              correctAnswer={1}
            />
            <Quiz 
              page="9"
              question="19/ اضيف 0.25kJ من الطاقة الى 10g من مادة ما. تغيرت درجة الحرارة بمقدار 50K فأن الحرارة النوعية تساوي:"
              options={["0.0005 J/(mol.k)", "0.5 J/(mol.k)", "0.5 J/(g.k)", "0.5 kJ/(g.k)"]}
              correctAnswer={2}
            />
            <Quiz 
              page="9"
              question="20/ إذا تمت إضافة 3.5KJ من الطاقة إلى عينة 28.15g من الحديد عند 20°C، تكون درجة الحرارة النهائية للحديد بـ الكلفن هي: (Cp = 0.449 J/(g.K))"
              options={["277", "570", "297", "470"]}
              correctAnswer={1}
            />
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 10 */}
      <section id="page-10">
        <GlassCard page="10" title="حرارة التفاعل والمحتوى الحراري">
          <div className="space-y-6">
            <Definition title="حرارة التفاعل">
              هي كمية الطاقة المنتقلة (الممتصة أو المنطلقة) كحرارة أثناء حدوث التفاعل الكيميائي تحت ضغط ثابت.
            </Definition>
            <Definition title="التغير في المحتوى الحراري ΔH">
              هي كمية الطاقة الممتصة أو المنطلقة على صورة حرارة من قبل نظام معين خلال عملية تجري تحت ضغط ثابت. وحدته (KJ).
            </Definition>
          </div>

          <div className="my-12 p-8 bg-black/40 rounded-3xl border border-white/10 text-center">
            <BlockMath math="\\Delta H = H_{products} - H_{reactants}" />
            <div className="flex justify-center gap-10 mt-6 text-gray-400">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500" /> <InlineMath math="H_{products}" /> نواتج</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-cyan-500" /> <InlineMath math="H_{reactants}" /> متفاعلات</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
            <div className="p-8 bg-red-500/10 border border-red-500/30 rounded-3xl">
              <h6 className="text-red-400 font-black mb-4 text-xl">تفاعل طارد للحرارة (- = ΔH):</h6>
              <p className="text-gray-200 leading-relaxed"><InlineMath math="H_1 > H_2" /> أي المتفاعلات أعلى طاقة وأقل استقراراً، والنواتج أقل طاقة وأكثر استقراراً.</p>
            </div>
            <div className="p-8 bg-green-500/10 border border-green-500/30 rounded-3xl">
              <h6 className="text-green-400 font-black mb-4 text-xl">تفاعل ماص للحرارة (+ = ΔH):</h6>
              <p className="text-gray-200 leading-relaxed"><InlineMath math="H_2 > H_1" /> أي النواتج أعلى طاقة وأقل استقراراً، والمتفاعلات أقل طاقة وأكثر استقراراً.</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/10 mt-10">
            <table className="w-full text-right border-collapse bg-black/20">
              <thead>
                <tr className="bg-orange-900/50 text-white">
                  <th className="p-5 border-b border-white/10 text-xl font-black">طارد</th>
                  <th className="p-5 border-b border-white/10 text-xl font-black">ماص</th>
                </tr>
              </thead>
              <tbody className="text-gray-300 font-medium">
                <tr className="border-b border-white/5">
                  <td className="p-5">1/ الحرارة تكتب على اليمين جهة المواد الناتجة.</td>
                  <td className="p-5">1/ الحرارة تكتب على اليسار جهة المواد المتفاعلة.</td>
                </tr>
                <tr className="bg-white/5 border-b border-white/5">
                  <td className="p-5" dir="ltr"><InlineMath math="2\text{H}_2\text{(g)} + \text{O}_2\text{(g)} \rightarrow 2\text{H}_2\text{O}\text{(g)} + 483.6 \, \text{KJ}" /></td>
                  <td className="p-5" dir="ltr"><InlineMath math="2\text{H}_2\text{O}\text{(g)} + 483.6 \, \text{KJ} \rightarrow 2\text{H}_2\text{(g)} + \text{O}_2\text{(g)}" /></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-5 font-black text-red-400">ΔH = -</td>
                  <td className="p-5 font-black text-green-400">ΔH = +</td>
                </tr>
                <tr className="bg-white/5 border-b border-white/5">
                  <td className="p-5">3/ تفاعل الاحتراق.</td>
                  <td className="p-5">3/ تفاعل التفكك (بالتسخين).</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-5">4/ التجمد و التكثيف.</td>
                  <td className="p-5">4/ الانصهار و الغليان و التسامي والتبخير.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 11 */}
      <section id="page-11">
        <GlassCard page="11" title="تطبيقات على معادلة التفاعل">
          <div className="p-8 bg-white/5 rounded-3xl border border-white/10 mb-10">
            <h5 className="text-xl font-bold text-white mb-6">س/ لديك التفاعل التالي:</h5>
            <div className="text-3xl font-mono text-cyan-300 text-center mb-8" dir="ltr">
              <InlineMath math="2\text{H}_2\text{O}\text{(g)} + 483.6 \, \text{KJ} \rightarrow 2\text{H}_2\text{(g)} + \text{O}_2\text{(g)}" />
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                <span className="text-gray-300">1/ جد ΔH</span>
                <span className="text-green-400 font-black">+483.6 KJ</span>
              </div>

              <div className="p-6 bg-orange-500/5 rounded-2xl border border-orange-500/20">
                <p className="text-gray-300 mb-4">2/ جد ΔH للتفاعل العكسي: <InlineMath math="2\text{H}_2\text{(g)} + \text{O}_2\text{(g)} \rightarrow 2\text{H}_2\text{O}\text{(g)}" /></p>
                <div className="flex items-center justify-between">
                  <TeacherNote page="11">عند قلب المعادلة أو اذا طلب قيمة ΔH للتفاعل العكسي (فتقلب اشارة ΔH فقط).</TeacherNote>
                  <span className="text-red-400 font-black text-2xl">-483.6 KJ</span>
                </div>
              </div>

              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-gray-300 mb-4">3/ جد ΔH للتفاعل التالي: <InlineMath math="4\text{H}_2\text{O}\text{(g)} \rightarrow 4\text{H}_2\text{(g)} + 2\text{O}_2\text{(g)}" /> (أو لمولين من O2)؟</p>
                <div className="flex items-center justify-between">
                  <TeacherNote page="11">عند ضرب المعادلة في أي رقم معين تضرب قيمة ΔH في نفس الرقم.</TeacherNote>
                  <span className="text-cyan-400 font-black text-2xl">+967.2 KJ</span>
                </div>
              </div>

              <div className="p-6 bg-orange-500/5 rounded-2xl border border-orange-500/20">
                <p className="text-gray-300 mb-4">4/ جد ΔH للتفاعل التالي: <InlineMath math="1\text{H}_2\text{O}\text{(g)} \\rightarrow 1\text{H}_2\text{(g)} + 1/2 \, \text{O}_2\text{(g)}" /> (أو لمول واحد من H2)؟</p>
                <div className="flex items-center justify-between">
                  <TeacherNote page="11">عند قسمة المعادلة على أي رقم معين فان قيمة ΔH تقسم على نفس الرقم.</TeacherNote>
                  <span className="text-cyan-400 font-black text-2xl">+241.8 KJ</span>
                </div>
              </div>

              <SolvedExample 
                page="11"
                question="5/ جد التغير في المحتوى الحراري لنصف مول من H2؟"
                solution={
                  <div className="flex justify-center items-center gap-10" dir="ltr">
                    <div className="text-center">
                      <div className="text-sm text-gray-500 mb-2">mol</div>
                      <div className="text-xl font-bold">2</div>
                      <div className="text-xl font-bold">0.5</div>
                    </div>
                    <ArrowRightLeft className="w-8 h-8 text-orange-500" />
                    <div className="text-center">
                      <div className="text-sm text-gray-500 mb-2">ΔH°</div>
                      <div className="text-xl font-bold">483.6 KJ</div>
                      <div className="text-xl font-bold text-orange-400">X = 120.9 KJ</div>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 12 */}
      <section id="page-12">
        <GlassCard page="12" title="المعادلة الكيميائية الحرارية والظروف القياسية">
          <div className="space-y-6">
            <Definition title="المعادلة الكيميائية الحرارية">
              هي معادلة كيميائية تتضمن مقدار الطاقة الممتصة أو المنطلقة كحرارة أثناء التفاعل.
            </Definition>
            <TeacherNote page="12">
              تعتمد قيمة التغير في المحتوى الحراري على الحالة الفيزيائية للمواد (صلبة، سائلة، غازية).
            </TeacherNote>
            <Definition title="التغير في المحتوى الحراري القياسي ΔH°">
              هو التغير في المحتوى الحراري الذي يتم قياسه عند الظروف القياسية (درجة حرارة 25°C وضغط 101.325 kPa).
            </Definition>
            <Definition title="حرارة التكوين القياسية ΔH°f">
              هي كمية الحرارة المنبعثة أو الممتصة من تكوين مول واحد من المركب من عناصره الأولية في حالاتها القياسية عند الظروف القياسية.
            </Definition>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
            <div className="p-8 bg-cyan-500/5 border border-cyan-500/20 rounded-3xl flex flex-col items-center text-center">
              <Info className="w-12 h-12 text-cyan-400 mb-4" />
              <p className="text-xl text-white leading-relaxed">
                قيمة <InlineMath math="\Delta H_f^{\circ}" /> لأي عنصر في حالته القياسية تساوي <span className="text-cyan-400 font-black">صفراً</span>.
              </p>
            </div>
            <div className="p-8 bg-orange-500/5 border border-orange-500/20 rounded-3xl">
              <h6 className="text-orange-400 font-black mb-4 text-xl">استقرار المركبات:</h6>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-2">• المركبات ذات القيم السالبة الكبيرة لـ <InlineMath math="\Delta H_f^{\circ}" /> تكون مستقرة جداً.</li>
                <li className="flex items-start gap-2">• المركبات ذات القيم الموجبة أو السالبة الصغيرة تكون غير مستقرة وقد تتفكك تلقائياً.</li>
              </ul>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 13 */}
      <section id="page-13">
        <GlassCard page="13" title="حرارة الاحتراق القياسية وحساب ΔH°">
          <div className="space-y-6">
            <Definition title="حرارة الاحتراق القياسية ΔH°c">
              هي التغير في المحتوى الحراري الذي يحدث عند الاحتراق الكامل لمول واحد من المادة في الظروف القياسية.
            </Definition>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
                <p className="text-red-400 font-bold">تفاعلات الاحتراق دائماً طاردة للحرارة (ΔH دائماً سالبة).</p>
              </div>
              <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                <p className="text-blue-400 font-bold">احتراق الهيدروكربونات ينتج دائماً CO2 و H2O.</p>
              </div>
            </div>
          </div>

          <div className="my-10 p-8 bg-black/40 rounded-3xl border border-white/10">
            <h6 className="text-white font-bold mb-4">مثال على احتراق البروبان:</h6>
            <div className="text-2xl font-mono text-center" dir="ltr">
              <InlineMath math="\text{C}_3\text{H}_8\text{(g)} + 5\text{O}_2\text{(g)} \\rightarrow 3\text{CO}_2\text{(g)} + 4\text{H}_2\text{O}\text{(l)} + 2219.2 \, \text{KJ}" />
              <div className="mt-4 text-orange-400 font-black">
                <InlineMath math="\Delta H_c^{\circ} = -2219.2 \, \text{KJ/mol}" />
              </div>
            </div>
          </div>

          <div className="p-10 bg-orange-500/5 rounded-3xl border border-orange-500/20 text-center">
            <h5 className="text-2xl font-black text-orange-400 mb-8">قانون حساب التغير في المحتوى الحراري للتفاعل:</h5>
            <FormulaBox label="القانون العام">
              {"\\Delta H^{\\circ} = \\sum n \\Delta H_f^{\\circ} (\text{products}) - \\sum n \\Delta H_f^{\\circ} (\text{reactants})"}
            </FormulaBox>
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 14 */}
      <section id="page-14">
        <GlassCard page="14" title="أمثلة حسابية على ΔH°">
          <SolvedExample 
            page="14"
            question="1- احسب التغير في المحتوى الحراري القياسي للتفاعل التالي: CH4(g) + 2O2(g) → CO2(g) + 2H2O(l)"
            solution={
              <div className="space-y-6 text-xl" dir="ltr">
                <div className="grid grid-cols-3 gap-4 text-sm text-cyan-400 mb-4" dir="rtl">
                  <span>ΔHf°(CH4) = -74.9</span>
                  <span>ΔHf°(CO2) = -393.5</span>
                  <span>ΔHf°(H2O) = -285.8</span>
                </div>
                <BlockMath math="\\Delta H^{\\circ} = [(-393.5) + 2(-285.8)] - [(-74.9) + 2(0)]" />
                <BlockMath math="\\Delta H^{\\circ} = [-393.5 - 571.6] + 74.9" />
                <BlockMath math="\\Delta H^{\\circ} = -890.2 \, KJ" />
              </div>
            }
          />

          <SolvedExample 
            page="14"
            question="2- احسب ΔH° للتفاعل التالي: 2H2S(g) + 3O2(g) → 2H2O(l) + 2SO2(g)"
            solution={
              <div className="space-y-6 text-xl" dir="ltr">
                <div className="grid grid-cols-3 gap-4 text-sm text-cyan-400 mb-4" dir="rtl">
                  <span>ΔHf°(H2S) = -20.6</span>
                  <span>ΔHf°(H2O) = -285.8</span>
                  <span>ΔHf°(SO2) = -296.8</span>
                </div>
                <BlockMath math="\\Delta H^{\\circ} = [2(-285.8) + 2(-296.8)] - [2(-20.6) + 3(0)]" />
                <BlockMath math="\\Delta H^{\\circ} = [-571.6 - 593.6] + 41.2" />
                <BlockMath math="\\Delta H^{\\circ} = -1124 \, KJ" />
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الصفحة 15 */}
      <section id="page-15">
        <GlassCard page="15" title="قانون هس (Hess's Law)">
          <div className="space-y-6">
            <Definition title="قانون هس">
              التغير في المحتوى الحراري الكلي في تفاعل كيميائي هو نفسه سواء حدث التفاعل في خطوة واحدة أو في عدة خطوات.
            </Definition>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h6 className="text-orange-400 font-bold mb-4">أهمية قانون هس:</h6>
              <p className="text-gray-300 leading-relaxed">
                يستخدم لحساب التغير في المحتوى الحراري للتفاعلات التي تحدث ببطء شديد أو التي يصعب قياس حرارتها مباشرة.
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-black/40 rounded-3xl border border-white/10">
            <h6 className="text-white font-bold mb-6 text-center">مثال توضيحي: تكوين CO2 من الكربون والأوكسجين</h6>
            <div className="space-y-4 font-mono text-lg" dir="ltr">
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                <span>C(s) + 1/2 O2(g) → CO(g)</span>
                <span className="text-red-400">ΔH = -110.5 KJ</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                <span>CO(g) + 1/2 O2(g) → CO2(g)</span>
                <span className="text-red-400">ΔH = -283.0 KJ</span>
              </div>
              <div className="h-px bg-white/20 my-4" />
              <div className="flex justify-between items-center p-4 bg-orange-500/20 rounded-xl border border-orange-500/30">
                <span className="font-black">C(s) + O2(g) → CO2(g)</span>
                <span className="text-orange-400 font-black">ΔH = -393.5 KJ</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 16 */}
      <section id="page-16">
        <GlassCard page="16" title="تطبيقات قانون هس (1)">
          <SolvedExample 
            page="16"
            question="مثال 1: احسب التغير في المحتوى الحراري لتكوين الاستيلين من عناصره الأولية: 2C(s) + H2(g) → C2H2(g)"
            solution={
              <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-sm font-mono" dir="ltr">
                  1) C2H2(g) + 5/2 O2(g) → 2CO2(g) + H2O(l) ΔH = -1299.5 KJ<br/>
                  2) C(s) + O2(g) → CO2(g) ΔH = -393.5 KJ<br/>
                  3) H2(g) + 1/2 O2(g) → H2O(l) ΔH = -285.8 KJ
                </div>
                <div className="space-y-4 text-lg">
                  <p className="text-orange-400 font-bold">• خطوات الحل:</p>
                  <ul className="list-decimal list-inside space-y-2 text-gray-300">
                    <li>نعكس المعادلة (1) ونغير إشارة ΔH.</li>
                    <li>نضرب المعادلة (2) في 2 ونضرب ΔH في 2.</li>
                    <li>نبقي المعادلة (3) كما هي.</li>
                  </ul>
                </div>
                <div className="p-6 bg-black/40 rounded-2xl border border-white/10 font-mono" dir="ltr">
                  <BlockMath math="\\Delta H = (+1299.5) + 2(-393.5) + (-285.8)" />
                  <BlockMath math="\\Delta H = 1299.5 - 787.0 - 285.8" />
                  <div className="text-center text-2xl text-orange-400 font-black mt-4">
                    <InlineMath math="\\Delta H = +226.7 \, KJ" />
                  </div>
                </div>
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الصفحة 17 */}
      <section id="page-17">
        <GlassCard page="17" title="تطبيقات قانون هس (2)">
          <SolvedExample 
            page="17"
            question="مثال 2: احسب ΔH لتكوين الميثان: C(s) + 2H2(g) → CH4(g)"
            solution={
              <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-sm font-mono" dir="ltr">
                  1) C(s) + O2(g) → CO2(g) ΔH = -393.5 KJ<br/>
                  2) H2(g) + 1/2 O2(g) → H2O(l) ΔH = -285.8 KJ<br/>
                  3) CH4(g) + 2O2(g) → CO2(g) + 2H2O(l) ΔH = -890.3 KJ
                </div>
                <div className="p-6 bg-black/40 rounded-2xl border border-white/10 font-mono" dir="ltr">
                  <p className="text-cyan-400 mb-4" dir="rtl">الحل:</p>
                  <BlockMath math="\\Delta H = (-393.5) + 2(-285.8) + (+890.3)" />
                  <BlockMath math="\\Delta H = -393.5 - 571.6 + 890.3" />
                  <div className="text-center text-2xl text-orange-400 font-black mt-4">
                    <InlineMath math="\\Delta H = -74.8 \, KJ" />
                  </div>
                </div>
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الصفحة 18 */}
      <section id="page-18">
        <GlassCard page="18" title="تطبيقات قانون هس (3)">
          <SolvedExample 
            page="18"
            question="مثال 3: احسب ΔH لتكوين الإيثان: 2C(s) + 3H2(g) → C2H6(g)"
            solution={
              <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-sm font-mono" dir="ltr">
                  1) C(s) + O2(g) → CO2(g) ΔH = -393.5 KJ<br/>
                  2) H2(g) + 1/2 O2(g) → H2O(l) ΔH = -285.8 KJ<br/>
                  3) 2C2H6(g) + 7O2(g) → 4CO2(g) + 6H2O(l) ΔH = -3119.6 KJ
                </div>
                <div className="p-6 bg-black/40 rounded-2xl border border-white/10 font-mono" dir="ltr">
                  <p className="text-cyan-400 mb-4" dir="rtl">الحل:</p>
                  <BlockMath math="\\Delta H = 2(-393.5) + 3(-285.8) + (3119.6 / 2)" />
                  <BlockMath math="\\Delta H = -787.0 - 857.4 + 1559.8" />
                  <div className="text-center text-2xl text-orange-400 font-black mt-4">
                    <InlineMath math="\\Delta H = -84.6 \, KJ" />
                  </div>
                </div>
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الصفحة 19 */}
      <section id="page-19">
        <GlassCard page="19" title="بنك الأسئلة (المحتوى الحراري وهس)">
          <div className="space-y-8">
            <Quiz 
              page="19"
              question="21/ كمية الطاقة الممتصة أو المنطلقة على صورة حرارة من قبل نظام معين خلال عملية تجري تحت ضغط ثابت تسمى؟"
              options={["درجة الحرارة", "المحتوى الحراري", "الحرارة النوعية", "حرارة التكوين"]}
              correctAnswer={1}
            />
            <Quiz 
              page="19"
              question="22/ تكون قيمة ΔH للتفاعل الطارد للحرارة؟"
              options={["موجبة", "سالبة", "صفر", "لا يمكن التنبؤ بها"]}
              correctAnswer={1}
            />
            <Quiz 
              page="19"
              question="23/ تكون قيمة ΔH للتفاعل الماص للحرارة؟"
              options={["موجبة", "سالبة", "صفر", "لا يمكن التنبؤ بها"]}
              correctAnswer={0}
            />
            <Quiz 
              page="19"
              question="24/ قيمة ΔHf° لأي عنصر في حالته القياسية تساوي؟"
              options={["صفر", "100", "قيمة سالبة", "قيمة موجبة"]}
              correctAnswer={0}
            />
            <Quiz 
              page="19"
              question="25/ التغير في المحتوى الحراري الكلي في تفاعل كيميائي هو نفسه سواء حدث التفاعل في خطوة واحدة أو في عدة خطوات:"
              options={["قانون هس", "قانون حفظ الطاقة", "قانون بويل", "قانون شارل"]}
              correctAnswer={0}
            />
            <Quiz 
              page="19"
              question="26/ المركبات ذات القيم السالبة الكبيرة لـ ΔHf° تكون:"
              options={["مستقرة جداً", "غير مستقرة", "تتفكك تلقائياً", "نشطة كيميائياً"]}
              correctAnswer={0}
            />
            <Quiz 
              page="19"
              question="27/ إذا كان ΔH لتفاعل H2 + 1/2 O2 → H2O هو -285.8 KJ، فإن ΔH لتفاعل 2H2O → 2H2 + O2 هو:"
              options={["-285.8", "+571.6", "-571.6", "+285.8"]}
              correctAnswer={1}
            />
            <Quiz 
              page="19"
              question="28/ إذا علم أن C + 1/2 O2 → CO (ΔH = -110.5) و CO + 1/2 O2 → CO2 (ΔH = -283.0)، فإن ΔH لتفاعل C + O2 → CO2 هو:"
              options={["-172.5", "+393.5", "-393.5", "+172.5"]}
              correctAnswer={2}
            />
            <Quiz 
              page="19"
              question="29/ إذا علم أن S + O2 → SO2 (ΔH = -296.8) و SO2 + 1/2 O2 → SO3 (ΔH = -98.9)، فإن ΔH لتفاعل S + 3/2 O2 → SO3 هو:"
              options={["-395.7", "-197.9", "+395.7", "+197.9"]}
              correctAnswer={0}
            />
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 20 */}
      <section id="page-20">
        <GlassCard page="20" title="الانتروبيا (Entropy)">
          <div className="space-y-6">
            <Definition title="الانتروبيا (S)">
              هي قياس لمدى العشوائية أو عدم الانتظام في نظام معين. يميل الكون دائماً نحو زيادة العشوائية.
            </Definition>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
              <div className="p-8 bg-green-500/10 border border-green-500/30 rounded-3xl">
                <h6 className="text-green-400 font-black mb-6 text-xl flex items-center gap-2">
                  <ArrowUpRight className="w-6 h-6" /> زيادة الانتروبيا (ΔS = +):
                </h6>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2">• الانصهار (صلب → سائل)</li>
                  <li className="flex items-center gap-2">• الغليان / التبخير (سائل → غاز)</li>
                  <li className="flex items-center gap-2">• التسامي (صلب → غاز)</li>
                  <li className="flex items-center gap-2">• زيادة درجة الحرارة</li>
                  <li className="flex items-center gap-2">• زيادة عدد الجسيمات (خاصة الغازية)</li>
                  <li className="flex items-center gap-2">• إذابة صلب في سائل</li>
                </ul>
              </div>

              <div className="p-8 bg-red-500/10 border border-red-500/30 rounded-3xl">
                <h6 className="text-red-400 font-black mb-6 text-xl flex items-center gap-2">
                  <ArrowDownRight className="w-6 h-6" /> نقصان الانتروبيا (ΔS = -):
                </h6>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2">• التجمد (سائل → صلب)</li>
                  <li className="flex items-center gap-2">• التكثيف (غاز → سائل)</li>
                  <li className="flex items-center gap-2">• الترسيب (غاز → صلب)</li>
                  <li className="flex items-center gap-2">• خفض درجة الحرارة</li>
                  <li className="flex items-center gap-2">• نقصان عدد الجسيمات الغازية</li>
                </ul>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 21 */}
      <section id="page-21">
        <GlassCard page="21" title="طاقة جيبس الحرة (Gibbs Free Energy)">
          <div className="space-y-6">
            <Definition title="طاقة جيبس الحرة (G)">
              هي دالة حالة تدمج بين المحتوى الحراري (H) والانتروبيا (S) لتحديد تلقائية التفاعل.
            </Definition>
            
            <div className="my-10 p-10 bg-orange-500/5 rounded-3xl border border-orange-500/20 text-center">
              <h5 className="text-2xl font-black text-orange-400 mb-8">معادلة جيبس:</h5>
              <FormulaBox label="القانون">
                {"\\Delta G = \\Delta H - T \\Delta S"}
              </FormulaBox>
              <p className="mt-4 text-gray-400 text-sm">ملاحظة: يجب أن تكون درجة الحرارة بالكلفن (K).</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-green-500/20 rounded-2xl border border-green-500/30">
                <span className="block text-green-400 font-black text-2xl mb-2">ΔG = -</span>
                <span className="text-gray-200">تفاعل تلقائي</span>
              </div>
              <div className="p-6 bg-red-500/20 rounded-2xl border border-red-500/30">
                <span className="block text-red-400 font-black text-2xl mb-2">ΔG = +</span>
                <span className="text-gray-200">تفاعل غير تلقائي</span>
              </div>
              <div className="p-6 bg-blue-500/20 rounded-2xl border border-blue-500/30">
                <span className="block text-blue-400 font-black text-2xl mb-2">ΔG = 0</span>
                <span className="text-gray-200">النظام في حالة اتزان</span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-white/10 mt-10">
              <table className="w-full text-center border-collapse bg-black/20">
                <thead>
                  <tr className="bg-orange-900/50 text-white">
                    <th className="p-4 border-b border-white/10">ΔH</th>
                    <th className="p-4 border-b border-white/10">ΔS</th>
                    <th className="p-4 border-b border-white/10">تلقائية التفاعل (ΔG)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-red-400 font-bold">-</td>
                    <td className="p-4 text-green-400 font-bold">+</td>
                    <td className="p-4 text-green-400">تلقائي دائماً</td>
                  </tr>
                  <tr className="bg-white/5 border-b border-white/5">
                    <td className="p-4 text-green-400 font-bold">+</td>
                    <td className="p-4 text-red-400 font-bold">-</td>
                    <td className="p-4 text-red-400">غير تلقائي دائماً</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-red-400 font-bold">-</td>
                    <td className="p-4 text-red-400 font-bold">-</td>
                    <td className="p-4">تلقائي عند درجات الحرارة المنخفضة</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="p-4 text-green-400 font-bold">+</td>
                    <td className="p-4 text-green-400 font-bold">+</td>
                    <td className="p-4">تلقائي عند درجات الحرارة العالية</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 22 */}
      <section id="page-22">
        <GlassCard page="22" title="أمثلة حسابية على طاقة جيبس">
          <SolvedExample 
            page="22"
            question="مثال 1: لتفاعل معين عند 298K، كانت ΔH = -176 KJ و ΔS = -0.285 KJ/K. هل التفاعل تلقائي؟"
            solution={
              <div className="space-y-6 text-xl" dir="ltr">
                <BlockMath math="\\Delta G = \\Delta H - T \\Delta S" />
                <BlockMath math="\\Delta G = -176 - (298 \\times -0.285)" />
                <BlockMath math="\\Delta G = -176 + 84.93 = -91.07 \, KJ" />
                <div className="p-4 bg-green-500/20 rounded-xl text-center text-green-400 font-bold" dir="rtl">
                  بما أن ΔG سالبة، فالتفاعل تلقائي.
                </div>
              </div>
            }
          />

          <SolvedExample 
            page="22"
            question="مثال 2: لتفاعل معين عند 298K، كانت ΔH = +145 KJ و ΔS = +0.160 KJ/K. هل التفاعل تلقائي؟"
            solution={
              <div className="space-y-6 text-xl" dir="ltr">
                <BlockMath math="\\Delta G = \\Delta H - T \\Delta S" />
                <BlockMath math="\\Delta G = +145 - (298 \\times 0.160)" />
                <BlockMath math="\\Delta G = +145 - 47.68 = +97.32 \, KJ" />
                <div className="p-4 bg-red-500/20 rounded-xl text-center text-red-400 font-bold" dir="rtl">
                  بما أن ΔG موجبة، فالتفاعل غير تلقائي.
                </div>
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الصفحة 23 */}
      <section id="page-23">
        <GlassCard page="23" title="بنك الأسئلة (الانتروبيا وجيبس)">
          <div className="space-y-8">
            <Quiz 
              page="23"
              question="30/ قياس لمدى العشوائية أو عدم الانتظام في نظام معين يسمى؟"
              options={["الانتروبيا", "المحتوى الحراري", "طاقة جيبس", "الحرارة النوعية"]}
              correctAnswer={0}
            />
            <Quiz 
              page="23"
              question="31/ أي من العمليات التالية يصاحبها زيادة في الانتروبيا (ΔS = +)؟"
              options={["الانصهار", "التجمد", "التكثيف", "الترسيب"]}
              correctAnswer={0}
            />
            <Quiz 
              page="23"
              question="32/ أي من العمليات التالية يصاحبها نقصان في الانتروبيا (ΔS = -)؟"
              options={["التبخير", "التجمد", "التسامي", "الانصهار"]}
              correctAnswer={1}
            />
            <Quiz 
              page="23"
              question="33/ العلاقة الرياضية لطاقة جيبس الحرة هي:"
              options={[
                "ΔG = ΔH - TΔS",
                "ΔG = ΔH + TΔS",
                "ΔG = TΔS - ΔH",
                "ΔG = ΔH / TΔS"
              ]}
              correctAnswer={0}
            />
            <Quiz 
              page="23"
              question="34/ يكون التفاعل تلقائياً عندما تكون قيمة ΔG:"
              options={["أكبر من الصفر", "أقل من الصفر", "تساوي الصفر", "تساوي 100"]}
              correctAnswer={1}
            />
            <Quiz 
              page="23"
              question="35/ التفاعل الذي يكون فيه ΔH سالبة و ΔS موجبة يكون:"
              options={["تلقائي دائماً", "غير تلقائي دائماً", "تلقائي عند الحرارة العالية", "تلقائي عند الحرارة المنخفضة"]}
              correctAnswer={0}
            />
            <Quiz 
              page="23"
              question="36/ التفاعل الذي يكون فيه ΔH موجبة و ΔS سالبة يكون:"
              options={["تلقائي دائماً", "غير تلقائي دائماً", "تلقائي عند الحرارة العالية", "تلقائي عند الحرارة المنخفضة"]}
              correctAnswer={1}
            />
            <Quiz 
              page="23"
              question="37/ احسب ΔG لتفاعل عند 300K إذا كان ΔH = -100 KJ و ΔS = -0.2 KJ/K؟"
              options={["-160 KJ", "+40 KJ", "-40 KJ", "+160 KJ"]}
              correctAnswer={2}
            />
            <Quiz 
              page="23"
              question="38/ عند أي درجة حرارة يصبح التفاعل تلقائياً إذا كان ΔH = +100 KJ و ΔS = +0.2 KJ/K؟"
              options={["أقل من 500K", "أكبر من 500K", "تساوي 500K", "لا يمكن أن يكون تلقائياً"]}
              correctAnswer={1}
            />
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 24 */}
      <section id="page-24">
        <GlassCard page="24" title="السعة الحرارية والمسعرات">
          <div className="space-y-6">
            <Definition title="السعة الحرارية (C)">
              هي كمية الحرارة اللازمة لرفع درجة حرارة كمية معينة من المادة درجة مئوية واحدة أو كلفناً واحداً. وحدتها (J/°C) أو (J/K).
            </Definition>
            
            <div className="my-8 p-8 bg-black/40 rounded-3xl border border-white/10 text-center">
              <BlockMath math="C = m \\times C_p" />
              <p className="mt-4 text-gray-400">حيث m هي الكتلة و Cp هي الحرارة النوعية.</p>
            </div>

            <Definition title="المسعر الحراري (Calorimeter)">
              جهاز معزول حرارياً يستخدم لقياس كمية الحرارة الممتصة أو المنطلقة خلال تفاعل كيميائي أو تغير فيزيائي.
            </Definition>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                <h6 className="text-orange-400 font-black mb-4 text-xl flex items-center gap-2">
                  <Flame className="w-6 h-6" /> مسعر القنبلة:
                </h6>
                <p className="text-gray-300">يستخدم لقياس حرارة الاحتراق تحت حجم ثابت.</p>
              </div>
              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                <h6 className="text-orange-400 font-black mb-4 text-xl flex items-center gap-2">
                  <Coffee className="w-6 h-6" /> مسعر كوب القهوة:
                </h6>
                <p className="text-gray-300">يستخدم لقياس حرارة التفاعل تحت ضغط ثابت (غالباً في المحاليل المائية).</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 25 */}
      <section id="page-25">
        <GlassCard page="25" title="أمثلة على السعة الحرارية">
          <SolvedExample 
            page="25"
            question="1- احسب السعة الحرارية لـ 50g من الماء علماً أن Cp = 4.18 J/g.°C."
            solution={
              <div className="text-2xl font-mono text-center" dir="ltr">
                <BlockMath math="C = m \\times C_p" />
                <BlockMath math="C = 50g \\times 4.18 \, J/g.^{\circ}C" />
                <BlockMath math="C = 209 \, J/^{\circ}C" />
              </div>
            }
          />

          <SolvedExample 
            page="25"
            question="2- احسب السعة الحرارية لـ 100g من الحديد علماً أن Cp = 0.449 J/g.°C."
            solution={
              <div className="text-2xl font-mono text-center" dir="ltr">
                <BlockMath math="C = 100g \\times 0.449 \, J/g.^{\circ}C" />
                <BlockMath math="C = 44.9 \, J/^{\circ}C" />
              </div>
            }
          />

          <SolvedExample 
            page="25"
            question="3- ما كتلة قطعة من النحاس (Cp = 0.385) إذا كانت سعتها الحرارية تساوي 77 J/°C؟"
            solution={
              <div className="text-2xl font-mono text-center" dir="ltr">
                <BlockMath math="m = C / C_p" />
                <BlockMath math="m = 77 / 0.385" />
                <BlockMath math="m = 200 \, g" />
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الصفحة 26 */}
      <section id="page-26">
        <GlassCard page="26" title="جدول الحرارة النوعية لبعض المواد">
          <div className="overflow-x-auto rounded-3xl border border-white/10">
            <table className="w-full text-center border-collapse bg-black/20">
              <thead>
                <tr className="bg-orange-900/50 text-white">
                  <th className="p-4 border-b border-white/10">المادة</th>
                  <th className="p-4 border-b border-white/10">الحرارة النوعية (J/g.K)</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/5">
                  <td className="p-4">الماء (سائل)</td>
                  <td className="p-4 font-bold text-cyan-400">4.184</td>
                </tr>
                <tr className="bg-white/5 border-b border-white/5">
                  <td className="p-4">الماء (جليد)</td>
                  <td className="p-4">2.03</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4">الماء (بخار)</td>
                  <td className="p-4">2.01</td>
                </tr>
                <tr className="bg-white/5 border-b border-white/5">
                  <td className="p-4">الألمنيوم</td>
                  <td className="p-4">0.897</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4">الحديد</td>
                  <td className="p-4">0.449</td>
                </tr>
                <tr className="bg-white/5 border-b border-white/5">
                  <td className="p-4">النحاس</td>
                  <td className="p-4">0.385</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4">الذهب</td>
                  <td className="p-4">0.129</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-10 p-8 bg-cyan-500/5 border border-cyan-500/20 rounded-3xl">
            <p className="text-xl text-white leading-relaxed text-center">
              يتميز <span className="text-cyan-400 font-black">الماء</span> بحرارة نوعية عالية جداً مقارنة بالفلزات، مما يجعله مبرداً ممتازاً وقادراً على امتصاص كميات كبيرة من الحرارة دون تغير كبير في درجة حرارته.
            </p>
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 27 */}
      <section id="page-27">
        <GlassCard page="27" title="بنك الأسئلة الختامي">
          <div className="space-y-8">
            <Quiz 
              page="27"
              question="39/ وحدة قياس السعة الحرارية هي:"
              options={["J/°C", "J/g.°C", "J/mol.K", "J"]}
              correctAnswer={0}
            />
            <Quiz 
              page="27"
              question="40/ الفرق بين الحرارة النوعية والسعة الحرارية هو أن الحرارة النوعية تكون لـ:"
              options={["جرام واحد من المادة", "أي كتلة من المادة", "مول واحد من المادة", "للمحاليل فقط"]}
              correctAnswer={0}
            />
            <Quiz 
              page="27"
              question="41/ مسعر القنبلة يقيس الحرارة تحت:"
              options={["ضغط ثابت", "حجم ثابت", "درجة حرارة ثابتة", "تركيز ثابت"]}
              correctAnswer={1}
            />
            <Quiz 
              page="27"
              question="42/ مسعر كوب القهوة يقيس الحرارة تحت:"
              options={["ضغط ثابت", "حجم ثابت", "درجة حرارة ثابتة", "تركيز ثابت"]}
              correctAnswer={0}
            />
            <Quiz 
              page="27"
              question="43/ احسب السعة الحرارية لقطعة من الفضة كتلتها 25g علماً أن Cp = 0.24 J/g.°C؟"
              options={["12 J/°C", "3 J/°C", "6 J/°C", "24 J/°C"]}
              correctAnswer={2}
            />
            <Quiz 
              page="27"
              question="44/ لماذا يستخدم الماء غالباً في المسعرات الحرارية؟"
              options={["لأنه رخيص", "لأنه شفاف", "لأنه سائل", "بسبب حرارته النوعية العالية"]}
              correctAnswer={3}
            />
            <Quiz 
              page="27"
              question="45/ إذا امتصت مادتان مختلفتان نفس الكمية من الطاقة، فإن المادة ذات الحرارة النوعية الأقل ستظهر:"
              options={["تغيراً أكبر في درجة الحرارة", "تغيراً أقل في درجة الحرارة", "لا يتغير درجة حرارتها", "تتحول إلى غاز"]}
              correctAnswer={0}
            />
          </div>
        </GlassCard>
      </section>

    </div>
  );
}
