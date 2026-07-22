import { useState, useEffect } from 'react';
import {
  Tv,
  Laptop,
  ChefHat,
  Sparkles,
  Shirt,
  Gamepad2,
  BookOpen,
  Search,
  ChevronRight,
  Clock,
  Star,
  Store,
  Users,
  Check,
  ShoppingCart,
  ExternalLink,
  Tag
} from 'lucide-react';
import { AMAZON_CATEGORIES, INITIAL_ARTICLES, AUTHOR_PROFILES, SPECIAL_BLOG_POSTS } from './data';
import { AmazonProductArticle } from './types';
import { AuthorProfilesView } from './components/AuthorProfilesView';
import { BlogView } from './components/BlogView';
import { BlogDetailView } from './components/BlogDetailView';

function CategoryIcon({ icon, className = "w-4 h-4" }: { icon: string; className?: string }) {
  switch (icon) {
    case 'Tv': return <Tv className={className} />;
    case 'Laptop': return <Laptop className={className} />;
    case 'ChefHat': return <ChefHat className={className} />;
    case 'Shirt': return <Shirt className={className} />;
    case 'Gamepad2': return <Gamepad2 className={className} />;
    default: return <Sparkles className={className} />;
  }
}

export default function App() {
  const [activeCategorySlug, setActiveCategorySlug] = useState('all');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mainTab, setMainTab] = useState<'articles' | 'blogs' | 'authors'>('articles');
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  const articles = INITIAL_ARTICLES;

  // Filter articles by active category slug and search queries
  const filteredArticles = articles.filter(art => {
    const categoryMatches = activeCategorySlug === 'all' || art.category === activeCategorySlug;
    const queryMatches = !searchQuery.trim() || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      art.reviewBody.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.asin.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatches && queryMatches;
  });

  const selectedArticle = articles.find(a => a.id === selectedArticleId) || filteredArticles[0];

  // Update Document Title dynamically
  useEffect(() => {
    let titleText = "Lumière | 2026年夏 厳選コスメ・ボディケアおすすめブログ";
    if (selectedArticle && mainTab === 'articles') {
      titleText = `${selectedArticle.title} | Lumière`;
    } else if (mainTab === 'blogs') {
      titleText = `夏コスメ2大特集ブログ | Lumière`;
    } else if (mainTab === 'authors') {
      titleText = `検証レビュアー紹介 | Lumière`;
    }
    document.title = titleText;
  }, [selectedArticle, mainTab]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setMainTab('articles'); setSelectedArticleId(null); setActiveCategorySlug('all'); }}>
            <div className="bg-gradient-to-r from-slate-900 to-indigo-900 text-white font-black text-2xl px-3 py-1 rounded-xl tracking-tighter shadow-sm">
              Lumière
            </div>
            <div>
              <span className="text-xs text-indigo-600 font-bold block tracking-wider uppercase">SUMMER 2026</span>
              <p className="text-xs text-slate-500 font-medium">厳選コスメ・制汗体臭・口臭ケア 本音レビュー</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none py-1">
            <button
              onClick={() => { setMainTab('articles'); setSelectedBlogId(null); }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                mainTab === 'articles'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-amber-400" />
              <span>厳選商品レビュー ({articles.length}選)</span>
            </button>

            <button
              onClick={() => { setMainTab('blogs'); setSelectedBlogId(null); }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                mainTab === 'blogs'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>夏コスメ2大特集ブログ</span>
            </button>

            <button
              onClick={() => { setMainTab('authors'); setSelectedBlogId(null); }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                mainTab === 'authors'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              <span>検証レビュアー紹介</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main View Container */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* VIEW 1: AUTHORS PAGE */}
        {mainTab === 'authors' && (
          <AuthorProfilesView
            profiles={AUTHOR_PROFILES}
            articles={articles}
            onSelectArticle={(id) => {
              setSelectedArticleId(id);
              setMainTab('articles');
            }}
          />
        )}

        {/* VIEW 2: BLOG LIST PAGE */}
        {mainTab === 'blogs' && !selectedBlogId && (
          <BlogView
            posts={SPECIAL_BLOG_POSTS}
            onSelectPost={(id) => setSelectedBlogId(id)}
          />
        )}

        {/* VIEW 3: BLOG DETAIL PAGE */}
        {mainTab === 'blogs' && selectedBlogId && (
          (() => {
            const post = SPECIAL_BLOG_POSTS.find(p => p.id === selectedBlogId) || SPECIAL_BLOG_POSTS[0];
            const recommended = articles.filter(a => post.recommendedAsins.includes(a.asin));
            const author = AUTHOR_PROFILES.find(a => a.id === post.authorId);
            return (
              <BlogDetailView
                post={post}
                recommendedArticles={recommended}
                author={author}
                onBack={() => setSelectedBlogId(null)}
                onSelectArticle={(id) => {
                  setSelectedArticleId(id);
                  setMainTab('articles');
                }}
              />
            );
          })()
        )}

        {/* VIEW 4: PRODUCT ARTICLES STORE PAGE */}
        {mainTab === 'articles' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT SIDEBAR: Categories & Search (3 Columns) */}
            <div className="col-span-1 lg:col-span-3 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="商品を検索..."
                  className="w-full bg-white border border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl pl-9 pr-8 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-sm font-bold"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Category Selector */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
                <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3 px-1">
                  カテゴリー一覧
                </h2>
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveCategorySlug('all')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeCategorySlug === 'all'
                        ? 'bg-indigo-600 text-white shadow-sm'
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
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          activeCategorySlug === cat.id
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <CategoryIcon icon={cat.icon} className="w-4 h-4" />
                          <span>{cat.name}</span>
                        </div>
                        <span className="text-[11px] opacity-80">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Product Cards List in Sidebar */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3 max-h-[700px] overflow-y-auto">
                <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider px-1">
                  該当アイテム ({filteredArticles.length}件)
                </h2>

                {filteredArticles.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-4 text-center">該当する商品がありません</p>
                ) : (
                  filteredArticles.map(art => (
                    <div
                      key={art.id}
                      onClick={() => setSelectedArticleId(art.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex gap-3 items-center ${
                        selectedArticle?.id === art.id
                          ? 'border-indigo-500 bg-indigo-50/50 shadow-sm'
                          : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <img
                        src={art.imageUrl}
                        alt={art.productName || art.title}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-slate-100"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight">
                          {art.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                          <span className="flex items-center text-amber-500 font-bold">
                            ★ {art.starRating}
                          </span>
                          <span>{art.priceRange || '参考価格'}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* RIGHT MAIN ARTICLE DISPLAY (9 Columns) */}
            <div className="col-span-1 lg:col-span-9">
              {selectedArticle ? (
                <article className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                  {/* Category Tag & Rating */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-extrabold rounded-lg border border-indigo-100">
                      {AMAZON_CATEGORIES.find(c => c.id === selectedArticle.category)?.name || selectedArticle.category}
                    </span>

                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center text-amber-500 font-extrabold">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                        <span>{selectedArticle.starRating} / 5.0</span>
                      </div>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500 font-medium">レビュアー: {selectedArticle.reviewerName || '検証担当者'}</span>
                    </div>
                  </div>

                  {/* Title & Intro */}
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug mb-4">
                      {selectedArticle.title}
                    </h1>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                      {selectedArticle.introText}
                    </p>
                  </div>

                  {/* Main Product Hero & Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    <div className="col-span-1 md:col-span-5 rounded-2xl overflow-hidden border border-slate-100 shadow-sm aspect-square bg-slate-100">
                      <img
                        src={selectedArticle.imageUrl}
                        alt={selectedArticle.productName || selectedArticle.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="col-span-1 md:col-span-7 space-y-4">
                      <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Tag className="w-4 h-4 text-indigo-600" />
                        <span>主なポイント・注目機能</span>
                      </h2>
                      <div className="space-y-2">
                        {selectedArticle.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pros & Cons Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-emerald-50/60 border border-emerald-200 p-4 rounded-xl space-y-2">
                      <h3 className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>良かった点 (Pros)</span>
                      </h3>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                        {selectedArticle.pros.map((p, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-600 font-bold">・</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-rose-50/60 border border-rose-200 p-4 rounded-xl space-y-2">
                      <h3 className="text-xs font-extrabold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                        <span>気になる点 (Cons)</span>
                      </h3>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                        {selectedArticle.cons.map((c, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-rose-600 font-bold">・</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Real Review Body */}
                  <div className="border-t border-slate-100 pt-6 space-y-3">
                    <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-indigo-600" />
                      <span>実体感レビュー詳細</span>
                    </h2>
                    <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-800 leading-relaxed whitespace-pre-line">
                      {selectedArticle.reviewBody}
                    </div>
                  </div>

                  {/* Amazon Affiliate CTA Box */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-6 rounded-2xl text-center space-y-3 shadow-sm">
                    <h3 className="text-sm font-extrabold text-slate-800">
                      {selectedArticle.ctaTitle}
                    </h3>
                    <a
                      href={selectedArticle.affiliateLink}
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
              ) : (
                <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                  <Store className="w-12 h-12 text-slate-300 mb-3" />
                  <p className="text-slate-500 font-medium text-sm">左側のリストから表示したい商品を選択してください。</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Clean Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 space-y-2">
          <p className="font-bold text-slate-700">Lumière — 2026年夏 厳選コスメ・ボディケア本音レビューブログ</p>
          <p>© 2026 Lumière. All rights reserved. 当サイトはAmazonアソシエイト・プログラムの参加者です。</p>
        </div>
      </footer>
    </div>
  );
}
