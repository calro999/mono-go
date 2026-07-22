import { useEffect } from 'react';
import { SPECIAL_BLOG_POSTS, AUTHOR_PROFILES } from '../data';
import { updateSeoGeoMetadata } from '../utils/seoGeo';
import { Sparkles, Calendar, Clock, ChevronRight, Home } from 'lucide-react';

interface BlogListPageProps {
  onNavigate: (path: string) => void;
}

export function BlogListPage({ onNavigate }: BlogListPageProps) {
  useEffect(() => {
    updateSeoGeoMetadata({
      title: '夏コスメ＆身だしなみ 2大特集ブログ',
      description: '男性コスメ部長タクマと女性コスメ部長エリがそれぞれ厳選した、2026年夏の猛暑を乗り切るおすすめコスメ10選を詳しく解説。',
      urlPath: '/blogs'
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 py-1">
        <button 
          onClick={() => onNavigate('/')} 
          className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          <span>ホーム</span>
        </button>
        <span>/</span>
        <span className="text-slate-900">特集ブログ一覧</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs border border-indigo-200">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>2026年夏 コスメ部長厳選・特別特集</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          夏対策コスメ＆身だしなみ 2大特集ブログ
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          男性コスメ部長タクマと女性コスメ部長エリがそれぞれ厳選した、2026年夏の猛暑を快適に乗り切る最新おすすめコスメ10選を解説します。
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SPECIAL_BLOG_POSTS.map(post => {
          const author = AUTHOR_PROFILES.find(a => a.id === post.authorId);

          return (
            <div
              key={post.id}
              onClick={() => onNavigate(`/blogs/${post.id}`)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-black shadow-md text-white ${
                      post.targetGender === 'men' ? 'bg-blue-600' : 'bg-rose-600'
                    }`}>
                      {post.targetGender === 'men' ? '👨 男性用 夏コスメ特集10選' : '👩 女性用 夏コスメ特集10选'}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.createdAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      約{post.readTimeMinutes}分
                    </span>
                  </div>

                  <h2 className="text-xl font-black text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-slate-500 font-medium text-xs">
                    {post.subtitle}
                  </p>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {post.introText}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 flex items-center justify-between border-t border-slate-100 mt-auto">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 shadow-sm bg-slate-100"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{post.authorName}</div>
                    <div className="text-[11px] text-slate-500">{author?.role || post.authorRole}</div>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                  特集を読む <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
