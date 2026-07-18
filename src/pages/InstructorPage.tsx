import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Globe, Linkedin, Twitter, Youtube, BookOpen, Star } from "lucide-react";
import { instructorsDb, getInstructorProfile } from "@/lib/extended-data";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { GoldCard } from "@/components/ui/gold-elements";
import { Skeleton } from "@/components/ui/skeleton";
import { toArabicDigits } from "@/lib/utils";

export function InstructorPage() {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!id) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col justify-between" dir="rtl">
        <Navbar />
        <main className="flex-grow pt-28 pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
            <Skeleton className="h-4 w-32" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 border border-gold-border/15 bg-bg-card rounded-2xl flex flex-col items-center">
                  <Skeleton className="h-44 w-44 rounded-3xl mb-6" />
                  <Skeleton className="h-8 w-40 mb-2" />
                  <Skeleton className="h-4 w-52 mb-6" />
                  <div className="flex gap-4 border-t border-border-subtle pt-6 w-full justify-center">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
                <div className="p-6 border border-gold-border/15 bg-bg-card rounded-2xl">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-8 space-y-8">
                <div className="space-y-4">
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-28 w-full rounded-2xl" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-24 w-full rounded-xl" />
                  <Skeleton className="h-24 w-full rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Lookup instructor in DB or fallback
  const foundName = Object.keys(instructorsDb).find(name => {
    const instId = `inst-${name.replace(/\s+/g, "-")}`;
    return instId === id;
  }) || id.replace(/^inst-/, "").replace(/-/g, " ");

  const instructor = getInstructorProfile(foundName, id);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col justify-between" dir="rtl">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Back Navigation */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-xs text-text-secondary hover:text-gold-primary transition">
              <ArrowRight className="h-4 w-4" /> العودة للرئيسية
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Right Sidebar: Photo and Contact (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <GoldCard className="p-6 text-center border-gold-border/15">
                <div className="relative h-44 w-44 rounded-3xl overflow-hidden border border-gold-border/30 mx-auto mb-6">
                  <img src={instructor.avatar} alt={instructor.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 to-transparent" />
                </div>
                
                <h1 className="text-2xl font-bold text-text-primary font-display">{instructor.name}</h1>
                <p className="text-xs text-gold-primary mt-2 font-medium leading-relaxed">{instructor.title}</p>
                
                {/* Social Links */}
                <div className="flex justify-center gap-4 mt-6 pt-6 border-t border-border-subtle">
                  {instructor.socials.linkedin && (
                    <a href={instructor.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-gold-border/20 text-text-secondary hover:text-gold-primary hover:border-gold-primary transition" aria-label="LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {instructor.socials.twitter && (
                    <a href={instructor.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-gold-border/20 text-text-secondary hover:text-gold-primary hover:border-gold-primary transition" aria-label="Twitter">
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                  {instructor.socials.youtube && (
                    <a href={instructor.socials.youtube} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-gold-border/20 text-text-secondary hover:text-gold-primary hover:border-gold-primary transition" aria-label="YouTube">
                      <Youtube className="h-4 w-4" />
                    </a>
                  )}
                  {instructor.socials.website && (
                    <a href={instructor.socials.website} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-gold-border/20 text-text-secondary hover:text-gold-primary hover:border-gold-primary transition" aria-label="Website">
                      <Globe className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </GoldCard>

              {/* Skills */}
              <GoldCard className="p-6 border-gold-border/15">
                <h3 className="font-bold text-text-primary text-base mb-4">مجالات الخبرة</h3>
                <div className="flex flex-wrap gap-2">
                  {instructor.skills.map((skill, idx) => (
                    <span key={idx} className="bg-bg-elevated border border-gold-border/20 text-gold-primary text-xs px-3 py-1.5 rounded-xl font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </GoldCard>
            </div>

            {/* Left Area: Biography and Courses (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Bio & Summary */}
              <section className="space-y-6">
                <div className="space-y-3">
                  <h2 className="text-3xl font-display font-bold text-text-primary border-r-4 border-gold-primary pr-3 leading-none">السيرة الذاتية المهنية</h2>
                </div>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed text-justify">
                  {toArabicDigits(instructor.bio)}
                </p>
              </section>

              {/* Experiences */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-text-primary border-r-4 border-gold-primary pr-3 leading-none">أبرز المحطات المهنية</h2>
                <div className="relative border-r-2 border-gold-border/30 pr-6 mr-2 space-y-8 py-2">
                  {instructor.experiences.map((exp, idx) => (
                    <div key={idx} className="relative text-right">
                      {/* Step Circle */}
                      <span className="absolute -right-[33px] top-1.5 h-5 w-5 rounded-full border border-gold-primary bg-bg-primary flex items-center justify-center font-serif text-xs text-gold-primary font-bold">
                        {toArabicDigits(idx + 1)}
                      </span>
                      <p className="text-text-primary text-sm leading-relaxed">{toArabicDigits(exp)}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Courses Taught */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-text-primary border-r-4 border-gold-primary pr-3 leading-none">الدورات التدريبية المقدمة</h2>
                
                {instructor.coursesTaught.length === 0 ? (
                  <p className="text-text-secondary text-sm">لا توجد دورات مسجلة حالياً لهذا المدرب.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {instructor.coursesTaught.map((c) => (
                      <GoldCard key={c.id} className="group relative overflow-hidden hover:-translate-y-1.5 transition flex flex-col justify-between h-full">
                        <div>
                          <div className="h-36 relative overflow-hidden">
                            <img src={c.image} alt={c.title} className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/50 to-transparent" />
                            <span className="absolute top-3 right-3 rounded-full bg-bg-primary/80 px-2.5 py-0.5 text-[10px] font-bold text-gold-primary backdrop-blur-sm border border-gold-border/20">
                              {toArabicDigits(c.category)}
                            </span>
                          </div>
                          <div className="p-5">
                            <h3 className="text-text-primary font-bold text-base leading-snug min-h-[3rem] line-clamp-2">{c.title}</h3>
                          </div>
                        </div>
                        <div className="p-5 pt-0 flex items-center justify-between border-t border-border-subtle mt-4">
                          <span className="text-gold-primary font-serif text-xl font-bold">{toArabicDigits(c.price)}</span>
                          <Link to={`/course/${c.id}`} className="text-xs text-gold-primary underline hover:text-accent-gold-lt font-semibold">عرض تفاصيل الدورة ←</Link>
                        </div>
                      </GoldCard>
                    ))}
                  </div>
                )}
              </section>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
