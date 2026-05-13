import categoriesRaw from "@/api/catigories/response.json";
import consultanciesRaw from "@/api/consultancies/reponse.json";
import latestRaw from "@/api/latest/response.json";

type RawCourse = {
  id: number;
  header: string;
  image?: string | null;
  squareImage?: string | null;
  courseLink?: string | null;
  trainer?: string | null;
  price?: number | null;
  newPrice?: number | null;
  discountPercentage?: number | null;
  categories?: { categoryName?: string | null }[] | null;
};

type RawCategory = {
  id: number;
  name: string;
  image?: string | null;
  description?: string | null;
  notes?: string | null;
  order?: number | null;
};

type RawConsultancy = {
  consultancyId: number;
  name: string;
  image?: string | null;
  squareImage?: string | null;
  consultantName?: string | null;
  consultantImage?: string | null;
  consultantInfo?: string | null;
  consultancyPrice?: number | null;
  timeLimit?: number | null;
};

export type LandingCourse = {
  id: number;
  title: string;
  instructor: string;
  category: string;
  price: string;
  originalPrice: string | null;
  image: string;
  href: string;
  discountPercentage: number;
};

export type LandingCategory = {
  id: number;
  name: string;
  description: string;
  image: string | null;
};

export type LandingConsultancy = {
  id: number;
  title: string;
  consultant: string;
  price: string;
  duration: string;
  image: string;
  consultantImage: string;
  summary: string;
};

const coursesRaw = latestRaw as RawCourse[];
const categoriesResponse = categoriesRaw as RawCategory[];
const consultanciesResponse = consultanciesRaw as RawConsultancy[];

const formatPrice = (price?: number | null) =>
  typeof price === "number" && price > 0 ? `$${price.toLocaleString("en-US")}` : "مجاني";

const stripHtml = (value?: string | null) =>
  (value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

export const courses: LandingCourse[] = coursesRaw
  .filter((course) => course.header && (course.squareImage || course.image))
  .map((course) => ({
    id: course.id,
    title: course.header.trim(),
    instructor: course.trainer?.trim() || "مدرب ماستري",
    category: course.categories?.find((category) => category.categoryName)?.categoryName?.trim() || "دورة تدريبية",
    price: formatPrice(course.newPrice ?? course.price),
    originalPrice: course.newPrice ? formatPrice(course.price) : null,
    image: course.squareImage || course.image || "",
    href: course.courseLink ? `#${course.courseLink}` : "#",
    discountPercentage: course.discountPercentage ?? 0,
  }));

export const categories: LandingCategory[] = categoriesResponse
  .slice()
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  .map((category) => ({
    id: category.id,
    name: category.name.trim(),
    description: (category.description || category.notes || "").trim(),
    image: category.image || null,
  }));

export const consultancies: LandingConsultancy[] = consultanciesResponse
  .filter((consultancy) => consultancy.name && (consultancy.squareImage || consultancy.image))
  .map((consultancy) => ({
    id: consultancy.consultancyId,
    title: consultancy.name.trim(),
    consultant: consultancy.consultantName?.trim() || "مستشار ماستري",
    price: formatPrice(consultancy.consultancyPrice),
    duration: consultancy.timeLimit ? `${consultancy.timeLimit} دقيقة` : "جلسة استشارية",
    image: consultancy.squareImage || consultancy.image || "",
    consultantImage: consultancy.consultantImage || consultancy.squareImage || consultancy.image || "",
    summary: stripHtml(consultancy.consultantInfo).slice(0, 150),
  }));

export const featuredCourses = courses.slice(0, 4);
export const diplomaCourses = [
  ...courses.filter((course) => course.title.includes("دبلوم")),
  ...courses.filter((course) => course.price !== "$129"),
].filter((course, index, list) => list.findIndex((item) => item.id === course.id) === index).slice(0, 3);
export const featuredConsultancies = consultancies.slice(0, 3);

export const landingStats = {
  courses: courses.length,
  categories: categories.length,
  consultancies: consultancies.length,
  instructors: new Set(courses.map((course) => course.instructor)).size,
};

export const navLinks = [
  ...categories.slice(0, 4).map((category) => category.name),
  "استشارات",
];

export const tickerItems = [
  `${landingStats.courses}+ دورة`,
  `${landingStats.categories} قسم تدريبي`,
  `${landingStats.consultancies}+ استشارة`,
  `${landingStats.instructors}+ مدرب وخبير`,
  ...categories.slice(0, 2).map((category) => category.name),
];

