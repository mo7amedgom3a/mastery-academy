import { courses, LandingCourse, consultancies, LandingConsultancy } from "./landing-data";

export interface InstructorProfile {
  id: string;
  name: string;
  title: string;
  avatar: string;
  summary: string;
  bio: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    website?: string;
  };
  experiences: string[];
  skills: string[];
  coursesTaught: LandingCourse[];
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  isPreview: boolean;
}

export interface CourseSection {
  title: string;
  duration: string;
  lessons: CourseLesson[];
}

export interface CourseDetail {
  id: number;
  title: string;
  category: string;
  price: string;
  originalPrice: string | null;
  image: string;
  introduction: string;
  hours: string;
  lessonsCount: number;
  introVideo: {
    url: string;
    thumbnail: string;
  };
  certificateImage: string;
  goals: string[];
  targetUsers: string[];
  roadmap: { step: string; desc: string }[];
  sections: CourseSection[];
  instructor: InstructorProfile;
}

export interface CoursePackage {
  id: string;
  title: string;
  desc: string;
  price: string;
  originalPrice: string;
  image: string;
  courses: LandingCourse[];
  features: string[];
}

// 1. Mock Instructors Database
export const instructorsDb: Record<string, Omit<InstructorProfile, "coursesTaught" | "id">> = {
  "أ.د. محمد السعيد": {
    name: "أ.د. محمد السعيد",
    title: "خبير استشارات إدارة الأعمال والتطوير المؤسسي",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&h=256&q=80",
    summary: "أستاذ إدارة الأعمال ومالك ومؤسس عدة شركات ريادية، يتمتع بخبرة تزيد عن 20 عاماً في الاستشارات الإدارية وتطوير الهياكل التنظيمية للشركات الكبرى بالمنطقة العربية.",
    bio: "دكتوراه في إدارة الأعمال الاستراتيجية من جامعة لندن. عمل كمستشار إداري لدى العديد من الجهات الحكومية والخاصة في الخليج ومصر. يركز في تدريبه على تمكين القيادات التنفيذية وتأهيل رواد الأعمال للتوسع والنمو المستدام.",
    socials: {
      linkedin: "https://linkedin.com/in/mohammad-alsaeed",
      twitter: "https://twitter.com/dr_alsaeed",
      website: "https://alsaeed-consulting.com"
    },
    experiences: [
      "رئيس مجلس إدارة مجموعة السعيد القابضة (2018 - الآن).",
      "أستاذ زائر للاستراتيجية وريادة الأعمال بجامعة الدول العربية (2015 - 2022).",
      "مستشار إعادة الهيكلة والتطوير المؤسسي لـ 15 شركة مساهمة بالشرق الأوسط."
    ],
    skills: ["التخطيط الاستراتيجي", "إعادة الهيكلة الإدارية", "القيادة التنفيذية", "حوكمة الشركات"]
  },
  "م. ياسمين رفعت": {
    name: "م. ياسمين رفعت",
    title: "مستشارة التسويق الرقمي وبناء العلامات التجارية",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80",
    summary: "خبيرة في استراتيجيات التسويق الرقمي وإعلانات الأداء وصناعة المحتوى، ساعدت أكثر من 200 علامة تجارية على تحقيق نمو بنسبة تزيد عن 300% في مبيعاتها الرقمية.",
    bio: "ماجستير التسويق الرقمي وبحوث المستهلك. عملت كمديرة تسويق إقليمية لعدة منصات تجارة إلكترونية كبرى قبل تفرغها للاستشارات والتدريب. تركز على دمج الذكاء الاصطناعي في عمليات التسويق اليومية.",
    socials: {
      linkedin: "https://linkedin.com/in/yasmin-refaat",
      twitter: "https://twitter.com/yasmin_marketing",
      youtube: "https://youtube.com/c/yasmin-refaat"
    },
    experiences: [
      "مؤسسة وكالة 'جروس ماركتنج' للاستشارات التسويقية.",
      "مديرة تسويق إقليمية سابقة لمنصة تجارة إلكترونية رائدة (2016 - 2020).",
      "تدريب أكثر من 15,000 طالب عربي في مجالات الإعلانات الممولة وقنوات التحويل الرقمي."
    ],
    skills: ["إعلانات الأداء", "التسويق عبر المحتوى", "أدوات التحليل الرقمي", "الذكاء الاصطناعي التسويقي"]
  },
  "د. خالد الفيصل": {
    name: "د. خالد الفيصل",
    title: "استشاري الاستثمار والتحليل المالي للشركات",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&h=256&q=80",
    summary: "مستشار مالي معتمد ومحلل استثماري، ذو خبرة واسعة في التقييم المالي وإعداد دراسات الجدوى وطرح الشركات للاكتتاب العام.",
    bio: "حاصل على شهادة المحلل المالي المعتمد CFA ودكتوراه في التمويل والاستثمار. أشرف على محافظ استثمارية كبرى وصناديق عقارية وجريئة بالمنطقة العربية. يقدم دورات عملية مكثفة في الفهم المالي وصناعة القرارات الاستثمارية.",
    socials: {
      linkedin: "https://linkedin.com/in/khalid-alfaisal",
      twitter: "https://twitter.com/khalid_finance",
      website: "https://alfaisal-financial.com"
    },
    experiences: [
      "رئيس قسم التحليل المالي بصندوق الاستثمار العربي (2014 - 2021).",
      "شريك مؤسس لشركة 'فينسيال غايد' للاستشارات المالية والدراسات الاقتصادية.",
      "مستشار مالي للعديد من عمليات الاندماج والاستحواذ بالخليج العربي."
    ],
    skills: ["التقييم المالي والنمذجة", "دراسات الجدوى والاستثمار", "حوكمة رأس المال الجريء", "مؤشرات الأداء المالي"]
  },
  "المستشار أحمد ناجي": {
    name: "المستشار أحمد ناجي",
    title: "استشاري القانون التجاري والتحكيم الدولي",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80",
    summary: "محامي ومستشار قانوني متخصص في صياغة العقود التجارية وتأسيس الشركات وحماية الملكية الفكرية وفض النزاعات الاستثمارية.",
    bio: "ماجستير القانون التجاري الدولي وعضو جمعية المحكمين الدوليين. يقدم استشارات قانونية متكاملة لرواد الأعمال لحمايتهم من الثغرات القانونية وضمان توافق أعمالهم مع التشريعات المحلية والدولية.",
    socials: {
      linkedin: "https://linkedin.com/in/ahmad-naji-lawyer",
      twitter: "https://twitter.com/naji_law"
    },
    experiences: [
      "مؤسس مكتب 'أحمد ناجي ومشاركوه للمحاماة والاستشارات القانونية'.",
      "عضو مجلس إدارة المحكمين العرب لفض المنازعات التجارية.",
      "مستشار قانوني سابق للعديد من البنوك وشركات التأمين الإقليمية."
    ],
    skills: ["صياغة العقود التجارية", "التحكيم وفض النزاعات", "حوكمة وتأسيس الشركات", "الملكية الفكرية والعلامات"]
  }
};

// Helper to get or generate Instructor Profile dynamically
export const getInstructorProfile = (name: string, trainerId: string = ""): InstructorProfile => {
  const cleanName = name.trim();
  const matched = instructorsDb[cleanName];
  
  // Get all courses by this instructor
  const coursesTaught = courses.filter(c => c.instructor.trim() === cleanName);

  if (matched) {
    return {
      id: trainerId || `inst-${cleanName.replace(/\s+/g, "-")}`,
      ...matched,
      coursesTaught
    };
  }

  // Fallback profile if trainer details are not in DB
  return {
    id: trainerId || `inst-${cleanName.replace(/\s+/g, "-")}`,
    name: cleanName,
    title: "خبير معتمد وعضو الهيئة التدريبية بماستري أكاديمي",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&h=256&q=80",
    summary: `خبير ممارس في هذا التخصص وله باع طويل في تقديم الاستشارات المهنية وتأهيل الموارد البشرية لدى ماستري أكاديمي.`,
    bio: `انضم إلى ماستري أكاديمي لمشاركة خبرته العملية المكتسبة على مدار سنوات من العمل الميداني. تتركز رسالته على تبسيط المهارات ونقل أفضل الممارسات المهنية لرفع كفاءة الطلاب بالسوق العربي.`,
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    },
    experiences: [
      "مستشار معتمد في هذا التخصص لعدة جهات إقليمية.",
      "عضو الهيئة التدريبية العليا لماستري أكاديمي.",
      "أشرف على تأهيل وتدريب أكثر من 1,000 طالب ومنتسب مهني."
    ],
    skills: ["تطوير المهارات العملية", "الاستشارات الفنية", "التطبيق الميداني", "أدوات التخصص الحديثة"],
    coursesTaught
  };
};

// 2. Mock Packages / Bundles Database
export const packagesDb: CoursePackage[] = [
  {
    id: "p1",
    title: "حزمة التميز الإداري والمالي الشاملة",
    desc: "أقوى تجمع تعليمي للمدراء ورواد الأعمال. تجمع هذه الحزمة بين دبلومات إدارة الأعمال المتكاملة، استراتيجيات حوكمة الشركات، وأساسيات التقييم المالي ودراسات الجدوى لتأهيلك لقيادة مؤسستك بكفاءة متناهية.",
    price: "$299",
    originalPrice: "$599",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    courses: courses.filter(c => c.category.includes("إدارة") || c.category.includes("مالية")).slice(0, 3),
    features: [
      "شهادة معتمدة شاملة لكل برنامج ودبلوم داخل الحزمة.",
      "توجيه ومتابعة مباشرة لمدة 6 أشهر مع مستشاري ماستري.",
      "قوالب عمل جاهزة لإعادة الهيكلة والتخطيط المالي والموازنات.",
      "جلسة استشارية خاصة مدتها 45 دقيقة مع الدكتور محمد السعيد."
    ]
  },
  {
    id: "p2",
    title: "حزمة التسويق الرقمي والمبيعات المتكاملة",
    desc: "طريقك الأسرع لاحتراف التجارة الإلكترونية، حملات الإعلانات الممولة وإقناع المستهلكين. حزمة مدمجة تبدأ من أساسيات بناء الهوية التجارية وتصل بك للنمو التسويقي السريع وضمان عوائد استثمار ممتازة.",
    price: "$249",
    originalPrice: "$499",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
    courses: courses.filter(c => c.category.includes("تسويق") || c.category.includes("مبيعات")).slice(0, 3),
    features: [
      "الوصول الكامل إلى مكتبة الأدوات وقوالب التحليل الإعلاني.",
      "تدريب عملي ومتابعة المشاريع وتصحيحها عبر المراجع الآلي.",
      "تحديثات مستمرة للأدوات والتحديثات التقنية للمنصات الإعلانية.",
      "جلسة استشارية فنية مع المهندسة ياسمين رفعت."
    ]
  }
];

// Helper to get Course Outline and Detail dynamically
export const getCourseDetail = (id: number): CourseDetail => {
  const course = courses.find(c => c.id === id);
  if (!course) {
    throw new Error(`Course not found for ID: ${id}`);
  }

  const instructor = getInstructorProfile(course.instructor);

  // Generate sections based on category or default outline
  const sections: CourseSection[] = [
    {
      title: "الوحدة الأولى: المقدمة والمفاهيم التأسيسية",
      duration: "ساعتان",
      lessons: [
        {
          id: "1.1",
          title: "مدخل عام وأهمية هذا التخصص في سوق العمل المعاصر.",
          duration: "15:24",
          videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-holding-a-smartphone-in-his-hand-40898-large.mp4",
          isPreview: true
        },
        {
          id: "1.2",
          title: "شرح المفاهيم الأساسية والأخطاء الشائعة للمبتدئين.",
          duration: "25:10",
          isPreview: false
        },
        {
          id: "1.3",
          title: "نظرة عامة على هيكلية البرنامج والأدوات المطلوبة.",
          duration: "18:45",
          isPreview: false
        }
      ]
    },
    {
      title: "الوحدة الثانية: التخطيط وبناء الاستراتيجية العملية",
      duration: "3 ساعات",
      lessons: [
        {
          id: "2.1",
          title: "تحليل الواقع الحالي وتحديد أهداف المسار الاستراتيجي.",
          duration: "22:15",
          videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-working-on-a-laptop-at-home-41006-large.mp4",
          isPreview: true
        },
        {
          id: "2.2",
          title: "كيفية صياغة خطة عمل متكاملة خطوة بخطوة.",
          duration: "35:40",
          isPreview: false
        },
        {
          id: "2.3",
          title: "دراسة حالة تطبيقية من السوق المحلي والعالمي.",
          duration: "28:50",
          isPreview: false
        }
      ]
    },
    {
      title: "الوحدة الثالثة: التنفيذ الفعلي وأدوات الذكاء الاصطناعي",
      duration: "4 ساعات",
      lessons: [
        {
          id: "3.1",
          title: "البدء في تطبيق خطوات العمل مستعيناً بالوكلاء الأذكياء.",
          duration: "30:05",
          videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-person-typing-on-a-laptop-keyboard-40618-large.mp4",
          isPreview: true
        },
        {
          id: "3.2",
          title: "تحسين كفاءة التنفيذ وتجنب العقبات التقنية والقانونية.",
          duration: "27:12",
          isPreview: false
        },
        {
          id: "3.3",
          title: "قياس وتحليل النتائج وتعديل المسار بناءً على التحليلات.",
          duration: "24:33",
          isPreview: false
        }
      ]
    },
    {
      title: "الوحدة الرابعة: التخرج، الاعتماد والانطلاق المهني",
      duration: "ساعة ونصف",
      lessons: [
        {
          id: "4.1",
          title: "مراجعة شاملة للمشاريع وتصحيح الأخطاء عبر المراجع الآلي.",
          duration: "19:40",
          isPreview: false
        },
        {
          id: "4.2",
          title: "إرشادات الاستعداد للتقييم النهائي والحصول على الشهادة المعتمدة.",
          duration: "14:15",
          isPreview: false
        },
        {
          id: "4.3",
          title: "التوجيه المهني وبناء ملفك الشخصي للحصول على فرص عمل.",
          duration: "20:50",
          isPreview: false
        }
      ]
    }
  ];

  // Calculate stats
  const lessonsCount = sections.reduce((acc, curr) => acc + curr.lessons.length, 0);

  // Generate roadmap
  const roadmap = [
    { step: "المرحلة الأولى", desc: "التأسيس وفهم الأطر النظرية والمفاهيم الكلية وتثبيت الأدوات." },
    { step: "المرحلة الثانية", desc: "التخطيط الاستراتيجي وإجراء التحليلات اللازمة وتصميم مسار التطبيق." },
    { step: "المرحلة الثالثة", desc: "العمل التطبيقي المباشر وبناء مشاريع عملية متكاملة تحت رعاية المساعد الذكي." },
    { step: "المرحلة الرابعة", desc: "التقديم للتقييم النهائي والمراجعة الشاملة والتخريج المهني والحصول على شهادتك." }
  ];

  return {
    id: course.id,
    title: course.title,
    category: course.category,
    price: course.price,
    originalPrice: course.originalPrice,
    image: course.image,
    hours: "10.5",
    lessonsCount,
    introVideo: {
      url: "https://assets.mixkit.co/videos/preview/mixkit-man-holding-a-smartphone-in-his-hand-40898-large.mp4",
      thumbnail: course.image
    },
    certificateImage: "https://images.unsplash.com/photo-1589330694653-ded6df53f7ee?auto=format&fit=crop&w=800&q=80",
    introduction: `مرحباً بك في دبلوم ${course.title}، البرنامج الأكاديمي الأكثر تكاملاً بالوطن العربي لتأهيلك وتطوير قدراتك العملية في تخصص ${course.category}. يرتكز هذا البرنامج على الفهم العميق ونقل الخبرات مباشرة من الخبراء الممارسين والمدربين الأكفاء، لتبسيط الصعاب ونقلك لمستوى متقدم من الاحترافية والإنتاجية التي يبحث عنها سوق العمل حالياً.`,
    goals: [
      "فهم وتطبيق المفاهيم والنظريات الأساسية لهذا التخصص باحترافية تامة.",
      "القدرة على اتخاذ قرارات مهنية مبنية على أرقام وتحليلات دقيقة.",
      "اكتساب المهارات المطلوبة في صياغة الخطط والاستراتيجيات الميدانية وتنفيذها.",
      "تطوير ملف أعمال قوي ومشاريع واقعية تؤهلك للاستحواذ على الفرص الاستشارية والمهنية."
    ],
    targetUsers: [
      "المدراء والتنفيذيون الساعون لتطوير آليات عملهم ومواكبة متطلبات العصر.",
      "رواد الأعمال وأصحاب المشاريع والشركات الناشئة المهتمون بالنمو والاستقرار المالي.",
      "الخريجون الجدد والموظفون الراغبون في تغيير مسارهم المهني نحو تخصصات واعدة.",
      "المهنيون والأخصائيون الباحثون عن تطوير المهارات الفنية والحصول على ترقيات مهنية أسرع."
    ],
    roadmap,
    sections,
    instructor
  };
};
