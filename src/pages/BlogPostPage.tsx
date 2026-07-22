import React from 'react';
import { SPECIAL_BLOG_POSTS, INITIAL_ARTICLES, AUTHOR_PROFILES } from '../data';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { generateBlogJsonLd, updateSeoGeoMetadata } from '../utils/seoGeo';

interface BlogPostPageProps {
  postId: string;
  onNavigate: (path: string) => void;
}

export function BlogPostPage({ postId, onNavigate }: BlogPostPageProps) {
  const post = SPECIAL_BLOG_POSTS.find(
    (p) => p.id === postId || p.slug === postId
  );

  React.useEffect(() => {
    if (post) {
      updateSeoGeoMetadata({
        title: `${post.title} | Lumière 夏コスメ2026`,
        description: post.introText,
        urlPath: `/blogs/${post.id}`
      });
      const jsonLd = generateBlogJsonLd(post, window.location.origin);
      updateSeoGeoMetadata({
        title: `${post.title} | Lumière 夏コスメ2026`,
        description: post.introText,
        urlPath: `/blogs/${post.id}`,
        jsonLdSchema: jsonLd
      });
    }
  }, [post]);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          指定された特集ブログ記事が見つかりませんでした。
        </h2>
        <button
          onClick={() => onNavigate('/blogs')}
          className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition"
        >
          特集ブログ一覧へ戻る
        </button>
      </div>
    );
  }

  const author = AUTHOR_PROFILES.find((a) => a.id === post.authorId);

  // Recommended Articles for this blog
  const recommendedArticles = INITIAL_ARTICLES.filter((art) =>
    post.recommendedAsins.includes(art.asin)
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <article className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 flex-wrap">
          <button onClick={() => onNavigate('/')} className="hover:text-indigo-600 transition">
            ホーム
          </button>
          <span>/</span>
          <button onClick={() => onNavigate('/blogs')} className="hover:text-indigo-600 transition">
            特集ブログ
          </button>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-xs">
            {post.title}
          </span>
        </nav>

        {/* Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-8 shadow-md">
          <img
            src={post.coverImage}
            alt={post.title}
            onError={(e) => {
              e.currentTarget.src = 'https://m.media-amazon.com/images/I/71YyM9e5pGL._AC_SL1500_.jpg';
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 sm:p-8">
            <div>
              <span className="inline-block px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-full uppercase tracking-wider mb-3">
                {post.targetGender === 'men' ? '👨 男性の夏コスメ10選' : '👩 女性の夏コスメ10選'}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Author Header Bar */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <img
              src={post.authorAvatar}
              alt={post.authorName}
              className="w-12 h-12 rounded-full border-2 border-indigo-500 p-0.5 object-cover bg-white"
            />
            <div>
              <div className="font-bold text-slate-900">{post.authorName}</div>
              <div className="text-xs text-indigo-600 font-medium">{post.authorRole}</div>
            </div>
          </div>
          <div className="text-xs text-slate-400 font-sans">
            公開日: {post.createdAt} ・ 読了目安: {post.readTimeMinutes}分
          </div>
        </div>

        {/* Lead Intro Box */}
        <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/50 p-5 sm:p-6 rounded-2xl border border-indigo-100/60 mb-8 text-slate-800 font-medium text-sm sm:text-base leading-relaxed">
          {post.introText}
        </div>

        {/* Markdown Content Main Body */}
        <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed">
          <MarkdownRenderer content={post.contentMarkdown} onNavigate={onNavigate} />
        </div>

        {/* Embedded 10 Product Review Cards Section */}
        {recommendedArticles.length > 0 && (
          <div className="mt-12 pt-8 border-t-2 border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  【厳選10選】紹介アイテムの実物検証＆口コミ詳細カード
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  カードをタップすると個別の検証記事へ移動できます
                </p>
              </div>
              <span className="text-xs bg-indigo-100 text-indigo-800 font-extrabold px-3 py-1.5 rounded-full">
                全10商品掲載中
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedArticles.map((art, idx) => (
                <div
                  key={art.id}
                  className="flex flex-col bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex gap-4 mb-3">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-100">
                      <img
                        src={art.imageUrl}
                        alt={art.productName || art.title}
                        onError={(e) => {
                          e.currentTarget.src = 'https://m.media-amazon.com/images/I/71YyM9e5pGL._AC_SL1500_.jpg';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-1 left-1 bg-slate-900/90 text-white text-[10px] font-black px-1.5 py-0.5 rounded">
                        #{idx + 1}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-1">
                        <span>★ {art.starRating.toFixed(1)}</span>
                        <span className="text-slate-400 font-normal">({art.category})</span>
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 mb-1 group-hover:text-indigo-600 transition">
                        {art.productName || art.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {art.introText}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onNavigate(`/articles/${art.id}`)}
                      className="flex-1 py-2 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-extrabold rounded-xl transition text-center"
                    >
                      検証・口コミ詳細 →
                    </button>
                    {art.affiliateLink && (
                      <a
                        href={art.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black rounded-xl transition text-center whitespace-nowrap shadow-sm"
                      >
                        Amazonで確認 ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Author Footer Bio */}
        {author && (
          <div className="mt-12 p-6 bg-slate-900 rounded-3xl text-white flex items-center gap-5 flex-col sm:flex-row">
            <img
              src={author.avatarUrl}
              alt={author.name}
              className="w-16 h-16 rounded-full border-2 border-amber-400 p-0.5 object-cover flex-shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-black text-lg text-white">{author.name}</span>
                <span className="text-xs bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                  {author.role}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {author.bio}
              </p>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
