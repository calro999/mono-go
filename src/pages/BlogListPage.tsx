import React from 'react';
import { SPECIAL_BLOG_POSTS, AUTHOR_PROFILES } from '../data';
import { handleImageError } from '../utils/imageHelper';
import { updateSeoGeoMetadata } from '../utils/seoGeo';

interface BlogListPageProps {
  onNavigate: (path: string) => void;
}

export function BlogListPage({ onNavigate }: BlogListPageProps) {
  React.useEffect(() => {
    updateSeoGeoMetadata({
      title: '2026年夏コスメ＆身だしなみケア特集ブログ一覧 | Lumière',
      description: '当サイトの男性コスメ部長タクマ＆女性コスメ部長エリが厳選した、猛暑を乗り切る夏コスメ10選特集記事一覧です。',
      urlPath: '/blogs'
    });
  }, []);

  // ONLY show the 2 Official Special Summer Blog Posts (No random product articles)
  const officialBlogs = SPECIAL_BLOG_POSTS;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-amber-400 text-slate-950 text-xs font-black rounded-full uppercase tracking-wider mb-3 shadow-sm">
              SPECIAL FEATURE ARTICLES
            </span>
            <h1 className="text-2xl sm:text-4xl font-black leading-tight mb-3">
              コスメ部長が本気で厳選！2026年夏コスメ大特集
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              男性コスメ部長タクマと女性コスメ部長エリが、猛暑を爽やかに乗り切る最強の夏アイテム10選を本音で徹底解説。
            </p>
          </div>
        </div>

        {/* Official 2 Special Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {officialBlogs.map((post) => {
            const author = AUTHOR_PROFILES.find((a) => a.id === post.authorId);
            return (
              <article
                key={post.id}
                onClick={() => onNavigate(`/blogs/${post.id}`)}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col cursor-pointer group"
              >
                {/* Cover Image with Title Overlay */}
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
                      <h2 className="text-lg sm:text-xl font-black text-white leading-snug line-clamp-2 drop-shadow-md">
                        {post.title}
                      </h2>
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
                        {post.authorName}
                      </span>
                    </div>

                    <span className="text-xs font-extrabold text-indigo-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      特集を読む ➔
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
