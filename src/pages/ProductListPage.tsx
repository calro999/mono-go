import { useState, useEffect } from 'react';
import { AmazonProductArticle } from '../types';
import { AMAZON_CATEGORIES } from '../data';
import { updateSeoGeoMetadata } from '../utils/seoGeo';
import { Search, Star, Store, Check, ExternalLink, ShoppingCart, ChevronRight, Tag } from 'lucide-react';

interface ProductListPageProps {
  articles: AmazonProductArticle[];
  onNavigate: (path: string) => void;
}

export function ProductListPage({ articles, onNavigate }: ProductListPageProps) {
  const [activeCategorySlug, setActiveCategorySlug] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    updateSeoGeoMetadata({
      title: '2026年夏 厳選コスメ・ボディケアおすすめ一覧 32選',
      description: '日焼け止め、UVカット化粧水、8×4などの制汗デオドラント、口臭ケアなど、2026年夏の猛暑を乗り切る人気コスメ・ボディケア商品を検証レビュー。',
      urlPath: '/'
    });
  }, []);

  const filteredArticles = articles.filter(art => {
    const categoryMatches = activeCategorySlug === 'all' || art.category === activeCategorySlug;
    const queryMatches = !searchQuery.trim() || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      art.reviewBody.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.asin.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatches && queryMatches;
  });

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 font-extrabold text-xs rounded-full border border-indigo-500/30">
            2026 SUMMER SELECTION
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            猛暑を乗り切る<br />
            <span className="text-amber-400">厳選夏コスメ＆ボディケア</span> 本音レビュー
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            日焼け止め・UVケア・制汗防臭・頭皮ニオイ・口臭ケアまで、当サイトの検証レビュアー陣が実際に自ら試して本当に効果のあった厳選32アイテムを徹底解説。
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Category Selector (3 Cols) */}
        <div className="col-span-1 lg:col-span-3 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="商品を検索..."
              className="w-full bg-white border border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl pl-10 pr-8 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ×
              </button>
            )}
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2">
            <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider px-2 mb-2">
              カテゴリー検索
            </h2>
            <button
              onClick={() => setActiveCategorySlug('all')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategorySlug === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4" />
                <span>すべて表示</span>
              </div>
              <span className="text-[11px] opacity-80">{articles.length}</span>
            </button>

            {AMAZON_CATEGORIES.map(cat => {
              const count = articles.filter(a => a.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategorySlug(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCategorySlug === cat.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-indigo-500" />
                    <span>{cat.name}</span>
                  </div>
                  <span className="text-[11px] opacity-80">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Product Grid (9 Cols) */}
        <div className="col-span-1 lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>🛒 該当する厳選アイテム</span>
              <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                {filteredArticles.length}件
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map(art => (
              <div
                key={art.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-slate-100 border border-slate-100">
                    <img
                      src={art.imageUrl}
                      alt={art.productName || art.title}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/90 text-white text-[11px] font-extrabold rounded-md backdrop-blur-sm">
                      ★ {art.starRating}
                    </span>
                  </div>

                  <span className="text-[11px] font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 inline-block mb-2">
                    {AMAZON_CATEGORIES.find(c => c.id === art.category)?.name || art.category}
                  </span>

                  <h3 
                    onClick={() => onNavigate(`/articles/${art.id}`)}
                    className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer leading-snug mb-2 line-clamp-2"
                  >
                    {art.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-4">
                    {art.introText}
                  </p>

                  <div className="space-y-1 mb-4">
                    {art.features.slice(0, 2).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onNavigate(`/articles/${art.id}`)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>詳細ページを見る</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={art.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-1"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Amazon</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
