import { BlogPost, AmazonProductArticle, AuthorProfile } from '../types';
import { ArrowLeft, Star, ExternalLink, ShieldCheck, Check, Calendar, Clock, ShoppingCart } from 'lucide-react';

interface BlogDetailViewProps {
  post: BlogPost;
  recommendedArticles: AmazonProductArticle[];
  author?: AuthorProfile;
  onBack: () => void;
  onSelectArticle: (articleId: string) => void;
}

export function BlogDetailView({ post, recommendedArticles, author, onBack, onSelectArticle }: BlogDetailViewProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 mb-6 group transition-colors"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>特集ブログ一覧へ戻る</span>
      </button>

      {/* Article Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mb-3">
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
            読了時間 約{post.readTimeMinutes}分
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-slate-600 font-medium text-base sm:text-lg mb-6 border-l-4 border-indigo-500 pl-4">
          {post.subtitle}
        </p>

        {/* 著者クレジット (E-E-A-T) */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={post.authorAvatar}
              alt={post.authorName}
              className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">{post.authorName}</span>
                <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  ★ コスメ部長
                </span>
              </div>
              <p className="text-slate-500 text-xs mt-0.5">{post.authorRole}</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>自費購入・実体験検証済み</span>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="rounded-2xl overflow-hidden mb-8 border border-slate-200 shadow-sm aspect-video">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Intro Box */}
      <div className="bg-indigo-50/60 rounded-2xl p-6 sm:p-8 mb-10 border border-indigo-100 text-slate-800 text-sm sm:text-base leading-relaxed">
        <h2 className="text-base font-bold text-indigo-900 mb-3 flex items-center gap-2">
          <span>💡 この特集について</span>
        </h2>
        <p>{post.introText}</p>
      </div>

      {/* Main Content Markdown */}
      <div className="prose prose-slate max-w-none mb-12 prose-headings:font-black prose-h3:text-xl prose-h3:text-slate-900 prose-h3:mt-8 prose-h3:mb-4 prose-h4:text-base prose-h4:text-indigo-900 prose-h4:mt-6 prose-p:text-slate-700 prose-p:leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: post.contentMarkdown.replace(/\n/g, '<br/>') }} />
      </div>

      {/* 厳選10商品カード一覧 */}
      <div className="space-y-8 mt-12">
        <div className="border-b-2 border-indigo-600 pb-3 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            🛒 特集で紹介している厳選おすすめアイテム ({recommendedArticles.length}選)
          </h2>
          <span className="text-xs text-slate-500 font-medium">全品Amazon正規品リンク付き</span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {recommendedArticles.map((art, index) => (
            <div
              key={art.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6 items-start"
            >
              {/* Ranking badge & Image */}
              <div className="relative flex-shrink-0 w-full sm:w-44 aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
                <span className="absolute top-2 left-2 bg-slate-900 text-white font-black text-xs px-2.5 py-1 rounded-md z-10 shadow-md">
                  #{index + 1}
                </span>
                <img
                  src={art.imageUrl}
                  alt={art.productName || art.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-grow flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center text-amber-500 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                      <span>{art.starRating}</span>
                    </div>
                    <span className="text-xs text-slate-400">| 参考価格: {art.priceRange || '適正価格'}</span>
                  </div>

                  <h3 
                    onClick={() => onSelectArticle(art.id)}
                    className="text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer leading-snug mb-2"
                  >
                    {art.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-4">
                    {art.introText}
                  </p>

                  <div className="space-y-1 mb-4">
                    {art.features.slice(0, 2).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => onSelectArticle(art.id)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                  >
                    詳細レビューを見る
                  </button>
                  
                  <a
                    href={art.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-sm hover:shadow transition-all"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Amazonで価格を見る</span>
                    <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
