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
  category: string; // e.g. "skincare", "deodorant", "oralcare", "makeup", "haircare", "device"
  imageUrl: string; // Product photo URL
  starRating: number; // e.g. 4.5
  introText: string; // Hook text
  features: string[]; // Key selling points
  pros: string[];
  cons: string[];
  reviewBody: string; // Real review body text
  ctaTitle: string; // Catchy CTA text
  affiliateLink: string; // Target link with Associate ID: mattan0290c-22
  createdAt: string;
  estimatedPV: number;
  clicks: number;
  earnings: number;
  aiModelUsed: string;
  summaryKeyPoints?: string[];
  faqs?: ArticleFAQ[];
  reviewerName?: string;
  reviewerRole?: string;
  verificationDays?: number;
  priceRange?: string;
}

export interface AuthorProfile {
  id: string;
  name: string; // e.g. "タクマ @男性コスメ部長"
  role: string; // e.g. "男性美容統括"
  avatarUrl: string; // Circle avatar photo
  avatarAlt: string; // alt attribute for image: 筆者名
  bio: string; // Simple background & review policy
  specialty: string; // Primary area of expertise
  experienceYears: number; // Experience in years
  genderTarget: 'men' | 'women' | 'unisex';
  isDepartmentHead?: boolean; // Is 部長
  qualifications?: string[]; // 保有資格
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

export interface AmazonGoState {
  associateId: string; // "mattan0290c-22"
  fallbackAdUrl: string;
  activeCategorySlug: string;
  articles: AmazonProductArticle[];
}
