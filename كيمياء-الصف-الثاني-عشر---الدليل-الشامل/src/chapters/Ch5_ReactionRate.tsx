import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { 
  Activity, 
  Zap, 
  Clock, 
  Layers, 
  FlaskConical, 
  Target,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { motion } from 'motion/react';
import 'katex/dist/katex.min.css';

import {
  GlassCard,
  SectionHeader,
  Definition,
  FormulaBox,
  TeacherNote,
  SolvedExample,
  Quiz
} from '../components/ChemistryUI';

// --- Main Component ---

export default function Ch5_ReactionRate() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 space-y-24" dir="rtl">
      
      {/* صفحة الغلاف */}
      <section className="text-center space-y-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block p-4 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 mb-4"
        >
          <FlaskConical className="w-20 h-20 text-cyan-400" />
        </motion.div>
        <h1 className="text-7xl font-black text-white tracking-tighter">
          الكيمياء <br />
          <span className="text-cyan-500 text-5xl">فصل الخامس الكورس الأول</span>
        </h1>
        <h2 className="text-6xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          سرعة التفاعلات
        </h2>
        <div className="flex flex-col items-center gap-2 pt-10">
          <div className="h-1 w-24 bg-cyan-500 rounded-full" />
          <p className="text-2xl font-bold text-gray-400">إعداد أستاذ أحمد قاسم محمد</p>
        </div>
      </section>

      {/* القسم 5-1: سرعة التفاعلات */}
      <section id="section-5-1">
        <SectionHeader title="القسم 5-1" subtitle="سرعة التفاعلات" icon={Activity} />
        <GlassCard page="207" title="مقدمة في سرعة التفاعل">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-center">
                <span className="text-gray-400 block mb-2">الرمز</span>
                <span className="text-4xl font-black text-white">R</span>
              </div>
              <div className="p-6 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-center">
                <span className="text-gray-400 block mb-2">الوحدة</span>
                <span className="text-4xl font-black text-white">R = M / t</span>
              </div>
              <div className="p-6 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-center">
                <span className="text-gray-400 block mb-2">القانون</span>
                <span className="text-2xl font-black text-white">التركيز / الزمن</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
              <div className="p-8 bg-green-500/10 border border-green-500/30 rounded-3xl">
                <h6 className="text-green-400 font-black mb-4 text-xl flex items-center gap-2">
                  <Zap className="w-6 h-6" /> سريع:
                </h6>
                <p className="text-gray-300 text-2xl">احتراق الميثان</p>
              </div>
              <div className="p-8 bg-red-500/10 border border-red-500/30 rounded-3xl">
                <h6 className="text-red-400 font-black mb-4 text-xl flex items-center gap-2">
                  <Clock className="w-6 h-6" /> بطيئ:
                </h6>
                <p className="text-gray-300 text-2xl">صدأ الحديد</p>
              </div>
            </div>

            <TeacherNote>
              تتناسب سرعة التفاعل طردياً مع التركيز وعكسياً مع الزمن.
            </TeacherNote>

            <div className="space-y-4">
              <h5 className="text-2xl font-black text-white">تعتمد سرعة التفاعل على:</h5>
              <ul className="space-y-3 text-gray-300 text-xl">
                <li className="flex items-center gap-3"><ArrowRight className="text-cyan-500" /> مسار الطاقة التي يتبعها تفاعل.</li>
                <li className="flex items-center gap-3"><ArrowRight className="text-cyan-500" /> تغيرات التي تحصل على المواد المتفاعلة.</li>
                <li className="flex items-center gap-3"><ArrowRight className="text-cyan-500" /> سرعة ارتباط أيون الموجب مع أيون السالب وأيضاً بالنسبة للجزيئات.</li>
              </ul>
            </div>

            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl mt-10">
              <h5 className="text-xl font-bold text-cyan-400 mb-6">مثال: كيف يحدث التفاعل بين NO و Cl₂؟</h5>
              <p className="text-gray-300 mb-6 leading-relaxed">
                جواب / إذا حصل تصادم بين جزيئة الكلور والأوكسجين الموجودة في (NO) فمن المتوقع حدوث التفاعل التالي:
              </p>
              <FormulaBox>
                {"NO + Cl_2 \\rightarrow NOCl + Cl"}
              </FormulaBox>
              <p className="text-red-400 font-bold mt-4">
                ولا يحدث التفاعل إذا صدم جزيئة الكلور والنايتروجين الموجود في (NO).
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard page="207" title="أنواع التفاعلات" className="mt-12">
          <div className="space-y-8">
            <Definition title="التفاعل المتجانس">
              التفاعل الذي تكون متفاعلاته ونواتجه في حالة فيزيائية واحدة (صلبة أو سائلة أو غازية).
              <div className="mt-4" dir="ltr">
                <BlockMath math="H_{2(g)} + F_{2(g)} \\rightarrow 2HF_{(g)}" />
              </div>
            </Definition>

            <Definition title="التفاعل الغير المتجانس">
              التفاعل الذي تكون متفاعلاته ونواتجه في حالة فيزيائية مختلفة.
              <div className="mt-4" dir="ltr">
                <BlockMath math="SO_{2(g)} + H_2O_{(l)} \\rightarrow H_2SO_{3(aq)}" />
              </div>
            </Definition>
          </div>
        </GlassCard>
      </section>

      {/* نظرية التصادم */}
      <section id="collision-theory">
        <SectionHeader title="نظرية التصادم" icon={Target} />
        <GlassCard page="208">
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            لكي يتم التفاعل بين المواد يجب أن تتصادم جسيماتها من (الجزيئات والذرات والأيونات) وأن ينتج عن هذا التصادم تفاعلات تعرف بمجموعة الافتراضات الخاصة بالتصادمات والتفاعلات.
          </p>

          <h4 className="text-3xl font-black text-cyan-400 mb-8 text-center">يكون على نوعين:</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-green-500/10 border-t-4 border-green-500 rounded-3xl">
              <h5 className="text-2xl font-black text-green-400 mb-6">1/ التصادم الفعال</h5>
              <p className="text-gray-200 mb-6">يؤدي إلى حدوث التفاعل وتكوين ناتج مع توفر شرطين:</p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex gap-2">
                  <span className="text-green-500 font-bold">أ/</span> 
                  يجب أن تكون الطاقة الحركية للجزيئات المتصادمة تساوي أو تفوق طاقة التنشيط.
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500 font-bold">ب/</span> 
                  توفر وضع فراغي مناسب (أي اتجاه التصادم مناسب).
                </li>
              </ul>
              <div className="mt-6 p-4 bg-black/40 rounded-xl text-center font-mono" dir="ltr">
                A₂ + B₂ → AB + AB
              </div>
            </div>

            <div className="p-8 bg-red-500/10 border-t-4 border-red-500 rounded-3xl">
              <h5 className="text-2xl font-black text-red-400 mb-6">2/ التصادم غير الفعال</h5>
              <p className="text-gray-200 mb-6">لا يؤدي إلى حدوث التفاعل (لا يتكون ناتج) لأن:</p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex gap-2">
                  <span className="text-red-500 font-bold">أ/</span> 
                  الطاقة الحركية للجزيئات المتصادمة تكون أقل من طاقة التنشيط.
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500 font-bold">ب/</span> 
                  عدم توفر وضع فراغي مناسب (اتجاه غير مناسب).
                </li>
              </ul>
              <div className="mt-6 p-4 bg-black/40 rounded-xl text-center font-mono" dir="ltr">
                AB + AB → تفاعل لا يحدث
              </div>
            </div>
          </div>

          <TeacherNote>
            <ul className="space-y-3">
              <li>1/ إذا كانت التصادم بين الجزيئات ضعيفة فإن جزيئات قابلة للارتداد دون تفاعل.</li>
              <li>2/ إذا كان الطاقة كافية الذي يرجح إلى تفاعل منتج فيجب أن يكون للجزيئات زوايا ومسافات صحيحة بين الذرات.</li>
              <li>3/ تعتبر الطاقة واتجاه التصادم للذرات والجزيئات مهمين في التفاعلات الكيميائية لأنه يؤدي إلى حدوث تفاعل كيميائي.</li>
            </ul>
          </TeacherNote>
        </GlassCard>
      </section>

      {/* طاقة التنشيط Ea */}
      <section id="activation-energy">
        <SectionHeader title="طاقة التنشيط Ea" icon={Zap} />
        <GlassCard page="209">
          <Definition title="طاقة التنشيط Ea">
            الحد الأدنى من الطاقة اللازمة لتحويل المتفاعلات إلى معقد منشط.
          </Definition>

          <p className="text-xl text-gray-300 leading-relaxed my-8">
            إن التفاعلات الطاردة للحرارة تكون تلقائياً مثل عملية تشكل الماء من عنصريه الهيدروجين والأوكسجين حيث هذا التفاعل يكون طارد للحرارة (تلقائي).
          </p>

          <FormulaBox>
            {"2H_2 + O_2 \\rightarrow 2H_2O + \\text{حرارة}"}
          </FormulaBox>

          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl my-10">
            <h5 className="text-xl font-bold text-orange-400 mb-4">س: بما أن التفاعل طارد للحرارة لماذا لا يحدث تفاعل بين الهيدروجين والأوكسجين في الهواء عند درجة 25°C بصورة تلقائية لتشكل الماء؟</h5>
            <p className="text-gray-300 leading-relaxed text-lg">
              وذلك لأن الأمر يحتاج إلى طاقة تسمى بطاقة التنشيط (أي طاقة تنشط الجزيئات) مثال جزيئة الهيدروجين (H-H) والأوكسجين (O=O) تكونان بشكل ثنائي الذرة. فعندما تتقارب الجزيئات تتنافر السحب الإلكترونية ولا تسمح بالتقاء الجزيئات لحدوث التفاعل ولهذا يجب أن تتوفر كمية كافية من الطاقة الحركية للجزيئات المتصادمة لمزج إلكترونات التكافؤ أي تنكسر روابط هذه الأنواع من الجزيئات لكي تتكون روابط جديدة بين ذرات الأوكسجين والهيدروجين. وتوفر مقدار من الطاقة الابتدائية للتغلب على قوى التنافر التي تحصل بين جزيئات المتفاعلات لدى تقاربها وتقوم هذه الطاقة بتنشيط التفاعل.
            </p>
          </div>

          <TeacherNote>
            سير التفاعل يكون دائماً من طاقة المتفاعلات إلى النواتج مروراً بأعلى نقطة يصل إليها وتسمى بمعقد المنشط.
          </TeacherNote>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="p-8 bg-blue-500/10 border border-blue-500/30 rounded-3xl">
              <h6 className="text-blue-400 font-black mb-6 text-2xl text-center">تفاعل ماص</h6>
              <ul className="space-y-4 text-gray-300 text-lg">
                <li className="flex gap-2">تكون تسلسل الطاقة: أعلى طاقة يكون للمعقد المنشط {">"} طاقة النواتج {">"} طاقة المتفاعلات.</li>
                <li className="text-center font-bold text-white text-xl">{"E_a > E'_a"}</li>
                <li className="text-center text-cyan-400">{"\\Delta H = +"} (عملية كسر الرابطة)</li>
              </ul>
            </div>
            <div className="p-8 bg-red-500/10 border border-red-500/30 rounded-3xl">
              <h6 className="text-red-400 font-black mb-6 text-2xl text-center">تفاعل طارد</h6>
              <ul className="space-y-4 text-gray-300 text-lg">
                <li className="flex gap-2">تكون تسلسل الطاقة: أعلى طاقة يكون للمعقد المنشط {">"} طاقة المتفاعلات {">"} طاقة النواتج.</li>
                <li className="text-center font-bold text-white text-xl">{"E_a < E'_a"}</li>
                <li className="text-center text-orange-400">{"\\Delta H = -"} (عملية تكوين الرابطة)</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center mb-10">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-cyan-400 font-bold block mb-2">Ea</span>
              <span className="text-gray-200">طاقة التنشيط للتفاعل الأمامي</span>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-orange-400 font-bold block mb-2">E'a</span>
              <span className="text-gray-200">طاقة التنشيط للتفاعل العكسي</span>
            </div>
          </div>

          <FormulaBox label="العلاقة بين السرعة وطاقة التنشيط">
            {"R = \\frac{1}{E_a}"}
          </FormulaBox>

          <TeacherNote>
            <ul className="space-y-3 text-lg">
              <li>1/ الفرق بين طاقة التنشيط للتفاعلين الأمامي والعكسي يساوي التغير في المحتوى الحراري.</li>
              <li>2/ قيمة ΔH لها نفس القيمة للتفاعلين الأمامي والعكسي ولكنها تختلف في الإشارة.</li>
              <li>3/ طاقة تنشيط دائماً تكون ذو قيمة موجبة وذلك لأنه طاقة ممتصة.</li>
              <li>4/ كمية الطاقة اللازمة لحدوث معقد منشط هو طاقة تنشيط.</li>
              <li>5/ الحد الأدنى للطاقة لكي يكون التصادم فعالاً يسمى طاقة التنشيط.</li>
              <li>6/ الطاقة اللازمة لرفع المتفاعلات إلى مستوى معقد منشط هو طاقة التنشيط.</li>
              <li>7/ كلما قلت مستوى طاقة التنشيط فإن التفاعل يكون أسرع. لأن نسبة عدد جزيئات المتصادمة تزداد التي لها طاقة مساوية أو تفوق طاقة التنشيط.</li>
              <li>8/ أحياناً لا يحدث تفاعل كيميائي حتى وإن كان للتصادم طاقة تفوق طاقة التنشيط؟ بسبب عدم توفر اتجاه مناسب للجزيئات المتصادمة.</li>
            </ul>
          </TeacherNote>
        </GlassCard>
      </section>

      {/* المعقد المنشط */}
      <section id="activated-complex">
        <SectionHeader title="المعقد المنشط" icon={Layers} />
        <GlassCard page="210">
          <Definition title="المعقد المنشط">
            التركيب الانتقالي الناتج عن التصادم الفعال والذي يبقى أثناء تكسر الروابط الأصلية وتكون الروابط الجديدة.
            <br />
            أو تركيب في حالة غير مستقرة وهي حالة انتقالية بين المتفاعلات والنواتج في تفاعل كيميائي.
            <br />
            أو هو الأعلى طاقة (في أعلى المنحنى).
          </Definition>

          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl my-10">
            <h5 className="text-xl font-bold text-cyan-400 mb-4">س: متى يتكون المعقد المنشط؟</h5>
            <p className="text-gray-300 text-lg">ج- عندما يرفع التصادم الفعال الطاقات الداخلية للمتفاعلات إلى الحد الأدنى الملائم للتفاعل.</p>
          </div>

          <TeacherNote>
            <ul className="space-y-3 text-lg">
              <li>1/ المعقد المنشط قد يتحول إلى النواتج أو يعيد تكوين المتفاعلات.</li>
              <li>2/ في المعقد المنشط تنكسر روابط وتتكون روابط أخرى. حرارة التفاعل + أو -.</li>
              <li>3/ الروابط في المعقد المنشط تخص المتفاعلات والنواتج معاً.</li>
              <li>4/ يحدث فيه دمج إلكترونات التكافؤ.</li>
              <li>5/ طاقة المعقد المنشط أكبر من طاقة المتفاعلات والنواتج.</li>
              <li>6/ يحتمل أن يتغير إلى ناتج أو متفاعلات.</li>
              <li>7/ طاقة ذات مصدر خارجي عادة يؤدي بالتفاعل أن يكون طارد للحرارة.</li>
            </ul>
          </TeacherNote>

          <div className="p-8 bg-orange-500/5 border border-orange-500/20 rounded-3xl my-10">
            <h5 className="text-xl font-bold text-orange-400 mb-4">علل: تزيد سرعة التفاعل بزيادة درجة الحرارة.</h5>
            <p className="text-gray-300 text-lg">زيادة درجة الحرارة تؤدي إلى زيادة سرعة الجزيئات وزيادة طاقتها الحركية وبالتالي يزداد عدد التصادمات وهذا يزيد عدد الجزيئات التي تمتلك طاقة التنشيط فتزيد سرعة التفاعل.</p>
          </div>

          <div className="p-8 bg-purple-500/5 border border-purple-500/20 rounded-3xl">
            <h5 className="text-xl font-bold text-purple-400 mb-4">ما الفرق بين المعقد المنشط والمواد الوسيطة؟</h5>
            <p className="text-gray-300 text-lg">المعقد المنشط عمره قصير جداً أما المواد الوسيطة فمستقرة نسبياً.</p>
          </div>
        </GlassCard>
      </section>

      {/* القوانين */}
      <section id="laws">
        <SectionHeader title="القوانين" icon={FlaskConical} />
        <GlassCard page="211">
          <div className="overflow-x-auto rounded-3xl border border-white/10">
            <table className="w-full text-center border-collapse bg-black/20">
              <tbody className="text-gray-200 text-xl">
                <tr className="border-b border-white/10">
                  <td className="p-6 bg-white/5 font-bold text-cyan-400">Ea الأمامي</td>
                  <td className="p-6">طاقة المعقد المنشط - طاقة المتفاعل</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-6 bg-white/5 font-bold text-orange-400">E'a العكسي</td>
                  <td className="p-6">طاقة المعقد المنشط - طاقة الناتج</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-6 bg-white/5 font-bold text-cyan-400">ΔH الأمامي</td>
                  <td className="p-6">طاقة الناتج - طاقة المتفاعل</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-6 bg-white/5 font-bold text-orange-400">ΔH العكسي</td>
                  <td className="p-6">طاقة المتفاعل - طاقة الناتج</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-6 bg-white/5 font-bold text-white">ΔH (علاقة Ea)</td>
                  <td className="p-6">Ea - E'a</td>
                </tr>
              </tbody>
            </table>
          </div>

          <TeacherNote>
            <ul className="space-y-3 text-lg">
              <li>1/ العلاقة بين قيمة حرارة التفاعل الأمامي والعكسي هو نفسه ولكن بعكس الإشارة للتفاعل الخلفي.</li>
              <li>2/ مستوى طاقة المتفاعلات تصبح صفراً إذا لم يعطى في السؤال أي من الطاقات. وأيضاً بالنسبة لـ ΔH تصبح أمامي إذا لم يحدد في السؤال.</li>
            </ul>
          </TeacherNote>

          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl my-10">
            <h5 className="text-xl font-bold text-cyan-400 mb-6">توضيح الرموز على المنحنى:</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-300">
              <div className="flex items-center gap-3"><ArrowRight className="text-cyan-500" /> الرمز الذي يمثل طاقة المتفاعلات هو: C</div>
              <div className="flex items-center gap-3"><ArrowRight className="text-cyan-500" /> الرمز الذي يمثل طاقة النواتج هو: B</div>
              <div className="flex items-center gap-3"><ArrowRight className="text-cyan-500" /> الرمز الذي يمثل طاقة المعقد المنشط هو: D</div>
              <div className="flex items-center gap-3"><ArrowRight className="text-cyan-500" /> طاقة D - طاقة C هي طاقة التنشيط للأمامي Ea</div>
              <div className="flex items-center gap-3"><ArrowRight className="text-cyan-500" /> طاقة D - طاقة B هي طاقة التنشيط للعكسي E'a</div>
              <div className="flex items-center gap-3"><ArrowRight className="text-cyan-500" /> طاقة B - طاقة C هي ΔH للتفاعل الأمامي</div>
              <div className="flex items-center gap-3"><ArrowRight className="text-cyan-500" /> طاقة C - طاقة B هي ΔH للتفاعل العكسي</div>
            </div>
          </div>

          <SolvedExample 
            page="211"
            question="مثال: هل التفاعل الأمامي طارد أم ماص للحرارة؟ (بناءً على منحنى طاقته: معقد=60، نواتج=40، متفاعلات=0)"
            solution={
              <div className="space-y-6 text-xl">
                <p>1/ احسب قيمة ΔH أمامي:</p>
                <BlockMath math="\\Delta H = \\text{طاقة النواتج} - \\text{طاقة المتفاعلات}" />
                <BlockMath math="\\Delta H = 40 - 0 = +40 \, kJ/mol" />
                <p className="text-cyan-400 font-bold">بما أن الإشارة موجبة، فالتفاعل ماص للحرارة.</p>
                
                <p>2/ احسب قيمة ΔH عكسي:</p>
                <BlockMath math="0 - 40 = -40 \, kJ/mol" />

                <p>3/ احسب قيمة E'a:</p>
                <BlockMath math="E'_a = \\text{طاقة المعقد المنشط} - \\text{طاقة النواتج}" />
                <BlockMath math="E'_a = 60 - 40 = 20 \, kJ/mol" />

                <p>4/ احسب قيمة Ea:</p>
                <BlockMath math="E_a = \\text{طاقة المعقد المنشط} - \\text{طاقة المتفاعلات}" />
                <BlockMath math="E_a = 60 - 0 = 60 \, kJ/mol" />
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* أمثلة إضافية */}
      <section id="more-examples">
        <SectionHeader title="أمثلة إضافية" icon={Activity} />
        <GlassCard page="212">
          <div className="space-y-12">
            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
              <h5 className="text-xl font-bold text-cyan-400 mb-6">ب- رمز على الشكل: (معقد=80، نواتج=40، متفاعلات=-40)</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xl font-mono" dir="ltr">
                <div className="p-4 bg-black/40 rounded-xl">ΔH (أمامي) = 40 - (-40) = +80 kJ/mol</div>
                <div className="p-4 bg-black/40 rounded-xl">ΔH (عكسي) = (-40) - 40 = -80 kJ/mol</div>
                <div className="p-4 bg-black/40 rounded-xl">Ea = 80 - (-40) = 120 kJ/mol</div>
                <div className="p-4 bg-black/40 rounded-xl">E'a = 80 - 40 = 40 kJ/mol</div>
              </div>
            </div>

            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
              <h5 className="text-xl font-bold text-cyan-400 mb-6">ج- رمز على الشكل: (معقد=20، نواتج=-40، متفاعلات=0)</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xl font-mono" dir="ltr">
                <div className="p-4 bg-black/40 rounded-xl">ΔH (أمامي) = -40 - 0 = -40 kJ/mol</div>
                <div className="p-4 bg-black/40 rounded-xl">ΔH (عكسي) = 0 - (-40) = +40 kJ/mol</div>
                <div className="p-4 bg-black/40 rounded-xl">Ea = 20 - 0 = 20 kJ/mol</div>
                <div className="p-4 bg-black/40 rounded-xl">E'a = 20 - (-40) = 60 kJ/mol</div>
              </div>
            </div>

            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
              <h5 className="text-xl font-bold text-cyan-400 mb-6">د- رمز على الشكل: (معقد=70، نواتج=10، متفاعلات=0)</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xl font-mono" dir="ltr">
                <div className="p-4 bg-black/40 rounded-xl">ΔH (أمامي) = 10 - 0 = +10 kJ/mol</div>
                <div className="p-4 bg-black/40 rounded-xl">ΔH (عكسي) = 0 - 10 = -10 kJ/mol</div>
                <div className="p-4 bg-black/40 rounded-xl">Ea = 70 - 0 = 70 kJ/mol</div>
                <div className="p-4 bg-black/40 rounded-xl">E'a = 70 - 10 = 60 kJ/mol</div>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* بنك الأسئلة 1 */}
      <section id="quiz-1">
        <SectionHeader title="بنك الأسئلة" subtitle="طاقة التنشيط والمعقد المنشط" icon={BookOpen} />
        <GlassCard page="213">
          <SolvedExample 
            page="213"
            question="س/ في التفاعل الرمزي A + B → X تساوي طاقة التنشيط للاتجاه الأمامي 85 kJ/mol وللاتجاه العكسي 80 kJ/mol. والمطلوب: أ/ أيهما يحتوي على طاقة أكبر، المتفاعلات أم النواتج؟ ب/ ما قيمة حرارة التفاعل في الاتجاه الأمامي؟"
            solution={
              <div className="space-y-4 text-xl">
                <p>أ- النواتج (لأن Ea {'>'} E'a في التفاعل الماص).</p>
                <p>ب- ΔH أمامي = الفرق بين Ea و E'a</p>
                <BlockMath math="\\Delta H = E_a - E'_a" />
                <BlockMath math="\\Delta H = 85 - 80 = 5 \, kJ" />
              </div>
            }
          />

          <div className="space-y-8 mt-12">
            <Quiz 
              page="213"
              question="1/ لكي يكون التصادم فعالاً يلزمه أن يكون؟"
              options={["ذات طاقة كافية فقط", "ذات اتجاه مناسب", "ذات طاقة واتجاه مناسبين", "ذات آلية تفاعل"]}
              correctAnswer={2}
            />
            <Quiz 
              page="213"
              question="2/ طاقة معقد المنشط مقارنة بطاقات المتفاعلات والنواتج يكون؟"
              options={["أقل من طاقتي المتفاعلات والنواتج", "أكبر من طاقة المتفاعلات لكنها أقل من طاقة النواتج", "أقل من طاقة المتفاعلات لكنها أكبر من طاقة النواتج", "أكبر من طاقتي المتفاعلات والنواتج"]}
              correctAnswer={3}
            />
            <Quiz 
              page="213"
              question="3/ ماذا يحدث في المعقد المنشط؟"
              options={["تتكون روابط", "تتكون روابط أو تتكسر الروابط", "تتكسر روابط", "ينتج حفاز"]}
              correctAnswer={1}
            />
            <Quiz 
              page="213"
              question="4/ لتفاعل ما ΔH أمامي = -150 kJ/mol و E'a = +250 kJ/mol ومستوى طاقة للمتفاعلات = صفر فإن طاقة المعقد المنشط تساوي؟"
              options={["+100 KJ", "+150 KJ", "+250 KJ", "+400 KJ"]}
              correctAnswer={0}
            />
            <Quiz 
              page="213"
              question="5/ إذا كانت قيمة Ea = 90 KJ و E'a = 60 KJ وكانت مستوى طاقة المتفاعلات تساوي -10 KJ جد طاقة النواتج؟"
              options={["20 KJ", "40 KJ", "30 KJ", "10 KJ"]}
              correctAnswer={0}
            />
            <Quiz 
              page="213"
              question="6/ إذا كانت حرارة التفاعل العكسي موجبة فإن:"
              options={["المتفاعلات أكثر استقرار من النواتج", "E'a < Ea", "Ea < E'a", "معاً (C,A)"]}
              correctAnswer={2}
            />
            <Quiz 
              page="214"
              question="7/ إذا كانت طاقة المعقد المنشط (80 KJ) وطاقة النواتج (60 KJ) وطاقة التنشيط للتفاعل الأمامي (100 KJ) أوجد ΔH للتفاعل العكسي بـ KJ:"
              options={["-60", "+60", "-80", "+80"]}
              correctAnswer={1}
            />
            <Quiz 
              page="214"
              question="8/ عندما تكون قيمة ΔH عكسي = -80 KJ و Ea = +170 KJ فطاقة المعقد المنشط هي:"
              options={["80 KJ", "90 KJ", "170 KJ", "250 KJ"]}
              correctAnswer={1}
            />
          </div>
        </GlassCard>
      </section>

      {/* معدل سرعة التفاعل الكيميائي */}
      <section id="reaction-rate-average">
        <SectionHeader title="معدل سرعة التفاعل الكيميائي" icon={Clock} />
        <GlassCard page="215">
          <Definition title="معدل سرعة التفاعل">
            هي مقدار التغير في تراكيز المتفاعلات خلال وحدة الزمن عند حدوث تفاعل.
          </Definition>

          <div className="space-y-4 my-8">
            <h5 className="text-2xl font-black text-white">شرطا حدوث التفاعل الكيميائي:</h5>
            <ul className="space-y-3 text-gray-300 text-xl">
              <li className="flex items-center gap-3"><ArrowRight className="text-cyan-500" /> 1- اتجاه مناسب للتصادم.</li>
              <li className="flex items-center gap-3"><ArrowRight className="text-cyan-500" /> 2- طاقة تنشيط كافية.</li>
            </ul>
          </div>

          <FormulaBox label="قانون سرعة التفاعل">
            {"R = \\frac{\\pm \\Delta [ ]}{\\Delta t} \\quad \\text{or} \\quad \\frac{\\pm \\Delta \\text{mol}}{\\Delta t} \\quad \\text{or} \\quad \\frac{\\pm \\Delta V}{\\Delta t}"}
          </FormulaBox>

          <TeacherNote>
            التغير في التركيز يكون موجباً دائماً.
          </TeacherNote>

          <TeacherNote>
            <ul className="space-y-3 text-lg">
              <li>1/ تركيز النواتج في بداية التفاعل يساوي صفر.</li>
              <li>2/ تركيز متفاعل يساوي صفر عند: أ/ استهلك التفاعل بشكل تام أو كلياً. ب/ عند توقف التفاعل.</li>
            </ul>
          </TeacherNote>

          <SolvedExample 
            page="215"
            question="س1/ في التفاعل التالي H₂ + Cl₂ → 2HCl يتغير تركيز الهيدروجين من 6M إلى 2M خلال 2 دقيقة. ما معدل سرعة التفاعل بـ M/s؟"
            solution={
              <div className="space-y-6 text-2xl font-mono text-center" dir="ltr">
                <BlockMath math="R = \\frac{\\pm \\Delta [ ]}{\\Delta t}" />
                <BlockMath math="R = \\frac{6 - 2}{120 \, s}" />
                <BlockMath math="R = 0.033 \, M.s^{-1}" />
              </div>
            }
          />

          <SolvedExample 
            page="215"
            question="س2/ في التفاعل التالي CaS + CuSO₄ → CaSO₄ + CuS يترسب 3g من كبريتيد النحاس ذو كتلة مولية 95.5 g/mol خلال دقيقة و10 ثواني ما معدل سرعة التفاعل بـ mol/s؟"
            solution={
              <div className="space-y-6 text-2xl font-mono text-center" dir="ltr">
                <p className="text-right text-gray-400 font-sans" dir="rtl">أولاً نجد عدد المولات:</p>
                <BlockMath math="n = \\frac{3}{95.5} = 0.03 \, mol" />
                <p className="text-right text-gray-400 font-sans" dir="rtl">ثانياً نطبق القانون:</p>
                <BlockMath math="R = \\frac{\\pm \\Delta \\text{mol}}{\\Delta t}" />
                <BlockMath math="R = \\frac{0.03 - 0}{70 \, s}" />
                <BlockMath math="R = 0.000428 \, mol.s^{-1}" />
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الصفحة 11 */}
      <section id="page-11-examples">
        <GlassCard page="216">
          <SolvedExample 
            page="216"
            question="س3/ وضعت قطعة من فلز الصوديوم كتلتها 5g في 100g من الماء، وبعد مضي 15s تجمع 14.8 ml من غاز الهيدروجين. حسب المعادلة التالية ما معدل سرعة التفاعل بـ ml/s؟"
            solution={
              <div className="space-y-6 text-2xl font-mono text-center" dir="ltr">
                <BlockMath math="2Na + H_2O \\rightarrow 2NaOH + H_2" />
                <BlockMath math="R = \\frac{\\pm \\Delta V}{\\Delta t}" />
                <BlockMath math="R = \\frac{14.8}{15}" />
                <BlockMath math="R = 0.98 \, ml/s" />
              </div>
            }
          />

          <SolvedExample 
            page="216"
            question="س4/ وفق التفاعل التالي: Zn(s) + 2H3O+(aq) + 2Cl-(aq) → Zn+2(aq) + 2Cl-(aq) + H2(g) + 2H2O(l). إذا تفاعل 0.13g من الخارصين تماماً خلال 20 ثانية فما معدل سرعة التفاعل بـ mol/s خلال هذه المدة. (Zn = 65.39 g/mol)"
            solution={
              <div className="space-y-6 text-2xl font-mono text-center" dir="ltr">
                <p className="text-right text-gray-400 font-sans" dir="rtl">أولاً نجد عدد المولات:</p>
                <BlockMath math="n = \\frac{0.13}{65.39} = 0.00198 \, mol" />
                <p className="text-right text-gray-400 font-sans" dir="rtl">ثانياً نطبق القانون:</p>
                <BlockMath math="R = \\frac{\\pm \\Delta \\text{mol}}{\\Delta t}" />
                <BlockMath math="R = \\frac{0.00198}{20}" />
                <BlockMath math="R = 9.94 \\times 10^{-5} \, mol/s" />
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الصفحة 12: مراجعة القسم 1-6 */}
      <section id="section-1-6-review">
        <SectionHeader title="مراجعة القسم 1-6" icon={BookOpen} />
        <GlassCard page="217">
          <div className="space-y-8">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-xl font-bold text-cyan-400 mb-4">1. وضح المقصود بكل مما يلي: آلية التفاعل، طاقة التنشيط، المعقد المنشط.</h5>
              <p className="text-gray-300 leading-relaxed">
                - آلية التفاعل: سلسلة الخطوات التي يحدث بموجبها التفاعل.
                <br />
                - طاقة التنشيط: هي أدنى طاقة لازمة لتحويل المتفاعلات إلى معقد منشط.
                <br />
                - المعقد المنشط: هو تركيب انتقالي ينتج عن التصادم الفعال الذي يستمر حتى تنكسر الروابط الأصلية وتتكون روابط جديدة.
              </p>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-xl font-bold text-cyan-400 mb-4">2. ما العوامل التي تحدد إمكانية حدوث تفاعل نتيجة لتصادم جزيئي؟</h5>
              <p className="text-gray-300 leading-relaxed">
                يحدث التفاعل إذا احتوت الأنواع الداخلة في التصادم على كمية كافية من الطاقة، وكانت في الاتجاه الصحيح بعضها تجاه بعض.
              </p>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-xl font-bold text-cyan-400 mb-4">3. وضح العلاقة بين طاقة التنشيط وطاقة التفاعل.</h5>
              <p className="text-gray-300 leading-relaxed">
                طاقة التفاعل هي الفرق بين طاقتي تنشيط التفاعل الأمامي والعكسي.
              </p>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-xl font-bold text-cyan-400 mb-4">4. ما الفرق بين المعقد المنشط والمركب الوسيط؟</h5>
              <p className="text-gray-300 leading-relaxed">
                في المعقد المنشط، تتكسر الروابط جزئياً وتتشكل جزئياً، بحيث يمثل ذلك المعقد أقصى قيمة في مقدار الطاقة. والوسيط هو النوع الذي يتكون في خطوة واحدة من خطوات آلية التفاعل، ليتفاعل في الخطوة التالية ويمثل الحد الأدنى في مقدار الطاقة.
              </p>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-xl font-bold text-cyan-400 mb-4">5. علل: لا يحدث تفاعل أحياناً حتى وإن كان للتصادم طاقة تفيض عن طاقة التنشيط.</h5>
              <p className="text-gray-300 leading-relaxed">
                لحدوث أي تفاعل، من الضروري أن يكون التصادم ذا طاقة كافية، ويجب أن تكون الجزيئات في الاتجاه المناسب لحظة التصادم. لا تلبي كافة الجزيئات هذين المتطلبين في العادة.
              </p>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-xl font-bold text-cyan-400 mb-4">6. تفكير ناقد: أي مما يلي يتوافق مع معدل التفاعل الأسرع: آلية ذات طاقة تنشيط قليلة أم آلية ذات طاقة تنشيط كبيرة؟ برز إجابتك.</h5>
              <p className="text-gray-300 leading-relaxed">
                الآلية ذات طاقة تنشيط قليلة. والسبب أن عدداً أكبر من التصادمات الجزيئية قادرة على تخطي طاقة التنشيط.
              </p>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* القسم 5-2: الكيمياء الحركية */}
      <section id="section-5-2">
        <SectionHeader title="القسم 5-2" subtitle="الكيمياء الحركية" icon={Activity} />
        <GlassCard page="218">
          <Definition title="الكيمياء الحركية">
            فرع الكيمياء الذي يعنى بسرعة التفاعل الكيميائي وآلياته.
          </Definition>

          <TeacherNote>
            <ul className="space-y-3">
              <li>1/ العلاقة الرياضية التي تربط سرعة التفاعل بالتركيز هو الكيمياء الحركية.</li>
              <li>2/ سرعة التفاعل تعتمد على عدد تصادمات بين المواد المتفاعلة وفعاليته.</li>
              <li>3/ لحدوث التفاعل يجب أن يكون الجسيمات في تماس مع بعضها في الاتجاه وأيضاً بطاقة تنشيط كافية.</li>
            </ul>
          </TeacherNote>

          <h4 className="text-3xl font-black text-white mb-8 border-r-4 border-cyan-500 pr-4">العوامل المؤثرة في سرعة التفاعل:</h4>
          
          <div className="space-y-12">
            {/* 1. طبيعة المتفاعلات */}
            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
              <h5 className="text-2xl font-bold text-cyan-400 mb-6">1- طبيعة المتفاعلات:</h5>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                تعتمد سرعة التفاعل على طبيعة المتفاعلات (نشط وغير نشط) والروابط الكيميائية المتعلقة بالتفاعل (المتكسرة والمتكونة) أي يتفاعل الهيدروجين بشدة مع الكلور بينما يتفاعل الهيدروجين ببطئ مع النايتروجين. وذلك لأن سرعة التفاعل تعتمد على طبيعة متفاعلات والروابط الكيميائية (أي هناك روابط تنكسر وتتكون).
              </p>
              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-center border-collapse bg-black/20">
                  <thead>
                    <tr className="bg-cyan-900/50 text-white">
                      <th className="p-4 border-b border-white/10">الفعالية</th>
                      <th className="p-4 border-b border-white/10">الروابط</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-white/5">
                      <td className="p-4">تكون أسرع: <InlineMath math="Na + O_2" /></td>
                      <td className="p-4">أسرع بسبب الروابط القليلة: <InlineMath math="H_2 + Cl_2" /></td>
                    </tr>
                    <tr>
                      <td className="p-4">تكون أبطئ: <InlineMath math="Fe + O_2" /></td>
                      <td className="p-4">أبطئ بسبب الروابط الكثيرة: <InlineMath math="H_2 + N_2" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-6 bg-orange-500/5 border border-orange-500/20 rounded-2xl">
                <p className="text-gray-300"><span className="text-orange-400 font-bold">علل:</span> تتفاعل المركبات الأيونية في المحلول أسرع من تفاعلها في حالة المادة الصلبة.</p>
                <p className="text-gray-400 mt-2">ج- تكون الأيونات في المحلول حرة الحركة أكثر مما هي في المادة الصلبة وبذلك تزداد فرص التصادمات في حالة المحلول.</p>
              </div>
            </div>

            {/* 2. المساحة السطحية */}
            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
              <h5 className="text-2xl font-bold text-cyan-400 mb-6">2- المساحة السطحية:</h5>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                تزداد سرعة التفاعل بزيادة مساحة سطح التماس بين المواد المتفاعلة في التفاعلات غير المتجانسة.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-gray-300"><span className="text-cyan-400 font-bold">علل:</span> تفاعل مسحوق الخارصين مع حمض الهيدروكلوريك أسرع من تفاعل مكعب منه مع الحمض.</p>
                  <p className="text-gray-400 mt-2">ج- في المسحوق تكون المساحة المعرضة للتفاعل أكبر بكثير من مساحة المكعب السطحية.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-gray-300"><span className="text-cyan-400 font-bold">علل:</span> قطع الفحم الصغيرة أسرع اشتعالاً من قطع الفحم الكبيرة.</p>
                  <p className="text-gray-400 mt-2">ج- في القطع الصغيرة تكون مساحة سطح التفاعل أكبر.</p>
                </div>
              </div>
              <div className="mt-6 p-6 bg-red-500/5 border border-red-500/20 rounded-2xl">
                <p className="text-gray-300"><span className="text-red-400 font-bold">علل:</span> حصول انفجار في بعض مناجم الفحم؟</p>
                <p className="text-gray-400 mt-2">ج- بسبب زيادة المساحة السطحية للفحم (مسحوقه) وتعرضه للأوكسجين يكون أكبر وأي شرارة بسيطة يسبب تفاعلاً سريعاً ويؤدي للانفجار.</p>
              </div>
              <div className="mt-6 p-6 bg-green-500/5 border border-green-500/20 rounded-2xl">
                <p className="text-gray-300"><span className="text-green-400 font-bold">علل:</span> الحفازات غير المتجانسة المسماة بالحفازات السطحية تعمل أفضل عندما تكون مسحوقاً دقيقاً.</p>
                <p className="text-gray-400 mt-2">ج- لأن المسحوق الدقيق له مساحة سطحية أكبر وعليها تمتز الجسيمات مما يزيد من تركيز المتفاعلات وبذلك تزداد عدد التصادمات الفعالة بين جسيمات المتفاعلات.</p>
              </div>
            </div>

            {/* 3. درجة الحرارة */}
            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
              <h5 className="text-2xl font-bold text-cyan-400 mb-6">3- درجة الحرارة:</h5>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                زيادة درجة الحرارة يؤدي إلى زيادة الطاقة الحركية للجسيمات (طاقة التصادم) وزيادة عدد التصادمات الفعالة وبالتالي زيادة سرعة التفاعل.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-gray-300"><span className="text-cyan-400 font-bold">علل:</span> تزداد سرعة التفاعل الكيميائي بزيادة درجة الحرارة.</p>
                  <p className="text-gray-400 mt-2">ج- لأن الطاقة الحركية للجسيمات تزداد وبالتالي يزداد عدد التصادمات الفعالة.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-gray-300"><span className="text-cyan-400 font-bold">علل:</span> يجب تبريد الأطعمة؟</p>
                  <p className="text-gray-400 mt-2">ج- وذلك لأن بارتفاع درجة الحرارة تزداد نشاطية بكتريا ويؤدي ذلك إلى زيادة في سرعة التفاعل على الطعام ويزيد من سرعة تلفه.</p>
                </div>
              </div>
            </div>

            {/* 4. التركيز */}
            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
              <h5 className="text-2xl font-bold text-cyan-400 mb-6">4- التركيز:</h5>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                في التفاعلات المتجانسة تعتمد سرعة التفاعل على تراكيز المتفاعلات حيث كلما زاد تركيز واحد أو أكثر من المتفاعلات ازداد عدد تصادمات الفعالة بين المتفاعلات وبذلك تزداد سرعة التفاعل.
              </p>
              <div className="p-6 bg-black/40 rounded-2xl border border-white/10 mb-6">
                <p className="text-gray-300 leading-relaxed">
                  <span className="text-cyan-400 font-bold">مثال /</span> الأوكسجين النقي تركيزه أكبر بـ 5 مرات من تركيز الأوكسجين في الهواء (فإن الضوء المنبعث من قطعة فحم مشتعلة في الأوكسجين النقي يكون أقوى من الضوء المنبعث عند حرقه في الهواء) إن تأكسد الفحم هو نوع من التفاعلات الغير متجانسة الذي يكون فيه أحد المتفاعلات غاز ولا تعتمد على المساحة السطحية للفحم فقط بل تعتمد على تركيز الأوكسجين أيضاً.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-gray-300"><span className="text-cyan-400 font-bold">علل:</span> احتراق الكربون في الأكسجين النقي أسرع من احتراقه في الهواء (في ضوء نظرية التصادم)؟</p>
                  <p className="text-gray-400 mt-2">ج- لأن تركيز الأكسجين يكون أعلى وبالتالي عدد التصادمات الفعالة يكون أكبر.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-gray-300"><span className="text-cyan-400 font-bold">علل:</span> احتراق الكربون في الأكسجين نقي أسرع من تفاعله مع أكسجين الهواء الجوي؟</p>
                  <p className="text-gray-400 mt-2">ج- لأن تركيز الأكسجين في حالة النقية أكثر من تركيزه في الهواء النقي وسرعة التفاعل تزداد بزيادة تركيز المتفاعلات.</p>
                </div>
              </div>
              <TeacherNote>
                <ul className="space-y-3">
                  <li>أ / بزيادة الضغط الغاز تزداد سرعة التفاعل. وذلك لأن الضغط يؤدي تقليل حجم الغاز أي تقارب الجزيئات مع بعضها وتزداد عدد التصادمات وتزداد سرعة التفاعل.</li>
                  <li>ب / عند وضع Mg في حمض خل المركز يزداد سرعة التفاعل بسبب زيادة تركيز الخل.</li>
                  <li>جـ / تتفاعل مركبات الأيونية في المحلول أسرع مما هي في حالة الصلبة. وذلك بسبب زيادة عدد التصادمات.</li>
                </ul>
              </TeacherNote>
            </div>

            {/* 5. وجود الحفازات */}
            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
              <h5 className="text-2xl font-bold text-cyan-400 mb-6">5- وجود الحفازات:</h5>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                عند إضافة الحفاز إلى التفاعل تزداد سرعة التفاعل وذلك لأن الحفاز يؤدي إلى تكوين معقد منشط جديد وبطاقة تنشيط أقل مما يؤدي إلى زيادة عدد التصادمات الفعالة بين المتفاعلات وبذلك تزداد سرعة التفاعل.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                  <span className="text-cyan-400 font-bold block mb-2">الحفاز:</span>
                  <p className="text-gray-300">مادة تغير سرعة التفاعل الكيميائي دون أن تستهلك.</p>
                </div>
                <div className="p-6 bg-orange-500/10 rounded-2xl border border-orange-500/20">
                  <span className="text-orange-400 font-bold block mb-2">التحفيز:</span>
                  <p className="text-gray-300">فعل الحفاز أي عملية تزيد سرعة التفاعل باستخدام حفاز.</p>
                </div>
              </div>
              <TeacherNote>
                <ul className="space-y-2">
                  <li>* يشارك الحفاز في إحدى خطوات التفاعل.</li>
                  <li>* يمكن استعادة الحفاز في خطوة لاحقة.</li>
                  <li>* لا يظهر الحفاز كأحد نواتج التفاعل النهائية.</li>
                </ul>
              </TeacherNote>

              <div className="p-8 bg-black/40 rounded-3xl border border-white/10 my-10">
                <h5 className="text-xl font-bold text-cyan-400 mb-4">مثال: تفكك بيروكسيد الهيدروجين H₂O₂</h5>
                <p className="text-gray-300 leading-relaxed">
                  الحفاز هنا هو MnO₂ (مادة سوداء اللون توضع في الكأس زجاجية ويضاف إليها تدريجياً وبالتنقيط 30% من محلول H₂O₂ حيث يتفكك إلى O₂ و H₂O على شكل غاز بسبب الحرارة المنطلقة من التفاعل تسبب تبخر معظم الماء المتكون).
                </p>
              </div>

              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                <h5 className="text-xl font-bold text-cyan-400 mb-4">س/ كيف يؤثر الحفاز في طاقة التنشيط؟</h5>
                <p className="text-gray-300 text-lg leading-relaxed">
                  جواب / يؤدي إلى تكوين مسار جديد أي تكوين معقد منشط جديد بطاقة تنشيط أقل. إذاً الحفاز يقلل من طاقة التنشيط.
                </p>
                <p className="text-white font-bold mt-4 text-center text-xl">
                  طاقة المعقد المنشط في التفاعل المحفز أقل من طاقة المعقد المنشط في التفاعل غير المحفز.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                <div className="p-6 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                  <span className="text-cyan-400 font-bold block mb-2">الحفاز المتجانس:</span>
                  <p className="text-gray-300">الحفاز الذي يكون في نفس الحالة الفيزيائية للمتفاعلات والنواتج.</p>
                </div>
                <div className="p-6 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                  <span className="text-purple-400 font-bold block mb-2">الحفاز غير المتجانس:</span>
                  <p className="text-gray-300">الحفاز الذي يختلف في الحالة الفيزيائية للمتفاعلات والنواتج.</p>
                </div>
              </div>

              <TeacherNote>
                <ul className="space-y-3">
                  <li>1/ من الأمثلة على الحفاز غير المتجانس: المعادن (بسبب حصول عملية الامتزاز وهي تمثل التصاق المتفاعلات على سطح المعدن مما يزيد من تركيز المتفاعلات وزيادة عدد تصادمات الفعالة وتزداد سرعة التفاعل).</li>
                  <li>2/ تعمل الحفازات الغير متجانسة بشكل أفضل عندما تكون على شكل مسحوق. وذلك كبر مساحة السطحية للمسحوق وامتزاز الجسيمات عليه يكون أكبر مما يؤدي إلى زيادة عدد التصادمات الفعالة بين جسيمات المتفاعلة والتركيز أيضاً ويزداد سرعة التفاعل.</li>
                </ul>
              </TeacherNote>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 16: مراجعة القسم 5-2 */}
      <section id="section-5-2-review">
        <SectionHeader title="مراجعة القسم 5-2" icon={BookOpen} />
        <GlassCard page="219">
          <div className="space-y-8">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-xl font-bold text-cyan-400 mb-4">1. ما العوامل الخمسة التي تؤثر في سرعة التفاعل؟</h5>
              <p className="text-gray-300 leading-relaxed">
                1- طبيعة المتفاعلات. 2- المساحة السطحية. 3- درجة الحرارة. 4- التركيز. 5- وجود الحفازات.
              </p>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-xl font-bold text-cyan-400 mb-4">2. وضح تأثير الحفاز في سرعة التفاعل.</h5>
              <p className="text-gray-300 leading-relaxed">
                يزيد الحفاز من سرعة التفاعل من خلال توفير مسار بديل للتفاعل ذي طاقة تنشيط أقل.
              </p>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-xl font-bold text-cyan-400 mb-4">3. وضح الفرق بين الحفاز المتجانس والحفاز غير المتجانس.</h5>
              <p className="text-gray-300 leading-relaxed">
                الحفاز المتجانس يكون في نفس الحالة الفيزيائية للمتفاعلات، بينما الحفاز غير المتجانس يكون في حالة فيزيائية مختلفة عن المتفاعلات.
              </p>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-xl font-bold text-cyan-400 mb-4">4. علل: تزداد سرعة التفاعل بزيادة تركيز المتفاعلات.</h5>
              <p className="text-gray-300 leading-relaxed">
                تؤدي زيادة التركيز إلى زيادة عدد الجسيمات في وحدة الحجم، مما يزيد من فرص التصادمات بينها، وبالتالي تزداد سرعة التفاعل.
              </p>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-xl font-bold text-cyan-400 mb-4">5. فسر كيف تزيد المساحة السطحية من سرعة التفاعل.</h5>
              <p className="text-gray-300 leading-relaxed">
                تزيد المساحة السطحية من عدد الجسيمات المعرضة للتصادم في التفاعلات غير المتجانسة، مما يزيد من معدل التصادمات الكلي وسرعة التفاعل.
              </p>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* القسم 5-3: قوانين السرعة */}
      <section id="section-5-3">
        <SectionHeader title="القسم 5-3" subtitle="قوانين السرعة" icon={TrendingUp} />
        <GlassCard page="220">
          <Definition title="قانون السرعة">
            علاقة رياضية تربط سرعة التفاعل بتركيز المتفاعلات.
          </Definition>

          <FormulaBox label="الصيغة العامة لقانون السرعة">
            {"R = k [A]^n [B]^m"}
          </FormulaBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-cyan-400 font-bold block mb-2">R:</span>
              <p className="text-gray-300">سرعة التفاعل (M/s).</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-orange-400 font-bold block mb-2">k:</span>
              <p className="text-gray-300">ثابت سرعة التفاعل.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-green-400 font-bold block mb-2">n, m:</span>
              <p className="text-gray-300">رتب المتفاعلات (تحدد تجريبياً).</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-purple-400 font-bold block mb-2">[A], [B]:</span>
              <p className="text-gray-300">تراكيز المواد المتفاعلة (M).</p>
            </div>
          </div>

          <TeacherNote>
            <ul className="space-y-3">
              <li>1/ رتبة التفاعل (n, m) لا تشتق من المعاملات في المعادلة الموزونة بل تحدد تجريبياً.</li>
              <li>2/ الرتبة الكلية للتفاعل هي مجموع رتب المتفاعلات (n + m).</li>
              <li>3/ ثابت السرعة (k) يتغير بتغير درجة الحرارة فقط.</li>
            </ul>
          </TeacherNote>

          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl my-10">
            <h5 className="text-xl font-bold text-cyan-400 mb-6">رتب التفاعل الشائعة:</h5>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-black/20 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center font-bold text-cyan-400">0</div>
                <div>
                  <h6 className="text-white font-bold">الرتبة صفر:</h6>
                  <p className="text-gray-400">تغير التركيز لا يؤثر على سرعة التفاعل.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-black/20 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center font-bold text-cyan-400">1</div>
                <div>
                  <h6 className="text-white font-bold">الرتبة الأولى:</h6>
                  <p className="text-gray-400">مضاعفة التركيز تؤدي لمضاعفة السرعة مرتين.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-black/20 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center font-bold text-cyan-400">2</div>
                <div>
                  <h6 className="text-white font-bold">الرتبة الثانية:</h6>
                  <p className="text-gray-400">مضاعفة التركيز تؤدي لمضاعفة السرعة 4 مرات.</p>
                </div>
              </div>
            </div>
          </div>

          <SolvedExample 
            page="221"
            question="س1/ تفاعل من الرتبة الأولى للمتفاعل A، إذا كان تركيز A يساوي 0.2M وثابت السرعة k = 0.5 s⁻¹، احسب سرعة التفاعل."
            solution={
              <div className="space-y-6 text-2xl font-mono text-center" dir="ltr">
                <BlockMath math="R = k [A]^1" />
                <BlockMath math="R = 0.5 \\times 0.2" />
                <BlockMath math="R = 0.1 \, M/s" />
              </div>
            }
          />

          <SolvedExample 
            page="222"
            question="س2/ تفاعل افتراضي A + B → C، وجد تجريبياً أن مضاعفة تركيز A مرتين يضاعف السرعة مرتين، ومضاعفة تركيز B مرتين يضاعف السرعة 4 مرات. اكتب قانون السرعة وحدد الرتبة الكلية."
            solution={
              <div className="space-y-6 text-xl">
                <p className="text-right" dir="rtl">1- بما أن مضاعفة [A] مرتين ضاعف السرعة مرتين، فإن رتبة A هي (1).</p>
                <p className="text-right" dir="rtl">2- بما أن مضاعفة [B] مرتين ضاعف السرعة 4 مرات (2²)، فإن رتبة B هي (2).</p>
                <div className="font-mono text-center" dir="ltr">
                  <BlockMath math="R = k [A]^1 [B]^2" />
                  <p className="text-cyan-400 font-sans" dir="rtl">الرتبة الكلية = 1 + 2 = 3 (من الرتبة الثالثة)</p>
                </div>
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الصفحة 21: مثال الجداول */}
      <section id="page-21-table-example">
        <GlassCard page="223" title="تحديد قانون السرعة من البيانات التجريبية">
          <SolvedExample 
            page="223"
            question="س3/ من البيانات في الجدول التالي للتفاعل: A + B → C. حدد قانون السرعة وقيمة k."
            solution={
              <div className="space-y-8">
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full text-center border-collapse bg-black/20 font-mono" dir="ltr">
                    <thead>
                      <tr className="bg-cyan-900/50 text-white">
                        <th className="p-4 border-b border-white/10">التجربة</th>
                        <th className="p-4 border-b border-white/10">[A] M</th>
                        <th className="p-4 border-b border-white/10">[B] M</th>
                        <th className="p-4 border-b border-white/10">السرعة M/s</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-white/5">
                        <td className="p-4">1</td>
                        <td className="p-4">0.1</td>
                        <td className="p-4">0.1</td>
                        <td className="p-4">2.0 x 10⁻³</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="p-4">2</td>
                        <td className="p-4">0.2</td>
                        <td className="p-4">0.1</td>
                        <td className="p-4">4.0 x 10⁻³</td>
                      </tr>
                      <tr>
                        <td className="p-4">3</td>
                        <td className="p-4">0.1</td>
                        <td className="p-4">0.2</td>
                        <td className="p-4">8.0 x 10⁻³</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="space-y-4 text-xl leading-relaxed">
                  <p className="text-right" dir="rtl">1- نجد رتبة A من التجربتين (1 و 2): عند مضاعفة [A] مرتين مع ثبات [B]، تضاعفت السرعة مرتين. إذاً رتبة A هي (1).</p>
                  <p className="text-right" dir="rtl">2- نجد رتبة B من التجربتين (1 و 3): عند مضاعفة [B] مرتين مع ثبات [A]، تضاعفت السرعة 4 مرات (2²). إذاً رتبة B هي (2).</p>
                  <div className="font-mono text-center" dir="ltr">
                    <BlockMath math="R = k [A]^1 [B]^2" />
                  </div>
                  <p className="text-right" dir="rtl">3- لحساب k نعوض بيانات التجربة (1):</p>
                  <div className="font-mono text-center" dir="ltr">
                    <BlockMath math="2.0 \\times 10^{-3} = k (0.1)^1 (0.1)^2" />
                    <BlockMath math="k = \\frac{2.0 \\times 10^{-3}}{10^{-3}} = 2.0 \, M^{-2}.s^{-1}" />
                  </div>
                </div>
              </div>
            }
          />
        </GlassCard>
      </section>

      {/* الصفحة 23: وحدات ثابت السرعة k */}
      <section id="rate-constant-units">
        <SectionHeader title="وحدات ثابت السرعة k" icon={Layers} />
        <GlassCard page="225">
          <div className="overflow-x-auto rounded-3xl border border-white/10">
            <table className="w-full text-center border-collapse bg-black/20">
              <thead>
                <tr className="bg-cyan-900/50 text-white text-xl">
                  <th className="p-6 border-b border-white/10">الرتبة الكلية</th>
                  <th className="p-6 border-b border-white/10">وحدة k</th>
                </tr>
              </thead>
              <tbody className="text-gray-200 text-xl font-mono">
                <tr className="border-b border-white/10">
                  <td className="p-6 bg-white/5 font-sans">صفر</td>
                  <td className="p-6">M.s⁻¹</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-6 bg-white/5 font-sans">الأولى</td>
                  <td className="p-6">s⁻¹</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-6 bg-white/5 font-sans">الثانية</td>
                  <td className="p-6">M⁻¹.s⁻¹</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-6 bg-white/5 font-sans">الثالثة</td>
                  <td className="p-6">M⁻².s⁻¹</td>
                </tr>
              </tbody>
            </table>
          </div>
          <TeacherNote>
            تعتمد وحدات k على الرتبة الكلية للتفاعل وتتغير بتغيرها.
          </TeacherNote>
        </GlassCard>
      </section>

      {/* الصفحة 24: مراجعة القسم 5-3 */}
      <section id="section-5-3-review">
        <SectionHeader title="مراجعة القسم 5-3" icon={BookOpen} />
        <GlassCard page="226">
          <div className="space-y-8">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-xl font-bold text-cyan-400 mb-4">1. ما المقصود بكل مما يلي: قانون السرعة، ثابت سرعة التفاعل، رتبة التفاعل؟</h5>
              <p className="text-gray-300 leading-relaxed">
                - قانون السرعة: علاقة رياضية تربط سرعة التفاعل بتركيز المتفاعلات.
                <br />
                - ثابت سرعة التفاعل: ثابت التناسب في قانون السرعة، وتعتمد قيمته على درجة الحرارة.
                <br />
                - رتبة التفاعل: الأس الذي يرفع إليه تركيز المتفاعل في قانون السرعة.
              </p>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-xl font-bold text-cyan-400 mb-4">2. كيف تحدد رتبة التفاعل؟</h5>
              <p className="text-gray-300 leading-relaxed">
                تحدد رتبة التفاعل تجريبياً من خلال دراسة أثر تغير تراكيز المتفاعلات على سرعة التفاعل الابتدائية.
              </p>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-xl font-bold text-cyan-400 mb-4">3. علل: لا يمكن استنتاج قانون السرعة من المعادلة الموزونة مباشرة.</h5>
              <p className="text-gray-300 leading-relaxed">
                لأن قانون السرعة يعتمد على آلية التفاعل والخطوة المحددة للسرعة، وليس فقط على النسب المولية في المعادلة الكلية.
              </p>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* الصفحة 25: مراجعة الفصل الخامس */}
      <section id="chapter-5-final-review">
        <SectionHeader title="مراجعة الفصل الخامس" icon={CheckCircle2} />
        <GlassCard page="227">
          <div className="space-y-8">
            <Quiz 
              page="227"
              question="1/ أي مما يلي يزيد من سرعة التفاعل بزيادة عدد التصادمات الفعالة؟"
              options={["زيادة درجة الحرارة", "زيادة التركيز", "زيادة المساحة السطحية", "جميع ما سبق"]}
              correctAnswer={3}
            />
            <Quiz 
              page="227"
              question="2/ ثابت سرعة التفاعل k يتغير بتغير:"
              options={["التركيز", "الضغط", "درجة الحرارة", "المساحة السطحية"]}
              correctAnswer={2}
            />
            <Quiz 
              page="227"
              question="3/ في تفاعل من الرتبة صفر، إذا تضاعف التركيز 3 مرات فإن السرعة:"
              options={["تتضاعف 3 مرات", "تتضاعف 9 مرات", "تبقى ثابتة", "تقل للثلث"]}
              correctAnswer={2}
            />
          </div>
        </GlassCard>
      </section>

      <p className="text-center text-gray-500 font-bold py-10">تم بحمد الله استخراج كافة بيانات الفصل الخامس: سرعة التفاعلات.</p>
    </div>
  );
}
