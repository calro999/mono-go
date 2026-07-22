export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface AmazonProductArticle {
  id: string;
  title: string;
  originalUrl: string;
  asin: string;
  productName?: string; // Product name for cleaner search links
  category: string; // e.g. "gadgets", "pc", "kitchen", "beauty", "fashion", "books-games"
  imageUrl: string; // Product photo URL or placeholder
  starRating: number; // e.g. 4.5
  introText: string; // Hook text
  features: string[]; // Key selling points
  pros: string[];
  cons: string[];
  reviewBody: string; // Markdown formatted super high-CTA review body
  ctaTitle: string; // Catchy CTA text like "＼今ならポイント付与＆最安値で購入可能！／"
  affiliateLink: string; // Target link with Associate ID
  createdAt: string;
  estimatedPV: number;
  clicks: number;
  earnings: number;
  aiModelUsed: string;
  // GEO & SEO Enhanced Fields
  summaryKeyPoints?: string[]; // 15-second key takeaways for AI Overview
  faqs?: ArticleFAQ[]; // Structured Q&A for Schema.org FAQPage
  reviewerName?: string; // E-E-A-T Author Name
  reviewerRole?: string; // E-E-A-T Author Role
  verificationDays?: number; // Real-world testing duration
  priceRange?: string; // Reference price snippet
}

export interface AuthorProfile {
  id: string;
  name: string; // e.g. "タクマ @男性コスメ部長"
  role: string; // e.g. "男性美容総合プロデューサー・メンズコスメ部長"
  avatarUrl: string; // Circle avatar photo
  avatarAlt: string; // alt attribute for image
  bio: string; // Detailed bio and testing philosophy
  qualifications: string[]; // E-E-A-T certifications/qualifications
  specialty: string; // Primary area of expertise
  experienceYears: number; // Real testing experience in years
  genderTarget: 'men' | 'women' | 'unisex';
  isDepartmentHead?: boolean; // Is コスメ部長
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  targetGender: 'men' | 'women';
  coverImage: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  createdAt: string;
  readTimeMinutes: number;
  introText: string;
  recommendedAsins: string[];
  contentMarkdown: string;
}

export interface CategorySpec {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warn' | 'ai';
}

export interface AmazonGoState {
  associateId: string; // e.g. "mattan0290c-22"
  fallbackAdUrl: string; // Default redirection link
  activeCategorySlug: string; // "all" or specific
  articles: AmazonProductArticle[];
  systemLogs: SystemLog[];
  showAdminPanel: boolean;
  simulatedCronActive: boolean;
}
