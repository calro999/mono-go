import { useState, useEffect } from 'react';
import { INITIAL_ARTICLES } from './data';
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AuthorListPage } from './pages/AuthorListPage';
import { AuthorDetailPage } from './pages/AuthorDetailPage';
import { Store, Sparkles, Users } from 'lucide-react';
import { AmazonProductArticle } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Router navigation helper
  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to browser Back / Forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Determine active tab for header highlighting
  const isArticlesTab = currentPath === '/' || currentPath.startsWith('/articles');
  const isBlogsTab = currentPath.startsWith('/blogs');
  const isAuthorsTab = currentPath.startsWith('/authors');

  // Render individual page component based on URL path
  const [articles] = useState<AmazonProductArticle[]>(() => {
    // Clear stale image caches if any
    try {
      localStorage.removeItem('monogo_app_state_v8_summer32');
    } catch {
      // Ignore
    }
    return INITIAL_ARTICLES;
  });

  const renderCurrentPage = () => {
    if (currentPath.startsWith('/articles/')) {
      const articleId = currentPath.replace('/articles/', '');
      return (
        <ProductDetailPage
          articleId={articleId}
          articles={articles}
          onNavigate={navigateTo}
        />
      );
    }

    if (currentPath === '/blogs') {
      return <BlogListPage onNavigate={navigateTo} />;
    }

    if (currentPath.startsWith('/blogs/')) {
      const postId = currentPath.replace('/blogs/', '');
      return (
        <BlogPostPage
          postId={postId}
          onNavigate={navigateTo}
        />
      );
    }

    if (currentPath === '/authors') {
      return <AuthorListPage onNavigate={navigateTo} />;
    }

    if (currentPath.startsWith('/authors/')) {
      const authorId = currentPath.replace('/authors/', '');
      return (
        <AuthorDetailPage
          authorId={authorId}
          onNavigate={navigateTo}
        />
      );
    }

    // Default Fallback: Top Product List Page ( / )
    return (
      <ProductListPage
        articles={INITIAL_ARTICLES}
        onNavigate={navigateTo}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo & Tagline */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => navigateTo('/')}
          >
            <div className="bg-gradient-to-r from-slate-900 to-indigo-900 text-white font-black text-2xl px-3 py-1 rounded-xl tracking-tighter shadow-sm">
              Lumière
            </div>
            <div>
              <span className="text-xs text-indigo-600 font-bold block tracking-wider uppercase">SUMMER 2026</span>
              <p className="text-xs text-slate-500 font-medium">厳選コスメ・制汗体臭・口臭ケア 本音レビュー</p>
            </div>
          </div>

          {/* Navigation Tabs (Connected to URL Paths) */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none py-1">
            <button
              onClick={() => navigateTo('/')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                isArticlesTab
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-amber-400" />
              <span>厳選商品レビュー (32選)</span>
            </button>

            <button
              onClick={() => navigateTo('/blogs')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                isBlogsTab
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>夏コスメ2大特集ブログ</span>
            </button>

            <button
              onClick={() => navigateTo('/authors')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                isAuthorsTab
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

      {/* Dynamic Route Content Rendering */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 space-y-2">
          <p className="font-bold text-slate-700">Lumière — 2026年夏 厳選コスメ・ボディケア本音レビューブログ</p>
          <p>© 2026 Lumière. All rights reserved. 当サイトはAmazonアソシエイト・プログラムの参加者です。</p>
        </div>
      </footer>
    </div>
  );
}
