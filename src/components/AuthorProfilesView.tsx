import { AuthorProfile, AmazonProductArticle } from '../types';
import { Award, ShieldCheck, CheckCircle2, UserCheck, ExternalLink, Sparkles, BookOpen } from 'lucide-react';

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
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-sm mb-4 border border-emerald-200 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>E-E-A-T 専門性・経験・信頼性・権威性の保証</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          当サイトの専門執筆陣・コスメ部長ペルソナ
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          当サイトの記事は、コスメコンシェルジュ、歯科衛生士、におい判定士、毛髪アドバイザーなど、専門分野を持つ22名の検証ライターと、男性コスメ部長・女性コスメ部長が実際に自費で購入・自ら密着テストして執筆しています。
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
              className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-slate-700 flex flex-col justify-between"
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center gap-4 mb-4">
                  {/* 丸アイコン + alt="筆者名" */}
                  <img
                    src={chief.avatarUrl}
                    alt={chief.avatarAlt}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-amber-400/80 shadow-lg"
                  />
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs mb-1.5 border border-amber-400/30">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>{chief.role}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white">{chief.name}</h3>
                    <p className="text-amber-200 text-xs mt-1">検証歴 {chief.experienceYears}年 / 専門: {chief.specialty}</p>
                  </div>
                </div>

                <p className="text-slate-200 text-sm leading-relaxed mb-6 bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
                  {chief.bio}
                </p>

                <div className="mb-6">
                  <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>保持資格・専門性</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {chief.qualifications.map((q, idx) => (
                      <span key={idx} className="bg-slate-700/80 text-amber-200 text-xs px-3 py-1 rounded-lg border border-slate-600">
                        ✓ {q}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
                <span>担当領域: どのカテゴリにも属さない総合・特集アイテム</span>
                <span className="text-amber-400 font-bold">厳選検証済み</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 一般専門ライターメンバー一覧 */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span>専門検証ライター陣（20名）</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.filter(p => !p.isDepartmentHead).map(author => {
            // このライターが執筆した記事を探す
            const authorArticles = articles.filter(a => a.reviewerName?.includes(author.name.split(' ')[0]));

            return (
              <div 
                key={author.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    {/* 丸型アイコン + alt="筆者名" */}
                    <img
                      src={author.avatarUrl}
                      alt={author.avatarAlt}
                      className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-snug">{author.name}</h3>
                      <p className="text-emerald-700 text-xs font-medium mt-0.5">{author.role}</p>
                      <p className="text-slate-400 text-xs mt-0.5">実証経験 {author.experienceYears}年</p>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed mb-4 line-clamp-3">
                    {author.bio}
                  </p>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {author.qualifications.map((q, idx) => (
                        <span key={idx} className="bg-emerald-50 text-emerald-800 text-[11px] px-2 py-0.5 rounded font-medium border border-emerald-100">
                          {q}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[11px] text-slate-400 mb-2 font-medium">
                    専門分野: {author.specialty}
                  </div>

                  {authorArticles.length > 0 ? (
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-700">担当検証記事:</div>
                      {authorArticles.map(art => (
                        <button
                          key={art.id}
                          onClick={() => onSelectArticle(art.id)}
                          className="w-full text-left text-xs text-emerald-700 hover:text-emerald-800 hover:underline line-clamp-1 flex items-center gap-1 font-medium"
                        >
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{art.title}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-400 italic">特集ブログ・個別検証記事監修中</div>
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
