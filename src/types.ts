export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface AmazonProductArticle {
  id: string;
  title: string;
  originalUrl: string;
  asin: string;
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
  showAdminPanel: boolean; // Toggle between Public Store Front and Management Admin Console
  simulatedCronActive: boolean; // Simulation of GitHub Actions 1-hour hourly runner
}
