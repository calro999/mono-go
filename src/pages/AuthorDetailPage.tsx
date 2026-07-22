import { useEffect } from 'react';
import { AUTHOR_PROFILES, INITIAL_ARTICLES } from '../data';
import { updateSeoGeoMetadata, generateAuthorJsonLd } from '../utils/seoGeo';
import { ArrowLeft, ExternalLink, Check, ShoppingCart, Home } from 'lucide-react';

interface AuthorDetailPageProps {
  authorId: string;
  onNavigate: (path: string) => void;
}

export function AuthorDetailPage({ authorId, onNavigate }: AuthorDetailPageProps) {
  const author = AUTHOR_PROFILES.find(a => a.id === authorId) || AUTHOR_PROFILES[0];

  useEffect(() => {
    if (!author) return;

    const baseUrl = window.location.origin;
    const jsonLd = generateAuthorJsonLd(author, baseUrl);

    updateSeoGeoMetadata({
      title: `${author.name} (${author.role})`,
      description: `${author.name}の検証プロフィール。${author.bio.substring(0, 100)}`,
      urlPath: `/authors/${author.id}`,
      jsonLdSchema: jsonLd
    });
  }, [author]);

  if (!author) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-slate-500 font-medium">レビュアーが見つかりませんでした。</p>
        <button
          onClick={() => onNavigate('/authors')}
          className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs"
        >
          レビュアー一覧へ戻る
        </button>
      </div>
    );
  }

  const authorArticles = INITIAL_ARTICLES.filter(a => a.reviewerName?.includes(author.name.split(' ')[0]));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb Navigation */}
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
          onClick={() => onNavigate('/authors')} 
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          検証レビュアー一覧
        </button>
        <span>/</span>
        <span className="text-slate-900 truncate max-w-xs">{author.name}</span>
      </nav>

      {/* Back Button */}
      <button
        onClick={() => onNavigate('/authors')}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>レビュアー一覧へ戻る</span>
      </button>

      {/* Author Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={author.avatarUrl}
            alt={author.avatarAlt}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-slate-200 shadow-md bg-slate-100 flex-shrink-0"
          />
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-extrabold rounded-full border border-indigo-100">
              {author.role}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{author.name}</h1>
            <p className="text-xs text-slate-500 font-bold">得意分野: {author.specialty}</p>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed pt-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
              {author.bio}
            </p>
          </div>
        </div>

        {/* Authored Articles */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <h2 className="text-lg font-black text-slate-900 flex items-center justify-between">
            <span>📝 {author.name.split(' ')[0]} が検証・執筆したレビュー記事</span>
            <span className="text-xs text-slate-500 font-medium">({authorArticles.length}件)</span>
          </h2>

          {authorArticles.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-4">現在担当アイテムを検証中です。</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {authorArticles.map(art => (
                <div
                  key={art.id}
                  onClick={() => onNavigate(`/articles/${art.id}`)}
                  className="bg-slate-50 rounded-2xl p-4 border border-slate-200 hover:border-indigo-400 transition-all cursor-pointer flex gap-4 items-center group"
                >
                  <img
                    src={art.imageUrl}
                    alt={art.productName || art.title}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600';
                    }}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-white border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1">★ {art.starRating} | {art.priceRange || '参考価格'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
