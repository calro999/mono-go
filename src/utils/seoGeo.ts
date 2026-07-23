import { AmazonProductArticle, BlogPost, AuthorProfile } from '../types';

export interface SeoGeoOptions {
  title: string;
  description: string;
  imageUrl?: string;
  urlPath?: string;
  jsonLdSchema?: object | object[];
}

/**
 * Update dynamic head meta tags, OpenGraph, Twitter Cards, and JSON-LD schema for SEO and GEO
 */
export function updateSeoGeoMetadata(config: SeoGeoOptions) {
  const urlPath = config.urlPath || window.location.pathname;
  const fullUrl = `https://mono-go.vercel.app${urlPath}`;
  const fullImage = config.imageUrl
    ? (config.imageUrl.startsWith('http') ? config.imageUrl : `https://mono-go.vercel.app${config.imageUrl}`)
    : 'https://mono-go.vercel.app/images/products/biore-uv.jpg';

  // 1. Update Document Title
  document.title = `${config.title} | Lumière 夏コスメ・ボディケア検証本音レビュー`;

  // 2. Helper to set or update meta tag
  const setMeta = (selector: string, attrName: string, attrValue: string, content: string) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Standard Meta Tags
  setMeta('meta[name="description"]', 'name', 'description', config.description);
  setMeta('meta[name="keywords"]', 'name', 'keywords', '夏コスメ2026,日焼け止め,UVケア,84体臭ケア,口臭ケア,メンズコスメ,デパコス,プチプラ,Amazonおすすめ');
  setMeta('meta[name="author"]', 'name', 'author', 'Lumière コスメ編集部 (タクマ & エリ)');

  // Open Graph (OGP) Meta Tags for Social & AI Engines
  setMeta('meta[property="og:title"]', 'property', 'og:title', config.title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', config.description);
  setMeta('meta[property="og:url"]', 'property', 'og:url', fullUrl);
  setMeta('meta[property="og:image"]', 'property', 'og:image', fullImage);
  setMeta('meta[property="og:type"]', 'property', 'og:type', urlPath.startsWith('/blogs') ? 'article' : 'website');
  setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Lumière (ルミエール)');
  setMeta('meta[property="og:locale"]', 'property', 'og:locale', 'ja_JP');

  // Twitter Cards
  setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', config.title);
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', config.description);
  setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', fullImage);

  // Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', fullUrl);

  // 3. Inject JSON-LD Schema.org Data
  if (config.jsonLdSchema) {
    let scriptEl = document.querySelector('#geo-jsonld-schema') as HTMLScriptElement;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'geo-jsonld-schema';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    const schemas = Array.isArray(config.jsonLdSchema)
      ? config.jsonLdSchema
      : [config.jsonLdSchema];
    scriptEl.textContent = JSON.stringify(schemas, null, 2);
  }
}

/**
 * Generate Product and Review JSON-LD Schema for Product Detail Page
 */
export function generateProductJsonLd(
  article: AmazonProductArticle,
  domain = 'https://mono-go.vercel.app'
) {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: article.productName || article.title,
    image: [article.imageUrl.startsWith('http') ? article.imageUrl : `${domain}${article.imageUrl}`],
    description: article.introText,
    sku: article.asin,
    mpn: article.asin,
    brand: {
      '@type': 'Brand',
      name: 'Amazon Pick'
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: article.starRating.toString(),
        bestRating: '5'
      },
      author: {
        '@type': 'Person',
        name: article.reviewerName || 'タクマ @男性コスメ部長'
      },
      reviewBody: article.reviewBody
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: article.starRating.toString(),
      reviewCount: '128'
    },
    offers: {
      '@type': 'Offer',
      url: article.affiliateLink,
      priceCurrency: 'JPY',
      price: '1980',
      priceValidUntil: '2026-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: domain
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: article.productName || article.title,
        item: `${domain}/articles/${article.id}`
      }
    ]
  };

  return [productSchema, breadcrumbSchema];
}

/**
 * Generate BlogPosting JSON-LD Schema for Blog Posts
 */
export function generateBlogJsonLd(
  post: BlogPost,
  domain = 'https://mono-go.vercel.app'
) {
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.introText,
    image: [post.coverImage.startsWith('http') ? post.coverImage : `${domain}${post.coverImage}`],
    datePublished: post.createdAt,
    dateModified: post.createdAt,
    author: {
      '@type': 'Person',
      name: post.authorName,
      jobTitle: post.authorRole,
      image: post.authorAvatar
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lumière (ルミエール)',
      logo: {
        '@type': 'ImageObject',
        url: `${domain}/images/products/biore-uv.jpg`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${domain}/blogs/${post.id}`
    }
  };

  return [blogSchema];
}

/**
 * Generate Person JSON-LD Schema for Authors
 */
export function generateAuthorJsonLd(
  author: AuthorProfile,
  domain = 'https://mono-go.vercel.app'
) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: author.name,
      jobTitle: author.role,
      description: author.bio,
      image: author.avatarUrl,
      knowsAbout: [author.specialty, '夏コスメ', '身だしなみケア']
    }
  ];
}
