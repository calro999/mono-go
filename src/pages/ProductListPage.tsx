import React, { useState, useMemo } from 'react';
import { AmazonProductArticle } from '../types';
import { AMAZON_CATEGORIES, COMPARISON_POSTS } from '../data';
import { handleImageError } from '../utils/imageHelper';
import { updateSeoGeoMetadata } from '../utils/seoGeo';

interface ProductListPageProps {
  articles: AmazonProductArticle[];
  onNavigate: (path: string) => void;
}

export function ProductListPage({ articles, onNavigate }: ProductListPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  React.useEffect(() => {
    updateSeoGeoMetadata({
      title: 'Lumière - 2026年夏厳選コスメ＆身だしなみケアおすすめ10選',
      description: '猛暑を乗り切る日焼け止め・UVケア・体臭84・口臭ケアを徹底比較＆レビュー！',
      urlPath: '/'
    });
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchCat =
        selectedCategory === 'all' || art.category === selectedCategory;
      const matchQuery =
        !searchQuery ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (art.productName && art.productName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        art.introText.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Hero Section */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-amber-400 text-slate-950 text-xs font-black rounded-full uppercase tracking-wider mb-3 shadow-sm">
              2026 SUMMER SELECTION
            </span>
            <h1 className="text-2xl sm:text-4xl font-black leading-tight mb-3">
              猛暑に負けない！夏コスメ＆身だしなみケア厳選
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              日焼け止め、UVケア化粧水、体臭・デオドラント、口臭ケアまで！専門のコスメ部長が本気で試した実体感レビュー。
            </p>
          </div>
        </div>

        {/* VS Comparison Featured Grid (Ultra Long-Tail & High Retention Booster) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 border-l-4 border-amber-400 pl-3">
              ⚔️ どっちを買うべき？超ロングテールVS比較対決
            </h2>
            <span className="text-xs text-indigo-600 font-extrabold">
              用途・悩み別で徹底検証
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMPARISON_POSTS.map((comp) => (
              <div
                key={comp.id}
                onClick={() => onNavigate(`/compare/${comp.id}`)}
                className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-5 rounded-2xl border border-indigo-500/30 shadow-md hover:shadow-xl transition cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <span className="inline-block px-2.5 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-black rounded uppercase">
                    {comp.targetUserCategory}
                  </span>
                  <h3 className="font-extrabold text-sm sm:text-base leading-snug group-hover:text-amber-300 transition line-clamp-2">
                    {comp.title}
                  </h3>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-white transition">
                  <span>VS対決の勝者をチェック</span>
                  <span>➔</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                すべて ({articles.length})
              </button>
              {AMAZON_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[200px] sm:w-64">
              <input
                type="text"
                placeholder="商品名やキーワードで検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => onNavigate(`/articles/${art.id}`)}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer group"
            >
              {/* Product Image Container: Reflea has NO Overlay, all others have Dark Text Overlay */}
              <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                <img
                  src={art.imageUrl}
                  alt={art.productName || art.title}
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  className={`w-full h-full object-cover ${art.asin === 'B09NPPZLN1' ? 'opacity-100' : 'opacity-75 group-hover:scale-105 transition-transform duration-500'}`}
                />
                
                {/* Reflea Only: No Overlay, All Other Products: Dark Overlay with Center Text */}
                {art.asin !== 'B09NPPZLN1' && (
                  <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[1px] flex items-center justify-center p-4 text-center z-0">
                    <span className="text-white font-black text-sm sm:text-base leading-snug drop-shadow-lg line-clamp-3 border-b-2 border-amber-400/80 pb-1">
                      {art.productName || art.title}
                    </span>
                  </div>
                )}

                {art.asin === 'B09NPPZLN1' && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black text-xs rounded-lg shadow-lg border border-amber-200 z-10 animate-pulse">
                    👑 編集長タクマ殿堂入りNO.1 (ワキガ・汗臭克服)
                  </span>
                )}

                <span className={`absolute ${art.asin === 'B09NPPZLN1' ? 'top-11 left-3' : 'top-3 left-3'} px-2.5 py-1 bg-slate-900/90 text-white text-[11px] font-extrabold rounded-md backdrop-blur-sm shadow-sm`}>
                  {art.category.toUpperCase()}
                </span>
                <span className="absolute top-3 right-3 px-2 py-0.5 bg-amber-400 text-slate-950 font-black text-xs rounded-md shadow-md">
                  ★ {art.starRating.toFixed(1)}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base leading-snug line-clamp-2 mb-2 group-hover:text-indigo-600 transition">
                    {art.productName || art.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {art.introText}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    検証レビューを見る ➔
                  </span>
                  {art.priceRange && (
                    <span className="text-xs font-semibold text-slate-400">
                      {art.priceRange}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100">
            <p className="text-slate-500 font-bold text-base">
              条件に一致する夏コスメアイテムが見つかりませんでした。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
