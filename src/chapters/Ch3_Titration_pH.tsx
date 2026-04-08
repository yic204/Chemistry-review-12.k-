import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { 
  Activity, 
  Thermometer, 
  Pipette, 
  FlaskConical, 
  Droplets, 
  Beaker, 
  BookOpen, 
  Target,
  Info,
  Calculator,
  ChevronLeft,
  Zap,
  Layers,
  Scale,
  AlertTriangle,
  ArrowRightLeft,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import 'katex/dist/katex.min.css';

// --- UI Components ---

const GlassCard = ({ children, title, page, className = "" }: { children: React.ReactNode, title?: string, page?: string | number, className?: string }) => (
  <div className={`p-6 md:p-10 pt-16 md:pt-20 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl my-10 relative overflow-hidden break-words whitespace-normal leading-relaxed ${className}`}>
    {page && (
      <div className="absolute top-6 left-6 px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-400 text-[10px] font-black uppercase tracking-widest z-10">
        الصفحة {page}
      </div>
    )}
    {title && <h4 className="text-3xl font-black text-white mb-8 border-r-4 border-cyan-500 pr-4">{title}</h4>}
    {children}
  </div>
);

const SectionHeader = ({ title, icon: Icon }: { title: string, icon: any }) => (
  <div className="flex items-center gap-5 mb-12 border-b border-white/10 pb-6 mt-20">
    <div className="p-4 rounded-2xl bg-cyan-500/20 border border-cyan-500/30">
      <Icon className="w-10 h-10 text-cyan-400" />
    </div>
    <h3 className="text-4xl font-black text-white tracking-tight">{title}</h3>
  </div>
);

const Definition = ({ title, children }: { title: string | React.ReactNode, children: React.ReactNode }) => (
  <div className="mb-6 p-6 bg-white/5 rounded-2xl border-r-4 border-cyan-500 overflow-hidden break-words whitespace-normal leading-relaxed">
    <h4 className="text-cyan-400 font-bold mb-2 text-xl">{title}</h4>
    <div className="text-gray-200 leading-relaxed text-lg break-words whitespace-normal">{children}</div>
  </div>
);

const TeacherNote = ({ children, page }: { children: React.ReactNode, page?: string | number }) => (
  <div className="p-8 pt-16 bg-yellow-500/10 border border-yellow-500/30 rounded-3xl my-10 relative overflow-hidden break-words whitespace-normal leading-relaxed">
    <div className="absolute top-0 left-0 p-2 bg-yellow-500 text-black font-black text-[10px] rounded-br-xl z-10">
      P.{page}
    </div>
    <div className="absolute top-0 right-0 p-3 bg-yellow-500 text-black font-black text-xs uppercase tracking-tighter rounded-bl-xl shadow-lg z-10">
      ملاحظة الأستاذ أحمد قاسم
    </div>
    <div className="flex gap-4 items-start mt-4 font-medium text-gray-200 text-xl leading-relaxed break-words whitespace-normal">
      <Lightbulb className="w-8 h-8 text-yellow-500 shrink-0 animate-pulse" />
      <div className="break-words whitespace-normal">{children}</div>
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
        <Calculator className="w-5 h-5 text-cyan-500" />
        <span className="text-sm font-black text-cyan-500 uppercase tracking-[0.3em]">{label}</span>
      </div>
    )}
    <div className="w-full overflow-x-auto custom-scrollbar bg-black/80 rounded-3xl border border-white/10 p-10 transition-all group-hover:border-cyan-500/50 shadow-2xl">
      <div className="min-w-max flex items-center justify-center text-4xl font-bold text-cyan-300">
        <BlockMath math={children} />
      </div>
    </div>
  </div>
);

const SolvedExample = ({ question, solution, page }: { question: React.ReactNode, solution: React.ReactNode, page?: string | number }) => (
  <div className="p-8 pt-16 bg-cyan-500/5 border border-cyan-500/20 rounded-3xl my-10 relative overflow-hidden break-words whitespace-normal leading-relaxed">
    {page && (
      <div className="absolute top-0 left-0 p-2 bg-cyan-500 text-black font-black text-[10px] rounded-br-xl z-10">
        P.{page}
      </div>
    )}
    <div className="flex gap-4 items-start mb-6 break-words whitespace-normal">
      <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
        <Calculator className="w-6 h-6" />
      </div>
      <div className="text-xl font-bold text-white leading-relaxed break-words whitespace-normal">{question}</div>
    </div>
    <div className="p-6 bg-black/40 rounded-2xl border border-white/5 font-medium text-gray-300 leading-relaxed break-words whitespace-normal">
      <div className="text-cyan-400 font-black mb-4 flex items-center gap-2">
        <Zap className="w-4 h-4" /> الحل:
      </div>
      <div className="break-words whitespace-normal">{solution}</div>
    </div>
  </div>
);

const Quiz = ({ question, options, correctAnswer, explanation, page }: { question: React.ReactNode, options: React.ReactNode[], correctAnswer: number, explanation?: React.ReactNode, page?: string | number }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="p-8 pt-16 bg-white/5 border border-white/10 rounded-3xl my-10 relative overflow-hidden break-words whitespace-normal leading-relaxed">
       {page && (
        <div className="absolute top-0 left-0 p-2 bg-white/20 text-white font-black text-[10px] rounded-br-xl z-10">
          P.{page}
        </div>
      )}
      <div className="flex items-center gap-3 mb-8">
        <Target className="w-6 h-6 text-cyan-400" />
        <h4 className="text-xl font-black text-white uppercase tracking-widest">اختبر نفسك</h4>
      </div>
      <div className="text-white text-2xl mb-8 font-bold leading-snug break-words whitespace-normal">{question}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelected(idx);
              setShowResult(true);
            }}
            disabled={showResult}
            className={`text-right px-6 py-4 rounded-2xl border-2 transition-all duration-300 break-words whitespace-normal ${
              showResult 
                ? idx === correctAnswer 
                  ? 'bg-green-500/20 border-green-500 text-green-400' 
                  : selected === idx 
                    ? 'bg-red-500/20 border-red-500 text-red-400' 
                    : 'bg-white/5 border-white/10 text-gray-600'
                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-cyan-500/50'
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
          className="mt-8 p-6 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-gray-200 break-words whitespace-normal"
        >
          <div className="font-black text-cyan-400 mb-2">التوضيح:</div>
          <div className="break-words whitespace-normal">{explanation}</div>
        </motion.div>
      )}
    </div>
  );
};

export default function Ch3_Titration_pH_Final() {
  return (
    <div className="max-w-6xl mx-auto space-y-24 pb-40 text-right selection:bg-cyan-500/30" dir="rtl">

      {/* الصفحة 1: الغلاف */}
      <section id="page-1">
        <div className="h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-cyan-500/10 to-transparent rounded-[3rem] border border-white/10 relative overflow-hidden">
          <div className="absolute top-10 right-10 text-gray-500 font-black text-sm tracking-widest">صفحة 1</div>
          <Pipette className="w-32 h-32 text-cyan-400 mb-8 animate-bounce" />
          <h1 className="text-7xl font-black text-white mb-4 tracking-tighter">الكيمياء</h1>
          <h2 className="text-4xl font-bold text-cyan-400 uppercase tracking-[0.2em]">فصل الثالث الكورس الاول</h2>
          <h3 className="text-3xl font-bold text-white mt-4 tracking-tight">معايرة حمض - قاعدة</h3>
          <div className="mt-12 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-center break-words whitespace-normal leading-relaxed">
             <p className="text-gray-400 font-bold break-words whitespace-normal leading-relaxed">اعداد استاذ أحمد قاسم محمد</p>
             <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest break-words whitespace-normal leading-relaxed">يوسف صباح</p>
          </div>
        </div>
      </section>

      {/* الصفحة 2 */}
      <section id="page-2">
        <SectionHeader title="القسم 3-1: معايرة الحمض - القاعدة والرقم الهيدروجيني" icon={Activity} />
        
        <GlassCard page="2" title="التأين الذاتي للماء">
          <Definition title="التأين الذاتي للماء">
            هي عملية تكوين ايون الهيدرونيوم وايون الهيدروكسيد نتيجة انتقال بروتون من جزيئة ماء الى جزيئة ماء اخرى.
          </Definition>
          
          <FormulaBox page="2">{"\text{H}_2\text{O} + \text{H}_2\text{O} \rightleftharpoons \text{H}_3\text{O}^+ + \text{OH}^-"}</FormulaBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10 shadow-xl">
              <h5 className="text-cyan-400 font-black mb-6 flex items-center gap-2">
                <Droplets className="w-6 h-6" /> ماء المقطر
              </h5>
              <ul className="space-y-4 text-gray-300 font-medium text-lg">
                <li className="flex items-start gap-2 break-words whitespace-normal leading-relaxed text-gray-200">• مادة متعادلة.</li>
                <li className="flex items-start gap-2 break-words whitespace-normal leading-relaxed text-gray-200">• ينتج من جزيئتي الماء (المذيب) ايونين هما الهيدروكسيد والهيدرونيوم.</li>
                <li className="flex items-start gap-2">• تركيز كل من أيون الهيدرونيوم وأيون الهيدروكسيد يساوي <InlineMath math="1.0 \times 10^{-7}" /> عند الدرجة <InlineMath math="25 \, ^\circ\text{C}" />.</li>
                <li className="flex items-start gap-2 break-words whitespace-normal leading-relaxed text-gray-200">• موصل ضعيف أو رديء للكهرباء (الكتروليت ضعيف).</li>
                <li className="flex items-start gap-2 break-words whitespace-normal leading-relaxed text-gray-200">• كمية المتفاعلات أكبر من النواتج.</li>
                <li className="flex items-start gap-2">• يحتوي على <InlineMath math="\text{H}_2\text{O}" /> و <InlineMath math="\text{OH}^-" /> و <InlineMath math="\text{H}_3\text{O}^+" />.</li>
                <li className="flex items-start gap-2 break-words whitespace-normal leading-relaxed text-gray-200">• في حجم <InlineMath math="5000\text{L}" /> من الماء النقي، لا يتأين الا جزء من قطرة منه.</li>
                <li className="flex items-start gap-2">• عند درجة <InlineMath math="25 \, ^\circ\text{C}" />: <InlineMath math="[\text{H}_3\text{O}^+] = [\text{OH}^-] = 1.0 \times 10^{-7} \, \text{M}" />.</li>
                <li className="flex items-start gap-2 break-words whitespace-normal leading-relaxed text-yellow-400 font-medium">• بزيادة درجة الحرارة تزداد تأين الماء وبذلك تزداد تركيز أيون الهيدرونيوم وأيون الهيدروكسيد.</li>
              </ul>
            </div>

            <div className="p-8 bg-cyan-500/5 rounded-3xl border border-cyan-500/20 shadow-xl">
              <h5 className="text-cyan-400 font-black mb-6 flex items-center gap-2">
                <Calculator className="w-6 h-6" /> ثابت تأين الذاتي للماء
              </h5>
              <p className="text-gray-200 text-xl leading-relaxed mb-6">
                هو حاصل ضرب <InlineMath math="[\text{H}_3\text{O}^+]" /> في <InlineMath math="[\text{OH}^-]" /> ثابت تأين الماء ويرمز له بـ <InlineMath math="\text{K}_w" />.
              </p>
              <div className="space-y-4 bg-black/40 p-6 rounded-2xl border border-white/5 font-mono text-cyan-300 text-2xl text-center">
                <BlockMath math="\text{K}_w = [\text{H}_3\text{O}^+] \times [\text{OH}^-]" />
                <BlockMath math="\text{K}_w = 1.0 \times 10^{-7} \times 1.0 \times 10^{-7}" />
                <BlockMath math="\text{K}_w = 1.0 \times 10^{-14} \quad \text{عند درجة } 25 \, ^\circ\text{C}" />
              </div>
            </div>
          </div>

          <TeacherNote page="2">
            قيمة ثابت تأين الماء دائما ثابتة عند درجة حرارة <InlineMath math="25 \, ^{\circ}\text{C}" /> ولكن تتغير عن درجات العالية والمنخفضة.
          </TeacherNote>

          <div className="overflow-x-auto w-full rounded-3xl border border-white/10 mt-10">
            <table className="w-full min-w-[600px] text-right bg-black/20 border-collapse">
              <thead>
                <tr className="bg-cyan-900/50 text-white">
                  <th className="p-6 border-b border-white/10 text-xl font-black">درجة الحرارة</th>
                  <th className="p-6 border-b border-white/10 text-xl font-black text-center"><InlineMath math="\text{K}_w" /></th>
                </tr>
              </thead>
              <tbody className="text-gray-300 text-lg font-medium">
                <tr className="border-b border-white/5">
                  <td className="p-6 border-l border-white/5">0</td>
                  <td className="p-6 text-center font-mono"><InlineMath math="1.2 \times 10^{-15}" /></td>
                </tr>
                <tr className="bg-white/5 border-b border-white/5">
                  <td className="p-6 border-l border-white/5">10</td>
                  <td className="p-6 text-center font-mono"><InlineMath math="3.0 \times 10^{-15}" /></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-6 border-l border-white/5">25</td>
                  <td className="p-6 text-center font-mono text-cyan-400 font-black"><InlineMath math="1.0 \times 10^{-14}" /></td>
                </tr>
                <tr className="bg-white/5">
                  <td className="p-6 border-l border-white/5">50</td>
                  <td className="p-6 text-center font-mono"><InlineMath math="5.3 \times 10^{-14}" /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-10 p-6 bg-white/5 rounded-2xl border-r-4 border-yellow-500">
            <p className="text-xl font-bold text-white mb-2 break-words whitespace-normal leading-relaxed">علل: يزداد ثابت تأين الماء بزيادة درجة الحرارة.</p>
            <p className="text-gray-300 text-lg italic break-words whitespace-normal leading-relaxed">ج- لأن تأين الماء يزداد فيزداد تراكيز الأيونات الناتجة <InlineMath math="[\text{H}_3\text{O}^+]" /> و <InlineMath math="[\text{OH}^-]" />.</p>
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 3 */}
      <section id="page-3">
        <GlassCard page="3" title="سلم الرقم الهيدروجيني pH">
          <p className="text-xl text-gray-200 leading-relaxed mb-8 break-words whitespace-normal">
            تعبير عن حامضية المحلول أو قاعديته وفقا لتركيزي <InlineMath math="\text{H}_3\text{O}^+, \text{OH}^-" /> لالا يكون عمليا لصغر القيم الرقمية لهذين التركيزين والالانس ب للتعبير عن ذلك هو <InlineMath math="\text{pH}" />.
          </p>
          
          <div className="space-y-6">
            <Definition title="الرقم الهيدروجيني أو pH">
              يشير الى تركيز ايون الهيدرونيوم في المحلول.
            </Definition>
            <Definition title="الرقم الهيدروكسيدي أو pOH">
              يشير الى تركيز أيون الهيدروكسيد في المحلول.
            </Definition>
          </div>

          <div className="mt-16 space-y-20">
            {/* pH Scale Visualization */}
            <div className="relative pt-10">
              <h5 className="text-2xl font-black text-white mb-10 text-center underline decoration-cyan-500 underline-offset-8">مقياس pH</h5>
              <div className="h-4 w-full bg-gradient-to-l from-blue-600 via-green-500 to-red-600 rounded-full relative">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(val => (
                  <div key={val} className="absolute top-[-25px]" style={{ right: `${(val / 14) * 100}%` }}>
                    <span className="text-xs font-bold text-gray-400">{val}</span>
                    <div className="h-6 w-[2px] bg-white/20 mx-auto mt-1" />
                  </div>
                ))}
                <div className="absolute top-8 right-0 text-red-400 font-black">حامضي</div>
                <div className="absolute top-8 left-1/2 -translate-x-1/2 text-green-400 font-black">متعادل</div>
                <div className="absolute top-8 left-0 text-blue-400 font-black">قاعدي</div>
              </div>
            </div>

            {/* [H3O+] Scale */}
            <div className="relative pt-10" dir="ltr">
               <h5 className="text-2xl font-black text-white mb-10 text-center underline decoration-cyan-500 underline-offset-8" dir="rtl">تركيز <InlineMath math="[\text{H}_3\text{O}^+]" /></h5>
               <div className="h-4 w-full bg-white/10 rounded-full relative">
                  {[0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14].map((exp, idx) => (
                    <div key={idx} className="absolute top-[-25px]" style={{ left: `${(idx / 14) * 100}%` }}>
                      <span className="text-[10px] font-mono text-gray-400">10^{exp}</span>
                      <div className="h-6 w-[2px] bg-white/20 mx-auto mt-1" />
                    </div>
                  ))}
                  <div className="absolute top-8 left-0 text-red-400 font-black text-xs" dir="rtl">1/ تزداد <InlineMath math="[\text{H}_3\text{O}^+]" /><br/>2/ تزداد الحمضية</div>
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 text-green-400 font-black" dir="rtl">متعادل</div>
                  <div className="absolute top-8 right-0 text-blue-400 font-black text-xs text-right" dir="rtl">1/ تقل <InlineMath math="[\text{H}_3\text{O}^+]" /><br/>2/ تزداد القاعدية</div>
               </div>
            </div>

             {/* pOH Scale */}
             <div className="relative pt-10">
              <h5 className="text-2xl font-black text-white mb-10 text-center underline decoration-purple-500 underline-offset-8">مقياس pOH</h5>
              <div className="h-4 w-full bg-gradient-to-r from-blue-600 via-green-500 to-red-600 rounded-full relative">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(val => (
                  <div key={val} className="absolute top-[-25px]" style={{ left: `${(val / 14) * 100}%` }}>
                    <span className="text-xs font-bold text-gray-400">{val}</span>
                    <div className="h-6 w-[2px] bg-white/20 mx-auto mt-1" />
                  </div>
                ))}
                <div className="absolute top-8 left-0 text-blue-400 font-black">قاعدي</div>
                <div className="absolute top-8 left-1/2 -translate-x-1/2 text-green-400 font-black">متعادل</div>
                <div className="absolute top-8 right-0 text-red-400 font-black">حامضي</div>
              </div>
            </div>

            {/* [OH-] Scale */}
            <div className="relative pt-10" dir="ltr">
               <h5 className="text-2xl font-black text-white mb-10 text-center underline decoration-purple-500 underline-offset-8" dir="rtl">تركيز <InlineMath math="[\text{OH}^-]" /></h5>
               <div className="h-4 w-full bg-white/10 rounded-full relative">
                  {[0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14].map((exp, idx) => (
                    <div key={idx} className="absolute top-[-25px]" style={{ left: `${(idx / 14) * 100}%` }}>
                      <span className="text-[10px] font-mono text-gray-400">10^{exp}</span>
                      <div className="h-6 w-[2px] bg-white/20 mx-auto mt-1" />
                    </div>
                  ))}
                  <div className="absolute top-8 left-0 text-blue-400 font-black text-xs" dir="rtl">1/ تزداد <InlineMath math="[\text{OH}^-]" /><br/>2/ تزداد القاعدية</div>
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 text-green-400 font-black" dir="rtl">متعادل</div>
                  <div className="absolute top-8 right-0 text-red-400 font-black text-xs text-right" dir="rtl">1/ تقل <InlineMath math="[\text{OH}^-]" /><br/>2/ تزداد الحامضية</div>
               </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 4 */}
      <section id="page-4">
        <GlassCard page="4" title="ملخص حالات المحلول">
          <div className="overflow-x-auto w-full rounded-3xl border border-white/10 shadow-2xl">
            <table className="w-full min-w-[600px] text-right border-collapse bg-black/20">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 text-white">
                  <th className="p-5 border-b border-white/10 text-xl font-black">المحلول</th>
                  <th className="p-5 border-b border-white/10 text-xl font-black">الحالة العامة (تصح دائما)</th>
                  <th className="p-5 border-b border-white/10 text-xl font-black">عند درجة <InlineMath math="25 \, ^\circ\text{C}" /></th>
                </tr>
              </thead>
              <tbody className="text-gray-300 font-medium">
                <tr className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-5 font-black text-green-400">المتعادل</td>
                  <td className="p-5">
                    <InlineMath math="[\text{H}_3\text{O}^+] = [\text{OH}^-]" /><br/>
                    <InlineMath math="\text{pH} = \text{pOH}" />
                  </td>
                  <td className="p-5">
                    <InlineMath math="[\text{H}_3\text{O}^+] = [\text{OH}^-] = 10^{-7} \, \text{M}" /><br/>
                    <InlineMath math="\text{pH} = \text{pOH} = 7" />
                  </td>
                </tr>
                <tr className="border-b border-white/5 bg-white/5 hover:bg-white/10">
                  <td className="p-5 font-black text-red-400">الحامضي</td>
                  <td className="p-5">
                    <InlineMath math="[\text{H}_3\text{O}^+] > [\text{OH}^-]" /><br/>
                    <InlineMath math="\text{pH} < \text{pOH}" />
                  </td>
                  <td className="p-5">
                    <InlineMath math="\text{pH} < 7" /><br/>
                    <InlineMath math="\text{pOH} > 7" /><br/>
                    <InlineMath math="[\text{H}_3\text{O}^+] > 10^{-7} \, \text{M}" /><br/>
                    <InlineMath math="[\text{OH}^-] < 10^{-7} \, \text{M}" />
                  </td>
                </tr>
                <tr className="hover:bg-white/10">
                  <td className="p-5 font-black text-blue-400">القاعدي</td>
                  <td className="p-5">
                    <InlineMath math="[\text{H}_3\text{O}^+] < [\text{OH}^-]" /><br/>
                    <InlineMath math="\text{pH} > \text{pOH}" />
                  </td>
                  <td className="p-5">
                    <InlineMath math="\text{pH} > 7" /><br/>
                    <InlineMath math="\text{pOH} < 7" /><br/>
                    <InlineMath math="[\text{H}_3\text{O}^+] < 10^{-7} \, \text{M}" /><br/>
                    <InlineMath math="[\text{OH}^-] > 10^{-7} \, \text{M}" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-16 space-y-8">
            <Quiz 
              page="4"
              question={<span>1. إذا كان <InlineMath math="[\text{H}_3\text{O}^+]" /> أصغر من <InlineMath math="[\text{OH}^-]" /> فإن المحلول؟</span>}
              options={["متعادل", "قاعدي", "حامضي", "امفوتيري"]}
              correctAnswer={1}
            />
            <Quiz 
              page="4"
              question="2. أي من المحاليل التالية ليست حامضية؟"
              options={[<InlineMath math="\text{pH} = 12.6" />, <InlineMath math="\text{pOH} = 11.7" />, <InlineMath math="[\text{OH}^-] = 1 \times 10^{-11} \, \text{M}" />, <InlineMath math="[\text{H}_3\text{O}^+] = 1 \times 10^{-4} \, \text{M}" />]}
              correctAnswer={0}
            />
            <Quiz 
              page="4"
              question={<span>3. أي العلاقات التالية تدل على أن المحلول المائي <InlineMath math="\text{pH}" /> له أكبر من 7؟</span>}
              options={[<InlineMath math="\text{pOH} = 11" />, <InlineMath math="[\text{H}_3\text{O}^+] = [\text{OH}^-]" />, <InlineMath math="[\text{H}_3\text{O}^+] > [\text{OH}^-]" />, <InlineMath math="[\text{H}_3\text{O}^+] < [\text{OH}^-]" />]}
              correctAnswer={3}
            />
             <Quiz 
              page="4"
              question="4. اذا كان المحلول قاعدي أي من التالي تكون صحيحة؟"
              options={[<InlineMath math="[\text{H}_3\text{O}^+] < 10^{-7}" />, <InlineMath math="[\text{H}_3\text{O}^+] = 10^{-2}" />, <InlineMath math="[\text{H}_3\text{O}^+] = 10^{-11}" />, "1 و 3 معاً"]}
              correctAnswer={3}
            />
            <Quiz 
              page="4"
              question="5. اي من التالية تصح دائما في المحلول الحامضي؟"
              options={[<InlineMath math="[\text{H}_3\text{O}^+] > [\text{OH}^-]" />, <InlineMath math="[\text{H}_3\text{O}^+] < [\text{OH}^-]" />, <InlineMath math="[\text{H}_3\text{O}^+] = 10^{-7}" />, "1 و 3 معاً"]}
              correctAnswer={0}
            />
            <Quiz 
              page="4"
              question={<span>6. أي من التالية تصح في المحلول الحامضي عند درجة <InlineMath math="25 \, ^\circ\text{C}" />؟</span>}
              options={[<InlineMath math="[\text{H}_3\text{O}^+] > [\text{OH}^-]" />, <InlineMath math="[\text{H}_3\text{O}^+] < [\text{OH}^-]" />, <InlineMath math="[\text{H}_3\text{O}^+] > 10^{-7}" />, "1 و 3 معاً"]}
              correctAnswer={3}
            />
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 5 */}
      <section id="page-5">
        <GlassCard page="5" title="ملاحظات هامة حول pH">
          <ul className="space-y-6 text-xl text-gray-200 font-medium list-decimal list-inside">
            <li>قيم للمحاليل المائي عند درجة حرارة <InlineMath math="25 \, ^\circ\text{C}" /> ان مدى <InlineMath math="\text{pH}" /> تتراوح بصورة عامة بين (0 - 14) وذلك لالان أكثر المحاليل المائية تركيز الانيون الهيدرونيوم له تقع مابين <InlineMath math="10^0" /> الى <InlineMath math="10^{-14}" />.</li>
            <li className="text-cyan-400 font-black">ان مجموعة قيمتي <InlineMath math="\text{pH}" /> و <InlineMath math="\text{pOH}" /> لمحلول متعادل عند درجة حرارة <InlineMath math="25 \, ^\circ\text{C}" /> يساوي 14.
              <FormulaBox>{"\text{pH} + \text{pOH} = 14"}</FormulaBox>
            </li>
            <li>الرقم الهيدروجيني للماء المقطر أو المحلول المتعادل هو 7 لالان تركيز ايون الهيدرونيوم والهيدروكسيد يساوي <InlineMath math="10^{-7}" />.</li>
            <li>تركيز ايون الهيدرونيوم للمحلول الحامضي يكون أكبر من تركيز ايون الهيدروكسيد.</li>
            <li>للمحلول الحامضي الرقم الهيدروجيني أقل من 7.</li>
            <li>أعلى حمضية للمحلول يكون عند <InlineMath math="\text{pH} = 0" />.</li>
            <li>أعلى قاعدية للمحلول يكون عند <InlineMath math="\text{pH} = 14" />.</li>
            <li>محلول به <InlineMath math="[\text{H}_3\text{O}^+] = 10^{-7}" /> يكون حمض في <InlineMath math="11 \times 10^{-14}" />.</li>
            <li>محلول به <InlineMath math="[\text{H}_3\text{O}^+] = 10^{-8}" /> يكون قاعدي في <InlineMath math="11 \times 10^{-14}" />.</li>
            <li>عند إضافة حمض إلى الماء يزداد <InlineMath math="[\text{H}_3\text{O}^+]" /> ويقل <InlineMath math="[\text{OH}^-]" />.</li>
            <li className="text-yellow-400 italic">و رغم ذلك فهو غير حمضي؟ <InlineMath math="2.3 \times 10^{-7} \, \text{M}" /> محلول تركيز كاتيونات الهيدرونيوم فيه يساوي <InlineMath math="10^{-10}" />.</li>
            <li>يكون محلول حمضي عندما يكون <InlineMath math="[\text{H}_3\text{O}^+] > 1.0 \times 10^{-7}" /> ولكن بشرط أن تكون درجة الحرارة عند <InlineMath math="25 \, ^\circ\text{C}" /> وفي هذه الحالة تكون أكبر من <InlineMath math="\text{K}_w" /> درجة الحرارة أكثر من عند <InlineMath math="25 \, ^\circ\text{C}" /> وبالتالي <InlineMath math="1.0 \times 10^{-14}" />.</li>
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
            <div className="p-8 bg-cyan-500/10 rounded-3xl border border-cyan-500/20">
               <h6 className="text-2xl font-black text-white mb-6">الرقم الهيدروجيني pH للمحلول:</h6>
               <p className="text-gray-300 mb-6 break-words whitespace-normal leading-relaxed">سالب اللوغاريتم للأساس 10 لتركيز أيون الهيدرونيوم <InlineMath math="[\text{H}_3\text{O}^+]" />.</p>
               <BlockMath math="\text{pH} = -\log [\text{H}_3\text{O}^+]" />
            </div>
            <div className="p-8 bg-purple-500/10 rounded-3xl border border-purple-500/20">
               <h6 className="text-2xl font-black text-white mb-6">الرقم الهيدروكسيدي pOH للمحلول:</h6>
               <p className="text-gray-300 mb-6 break-words whitespace-normal leading-relaxed">سالب اللوغاريتم للأساس 10 لتركيز أيون الهيدروكسيد <InlineMath math="[\text{OH}^-]" />.</p>
               <BlockMath math="\text{pOH} = -\log [\text{OH}^-]" />
            </div>
          </div>

          <div className="overflow-x-auto w-full rounded-3xl border border-white/10 mt-16">
            <table className="w-full min-w-[600px] text-right bg-black/20 border-collapse">
              <thead>
                <tr className="bg-white/10 text-white">
                  <th className="p-4 border border-white/10">عند درجة حرارة <InlineMath math="25 \, ^\circ\text{C}" /></th>
                  <th className="p-4 border border-white/10">عند درجة حرارة أقل من <InlineMath math="25 \, ^\circ\text{C}" /></th>
                  <th className="p-4 border border-white/10">عند درجة حرارة أكبر من <InlineMath math="25 \, ^\circ\text{C}" /></th>
                </tr>
                <tr className="bg-white/5 text-cyan-400">
                  <th className="p-4 border border-white/10 text-center"><InlineMath math="[\text{OH}^-][\text{H}_3\text{O}^+] = \text{K}_w" /></th>
                  <th className="p-4 border border-white/10 text-center"><InlineMath math="[\text{OH}^-][\text{H}_3\text{O}^+] < \text{K}_w" /></th>
                  <th className="p-4 border border-white/10 text-center"><InlineMath math="[\text{OH}^-][\text{H}_3\text{O}^+] > \text{K}_w" /></th>
                </tr>
              </thead>
              <tbody className="text-gray-300 text-center">
                <tr className="bg-white/5 font-black text-white"><td colSpan={3} className="p-2">محلول متعادل في جميع درجات الحرارة</td></tr>
                <tr>
                  <td className="p-4 border border-white/10"><InlineMath math="[\text{OH}^-] = [\text{H}_3\text{O}^+]" /></td>
                  <td className="p-4 border border-white/10"><InlineMath math="[\text{OH}^-] = [\text{H}_3\text{O}^+]" /></td>
                  <td className="p-4 border border-white/10"><InlineMath math="[\text{OH}^-] = [\text{H}_3\text{O}^+]" /></td>
                </tr>
                <tr>
                  <td className="p-4 border border-white/10"><InlineMath math="[\text{OH}^-][\text{H}_3\text{O}^+] = 10^{-14}" /></td>
                  <td className="p-4 border border-white/10"><InlineMath math="[\text{OH}^-][\text{H}_3\text{O}^+] < 10^{-14}" /></td>
                  <td className="p-4 border border-white/10"><InlineMath math="[\text{OH}^-][\text{H}_3\text{O}^+] > 10^{-14}" /></td>
                </tr>
                <tr>
                  <td className="p-4 border border-white/10"><InlineMath math="[\text{OH}^-] = [\text{H}_3\text{O}^+] = 10^{-7}" /></td>
                  <td className="p-4 border border-white/10"><InlineMath math="[\text{OH}^-] = [\text{H}_3\text{O}^+] < 10^{-7}" /></td>
                  <td className="p-4 border border-white/10"><InlineMath math="[\text{OH}^-] = [\text{H}_3\text{O}^+] > 10^{-7}" /></td>
                </tr>
                <tr>
                  <td className="p-4 border border-white/10"><InlineMath math="\text{K}_w = 10^{-14}" /></td>
                  <td className="p-4 border border-white/10"><InlineMath math="\text{K}_w < 10^{-14}" /></td>
                  <td className="p-4 border border-white/10"><InlineMath math="\text{K}_w > 10^{-14}" /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-16 space-y-8">
            <Quiz 
              page="5"
              question="1. في محاليل المتعادلة بترفيع درجة الحرارة؟"
              options={["[H3O+] = [OH-]", "[H3O+] > [OH-]", "Kw < 10^-14", "جميع ماذكر خاطئ"]}
              correctAnswer={0}
            />
            <Quiz 
              page="5"
              question={<span>2. في المحاليل المتعادلة بخفض درجة الحرارة؟</span>}
              options={[<InlineMath math="\text{Kw} = [\text{H}_3\text{O}^+] > [\text{OH}^-]" />, <InlineMath math="\text{Kw} = [\text{H}_3\text{O}^+] < [\text{OH}^-]" />, <InlineMath math="\text{Kw} < [\text{H}_3\text{O}^+] > [\text{OH}^-]" />, "جميع ما ذكر صحيح"]}
              correctAnswer={3}
            />
            <Quiz 
              page="5"
              question={<span>3. في المحاليل المتعادلة <InlineMath math="[\text{OH}^-] > 10^{-7}" /> عند درجة حرارة؟</span>}
              options={["أكبر من 25", "أقل من 25", "عند 25", "جميع ما ذكر صحيح"]}
              correctAnswer={0}
            />
            <Quiz 
              page="5"
              question={<span>4. في المحاليل المتعادلة <InlineMath math="[\text{OH}^-] = [\text{H}_3\text{O}^+]" /> عند درجة حرارة؟</span>}
              options={["أكبر من 25", "أقل من 25", "عند 25", "جميع ما ذكر صحيح"]}
              correctAnswer={3}
            />
            <Quiz 
              page="5"
              question={<span>5. في أي من المحاليل الآتية حاصل ضرب تركيز <InlineMath math="[\text{H}_3\text{O}^+]" /> في <InlineMath math="[\text{OH}^-]" /> تساوي <InlineMath math="\text{Kw}" />؟</span>}
              options={["حامض", "قاعدة", "متعادل", "جميع ما ذكر"]}
              correctAnswer={3}
            />
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 6 */}
      <section id="page-6">
        <GlassCard page="6" title="القوانين الذهبية">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: 1, formula: "[\text{OH}^-][\text{H}_3\text{O}^+] = 1 \times 10^{-14}" },
              { id: 2, formula: "\text{pH} + \text{pOH} = 14" },
              { id: 3, formula: "\text{pH} = -\log[\text{H}_3\text{O}^+]" },
              { id: 4, formula: "\text{pOH} = -\log[\text{OH}^-]" },
              { id: 5, formula: "[\text{H}_3\text{O}^+] = 10^{-\text{pH}}" },
              { id: 6, formula: "[\text{OH}^-] = 10^{-\text{pOH}}" }
            ].map(law => (
              <div key={law.id} className="p-6 bg-black/40 rounded-2xl border border-white/10 flex items-center justify-between group hover:border-cyan-500 transition-all">
                <span className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-black">{law.id}</span>
                <div className="text-2xl font-mono text-cyan-300" dir="ltr">
                  <InlineMath math={law.formula} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-white/5 rounded-3xl border border-white/10">
            <h6 className="text-2xl font-black text-white mb-6 underline decoration-cyan-500 underline-offset-8">للقراءة فقط (اضافة A الى B)</h6>
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-[600px] text-center border-collapse">
                <thead>
                  <tr className="bg-cyan-900/50 text-white">
                    <th className="p-4 border border-white/10">A</th>
                    <th className="p-4 border border-white/10">B</th>
                    <th className="p-4 border border-white/10 text-cyan-400">pH</th>
                    <th className="p-4 border border-white/10 text-purple-400">pOH</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr><td className="p-4 border border-white/10">ماء</td><td className="p-4 border border-white/10">حمض</td><td className="p-4 border border-white/10 text-red-400">تقل</td><td className="p-4 border border-white/10 text-blue-400">تزداد</td></tr>
                  <tr><td className="p-4 border border-white/10">ماء</td><td className="p-4 border border-white/10">قاعدة</td><td className="p-4 border border-white/10 text-blue-400">تزداد</td><td className="p-4 border border-white/10 text-red-400">تقل</td></tr>
                  <tr><td className="p-4 border border-white/10">حمض</td><td className="p-4 border border-white/10">ماء</td><td className="p-4 border border-white/10 text-blue-400">تزداد</td><td className="p-4 border border-white/10 text-red-400">تقل</td></tr>
                  <tr><td className="p-4 border border-white/10">قاعدة</td><td className="p-4 border border-white/10">ماء</td><td className="p-4 border border-white/10 text-red-400">تقل</td><td className="p-4 border border-white/10 text-blue-400">تزداد</td></tr>
                  <tr><td className="p-4 border border-white/10">قاعدة</td><td className="p-4 border border-white/10">حمض</td><td className="p-4 border border-white/10 text-red-400">تقل</td><td className="p-4 border border-white/10 text-blue-400">تزداد</td></tr>
                  <tr><td className="p-4 border border-white/10">حمض</td><td className="p-4 border border-white/10">قاعدة</td><td className="p-4 border border-white/10 text-blue-400">تزداد</td><td className="p-4 border border-white/10 text-red-400">تقل</td></tr>
                  <tr><td className="p-4 border border-white/10">قاعدة</td><td className="p-4 border border-white/10">قاعدة</td><td className="p-4 border border-white/10 text-blue-400">تزداد</td><td className="p-4 border border-white/10 text-red-400">تقل</td></tr>
                  <tr><td className="p-4 border border-white/10">حمض</td><td className="p-4 border border-white/10">حمض</td><td className="p-4 border border-white/10 text-red-400">تقل</td><td className="p-4 border border-white/10 text-blue-400">تزداد</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <SectionHeader title="نوع الاول من الاسئلة (مباشر)" icon={Calculator} />
          
          <SolvedExample 
            page="6"
            question={<span>1/ احسب تركيز ايون الهيدرونيوم اذا كان تركيز ايون الهيدروكسيد <InlineMath math="10^{-6} \, \text{M}" />؟</span>}
            solution={
              <div className="space-y-4" dir="ltr">
                <BlockMath math="[\text{OH}^-] [\text{H}_3\text{O}^+] = 1 \times 10^{-14}" />
                <BlockMath math="[\text{H}_3\text{O}^+] = \frac{1 \times 10^{-14}}{[\text{OH}^-]} = \frac{1 \times 10^{-14}}{10^{-6}} = 10^{-8} \, \text{M}" />
              </div>
            }
          />

          <SolvedExample 
            page="6"
            question={<span>2/ احسب pH المحلول اذا كان <InlineMath math="[\text{H}_3\text{O}^+] = 10^{-5}" />؟</span>}
            solution={
              <div className="space-y-4" dir="ltr">
                <BlockMath math="\text{pH} = -\log [\text{H}_3\text{O}^+]" />
                <BlockMath math="\text{pH} = -\log 10^{-5}" />
                <BlockMath math="\text{pH} = 5" />
              </div>
            }
          />

          <SolvedExample 
            page="6"
            question={<span>3/ احسب تركيز أيون الهيدرونيوم اذا كان pH المحلول يساوي 4؟</span>}
            solution={
              <div className="space-y-4" dir="ltr">
                <BlockMath math="[\text{H}_3\text{O}^+] = 10^{-\text{pH}}" />
                <BlockMath math="[\text{H}_3\text{O}^+] = 10^{-4}" />
                <BlockMath math="[\text{H}_3\text{O}^+] = 0.0001 \, \text{M}" />
              </div>
            }
          />

          <SolvedExample 
            page="7"
            question={<span>5/ احسب <InlineMath math="[\text{OH}^-]" /> اذا كان <InlineMath math="\text{pOH}" /> المحلول يساوي 12؟</span>}
            solution={
              <div className="space-y-4" dir="ltr">
                <BlockMath math="[\text{OH}^-] = 10^{-\text{pOH}}" />
                <BlockMath math="[\text{OH}^-] = 10^{-12}" />
                <BlockMath math="[\text{OH}^-] = 1.0 \times 10^{-12} \, \text{M}" />
              </div>
            }
          />

          <SolvedExample 
            page="7"
            question={<span>6/ احسب <InlineMath math="\text{pH}" /> المحلول اذا كان <InlineMath math="\text{pOH}" /> له يساوي 11؟</span>}
            solution={
              <div className="space-y-4" dir="ltr">
                <BlockMath math="\text{pH} + \text{pOH} = 14" />
                <BlockMath math="\text{pH} + 11 = 14" />
                <BlockMath math="\text{pH} = 14 - 11 = 3" />
              </div>
            }
          />

          <SolvedExample 
            page="7"
            question={<span>7/ احسب تركيز ايون الهيدرونيوم لمحلول ذو <InlineMath math="\text{pOH}" /> يساوي 12؟</span>}
            solution={
              <div className="space-y-4" dir="ltr">
                <div className="flex items-center justify-center gap-8 mb-6" dir="rtl">
                   <div className="flex flex-col items-center gap-2">
                      <span className="text-cyan-400 font-bold">pOH</span>
                      <ArrowRightLeft className="w-4 h-4" />
                      <span className="text-purple-400 font-bold">pH</span>
                   </div>
                   <div className="flex flex-col items-center gap-2">
                      <span className="text-purple-400 font-bold">pH</span>
                      <ArrowRightLeft className="w-4 h-4" />
                      <span className="text-cyan-300 font-bold">[H3O+]</span>
                   </div>
                </div>
                <BlockMath math="\text{pH} + \text{pOH} = 14" />
                <BlockMath math="\text{pH} + 12 = 14 \implies \text{pH} = 2" />
                <BlockMath math="[\text{H}_3\text{O}^+] = 10^{-\text{pH}} = 10^{-2} = 0.01 \, \text{M}" />
              </div>
            }
          />

          <SolvedExample 
            page="7"
            question={<span>8/ احسب <InlineMath math="\text{pH}" /> المحلول اذا كان <InlineMath math="[\text{OH}^-]" /> يساوي <InlineMath math="2 \times 10^{-4}" />؟</span>}
            solution={
              <div className="space-y-4" dir="ltr">
                <BlockMath math="\text{pOH} = -\log [\text{OH}^-]" />
                <BlockMath math="\text{pOH} = -\log (2 \times 10^{-4}) = 3.7" />
                <BlockMath math="\text{pH} + \text{pOH} = 14" />
                <BlockMath math="\text{pH} + 3.7 = 14 \implies \text{pH} = 14 - 3.7 = 10.3" />
              </div>
            }
          />

          <SolvedExample 
            page="7"
            question="9/ جد تركيز ايون الهيدرونيوم في الماء؟"
            solution={
              <div className="space-y-4" dir="ltr">
                <BlockMath math="[\text{OH}^-] [\text{H}_3\text{O}^+] = 1 \times 10^{-14}" />
                <BlockMath math="X \cdot X = 1 \times 10^{-14} \implies X^2 = 10^{-14}" />
                <BlockMath math="X = 10^{-7}" />
                <BlockMath math="[\text{OH}^-] = [\text{H}_3\text{O}^+] = 10^{-7} \, \text{M}" />
              </div>
            }
          />

          <SolvedExample 
            page="8"
            question={<span>10/ جد تركيز ايون الهيدروكسيد في الماء عندما يكون <InlineMath math="\text{K}_w = 3 \times 10^{-15}" />؟</span>}
            solution={
              <div className="space-y-4" dir="ltr">
                <BlockMath math="[\text{OH}^-] [\text{H}_3\text{O}^+] = 3 \times 10^{-15}" />
                <BlockMath math="X \cdot X = 3 \times 10^{-15} \implies X^2 = 3 \times 10^{-15}" />
                <BlockMath math="X = 0.5 \times 10^{-7}" />
                <BlockMath math="[\text{OH}^-] = [\text{H}_3\text{O}^+] = 0.5 \times 10^{-7} \, \text{M}" />
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الصفحة 9 */}
      <section id="page-9">
        <GlassCard page="9" title="النوع الثاني: حسابات تراكيز المحاليل">
          <p className="text-xl text-gray-200 leading-relaxed mb-10 break-words whitespace-normal">
            يعطى تراكيز محاليل الحمض أو القاعدة ويطلب تركيز ايون هيدرونيوم أو هيدروكسيد وبالعكس.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10 relative">
               <div className="absolute -top-4 right-1/2 translate-x-1/2 px-4 py-1 bg-cyan-500 text-black font-black rounded-full text-sm">للحمض</div>
               <div className="flex flex-col items-center gap-6 mt-4">
                  <div className="w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[100px] border-b-cyan-500/20 relative flex items-center justify-center">
                     <span className="absolute top-12 text-cyan-400 font-black text-xl"><InlineMath math="[\text{H}_3\text{O}^+]" /></span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full">
                     <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-center">
                        <div className="text-xs text-gray-500 mb-1">عدد H</div>
                        <div className="text-white font-bold">M</div>
                     </div>
                     <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-center">
                        <div className="text-xs text-gray-500 mb-1">[الحامض]</div>
                        <div className="text-white font-bold">M</div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="p-8 bg-white/5 rounded-3xl border border-white/10 relative">
               <div className="absolute -top-4 right-1/2 translate-x-1/2 px-4 py-1 bg-purple-500 text-black font-black rounded-full text-sm">للأمان</div>
               <div className="flex flex-col items-center gap-6 mt-4">
                  <div className="w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[100px] border-b-purple-500/20 relative flex items-center justify-center">
                     <span className="absolute top-12 text-purple-400 font-black text-xl"><InlineMath math="[\text{OH}^-]" /></span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full">
                     <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-center">
                        <div className="text-xs text-gray-500 mb-1">عدد OH</div>
                        <div className="text-white font-bold">M</div>
                     </div>
                     <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-center">
                        <div className="text-xs text-gray-500 mb-1">[القاعدة]</div>
                        <div className="text-white font-bold">M</div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <SolvedExample 
            page="9"
            question={<span>1/ محلول حامض النتريك تركيزه <InlineMath math="1.0 \times 10^{-4} \, \text{M}" /> جد تركيز <InlineMath math="[\text{H}_3\text{O}^+]" /> و تركيز <InlineMath math="[\text{OH}^-]" />؟</span>}
            solution={
              <div className="space-y-4" dir="ltr">
                <BlockMath math="[\text{H}_3\text{O}^+] = \text{عدد } \text{H} \times [\text{الحمض}]" />
                <BlockMath math="[\text{H}_3\text{O}^+] = 1 \times 1.0 \times 10^{-4} = 1.0 \times 10^{-4} \, \text{M}" />
                <BlockMath math="[\text{OH}^-] [\text{H}_3\text{O}^+] = 1 \times 10^{-14}" />
                <BlockMath math="[\text{OH}^-] = \frac{1 \times 10^{-14}}{1.0 \times 10^{-4}} = 10^{-10} \, \text{M}" />
              </div>
            }
          />

          <SolvedExample 
            page="9"
            question={<span>2/ محلول حامض الكبريتيك تركيزه <InlineMath math="2.0 \times 10^{-4} \, \text{M}" /> جد تركيز <InlineMath math="[\text{H}_3\text{O}^+]" /> و تركيز <InlineMath math="[\text{OH}^-]" />؟</span>}
            solution={
              <div className="space-y-4" dir="ltr">
                <BlockMath math="[\text{H}_3\text{O}^+] = \text{عدد } \text{H} \times [\text{الحمض}]" />
                <BlockMath math="[\text{H}_3\text{O}^+] = 2 \times 2.0 \times 10^{-4} = 4 \times 10^{-4} \, \text{M}" />
                <BlockMath math="[\text{OH}^-] [\text{H}_3\text{O}^+] = 1 \times 10^{-14}" />
                <BlockMath math="[\text{OH}^-] = \frac{1 \times 10^{-14}}{4 \times 10^{-4}} = 2.5 \times 10^{-11} \, \text{M}" />
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الصفحة 10 */}
      <section id="page-10">
        <GlassCard page="10" title="المزيد من المسائل">
          <SolvedExample 
            page="10"
            question={<span>3/ محلول <InlineMath math="\text{Ca(OH)}_2" /> اس الهيدروجيني له يساوي 10 جد تركيز القاعدة؟</span>}
            solution={
              <div className="space-y-4" dir="ltr">
                <BlockMath math="\text{pH} + \text{pOH} = 14 \implies 10 + \text{pOH} = 14 \implies \text{pOH} = 4" />
                <BlockMath math="[\text{OH}^-] = 10^{-\text{pOH}} = 10^{-4} = 0.0001 \, \text{M}" />
                <BlockMath math="[\text{القاعدة}] = \frac{[\text{OH}^-]}{\text{عدد } \text{OH}} = \frac{0.0001}{2} = 5 \times 10^{-5} \, \text{M}" />
              </div>
            }
          />

          <SolvedExample 
            page="10"
            question={<span>4/ رقم الهيدروجيني لمحلول الكبريتيك تام التأين 2.3 جد كتلة الحمض بالغرام اللازمة لتحضير <InlineMath math="2000 \, \text{L}" /> من محلول؟ اذا علمت ان كتلة مولية للحمض يساوي <InlineMath math="98 \, \text{g/mol}" />؟</span>}
            solution={
              <div className="space-y-4" dir="ltr">
                <BlockMath math="[\text{H}_3\text{O}^+] = 10^{-\text{pH}} = 10^{-2.3} = 0.005 \, \text{M}" />
                <BlockMath math="[\text{الحمض}] = \frac{[\text{H}_3\text{O}^+]}{\text{عدد } \text{H}} = \frac{0.005}{2} = 0.0025 \, \text{M}" />
                <BlockMath math="\text{M} = \frac{\text{n}}{\text{V}} \implies 0.0025 = \frac{\text{n}}{2000} \implies \text{n} = 5 \, \text{mol}" />
                <BlockMath math="\text{n} = \frac{\text{الكتلة}}{\text{الكتلة المولية}} \implies 5 = \frac{\text{الكتلة}}{98} \implies \text{الكتلة} = 490 \, \text{g}" />
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الصفحة 11 */}
      <section id="page-11">
        <GlassCard page="11" title="تطبيقات متنوعة">
          <SolvedExample 
            page="11"
            question={<span>5/ لمحلول <InlineMath math="\text{Ca(OH)}_2" /> احسب <InlineMath math="\text{pH}" />؟ علما أن <InlineMath math="[\text{Ca(OH)}_2] = 5 \times 10^{-4} \, \text{M}" />.</span>}
            solution={
              <div className="space-y-4" dir="ltr">
                <p className="text-right text-yellow-400" dir="rtl">بما أن القاعدة قوية:</p>
                <BlockMath math="[\text{OH}^-] = 2 \times 5 \times 10^{-4} = 1.0 \times 10^{-3} \, \text{M}" />
                <BlockMath math="[\text{H}_3\text{O}^+] = \frac{10^{-14}}{1.0 \times 10^{-3}} = 1.0 \times 10^{-11} \, \text{M}" />
                <BlockMath math="\text{pH} = -\log (1.0 \times 10^{-11}) = 11" />
              </div>
            }
          />

          <SolvedExample 
            page="11"
            question={<span>6/ إذا كان المحلول <InlineMath math="\text{Ca(OH)}_2" /> له <InlineMath math="\text{pH}=8.0" /> احسب <InlineMath math="[\text{H}_3\text{O}^+]" /> و <InlineMath math="[\text{OH}^-]" /> و <InlineMath math="[\text{Ca(OH)}_2]" />؟</span>}
            solution={
              <div className="space-y-4" dir="ltr">
                <BlockMath math="[\text{H}_3\text{O}^+] = 10^{-\text{pH}} = 10^{-8} \, \text{M}" />
                <BlockMath math="[\text{OH}^-] = \frac{1 \times 10^{-14}}{10^{-8}} = 1.0 \times 10^{-6} \, \text{M}" />
                <BlockMath math="[\text{Ca(OH)}_2] = \frac{10^{-6}}{2} = 5 \times 10^{-7} \, \text{M}" />
              </div>
            }
          />

          <SolvedExample 
            page="11"
            question={<span>7/ محلول مائي لهيدروكسيد البوتاسيوم قيمة <InlineMath math="\text{pH}" /> له تساوي 13 والمطلوب حساب: أ- تركيز كاتيونات الهيدروجين؟ ب- تركيز أنيونات الهيدروكسيد؟</span>}
            solution={
              <div className="space-y-4" dir="ltr">
                <BlockMath math="[\text{H}_3\text{O}^+] = 10^{-\text{pH}} = 10^{-13} \, \text{M}" />
                <BlockMath math="[\text{OH}^-] = \frac{10^{-14}}{10^{-13}} = 10^{-1} \, \text{M}" />
              </div>
            }
          />

          <SolvedExample 
            page="11"
            question={<span>8/ ما قيمة تركيز <InlineMath math="[\text{H}_3\text{O}^+]" /> لمحلول حمض الهيدروكلوريك المستخدم لتنظيف البلاط علما بأن رقمه الهيدروجيني <InlineMath math="\text{pH}=0.45" />.</span>}
            solution={
              <div className="space-y-4" dir="ltr">
                <BlockMath math="[\text{H}_3\text{O}^+] = 10^{-0.45} = 0.35 \, \text{M}" />
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الصفحة 12 */}
      <section id="page-12">
        <GlassCard page="12" title="تحديات وزارية">
          <SolvedExample 
            page="12"
            question={<span>9/ خارجي / محلولان لحامض <InlineMath math="\text{HCl}" /> و <InlineMath math="\text{Sr(OH)}_2" /> وبنفس التركيز فان كانت قيمة <InlineMath math="\text{pH}" /> للاحدهما 3 فأن قيمة <InlineMath math="\text{pH}" /> للاخر:</span>}
            solution={
              <div className="space-y-4" dir="rtl">
                <p>يكون للحامض <InlineMath math="\text{pH} = 3" />.</p>
                <div className="flex items-center justify-center gap-4 my-4" dir="ltr">
                   <InlineMath math="\text{pH} \implies [\text{H}_3\text{O}^+] \implies [\text{HCl}] \implies [\text{Sr(OH)}_2] \implies [\text{OH}^-] \implies \text{pOH} \implies \text{pH}" />
                </div>
                <div className="space-y-2 text-left font-mono" dir="ltr">
                   <p>1. <InlineMath math="[\text{H}_3\text{O}^+] = 10^{-3} \, \text{M}" /></p>
                   <p>2. <InlineMath math="[\text{HCl}] = \frac{10^{-3}}{1} = 0.001 \, \text{M}" /></p>
                   <p>3. <InlineMath math="[\text{Sr(OH)}_2] = 0.001 \, \text{M}" /> (نفس التركيز)</p>
                   <p>4. <InlineMath math="[\text{OH}^-] = 0.001 \times 2 = 0.002 \, \text{M}" /></p>
                   <p>5. <InlineMath math="\text{pOH} = -\log(0.002) = 2.7" /></p>
                   <p>6. <InlineMath math="\text{pH} = 14 - 2.7 = 11.3" /></p>
                </div>
                <p className="text-cyan-400 font-black mt-4">الاختيار الصحيح: D / 11.3</p>
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الصفحة 13 */}
      <section id="page-13">
        <GlassCard page="13" title="علاقات التناسب في مقياس pH">
          <div className="relative min-h-[8rem] h-auto w-full bg-gradient-to-l from-blue-600 via-green-500 to-red-600 rounded-full flex flex-wrap items-center justify-between px-10 mb-16 py-8 gap-4">
             <div className="flex flex-col items-center">
                <span className="text-white font-black text-2xl">14</span>
                <span className="text-blue-300 text-sm">قاعدة قوية</span>
                <span className="text-blue-400 text-xs">2OH</span>
             </div>
             <div className="flex flex-col items-center">
                <span className="text-blue-200 font-bold">10</span>
                <span className="text-blue-300 text-xs">قاعدة ضعيفة</span>
                <span className="text-blue-400 text-xs">1OH</span>
             </div>
             <div className="flex flex-col items-center">
                <div className="p-2 bg-white/10 rounded-lg border border-white/20">
                   <span className="text-white font-black">ملح متعادل / ماء مقطر</span>
                </div>
                <span className="text-green-400 font-black text-2xl">7</span>
             </div>
             <div className="flex flex-col items-center">
                <span className="text-red-200 font-bold">4</span>
                <span className="text-red-300 text-xs">حمض ضعيف</span>
                <span className="text-red-400 text-xs">1H</span>
             </div>
             <div className="flex flex-col items-center">
                <span className="text-white font-black text-2xl">0</span>
                <span className="text-red-300 text-sm">حمض قوي</span>
                <span className="text-red-400 text-xs">2H</span>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
            {[
              { text: <span><InlineMath math="\text{pH}" /> تناسب عكسياً مع <InlineMath math="\text{pOH}" /></span>, color: "text-yellow-400" },
              { text: <span><InlineMath math="\text{pH}" /> تناسب طردياً مع <InlineMath math="[\text{OH}^-]" /></span>, color: "text-blue-400" },
              { text: <span><InlineMath math="\text{pH}" /> تناسب عكسياً مع <InlineMath math="[\text{H}_3\text{O}^+]" /></span>, color: "text-red-400" },
              { text: <span><InlineMath math="\text{pOH}" /> تناسب طردياً مع <InlineMath math="[\text{H}_3\text{O}^+]" /></span>, color: "text-red-400" },
              { text: <span><InlineMath math="\text{pOH}" /> تناسب عكسياً مع <InlineMath math="[\text{OH}^-]" /></span>, color: "text-blue-400" }
            ].map((rule, idx) => (
              <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                <span className={`text-xl font-bold ${rule.color}`}>{rule.text}</span>
              </div>
            ))}
          </div>

          <div className="space-y-12 mt-16">
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h6 className="text-2xl font-black text-cyan-400 mb-6">1/ لديك الاختيارات التالية (لنفس التركيز): <InlineMath math="\text{HF, H}_2\text{SO}_4, \text{HCl, NH}_3" /></h6>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Quiz question={<span>أي من التالي له أعلى <InlineMath math="\text{pH}" />؟</span>} options={[<InlineMath math="\text{H}_2\text{SO}_4" />, <InlineMath math="\text{HCl}" />, <InlineMath math="\text{HF}" />, <InlineMath math="\text{NH}_3" />]} correctAnswer={3} />
                <Quiz question={<span>أي من التالي له أقل <InlineMath math="\text{pH}" />؟</span>} options={[<InlineMath math="\text{H}_2\text{SO}_4" />, <InlineMath math="\text{HCl}" />, <InlineMath math="\text{HF}" />, <InlineMath math="\text{NH}_3" />]} correctAnswer={0} />
                <Quiz question={<span>أي من التالي له أعلى <InlineMath math="\text{pOH}" />؟</span>} options={[<InlineMath math="\text{H}_2\text{SO}_4" />, <InlineMath math="\text{HCl}" />, <InlineMath math="\text{HF}" />, <InlineMath math="\text{NH}_3" />]} correctAnswer={0} />
                <Quiz question={<span>أي من التالي له أقل <InlineMath math="\text{pOH}" />؟</span>} options={[<InlineMath math="\text{H}_2\text{SO}_4" />, <InlineMath math="\text{HCl}" />, <InlineMath math="\text{HF}" />, <InlineMath math="\text{NH}_3" />]} correctAnswer={3} />
                <Quiz question={<span>أي من التالي له أعلى تركيز <InlineMath math="[\text{H}_3\text{O}^+]" />؟</span>} options={[<InlineMath math="\text{H}_2\text{SO}_4" />, <InlineMath math="\text{HCl}" />, <InlineMath math="\text{HF}" />, <InlineMath math="\text{NH}_3" />]} correctAnswer={0} />
                <Quiz question={<span>أي من التالي له أقل تركيز <InlineMath math="[\text{H}_3\text{O}^+]" />؟</span>} options={[<InlineMath math="\text{H}_2\text{SO}_4" />, <InlineMath math="\text{HCl}" />, <InlineMath math="\text{HF}" />, <InlineMath math="\text{NH}_3" />]} correctAnswer={3} />
              </div>
            </div>

            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h6 className="text-2xl font-black text-purple-400 mb-6">2/ لديك الاختيارات التالية (لنفس التركيز): <InlineMath math="\text{KOH, Ca(OH)}_2, \text{HCl, NH}_3" /></h6>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Quiz question={<span>أي من التالي له أعلى <InlineMath math="\text{pH}" />؟</span>} options={[<InlineMath math="\text{KOH}" />, <InlineMath math="\text{Ca(OH)}_2" />, <InlineMath math="\text{HCl}" />, <InlineMath math="\text{NH}_3" />]} correctAnswer={1} />
                <Quiz question={<span>أي من التالي له أقل <InlineMath math="\text{pH}" />؟</span>} options={[<InlineMath math="\text{KOH}" />, <InlineMath math="\text{Ca(OH)}_2" />, <InlineMath math="\text{HCl}" />, <InlineMath math="\text{NH}_3" />]} correctAnswer={2} />
                <Quiz question={<span>أي من التالي له أعلى <InlineMath math="\text{pOH}" />؟</span>} options={[<InlineMath math="\text{KOH}" />, <InlineMath math="\text{Ca(OH)}_2" />, <InlineMath math="\text{HCl}" />, <InlineMath math="\text{NH}_3" />]} correctAnswer={2} />
                <Quiz question={<span>أي من التالي له أقل <InlineMath math="\text{pOH}" />؟</span>} options={[<InlineMath math="\text{KOH}" />, <InlineMath math="\text{Ca(OH)}_2" />, <InlineMath math="\text{HCl}" />, <InlineMath math="\text{NH}_3" />]} correctAnswer={1} />
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 14 */}
      <section id="page-14">
        <GlassCard page="14" title="تطبيقات الأملاح والأحماض">
          <div className="space-y-8">
            <Quiz 
              page="14"
              question={<span>3/ أي من المواد التالية له أعلى قيمة <InlineMath math="\text{pH}" />؟</span>}
              options={[<InlineMath math="\text{H}_2\text{O}" />, <InlineMath math="\text{NH}_4\text{Cl}" />, <InlineMath math="\text{KF}" />, <InlineMath math="\text{KCl}" />]}
              correctAnswer={2}
              explanation={<span><InlineMath math="\text{KF}" /> ملح قاعدي (مشتق من حمض ضعيف وقاعدة قوية) لذا <InlineMath math="\text{pH}" /> له أكبر من 7.</span>}
            />
            <Quiz 
              page="14"
              question={<span>4/ أي من التالي له أقل <InlineMath math="\text{pH}" />؟</span>}
              options={[<InlineMath math="\text{HClO}_2" />, <InlineMath math="\text{HClO}_4" />, <InlineMath math="\text{HClO}_3" />, <InlineMath math="\text{HClO}" />]}
              correctAnswer={1}
              explanation={<span><InlineMath math="\text{HClO}_4" /> هو الأقوى حامضية بين هذه الأحماض الأكسجينية، لذا له أقل <InlineMath math="\text{pH}" />.</span>}
            />
            
            <div className="p-8 bg-cyan-500/5 rounded-3xl border border-cyan-500/20">
              <h6 className="text-2xl font-black text-white mb-6">5/ لديك الاختيارات الآتية: <InlineMath math="\text{NH}_4\text{Cl, NaF, KCl}" /></h6>
              <div className="space-y-4">
                <Quiz question={<span>أ/ أي من التالي له أقل <InlineMath math="\text{pH}" />؟</span>} options={[<InlineMath math="\text{NH}_4\text{Cl}" />, <InlineMath math="\text{NaF}" />, <InlineMath math="\text{KCl}" />]} correctAnswer={0} />
                <Quiz question="ب/ أي من التالي ملح حمضي؟" options={[<InlineMath math="\text{NH}_4\text{Cl}" />, <InlineMath math="\text{NaF}" />, <InlineMath math="\text{KCl}" />]} correctAnswer={0} />
                <Quiz question="ج/ أي من التالي ملح قاعدي؟" options={[<InlineMath math="\text{NH}_4\text{Cl}" />, <InlineMath math="\text{NaF}" />, <InlineMath math="\text{KCl}" />]} correctAnswer={1} />
                <Quiz question="د/ أي من التالي ملح متعادل؟" options={[<InlineMath math="\text{NH}_4\text{Cl}" />, <InlineMath math="\text{NaF}" />, <InlineMath math="\text{KCl}" />]} correctAnswer={2} />
                <Quiz question={<span>ه/ أي من التالي له أعلى <InlineMath math="\text{pH}" />؟</span>} options={[<InlineMath math="\text{NH}_4\text{Cl}" />, <InlineMath math="\text{NaF}" />, <InlineMath math="\text{KCl}" />]} correctAnswer={1} />
                <Quiz question={<span>و/ أي من التالي له <InlineMath math="\text{pH} = 7" />؟</span>} options={[<InlineMath math="\text{NH}_4\text{Cl}" />, <InlineMath math="\text{NaF}" />, <InlineMath math="\text{KCl}" />]} correctAnswer={2} />
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 15 */}
      <section id="page-15">
        <GlassCard page="15" title="حسابات pH وقوة الأحماض والقواعد">
          <TeacherNote page="15">
            الحسابات السابقة تخص الأحماض القوية والقواعد القوية.
          </TeacherNote>

          <div className="space-y-8 text-xl text-gray-200 leading-relaxed break-words whitespace-normal">
            <div className="p-6 bg-white/5 rounded-2xl border-r-4 border-red-500 break-words whitespace-normal leading-relaxed">
              <p className="font-bold text-white mb-2 break-words whitespace-normal leading-relaxed">س/ في الأحماض الضعيفة مثل الألأستيك لالا يمكن حساب تركيز أيون الهيدرونيوم مباشرة من التركيز المولاري ، لماذا ؟</p>
              <p className="text-gray-400 break-words whitespace-normal leading-relaxed">ج- لعدم تأين جميع جزيئات الحمض الضعيف .</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border-r-4 border-blue-500 break-words whitespace-normal leading-relaxed">
              <p className="font-bold text-white mb-2 break-words whitespace-normal leading-relaxed">س/ في القواعد الضعيفة مثل الألأمونيا لالا يمكن حساب تركيز أيون الهيدروكسيد مباشرة من التركيز المولاري ، لماذا ؟</p>
              <p className="text-gray-400 break-words whitespace-normal leading-relaxed">ج- لعدم تأين جميع جزيئات القاعدة الضعيفة .</p>
            </div>
            <p className="p-6 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 break-words whitespace-normal leading-relaxed">
              عمليا ثم يحسب تركيز أيون الهيدرونيوم والهيدروكسيد pH في الأحماض والقواعد الضعيفة تقاس أو يعطى في السؤال تركيز ايون الهيدرونيوم أو الهيدروكسيد ومن نجد باقي المطاليب.
            </p>
          </div>

          <div className="mt-16 space-y-8">
            <Quiz page="15" question="1/ تسمى عملية التي يتأين فيها الماء جزئيا الى ايونات؟" options={["الاسموزية", "التأين الذاتي", "التفكك", "التأين"]} correctAnswer={1} />
            <Quiz page="15" question="2/ تتأثر قيمة Kw للماء بـ؟" options={["اذابة الملح في المحلول", "التغير في درجة الحرارة", "التغير في تركيز ايون الهيدروكسيد", "وجود حمض قوي"]} correctAnswer={1} />
            <Quiz page="15" question={<span>3/ إذا كان <InlineMath math="[\text{H}_3\text{O}^+]" /> أصغر من <InlineMath math="[\text{OH}^-]" /> في المحلول؟</span>} options={["متعادل", "قاعدي", "حامضي", "امفوتيري"]} correctAnswer={1} />
            <Quiz page="15" question={<span>4/ محلول حمض النتريك تركيزه <InlineMath math="1 \times 10^{-4} \, \text{M}" /> جد تركيز أيون الهيدرونيوم؟</span>} options={[<InlineMath math="10^{-8}" />, <InlineMath math="10^{-4}" />, <InlineMath math="10^{-10}" />, <InlineMath math="10^{-11}" />]} correctAnswer={1} />
            <Quiz page="15" question={<span>5/ احسب تركيز أيون الهيدرونيوم في محلول <InlineMath math="3.0 \times 10^{-2} \, \text{M} \, \text{NaOH}" />؟</span>} options={[<InlineMath math="3.3 \times 10^{-3}" />, <InlineMath math="3.3 \times 10^{-7}" />, <InlineMath math="3.3 \times 10^{-9}" />, <InlineMath math="3.3 \times 10^{-13}" />]} correctAnswer={3} />
            <Quiz page="15" question={<span>6/ احسب تركيز أيون الهيدروكسيد في محلول <InlineMath math="1 \times 10^{-4} \, \text{M} \, \text{HNO}_3" />؟</span>} options={[<InlineMath math="1 \times 10^{-11} \, \text{M}" />, <InlineMath math="5 \times 10^{-11} \, \text{M}" />, <InlineMath math="2 \times 10^{-10} \, \text{M}" />, <InlineMath math="1 \times 10^{-10} \, \text{M}" />]} correctAnswer={3} />
            <Quiz page="15" question={<span>7/ ما تركيز <InlineMath math="[\text{H}_3\text{O}^+]" /> في محلول <InlineMath math="1 \times 10^{-4} \, \text{M} \, \text{Ca(OH)}_2" />؟</span>} options={[<InlineMath math="5 \times 10^{-11} \, \text{M}" />, <InlineMath math="5 \times 10^{-11} \, \text{M}" />, <InlineMath math="1 \times 10^{-10} \, \text{M}" />, <InlineMath math="2 \times 10^{-10} \, \text{M}" />]} correctAnswer={0} />
            <Quiz page="15" question="8/ أي من المحاليل التالية تحتوي أعلى تركيز لأيونات الهيدرونوم؟" options={[<InlineMath math="0.1 \, \text{M} \, \text{H}_3\text{PO}_4" />, <InlineMath math="0.1 \, \text{M} \, \text{H}_2\text{SO}_4" />, <InlineMath math="0.1 \, \text{M} \, \text{HCl}" />, <InlineMath math="0.1 \, \text{M} \, \text{HNO}_3" />]} correctAnswer={1} />
            <Quiz page="15" question={<span>9/ يمتد سلم قياس <InlineMath math="\text{pH}" /> عادة من؟</span>} options={["0 الى 1", "0 الى 14", "0 الى 7", "0 الى 10"]} correctAnswer={1} />
            <Quiz page="15" question="10/ أي من المحاليل التالية ليست حامضية؟" options={[<InlineMath math="\text{pH} = 12.6" />, <InlineMath math="\text{pOH} = 11.7" />, <InlineMath math="[\text{OH}^-] = 1 \times 10^{-11} \, \text{M}" />, <InlineMath math="[\text{H}_3\text{O}^+] = 1 \times 10^{-4} \, \text{M}" />]} correctAnswer={0} />
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 16 */}
      <section id="page-16">
        <GlassCard page="16" title="بنك الأسئلة الشامل">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Quiz question={<span>11/ احسب قيمة <InlineMath math="\text{pH}" /> لمحلول <InlineMath math="1.0 \times 10^{-3} \, \text{M} \, \text{NaOH}" />؟</span>} options={["12", "11", "7", "9"]} correctAnswer={1} />
            <Quiz question={<span>12/ احسب قيمة <InlineMath math="\text{pH}" /> لمحلول <InlineMath math="1.0 \times 10^{-3} \, \text{M} \, \text{HCl}" />؟</span>} options={["12", "8", "12", "3"]} correctAnswer={3} />
            <Quiz question={<span>13/ ما مقدار <InlineMath math="\text{pH}" /> للمحلول الذي يكون فيه <InlineMath math="[\text{H}_3\text{O}^+]" /> مساوياً لـ <InlineMath math="3.4 \times 10^{-5} \, \text{M}" />؟</span>} options={["4.46", "6", "8.6", "12.8"]} correctAnswer={0} />
            <Quiz question={<span>14/ ما مقدار <InlineMath math="\text{pH}" /> للمحلول الذي يكون فيه <InlineMath math="[\text{H}_3\text{O}^+]" /> مساوياً لـ <InlineMath math="6.7 \times 10^{-4} \, \text{M}" />؟</span>} options={["7.31", "5.13", "3.92", "3.17"]} correctAnswer={3} />
            <Quiz question={<span>15/ ما الرقم الهيدروجيني لمحلول إذا كان <InlineMath math="[\text{H}_3\text{O}^+]" /> يساوي <InlineMath math="1.7 \times 10^{-3} \, \text{M}" />؟</span>} options={["2.77", "2.42", "2.13", "1.81"]} correctAnswer={2} />
            <Quiz question={<span>16/ ما الرقم الهيدروجيني لمحلول <InlineMath math="\text{Ca(OH)}_2" /> تركيزه <InlineMath math="5 \times 10^{-3} \, \text{M}" />؟</span>} options={["12.0", "11.3", "2", "2.7"]} correctAnswer={1} />
            <Quiz question={<span>17/ احسب تركيز أيون الهيدرونيوم لمحلول مائي له <InlineMath math="\text{pH}" /> يساوي <InlineMath math="4.0" />؟</span>} options={["10^-11", "10^-1", "10^-8", "10^-4"]} correctAnswer={3} />
            <Quiz question={<span>18/ لمحلول مائي معين قيس الرقم الهيدروجيني له فكان <InlineMath math="\text{pH} = 7.52" /> جد تركيز أيون الهيدرونيوم؟</span>} options={["3x10^-6", "3x10^-3", "3x10^-2", "3x10^-8"]} correctAnswer={3} />
            <Quiz question={<span>19/ احسب تركيز أيون الهيدرونيوم لمحلول مائي رقمه الهيدروجيني <InlineMath math="1.50" />؟</span>} options={["0.04", "0.03", "0.3", "0.003"]} correctAnswer={1} />
            <Quiz question={<span>20/ احسب تركيز أيون الهيدرونيوم لمحلول مائي رقمه الهيدروجيني <InlineMath math="3.67" />؟</span>} options={["0.0001", "0.0002", "0.002", "0.00002"]} correctAnswer={1} />
            <Quiz question={<span>21/ أي العلاقات التالية تدل على أن المحلول المائي <InlineMath math="\text{pH}" /> له أكبر من 7؟</span>} options={[<InlineMath math="\text{pOH} = 11" />, <InlineMath math="[\text{H}_3\text{O}^+] = [\text{OH}^-]" />, <InlineMath math="[\text{H}_3\text{O}^+] > [\text{OH}^-]" />, <InlineMath math="[\text{H}_3\text{O}^+] < [\text{OH}^-]" />]} correctAnswer={3} />
            <Quiz question={<span>22/ <InlineMath math="[\text{H}_3\text{O}^+]" /> في الماء النقي عند <InlineMath math="25 \, ^\circ\text{C}" /> تساوي؟</span>} options={["55.2", <InlineMath math="10^7" />, <InlineMath math="10^{-7}" />, "7"]} correctAnswer={2} />
            <Quiz question={<span>23/ <InlineMath math="\text{pOH}" /> لمحلول <InlineMath math="0.01 \, \text{mol}" /> من حمض النتريك في <InlineMath math="1 \, \text{L}" /> من محلوله تساوي؟</span>} options={["12", "11.3", "2.0", "2.7"]} correctAnswer={0} />
            <Quiz question={<span>24/ في أي المحاليل الآتية <InlineMath math="[\text{H}_3\text{O}^+] > [\text{OH}^-]" />؟</span>} options={[<InlineMath math="\text{CH}_3\text{NH}_2" />, <InlineMath math="\text{Ba(NO}_3)_2" />, <InlineMath math="\text{CH}_3\text{OH}" />, <InlineMath math="\text{NH}_4\text{Cl}" />]} correctAnswer={3} />
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 17 */}
      <section id="page-17">
        <GlassCard page="17" title="مراجعة القسم 1-4">
          <div className="space-y-8 text-xl text-gray-300">
            <div className="p-6 bg-white/5 rounded-2xl border-l-4 border-cyan-500">
               <p className="text-cyan-400 mb-2">1. ما تركيز أيوني الهيدرونيوم والهيدروكسيد في الماء النقي عند درجة حرارة 25 C؟</p>
               <p className="text-gray-200">ج/ <InlineMath math="[\text{H}_3\text{O}^+] = 1.0 \times 10^{-7} \, \text{M}" /> و <InlineMath math="[\text{OH}^-] = 1.0 \times 10^{-7} \, \text{M}" />.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border-l-4 border-purple-500">
               <p className="text-purple-400 mb-2">2. لماذا يتدرج سلم pH، بصورة عامة، من 0 إلى 14 في المحاليل المائية؟</p>
               <p className="text-gray-200">ج/ في معظم المحاليل المائية يقع <InlineMath math="[\text{H}_3\text{O}^+]" /> عادة بين <InlineMath math="10^0 \, \text{M}" /> و <InlineMath math="1 \times 10^{-14} \, \text{M}" />.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border-l-4 border-yellow-500">
               <p className="text-yellow-500 mb-2">3. لماذا يمثل pH=7 محلولاً متعادلاً عند درجة حرارة الغرفة 25 C؟</p>
               <p className="text-gray-200">ج/ بالنسبة إلى المحاليل المائية، <InlineMath math="[\text{OH}^-][\text{H}_3\text{O}^+] = 1 \times 10^{-14}" /> عند درجة 25 C. وفي المحاليل المتعادلة <InlineMath math="[\text{OH}^-] = [\text{H}_3\text{O}^+]" /> أي إنهما يساويان <InlineMath math="10^{-7} \, \text{M}" /> أي 7 pH.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border-l-4 border-red-500">
               <p className="text-red-400 mb-2">4. في محلول يحتوي على 4.5x10^-3 M HCl، احسب ما يلي:</p>
               <p className="text-gray-200">أ. <InlineMath math="[\text{H}_3\text{O}^+] = 4.5 \times 10^{-3} \, \text{M}" /></p>
               <p className="text-gray-200">ب. <InlineMath math="[\text{OH}^-] = 2.2 \times 10^{-12} \, \text{M}" /></p>
               <p className="text-gray-200">ج. <InlineMath math="\text{pH} = 2.35" /></p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border-l-4 border-green-500">
               <p className="text-green-400 mb-2">5. المحلول Ca(OH)2 له pH=8.0. احسب ما يلي:</p>
               <p className="text-gray-200">أ. <InlineMath math="[\text{H}_3\text{O}^+] = 1 \times 10^{-8} \, \text{M}" /></p>
               <p className="text-gray-200">ب. <InlineMath math="[\text{OH}^-] = 1 \times 10^{-6} \, \text{M}" /></p>
               <p className="text-gray-200">ج. <InlineMath math="[\text{Ca(OH)}_2] = 5 \times 10^{-7} \, \text{M}" /></p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border-l-4 border-orange-500">
               <p className="text-orange-400 mb-2">6. توقع نتائج: رتّب المحاليل التالية تبعاً لقيم pH، من أصغرها إلى أكبرها:</p>
               <p className="text-gray-200 leading-relaxed">
                  <InlineMath math="0.10 \, \text{M} \, \text{H}_2\text{SO}_4 < 0.10 \, \text{M} \, \text{HCl} < 0.10 \, \text{M} \, \text{HF}" /><br/>
                  (<InlineMath math="\text{H}_2\text{SO}_4" /> حمض ثنائي البروتون، قوي؛ <InlineMath math="\text{HCl}" /> حمض قوي؛ <InlineMath math="\text{HF}" /> حمض ضعيف).
               </p>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 18 */}
      <section id="page-18">
        <GlassCard page="18" title="تحديد الرقم الهيدروجيني والمعايرة">
          <SectionHeader icon={FlaskConical} title="الكواشف (Indicators)" />
          
          <Definition title="الكواشف">
            هي مركبات حساسة للرقم الهيدروجيني يتغير لونها بتغير قيمة pH للمحلول.
          </Definition>

          <div className="p-8 bg-white/5 rounded-3xl border border-white/10 my-10">
             <h6 className="text-xl font-bold text-yellow-400 mb-4">مدى الانتقال (Transition Interval):</h6>
             <p className="text-gray-300 leading-relaxed">هو مدى الرقم الهيدروجيني الذي يتغير فيه لون الكاشف.</p>
          </div>

          <div className="overflow-x-auto w-full rounded-3xl border border-white/10 bg-white/5 my-10">
            <table className="w-full min-w-[600px] text-right" dir="rtl">
              <thead className="bg-white/10">
                <tr>
                  <th className="p-4 text-cyan-400">الكاشف</th>
                  <th className="p-4 text-cyan-400">مدى pH تقريباً</th>
                  <th className="p-4 text-cyan-400">اللون في الوسط الحمضي</th>
                  <th className="p-4 text-cyan-400">اللون في الوسط القاعدي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="p-4 text-white">الميثيل البرتقالي</td>
                  <td className="p-4 text-gray-300">3.1 - 4.4</td>
                  <td className="p-4 text-red-400">أحمر</td>
                  <td className="p-4 text-yellow-400">أصفر</td>
                </tr>
                <tr>
                  <td className="p-4 text-white">بروموثيمول الأزرق</td>
                  <td className="p-4 text-gray-300">6.0 - 7.6</td>
                  <td className="p-4 text-yellow-400">أصفر</td>
                  <td className="p-4 text-blue-400">أزرق</td>
                </tr>
                <tr>
                  <td className="p-4 text-white">الفينولفثالين</td>
                  <td className="p-4 text-gray-300">8.0 - 10.0</td>
                  <td className="p-4 text-gray-400">عديم اللون</td>
                  <td className="p-4 text-pink-400">وردي / أحمر</td>
                </tr>
              </tbody>
            </table>
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 19 */}
      <section id="page-19">
        <GlassCard page="19" title="مقياس pH والمعايرة">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
             <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <h6 className="text-2xl font-black text-cyan-400 mb-4">مقياس pH الإلكتروني</h6>
                <p className="text-gray-300 leading-relaxed">يعطي قراءات أكثر دقة من الكواشف الورقية، حيث يقيس فرق الجهد الناتج عن تركيز أيونات الهيدرونيوم.</p>
             </div>
             <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <h6 className="text-2xl font-black text-purple-400 mb-4">المعايرة (Titration)</h6>
                <p className="text-gray-300 leading-relaxed">هي عملية إضافة محكومة لمحلول معلوم التركيز إلى محلول مجهول التركيز حتى الوصول لنقطة التكافؤ.</p>
             </div>
          </div>

          <div className="space-y-6">
            <Definition title="نقطة التكافؤ (Equivalence Point)">
              هي النقطة التي تكون عندها كمية الحمض والقاعدة متكافئة كيميائياً.
            </Definition>
            <Definition title="نقطة النهاية (End Point)">
              هي النقطة التي يتغير عندها لون الكاشف أثناء المعايرة.
            </Definition>
            <Definition title="المحلول القياسي (Standard Solution)">
              هو المحلول الذي يحتوي على تركيز معلوم بدقة من المادة المذابة.
            </Definition>
            <Definition title="المادة القياسية الأولية">
              هي مادة صلبة نقية جداً تستخدم لتحضير المحلول القياسي.
            </Definition>
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 20 */}
      <section id="page-20">
        <GlassCard page="20" title="منحنيات المعايرة">
          <SectionHeader icon={Activity} title="معايرة حمض قوي مع قاعدة قوية" />
          
          <div className="flex flex-col md:flex-row gap-10 items-center">
             <div className="flex-1 space-y-6">
                <p className="text-xl text-gray-200 leading-relaxed">
                   عند معايرة حمض قوي (مثل <InlineMath math="\text{HCl}" />) مع قاعدة قوية (مثل <InlineMath math="\text{NaOH}" />):
                </p>
                <ul className="space-y-4">
                   <li className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-cyan-500" />
                      <span>تكون نقطة التكافؤ عند <InlineMath math="\text{pH} = 7" /> تماماً.</span>
                   </li>
                   <li className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-cyan-500" />
                      <span>يحدث تغير مفاجئ وكبير في قيمة pH حول نقطة التكافؤ.</span>
                   </li>
                   <li className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-cyan-500" />
                      <span>الكاشف المناسب هو الذي يقع مدى انتقاله ضمن هذا التغير المفاجئ.</span>
                   </li>
                </ul>
             </div>
             <div className="w-full md:w-1/3 aspect-square bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500 via-transparent to-transparent" />
                <div className="relative w-4/5 h-4/5 border-l-2 border-b-2 border-white/20 flex items-end">
                   <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                      <path d="M 0 90 Q 40 90 50 50 T 100 10" fill="none" stroke="#22d3ee" strokeWidth="2" />
                      <circle cx="50" cy="50" r="3" fill="#facc15" />
                      <text x="55" y="55" fill="#facc15" fontSize="6" className="font-bold">pH=7</text>
                   </svg>
                </div>
             </div>
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 21 */}
      <section id="page-21">
        <GlassCard page="21" title="حالات المعايرة الأخرى">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <h6 className="text-2xl font-black text-red-400 mb-4">حمض قوي + قاعدة ضعيفة</h6>
                <p className="text-gray-300 mb-4">تكون نقطة التكافؤ عند <InlineMath math="\\text{pH} < 7" /> (وسط حمضي).</p>
                <div className="min-h-[10rem] h-auto bg-black/40 rounded-xl flex items-end p-4">
                   <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path d="M 0 90 Q 40 90 50 65 T 100 40" fill="none" stroke="#f87171" strokeWidth="2" />
                      <circle cx="50" cy="65" r="3" fill="white" />
                   </svg>
                </div>
             </div>
             <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <h6 className="text-2xl font-black text-blue-400 mb-4">حمض ضعيف + قاعدة قوية</h6>
                <p className="text-gray-300 mb-4">تكون نقطة التكافؤ عند <InlineMath math="\\text{pH} > 7" /> (وسط قاعدي).</p>
                <div className="min-h-[10rem] h-auto bg-black/40 rounded-xl flex items-end p-4">
                   <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path d="M 0 60 Q 40 60 50 35 T 100 10" fill="none" stroke="#60a5fa" strokeWidth="2" />
                      <circle cx="50" cy="35" r="3" fill="white" />
                   </svg>
                </div>
             </div>
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 22 */}
      <section id="page-22">
        <GlassCard page="22" title="حسابات المعايرة">
          <FormulaBox 
            page="22"
            label="قانون المعايرة"
          >
            {"\\\\frac{M_a V_a}{n_a} = \\\\frac{M_b V_b}{n_b}"}
          </FormulaBox>
          <p className="text-center text-gray-400 mb-10" dir="rtl">حيث a ترمز للحمض و b ترمز للقاعدة، و n هي المعاملات في المعادلة الموزونة.</p>

          <SolvedExample 
            page="22"
            question="1/ في تجربة معايرة حمض الهيدروكلوريك مع هيدروكسيد الصوديوم، تعادل 20 mL من الحمض مع 25 mL من القاعدة تركيزها 0.1 M. احسب تركيز الحمض؟"
            solution={
              <div className="space-y-4" dir="ltr">
                <p className="text-right text-gray-400" dir="rtl">المعادلة: <InlineMath math="\text{HCl} + \text{NaOH} \rightarrow \text{NaCl} + \text{H}_2\text{O}" /></p>
                <BlockMath math="\frac{M_a \times 20}{1} = \frac{0.1 \times 25}{1}" />
                <BlockMath math="M_a = \frac{2.5}{20} = 0.125 \, \text{M}" />
              </div>
            }
          />

          <SolvedExample 
            page="22"
            question="2/ احسب حجم حمض الكبريتيك 0.2 M اللازم لمعايرة 40 mL من هيدروكسيد البوتاسيوم 0.1 M؟"
            solution={
              <div className="space-y-4" dir="ltr">
                <p className="text-right text-gray-400" dir="rtl">المعادلة: <InlineMath math="\text{H}_2\text{SO}_4 + 2\text{KOH} \rightarrow \text{K}_2\text{SO}_4 + 2\text{H}_2\text{O}" /></p>
                <BlockMath math="\frac{0.2 \times V_a}{1} = \frac{0.1 \times 40}{2}" />
                <BlockMath math="0.2 V_a = 2 \implies V_a = 10 \, \text{mL}" />
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الصفحة 23 */}
      <section id="page-23">
        <GlassCard page="23" title="مسائل متقدمة في المعايرة">
          <SolvedExample 
            page="23"
            question={<span>3/ عينة من حمض الخليك <InlineMath math="\text{CH}_3\text{COOH}" /> كتلتها <InlineMath math="0.6 \, \text{g}" /> أذيبت في الماء وتمت معايرتها مع محلول <InlineMath math="\text{NaOH}" /> تركيزه <InlineMath math="0.1 \, \text{M}" />. فإذا استهلك <InlineMath math="20 \, \text{mL}" /> من القاعدة للوصول لنقطة النهاية، احسب النسبة المئوية لحمض الخليك في العينة؟ (الكتلة المولية للحمض <InlineMath math="60 \, \text{g/mol}" />).</span>}
            solution={
              <div className="space-y-4" dir="ltr">
                <p className="text-right text-gray-400" dir="rtl">المعادلة: <InlineMath math="\text{CH}_3\text{COOH} + \text{NaOH} \rightarrow \text{CH}_3\text{COONa} + \text{H}_2\text{O}" /></p>
                <p className="text-right text-cyan-400" dir="rtl">1. حساب عدد مولات القاعدة المستهلكة:</p>
                <BlockMath math="n_b = M_b \times V_b = 0.1 \times 0.02 = 0.002 \, \text{mol}" />
                <p className="text-right text-cyan-400" dir="rtl">2. من المعادلة (1:1)، عدد مولات الحمض = <InlineMath math="0.002 \, \text{mol}" />.</p>
                <p className="text-right text-cyan-400" dir="rtl">3. حساب كتلة الحمض النقي:</p>
                <BlockMath math="m = n \times M_w = 0.002 \times 60 = 0.12 \, \text{g}" />
                <p className="text-right text-cyan-400" dir="rtl">4. حساب النسبة المئوية:</p>
                <BlockMath math="\text{Percentage} = \frac{0.12}{0.6} \times 100 = 20\%" />
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الصفحة 24 */}
      <section id="page-24">
        <GlassCard page="24" title="مراجعة القسم 2-4">
          <div className="space-y-8 text-xl text-gray-300">
            <div className="p-6 bg-white/5 rounded-2xl border-l-4 border-cyan-500">
               <p className="text-cyan-400 mb-2">1. ما الفرق بين نقطة التكافؤ ونقطة النهاية في المعايرة؟</p>
               <p className="text-gray-200">ج/ نقطة التكافؤ هي النقطة التي تتكافأ عندها كميات الحمض والقاعدة كيميائياً، أما نقطة النهاية فهي النقطة التي يتغير عندها لون الكاشف فعلياً.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border-l-4 border-purple-500">
               <p className="text-purple-400 mb-2">2. صف التغير في pH الذي يحدث أثناء معايرة حمض قوي مع قاعدة قوية.</p>
               <p className="text-gray-200">ج/ يبدأ pH منخفضاً جداً، ثم يرتفع ببطء مع إضافة القاعدة، وعند الاقتراب من نقطة التكافؤ (pH=7) يحدث ارتفاع مفاجئ وكبير جداً في قيمة pH.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border-l-4 border-yellow-500">
               <p className="text-yellow-500 mb-2">3. ما هو المحلول القياسي؟ وكيف يتم تحضيره؟</p>
               <p className="text-gray-200">ج/ هو محلول معلوم التركيز بدقة. يحضر بإذابة كتلة معلومة من مادة قياسية أولية في حجم محدد من المذيب، أو بمعايرته مع محلول قياسي آخر.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border-l-4 border-red-500">
               <p className="text-red-400 mb-2">4. لماذا يعد الفينولفثالين كاشفاً مناسباً لمعايرة حمض ضعيف مع قاعدة قوية؟</p>
               <p className="text-gray-200">ج/ لأن مدى انتقال الفينولفثالين (8.0-10.0) يقع ضمن منطقة التغير المفاجئ في pH لهذه المعايرة، حيث تكون نقطة التكافؤ في الوسط القاعدي (pH {">"} 7).</p>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 25 */}
      <section id="page-25">
        <GlassCard page="25" title="مراجعة الفصل - المفاهيم الأساسية">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
               <h6 className="text-cyan-400 font-bold mb-2">1. التأين الذاتي للماء</h6>
               <p className="text-gray-300">تفاعل جزيئين من الماء لإنتاج أيون الهيدرونيوم وأيون الهيدروكسيد.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
               <h6 className="text-cyan-400 font-bold mb-2">2. ثابت تأين الماء (Kw)</h6>
               <p className="text-gray-300">يساوي <InlineMath math="1.0 \times 10^{-14}" /> عند درجة حرارة 25 C.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
               <h6 className="text-cyan-400 font-bold mb-2">3. تأثير إضافة الحمض</h6>
               <p className="text-gray-300">يزيد من تركيز <InlineMath math="[\text{H}_3\text{O}^+]" /> ويقلل من تركيز <InlineMath math="[\text{OH}^-]" /> ويخفض قيمة pH.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
               <h6 className="text-cyan-400 font-bold mb-2">4. العلاقة بين pH و pOH</h6>
               <p className="text-gray-300">مجموعهما يساوي دائماً 14 في المحاليل المائية عند 25 C.</p>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 26 */}
      <section id="page-26">
        <GlassCard page="26" title="مراجعة الفصل - المسائل الحسابية">
          <SolvedExample 
            page="26"
            question="5/ احسب pH لمحلول 0.001 M HCl."
            solution={
              <div className="space-y-4" dir="ltr">
                <BlockMath math="[\text{H}_3\text{O}^+] = 0.001 \, \text{M} = 10^{-3} \, \text{M}" />
                <BlockMath math="\text{pH} = -\log(10^{-3}) = 3" />
              </div>
            }
          />
          <SolvedExample 
            page="26"
            question={<span>6/ احسب <InlineMath math="\text{pOH}" /> لمحلول <InlineMath math="0.05 \, \text{M} \, \text{Ba(OH)}_2" />.</span>}
            solution={
              <div className="space-y-4" dir="ltr">
                <BlockMath math="[\text{OH}^-] = 2 \times 0.05 = 0.1 \, \text{M} = 10^{-1} \, \text{M}" />
                <BlockMath math="\text{pOH} = -\log(10^{-1}) = 1" />
              </div>
            }
          />
          <SolvedExample 
            page="26"
            question="7/ إذا كان pH=4.5، احسب [H3O+]."
            solution={
              <div className="space-y-4" dir="ltr">
                <BlockMath math="[\text{H}_3\text{O}^+] = 10^{-4.5} = 3.16 \times 10^{-5} \, \text{M}" />
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الصفحة 27 */}
      <section id="page-27">
        <GlassCard page="27" title="مراجعة الفصل - مسائل المعايرة">
          <SolvedExample 
            page="27"
            question="8/ عوير 25 mL من حمض مجهول مع 30 mL من 0.1 M NaOH. احسب تركيز الحمض (بفرض أنه أحادي البروتون)."
            solution={
              <div className="space-y-4" dir="ltr">
                <BlockMath math="M_a \times 25 = 0.1 \times 30" />
                <BlockMath math="M_a = \frac{3}{25} = 0.12 \, \text{M}" />
              </div>
            }
          />
          <SolvedExample 
            page="27"
            question="9/ ما حجم 0.5 M HCl اللازم لتعادل 50 mL من 0.2 M Ca(OH)2؟"
            solution={
              <div className="space-y-4" dir="ltr">
                <p className="text-right text-gray-400" dir="rtl">المعادلة: <InlineMath math="2\text{HCl} + \text{Ca(OH)}_2 \rightarrow \text{CaCl}_2 + 2\text{H}_2\text{O}" /></p>
                <BlockMath math="\frac{0.5 \times V_a}{2} = \frac{0.2 \times 50}{1}" />
                <BlockMath math="0.25 V_a = 10 \implies V_a = 40 \, \text{mL}" />
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الصفحة 28 */}
      <section id="page-28">
        <GlassCard page="28" title="خاتمة الفصل - ملاحظات الأستاذ">
          <TeacherNote page="28">
            <div className="space-y-6">
               <p className="text-2xl font-black text-white break-words whitespace-normal leading-relaxed">أبنائي الطلبة، إليكم ملخص القوانين الذهبية لهذا الفصل:</p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-mono" dir="ltr">
                  <div className="p-4 bg-black/40 rounded-xl border border-white/10">
                     <BlockMath math="[\\text{H}_3\\text{O}^+][\\text{OH}^-] = 10^{-14}" />
                  </div>
                  <div className="p-4 bg-black/40 rounded-xl border border-white/10">
                     <BlockMath math="\\text{pH} + \\text{pOH} = 14" />
                  </div>
                  <div className="p-4 bg-black/40 rounded-xl border border-white/10">
                     <BlockMath math="\\text{pH} = -\\log[\\text{H}_3\\text{O}^+]" />
                  </div>
                  <div className="p-4 bg-black/40 rounded-xl border border-white/10">
                     <BlockMath math="\\text{pOH} = -\\log[\\text{OH}^-]" />
                  </div>
                  <div className="p-4 bg-black/40 rounded-xl border border-white/10">
                     <BlockMath math="[\\text{H}_3\\text{O}^+] = 10^{-\\text{pH}}" />
                  </div>
                  <div className="p-4 bg-black/40 rounded-xl border border-white/10">
                     <BlockMath math="[\\text{OH}^-] = 10^{-\\text{pOH}}" />
                  </div>
               </div>
               <p className="text-xl text-cyan-400 font-bold mt-8 break-words whitespace-normal leading-relaxed">تذكروا دائماً: الدقة في الحسابات الكيميائية تبدأ من كتابة المعادلة الموزونة بشكل صحيح.</p>
               <p className="text-right text-gray-400 italic break-words whitespace-normal leading-relaxed">مع تمنياتي لكم بالتوفيق والنجاح - الأستاذ أحمد قاسم</p>
            </div>
          </TeacherNote>
        </GlassCard>
      </section>

      <div className="text-center py-20">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-black rounded-full shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform"
        >
          تم بحمد الله - العودة لبداية الفصل
        </button>
      </div>

    </div>
  );
}
