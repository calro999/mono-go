import React from 'react';
import { COMPARISON_POSTS, INITIAL_ARTICLES } from '../data';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { handleImageError } from '../utils/imageHelper';
import { updateSeoGeoMetadata } from '../utils/seoGeo';

interface ProductComparisonPageProps {
  compareId: string;
  onNavigate: (path: string) => void;
}

export function ProductComparisonPage({ compareId, onNavigate }: ProductComparisonPageProps) {
  const comparison = COMPARISON_POSTS.find(
    (c) => c.id === compareId || c.slug === compareId
  );

  const productA = comparison ? INITIAL_ARTICLES.find((a) => a.asin === comparison.productAsinA) : null;
  const productB = comparison ? INITIAL_ARTICLES.find((a) => a.asin === comparison.productAsinB) : null;

  React.useEffect(() => {
    if (comparison) {
      updateSeoGeoMetadata({
        title: comparison.title,
        description: comparison.subtitle,
        urlPath: `/compare/${comparison.id}`,
        jsonLdSchema: {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: comparison.title,
          description: comparison.subtitle,
          dependencies: [comparison.targetUserCategory]
        }
      });
    }
  }, [comparison]);

  if (!comparison || !productA || !productB) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          指定されたVS比較対決記事が見つかりませんでした。
        </h2>
        <button
          onClick={() => onNavigate('/')}
          className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition"
        >
          商品一覧へ戻る
        </button>
      </div>
    );
  }

  // Contextual 3rd Editor Recommendation Item Selection
  const getThirdRecommendation = () => {
    if (comparison.id === 'anessa-vs-biore-uv') {
      return {
        asin: 'B08BRVCFMN_2',
        title: 'キュレル 潤浸保湿 UVエッセンス SPF30 (50g)',
        imageUrl: '/images/products/art-b08brvcfmn-2.jpg',
        badge: '👑 敏感肌・肌荒れ予防の第3の選択肢',
        comment: '「強力UVの刺激が心配な方や、日焼け止めで肌荒れ・赤みが出やすい乾燥敏感肌ならキュレルがベスト！紫外線吸収剤無配合(ノンケミカル)で夕方までしっとり肌を保護します。」',
        articleId: 'art-b08brvcfmn-2',
        affiliateLink: 'https://www.amazon.co.jp/dp/B08BRVCFMN?tag=mattan0290c-22'
      };
    }
    if (comparison.id === 'primavista-vs-larocheposay') {
      return {
        asin: 'B08BFCW1M2',
        title: 'ORBIS Mr.(オルビス ミスター) ベースカラー コントローラー',
        imageUrl: '/images/products/art-b08bfcw1m2.jpg',
        badge: '👑 男性の青ヒゲ・毛穴・猛暑テカリカバー第3の選択肢',
        comment: '「ファンデだと塗ってる感が気になる男性や、青ヒゲ・クマ・毛穴をバレずに自然補正したいならオルビスミスター！皮脂吸着パウダー配合で真夏のテカリを一切見せません。」',
        articleId: 'art-b08bfcw1m2',
        affiliateLink: 'https://www.amazon.co.jp/dp/B08BFCW1M2?tag=mattan0290c-22'
      };
    }
    if (comparison.id === 'concool-vs-nonio') {
      return {
        asin: 'B00113W3I4',
        title: 'ウェルテック コンクールF (100ml)',
        imageUrl: '/images/products/art-b00113w3i4.jpg',
        badge: '👑 朝のねばつき・歯周病菌殺菌の第3の決定版',
        comment: '「舌磨きだけでなく、お口全体のねばつきや会話時の口臭を24時間シャットアウトしたいならコンクールF！水に数滴垂らしてすすぐだけで夕方までお口スッキリ。」',
        articleId: 'art-b00113w3i4',
        affiliateLink: 'https://www.amazon.co.jp/dp/B00113W3I4?tag=mattan0290c-22'
      };
    }
    if (comparison.id === 'lipmonster-vs-meltylip') {
      return {
        asin: 'B0CGD5G1F4',
        title: 'キャンメイク プランプリップケアブロード 01',
        imageUrl: '/images/products/art-b0cgd5g1f4.jpg',
        badge: '👑 縦じわ補正・ぷっくり高保湿プランパー第3の選択肢',
        comment: '「色落ち対策だけでなく、夏の冷房で乾いた唇をぷっくりふっくら整えたいならキャンメイクのプランパー！デパコス級のツヤと清涼感で荒れた唇を一瞬でレスキューします。」',
        articleId: 'art-b0cgd5g1f4',
        affiliateLink: 'https://www.amazon.co.jp/dp/B0CGD5G1F4?tag=mattan0290c-22'
      };
    }
    // Default: Deodorant Category (deonatulle-vs-8x4men etc) -> Reflea Jar
    return {
      asin: 'B09NPPZLN1',
      title: 'メンソレータム リフレア デオドラントクリーム 55g (ジャータイプ)',
      imageUrl: '/images/products/rihurea.jpg',
      badge: '👑 無香料・隠れワキガ＆多汗症を100%抑え込む実体感NO.1',
      comment: '「香りの好みはあるけれど、無香料で良ければコレが僕の人生史上最高の制汗剤！隠れワキガ＋多汗症で市販品では男臭さが残っていた僕が、1日中完全に無臭になれた相性抜群の殿堂入り第1位です。指塗りだとベタつくので100均やAmazonで100円スパチュラを合わせて買うのが快適に使うコツ！」',
      articleId: 'art-b09nppzln1',
      affiliateLink: 'https://www.amazon.co.jp/dp/B09NPPZLN1?th=1&linkCode=ll2&tag=mattan0290c-22&linkId=37c341cdb74d0a7499016e5b318b6e0e&ref_=as_li_ss_tl'
    };
  };

  const thirdRec = getThirdRecommendation();

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <article className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 flex-wrap">
          <button onClick={() => onNavigate('/')} className="hover:text-indigo-600 transition">
            ホーム
          </button>
          <span>/</span>
          <span className="text-indigo-600 font-bold">VS比較対決</span>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-xs">
            {comparison.title}
          </span>
        </nav>

        {/* Title Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 text-xs font-black rounded-full uppercase tracking-wider">
              ⚔️ 目的・悩み別ガチンコ徹底比較
            </span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-extrabold rounded-full">
              ターゲット: {comparison.targetUserCategory}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
            {comparison.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {comparison.subtitle}
          </p>
        </div>

        {/* AI-SEO / GEO Summary Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl border border-indigo-500/40 shadow-lg space-y-2">
          <div className="text-amber-400 font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
            <span>⚡ 3秒でわかる！編集部の対決結論サマリー</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            {comparison.verdictSummary}
          </p>
        </div>

        {/* 2 Products Side-by-Side Comparison Showcase Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
          {/* Product A Card */}
          <div className="bg-slate-50 p-5 rounded-2xl border-2 border-indigo-100 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-xs font-black text-indigo-600 bg-indigo-100 px-2.5 py-1 rounded-md">
                ENTRY A
              </span>
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner group">
                <img
                  src={productA.imageUrl}
                  alt={productA.productName || productA.title}
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  className={`w-full h-full object-cover ${productA.asin === 'B09NPPZLN1' ? 'opacity-100' : 'opacity-70 group-hover:scale-105 transition-transform duration-500'}`}
                />
                
                {/* Reflea: No Overlay, All Others: Dark Overlay */}
                {productA.asin !== 'B09NPPZLN1' && (
                  <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[1px] flex flex-col items-center justify-center p-4 text-center z-10">
                    <span className="px-2.5 py-0.5 bg-indigo-500 text-white font-black text-[10px] rounded-full uppercase tracking-wider mb-2 shadow-sm">
                      ENTRY A
                    </span>
                    <h4 className="text-white font-black text-sm sm:text-base leading-snug tracking-tight drop-shadow-md border-b-2 border-amber-400 pb-1 max-w-[90%]">
                      {productA.productName || productA.title}
                    </h4>
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
                {productA.introText}
              </p>
            </div>
            <div className="space-y-2 pt-3 border-t border-slate-200">
              <button
                onClick={() => onNavigate(`/articles/${productA.id}`)}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl transition text-center"
              >
                {productA.productName}の個別検証を見る →
              </button>
              <a
                href={productA.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl transition text-center shadow-sm"
              >
                Amazonで最安値をチェック ↗
              </a>
            </div>
          </div>

          {/* Product B Card */}
          <div className="bg-slate-50 p-5 rounded-2xl border-2 border-purple-100 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-xs font-black text-purple-600 bg-purple-100 px-2.5 py-1 rounded-md">
                ENTRY B
              </span>
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner group">
                <img
                  src={productB.imageUrl}
                  alt={productB.productName || productB.title}
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  className={`w-full h-full object-cover ${productB.asin === 'B09NPPZLN1' ? 'opacity-100' : 'opacity-70 group-hover:scale-105 transition-transform duration-500'}`}
                />
                
                {/* Reflea: No Overlay, All Others: Dark Overlay */}
                {productB.asin !== 'B09NPPZLN1' && (
                  <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[1px] flex flex-col items-center justify-center p-4 text-center z-10">
                    <span className="px-2.5 py-0.5 bg-purple-500 text-white font-black text-[10px] rounded-full uppercase tracking-wider mb-2 shadow-sm">
                      ENTRY B
                    </span>
                    <h4 className="text-white font-black text-sm sm:text-base leading-snug tracking-tight drop-shadow-md border-b-2 border-purple-400 pb-1 max-w-[90%]">
                      {productB.productName || productB.title}
                    </h4>
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
                {productB.introText}
              </p>
            </div>
            <div className="space-y-2 pt-3 border-t border-slate-200">
              <button
                onClick={() => onNavigate(`/articles/${productB.id}`)}
                className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl transition text-center"
              >
                {productB.productName}の個別検証を見る →
              </button>
              <a
                href={productB.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl transition text-center shadow-sm"
              >
                Amazonで最安値をチェック ↗
              </a>
            </div>
          </div>
        </div>

        {/* Editor Takuma Contextual 3rd Recommendation Feature */}
        <div className="bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-slate-900/5 p-6 rounded-3xl border-2 border-amber-400/60 shadow-lg space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-full shadow-sm">
              👑 編集長タクマの第3の特別提案（カテゴリー決定版）
            </span>
            <span className="text-xs font-bold text-amber-900">
              {thirdRec.badge}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5 bg-white p-5 rounded-2xl border border-amber-200">
            {thirdRec.asin === 'B09NPPZLN1' ? (
              /* Reflea Only: No Overlay, 100% Clear Photo */
              <img
                src={thirdRec.imageUrl}
                alt={thirdRec.title}
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover flex-shrink-0 border border-slate-200 shadow-sm"
              />
            ) : (
              /* All Other Products: Dark Overlay to hide Unsplash photo */
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0 border border-slate-200 shadow-inner group">
                <img
                  src={thirdRec.imageUrl}
                  alt={thirdRec.title}
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[1px] flex items-center justify-center p-2 text-center z-10">
                  <span className="text-white font-black text-[10px] leading-tight drop-shadow-md border-b border-amber-400 pb-0.5 line-clamp-3">
                    {thirdRec.title}
                  </span>
                </div>
              </div>
            )}
            
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <h4 className="font-black text-slate-900 text-base leading-snug">
                {thirdRec.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {thirdRec.comment}
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onNavigate(`/articles/${thirdRec.articleId}`)}
                  className="w-full sm:w-auto py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition"
                >
                  編集長の検証記事を読む →
                </button>
                <a
                  href={thirdRec.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-2 px-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl transition text-center shadow-sm"
                >
                  Amazonで最安値を見る ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scene-by-Scene Comparison Decision Matrix Table (SEO & GEO Booster) */}
        <div className="space-y-4 pt-6">
          <h3 className="text-xl font-black text-slate-900 border-l-4 border-amber-400 pl-3">
            【使用シーン・目的別】勝者対比マトリクス
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900 text-white font-extrabold">
                <tr>
                  <th className="p-3.5 sm:p-4">目的・使用シーン（敏感肌/海プール/部活/汗）</th>
                  <th className="p-3.5 sm:p-4">おすすめの勝者アイテム</th>
                  <th className="p-3.5 sm:p-4">選出理由・実体感</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium">
                {comparison.comparisonPoints.map((pt, idx) => {
                  const winnerProd = pt.winnerAsin === productA.asin ? productA : productB;
                  return (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">{pt.scene}</td>
                      <td className="p-3.5 sm:p-4 font-black text-indigo-600">{winnerProd.productName}</td>
                      <td className="p-3.5 sm:p-4 text-slate-600 leading-relaxed">{pt.reason}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Markdown Comparison Content */}
        <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed border-t border-slate-100 pt-8">
          <MarkdownRenderer content={comparison.contentMarkdown} onNavigate={onNavigate} />
        </div>
      </article>
    </div>
  );
}
