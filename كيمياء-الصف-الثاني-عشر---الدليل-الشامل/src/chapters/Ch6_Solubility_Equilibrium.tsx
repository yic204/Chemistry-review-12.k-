import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { 
  Scale, 
  Droplets, 
  RefreshCw, 
  ArrowRightLeft, 
  Thermometer, 
  Wind, 
  FlaskConical, 
  Info,
  AlertTriangle,
  Layers,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Calculator,
  Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import 'katex/dist/katex.min.css';

// --- Reusable UI Components ---

const GlassCard = ({ children, title, page }: { children: React.ReactNode, title?: string, page?: string | number }) => (
  <div className="p-6 md:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl my-10 relative overflow-hidden break-words w-full">
    {page && (
      <div className="absolute top-0 left-0 px-3 py-2 bg-cyan-500/20 border-b border-r border-cyan-500/30 rounded-br-xl text-cyan-400 text-[10px] font-black tracking-widest z-10">
        الصفحة {page}
      </div>
    )}
    {title && (
      <h4 className="text-2xl md:text-3xl font-black text-white mb-8 border-r-4 border-cyan-500 pr-4 italic leading-normal mt-6">
        {title}
      </h4>
    )}
    <div className="text-base md:text-lg leading-relaxed whitespace-normal w-full overflow-x-hidden">
      {children}
    </div>
  </div>
);

const SectionHeader = ({ title, icon: Icon }: { title: string, icon: any }) => (
  <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-5 mt-12">
    <div className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30">
      {Icon && <Icon className="w-8 h-8 text-cyan-400" />}
    </div>
    <h3 className="text-3xl font-black text-white tracking-tight">{title}</h3>
  </div>
);

const Definition = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-cyan-500/10 border-r-4 border-cyan-500 p-6 my-6 rounded-l-2xl shadow-lg break-words whitespace-normal">
    <h4 className="text-cyan-300 font-black mb-2 text-2xl tracking-tight">{title}</h4>
    <div className="text-gray-200 leading-relaxed text-xl">{children}</div>
  </div>
);

const FormulaBox = ({ children, label, page }: { children: string, label?: string, page?: string | number }) => (
  <div className="my-10 relative group w-full" dir="ltr">
    {page && (
      <div className="absolute -top-3 -left-3 px-2 py-1 bg-white/10 border border-white/20 rounded text-[10px] text-gray-400 font-mono z-10">
        PAGE {page}
      </div>
    )}
    {label && (
      <div className="flex items-center justify-end gap-2 mb-4" dir="rtl">
        <Calculator className="w-4 h-4 md:w-5 md:h-5 text-cyan-500" />
        <span className="text-xs md:text-sm font-black text-cyan-500 uppercase tracking-[0.2em] md:tracking-[0.3em]">{label}</span>
      </div>
    )}
    <div className="w-full overflow-x-auto custom-scrollbar bg-black/80 rounded-3xl border border-white/10 p-6 md:p-10 transition-all group-hover:border-cyan-500/50 shadow-2xl">
      <div className="min-w-max flex items-center justify-center text-xl md:text-3xl lg:text-4xl font-bold text-cyan-300 py-4">
        <BlockMath math={children} />
      </div>
    </div>
  </div>
);

const TeacherNote = ({ children, page }: { children: React.ReactNode, page?: string | number }) => (
  <div className="p-6 md:p-8 pt-16 rounded-3xl bg-yellow-500/10 border border-yellow-500/30 my-10 relative overflow-hidden break-words w-full">
    {page && (
      <div className="absolute top-0 left-0 p-2 bg-yellow-500 text-black font-black text-[10px] rounded-br-xl z-10">
        P.{page}
      </div>
    )}
    <div className="absolute top-0 right-0 p-2 md:p-3 bg-yellow-500 text-black font-black text-[10px] md:text-xs uppercase tracking-tighter rounded-bl-xl shadow-lg z-10">
      ملاحظة الأستاذ أحمد قاسم
    </div>
    <div className="flex gap-4 items-start font-medium italic text-gray-200 text-lg md:text-xl leading-relaxed whitespace-normal w-full">
      <Lightbulb className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 shrink-0 animate-pulse mt-1" />
      <div className="w-full overflow-x-hidden">{children}</div>
    </div>
  </div>
);

const SolvedExample = ({ question, solution }: { question: string | React.ReactNode, solution: React.ReactNode }) => (
  <div className="my-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-white/5">
    <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6">
      <div className="flex items-center gap-3 text-white">
        <HelpCircle className="w-6 h-6" />
        <h4 className="text-xl font-bold">مثال محلول</h4>
      </div>
      <div className="mt-4 text-white text-xl leading-relaxed font-medium">
        {question}
      </div>
    </div>
    <div className="p-8 bg-black/40 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-cyan-400 mb-4 font-bold">
        <CheckCircle2 className="w-5 h-5" />
        <span>الحل النموذجي:</span>
      </div>
      <div className="text-gray-200">
        {solution}
      </div>
    </div>
  </div>
);

// --- Main Component ---

export default function Ch6_Solubility_Equilibrium() {
  return (
    <div className="max-w-5xl mx-auto space-y-16 pb-20 px-4" dir="rtl">
      
      {/* Cover Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20 border-b border-white/10"
      >
        <h1 className="text-6xl font-black text-white mb-4 tracking-tighter">كيمياء 12</h1>
        <h2 className="text-4xl font-bold text-cyan-400 mb-8">الكورس الثاني</h2>
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <p className="text-xl">إعداد الأستاذ: أحمد قاسم محمد</p>
          <p className="text-lg tracking-widest uppercase">يوسف صباح</p>
          <p className="text-sm border border-white/20 px-4 py-1 rounded-full mt-4">Version 5.0.0 | 2025</p>
        </div>
      </motion.div>

      {/* القسم 6-1: الاتزان الكيميائي */}
      <section id="equilibrium-intro">
        <SectionHeader title="القسم 6-1: الاتزان الكيميائي" icon={RefreshCw} />
        <GlassCard>
          <p className="text-2xl text-gray-300 leading-relaxed mb-10 break-words whitespace-normal">
            تنقسم التفاعلات من حيث المسار (الألأتجاه) الى قسمين:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* التفاعلات غير الانعكاسية */}
            <div className="relative p-8 rounded-3xl bg-red-500/5 border border-red-500/20 group hover:bg-red-500/10 transition-all duration-500">
              <div className="absolute -top-4 right-8 px-4 py-1 bg-red-500 text-white text-sm font-bold rounded-full">تفاعلات تامة</div>
              <h4 className="text-3xl font-black text-red-400 mb-6 flex items-center gap-3">
                التفاعلات الغير انعكاسية <span dir="ltr text-xl">( → )</span>
              </h4>
              <ul className="space-y-4 text-gray-300 text-xl">
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold">1/</span>
                  <span>تستهلك فيه احدى مواد المتفاعلة أو كلاهما بصورة كلية ( تامة ).</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold">2/</span>
                  <span>تتوقف بعد مرور فترة زمنية معينة.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold">3/</span>
                  <span>ليست لها حالة توازن كيميائي.</span>
                </li>
              </ul>
              <div className="mt-8 p-4 bg-black/40 rounded-xl border border-red-500/30 text-center" dir="ltr">
                <InlineMath math="\text{HCl} + \text{NaOH} \longrightarrow \text{NaCl} + \text{H}_2\text{O}" />
              </div>
            </div>

            {/* التفاعلات الانعكاسية */}
            <div className="relative p-8 rounded-3xl bg-green-500/5 border border-green-500/20 group hover:bg-green-500/10 transition-all duration-500">
              <div className="absolute -top-4 right-8 px-4 py-1 bg-green-500 text-white text-sm font-bold rounded-full">تفاعلات غير تامة</div>
              <h4 className="text-3xl font-black text-green-400 mb-6 flex items-center gap-3">
                التفاعلات الانعكاسية <span dir="ltr text-xl">( ⇌ )</span>
              </h4>
              <ul className="space-y-4 text-gray-300 text-xl">
                <li className="flex gap-3">
                  <span className="text-green-500 font-bold">1/</span>
                  <span>الاستهلاك جزئي للمواد المتفاعلة و تبدأ سرعتها بالتباطؤ تدريجيا الى أن تصل الى حالة تتساوى فيها سرعتي المسارين الامامي والعكسي وتثبت فيها كميات المواد المتفاعلة والناتجة المتبقية وتسمى بـ ( الاتزان الكيميائي ).</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-500 font-bold">2/</span>
                  <span>التفاعل تكون مستمر ولاتتوقف.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-500 font-bold">3/</span>
                  <span>لها حالة توزان كيميائي. لها ثابت يسمى ثابت الأتزان الكيميائي يرمز بـ K.</span>
                </li>
              </ul>
              <div className="mt-8 p-4 bg-black/40 rounded-xl border border-green-500/30 text-center" dir="ltr">
                <InlineMath math="2\text{HgO}\text{(s)} \rightleftharpoons 2\text{Hg}\text{(l)} + \text{O}_2\text{(g)}" />
              </div>
            </div>
          </div>

          <Definition title="الألأتزان الكيميائي 1/">
            حالة توازن ديناميكي ( حركية ) تتساوى فيها سرعتي المسارين الأمامي والعكسي وتثبت فيها كميات المواد المتفاعلة والناتجة المتبقية أي التراكيز.
          </Definition>

          <div className="mt-10 p-8 bg-cyan-500/5 rounded-3xl border border-cyan-500/20">
            <h4 className="text-2xl font-black text-cyan-400 mb-6 flex items-center gap-3">
              <Info className="w-6 h-6" /> طبيعة االالتزان الكيميائي:
            </h4>
            <p className="text-xl text-gray-300 leading-relaxed">
              في االالنظمة التي تكون في حالة االالتزان تحدث عمليات متعاكسة في الوقت نفسها والسرعة نفسها .أي في محلول السكر وعند حالة االالتزان تتبلور جزيئات السكر بالسرعة نفسها التي تذوب بها جزيئات من البلورة .
            </p>
            <div className="mt-6 p-6 bg-black/30 rounded-2xl border border-white/10">
              <p className="text-lg text-gray-400 mb-4 italic">مثلا عند تسخين HgO في وعاء مغلق:</p>
              <p className="text-xl text-gray-200 leading-relaxed">
                بمجرد تفكك HgO يعاود الاوكسجين والزئبق الناتجان بحيث يتحدان من جديد لتكوين O و Hg الى HgO مرة ثانية . هكذا يمكن للتفاعلين ان يحدثا في الوقت نفسه . وعندما تتساوى سرعة تفاعل الاتحاد مع التفكك تصل التفاعل الى حالة الاتزان ديناميكي بين التفاعلين الكيميائيين . فهذان التفاعلان يستمران لكن دون ان يحدث اي تغيير في تركيب النظام .
              </p>
              <div className="mt-6 text-center" dir="ltr">
                <BlockMath math="2\text{HgO}\text{(s)} \rightleftharpoons 2\text{Hg}\text{(l)} + \text{O}_2\text{(g)}" />
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* ملاحظات هامة */}
      <section id="important-notes">
        <GlassCard>
          <SectionHeader title="ملاحظات هامة" icon={Layers} />
          <div className="space-y-6">
            <div className="flex gap-4 items-start p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400 font-bold">1</div>
              <p className="text-xl text-gray-200 leading-relaxed">
                عند ذوبان السكر في الماء تحدث فيه ذوبان وتبلور ويكونان في حالة الاتزان.
              </p>
            </div>
            <div className="flex gap-4 items-start p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400 font-bold">2</div>
              <p className="text-xl text-gray-200 leading-relaxed">
                الضغط البخاري هي خاصة للسوائل عندما يتساوى سرعة تبخير سائل مع سرعة تكثيفه في وعاء مغلق يصل فيه الى حالة الاتزان.
              </p>
            </div>
          </div>
          
          <div className="mt-12 p-8 bg-blue-500/5 rounded-3xl border border-blue-500/20">
            <p className="text-xl text-gray-300 leading-relaxed break-words whitespace-normal">
              وبعد مرور فترة من الزمن فان تركيز A + B يتم خلط مادتان <InlineMath math="t_0" /> عند الزمن المتفاعلات يقل والسرعة الامامية تقل وبنفس الوقت يزداد تركيز النواتج وتزداد تتساوى سرعتا التفاعلين <InlineMath math="t_1" /> سرعة التفاعل الخلفي او العكسي .وعند الزمن ويحدث اتزان وتراكيز متفاعلات والنواتج تبقى ثابتة .
            </p>
          </div>
        </GlassCard>
      </section>

      {/* ثابت الاتزان الكيميائي */}
      <section id="equilibrium-constant">
        <SectionHeader title="ثابت الأتزان الكيميائي ( 2/K )" icon={Scale} />
        <GlassCard>
          <Definition title="تعريف ثابت الاتزان">
            كمية ثابتة بثبوت درجة الحرارة تمثل نسبة الحاصل الرياضي لتراكيز النواتج عند الأتزان الى حاصل الرياضي لتراكيز المتفاعلات كل منها مرفوعة الى اس يساوي معامل المادة التابعة له في المعادلة الكيميائية .
          </Definition>

          <TeacherNote>
            المواد الصلبة والسائلة تحذف من معادلة ثابت التوزان . وتعوض (1) لأن تراكيزها لاتتغير عند تطبيق القانون K.
          </TeacherNote>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="p-6 bg-black/40 rounded-2xl border border-white/10" dir="ltr">
              <p className="text-cyan-500 font-bold mb-4 text-center">General Equation</p>
              <BlockMath math="n\\text{A} + m\\text{B} \\rightleftharpoons x\\text{C} + y\\text{D}" />
              <div className="mt-6 pt-6 border-t border-white/10">
                <BlockMath math="\\text{K} = \\frac{[\\text{C}]^x [\\text{D}]^y}{[\\text{A}]^n [\\text{B}]^m}" />
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-2xl font-black text-white mb-4 italic">أمثلة على كتابة تعبير K:</h4>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10" dir="ltr">
                <InlineMath math="\text{H}_{2}\text{(g)} + \text{I}_{2}\text{(g)} \rightleftharpoons 2\text{HI}\text{(g)} \implies \text{K} = \frac{[\text{HI}]^2}{[\text{H}_2][\text{I}_2]}" />
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10" dir="ltr">
                <InlineMath math="\text{NH}_{3}\text{(g)} + \text{HCl}\text{(g)} \rightleftharpoons \text{NH}_4\text{Cl}\text{(s)} \implies \text{K} = \frac{1}{[\text{NH}_3][\text{HCl}]}" />
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10" dir="ltr">
                <InlineMath math="\text{NH}_{3}\text{(g)} + \text{H}_2\text{S}\text{(g)} \rightleftharpoons \text{NH}_4\text{HS}\text{(s)} \implies \text{K} = \frac{1}{[\text{NH}_3][\text{H}_2\text{S}]}" dir="ltr" />
              </div>
            </div>
          </div>

          <div className="p-8 bg-yellow-500/5 rounded-3xl border border-yellow-500/20 space-y-4">
            <h4 className="text-2xl font-black text-yellow-500 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6" /> ملاحظات هامة حول K:
            </h4>
            <ul className="space-y-3 text-xl text-gray-300">
              <li className="flex gap-3 italic">
                <ChevronRight className="text-yellow-500 shrink-0" />
                <span>ثابت التوزان يكون بدون وحدة.</span>
              </li>
              <li className="flex gap-3 italic">
                <ChevronRight className="text-yellow-500 shrink-0" />
                <span>لايدل على سرعة التفاعل ولاتعمد عليها . تدل فقط على مدى تحويل المتفاعلات الى نواتج.</span>
              </li>
              <li className="flex gap-3 italic">
                <ChevronRight className="text-yellow-500 shrink-0" />
                <span>المعلومات التي توفرها K هي مدى تحول المتفاعلات الى النواتج.</span>
              </li>
            </ul>
          </div>
        </GlassCard>
      </section>

      {/* العلاقة بين الاتزان وثابت التوزان */}
      <section id="k-significance">
        <SectionHeader title="العلاقة بين الاتزان وثابت التوزان ( 3/K )" icon={ArrowRightLeft} />
        <GlassCard>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* K > 1 */}
            <div className="p-8 rounded-3xl bg-green-500/10 border border-green-500/20 text-center space-y-4">
              <div className="text-4xl font-black text-green-400"><InlineMath math="\text{K} > 1" /></div>
              <h5 className="text-xl font-bold text-white break-words whitespace-normal">المسار أمامي هو المرجح</h5>
              <p className="text-gray-300 break-words whitespace-normal">تحدث التفاعل الأمامي أسرع من التفاعل العكسي. النواتج هي المرجحة. تراكيز النواتج أعلى من تراكيز المتفاعلات.</p>
              <div className="pt-4 text-sm text-green-500 font-bold uppercase tracking-widest">كمية النواتج كبيرة</div>
            </div>

            {/* K < 1 */}
            <div className="p-8 rounded-3xl bg-red-500/10 border border-red-500/20 text-center space-y-4">
              <div className="text-4xl font-black text-red-400"><InlineMath math="\text{K} < 1" /></div>
              <h5 className="text-xl font-bold text-white break-words whitespace-normal">المسار عكسي هو المرجح</h5>
              <p className="text-gray-300 break-words whitespace-normal">تحدث التفاعل العكسي أسرع من الأمامي. المتفاعلات هي المرجحة. تراكيز المتفاعلات أعلى من النواتج.</p>
              <div className="pt-4 text-sm text-red-500 font-bold uppercase tracking-widest">كمية المتفاعلات كبيرة</div>
            </div>

            {/* K = 1/3 */}
            <div className="p-8 rounded-3xl bg-blue-500/10 border border-blue-500/20 text-center space-y-4">
              <div className="text-4xl font-black text-blue-400"><InlineMath math="\text{K} \approx 1/3" /></div>
              <h5 className="text-xl font-bold text-white break-words whitespace-normal">تفاعل متساوي تقريبا</h5>
              <p className="text-gray-300 break-words whitespace-normal">يحدث تفاعل الامامي والعكسي في نفس الوقت (متساوي) قبل الوصول الى الاتزان. تراكيز المتفاعلات والنواتج شبه متساوية. لايرجح اي من التفاعلين على الاخر.</p>
              <div className="pt-4 text-sm text-blue-500 font-bold uppercase tracking-widest">تراكيز شبه متساوية</div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* حاصل التفاعل */}
      <section id="reaction-quotient">
        <SectionHeader title="حاصل التفاعل" icon={RefreshCw} />
        <GlassCard>
          <TeacherNote>
            يستخدم حاصل التفاعل لمعرفة اتجاه سير تفاعل حيث يتم مقارنته مع ثابت الاتزان K.
          </TeacherNote>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="p-8 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6">
                <ArrowUpRight className="w-10 h-10 text-cyan-400" />
              </div>
              <h4 className="text-2xl font-black text-white mb-4">اتجاه امامي</h4>
              <p className="text-xl text-gray-300">أذا كان حاصل التفاعل <InlineMath math="<" /> من K</p>
            </div>

            <div className="p-8 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
                <ArrowDownRight className="w-10 h-10 text-purple-400" />
              </div>
              <h4 className="text-2xl font-black text-white mb-4">اتجاه خلفي</h4>
              <p className="text-xl text-gray-300">اذا كان حاصل التفاعل <InlineMath math=">" /> من K</p>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* انزياح الأتزان - مبدأ لو شاتلييه */}
      <section id="le-chatelier">
        <SectionHeader title="القسم 6-2: انزياح الأتزان" icon={Wind} />
        <GlassCard>
          <Definition title="مبدأ ( قاعدة ) لو-شاتلييه">
            اذا تعرض نظام متزن لتوتر فان الاتزان ينزاح الى الأتجاه الذي يؤدي الى ازالة أو تقليل هذا التوتر .
          </Definition>

          {/* 1 / تغير التركيز */}
          <div className="mt-16">
            <h4 className="text-3xl font-black text-cyan-400 mb-8 flex items-center gap-3">
              <Droplets className="w-8 h-8" /> 1 / تغير التركيز ( K لا يتغير يبقى ثابت )
            </h4>
            
            <TeacherNote>
              تغير التركيز ( كذلك الضغط الجزيئي ) تؤثر فقط على حالة ( نظام ) الاتزان ولا تؤثر على قيمة ثابت الأتزان K . لأن لها تأثير متساوي على قيمة K. المسار أو الاتجاه يكون من الزيادة الى النقصان.
            </TeacherNote>

            <div className="overflow-x-auto w-full rounded-3xl border border-white/10 bg-black/20 my-10">
              <table className="w-full text-center border-collapse min-w-max">
                <thead>
                  <tr className="bg-cyan-500/20 text-cyan-300 border-b border-white/10">
                    <th className="p-6 text-xl">الإجراء</th>
                    <th className="p-6 text-xl">حالة الاتزان ( الاتجاه )</th>
                    <th className="p-6 text-xl">قيمة ثابت الاتزان K</th>
                  </tr>
                </thead>
                <tbody className="text-gray-200 text-lg">
                  <tr className="border-b border-white/5">
                    <td className="p-6 font-bold">أ/ زيادة ( أضافة ) كمية من المتفاعلات</td>
                    <td className="p-6 text-green-400">المسار أمامي ( نحو اليمين )</td>
                    <td className="p-6">تبقى ثابت</td>
                  </tr>
                  <tr className="border-b border-white/5 bg-white/5">
                    <td className="p-6 font-bold">ب/ سحب كمية من النواتج</td>
                    <td className="p-6 text-green-400">المسار أمامي ( نحو اليمين )</td>
                    <td className="p-6">تبقى ثابت</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-6 font-bold">جـ/ اضافة كمية من النواتج</td>
                    <td className="p-6 text-red-400">المسار عكسي ( نحو اليسار )</td>
                    <td className="p-6">تبقى ثابت</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="p-6 font-bold">د/ سحب كمية من المتفاعلات</td>
                    <td className="p-6 text-red-400">المسار عكسي ( نحو اليسار )</td>
                    <td className="p-6">تبقى ثابت</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <TeacherNote>
              زيادة تركيز المواد النقية الصلبة والسائلة لاتتغير .
            </TeacherNote>
          </div>

          {/* 2 / تغير الضغط */}
          <div className="mt-16 pt-16 border-t border-white/10">
            <h4 className="text-3xl font-black text-cyan-400 mb-8 flex items-center gap-3">
              <Layers className="w-8 h-8" /> 2 / تغير الضغط ( الحجم ) ( للغازات فقط ) ( K لايتغير يبقى ثابت )
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="p-8 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 text-center">
                <h5 className="text-2xl font-black text-white mb-4 italic">زيادة الضغط</h5>
                <p className="text-xl text-gray-300">المسار من الحجم الأكبر الى الأصغر .</p>
              </div>
              <div className="p-8 rounded-3xl bg-purple-500/10 border border-purple-500/20 text-center">
                <h5 className="text-2xl font-black text-white mb-4 italic">خفض الضغط</h5>
                <p className="text-xl text-gray-300">المسار من الحجم الأصغر الى الأكبر .</p>
              </div>
            </div>

            <TeacherNote>
              أ/ أذا كان العدد الكلي للمولات المتفاعلات والنواتج متساوية فان لتغير الضغط ليست لها تأثير على نظام الاتزان ؟
              <br />
              جواب/ لان مقدار التغير في الضغط في كلا المسارين يكون متساوي .
            </TeacherNote>
          </div>

          {/* 3 / تغيرات الحرارة */}
          <div className="mt-16 pt-16 border-t border-white/10">
            <h4 className="text-3xl font-black text-cyan-400 mb-8 flex items-center gap-3">
              <Thermometer className="w-8 h-8" /> 3 / تغيرات الحرارة
            </h4>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              وتعتمد على حرارة التفاعل فيما اذا كان ماص للحرارة أو طارد للحرارة . فاذا كان أحد الاتجاهين ماص فان K تؤثر على نظام الاتزان وقيمة K . الاتجاه المعاكس يكون طارد والعكس صحيح .
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-orange-500/10 border border-orange-500/20">
                <h5 className="text-2xl font-black text-orange-400 mb-4">ارتفاع درجة الحرارة ( اضافة طاقة )</h5>
                <p className="text-xl text-gray-200 leading-relaxed italic">لأي نظام متزن يرجح دائما حدوث التفاعل الماص للحرارة .</p>
              </div>
              <div className="p-8 rounded-3xl bg-blue-500/10 border border-blue-500/20">
                <h5 className="text-2xl font-black text-blue-400 mb-4">خفض درجة الحرارة ( ازالة الطاقة )</h5>
                <p className="text-xl text-gray-200 leading-relaxed italic">فترجح التفاعل الطارد للحرارة .</p>
              </div>
            </div>

            <div className="mt-10 overflow-x-auto w-full rounded-3xl border border-white/10 bg-black/20">
              <table className="w-full text-center border-collapse min-w-max">
                <thead>
                  <tr className="bg-orange-500/20 text-orange-300 border-b border-white/10">
                    <th className="p-6 text-xl">الإجراء</th>
                    <th className="p-6 text-xl">الاتجاه المرجح</th>
                    <th className="p-6 text-xl">قيمة K</th>
                  </tr>
                </thead>
                <tbody className="text-gray-200 text-lg">
                  <tr className="border-b border-white/5">
                    <td className="p-6 font-bold">التسخين ( رفع درجة الحرارة )</td>
                    <td className="p-6">المسار امامي ( في الماص )</td>
                    <td className="p-6 text-green-400 font-bold">قيمة تزداد K</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="p-6 font-bold">التبريد ( خفض درجة الحرارة )</td>
                    <td className="p-6">المسار عكسي ( في الماص )</td>
                    <td className="p-6 text-red-400 font-bold">قيمة تقل K</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* تأثير الحفازات */}
          <div className="mt-16 pt-16 border-t border-white/10">
            <h4 className="text-3xl font-black text-cyan-400 mb-8 flex items-center gap-3">
              <Zap className="w-8 h-8" /> تأثير الحفازات
            </h4>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              عامل الحفاز يزيد من سرعة تفاعل كيميائي عن طريق ايجاد مسار بديل للطاقة .
            </p>
            <TeacherNote>
              س/ عامل الحفاز تزيد من سرعة التفاعل ولكنها لاتؤثر على نظام الاتزان وقيمة K ؟
              <br />
              جواب/ لانها تزيد من سرعتي المسارين الامامي والخلفي بشكل متساوي مما يجعل تراكيز المواد عند الاتزان لاتتأثر بذلك.
            </TeacherNote>
          </div>
        </GlassCard>
      </section>

      {/* اتزان الالاذابة */}
      <section id="solubility-equilibrium">
        <SectionHeader title="القسم 6-4: اتزان الالاذابة" icon={Droplets} />
        <GlassCard>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            تذوب المواد الصلبة الايونية في الماء الى ان تبلغ حالة الاتزان مع ايوناتها .
          </p>

          <Definition title="حاصل الاذابة">
            يحتوي المحلول المشبع على اقصى كمية ممكنة من المذاب موجود في حالة اتزان مع الفائض من المادة غير الذائبة وذلك عند درجة حرارة معينة فقدرة المادة على ذوبان في مادة اخرى عند درجة حرارة وضغط معينين يسمى الذوبانية ويعبر عنها بكمية المذاب التي تذوب في كمية معينة من المذيب لينتج محلولا مشبعا .
          </Definition>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
            <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20 text-center">
              <h5 className="font-bold text-green-400 mb-2">المادة القابلة للذوبان</h5>
              <p className="text-gray-300">ذوبانها أكبر من 1g في 100g من الماء</p>
            </div>
            <div className="p-6 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-center">
              <h5 className="font-bold text-yellow-400 mb-2">المادة الغير قابلة للذوبان</h5>
              <p className="text-gray-300">ذوبانها أقل من 0.1g في 100g من الماء</p>
            </div>
            <div className="p-6 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-center">
              <h5 className="font-bold text-orange-400 mb-2">المادة الشحيحة الذوبان</h5>
              <p className="text-gray-300">ذوبانها تقع بين هذين الحدين</p>
            </div>
          </div>

          <Definition title="ثابت حاصل الالاذابة Ksp">
            هو حاصل ضرب التراكيز المولارية ( الايوناته ) في محلول مشبع كل منها مرفوع الى أس يمثل معامل هذا الايون في المعادلة الموزونة.
          </Definition>

          <div className="space-y-6 mt-12">
            <h4 className="text-3xl font-black text-cyan-400 text-center mb-8">حسابات الترسيب ( Qsp vs Ksp )</h4>
            
            <TeacherNote>
              لمعرفة هل المركب الشحيح يترسب أم لا نوجد الحاصل الأيوني ( Qsp ) ونقارن قيمتها مع قيمة Ksp .
            </TeacherNote>

            <Definition title="الحاصل الأيوني ( Qsp )">
              حاصل ضرب التراكيز المولارية للأيونات في المحلول كل منها مرفوع الى أس تمثل معامل الأيون في المعادلة الموزونة .
            </Definition>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              {/* Qsp < Ksp */}
              <div className="relative p-8 rounded-3xl bg-blue-500/10 border border-blue-500/20 text-center group hover:scale-105 transition-transform duration-500">
                <div className="text-3xl font-black text-blue-400 mb-4"><InlineMath math="Q_{sp} < K_{sp}" /></div>
                <h5 className="text-xl font-bold text-white mb-4 italic break-words whitespace-normal">المحلول غير مشبع</h5>
                <p className="text-gray-300 leading-relaxed italic break-words whitespace-normal">أي يذوب ولايترسب ( وغير متزن ) واتجاه المرجح امامي .</p>
                <div className="mt-6 flex justify-center"><XCircle className="w-12 h-12 text-blue-500/50" /></div>
              </div>

              {/* Qsp = Ksp */}
              <div className="relative p-8 rounded-3xl bg-green-500/10 border border-green-500/20 text-center group hover:scale-105 transition-transform duration-500">
                <div className="text-3xl font-black text-green-400 mb-4"><InlineMath math="Q_{sp} = K_{sp}" /></div>
                <h5 className="text-xl font-bold text-white mb-4 italic break-words whitespace-normal">المحلول مشبع</h5>
                <p className="text-gray-300 leading-relaxed italic break-words whitespace-normal">أي لايترسب ولايذوب ( متزن ) .</p>
                <div className="mt-6 flex justify-center"><CheckCircle2 className="w-12 h-12 text-green-500/50" /></div>
              </div>

              {/* Qsp > Ksp */}
              <div className="relative p-8 rounded-3xl bg-red-500/10 border border-red-500/20 text-center group hover:scale-105 transition-transform duration-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                <div className="text-3xl font-black text-red-400 mb-4"><InlineMath math="Q_{sp} > K_{sp}" /></div>
                <h5 className="text-xl font-bold text-white mb-4 italic underline decoration-red-500 decoration-2 underline-offset-8 break-words whitespace-normal">المحلول فوق الاشباع</h5>
                <p className="text-gray-300 leading-relaxed italic font-bold break-words whitespace-normal">اي يترسب ولايذوب ( وغير متزن ) واتجاه المرجح عكسي .</p>
                <div className="mt-6 flex justify-center"><AlertTriangle className="w-12 h-12 text-red-500" /></div>
                <div className="mt-4 text-red-400 font-black animate-pulse uppercase tracking-widest break-words whitespace-normal">فالمحلول فوق المشبع ويحصل الترسيب</div>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* تأثير الأيون المشترك */}
      <section id="common-ion">
        <SectionHeader title="تأثير الأيون المشترك" icon={Zap} />
        <GlassCard>
          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-purple-500/10 border border-purple-500/20">
              <h4 className="text-2xl font-black text-purple-400 mb-6 italic">ماذا يفعل الأيون المشترك؟</h4>
              <ul className="space-y-4 text-xl text-gray-300">
                <li className="flex gap-4 items-start">
                  <ChevronRight className="text-purple-500 shrink-0 mt-1" />
                  <span>يزيح التفاعل المتزن نحو الاتجاه المرغوب.</span>
                </li>
                <li className="flex gap-4 items-start">
                  <ChevronRight className="text-purple-500 shrink-0 mt-1" />
                  <span>ترجح التفاعل العكسي حسب مبدأ لوشاتليه.</span>
                </li>
                <li className="flex gap-4 items-start">
                  <ChevronRight className="text-purple-500 shrink-0 mt-1" />
                  <span>تقلل من تأين الحمض او القاعدة الضعيفة.</span>
                </li>
                <li className="flex gap-4 items-start">
                  <ChevronRight className="text-purple-500 shrink-0 mt-1" />
                  <span className="text-white font-bold underline decoration-purple-500">تزيد من ترسيب الملح ( المتعادل ) لمحلول المشبع.</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h5 className="text-xl font-bold text-cyan-400 mb-4 italic">أ / اضافة اسيتات الصوديوم الى حامض الالستيك:</h5>
                <p className="text-gray-300 mb-4 italic">ايون مشترك لـ حمض ضعيف وملحه</p>
                <div className="space-y-2 text-lg text-gray-400">
                  <p>1/ اتجاه المرجح تكون عكسي</p>
                  <p>2/ تقل التأين الحمض الضعيف</p>
                  <p>3/ يزداد <InlineMath math="[\\text{CH}_3\\text{COOH}]" /> أو يزداد تركيز الحمض الغير المتأين .</p>
                  <p>4/ تقل <InlineMath math="[\\text{H}_3\\text{O}^+]" /></p>
                  <p>5/ تزداد pH</p>
                  <p>6/ تقل pOH</p>
                </div>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h5 className="text-xl font-bold text-purple-400 mb-4 italic">ب/ اضافة كلوريد الالمنيوم الى محلول الالمنيا:</h5>
                <p className="text-gray-300 mb-4 italic">أيون مشترك لـ قاعدة ضعيفة وملحها</p>
                <div className="space-y-2 text-lg text-gray-400">
                  <p>1/ اتجاه المرجح تكون عكسي</p>
                  <p>2/ تقل التأين القاعدة الضعيفة</p>
                  <p>3/ يزداد <InlineMath math="[\\text{NH}_4^+]" /></p>
                  <p>4/ تزداد <InlineMath math="[\\text{NH}_3]" /> أو يزداد تركيز القاعدة الغير المتأين .</p>
                  <p>5/ تقل <InlineMath math="[\\text{OH}^-]" /></p>
                  <p>6/ تقل pH</p>
                  <p>7/ تزداد pOH</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* مسائل على ثابت الاتزان */}
      <section id="k-problems">
        <SectionHeader title="اسئلة على ثابت الالاتزان" icon={HelpCircle} />
        <GlassCard>
          <div className="space-y-6">
            <div className="p-6 bg-cyan-500/5 rounded-2xl border border-cyan-500/20">
              <h4 className="text-xl font-bold text-cyan-400 mb-4">قواعد هامة عند تعديل المعادلات:</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-cyan-500 font-bold">*</span>
                  <span>عند قلب المعادلة يقلب قيمة الـ K . فيكون للتفاعل العكسي <InlineMath math="1/\text{K}" />.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-500 font-bold">**</span>
                  <span>عند ضرب المعادلة في عدد معين فان العدد المضروب يصبح اس لقيمة K .</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-500 font-bold">***</span>
                  <span>عند القسمة المعادلة على عدد معين فان قيمة K تكون تحت جذر لعدد المقسوم .</span>
                </li>
              </ul>
            </div>

            <SolvedExample 
              question="للتفاعل التالي: A ⇌ 3C قيمة K = 6. جد قيمة K للتفاعل العكسي 3C ⇌ A ؟"
              solution={
                <div className="space-y-2">
                  <p className="break-words whitespace-normal">بما أن المعادلة قُلبت:</p>
                  <BlockMath math="\text{K}_{rev} = \frac{1}{\text{K}_{fwd}} = \frac{1}{6}" />
                </div>
              }
            />

            <SolvedExample 
              question="للتفاعل التالي: A ⇌ 3C قيمة K = 6. جد قيمة K للتفاعل التالي: 2A ⇌ 6C ؟"
              solution={
                <div className="space-y-2">
                  <p className="break-words whitespace-normal">بما أن المعادلة ضُربت في 2:</p>
                  <BlockMath math="\text{K}' = (\text{K})^2 = (6)^2 = 36" />
                </div>
              }
            />

            <SolvedExample 
              question={
                <div dir="rtl" className="break-words whitespace-normal">
                  في وعاء سعته 5L يصل التفاعل <InlineMath math="\text{AB}_{2}\text{C}\text{(g)} \rightleftharpoons \text{B}_{2}\text{(g)} + \text{AC}\text{(g)}" /> الى حالة التوزان عند 900K.
                  عند الاتزان وجد ان النظام يحتوي على 0.084mol من <InlineMath math="\text{AB}_2\text{C}" /> و 0.035mol من <InlineMath math="\text{B}_2" /> و 0.059mol من <InlineMath math="\text{AC}" />.
                  ما قيمة ثابت الاتزان لهذا النظام عند درجة حرارة المذكورة؟
                </div>
              }
              solution={
                <div className="space-y-4">
                  <p className="break-words whitespace-normal">1. نحسب التراكيز المولارية (M = mol/L):</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-black/20 rounded-xl border border-white/10" dir="ltr">
                      <BlockMath math="[\text{AB}_2\text{C}] = \frac{0.084}{5} = 0.0168 \, \text{M}" />
                    </div>
                    <div className="p-4 bg-black/20 rounded-xl border border-white/10" dir="ltr">
                      <BlockMath math="[\text{B}_2] = \frac{0.035}{5} = 0.007 \, \text{M}" />
                    </div>
                    <div className="p-4 bg-black/20 rounded-xl border border-white/10" dir="ltr">
                      <BlockMath math="[\text{AC}] = \frac{0.059}{5} = 0.0118 \, \text{M}" />
                    </div>
                  </div>
                  <p className="break-words whitespace-normal">2. نطبق قانون ثابت الاتزان:</p>
                  <div dir="ltr">
                    <BlockMath math="\text{K} = \frac{[\text{B}_2][\text{AC}]}{[\text{AB}_2\text{C}]}" />
                    <BlockMath math="\text{K} = \frac{(0.007)(0.0118)}{0.0168} = 4.9 \times 10^{-3}" />
                  </div>
                </div>
              }
            />

            <SolvedExample 
              question={
                <div dir="rtl" className="break-words whitespace-normal">
                  يتفاعل غاز ثنائي اوكسيد الكبريت مع غاز الاوكسجين لينتج غاز ثلاثي اكسيد الكبريت عند درجة حرارة 600°C.
                  وجد تراكيز <InlineMath math="\text{SO}_2" /> هو 1.5M و تركيز <InlineMath math="\text{O}_2" /> هو 1.25M.
                  احسب <InlineMath math="[\text{SO}_3]" /> اذا علمت ان ثابت الاتزان لهذا التفاعل يساوي 4.36 ؟
                </div>
              }
              solution={
                <div className="space-y-4">
                  <p className="break-words whitespace-normal">المعادلة الموزونة:</p>
                  <div dir="ltr">
                    <BlockMath math="2\text{SO}_{2}\text{(g)} + \text{O}_{2}\text{(g)} \rightleftharpoons 2\text{SO}_{3}\text{(g)}" />
                  </div>
                  <p className="break-words whitespace-normal">تطبيق القانون:</p>
                  <div dir="ltr">
                    <BlockMath math="\text{K} = \frac{[\text{SO}_3]^2}{[\text{SO}_2]^2[\text{O}_2]}" />
                    <BlockMath math="4.36 = \frac{[\text{SO}_3]^2}{(1.5)^2(1.25)}" />
                    <BlockMath math="[\text{SO}_3]^2 = 4.36 \times 2.25 \times 1.25" />
                    <BlockMath math="[\text{SO}_3] = \sqrt{4.36 \times 2.25 \times 1.25} = 3.5 \, \text{M}" />
                  </div>
                </div>
              }
            />
          </div>
        </GlassCard>
      </section>

      {/* الاتزان في المحاليل الأحماض والقواعد والأملاح */}
      <section id="acid-base-equilibrium">
        <SectionHeader title="الالاتزان في المحاليل الألأحماض والقواعد والالاملاالح" icon={FlaskConical} />
        <GlassCard>
          <div className="space-y-12">
            {/* Ka - ثابت تأين الحمض الضعيف */}
            <div className="p-8 rounded-3xl bg-cyan-500/5 border border-cyan-500/20">
              <h4 className="text-2xl font-black text-cyan-400 mb-6 flex items-center gap-3">
                <ChevronRight className="w-6 h-6" /> 1/ ثابت تأين الحامض الضعيف : Ka
              </h4>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                هو ثابت الاتزان لتفاعل تأين الحامض الضعيف ويكون ثابتا عند درجة حرارة معينة لكنه يكتسب قيمة جديدة عند كل درجة حرارة جديدة وتمثل ثابت تأين الحامض الضعيف قيمة صغيرة .
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="p-6 bg-black/40 rounded-2xl border border-white/10" dir="ltr">
                  <p className="text-cyan-500 font-bold mb-4 text-center">Acetic Acid Ionization</p>
                  <BlockMath math="\text{CH}_3\text{COOH}\text{(aq)} + \text{H}_2\text{O}\text{(l)} \rightleftharpoons \text{CH}_3\text{COO}^-\text{(aq)} + \text{H}_3\text{O}^+\text{(aq)}" />
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <BlockMath math="\text{K}_a = \frac{[\text{CH}_3\text{COO}^-][\text{H}_3\text{O}^+]}{[\text{CH}_3\text{COOH}]}" />
                  </div>
                </div>
                <TeacherNote>
                  كلما كان قيمة Ka للحمض الضعيف كبيرة كان له ( أكبر تأين ) ، وأكبر كمية لـ <InlineMath math="\text{H}_3\text{O}^+" /> ، وأقل PH.
                </TeacherNote>
              </div>
            </div>

            {/* Kb - ثابت تأين القاعدة الضعيفة */}
            <div className="p-8 rounded-3xl bg-purple-500/5 border border-purple-500/20">
              <h4 className="text-2xl font-black text-purple-400 mb-6 flex items-center gap-3">
                <ChevronRight className="w-6 h-6" /> 2/ ثابت تأين القاعدة الضعيفة : Kb
              </h4>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                هو الثابت الاتزان التفاعل تأين القاعدة الضعيفة ويكون ثابتا عند درجة حرارة معينة لكنه يكتسب قيمة جديدة عند كل درجة حرارة جديدة . ويمثل ثابت تأين القاعدة الضعيفة قيمة صغيرة .
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="p-6 bg-black/40 rounded-2xl border border-white/10" dir="ltr">
                  <p className="text-purple-500 font-bold mb-4 text-center">Ammonia Ionization</p>
                  <BlockMath math="\text{NH}_3\text{(aq)} + \text{H}_2\text{O}\text{(l)} \rightleftharpoons \text{NH}_4^+\text{(aq)} + \text{OH}^-\text{(aq)}" />
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <BlockMath math="\text{K}_b = \frac{[\text{NH}_4^+][\text{OH}^-]}{[\text{NH}_3]}" />
                  </div>
                </div>
                <TeacherNote>
                  كلما كان قيمة Kb للقاعدة الضعيفة كبيرة كان لها ( أكبر تأين ) ، وأكبر كمية لـ <InlineMath math="\text{OH}^-" /> ، وأكبر PH.
                </TeacherNote>
              </div>
            </div>

            {/* Kw - ثابت تأين الماء */}
            <div className="p-8 rounded-3xl bg-blue-500/5 border border-blue-500/20">
              <h4 className="text-2xl font-black text-blue-400 mb-6 flex items-center gap-3">
                <ChevronRight className="w-6 h-6" /> 3/ ثابت تأين الماء : Kw
              </h4>
              <p className="text-xl text-gray-300 leading-relaxed mb-6 break-words whitespace-normal">
                ان تأين الذاتي للماء هو تفاعل اتزان و <InlineMath math="\text{K}_w" /> عند <InlineMath math="25^\circ \text{C} = 1.0 \times 10^{-14}" />.
              </p>
              <div className="p-6 bg-black/40 rounded-2xl border border-white/10 text-center" dir="ltr">
                <BlockMath math="\text{H}_2\text{O}\text{(l)} + \text{H}_2\text{O}\text{(l)} \rightleftharpoons \text{H}_3\text{O}^+\text{(aq)} + \text{OH}^-\text{(aq)}" />
                <div className="mt-6 pt-6 border-t border-white/10">
                  <BlockMath math="\text{K}_w = [\text{H}_3\text{O}^+][\text{OH}^-] = 1.0 \times 10^{-14}" />
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* المحاليل المنظمة ( محاليل بفر ) */}
      <section id="buffer-solutions">
        <SectionHeader title="المحالیل المنظمة ( محالیل بفر )" icon={Zap} />
        <GlassCard>
          <Definition title="تعريف المحلول المنظم">
            هي محاليل التي تقاوم تغيرات الـ PH ( أي لايتغير الـ PH أو يتغير بشكل بسيط جدا ).
          </Definition>

          <div className="p-8 rounded-3xl bg-cyan-500/5 border border-cyan-500/20 my-10">
            <h4 className="text-2xl font-black text-cyan-400 mb-6 italic">شروط المحلول المنظم:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xl text-gray-200">أولاً: حمض ضعيف وملح قاعدي (أيون مشترك)</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xl text-gray-200">ثانياً: قاعدة ضعيفة وملح حامضي (أيون مشترك)</p>
              </div>
            </div>
          </div>

          <TeacherNote>
            عند تحضير محلول منظم يجب ان يكون مولات ( تركيز ) الحمض الضعيف أكثر من مولات ( تركيز ) القاعدة القوية هنا ( اي عند خلط 0.4 mol من حمض الاستيك مع 0.2 mol من هيدروكسيد الصوديوم فيكون محلول منظم ).
          </TeacherNote>
        </GlassCard>
      </section>

      {/* التحلل المائي للأملاح */}
      <section id="salt-hydrolysis">
        <SectionHeader title="التحلل المائي للألألمالالح" icon={Droplets} />
        <GlassCard>
          <Definition title="التحلل المائي ( التميؤ )">
            هو تفاعل يحدث بين جزيئات الماء وايونات الملح الذائب مكونا محاليل متعادلة أو حمضية أو قاعدية ( أي لانتاج نوع ضعيف للتأين ).
          </Definition>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
            {/* تميؤ الكاتيون */}
            <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20">
              <h4 className="text-2xl font-black text-red-400 mb-4 italic break-words whitespace-normal">1 / تميؤ الكاتيون:</h4>
              <p className="text-lg text-gray-300 mb-4 break-words whitespace-normal">تفاعل كاتيونات مع الماء وتكون أيون <InlineMath math="\text{H}_3\text{O}^+" /> والمحلول يصبح حامضي.</p>
              <div className="p-4 bg-black/40 rounded-xl border border-red-500/30 text-center" dir="ltr">
                <InlineMath math="\text{BH}^+\text{(aq)} + \text{H}_2\text{O}\text{(l)} \rightleftharpoons \text{H}_3\text{O}^+\text{(aq)} + \text{B}\text{(aq)}" />
              </div>
              <p className="mt-4 text-red-400 font-bold break-words whitespace-normal">المحلول حامضي PH {'<'} 7</p>
            </div>

            {/* تميؤ الأنيون */}
            <div className="p-8 rounded-3xl bg-blue-500/5 border border-blue-500/20">
              <h4 className="text-2xl font-black text-blue-400 mb-4 italic break-words whitespace-normal">2 / تميؤ أنيون:</h4>
              <p className="text-lg text-gray-300 mb-4 break-words whitespace-normal">تفاعل أنيون مع الماء وتكون أيون <InlineMath math="\text{OH}^-" /> والمحلول يصبح قاعدي.</p>
              <div className="p-4 bg-black/40 rounded-xl border border-blue-500/30 text-center" dir="ltr">
                <InlineMath math="\text{A}^-\text{(aq)} + \text{H}_2\text{O}\text{(l)} \rightleftharpoons \text{HA}\text{(aq)} + \text{OH}^-\text{(aq)}" />
              </div>
              <p className="mt-4 text-blue-400 font-bold break-words whitespace-normal">المحلول قاعدي PH {'>'} 7</p>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-2xl font-black text-white mb-6 text-center">أنواع من الأملاح</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-red-500/10 rounded-2xl border border-red-500/20 text-center">
                <h5 className="font-bold text-red-400 mb-2">أملاح حامضية</h5>
                <p className="text-gray-300">حمض قوي + قاعدة ضعيفة</p>
                <p className="text-sm text-gray-400 mt-2">PH {'<'} 7.0</p>
              </div>
              <div className="p-6 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-center">
                <h5 className="font-bold text-blue-400 mb-2">أملاح قاعدية</h5>
                <p className="text-gray-300">قاعدة قوية + حمض ضعيف</p>
                <p className="text-sm text-gray-400 mt-2">PH {'>'} 7.0</p>
              </div>
              <div className="p-6 bg-green-500/10 rounded-2xl border border-green-500/20 text-center">
                <h5 className="font-bold text-green-400 mb-2">أملاح متعادلة</h5>
                <p className="text-gray-300">حمض قوي + قاعدة قوية</p>
                <p className="text-sm text-gray-400 mt-2">PH = 7.0</p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-white/10 mt-10 shadow-2xl w-full">
              <table className="w-full text-right bg-black/20 min-w-[600px]">
                <thead>
                  <tr className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 text-white">
                    <th className="p-4 md:p-5 border-b border-white/10 italic">اسم الحمض</th>
                    <th className="p-4 md:p-5 border-b border-white/10 italic">الأنيون السالب</th>
                    <th className="p-4 md:p-5 border-b border-white/10 italic">اسم الحمض</th>
                    <th className="p-4 md:p-5 border-b border-white/10 italic">الأنيون السالب</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300 font-medium italic">
                  <tr className="border-b border-white/5">
                    <td className="p-4 md:p-5 flex items-center gap-2"><InlineMath math="\text{H}_2\text{SO}_3" /> ح. كبريتوز</td>
                    <td className="p-4 md:p-5"><InlineMath math="\text{SO}_3^{2-}" /> كبريتيت</td>
                    <td className="p-4 md:p-5 flex items-center gap-2"><InlineMath math="\text{HNO}_2" /> ح. نتروز</td>
                    <td className="p-4 md:p-5"><InlineMath math="\text{NO}_2^{-1}" /> نتريت</td>
                  </tr>
                  <tr className="border-b border-white/5 bg-white/5">
                    <td className="p-4 md:p-5 flex items-center gap-2"><InlineMath math="\text{H}_2\text{SO}_4" /> ح. كبريتيك</td>
                    <td className="p-4 md:p-5"><InlineMath math="\text{SO}_4^{2-}" /> كبريتات</td>
                    <td className="p-4 md:p-5 flex items-center gap-2"><InlineMath math="\text{HNO}_3" /> ح. نتريك</td>
                    <td className="p-4 md:p-5"><InlineMath math="\text{NO}_3^{-1}" /> نترات</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4 md:p-5 flex items-center gap-2"><InlineMath math="\text{H}_2\text{CO}_3" /> ح. كربونيك</td>
                    <td className="p-4 md:p-5"><InlineMath math="\text{CO}_3^{2-}" /> كربونات</td>
                    <td className="p-4 md:p-5 flex items-center gap-2"><InlineMath math="\text{HClO}" /> ح. هيبوكلوروز</td>
                    <td className="p-4 md:p-5"><InlineMath math="\text{ClO}^{-1}" /> هيبوكلوريت</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="p-4 md:p-5 flex items-center gap-2"><InlineMath math="\text{H}_3\text{PO}_4" /> ح. فوسفوريك</td>
                    <td className="p-4 md:p-5"><InlineMath math="\text{PO}_4^{3-}" /> فوسفات</td>
                    <td className="p-4 md:p-5 flex items-center gap-2"><InlineMath math="\text{HClO}_4" /> ح. بيركلوريك</td>
                    <td className="p-4 md:p-5"><InlineMath math="\text{ClO}_4^{-1}" /> بيركلورات</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* اتزان الإذابة وحسابات الترسيب */}
      <section id="solubility-precipitation">
        <SectionHeader title="اتزان الالاذابة وحسابات الترسيب" icon={Droplets} />
        <GlassCard>
          <div className="space-y-10">
            <Definition title="ثابت حاصل الالاذابة Ksp">
              هو حاصل ضرب التراكيز المولارية ( الايوناته ) في محلول مشبع كل منها مرفوع الى أس يمثل معامل هذا الايون في المعادلة الموزونة.
            </Definition>

            <SolvedExample 
              question={
                <div dir="rtl" className="break-words whitespace-normal">
                  احسب قيمة حاصل الاذابة لملح بروميد الرصاص <InlineMath math="\text{PbBr}_2" /> أذا كان تركيز أيونات الرصاص <InlineMath math="2.1 \times 10^{-4} \, \text{M}" /> وتركيز أيونات البروميد <InlineMath math="1.3 \times 10^{-5} \, \text{M}" /> ؟
                </div>
              }
              solution={
                <div className="space-y-4">
                  <p className="break-words whitespace-normal">المعادلة:</p>
                  <div dir="ltr">
                    <BlockMath math="\text{PbBr}_{2}\text{(s)} \rightleftharpoons \text{Pb}^{+2}\text{(aq)} + 2\text{Br}^-\text{(aq)}" />
                  </div>
                  <p className="break-words whitespace-normal">تطبيق القانون:</p>
                  <div dir="ltr">
                    <BlockMath math="\text{K}_{sp} = [\text{Pb}^{+2}][\text{Br}^-]^2" />
                    <BlockMath math="\text{K}_{sp} = [2.1 \times 10^{-4}][1.3 \times 10^{-5}]^2" />
                    <BlockMath math="\text{K}_{sp} = 3.55 \times 10^{-14}" />
                  </div>
                </div>
              }
            />

            <SolvedExample 
              question={
                <div dir="rtl" className="break-words whitespace-normal">
                  احسب قيمة <InlineMath math="\text{K}_{sp}" /> لملح كبريتات الفضة <InlineMath math="\text{Ag}_2\text{SO}_4" /> أذا كان تركيز أيونات الفضة <InlineMath math="1.4 \times 10^{-3} \, \text{M}" /> ؟
                </div>
              }
              solution={
                <div className="space-y-4">
                  <p className="break-words whitespace-normal">المعادلة:</p>
                  <div dir="ltr">
                    <BlockMath math="\text{Ag}_2\text{SO}_{4}\text{(s)} \rightleftharpoons 2\text{Ag}^+\text{(aq)} + \text{SO}_4^{-2}\text{(aq)}" />
                  </div>
                  <p className="break-words whitespace-normal">بما أن تركيز الفضة ضعف تركيز الكبريتات:</p>
                  <div dir="ltr">
                    <BlockMath math="[\text{SO}_4^{-2}] = \frac{[\text{Ag}^+]}{2} = \frac{1.4 \times 10^{-3}}{2} = 0.7 \times 10^{-3} \, \text{M}" />
                  </div>
                  <p className="break-words whitespace-normal">تطبيق القانون:</p>
                  <div dir="ltr">
                    <BlockMath math="\text{K}_{sp} = [\text{Ag}^+]^2[\text{SO}_4^{-2}]" />
                    <BlockMath math="\text{K}_{sp} = [1.4 \times 10^{-3}]^2 [0.7 \times 10^{-3}]" />
                    <BlockMath math="\text{K}_{sp} = 6.86 \times 10^{-10}" />
                  </div>
                </div>
              }
            />

            <div className="pt-10 border-t border-white/10">
              <h4 className="text-3xl font-black text-cyan-400 text-center mb-8">توقع الترسيب باستخدام الحاصل الأيوني Qsp</h4>
              
              <TeacherNote>
                لمعرفة هل المركب الشحيح يترسب أم لا نوجد الحاصل الأيوني ( Qsp ) ونقارن قيمتها مع قيمة Ksp .
              </TeacherNote>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center">
                  <div className="text-2xl font-black text-blue-400 mb-2"><InlineMath math="\text{Q}_{sp} < \text{K}_{sp}" /></div>
                  <p className="text-gray-300 break-words whitespace-normal">المحلول غير مشبع (لا يتكون راسب).</p>
                </div>
                <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20 text-center">
                  <div className="text-2xl font-black text-green-400 mb-2"><InlineMath math="\text{Q}_{sp} = \text{K}_{sp}" /></div>
                  <p className="text-gray-300 break-words whitespace-normal">المحلول مشبع (في حالة اتزان).</p>
                </div>
                <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-center shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                  <div className="text-2xl font-black text-red-400 mb-2"><InlineMath math="\text{Q}_{sp} > \text{K}_{sp}" /></div>
                  <p className="text-gray-300 font-bold break-words whitespace-normal">المحلول فوق مشبع (يتكون راسب).</p>
                </div>
              </div>

              <SolvedExample 
                question="هل سيتكون راسب عند خلط 100ml من محلول 0.0025M AgNO3 مع 150ml من محلول 0.0020M NaBr ؟ علما بان Ksp لـ AgBr = 5.0 x 10^-13"
                solution={
                  <div className="space-y-4">
                    <p className="break-words whitespace-normal">1. نحسب التراكيز بعد الخلط (V_total = 100 + 150 = 250ml):</p>
                    <div dir="ltr">
                      <BlockMath math="[\text{Ag}^+] = \frac{0.0025 \times 100}{250} = 1.0 \times 10^{-3} \, \text{M}" />
                      <BlockMath math="[\text{Br}^-] = \frac{0.0020 \times 150}{250} = 1.2 \times 10^{-3} \, \text{M}" />
                    </div>
                    <p className="break-words whitespace-normal">2. نحسب الحاصل الأيوني Qsp:</p>
                    <div dir="ltr">
                      <BlockMath math="\text{Q}_{sp} = [\text{Ag}^+][\text{Br}^-] = (1.0 \times 10^{-3})(1.2 \times 10^{-3}) = 1.2 \times 10^{-6}" />
                    </div>
                    <p className="break-words whitespace-normal">3. المقارنة:</p>
                    <div className="p-4 bg-red-500/20 rounded-xl border border-red-500/30 text-center">
                      <p className="text-xl font-bold text-red-400 break-words whitespace-normal">بما أن Qsp (1.2 x 10^-6) {'>'} Ksp (5.0 x 10^-13)</p>
                      <p className="text-2xl font-black text-white mt-2 break-words whitespace-normal">إذن يتكون راسب</p>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </GlassCard>
      </section>

      {/* مراجعة الفصل وأسئلة اختبر نفسك */}
      <section id="chapter-quiz">
        <SectionHeader title="اختبر نفسك - أسئلة مراجعة" icon={HelpCircle} />
        <GlassCard>
          <div className="space-y-8">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-xl font-bold text-cyan-400 mb-4">س1/ يكون تفاعل كيميائي في حالة اتزان عندما؟</h4>
              <ul className="space-y-2 text-gray-300">
                <li>أ- يتوقف التفاعل الامامي والعكسي.</li>
                <li className="text-green-400 font-bold">ب- تكون سرعتي التفاعل الامامي والعكسي متساويين.</li>
                <li>ج- ثابت الاتزان يساوي 1.</li>
                <li>د- لا يبقى المتفاعلات.</li>
              </ul>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-xl font-bold text-cyan-400 mb-4">س2/ يعتمد ثابت الاتزان على التغيرات في؟</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="text-green-400 font-bold">أ- درجة الحرارة.</li>
                <li>ب- التركيز.</li>
                <li>ج- الضغط.</li>
                <li>د- جميع ما سبق ذكره.</li>
              </ul>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-xl font-bold text-cyan-400 mb-4">س3/ إضافة اسيتات صوديوم الى محلول حمض الاسيتيك تعمل على؟</h4>
              <ul className="space-y-2 text-gray-300">
                <li>أ- زيادة تأين <InlineMath math="\text{CH}_3\text{COOH}" />.</li>
                <li className="text-green-400 font-bold">ب- خفض تأين <InlineMath math="\text{CH}_3\text{COOH}" />.</li>
                <li>ج- ترسيب <InlineMath math="\text{CH}_3\text{COONa}" />.</li>
                <li>د- زيادة درجة تأين الحامض.</li>
              </ul>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-xl font-bold text-cyan-400 mb-4">س4/ أي من الأيونات التالية يخضع لتميؤ في المحلول المائي؟</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="p-3 bg-black/20 rounded-lg text-center border border-white/10">
                  <InlineMath math="\text{NO}_3^-" /> <span className="text-red-400 block text-sm mt-1">لا</span>
                </div>
                <div className="p-3 bg-black/20 rounded-lg text-center border border-white/10">
                  <InlineMath math="\text{F}^-" /> <span className="text-green-400 block text-sm mt-1">نعم</span>
                </div>
                <div className="p-3 bg-black/20 rounded-lg text-center border border-white/10">
                  <InlineMath math="\text{NH}_4^+" /> <span className="text-green-400 block text-sm mt-1">نعم</span>
                </div>
                <div className="p-3 bg-black/20 rounded-lg text-center border border-white/10">
                  <InlineMath math="\text{K}^+" /> <span className="text-red-400 block text-sm mt-1">لا</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      <p className="text-center text-gray-500 font-bold py-10">تم بحمد الله استخراج كافة بيانات الفصل السادس: اتزان الذوبانية.</p>





      <p className="text-center text-gray-600 text-sm italic">ملاحظة: هذا المحتوى هو نسخة طبق الأصل من المذكرة التعليمية للأستاذ أحمد قاسم.</p>
    </div>
  );
}
