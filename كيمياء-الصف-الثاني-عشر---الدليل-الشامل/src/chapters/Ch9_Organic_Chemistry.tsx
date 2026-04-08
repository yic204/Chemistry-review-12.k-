import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { 
  FlaskConical, 
  Layers, 
  Zap, 
  BookOpen, 
  Info, 
  Scale, 
  Activity, 
  ChevronRight,
  CircleDot,
  Hexagon,
  Wind,
  Flame,
  Atom,
  Grid,
  Target,
  Lightbulb,
  AlertTriangle,
  Beaker,
  Thermometer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import 'katex/dist/katex.min.css';

// --- Reusable UI Components ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl ${className}`}>
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

const Definition = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-cyan-500/10 border-r-8 border-cyan-500 p-8 my-8 rounded-l-3xl shadow-2xl relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-cyan-500/5 to-transparent pointer-events-none" />
    <h4 className="text-cyan-300 font-black mb-3 text-2xl tracking-tight flex items-center gap-2">
      <Target className="w-6 h-6" />
      {title}
    </h4>
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
    <div className="w-full overflow-x-auto my-4 custom-scrollbar bg-black/40 rounded-3xl border border-white/10 shadow-inner p-10 transition-all group-hover:border-cyan-500/30 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]" dir="ltr">
      <div className="min-w-max flex items-center justify-center text-4xl font-bold text-cyan-300">
        <BlockMath math={children} />
      </div>
    </div>
  </div>
);

const TeacherNote = ({ children, title = "إعداد الأستاذ أحمد قاسم محمد" }: { children: React.ReactNode, title?: string }) => (
  <div className="bg-amber-500/10 border-2 border-dashed border-amber-500/30 p-8 rounded-3xl my-10 relative">
    <div className="absolute -top-5 right-10 px-6 py-2 bg-amber-500 rounded-full shadow-lg">
      <div className="flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-white" />
        <span className="text-white font-black text-sm">{title}</span>
      </div>
    </div>
    <div className="text-gray-200 text-xl leading-relaxed mt-4 italic font-medium">
      {children}
    </div>
  </div>
);

const ComparisonTable = ({ headers, rows, title }: { headers: string[], rows: any[][], title?: string }) => (
  <div className="my-12">
    {title && <h5 className="text-2xl font-black text-white mb-6 flex items-center gap-2"><Layers className="w-6 h-6 text-cyan-400" /> {title}</h5>}
    <div className="overflow-x-auto rounded-3xl border border-white/10 shadow-2xl bg-white/5 backdrop-blur-md">
      <table className="w-full text-right border-collapse">
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
                <td key={j} className="p-6 text-gray-200 text-lg">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SolvedExample = ({ title, question, solution }: { title: string, question: React.ReactNode, solution: React.ReactNode }) => (
  <div className="my-12 rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl">
    <div className="bg-emerald-500/20 p-6 border-b border-emerald-500/30">
      <h5 className="text-2xl font-black text-emerald-400 flex items-center gap-3">
        <Zap className="w-7 h-7" />
        {title}
      </h5>
    </div>
    <div className="p-8 bg-white/5 space-y-6">
      <div className="text-gray-200 text-xl leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/5">
        {question}
      </div>
      <div className="space-y-4">
        <h6 className="text-emerald-400 font-black text-lg flex items-center gap-2">
          <ChevronRight className="w-5 h-5" />
          الحل النموذجي:
        </h6>
        <div className="text-gray-300 text-xl leading-relaxed pr-6 border-r-2 border-emerald-500/30">
          {solution}
        </div>
      </div>
    </div>
  </div>
);

// --- Main Component ---

export default function Ch9_Organic_Chemistry() {
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
          الفصل التاسع
        </h1>
        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8">
          الكيمياء العضوية
        </h2>
        <div className="flex justify-center gap-4">
          <span className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 font-bold">
            إعداد الأستاذ أحمد قاسم محمد
          </span>
          <span className="px-6 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold">
            الكورس الثاني
          </span>
        </div>
      </motion.div>

      {/* القسم 9-1: الكربون والهيدروكربون */}
      <section id="carbon-intro">
        <SectionHeader title="القسم 9-1: الكربون والهيدروكربون" icon={Atom} />
        <GlassCard>
          <div className="space-y-8">
            <Definition title="وجود الكربون وأهميته">
              يوجد الكربون في الطبيعة إما كعنصر حر أو متحداً في المركبات، ويوجد في جميع الكائنات الحية وفي أنسجة الجسم وفي الغذاء وفي الوقود كالفحم والبترول والغاز الطبيعي والخشب.
            </Definition>

            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h4 className="text-2xl font-black text-cyan-400 mb-6">التركيب البنائي للكربون وروابطه</h4>
              <ul className="space-y-6 text-gray-200 text-xl">
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold shrink-0">1</span>
                  <p>للكربون خصائص لافلزية ولذراته في حالتها العادية الترتيب الإلكتروني: <InlineMath math="1\text{s}^2 2\text{s}^2 2\text{p}^2" />.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold shrink-0">2</span>
                  <p>لذرات الكربون ميل قوي إلى المشاركة في الإلكترونات التكافؤ (<InlineMath math="2\text{s}^2 2\text{p}^2" />) وتكوين روابط تساهمية.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold shrink-0">3</span>
                  <p>بالإمكان استخدام التهجين لتوضيح الطريقة التي تترابط فيها معظم مركبات الكربون.</p>
                </li>
              </ul>
            </div>

            <ComparisonTable 
              title="أنواع التهجين في الكربون"
              headers={["نوع التهجين", "الروابط", "الشكل الهندسي", "مثال"]}
              rows={[
                [
                  <InlineMath math="\text{SP}^3" />,
                  "تكون لذرات الكربون أربعة روابط أحادية (يوجد في مركبات المشبعة - ألكان)",
                  "ينتج عن ذلك الشكل رباعي الأوجه",
                  <div className="text-center"><InlineMath math="\text{CH}_4" /><br/><span className="text-sm text-gray-400">الميثان</span></div>
                ],
                [
                  <InlineMath math="\text{SP}^2" />,
                  "تكون لذرات الكربون روابط ثنائية (يوجد في مركبات الغير مشبعة - ألكين)",
                  "ينتج عن ذلك شكل ثلاثي الأبعاد",
                  <div className="text-center"><InlineMath math="\text{C}_2\text{H}_4" /><br/><span className="text-sm text-gray-400">الإيثيلين</span></div>
                ],
                [
                  <InlineMath math="\text{SP}" />,
                  "تكون ذرات الكربون روابط ثلاثية (يوجد في مركبات الغير مشبعة - ألكاين)",
                  "ينتج عن ذلك شكل خطي",
                  <div className="text-center"><InlineMath math="\text{C}_2\text{H}_2" /><br/><span className="text-sm text-gray-400">الأسيتيلين</span></div>
                ]
              ]}
            />
          </div>
        </GlassCard>
      </section>

      {/* الصور التأصلية للكربون */}
      <section id="allotropes">
        <SectionHeader title="الصور التأصلية للكربون" icon={Grid} />
        <GlassCard>
          <Definition title="التأصل">
            هي ظاهرة وجود بعض العناصر على عدة صور في الطبيعة تتشابه في خصائصها الكيميائية وتختلف في خصائصها الفيزيائية، ويظهر بصور صلبة تأصلية متعددة تتميز بخصائص مختلفة.
          </Definition>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-8 bg-gradient-to-b from-white/10 to-transparent rounded-3xl border border-white/10 text-center group hover:border-cyan-500/50 transition-all">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-cyan-400" />
              </div>
              <h5 className="text-2xl font-black text-white mb-4">الماس</h5>
              <p className="text-gray-400 text-lg">صورة صلبة بلورية عديمة اللون</p>
            </div>
            <div className="p-8 bg-gradient-to-b from-white/10 to-transparent rounded-3xl border border-white/10 text-center group hover:border-cyan-500/50 transition-all">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Layers className="w-8 h-8 text-cyan-400" />
              </div>
              <h5 className="text-2xl font-black text-white mb-4">الكرافيت</h5>
              <p className="text-gray-400 text-lg">مادة بلورية سوداء هشة ناعمة الملمس موصلة للكهرباء</p>
            </div>
            <div className="p-8 bg-gradient-to-b from-white/10 to-transparent rounded-3xl border border-white/10 text-center group hover:border-cyan-500/50 transition-all">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Hexagon className="w-8 h-8 text-cyan-400" />
              </div>
              <h5 className="text-2xl font-black text-white mb-4">الفوليرين</h5>
              <p className="text-gray-400 text-lg">مادة صلبة ذو لون داكن مكونة من ذرات كربون مرتبة بشكل قفص كروية</p>
            </div>
          </div>

          <ComparisonTable 
            title="مقارنة بين صور الكربون التأصلية"
            headers={["الخاصية", "الماس", "الجرافيت", "الفوليرين"]}
            rows={[
              ["الحالة", "مادة صلبة معروفة", "يمتاز بنعومته وهشاشته ويكون انزلاقياً", "يتكون خلال احتراق المواد المحتوية على الكربون مع كمية محددة من الأكسجين"],
              ["الكثافة", "له كثافة عالية (تفوق كثافة الماء بـ 3.5 مرات)", "يتصف بكثافة أقل من الماس", "يتألف من ذرات تشكل أقفاصاً شبه كروية وأكثر الأشكال استقراراً هو C60"],
              ["المسافة بين الذرات", "154 pm", "335 pm بين الطبقات و 142 pm داخل الطبقة", "142 pm وتسمى بالكرة الباكي"],
              ["درجة الانصهار", "أكثر من 3500 °C", "3652 °C", "عالية جداً"],
              ["الترابط", "مرتبطة تساهمياً بشكل شبكة، ترتبط كل ذرة بـ 4 ذرات بشكل رباعي الأوجه", "تترتب بشكل حلقات سداسية، ترتبط كل ذرة بـ 3 ذرات داخل الطبقة", "بسبب التركيب البنائي للإلكترونات الغير متموضعة"],
              ["التوصيل الكهربائي", "لا يوصل الكهرباء (انشغال كافة إلكترونات التكافؤ)", "يوصل الكهرباء (لوجود إلكترونات غير متموضعة)", "-"],
              ["التوصيل الحراري", "قدرة عالية جداً (تفوق الفضة أو النحاس بـ 5 أضعاف)", "تترتب الذرات بشكل صفائح رقيقة سداسية", "-"],
              ["الاستخدام", "قطع المعادن والمواد الصلبة والحفر", "التشحيم وصناعة أقلام الرصاص وألياف الكرافيت وهياكل الطائرات", "-"]
            ]}
          />
        </GlassCard>
      </section>

      {/* القسم 9-2: المركبات العضوية */}
      <section id="organic-compounds">
        <SectionHeader title="القسم 9-2: المركبات العضوية" icon={FlaskConical} />
        <GlassCard>
          <Definition title="تعريف المركبات العضوية">
            هي مركبات تحتوي على الكربون ومرتبط تساهمياً مع العناصر الأخرى ذات السالبية الكهربائية مشابهة ماعدا الكربونات مثل <InlineMath math="\text{Na}_2\text{CO}_3" /> وأكاسيد الكربون مثل <InlineMath math="\text{CO}" /> و <InlineMath math="\text{CO}_2" />.
          </Definition>

          <div className="space-y-10 mt-12">
            <h4 className="text-3xl font-black text-white border-r-4 border-cyan-500 pr-6">الخصائص التي تساهم في تنوع المركبات العضوية</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <h5 className="text-2xl font-black text-cyan-400 mb-4">1. رابطة كربون – كربون</h5>
                <ul className="space-y-4 text-gray-300 text-lg">
                  <li>أ / لذرات الكربون قدرة على تكوين سلاسل طويلة من الذرات المترابطة بروابط تساهمية تسمى <span className="text-white font-bold">بالترابط التسلسلي</span>.</li>
                  <li>ب / تستطيع ذرات الكربون أن ترتبط مع بعضها البعض بواسطة رابطة تساهمية أحادية أو ثنائية أو ثلاثية.</li>
                </ul>
              </div>
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <h5 className="text-2xl font-black text-cyan-400 mb-4">2. الارتباط بالعناصر الأخرى</h5>
                <p className="text-gray-300 text-lg leading-relaxed">
                  ترتبط ذرات الكربون بسهولة مع ذرات عناصر ذات السالبية كهربائية مشابهة لتكوين المركبات العضوية.
                </p>
              </div>
            </div>

            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h5 className="text-2xl font-black text-cyan-400 mb-4">3. ترتيب الذرات</h5>
              <p className="text-gray-300 text-lg leading-relaxed">
                ترتبط ذرات الكربون بمثيلاتها وببقية العناصر بترتيبات مختلفة وهذا يعني أن المركبات قد تحتوي على ذرات نفسها لكن بخصائص مختلفة.
              </p>
              <TeacherNote>
                مثال: تمثل الصيغة الجزيئية <InlineMath math="\text{C}_2\text{H}_6\text{O}" /> كلاً من الإيثانول وثنائي مثيل إيثر بينما يختلف المركبان في التركيب البنائي وتسمى المركبات المتشابهة في صيغتها الجزيئية ومختلفة في تراكيبها البنائية <span className="text-amber-400 font-bold">بالأيزومرات</span>.
              </TeacherNote>
            </div>

            <ComparisonTable 
              title="أنواع الصيغ الكيميائية"
              headers={["الصيغة الجزيئية", "الصيغ البنائية (التركيبية)"]}
              rows={[
                [
                  "تعطي نسبة ذرات الموجودة في مركب ونوعها ولا تشير إلى ترتيبها.",
                  "هي الصيغ التي تحدد عدد الذرات الموجودة في الجزيء ونوعها وترتيب الذرات المترابط فيه."
                ],
                [
                  <div className="text-center font-bold text-2xl"><InlineMath math="\text{C}_4\text{H}_{10}" /></div>,
                  <div className="space-y-4">
                    <div className="p-4 bg-black/20 rounded-xl">
                      <span className="text-cyan-400 block mb-2">أ/ المختصرة:</span>
                      <InlineMath math="\text{CH}_3-\text{CH}_2-\text{CH}_2-\text{CH}_3" />
                    </div>
                    <div className="p-4 bg-black/20 rounded-xl overflow-x-auto custom-scrollbar">
                      <span className="text-cyan-400 block mb-2">ب/ الغير مختصرة:</span>
                      <div dir="ltr" className="text-center min-w-max px-4">
                        <BlockMath math={`
                          \\begin{array}{c}
                          \\text{H} \\ \\ \\text{H} \\ \\ \\text{H} \\ \\ \\text{H} \\\\
                          | \\ \\ | \\ \\ | \\ \\ | \\\\
                          \\text{H}-\\text{C}-\\text{C}-\\text{C}-\\text{C}-\\text{H} \\\\
                          | \\ \\ | \\ \\ | \\ \\ | \\\\
                          \\text{H} \\ \\ \\text{H} \\ \\ \\text{H} \\ \\ \\text{H}
                          \\end{array}
                        `} />
                      </div>
                    </div>
                  </div>
                ]
              ]}
            />
          </div>
        </GlassCard>
      </section>

      {/* الهيدروكربونات */}
      <section id="hydrocarbons">
        <SectionHeader title="الهيدروكربونات (Hydrocarbons)" icon={Flame} />
        <GlassCard>
          <div className="space-y-10">
            <div className="p-8 bg-cyan-500/10 rounded-3xl border border-cyan-500/20">
              <h4 className="text-2xl font-black text-cyan-400 mb-4">تصنيف الهيدروكربونات</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
                  <h5 className="text-xl font-bold text-white mb-2">المشبعة</h5>
                  <p className="text-cyan-400">الألكانات</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
                  <h5 className="text-xl font-bold text-white mb-2">غير المشبعة</h5>
                  <p className="text-cyan-400">الألكينات والألكاينات</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
                  <h5 className="text-xl font-bold text-white mb-2">الأروماتية</h5>
                  <p className="text-cyan-400">العطرية (البنزين)</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-3xl font-black text-white">أولاً: الهيدروكربونات المشبعة (الألكانات)</h4>
              <p className="text-xl text-gray-300 leading-relaxed">
                هي الهيدروكربونات التي ترتبط فيها كل ذرة كربون في الجزيء بأربعة روابط تساهمية أحادية مع ذرات أخرى.
              </p>
              <FormulaBox label="الصيغة العامة للألكانات">
                {"\text{C}_n\text{H}_{2n+2}"}
              </FormulaBox>
              <TeacherNote>
                ملاحظة: الآصرة بين الهيدروجين والكربون تكون <span className="text-amber-400 font-bold">غير قطبية</span>. بزيادة عدد ذرات الكربون تقل نسبة الهيدروجين في المركب.
              </TeacherNote>
            </div>

            <ComparisonTable 
              title="جدول الألكانات العشرة الأولى"
              headers={["عدد ذرات الكربون", "الاسم بالعربية", "الصيغة الجزيئية", "الصيغة البنائية المختصرة"]}
              rows={[
                ["1", "ميثان", <InlineMath math="\text{CH}_4" />, <InlineMath math="\text{CH}_4" />],
                ["2", "إيثان", <InlineMath math="\text{C}_2\text{H}_6" />, <InlineMath math="\text{CH}_3\text{CH}_3" />],
                ["3", "بروبان", <InlineMath math="\text{C}_3\text{H}_8" />, <InlineMath math="\text{CH}_3\text{CH}_2\text{CH}_3" />],
                ["4", "بيوتان", <InlineMath math="\text{C}_4\text{H}_{10}" />, <InlineMath math="\text{CH}_3\text{CH}_2\text{CH}_2\text{CH}_3" />],
                ["5", "بنتان", <InlineMath math="\text{C}_5\text{H}_{12}" />, <InlineMath math="\text{CH}_3(\text{CH}_2)_3\text{CH}_3" />],
                ["6", "هكسان", <InlineMath math="\text{C}_6\text{H}_{14}" />, <InlineMath math="\text{CH}_3(\text{CH}_2)_4\text{CH}_3" />],
                ["7", "هبتان", <InlineMath math="\text{C}_7\text{H}_{16}" />, <InlineMath math="\text{CH}_3(\text{CH}_2)_5\text{CH}_3" />],
                ["8", "أوكتان", <InlineMath math="\text{C}_8\text{H}_{18}" />, <InlineMath math="\text{CH}_3(\text{CH}_2)_6\text{CH}_3" />],
                ["9", "نونان", <InlineMath math="\text{C}_9\text{H}_{20}" />, <InlineMath math="\text{CH}_3(\text{CH}_2)_7\text{CH}_3" />],
                ["10", "ديكان", <InlineMath math="\text{C}_{10}\text{H}_{22}" />, <InlineMath math="\text{CH}_3(\text{CH}_2)_8\text{CH}_3" />]
              ]}
            />

            <TeacherNote>
              ملاحظة من الجدول:
              <br/>
              1/ يعتمد التسمية على عدد ذرات الكربون.
              <br/>
              2/ <InlineMath math="\text{C}_1" /> إلى <InlineMath math="\text{C}_3" /> ليس له أيزومرات بسبب احتوائه على صيغة بنائية واحدة.
              <br/>
              3/ <InlineMath math="\text{C}_4" /> فما فوق له أيزومرات بسبب احتوائه على أكثر من صيغة بنائية واحدة.
            </TeacherNote>
          </div>
        </GlassCard>
      </section>

      {/* مجاميع الألكيل وتسمية الألكانات */}
      <section id="alkyl-nomenclature">
        <SectionHeader title="مجاميع الألكيل وتسمية الألكانات" icon={BookOpen} />
        <GlassCard>
          <div className="space-y-10">
            <Definition title="مجاميع الألكيل (شق الألكيل)">
              هو ألكان فقد ذرة هيدروجين واحدة ورمزه العام <InlineMath math="\text{R}" />. ويتم التسمية باستبدال المقطع (ان) في الألكان بالمقطع (يل).
            </Definition>

            <ComparisonTable 
              headers={["الكان", "الاسم", "الصيغة", "الكيل", "الاسم", "الصيغة"]}
              rows={[
                ["ميثان", <InlineMath math="\text{CH}_4" />, "", "ميثيل", <InlineMath math="-\text{CH}_3" />, ""],
                ["ايثان", <InlineMath math="\text{CH}_3-\text{CH}_3" />, "", "ايثيل", <InlineMath math="-\text{CH}_3-\text{CH}_2" />, ""],
                ["بروبان", <InlineMath math="\text{CH}_3-\text{CH}_2-\text{CH}_3" />, "", "بروبيل", <InlineMath math="-\text{CH}_3-\text{CH}_2-\text{CH}_2" />, ""],
                ["بيوتان", <InlineMath math="\text{CH}_3-\text{CH}_2-\text{CH}_2-\text{CH}_3" />, "", "بيوتيل", <InlineMath math="-\text{CH}_3-\text{CH}_2-\text{CH}_2-\text{CH}_2" />, ""],
                ["بنتان", <InlineMath math="\text{CH}_3-\text{CH}_2-\text{CH}_2-\text{CH}_2-\text{CH}_3" />, "", "بنتيل", <InlineMath math="-\text{CH}_3-\text{CH}_2-\text{CH}_2-\text{CH}_2-\text{CH}_2" />, ""]
              ]}
            />

            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h4 className="text-2xl font-black text-cyan-400 mb-6">قواعد تسمية الألكانات (نظام الإيوباك)</h4>
              <ul className="space-y-6 text-gray-200 text-xl">
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold shrink-0">1</span>
                  <p>تحديد أطول سلسلة متصلة لذرات الكربون.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold shrink-0">2</span>
                  <p>ترقيم الذرات بداية من أحد الأطراف حتى الطرف الآخر، على أن يكون طرف البداية هو <span className="text-white font-bold">الأقرب لمجموعات التفرع</span> في حالة وجودها.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold shrink-0">3</span>
                  <p>تحديد المجموعات المتصلة بالسلسلة بالترتيب وبداية كتابة اسم الألكان كالتالي:</p>
                </li>
              </ul>
              <div className="pr-12 mt-6 space-y-4 text-gray-300 text-lg">
                <p>أ/ رقم ذرة الكربون المتصلة بمجموعات فرعية، وفي حالة وجود أكثر من تفرع يتم كتابة أرقام التفرع بترتيب الترقيم في السلسلة الرئيسية.</p>
                <p>ب/ في حالة وجود اتصال لنفس المجموعة أكثر من مرة بسلسلة الألكان، نستخدم البادئات التالية طبقاً لعدد مرات التكرار: <span className="text-cyan-400 font-bold">"ثنائي"، "ثلاثي"، "رباعي"</span>، وهكذا.</p>
                <p>ج/ وأيضاً يكون الترقيم من جهة الأكثر تفرعاً في السلسلة.</p>
                <p>د/ أما إذا كان مجموعة المرتبطة غير متشابهة (مختلفة في مجموعة الألكيل) فيكون التسمية حسب الأبجدية الإنكليزية والترقيم يبدأ من أقرب تفرع.</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* الألكانات الحلقية */}
      <section id="cyclic-alkanes">
        <SectionHeader title="ثانياً: الألكانات الحلقية" icon={Hexagon} />
        <GlassCard>
          <div className="space-y-8">
            <p className="text-xl text-gray-300 leading-relaxed">
              ألكانات تترتب فيها ذرات الكربون على شكل حلقة وصيغتها العامة <InlineMath math="\text{C}_n\text{H}_{2n}" />. وتكون مشبعة.
            </p>
            <ul className="space-y-4 text-gray-200 text-xl">
              <li>• <InlineMath math="\text{n}" /> تبدأ من رقم (3, 4, 5, ...).</li>
              <li>• أبسط أنواعها هو بروبان حلقي.</li>
              <li>• تهجينه <InlineMath math="\text{SP}^3" /> رباعي الأوجه.</li>
            </ul>

            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h4 className="text-2xl font-black text-cyan-400 mb-6">تسمية الكانات الحلقية</h4>
              <ul className="space-y-6 text-gray-200 text-xl">
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold shrink-0">1</span>
                  <p>يتم إضافة كلمة <span className="text-white font-bold">الحلقي</span> إلى اسم ألكان الحلقة المغلقة.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold shrink-0">2</span>
                  <p>إذا وجدت مجموعتا ألكيل مرتبطتان بالحلقة، فيكون ترقيم ذرات الكربون في الحلقة وذلك بوضع الرقم 1 لموقع مجموعة الألكيل التي تأتي أولاً بحسب الأبجدية الإنكليزية ثم رقم في الاتجاه الذي يعطي لمجموعة الألكيل الثانية أصغر رقم ممكن.</p>
                </li>
              </ul>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* خصائص الكانات واستخداماتها */}
      <section id="alkane-uses">
        <SectionHeader title="خصائص الكانات واستخداماتها" icon={Flame} />
        <GlassCard>
          <div className="space-y-10">
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h4 className="text-2xl font-black text-cyan-400 mb-6">الخصائص الفيزيائية</h4>
              <ul className="space-y-6 text-gray-200 text-xl">
                <li>1/ كلما قلت الكتلة الجزيئية للكان سوف يكون في حالة الغازية كما في المركبات الأربعة الأولى؛ وذلك بسبب ضعف قوى تشتت لندن بين جزيئاتها.</li>
                <li>2/ الكانات المحتوية على عدد ذرات الكربون من 5-10 تكون في حالة السائلة وإذا ازدادت عن ذلك فتكون في حالة الصلبة.</li>
                <li>3/ كلما زاد الكتلة الجزيئية للكان ترتفع درجة غليانه؛ لأن قوة تشتت لندن تزداد بزيادة الكتلة الجزيئية.</li>
                <li>4/ بزيادة التفرع في الكانات تنخفض درجة الغليان؛ لأن زيادة التفرع تقلل من المساحة السطحية للمركب وتقل قوى تشتت لندن.</li>
              </ul>
              <TeacherNote>
                مثال: درجة غليان البنتان أكبر من مثيل بيوتان وهذا أقل من 2,2-ثنائي مثيل بروبان.
              </TeacherNote>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <h5 className="text-2xl font-black text-cyan-400 mb-4">استخدامات الكانات</h5>
                <ul className="space-y-4 text-gray-300 text-lg">
                  <li>• يستخدم الكانات كوقود.</li>
                  <li>• غاز طبيعي: وقود احفوري يتكون اساسا من هيدروكربونات يحتوي على ذرة واحدة الى اربع ذرات كربون.</li>
                  <li>• البترول: مزيج معقد من الهيدروكربونات مختلفة تتباين في مكوناتها.</li>
                  <li>• شمع البارافين: هو الكان صلب جزيئته تحتوي على 26 الى 30 ذرة كربون في شموع الإضاءة.</li>
                </ul>
              </div>
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <h5 className="text-2xl font-black text-cyan-400 mb-4">رقم الأوكتان</h5>
                <p className="text-gray-300 text-lg leading-relaxed">
                  هو من المؤشرات الدالة على جودة الوقود ويعد مقياساً لكفاءة احتراق الوقود وخصائص الخليط فيه.
                </p>
                <ComparisonTable 
                  headers={["وقود جيد", "وقود رديء (غير جيد)"]}
                  rows={[
                    ["4,2,2 - ثلاثي مثيل بنتان (أيزو أوكتان)", "هبتان (المستقيم السلسلة)"],
                    ["الوقود يسهل احتراقه داخل مكائن السيارات", "يصعب احتراقه"],
                    ["يحدث قرقعة قليلة", "يحدث قرقعة عالية في مكائن السيارات"],
                    ["ذو رقم أوكتان 100", "رقم أوكتان 0"]
                  ]}
                />
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* الهيدروكربونات الأروماتية */}
      <section id="aromatic-hydrocarbons">
        <SectionHeader title="ثالثاً: الهيدروكربونات الأروماتية (العطرية)" icon={CircleDot} />
        <GlassCard>
          <div className="space-y-10">
            <Definition title="تعريف الهيدروكربونات الأروماتية">
              هيدروكربونات تحتوي على حلقة أو اكثر مكونة من ست ذرات كربون وإلكترونات غير متموضعة. الهيدروكربون الأروماتي الأول هو: <span className="text-white font-bold">البنزين</span>.
            </Definition>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <h5 className="text-2xl font-black text-cyan-400 mb-4">البنزين (Benzene)</h5>
                <ul className="space-y-4 text-gray-300 text-lg">
                  <li>• صيغته الجزيئية: <InlineMath math="\text{C}_6\text{H}_6" />.</li>
                  <li>• له ست ذرات كاربون وثلاث روابط ثنائية.</li>
                  <li>• تهجينه <InlineMath math="\text{SP}^2" /> بسبب احتوائه على روابط ثنائية.</li>
                  <li>• التركيب البنائي للبنزين يسمح للإلكترونات غير المتموضعة تنتشر خلال أفلاك P على امتداد كامل للحلقة مما يعطي استقرارية للبنزين.</li>
                </ul>
              </div>
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <h5 className="text-2xl font-black text-cyan-400 mb-4">خصائصها واستخداماتها</h5>
                <ul className="space-y-4 text-gray-300 text-lg">
                  <li>1/ للهيدروكربونات الأروماتية نشاطية أقل من الألكينات والألكاينات لكون حلقة البنزين مستقرة تماماً بسبب الإلكترونات غير المتموضعة.</li>
                  <li>2/ بسبب استقرار البنزين استخدم البنزين في الماضي كمذيب غير قطبي.</li>
                  <li>3/ يكون البنزين غير قطبي وشحيح الذوبان في الماء.</li>
                </ul>
              </div>
            </div>

            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h4 className="text-2xl font-black text-cyan-400 mb-6">تسمية الهيدروكربونات الأروماتية</h4>
              <ul className="space-y-6 text-gray-200 text-xl">
                <li>1/ عند وجود مجموعتي ألكيل: أعط الرقم 1 لموقع مجموعة الألكيل التي تأتي أولاً في الترتيب الأبجدي الإنكليزي ثم رقم في الاتجاه الذي يعطي مجموعة الألكيل الثانية أصغر رقم ممكن.</li>
                <li>2/ عند وجود عدة مجموعات ألكيل: رقم لإعطائها أصغر رقم ممكن.</li>
                <li>3/ أضف اسم مجموعات الألكيل وأرقام المواقع والفواصل والشرطات.</li>
              </ul>
              <TeacherNote>
                أمثلة شائعة:
                <br/>
                • ميثيل بنزين (التولوين)
                <br/>
                • إيثيل بنزين
                <br/>
                • بروبيل بنزين
              </TeacherNote>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* الهيدروكربونات غير المشبعة */}
      <section id="unsaturated-hydrocarbons">
        <SectionHeader title="الهيدروكربونات غير المشبعة" icon={Activity} />
        <GlassCard>
          <div className="space-y-12">
            <p className="text-xl text-gray-300 leading-relaxed">
              هيدروكربونات لا تحتوي جميع ذرات كربون فيها على أربع روابط تساهمية أحادية.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-cyan-500/10 rounded-3xl border border-cyan-500/20">
                <h4 className="text-2xl font-black text-cyan-400 mb-4">رابعاً: الألكينات (Alkenes)</h4>
                <p className="text-gray-300 text-lg mb-6">هي الهيدروكربونات التي تحتوي على روابط تساهمية ثنائية.</p>
                <ul className="space-y-4 text-gray-200 text-xl">
                  <li>• أبسط الألكينات هو: <span className="text-white font-bold">الإيثين</span>.</li>
                  <li>• الصيغة العامة: <InlineMath math="\text{C}_n\text{H}_{2n}" />.</li>
                  <li>• الألكين يقل بـ ذرتي هيدروجين عن الألكان.</li>
                </ul>
                <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h5 className="text-xl font-bold text-white mb-4">تسمية الألكينات:</h5>
                  <p className="text-gray-300 text-lg leading-relaxed">1/ يتم اختيار أطول سلسلة هيدروكربونية تحتوي على الرابطة الزوجية وتعطي الاسم الأساسي للألكان المقابل مع استبدال المقطع (ان) بالمقطع (ين).</p>
                  <p className="text-gray-300 text-lg mt-4 leading-relaxed">2/ ترقم السلسلة من أقرب كربون طرفية للرابطة الزوجية ويتم تحديد موقع الرابطة الزوجية بكتابة رقم أول ذرة كربون مكونة لها.</p>
                </div>
              </div>

              <div className="p-8 bg-purple-500/10 rounded-3xl border border-purple-500/20">
                <h4 className="text-2xl font-black text-purple-400 mb-4">خامساً: الألكاينات (Alkynes)</h4>
                <p className="text-gray-300 text-lg mb-6">هي الهيدروكربونات التي تحتوي على روابط تساهمية ثلاثية.</p>
                <ul className="space-y-4 text-gray-200 text-xl">
                  <li>• أبسط الألكاينات هو: <span className="text-white font-bold">الإيثاين</span>.</li>
                  <li>• الصيغة العامة: <InlineMath math="\text{C}_n\text{H}_{2n-2}" />.</li>
                  <li>• الألكاين يقل بـ ذرتي هيدروجين عن الألكين ويقل بأربعة ذرات هيدروجين عن الألكان.</li>
                </ul>
                <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h5 className="text-xl font-bold text-white mb-4">تسمية الألكاينات:</h5>
                  <p className="text-gray-300 text-lg leading-relaxed">تشبه طريقة تسمية الألكينات والفرق الوحيد يكتب المقطع (اين) محل المقطع (ين).</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h4 className="text-2xl font-black text-cyan-400 mb-6">خصائص الألكينات واستخداماتها</h4>
              <ul className="space-y-4 text-gray-300 text-lg">
                <li>1/ الألكينات مواد غير قطبية وخصائصها تكون مشابهة للألكانات من حيث درجة الغليان والحالات الفيزيائية.</li>
                <li>2/ <span className="text-white font-bold">الفا – فارنيسين:</span> مركب كيني يتكون من 15 ذرة كربون واربع روابط ثنائية ويوجد في الشمع الطبيعي المغلف لثمرة التفاح.</li>
                <li>3/ يستخدم الإيثين (الإيثيلين) في تصنيع أنواع من البلاستيك والكحول التجاري.</li>
                <li>4/ يعد الإيثين هرموناً نباتياً مهماً يحفز تزهير وإنضاج الفواكه.</li>
              </ul>
            </div>

            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h4 className="text-2xl font-black text-cyan-400 mb-6">خصائص الألكاينات واستخداماتها</h4>
              <ul className="space-y-4 text-gray-300 text-lg">
                <li>1/ الألكاينات مواد عضوية غير قطبية لها ميل نفسه في درجات الغليان والحالات الفيزيائية مثل بقية الهيدروكربونات.</li>
                <li>2/ عند مزج غاز الإيثاين (استلين) مع غاز الأوكسجين تتكون شعلة (أوكسي – استلين) تصدر حرارة عالية وتستخدم في عمليات اللحام.</li>
              </ul>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* الأيزومرات */}
      <section id="isomers-section">
        <SectionHeader title="الأيزومرات (Isomers)" icon={Layers} />
        <GlassCard>
          <div className="space-y-10">
            <Definition title="تعريف الأيزومرات">
              هي مركبات متشابهة في صيغتها الجزيئية ومختلفة في صيغتها البنائية (التركيبية).
            </Definition>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <h5 className="text-2xl font-black text-cyan-400 mb-4">1/ الأيزومرات البنائية</h5>
                <p className="text-gray-300 text-lg leading-relaxed">
                  هي الأيزومرات التي تترابط الذرات فيها بترتيب مختلف.
                </p>
                <p className="text-gray-400 mt-4">شروطه: كل مركبات العضوية لها أيزومرات بنائية عدا كربون رقم 1-3 (يبدأ من كربون 4 فما فوق).</p>
              </div>
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <h5 className="text-2xl font-black text-cyan-400 mb-4">2/ الأيزومرات الهندسية</h5>
                <p className="text-gray-300 text-lg leading-relaxed">
                  هي أيزومرات التي يتشابه فيها ترتيب الروابط بين الذرات ويختلف فيها ترتيب الذرات في الفراغ أو الفضاء. (Cis مع، Trans ضد).
                </p>
                <p className="text-gray-400 mt-4">شروطه: 1/ وجود ذرتي كربون في تركيب ثابت أي بينهما اصرة مزدوجة. 2/ ترتبط كل منها بمجموعتين مختلفتين.</p>
              </div>
            </div>

            <TeacherNote>
              ملاحظة هامة:
              <br/>
              • الألكان: لا يكون أيزومر هندسي بسبب احتوائه على أواصر منفردة والتي تسمح بالحركة الدورانية للمجموعات ضمن الجزيئة.
              <br/>
              • الألكاين: لا يكون أيزومر هندسي بسبب احتوائه على اصرة ثلاثية حيث كاربوني الآصرة الثلاثية يكونان مربوطين بمجموعة واحدة فقط.
              <br/>
              • الألكين: يكون أيزومر هندسي بسبب احتوائه على اواصر مزدوجة التي تمنع حركة دوران الحر مما يثبت المجموعات على جانبي الجزيئة.
            </TeacherNote>
          </div>
        </GlassCard>
      </section>

      <p className="text-center text-gray-500 font-bold py-10">تم بحمد الله الانتهاء من الفصل التاسع: الكيمياء العضوية.</p>
    </div>
  );
}
