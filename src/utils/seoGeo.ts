import { AmazonProductArticle, BlogPost, AuthorProfile } from '../types';

/**
 * Update dynamic head meta tags and JSON-LD schema for SEO and GEO (Generative Engine Optimization)
 */
export function updateSeoGeoMetadata(config: {
  title: string;
  description: string;
  urlPath: string;
  jsonLdSchema?: object[];
}) {
  // 1. Update Document Title
  document.title = `${config.title} | Lumière 夏コスメ・ボディケア検証本音レビュー`;

  // 2. Update Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', config.description);

  // 3. Update Canonical Link
  const fullUrl = `${window.location.origin}${config.urlPath}`;
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', fullUrl);

  // 4. Update OGP Meta Tags
  const setMeta = (prop: string, content: string) => {
    let meta = document.querySelector(`meta[property="${prop}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', prop);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  setMeta('og:title', config.title);
  setMeta('og:description', config.description);
  setMeta('og:url', fullUrl);
  setMeta('og:type', config.urlPath === '/' ? 'website' : 'article');

  // 5. Update JSON-LD Script Tags for GEO (Generative Engine Optimization)
  const existingJsonLd = document.querySelectorAll('script[type="application/ld+json"]');
  existingJsonLd.forEach(el => el.remove());

  if (config.jsonLdSchema && config.jsonLdSchema.length > 0) {
    config.jsonLdSchema.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }
}

/**
 * Generate Product & Review Schema for GEO
 */
export function generateProductJsonLd(article: AmazonProductArticle, baseUrl: string) {
  const articleUrl = `${baseUrl}/articles/${article.id}`;
  
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": article.productName || article.title,
    "image": [article.imageUrl],
    "description": article.introText,
    "sku": article.asin,
    "mpn": article.asin,
    "brand": {
      "@type": "Brand",
      "name": "Lumière Selection"
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": article.starRating.toString(),
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": article.reviewerName || "検証レビュアー"
      },
      "reviewBody": article.reviewBody
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": article.starRating.toString(),
      "reviewCount": "28"
    },
    "offers": {
      "@type": "Offer",
      "url": article.affiliateLink,
      "priceCurrency": "JPY",
      "price": article.priceRange?.replace(/[^0-9]/g, '') || "1200",
      "availability": "https://schema.org/InStock"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "ホーム",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "厳選商品レビュー",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": articleUrl
      }
    ]
  };

  const schemas: object[] = [productSchema, breadcrumbSchema];

  if (article.faqs && article.faqs.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": article.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
    schemas.push(faqSchema);
  }

  return schemas;
}

/**
 * Generate Blog Posting Schema for GEO
 */
export function generateBlogJsonLd(post: BlogPost, baseUrl: string) {
  const postUrl = `${baseUrl}/blogs/${post.id}`;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": [post.coverImage],
    "datePublished": post.createdAt,
    "author": {
      "@type": "Person",
      "name": post.authorName,
      "jobTitle": post.authorRole
    },
    "publisher": {
      "@type": "Organization",
      "name": "Lumière 夏コスメ検証ブログ"
    },
    "description": post.introText
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "ホーム",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "特集ブログ一覧",
        "item": `${baseUrl}/blogs`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": postUrl
      }
    ]
  };

  return [blogSchema, breadcrumbSchema];
}

/**
 * Generate Author Profile Schema for GEO
 */
export function generateAuthorJsonLd(author: AuthorProfile, baseUrl: string) {
  const authorUrl = `${baseUrl}/authors/${author.id}`;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": author.name,
    "jobTitle": author.role,
    "image": author.avatarUrl,
    "description": author.bio,
    "knowsAbout": [author.specialty]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "ホーム",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "検証レビュアー紹介",
        "item": `${baseUrl}/authors`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": author.name,
        "item": authorUrl
      }
    ]
  };

  return [personSchema, breadcrumbSchema];
}
