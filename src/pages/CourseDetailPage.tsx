import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, BookOpen, Clock, Users, Target, Milestone, User, 
  ChevronDown, ChevronUp, Play, Lock, Award, X, Sparkles 
} from "lucide-react";
import { getCourseDetail } from "@/lib/extended-data";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { GoldCard, GoldButton } from "@/components/ui/gold-elements";
import { Skeleton } from "@/components/ui/skeleton";
import { toArabicDigits } from "@/lib/utils";

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const courseId = Number(id);

  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({ 0: true });
  const [activePreviewVideo, setActivePreviewVideo] = useState<{ title: string; url: string } | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showIntroVideoModal, setShowIntroVideoModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col justify-between" dir="rtl">
        <Navbar />
        <main className="flex-grow pt-28 pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
            <Skeleton className="h-4 w-48" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
              <div className="lg:col-span-7 space-y-6">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-12 w-3/4 rounded-xl" />
                <div className="flex gap-4">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <div className="grid grid-cols-3 gap-4 max-w-md">
                  <Skeleton className="h-16 rounded-2xl" />
                  <Skeleton className="h-16 rounded-2xl" />
                  <Skeleton className="h-16 rounded-2xl" />
                </div>
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-12 w-48 rounded-full" />
              </div>
              <div className="lg:col-span-5">
                <Skeleton className="aspect-video lg:aspect-square rounded-3xl" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-8 space-y-12">
                <div className="space-y-3">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-24 w-full rounded-xl" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-28 w-full rounded-2xl" />
                </div>
              </div>
              <div className="lg:col-span-4 space-y-6">
                <Skeleton className="h-64 rounded-2xl" />
                <Skeleton className="h-48 rounded-2xl" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  let courseDetail;
  try {
    courseDetail = getCourseDetail(courseId);
  } catch (error) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col justify-between">
        <Navbar />
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold text-gold-primary">الدورة غير موجودة</h2>
          <p className="mt-4 text-text-secondary">عذراً، لم نتمكن من العثور على الدورة المطلوبة.</p>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 text-gold-primary hover:underline">
            <ArrowRight className="h-4 w-4" /> العودة للرئيسية
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const {
    title,
    category,
    price,
    originalPrice,
    image,
    hours,
    lessonsCount,
    introVideo,
    certificateImage,
    introduction,
    goals,
    targetUsers,
    roadmap,
    sections,
    instructor
  } = courseDetail;

  const toggleSection = (idx: number) => {
    setOpenSections(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col justify-between" dir="rtl">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs text-text-secondary">
            <Link to="/" className="hover:text-gold-primary transition">الرئيسية</Link>
            <span>/</span>
            <span className="hover:text-gold-primary transition">{category}</span>
            <span>/</span>
            <span className="text-gold-primary truncate">{title}</span>
          </div>

          {/* Hero Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7 text-right">
              <span className="inline-block bg-gold-muted text-gold-primary border border-gold-border/30 px-3 py-1 rounded-full text-xs font-bold mb-4">
                {category}
              </span>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-text-primary leading-tight mb-6">
                {title}
              </h1>
              
              <div className="flex items-center gap-4 text-sm text-text-secondary mb-6">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4 text-gold-primary" />
                  {toArabicDigits(sections.length)} وحدات دراسية
                </span>
                <span className="h-4 w-px bg-gold-border" />
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4 text-gold-primary" />
                  بإشراف: {instructor.name}
                </span>
              </div>

              {/* Course Meta Info Dashboard */}
              <div className="grid grid-cols-3 gap-4 mb-8 bg-bg-card/60 rounded-2xl p-4 border border-gold-border/10 max-w-md">
                <div className="text-center">
                  <span className="text-[10px] text-text-secondary block font-bold mb-1">ساعات الدراسة</span>
                  <span className="metric-number text-2xl font-bold font-serif text-gold-primary block">
                    {toArabicDigits(hours)}
                  </span>
                </div>
                <div className="text-center border-x border-border-subtle">
                  <span className="text-[10px] text-text-secondary block font-bold mb-1">عدد المحاضرات</span>
                  <span className="metric-number text-2xl font-bold font-serif text-gold-primary block">
                    {toArabicDigits(lessonsCount)}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-text-secondary block font-bold mb-1">المستوى التعليمي</span>
                  <span className="text-xs text-text-primary font-bold block mt-1.5">متقدم (احترافي)</span>
                </div>
              </div>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="metric-number font-serif text-5xl font-bold">{toArabicDigits(price)}</span>
                {originalPrice && (
                  <span className="text-text-muted line-through text-xl">{toArabicDigits(originalPrice)}</span>
                )}
              </div>
              <GoldButton className="px-10 py-4 text-sm rounded-full">التحق بالبرنامج الآن</GoldButton>
            </div>
            
            {/* Course Thumbnail with Intro Video Play Trigger */}
            <div className="lg:col-span-5">
              <div 
                onClick={() => setShowIntroVideoModal(true)}
                className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden border border-gold-border/30 shadow-2xl bg-bg-card/90 cursor-pointer group"
              >
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-full object-cover group-hover:scale-103 transition duration-500" 
                />
                <div className="absolute inset-0 bg-black/35 flex items-center justify-center group-hover:bg-black/50 transition duration-300">
                  <div className="h-16 w-16 rounded-full gold-gradient text-bg-primary flex items-center justify-center shadow-lg shadow-gold-glow/20 group-hover:scale-110 group-hover:shadow-gold-glow/50 transition duration-300">
                    <Play className="h-6 w-6 fill-bg-primary stroke-none mr-1" />
                  </div>
                </div>
                <div className="absolute top-4 right-4 z-10 bg-bg-primary/80 backdrop-blur-sm border border-gold-border/20 px-3 py-1 rounded-full text-[10px] font-bold text-gold-primary flex items-center gap-1">
                  <Play className="h-3 w-3 fill-gold-primary" />
                  شاهد الفيديو التعريفي
                </div>
              </div>
            </div>
          </div>

          {/* Grid Layout: Main info and Syllabus */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Content Area (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Introduction */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary border-r-4 border-gold-primary pr-3 leading-none">مقدمة عن البرنامج</h2>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed text-justify">
                  {toArabicDigits(introduction)}
                </p>
              </section>

              {/* Middle Section: Instructor Profile card */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary border-r-4 border-gold-primary pr-3 leading-none">
                  {title.includes("دبلوم") ? "مقدم الدبلوم" : "مقدم الدورة"}
                </h2>
                <GoldCard className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start text-right hover:border-gold-border/40 transition">
                  <Link to={`/instructor/${instructor.id}`} className="block relative h-24 w-24 rounded-2xl overflow-hidden border border-gold-border/30 flex-shrink-0 group">
                    <img src={image} alt={instructor.name} className="h-full w-full object-cover group-hover:scale-105 transition duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 to-transparent" />
                  </Link>
                  <div className="flex-grow space-y-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <Link to={`/instructor/${instructor.id}`} className="text-xl font-bold text-text-primary hover:text-gold-primary transition">
                          {instructor.name}
                        </Link>
                        <p className="text-xs text-gold-primary mt-1">{instructor.title}</p>
                      </div>
                      <Link to={`/instructor/${instructor.id}`} className="text-xs text-gold-primary underline hover:text-accent-gold-lt self-start md:self-center font-semibold">
                        عرض الصفحة الشخصية ←
                      </Link>
                    </div>
                    <p className="text-text-secondary text-xs md:text-sm leading-relaxed">{toArabicDigits(instructor.summary)}</p>
                    
                    {/* Skills badges */}
                    {instructor.skills && instructor.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {instructor.skills.map((skill, index) => (
                          <span key={index} className="text-[10px] bg-bg-elevated text-text-secondary border border-border-subtle px-2 py-0.5 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </GoldCard>
              </section>

              {/* Collapsible Syllabus Accordion */}
              <section className="space-y-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gold-primary" />
                  <h2 className="text-2xl font-bold text-text-primary border-r-4 border-gold-primary pr-3 leading-none">منهج ومحاضرات الدورة</h2>
                </div>
                
                <div className="space-y-4">
                  {sections.map((sec, idx) => {
                    const isOpen = !!openSections[idx];
                    return (
                      <GoldCard key={idx} className="overflow-hidden border-gold-border/15">
                        {/* Accordion Trigger Header */}
                        <button
                          onClick={() => toggleSection(idx)}
                          className="w-full p-5 flex items-center justify-between text-right hover:bg-bg-elevated/20 transition duration-300"
                        >
                          <div className="space-y-1">
                            <h3 className="font-bold text-text-primary text-base md:text-lg">{sec.title}</h3>
                            <span className="text-[10px] text-text-secondary block">
                              {toArabicDigits(sec.lessons.length)} محاضرات • مدة الوحدة: {toArabicDigits(sec.duration)}
                            </span>
                          </div>
                          <div className="text-gold-primary p-1 bg-bg-elevated rounded-lg border border-gold-border/10">
                            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </div>
                        </button>

                        {/* Accordion Content Panel */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              exit={{ height: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden bg-bg-primary/20 border-t border-border-subtle"
                            >
                              <ul className="p-5 space-y-3.5">
                                {sec.lessons.map((lesson) => (
                                  <li 
                                    key={lesson.id} 
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-bg-card/40 border border-gold-border/5 hover:border-gold-border/15 transition-all duration-300"
                                  >
                                    <div className="flex items-start gap-3">
                                      <span className="font-serif text-xs font-bold text-gold-primary/60 mt-0.5">{toArabicDigits(lesson.id)}</span>
                                      <span className="text-text-primary text-xs md:text-sm leading-relaxed">{lesson.title}</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between sm:justify-end gap-4 flex-shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-border-subtle/50">
                                      <span className="text-[10px] text-text-secondary font-mono">{toArabicDigits(lesson.duration)}</span>
                                      
                                      {lesson.isPreview && lesson.videoUrl ? (
                                        <button 
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setActivePreviewVideo({ title: lesson.title, url: lesson.videoUrl! });
                                          }}
                                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-primary text-bg-primary text-[10px] font-bold shadow-lg shadow-gold-glow/10 hover:shadow-gold-glow/30 hover:scale-[1.02] active:scale-[0.98] transition"
                                        >
                                          <Play className="h-3 w-3 fill-bg-primary stroke-none" />
                                          مشاهدة مجانية
                                        </button>
                                      ) : (
                                        <span className="flex items-center gap-1 text-[10px] text-text-muted font-bold px-2 py-1 rounded bg-bg-elevated border border-border-subtle">
                                          <Lock className="h-3 w-3 text-text-muted" />
                                          بعد الشراء
                                        </span>
                                      )}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </GoldCard>
                    );
                  })}
                </div>
              </section>

            </div>

            {/* Right Sidebar Area (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Certificate Preview Card */}
              <GoldCard className="p-6 border-gold-border/20 text-center relative overflow-hidden group">
                <div className="absolute top-3 right-3 bg-gold-primary text-bg-primary p-1 rounded-full" title="معتمد">
                  <Sparkles className="h-3.5 w-3.5 fill-bg-primary" />
                </div>
                
                <h3 className="font-bold text-text-primary text-lg mb-2 flex items-center justify-center gap-1.5">
                  <Award className="h-5 w-5 text-gold-primary" />
                  شهادة تخرج معتمدة
                </h3>
                <p className="text-text-secondary text-[11px] leading-relaxed mb-4">
                  احصل على شهادة مهنية معتمدة من ماستري أكاديمي عند إتمامك لجميع محاضرات الدبلوم وتسليم المشروع النهائي.
                </p>

                {/* Scaled Image Preview Container */}
                <div 
                  onClick={() => setShowCertificateModal(true)}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold-border/10 cursor-pointer shadow-lg group-hover:border-gold-border/40 transition duration-300 bg-bg-elevated"
                >
                  <img src={certificateImage} alt="معاينة الشهادة" className="w-full h-full object-cover opacity-80 group-hover:scale-103 transition duration-500" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <span className="px-4 py-2 bg-gold-primary text-bg-primary rounded-full text-xs font-bold shadow-lg">معاينة الشهادة كبرة</span>
                  </div>
                </div>
              </GoldCard>

              {/* Goals */}
              <GoldCard className="p-6 border-gold-border/15">
                <h3 className="font-bold text-text-primary text-lg mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-gold-primary" />
                  أهداف البرنامج
                </h3>
                <ul className="space-y-3.5">
                  {goals.map((g, idx) => (
                    <li key={idx} className="text-text-secondary text-xs leading-relaxed flex items-start gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-primary mt-2 flex-shrink-0" />
                      <span>{toArabicDigits(g)}</span>
                    </li>
                  ))}
                </ul>
              </GoldCard>

              {/* Target Users */}
              <GoldCard className="p-6 border-gold-border/15">
                <h3 className="font-bold text-text-primary text-lg mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-gold-primary" />
                  لمن هذا البرنامج؟
                </h3>
                <ul className="space-y-3.5">
                  {targetUsers.map((user, idx) => (
                    <li key={idx} className="text-text-secondary text-xs leading-relaxed flex items-start gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-primary mt-2 flex-shrink-0" />
                      <span>{toArabicDigits(user)}</span>
                    </li>
                  ))}
                </ul>
              </GoldCard>

              {/* Course Roadmap */}
              <GoldCard className="p-6 border-gold-border/15">
                <h3 className="font-bold text-text-primary text-lg mb-6 flex items-center gap-2">
                  <Milestone className="h-5 w-5 text-gold-primary" />
                  مسار التدريب العملي (Roadmap)
                </h3>
                <div className="relative border-r-2 border-gold-border/30 pr-4 mr-2 space-y-6">
                  {roadmap.map((rm, idx) => (
                    <div key={idx} className="relative text-right">
                      {/* Circle Dot */}
                      <span className="absolute -right-[23px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-gold-primary bg-bg-primary flex items-center justify-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold-primary" />
                      </span>
                      <h4 className="text-xs font-bold text-gold-primary mb-1">{rm.step}</h4>
                      <p className="text-text-secondary text-[11px] leading-relaxed">{toArabicDigits(rm.desc)}</p>
                    </div>
                  ))}
                </div>
              </GoldCard>

            </div>

          </div>

        </div>
      </main>

      {/* 1. Modal Dialog: Lesson Video Preview Player */}
      <AnimatePresence>
        {activePreviewVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePreviewVideo(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            {/* Player Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-[800px] rounded-3xl overflow-hidden border border-gold-border bg-bg-card shadow-2xl z-10"
            >
              {/* Header bar */}
              <div className="p-4 bg-bg-elevated flex items-center justify-between border-b border-border-subtle">
                <span className="text-xs text-gold-primary font-bold bg-gold-muted px-2.5 py-1 rounded-full border border-gold-border/20">مشاهدة مجانية</span>
                <button 
                  onClick={() => setActivePreviewVideo(null)}
                  className="text-text-secondary hover:text-gold-primary transition p-1 bg-bg-primary rounded-lg border border-border-subtle"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              {/* Video elements */}
              <div className="aspect-video bg-black">
                <video
                  src={activePreviewVideo.url}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                />
              </div>

              {/* Title footer */}
              <div className="p-5 text-right">
                <h4 className="font-bold text-text-primary text-sm md:text-base leading-snug">{activePreviewVideo.title}</h4>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Modal Dialog: Certificate Lightbox Preview */}
      <AnimatePresence>
        {showCertificateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCertificateModal(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-[900px] rounded-3xl overflow-hidden border border-gold-border bg-bg-card shadow-2xl z-10 p-2"
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowCertificateModal(false)}
                className="absolute top-4 right-4 z-20 text-text-secondary hover:text-gold-primary transition p-2 bg-bg-primary/80 backdrop-blur-sm rounded-full border border-border-subtle shadow-md"
                aria-label="إغلاق المعاينة"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white">
                <img src={certificateImage} alt="الشهادة المعتمدة الكاملة" className="w-full h-full object-contain" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Modal Dialog: Course Introduction Video Player */}
      <AnimatePresence>
        {showIntroVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowIntroVideoModal(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            {/* Player Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-[800px] rounded-3xl overflow-hidden border border-gold-border bg-bg-card shadow-2xl z-10"
            >
              {/* Header bar */}
              <div className="p-4 bg-bg-elevated flex items-center justify-between border-b border-border-subtle">
                <span className="text-xs text-gold-primary font-bold bg-gold-muted px-2.5 py-1 rounded-full border border-gold-border/20">الفيديو التعريفي للدورة</span>
                <button 
                  onClick={() => setShowIntroVideoModal(false)}
                  className="text-text-secondary hover:text-gold-primary transition p-1 bg-bg-primary rounded-lg border border-border-subtle"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              {/* Video elements */}
              <div className="aspect-video bg-black">
                <video
                  src={introVideo.url}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                />
              </div>

              {/* Title footer */}
              <div className="p-5 text-right">
                <h4 className="font-bold text-text-primary text-sm md:text-base leading-snug">{title}</h4>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
