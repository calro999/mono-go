import { useEffect } from 'react';
import { AmazonProductArticle } from '../types';
import { AMAZON_CATEGORIES } from '../data';
import { updateSeoGeoMetadata, generateProductJsonLd } from '../utils/seoGeo';
import { ArrowLeft, Star, ExternalLink, Check, ShoppingCart, Tag, BookOpen, AlertCircle, Home } from 'lucide-react';

interface ProductDetailPageProps {
  articleId: string;
  articles: AmazonProductArticle[];
  onNavigate: (path: string) => void;
}

export function ProductDetailPage({ articleId, articles, onNavigate }: ProductDetailPageProps) {
  const article = articles.find(a => a.id === articleId) || articles[0];

  useEffect(() => {
    if (!article) return;

    const baseUrl = window.location.origin;
    const jsonLd = generateProductJsonLd(article, baseUrl);

    updateSeoGeoMetadata({
      title: `${article.title}`,
      description: `${article.title}の検証本音レビュー。${article.introText.substring(0, 120)}`,
      urlPath: `/articles/${article.id}`,
      jsonLdSchema: jsonLd
    });
  }, [article]);

  if (!article) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-slate-500 font-medium">指定された商品記事が見つかりませんでした。</p>
        <button
          onClick={() => onNavigate('/')}
          className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs"
        >
          トップ一覧へ戻る
        </button>
      </div>
    );
  }

  const categoryName = AMAZON_CATEGORIES.find(c => c.id === article.category)?.name || article.category;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb Navigation (SEO & GEO) */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto py-1">
        <button 
          onClick={() => onNavigate('/')} 
          className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          <span>ホーム</span>
        </button>
        <span>/</span>
        <button 
          onClick={() => onNavigate('/')} 
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          {categoryName}
        </button>
        <span>/</span>
        <span className="text-slate-900 truncate max-w-xs">{article.title}</span>
      </nav>

      {/* Back Button */}
      <button
        onClick={() => onNavigate('/')}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>商品一覧へ戻る</span>
      </button>

      {/* Main Product Article Container */}
      <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
        {/* Header Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-extrabold rounded-lg border border-indigo-100">
            {categoryName}
          </span>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center text-amber-500 font-extrabold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
              <span>{article.starRating} / 5.0</span>
            </div>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-medium">検証担当: {article.reviewerName || '検証レビュアー'}</span>
          </div>
        </div>

        {/* Title & Intro */}
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-slate-700 text-base leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100">
            {article.introText}
          </p>
        </div>

        {/* Hero Image & Features */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="col-span-1 md:col-span-5 rounded-2xl overflow-hidden border border-slate-100 shadow-sm aspect-square bg-slate-100">
            <img
              src={article.imageUrl}
              alt={article.productName || article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="col-span-1 md:col-span-7 space-y-4">
            <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-indigo-600" />
              <span>主な特徴・アピールポイント</span>
            </h2>
            <div className="space-y-2.5">
              {article.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-emerald-50/60 border border-emerald-200 p-5 rounded-2xl space-y-2">
            <h3 className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>良かった点 (Pros)</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {article.pros.map((p, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">・</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-rose-50/60 border border-rose-200 p-5 rounded-2xl space-y-2">
            <h3 className="text-xs font-extrabold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>気になる点 (Cons)</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {article.cons.map((c, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">・</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Real Review Body */}
        <div className="border-t border-slate-100 pt-8 space-y-4">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>実体験レビュー詳細</span>
          </h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-800 leading-relaxed whitespace-pre-line">
            {article.reviewBody}
          </div>
        </div>

        {/* GEO Structured FAQ Section */}
        {article.faqs && article.faqs.length > 0 && (
          <section className="border-t border-slate-100 pt-8 space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-indigo-600" />
              <span>よくある質問と回答（FAQ）</span>
            </h2>
            <div className="space-y-3">
              {article.faqs.map((faq, fIdx) => (
                <div key={fIdx} className="bg-indigo-50/40 border border-indigo-100 p-4 rounded-xl space-y-2">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 flex items-start gap-2">
                    <span className="bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">Q</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 pl-5 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Amazon Affiliate Purchase Box */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-6 sm:p-8 rounded-2xl text-center space-y-4 shadow-sm">
          <h3 className="text-sm font-extrabold text-slate-800">
            {article.ctaTitle}
          </h3>
          <a
            href={article.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-base shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Amazonで商品詳細と最新価格を見る</span>
            <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
          </a>
        </div>
      </article>
    </div>
  );
}
