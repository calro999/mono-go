import { useEffect } from 'react';
import { SPECIAL_BLOG_POSTS, AUTHOR_PROFILES } from '../data';
import { AmazonProductArticle } from '../types';
import { updateSeoGeoMetadata, generateBlogJsonLd } from '../utils/seoGeo';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { ArrowLeft, Star, ExternalLink, Check, Calendar, Clock, ShoppingCart, Home } from 'lucide-react';

interface BlogPostPageProps {
  postId: string;
  articles: AmazonProductArticle[];
  onNavigate: (path: string) => void;
}

export function BlogPostPage({ postId, articles, onNavigate }: BlogPostPageProps) {
  const post = SPECIAL_BLOG_POSTS.find(p => p.id === postId) || SPECIAL_BLOG_POSTS[0];
  const author = AUTHOR_PROFILES.find(a => a.id === post.authorId);
  const recommendedArticles = articles.filter(a => post.recommendedAsins.includes(a.asin));

  useEffect(() => {
    if (!post) return;

    const baseUrl = window.location.origin;
    const jsonLd = generateBlogJsonLd(post, baseUrl);

    updateSeoGeoMetadata({
      title: `${post.title}`,
      description: `${post.subtitle} ${post.introText.substring(0, 100)}`,
      urlPath: `/blogs/${post.id}`,
      jsonLdSchema: jsonLd
    });
  }, [post]);

  if (!post) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-slate-500 font-medium">指定された特集記事が見つかりませんでした。</p>
        <button
          onClick={() => onNavigate('/blogs')}
          className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs"
        >
          ブログ一覧へ戻る
        </button>
      </div>
    );
  }

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
          onClick={() => onNavigate('/blogs')} 
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          特集ブログ一覧
        </button>
        <span>/</span>
        <span className="text-slate-900 truncate max-w-xs">{post.title}</span>
      </nav>

      {/* Back Button */}
      <button
        onClick={() => onNavigate('/blogs')}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>特集ブログ一覧へ戻る</span>
      </button>

      {/* Main Post Container */}
      <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
        {/* Header Tags */}
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
          <span className={`px-2.5 py-1 rounded-full text-white font-bold ${
            post.targetGender === 'men' ? 'bg-blue-600' : 'bg-rose-600'
          }`}>
            {post.targetGender === 'men' ? '👨 男性用 特集10選' : '👩 女性用 特集10選'}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {post.createdAt}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            約{post.readTimeMinutes}分で読める
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-slate-600 font-medium text-base sm:text-lg border-l-4 border-indigo-500 pl-4">
            {post.subtitle}
          </p>
        </div>

        {/* Author Credit */}
        <div 
          onClick={() => author && onNavigate(`/authors/${author.id}`)}
          className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100/80 transition-colors"
        >
          <div className="flex items-center gap-3">
            <img
              src={post.authorAvatar}
              alt={post.authorName}
              className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500 shadow-sm bg-slate-100"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">{post.authorName}</span>
                <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  ★ コスメ部長
                </span>
              </div>
              <p className="text-slate-500 text-xs mt-0.5">{author?.role || post.authorRole}</p>
            </div>
          </div>
          <span className="text-xs text-indigo-600 font-bold hover:underline">
            プロフィールを見る →
          </span>
        </div>

        {/* Cover Image */}
        <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm aspect-video bg-slate-100">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Intro */}
        <div className="bg-indigo-50/60 rounded-2xl p-6 sm:p-8 border border-indigo-100 text-slate-800 text-sm sm:text-base leading-relaxed">
          <h2 className="text-base font-bold text-indigo-900 mb-3">
            💡 この特集について
          </h2>
          <p>{post.introText}</p>
        </div>

        {/* Markdown Content */}
        <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed">
          <MarkdownRenderer content={post.contentMarkdown} />
        </div>

        {/* Recommended Items */}
        <div className="space-y-6 pt-8 border-t border-slate-200">
          <div className="border-b-2 border-indigo-600 pb-3 flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              🛒 特集厳選おすすめアイテム ({recommendedArticles.length}選)
            </h2>
            <span className="text-xs text-slate-500 font-medium">Amazon正規品リンク</span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {recommendedArticles.map((art, index) => (
              <div
                key={art.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6 items-start"
              >
                <div className="relative flex-shrink-0 w-full sm:w-40 aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
                  <span className="absolute top-2 left-2 bg-slate-900 text-white font-black text-xs px-2 py-0.5 rounded-md z-10">
                    #{index + 1}
                  </span>
                  <img
                    src={art.imageUrl}
                    alt={art.productName || art.title}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-grow flex flex-col justify-between h-full space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1 text-xs text-slate-400">
                      <span className="flex items-center text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                        {art.starRating}
                      </span>
                      <span>| {art.priceRange || '参考価格'}</span>
                    </div>

                    <h3 
                      onClick={() => onNavigate(`/articles/${art.id}`)}
                      className="text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer leading-snug mb-2"
                    >
                      {art.title}
                    </h3>

                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                      {art.introText}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => onNavigate(`/articles/${art.id}`)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                    >
                      詳細レビュー
                    </button>
                    
                    <a
                      href={art.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-sm hover:shadow transition-all cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Amazonで調べる</span>
                      <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
