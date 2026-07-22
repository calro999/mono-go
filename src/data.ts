import { CategorySpec, AmazonProductArticle } from './types';

export const AMAZON_CATEGORIES: CategorySpec[] = [
  {
    id: 'skincare',
    name: 'スキンケア',
    slug: 'skincare',
    icon: 'Sparkles',
    description: '透明感のある肌へ導く美容液、化粧水、クリーム'
  },
  {
    id: 'haircare',
    name: 'ヘアケア',
    slug: 'haircare',
    icon: 'Wind',
    description: 'サロン帰りのツヤ髪を実現する高機能ドライヤー、ヘアケア用品'
  },
  {
    id: 'device',
    name: '美容家電',
    slug: 'device',
    icon: 'Zap',
    description: '自宅をエステに変える美顔器、スチーマー、脱毛器'
  },
  {
    id: 'makeup',
    name: 'メイクアップ',
    slug: 'makeup',
    icon: 'Heart',
    description: '毎日のメイクを格上げするトレンドコスメ'
  }
];

export const INITIAL_ARTICLES: AmazonProductArticle[] = [
  {
    id: 'art-b0cxkzrypq',
    title: '【徹底レビュー】YA-MAN フォトプラス EX プレミアム - 本気のエイジングケアを自宅で',
    originalUrl: 'https://www.amazon.co.jp/s?k=YA-MAN+%E3%83%95%E3%82%A9%E3%83%88%E3%83%97%E3%83%A9%E3%82%B9+EX+%E3%83%97%E3%83%AC%E3%83%9F%E3%82%A2%E3%83%A0&tag=mattan0290c-22',
    asin: 'B0CXKZRYPQ',
    productName: 'YA-MAN フォトプラス EX プレミアム',
    category: 'device',
    imageUrl: 'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?auto=format&fit=crop&q=80&w=600',
    starRating: 4.8,
    introText: '「もっと早く買えばよかった…」SNSで話題沸騰のヤーマン最高峰美顔器。エステサロンさながらの本格ケアがこれ1台で完結します。',
    features: [
      'RF(ラジオ波)・イオン導出入・EMS・マイクロカレント・LEDをフル搭載',
      '年齢肌の悩みにアプローチする独自の「アイケアモード」搭載',
      '化粧水やシートマスクの上から使える手軽さ'
    ],
    pros: [
      '翌朝の化粧ノリが劇的に変わる即効性',
      'コードレスでテレビを見ながらでもケアできる',
      'エステ数回分の価格で一生モノのケアが手に入る'
    ],
    cons: [
      '専用パッドやコットンが必要でランニングコストが少し掛かる',
      '全モード(6種類)を行うと約15分かかり少し手間に感じることも'
    ],
    reviewBody: `### 自宅が高級エステサロンに変わる魔法のステッキ

30代に突入して、なんとなく肌のハリ不足や乾燥が気になり始めた頃に出会ったのがこの「フォトプラス EX プレミアム」。
最初は「美顔器って面倒くさそう…」と思っていましたが、今では手放せない相棒です。

#### 1. ラジオ波(RF)による極上の温めケア
肌の深部までじんわりと温めるRF技術は、まるでプロのエステティシャンの手のひらに包まれているかのような心地よさ。洗顔では落としきれない毛穴の奥の汚れ（イオン導出）がコットンにびっしり付いたときは衝撃でした。

#### 2. 表情筋にアプローチするEMS
私が一番お気に入りなのがEMSモード。ピクピクと筋肉が動く感覚がクセになります。毎晩テレビを見ながら当てているだけで、フェイスラインがスッキリとした印象に。

#### 3. 翌朝の「パンッ」としたハリ感
化粧水や美容液の浸透（角質層まで）が全く違います。高いスキンケアを買い漁る前に、まずは肌の土台を整える美顔器への投資が一番コスパが良いと確信しました。
`,
    ctaTitle: '＼ 今ならAmazonでお得に購入可能！限定キャンペーンをチェック ／',
    affiliateLink: 'https://www.amazon.co.jp/s?k=YA-MAN+%E3%83%95%E3%82%A9%E3%83%88%E3%83%97%E3%83%A9%E3%82%B9+EX+%E3%83%97%E3%83%AC%E3%83%9F%E3%82%A2%E3%83%A0&tag=mattan0290c-22',
    createdAt: '2026-07-22 10:00:00',
    estimatedPV: 1250,
    clicks: 184,
    earnings: 8500,
    aiModelUsed: 'Gemini 3.5 Flash',
    summaryKeyPoints: [
      'エステサロン級の6つの機能を1台に凝縮したオールインワン美顔器',
      'RF(ラジオ波)で温めながらのクレンジング＆保湿で肌の透明感アップ',
      'EMSによる表情筋ケアで、年齢とともに気になるフェイスラインにアプローチ'
    ],
    faqs: [
      {
        question: '毎日使っても大丈夫ですか？',
        answer: '毎日の使用は推奨されておらず、週2〜3回のスペシャルケアとしてのご使用が効果的でおすすめです。（※クールモードは毎日使用可）'
      },
      {
        question: '手持ちの化粧水は使えますか？',
        answer: 'はい、お使いいただけます。ただし、オイル系やスクラブ入りのものは避け、とろみのある化粧水や水溶性のジェルがEMSの伝導を良くするのでおすすめです。'
      }
    ],
    reviewerName: 'ミキ @コスメコンシェルジュ',
    reviewerRole: '元大手化粧品メーカー勤務・美容ライター歴7年',
    verificationDays: 90,
    priceRange: '約50,000円〜55,000円'
  }
];
