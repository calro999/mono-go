import { AuthorProfile, AmazonProductArticle } from '../types';
import { ExternalLink, Sparkles, BookOpen, User } from 'lucide-react';

interface AuthorProfilesViewProps {
  profiles: AuthorProfile[];
  articles: AmazonProductArticle[];
  onSelectArticle: (articleId: string) => void;
}

export function AuthorProfilesView({ profiles, articles, onSelectArticle }: AuthorProfilesViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-bold text-sm mb-4 border border-slate-200">
          <User className="w-4 h-4 text-slate-600" />
          <span>検証・執筆メンバー紹介</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          当サイトの検証レビュアー紹介
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          当サイトの記事は、コスメ・制汗・頭皮・オーラルケアなどの各分野に関心を持つ検証ライターと、男性コスメ部長・女性コスメ部長が実際に自ら試して執筆しています。
        </p>
      </div>

      {/* 部長ピックアップ（特別枠） */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>当サイト 統括コスメ部長</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profiles.filter(p => p.isDepartmentHead).map(chief => (
            <div 
              key={chief.id}
              className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  {/* 丸アイコン + alt="筆者名" */}
                  <img
                    src={chief.avatarUrl}
                    alt={chief.avatarAlt}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-amber-400 shadow-md bg-slate-800"
                  />
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs mb-1.5 border border-amber-400/30">
                      {chief.role}
                    </span>
                    <h3 className="text-2xl font-black text-white">{chief.name}</h3>
                    <p className="text-slate-400 text-xs mt-1">得意分野: {chief.specialty}</p>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-6 bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
                  {chief.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>担当: 総合・おすすめ特集記事</span>
                <span className="text-amber-400 font-bold">実証レビュー担当</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 検証ライター一覧 */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-slate-700" />
          <span>検証レビュアー一覧</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.filter(p => !p.isDepartmentHead).map(author => {
            const authorArticles = articles.filter(a => a.reviewerName?.includes(author.name.split(' ')[0]));

            return (
              <div 
                key={author.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    {/* 丸型アイコン + alt="筆者名" */}
                    <img
                      src={author.avatarUrl}
                      alt={author.avatarAlt}
                      className="w-16 h-16 rounded-full object-cover border-2 border-slate-300 shadow-sm bg-slate-100"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-snug">{author.name}</h3>
                      <p className="text-slate-600 text-xs font-medium mt-0.5">{author.role}</p>
                      <p className="text-slate-400 text-xs mt-0.5">得意分野: {author.specialty}</p>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed mb-4">
                    {author.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  {authorArticles.length > 0 ? (
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-700">担当レビュー記事:</div>
                      {authorArticles.map(art => (
                        <button
                          key={art.id}
                          onClick={() => onSelectArticle(art.id)}
                          className="w-full text-left text-xs text-indigo-600 hover:text-indigo-800 hover:underline line-clamp-1 flex items-center gap-1 font-medium"
                        >
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{art.title}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-400 italic">個別アイテム検証中</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
