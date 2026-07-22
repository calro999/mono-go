import React from 'react';
import { AUTHOR_PROFILES, INITIAL_ARTICLES, SPECIAL_BLOG_POSTS } from '../data';
import { handleImageError } from '../utils/imageHelper';
import { generateAuthorJsonLd, updateSeoGeoMetadata } from '../utils/seoGeo';

interface AuthorDetailPageProps {
  authorId: string;
  onNavigate: (path: string) => void;
}

export function AuthorDetailPage({ authorId, onNavigate }: AuthorDetailPageProps) {
  const author = AUTHOR_PROFILES.find((a) => a.id === authorId);

  React.useEffect(() => {
    if (author) {
      const jsonLd = generateAuthorJsonLd(author, window.location.origin);
      updateSeoGeoMetadata({
        title: `${author.name} (${author.role}) | 筆者プロフィール | Lumière`,
        description: author.bio,
        imageUrl: author.avatarUrl,
        urlPath: `/authors/${author.id}`,
        jsonLdSchema: jsonLd
      });
    }
  }, [author]);

  if (!author) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          指定された執筆者プロフィールが見つかりませんでした。
        </h2>
        <button
          onClick={() => onNavigate('/authors')}
          className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition"
        >
          執筆者一覧へ戻る
        </button>
      </div>
    );
  }

  // Articles & Blog Posts by this author
  const authorBlogs = SPECIAL_BLOG_POSTS.filter((b) => b.authorId === author.id);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 flex-wrap">
          <button onClick={() => onNavigate('/')} className="hover:text-indigo-600 transition">
            ホーム
          </button>
          <span>/</span>
          <button onClick={() => onNavigate('/authors')} className="hover:text-indigo-600 transition">
            レビュアー紹介
          </button>
          <span>/</span>
          <span className="text-slate-900 font-bold">{author.name}</span>
        </nav>

        {/* Profile Header Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <div className="relative flex-shrink-0">
            <img
              src={author.avatarUrl}
              alt={author.avatarAlt || author.name}
              referrerPolicy="no-referrer"
              onError={handleImageError}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-amber-400 p-1 object-cover bg-white shadow-lg"
            />
            {author.isDepartmentHead && (
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                コスメ部長
              </span>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left space-y-4">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {author.name}
                </h1>
                <span className="text-xs bg-indigo-100 text-indigo-800 font-extrabold px-3 py-1 rounded-full">
                  {author.role}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-400">
                専門分野: {author.specialty} ・ 業界経験: {author.experienceYears}年
              </p>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {author.bio}
            </p>
          </div>
        </div>

        {/* Authored Special Blog Posts */}
        {authorBlogs.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-black text-slate-900 border-l-4 border-indigo-600 pl-3">
              {author.name} が執筆した2026年夏コスメ特集記事
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {authorBlogs.map((blog) => (
                <div
                  key={blog.id}
                  onClick={() => onNavigate(`/blogs/${blog.id}`)}
                  className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col sm:flex-row items-center gap-5 group"
                >
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                    className="w-full sm:w-48 h-32 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <span className="text-xs font-bold text-amber-500">
                      ★ 2026年夏コスメ特集
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-indigo-600 transition">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {blog.introText}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Assigned Review Products */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xl font-black text-slate-900 border-l-4 border-indigo-600 pl-3">
            担当商品レビュー一覧 ({INITIAL_ARTICLES.length}件掲載中)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INITIAL_ARTICLES.slice(0, 10).map((art) => (
              <div
                key={art.id}
                onClick={() => onNavigate(`/articles/${art.id}`)}
                className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition cursor-pointer flex items-center gap-4 group"
              >
                <img
                  src={art.imageUrl}
                  alt={art.productName || art.title}
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-white border border-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-extrabold text-indigo-600 uppercase">
                    {art.category}
                  </span>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug truncate group-hover:text-indigo-600 transition">
                    {art.productName || art.title}
                  </h4>
                  <div className="text-[11px] text-amber-500 font-bold mt-1">
                    ★ {art.starRating.toFixed(1)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
