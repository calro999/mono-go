import React from 'react';
import { SPECIAL_BLOG_POSTS, COMPARISON_POSTS, AUTHOR_PROFILES } from '../data';
import { handleImageError } from '../utils/imageHelper';
import { updateSeoGeoMetadata } from '../utils/seoGeo';

interface BlogListPageProps {
  onNavigate: (path: string) => void;
}

export function BlogListPage({ onNavigate }: BlogListPageProps) {
  React.useEffect(() => {
    updateSeoGeoMetadata({
      title: '2026年夏コスメ・身だしなみ検証ブログ＆VS比較対決 | Lumière',
      description: '当サイトの男性コスメ部長タクマ＆女性コスメ部長エリが本気で厳選した夏コスメ10選特集と、悩み・用途別のVS比較対決シリーズ一覧です。',
      urlPath: '/blogs'
    });
  }, []);

  const pinnedBlogs = SPECIAL_BLOG_POSTS;
  const comparisonPosts = COMPARISON_POSTS;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-amber-400 text-slate-950 text-xs font-black rounded-full uppercase tracking-wider mb-3 shadow-sm">
              EDITORIAL BLOG & VS COMPARISONS
            </span>
            <h1 className="text-2xl sm:text-4xl font-black leading-tight mb-3">
              コスメ徹底検証ブログ＆人気アイテム対決比較
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              コスメ部長が本気で試した推し10選大特集と、海・プール・部活・敏感肌など具体的に悩む方へ向けた徹底比較検証記事です。
            </p>
          </div>
        </div>

        {/* Top Section: Pinned 2 Major Special 10-Selection Feature Blogs */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-l-4 border-amber-400 pl-3">
            <div>
              <span className="text-xs font-black text-amber-500 uppercase tracking-widest">PINNED FEATURES</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                最推し！2026年夏コスメ厳選10選大特集
              </h2>
            </div>
            <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
              必読の2大バイブル
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pinnedBlogs.map((post) => {
              const author = AUTHOR_PROFILES.find((a) => a.id === post.authorId);
              return (
                <article
                  key={post.id}
                  onClick={() => onNavigate(`/blogs/${post.id}`)}
                  className="bg-white rounded-3xl border-2 border-amber-200/80 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col cursor-pointer group relative"
                >
                  {/* Pinned Badge */}
                  <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-lg">
                    📌 編集部最推し10選
                  </div>

                  {/* Cover Image */}
                  <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex items-end p-6">
                      <div>
                        <span className="inline-block px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-full mb-2 shadow-sm">
                          {post.targetGender === 'men' ? '👨 男性向け夏コスメ10選' : '👩 女性向け夏コスメ10選'}
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-white leading-snug line-clamp-2 drop-shadow-md">
                          {post.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {post.introText}
                    </p>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.authorAvatar}
                          alt={post.authorName}
                          referrerPolicy="no-referrer"
                          onError={handleImageError}
                          className="w-8 h-8 rounded-full border border-indigo-400 object-cover"
                        />
                        <span className="text-xs font-bold text-slate-800">
                          {post.authorName} ({post.authorRole})
                        </span>
                      </div>

                      <span className="text-xs font-extrabold text-indigo-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        10選特集を読む ➔
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Lower Section: Dedicated VS Comparison Posts */}
        <div className="space-y-6 pt-6 border-t-2 border-slate-200/60">
          <div className="flex items-center justify-between border-l-4 border-indigo-600 pl-3">
            <div>
              <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">VS COMPARISON SERIES</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                ⚔️ どっちを買うべき？目的・お悩み別アイテム対決比較
              </h2>
            </div>
            <span className="text-xs font-bold bg-indigo-100 text-indigo-900 px-3 py-1 rounded-full">
              お悩み直撃検証
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comparisonPosts.map((comp) => (
              <div
                key={comp.id}
                onClick={() => onNavigate(`/compare/${comp.id}`)}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition cursor-pointer flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 font-extrabold text-xs rounded-full">
                    目的: {comp.targetUserCategory}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-indigo-600 transition line-clamp-2">
                    {comp.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {comp.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                  <span>勝者対比マトリクスを見る</span>
                  <span>➔</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
