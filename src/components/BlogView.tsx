import { BlogPost } from '../types';
import { Sparkles, Calendar, Clock, ChevronRight, User, ShieldCheck } from 'lucide-react';

interface BlogViewProps {
  posts: BlogPost[];
  onSelectPost: (postId: string) => void;
}

export function BlogView({ posts, onSelectPost }: BlogViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-sm mb-4 border border-indigo-200 shadow-sm">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>2026年夏 コスメ部長厳選・特別特集コーナー</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          夏対策コスメ＆身だしなみ 2大特集ブログ
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          当サイトの男性コスメ部長タクマと、女性コスメ部長エリがそれぞれ厳選した、2026年夏の猛暑を完全攻略する最新おすすめコスメ10選を詳しく解説します。
        </p>
      </div>

      {/* 特集カード2大一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map(post => (
          <div
            key={post.id}
            onClick={() => onSelectPost(post.id)}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Cover Image & Tag */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-black shadow-md text-white ${
                    post.targetGender === 'men' 
                      ? 'bg-blue-600' 
                      : 'bg-rose-600'
                  }`}>
                    {post.targetGender === 'men' ? '👨 男性用 夏コスメ特集10選' : '👩 女性用 夏コスメ特集10選'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {post.createdAt}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    約{post.readTimeMinutes}分で読める
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors mb-3">
                  {post.title}
                </h2>

                <p className="text-slate-500 font-medium text-xs mb-4">
                  {post.subtitle}
                </p>

                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6">
                  {post.introText}
                </p>
              </div>
            </div>

            {/* Author Footer */}
            <div className="p-6 sm:p-8 pt-0 flex items-center justify-between border-t border-slate-100 mt-auto">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">{post.authorName}</div>
                  <div className="text-[11px] text-slate-500">{post.authorRole}</div>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                特集を読む <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
