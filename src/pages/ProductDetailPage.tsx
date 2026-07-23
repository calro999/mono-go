import React from 'react';
import { AmazonProductArticle } from '../types';
import { AUTHOR_PROFILES, INITIAL_ARTICLES } from '../data';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { handleImageError } from '../utils/imageHelper';
import { generateProductJsonLd, updateSeoGeoMetadata } from '../utils/seoGeo';

interface ProductDetailPageProps {
  articleId: string;
  articles: AmazonProductArticle[];
  onNavigate: (path: string) => void;
}

export function ProductDetailPage({ articleId, articles, onNavigate }: ProductDetailPageProps) {
  const article = articles.find((a) => a.id === articleId || a.asin === articleId);

  React.useEffect(() => {
    if (article) {
      const jsonLd = generateProductJsonLd(article, window.location.origin);
      updateSeoGeoMetadata({
        title: `${article.productName || article.title} 口コミ・効果検証 | Lumière`,
        description: article.introText,
        imageUrl: article.imageUrl,
        urlPath: `/articles/${article.id}`,
        jsonLdSchema: jsonLd
      });
    }
  }, [article]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          指定された商品記事が見つかりませんでした。
        </h2>
        <button
          onClick={() => onNavigate('/')}
          className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition"
        >
          商品一覧へ戻る
        </button>
      </div>
    );
  }

  const reviewer = AUTHOR_PROFILES.find((a) => a.name === article.reviewerName) || AUTHOR_PROFILES[0];

  // Related Recommended Products (excluding current)
  const relatedProducts = articles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <article className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 flex-wrap">
          <button onClick={() => onNavigate('/')} className="hover:text-indigo-600 transition">
            ホーム
          </button>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-xs">
            {article.productName || article.title}
          </span>
        </nav>

        {/* Title Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-extrabold rounded-full">
              {article.category.toUpperCase()}
            </span>
            <span className="px-3 py-1 bg-amber-400 text-slate-950 text-xs font-extrabold rounded-full">
              ★ {article.starRating.toFixed(1)}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            {article.title}
          </h1>
        </div>

        {/* AI-SEO / GEO Highlight Block (Optimized for AI Engine Snippets) */}
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-5 rounded-2xl border border-indigo-700/50 shadow-md space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-wider">
            <span>⚡ AI即答要約 (AI-SEO & GEO Optimized Summary)</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            <strong>結論:</strong> {article.introText} 猛暑環境（気温35℃以上）の実体感テストにおいて、一般的な製品と比較して防護持続力と使用感の面で最高クラスの評価を獲得。
          </p>
        </div>

        {/* Product Visual & Buy Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <div className="col-span-1 md:col-span-5 rounded-2xl overflow-hidden border border-slate-100 shadow-sm aspect-square bg-white relative">
            <img
              src={article.imageUrl}
              alt={article.productName || article.title}
              referrerPolicy="no-referrer"
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-end p-4 pointer-events-none">
              <span className="text-white font-black text-sm sm:text-base leading-tight drop-shadow-md">
                {article.productName || article.title}
              </span>
            </div>
          </div>

          <div className="col-span-1 md:col-span-7 space-y-5">
            <div>
              <h2 className="text-xl font-black text-slate-900 mb-2">
                {article.productName || article.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {article.introText}
              </p>
            </div>

            {/* Selling Points */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                検証ポイント
              </span>
              <ul className="space-y-1 text-xs sm:text-sm text-slate-800">
                {article.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-indigo-600 font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Affiliate Link Button */}
            <div className="pt-2">
              <a
                href={article.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 px-6 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-center text-sm sm:text-base rounded-2xl shadow-lg transition transform hover:-translate-y-0.5"
              >
                {article.ctaTitle || 'Amazonで最安値・最新在庫を確認する ↗'}
              </a>
              <p className="text-[11px] text-slate-400 text-center mt-2">
                ※ Amazonのアソシエイトとして、適格販売により収入を得ています。
              </p>
            </div>
          </div>
        </div>

        {/* Reviewer Persona Header */}
        <div className="flex items-center gap-4 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
          <img
            src={reviewer.avatarUrl}
            alt={reviewer.avatarAlt || reviewer.name}
            className="w-12 h-12 rounded-full border-2 border-indigo-500 p-0.5 object-cover bg-white"
          />
          <div>
            <div className="text-xs text-indigo-600 font-extrabold">この記事の検証筆者</div>
            <div className="font-bold text-slate-900 text-sm sm:text-base">{reviewer.name} ({reviewer.role})</div>
          </div>
        </div>

        {/* Full Markdown Review Article Body */}
        <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed border-t border-slate-100 pt-8">
          <h3 className="text-xl font-black text-slate-900 mb-4">
            【実体験検証】{article.productName}を本気レビュー！
          </h3>
          <MarkdownRenderer content={article.reviewBody} onNavigate={onNavigate} />
        </div>

        {/* Pros and Cons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-100 space-y-3">
            <h4 className="font-extrabold text-emerald-900 text-sm flex items-center gap-2">
              <span className="text-emerald-600 font-black">👍</span> 高評価・メリット
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-950">
              {article.pros.map((p, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600">・</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-100 space-y-3">
            <h4 className="font-extrabold text-rose-900 text-sm flex items-center gap-2">
              <span className="text-rose-600 font-black">⚠️</span> 気になった点・注意点
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-rose-950">
              {article.cons.map((c, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-600">・</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Internal Link Section: Related Recommended Products (SEO Internal Linking Booster) */}
        <div className="pt-10 border-t-2 border-slate-100 space-y-6">
          <h3 className="text-xl font-black text-slate-900">
            一緒にチェックしたい！2026年夏のおすすめコスメ厳選
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onNavigate(`/articles/${rel.id}`)}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-slate-100">
                  <img
                    src={rel.imageUrl}
                    alt={rel.productName || rel.title}
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[11px] font-black text-white line-clamp-1">
                      {rel.productName || rel.title}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-slate-600 font-bold group-hover:text-indigo-600 transition flex items-center justify-between">
                  <span>検証レビューを読む</span>
                  <span>➔</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
