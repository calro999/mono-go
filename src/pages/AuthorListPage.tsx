import { useEffect } from 'react';
import { AUTHOR_PROFILES, INITIAL_ARTICLES } from '../data';
import { updateSeoGeoMetadata } from '../utils/seoGeo';
import { User, Sparkles, BookOpen, ExternalLink, Home } from 'lucide-react';

interface AuthorListPageProps {
  onNavigate: (path: string) => void;
}

export function AuthorListPage({ onNavigate }: AuthorListPageProps) {
  useEffect(() => {
    updateSeoGeoMetadata({
      title: '検証・執筆レビュアー紹介',
      description: '当サイトで実際に自費購入して効果や使い心地を本音でテスト執筆しているレビュアー陣のご紹介。',
      urlPath: '/authors'
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
        <span className="text-slate-900">検証レビュアー紹介</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200">
          <User className="w-4 h-4 text-slate-600" />
          <span>検証・執筆メンバー紹介</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          当サイトの検証レビュアー紹介
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          当サイトの記事は、コスメ・制汗・頭皮・オーラルケアなどの各分野に関心を持つ検証ライターと、男性コスメ部長・女性コスメ部長が実際に自ら試して執筆しています。
        </p>
      </div>

      {/* 部長特別枠 */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>当サイト 統括コスメ部長</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AUTHOR_PROFILES.filter(p => p.isDepartmentHead).map(chief => (
            <div 
              key={chief.id}
              onClick={() => onNavigate(`/authors/${chief.id}`)}
              className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden border border-slate-800 flex flex-col justify-between cursor-pointer hover:border-amber-400/50 transition-all group"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={chief.avatarUrl}
                    alt={chief.avatarAlt}
                    className="w-20 h-20 rounded-full object-cover border-4 border-amber-400 shadow-md bg-slate-800"
                  />
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs mb-1 border border-amber-400/30">
                      {chief.role}
                    </span>
                    <h3 className="text-2xl font-black text-white group-hover:text-amber-300 transition-colors">{chief.name}</h3>
                    <p className="text-slate-400 text-xs mt-1">得意分野: {chief.specialty}</p>
                  </div>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 line-clamp-3">
                  {chief.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-amber-400 font-bold">
                <span>個別プロフィール・担当記事を見る →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 一般検証ライター陣 */}
      <div className="space-y-4 pt-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-slate-700" />
          <span>検証レビュアー陣</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AUTHOR_PROFILES.filter(p => !p.isDepartmentHead).map(author => {
            const authorArticles = INITIAL_ARTICLES.filter(a => a.reviewerName?.includes(author.name.split(' ')[0]));

            return (
              <div 
                key={author.id}
                onClick={() => onNavigate(`/authors/${author.id}`)}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={author.avatarUrl}
                      alt={author.avatarAlt}
                      className="w-16 h-16 rounded-full object-cover border-2 border-slate-300 shadow-sm bg-slate-100"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">{author.name}</h3>
                      <p className="text-slate-600 text-xs font-medium mt-0.5">{author.role}</p>
                      <p className="text-slate-400 text-xs mt-0.5">得意: {author.specialty}</p>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed mb-4 line-clamp-3">
                    {author.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                  <span>担当記事 ({authorArticles.length}件)</span>
                  <span>詳細を見る →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
