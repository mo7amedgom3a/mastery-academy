import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, User, Briefcase, Calendar, Star, ArrowRight, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { GoldCard, GoldButton } from "@/components/ui/gold-elements";
import { Skeleton } from "@/components/ui/skeleton";
import { courses, categories, consultancies } from "@/lib/landing-data";
import { getInstructorProfile } from "@/lib/extended-data";
import { toArabicDigits } from "@/lib/utils";

export function BrowsePage() {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const fieldParam = searchParams.get("field") || "";
  const queryParam = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedField, setSelectedField] = useState(fieldParam);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Sync state with URL search parameters
  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  useEffect(() => {
    setSelectedField(fieldParam);
  }, [fieldParam]);

  const [coursesPage, setCoursesPage] = useState(1);
  const [consultanciesPage, setConsultanciesPage] = useState(1);
  const [instructorsPage, setInstructorsPage] = useState(1);

  useEffect(() => {
    setCoursesPage(1);
    setConsultanciesPage(1);
    setInstructorsPage(1);
  }, [searchQuery, selectedField]);



  // Generate complete list of unique instructors dynamically
  const instructors = useMemo(() => {
    const uniqueNames = Array.from(new Set(courses.map((c) => c.instructor)));
    return uniqueNames.map((name) => getInstructorProfile(name));
  }, []);

  // Update URL parameters when search state changes
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (val) {
      newParams.set("q", val);
    } else {
      newParams.delete("q");
    }
    setSearchParams(newParams);
  };

  const handleFieldSelect = (field: string) => {
    setSelectedField(field);
    const newParams = new URLSearchParams(searchParams);
    if (field) {
      newParams.set("field", field);
    } else {
      newParams.delete("field");
    }
    setSearchParams(newParams);
  };

  // ---------------- FILTERING LOGIC ----------------

  // Filter Categories (Fields) matching search
  const filteredFields = useMemo(() => {
    if (!searchQuery) return categories;
    const q = searchQuery.toLowerCase().trim();
    return categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(q) ||
        cat.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Filter Courses by Field and Search Query
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Field Filter
      if (selectedField) {
        // Match either exact category or fuzzy sub-category matching
        const matchField = course.category.toLowerCase().includes(selectedField.toLowerCase()) || 
                           selectedField.toLowerCase().includes(course.category.toLowerCase());
        if (!matchField) return false;
      }
      
      // Search Query Filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase().trim();
        return (
          course.title.toLowerCase().includes(q) ||
          course.instructor.toLowerCase().includes(q) ||
          course.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedField, searchQuery]);

  // Filter Consultations by Field and Search Query
  const filteredConsultancies = useMemo(() => {
    return consultancies.filter((c) => {
      // Field Filter (Consultations match fields based on title/summary/consultant title)
      if (selectedField) {
        const fieldStr = selectedField.toLowerCase();
        const matchesTitle = c.title.toLowerCase().includes(fieldStr);
        const matchesSummary = c.summary.toLowerCase().includes(fieldStr);
        const matchesConsultant = c.consultant.toLowerCase().includes(fieldStr);
        
        // Custom domain map for marketing, management, etc.
        let matchesDomain = false;
        if (fieldStr.includes("تسويق") && (c.title.includes("تسويق") || c.summary.includes("تسويق") || c.consultant.includes("ياسمين"))) {
          matchesDomain = true;
        } else if (fieldStr.includes("ادارة") || fieldStr.includes("إدارة") || fieldStr.includes("أعمال")) {
          if (c.title.includes("إداري") || c.summary.includes("إدارة") || c.consultant.includes("السعيد")) {
            matchesDomain = true;
          }
        } else if (fieldStr.includes("قانون") || fieldStr.includes("تشريع")) {
          if (c.title.includes("قانون") || c.summary.includes("قانوني") || c.consultant.includes("ناجي")) {
            matchesDomain = true;
          }
        } else if (fieldStr.includes("مالية") || fieldStr.includes("محاسب") || fieldStr.includes("استثمار")) {
          if (c.title.includes("مالي") || c.summary.includes("استثمار") || c.consultant.includes("الفيصل")) {
            matchesDomain = true;
          }
        }

        if (!matchesTitle && !matchesSummary && !matchesConsultant && !matchesDomain) return false;
      }

      // Search Query Filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase().trim();
        return (
          c.title.toLowerCase().includes(q) ||
          c.consultant.toLowerCase().includes(q) ||
          c.summary.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedField, searchQuery]);

  // Filter Instructors (People) by Search Query (or field if specified)
  const filteredInstructors = useMemo(() => {
    return instructors.filter((inst) => {
      // Search Query Filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = inst.name.toLowerCase().includes(q);
        const matchesTitle = inst.title.toLowerCase().includes(q);
        const matchesSummary = inst.summary.toLowerCase().includes(q);
        const matchesSkill = inst.skills.some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesTitle && !matchesSummary && !matchesSkill) return false;
      }

      // Field Filter (instructors mapped to fields based on their skills / titles)
      if (selectedField) {
        const fieldStr = selectedField.toLowerCase();
        const matchesTitleField = inst.title.toLowerCase().includes(fieldStr);
        const matchesSkillField = inst.skills.some((s) => s.toLowerCase().includes(fieldStr));
        
        let matchesDomain = false;
        if (fieldStr.includes("تسويق") && (inst.title.includes("تسويق") || inst.skills.some(s => s.includes("تسويق")))) {
          matchesDomain = true;
        } else if ((fieldStr.includes("ادارة") || fieldStr.includes("إدارة")) && (inst.title.includes("إدارة") || inst.skills.some(s => s.includes("إدارة") || s.includes("قيادة")))) {
          matchesDomain = true;
        } else if (fieldStr.includes("قانون") && (inst.title.includes("قانون") || inst.skills.some(s => s.includes("عقود") || s.includes("قانون")))) {
          matchesDomain = true;
        } else if ((fieldStr.includes("مالية") || fieldStr.includes("محاسب")) && (inst.title.includes("مالي") || inst.skills.some(s => s.includes("مالي") || s.includes("استثمار")))) {
          matchesDomain = true;
        }

        if (!matchesTitleField && !matchesSkillField && !matchesDomain) return false;
      }

      return true;
    });
  }, [selectedField, searchQuery, instructors]);

  const coursesPerPage = 6;
  const totalCoursesPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const paginatedCourses = useMemo(() => {
    const start = (coursesPage - 1) * coursesPerPage;
    return filteredCourses.slice(start, start + coursesPerPage);
  }, [filteredCourses, coursesPage]);

  const consultanciesPerPage = 6;
  const totalConsultanciesPages = Math.ceil(filteredConsultancies.length / consultanciesPerPage);
  const paginatedConsultancies = useMemo(() => {
    const start = (consultanciesPage - 1) * consultanciesPerPage;
    return filteredConsultancies.slice(start, start + consultanciesPerPage);
  }, [filteredConsultancies, consultanciesPage]);

  const instructorsPerPage = 6;
  const totalInstructorsPages = Math.ceil(filteredInstructors.length / instructorsPerPage);
  const paginatedInstructors = useMemo(() => {
    const start = (instructorsPage - 1) * instructorsPerPage;
    return filteredInstructors.slice(start, start + instructorsPerPage);
  }, [filteredInstructors, instructorsPage]);

  const hasResults =
    filteredCourses.length > 0 ||
    filteredConsultancies.length > 0 ||
    filteredInstructors.length > 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col justify-between" dir="rtl">
        <Navbar />
        <main className="flex-grow pt-28 pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
            <Skeleton className="h-4 w-48" />

            <div className="mb-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2">
                <Skeleton className="h-10 w-64 rounded-xl" />
                <Skeleton className="h-4 w-96" />
              </div>
              <Skeleton className="h-12 w-full lg:max-w-md rounded-xl" />
            </div>

            <div className="flex gap-2 pb-3 overflow-x-auto">
              <Skeleton className="h-10 w-16 rounded-full flex-shrink-0" />
              <Skeleton className="h-10 w-32 rounded-full flex-shrink-0" />
              <Skeleton className="h-10 w-28 rounded-full flex-shrink-0" />
              <Skeleton className="h-10 w-36 rounded-full flex-shrink-0" />
            </div>

            <div className="space-y-6">
              <Skeleton className="h-8 w-64" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Skeleton className="h-80 rounded-2xl" />
                <Skeleton className="h-80 rounded-2xl" />
                <Skeleton className="h-80 rounded-2xl" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col justify-between" dir="rtl">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs text-text-secondary">
            <Link to="/" className="hover:text-gold-primary transition">الرئيسية</Link>
            <span>/</span>
            <span className="text-gold-primary">تصفح البرامج والخدمات</span>
            {selectedField && (
              <>
                <span>/</span>
                <span className="text-gold-primary">{selectedField}</span>
              </>
            )}
          </div>

          {/* Page Title & Search Header */}
          <div className="mb-12 text-center lg:text-right flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-text-primary leading-tight mb-3">
                {selectedField ? `مجال ${selectedField}` : "تصفح الأكاديمية"}
              </h1>
              <p className="text-text-secondary text-xs sm:text-sm">
                ابحث عن الدورات، الدبلومات، المستشارين والخبراء في مجالات الأعمال المتنوعة.
              </p>
            </div>

            {/* Dynamic Search Box */}
            <div className="relative w-full lg:max-w-md">
              <input
                type="text"
                placeholder="ابحث عن دورة، مستشار، مجال..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-bg-card border border-gold-border/30 rounded-xl py-3 px-4 pr-11 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold-primary transition duration-300 shadow-sm"
              />
              <Search className="absolute right-4 top-3.5 h-4.5 w-4.5 text-text-secondary" />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute left-3 top-3 text-xs text-text-muted hover:text-gold-primary cursor-pointer"
                >
                  مسح
                </button>
              )}
            </div>
          </div>

          {/* Fields Navigation Tabs */}
          <div className="mb-10 overflow-x-auto pb-3 scrollbar-hide flex gap-2">
            <button
              onClick={() => handleFieldSelect("")}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
                !selectedField
                  ? "bg-gold-primary text-bg-primary border-gold-primary"
                  : "bg-bg-card text-text-secondary border-gold-border/20 hover:border-gold-border hover:text-text-primary"
              }`}
            >
              الكل
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleFieldSelect(cat.name)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
                  selectedField === cat.name
                    ? "bg-gold-primary text-bg-primary border-gold-primary"
                    : "bg-bg-card text-text-secondary border-gold-border/20 hover:border-gold-border hover:text-text-primary"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Main Results Grid */}
          {!hasResults ? (
            <GoldCard className="p-12 text-center max-w-xl mx-auto my-12 border-gold-border/10">
              <div className="text-gold-primary text-4xl mb-4 font-serif">⚠️</div>
              <h3 className="text-lg font-bold text-text-primary mb-2">لا توجد نتائج مطابقة</h3>
              <p className="text-text-secondary text-xs leading-relaxed mb-6">
                عذراً، لم نتمكن من العثور على أي دورات أو استشارات أو مدربين يطابقون بحثك أو المجال المحدد. جرب كلمات بحث أخرى.
              </p>
              <GoldButton onClick={() => { handleSearchChange(""); handleFieldSelect(""); }}>
                إعادة ضبط البحث
              </GoldButton>
            </GoldCard>
          ) : (
            <div className="space-y-16">
              {/* Courses & Diplomas Section */}
              {filteredCourses.length > 0 && (
                <div>
                  <div className="flex items-center justify-between border-b border-gold-border/10 pb-4 mb-6">
                    <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-gold-primary" />
                      الدورات والدبلومات التدريبية ({toArabicDigits(filteredCourses.length)})
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedCourses.map((course) => {
                      const isDiploma = course.title.includes("دبلوم");
                      return (
                        <GoldCard
                          key={course.id}
                          className={`overflow-hidden hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
                            isDiploma ? "border-gold-primary/45 ring-1 ring-gold-primary/20" : ""
                          }`}
                        >
                          <div>
                            {/* Course Image */}
                            <div className="relative h-44 w-full overflow-hidden bg-bg-elevated border-b border-gold-border/10">
                              <img
                                src={course.image}
                                alt={course.title}
                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                              />
                              {isDiploma && (
                                <span className="absolute top-3 right-3 bg-gold-primary text-bg-primary text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                                  دبلوم احترافي
                                </span>
                              )}
                              {course.discountPercentage > 0 && (
                                <span className="absolute top-3 left-3 bg-red-alert text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                  خصم {toArabicDigits(course.discountPercentage)}%
                                </span>
                              )}
                            </div>

                            {/* Content */}
                            <div className="p-5">
                              <span className="text-[10px] text-gold-primary font-semibold block mb-1">
                                {course.category}
                              </span>
                              <h3 className="text-sm sm:text-base font-bold text-text-primary leading-snug line-clamp-2 h-12 mb-3">
                                {course.title}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-text-secondary">
                                <User className="h-3.5 w-3.5 text-gold-primary" />
                                <span>بإشراف: {course.instructor}</span>
                              </div>
                            </div>
                          </div>

                          {/* Footer / CTA */}
                          <div className="p-5 pt-0 flex items-center justify-between border-t border-border-subtle mt-2 pt-3">
                            <div className="flex flex-col">
                              {course.originalPrice && (
                                <span className="text-[10px] text-text-muted line-through">
                                  {toArabicDigits(course.originalPrice)}
                                </span>
                              )}
                              <span className="text-sm font-bold text-gold-primary font-serif">
                                {toArabicDigits(course.price)}
                              </span>
                            </div>
                            <Link to={`/course/${course.id}`}>
                              <GoldButton className="py-2 px-4 text-[10px]">عرض التفاصيل</GoldButton>
                            </Link>
                          </div>
                        </GoldCard>
                      );
                    })}
                  </div>

                  {/* Courses Pagination */}
                  {totalCoursesPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                      <button
                        onClick={() => setCoursesPage(p => Math.max(1, p - 1))}
                        disabled={coursesPage === 1}
                        className="px-3 py-1.5 border border-gold-border/20 rounded-lg bg-bg-card disabled:opacity-40 cursor-pointer text-xs font-bold text-text-secondary hover:text-gold-primary transition"
                      >
                        السابق
                      </button>
                      {Array.from({ length: totalCoursesPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCoursesPage(page)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                            coursesPage === page
                              ? "bg-gold-primary text-bg-primary border-gold-primary"
                              : "bg-bg-card text-text-secondary border-gold-border/10 hover:border-gold-border hover:text-text-primary"
                          }`}
                        >
                          {toArabicDigits(page)}
                        </button>
                      ))}
                      <button
                        onClick={() => setCoursesPage(p => Math.min(totalCoursesPages, p + 1))}
                        disabled={coursesPage === totalCoursesPages}
                        className="px-3 py-1.5 border border-gold-border/20 rounded-lg bg-bg-card disabled:opacity-40 cursor-pointer text-xs font-bold text-text-secondary hover:text-gold-primary transition"
                      >
                        التالي
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Consultations Section */}
              {filteredConsultancies.length > 0 && (
                <div>
                  <div className="flex items-center justify-between border-b border-gold-border/10 pb-4 mb-6">
                    <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-gold-primary" />
                      الجلسات الاستشارية والمستشارين ({toArabicDigits(filteredConsultancies.length)})
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedConsultancies.map((c) => (
                      <GoldCard key={c.id} className="p-5 flex flex-col justify-between hover:-translate-y-1 transition duration-300">
                        <div>
                          {/* Consultant Header */}
                          <div className="flex items-center gap-3.5 mb-4">
                            <img
                              src={c.consultantImage}
                              alt={c.consultant}
                              className="h-11 w-11 rounded-full object-cover border border-gold-border/30"
                            />
                            <div>
                              <h3 className="font-bold text-text-primary text-sm">{c.consultant}</h3>
                              <span className="text-[10px] text-gold-primary block">{c.duration}</span>
                            </div>
                          </div>

                          <h4 className="font-bold text-text-primary text-sm sm:text-base leading-snug mb-2">
                            {c.title}
                          </h4>
                          <p className="text-text-secondary text-xs leading-relaxed line-clamp-3 mb-4 h-14">
                            {c.summary}...
                          </p>
                        </div>

                        {/* Pricing & Booking */}
                        <div className="flex items-center justify-between pt-3 border-t border-border-subtle mt-2">
                          <span className="text-sm font-bold text-gold-primary font-serif">
                            {toArabicDigits(c.price)}
                          </span>
                          <Link to={`/consultation/${c.id}`}>
                            <GoldButton className="py-2 px-4 text-[10px] bg-transparent text-gold-primary border-gold-primary/50 hover:bg-gold-primary hover:text-bg-primary">
                              احجز جلسة الآن
                            </GoldButton>
                          </Link>
                        </div>
                      </GoldCard>
                    ))}
                  </div>

                  {/* Consultations Pagination */}
                  {totalConsultanciesPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                      <button
                        onClick={() => setConsultanciesPage(p => Math.max(1, p - 1))}
                        disabled={consultanciesPage === 1}
                        className="px-3 py-1.5 border border-gold-border/20 rounded-lg bg-bg-card disabled:opacity-40 cursor-pointer text-xs font-bold text-text-secondary hover:text-gold-primary transition"
                      >
                        السابق
                      </button>
                      {Array.from({ length: totalConsultanciesPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setConsultanciesPage(page)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                            consultanciesPage === page
                              ? "bg-gold-primary text-bg-primary border-gold-primary"
                              : "bg-bg-card text-text-secondary border-gold-border/10 hover:border-gold-border hover:text-text-primary"
                          }`}
                        >
                          {toArabicDigits(page)}
                        </button>
                      ))}
                      <button
                        onClick={() => setConsultanciesPage(p => Math.min(totalConsultanciesPages, p + 1))}
                        disabled={consultanciesPage === totalConsultanciesPages}
                        className="px-3 py-1.5 border border-gold-border/20 rounded-lg bg-bg-card disabled:opacity-40 cursor-pointer text-xs font-bold text-text-secondary hover:text-gold-primary transition"
                      >
                        التالي
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Instructors Section */}
              {filteredInstructors.length > 0 && (
                <div>
                  <div className="flex items-center justify-between border-b border-gold-border/10 pb-4 mb-6">
                    <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                      <User className="h-5 w-5 text-gold-primary" />
                      الخبراء والمدربين ({toArabicDigits(filteredInstructors.length)})
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedInstructors.map((inst) => (
                      <GoldCard key={inst.id} className="p-5 flex flex-col justify-between hover:-translate-y-1 transition duration-300">
                        <div>
                          {/* Info */}
                          <div className="text-center mb-4">
                            <div className="relative h-20 w-20 rounded-full overflow-hidden border border-gold-border/30 mx-auto mb-3">
                              <img src={inst.avatar} alt={inst.name} className="h-full w-full object-cover" />
                            </div>
                            <h3 className="font-bold text-text-primary text-base">{inst.name}</h3>
                            <p className="text-[10px] text-gold-primary font-medium mt-1">{inst.title}</p>
                          </div>

                          <p className="text-text-secondary text-xs leading-relaxed text-center line-clamp-2 h-10 mb-4">
                            {inst.summary}
                          </p>

                          {/* Skills */}
                          <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                            {inst.skills.slice(0, 3).map((skill, index) => (
                              <span key={index} className="text-[8px] sm:text-[9px] bg-bg-elevated text-text-secondary border border-border-subtle px-2 py-0.5 rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Profile Link */}
                        <div className="text-center pt-3 border-t border-border-subtle mt-2">
                          <Link
                            to={`/instructor/${inst.id}`}
                            className="inline-flex items-center gap-1.5 text-xs text-gold-primary hover:underline font-semibold"
                          >
                            عرض السيرة الذاتية والدورات
                            <ArrowLeft className="h-3 w-3" />
                          </Link>
                        </div>
                      </GoldCard>
                    ))}
                  </div>

                  {/* Instructors Pagination */}
                  {totalInstructorsPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                      <button
                        onClick={() => setInstructorsPage(p => Math.max(1, p - 1))}
                        disabled={instructorsPage === 1}
                        className="px-3 py-1.5 border border-gold-border/20 rounded-lg bg-bg-card disabled:opacity-40 cursor-pointer text-xs font-bold text-text-secondary hover:text-gold-primary transition"
                      >
                        السابق
                      </button>
                      {Array.from({ length: totalInstructorsPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setInstructorsPage(page)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                            instructorsPage === page
                              ? "bg-gold-primary text-bg-primary border-gold-primary"
                              : "bg-bg-card text-text-secondary border-gold-border/10 hover:border-gold-border hover:text-text-primary"
                          }`}
                        >
                          {toArabicDigits(page)}
                        </button>
                      ))}
                      <button
                        onClick={() => setInstructorsPage(p => Math.min(totalInstructorsPages, p + 1))}
                        disabled={instructorsPage === totalInstructorsPages}
                        className="px-3 py-1.5 border border-gold-border/20 rounded-lg bg-bg-card disabled:opacity-40 cursor-pointer text-xs font-bold text-text-secondary hover:text-gold-primary transition"
                      >
                        التالي
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
