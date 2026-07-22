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
  },
  {
    id: 'art-b0ch321sgn',
    title: `【Panasonicヘアードライヤー ナノケア EH-NA0J】`,
    originalUrl: 'https://www.amazon.co.jp/s?k=Panasonic%20%E3%83%98%E3%82%A2%E3%83%BC%E3%83%89%E3%83%A9%E3%82%A4%E3%83%A4%E3%83%BC%20%E3%83%8A%E3%83%8E%E3%82%B1%E3%82%A2%20EH-NA0J&tag=mattan0290c-22',
    asin: 'B0CH321SGN',
    productName: 'Panasonic ヘアードライヤー ナノケア EH-NA0J',
    category: 'haircare',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
    starRating: 4.5,
    introText: `ドライヤーから出る熱風が髪を傷めてしまう、という経験はありませんか？`,
    features: [`ナノケア技術で髪を守る`, `高熱対策の冷風モード`, `静音設計で安心`],
    pros: [`髪のダメージを最小限に抑える`, `速乾性と使い勝手が良い`, `静かで使いやすい`],
    cons: [`価格がやや高め`, `重さが若干ある`],
    reviewBody: `### まさに私が探していたドライヤー！
私の髪は細くて傷みやすいタイプです。そのため、ドライヤーを使うときはいつも気がかりでした。しかし、Panasonicヘアードライヤー ナノケア EH-NA0Jを使い始めてから、気になる髪の痛みが減ったような気がします。
### ナノケア技術の効果
ナノケア技術が髪のキューティクルを守り、ダメージを防いでくれるような気がします。ドライヤーを使うたびに、熱風で髪が痛むという心配が少し和らぎました。
### 乾燥の速さと静音性
乾燥の速さも良く、時間を短縮することができました。さらに、静音設計なので、早朝や夜遅くに使用しても周囲を気にしなくてよくなりました。
### 使用感
使用している間、热風で髪が痛むという感覚が減少し、乾燥後も髪のサラサラ感が保てました。若干重いと感じましたが、全体的には優れた製品です。`,
    ctaTitle: `今すぐこの商品を見てみる`,
    affiliateLink: 'https://www.amazon.co.jp/s?k=Panasonic%20%E3%83%98%E3%82%A2%E3%83%BC%E3%83%89%E3%83%A9%E3%82%A4%E3%83%A4%E3%83%BC%20%E3%83%8A%E3%83%8E%E3%82%B1%E3%82%A2%20EH-NA0J&tag=mattan0290c-22',
    createdAt: '2026-07-22 10:54:27',
    estimatedPV: Math.floor(Math.random() * 500) + 100,
    clicks: Math.floor(Math.random() * 50) + 10,
    earnings: Math.floor(Math.random() * 5000) + 500,
    aiModelUsed: 'Groq Llama 3.3 70B',
    summaryKeyPoints: [
      `ナノケア技術で髪のダメージを最小限に抑える`,
      `乾燥の速さと静音性が優れている`,
      `若干重さがあり価格が高め`
    ],
    faqs: [
      {
        question: `ナノケア技術とは？`,
        answer: `髪のキューティクルを守り、ドライヤーの熱風によるダメージを軽減する技術です。`
      },
      {
        question: `静音モードはどのように使うの？`,
        answer: `ドライヤー本体のボタンで簡単に静音モードをオン・オフできます。`
      }
    ],
    reviewerName: `アヤ @美容ライター`,
    reviewerRole: `元美容部員・日本化粧品検定1級`,
    verificationDays: 30,
    priceRange: `約30,000円〜`
  },
  {
    id: 'art-b08l7d47rp',
    title: `ReFa BEAUTECH DRYER PRO：乾燥時間を短縮する高級ヘアドライヤー`,
    originalUrl: 'https://www.amazon.co.jp/s?k=ReFa%20BEAUTECH%20DRYER%20PRO&tag=mattan0290c-22',
    asin: 'B08L7D47RP',
    productName: 'ReFa BEAUTECH DRYER PRO',
    category: 'haircare',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
    starRating: 4.5,
    introText: `ドライヤーを使用することでダメージを気にしている方、乾燥時間が長くてイライラする方。この悩みを解決してくれるアイテムをご紹介します。`,
    features: [`高速乾燥`, `高品質な部品`, `低振動`],
    pros: [`乾燥時間が短縮`, `髪を傷めない`, `デザインが高級感あり`],
    cons: [`高価`, `充電式のため、充電に時間がかかる`],
    reviewBody: `### ReFa BEAUTECH DRYER PROの特徴
ReFa BEAUTECH DRYER PROは、従来のドライヤーとは一線を画す、高級感のあるヘアドライヤーです。高速乾燥、低振動など、従来のドライヤーでは実現が難しかった機能を搭載しています。
### 使用感
実際に使用してみましたが、驚くほど短時間で乾燥してくれました。さらに、従来のドライヤーで感じていた热い風の感じがいないのが特徴です。
### 肌の変化
使用して1週間、髪のダメージが軽減され、しなやかになっていると感じています。デザインも高級感があり、使っているだけでステキな気分になります。`,
    ctaTitle: `ReFa BEAUTECH DRYER PROを今すぐ購入`,
    affiliateLink: 'https://www.amazon.co.jp/s?k=ReFa%20BEAUTECH%20DRYER%20PRO&tag=mattan0290c-22',
    createdAt: '2026-07-22 11:04:52',
    estimatedPV: Math.floor(Math.random() * 500) + 100,
    clicks: Math.floor(Math.random() * 50) + 10,
    earnings: Math.floor(Math.random() * 5000) + 500,
    aiModelUsed: 'Groq Llama 3.3 70B',
    summaryKeyPoints: [
      `高速乾燥`,
      `高品質な部品`,
      `低振動`
    ],
    faqs: [
      {
        question: `このドライヤーは充電式ですか？`,
        answer: `はい、充電式です。`
      },
      {
        question: `使用方法はどうなのですか？`,
        answer: `基本的な使用方法は通常のドライヤーと同じです。ただし、温度設定や風量設定などをカスタマイズできます。`
      }
    ],
    reviewerName: `アヤ @美容ライター`,
    reviewerRole: `元美容部員・日本化粧品検定1級`,
    verificationDays: 30,
    priceRange: `約40,000円〜`
  },
  {
    id: 'art-b07vp67d42',
    title: `【Dyson Supersonic Ionic】ドライヤーが美髪のカギ!? 高級感あふれる使用感`,
    originalUrl: 'https://www.amazon.co.jp/s?k=Dyson%20Supersonic%20Ionic&tag=mattan0290c-22',
    asin: 'B07VP67D42',
    productName: 'Dyson Supersonic Ionic',
    category: 'haircare',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
    starRating: 4.8,
    introText: `ストレスフリーな毎日をSEND！美髪を手に入れるためにあなたが知っておくべき新感覚ドライヤー`,
    features: [`高速dry技術`, `多段階温度調整`, `イオン技術`],
    pros: [`高速で乾燥`, `ダメージを減らす`, `使い心地が良好`],
    cons: [`高価`, `初期の出費が大きい`],
    reviewBody: `### 美髪に必要な技術
Dyson Supersonic Ionicは、イオン技術を搭載したドライヤーです。
### 使用感と乾燥時間
私が使用してみた感想は、非常に良好でした。髪は速乾して、ダメージも軽減されました。
### 比較検討
他のドライヤーに比べ、高価ではありますが、長期的な使用に耐えられるだけの価値があります`,
    ctaTitle: `【今すぐDyson Supersonic Ionicをチェック！】`,
    affiliateLink: 'https://www.amazon.co.jp/s?k=Dyson%20Supersonic%20Ionic&tag=mattan0290c-22',
    createdAt: '2026-07-22 11:14:02',
    estimatedPV: Math.floor(Math.random() * 500) + 100,
    clicks: Math.floor(Math.random() * 50) + 10,
    earnings: Math.floor(Math.random() * 5000) + 500,
    aiModelUsed: 'Groq Llama 3.3 70B',
    summaryKeyPoints: [
      `イオン技術で美髪を実現`,
      `高速dry技術により乾燥時間短縮`,
      `高級感あふれるデザイン`
    ],
    faqs: [
      {
        question: `Dyson Supersonic Ionicのイオン技術は何？”`,
        answer: `イオン技術により、髪のダメージを軽減します。`
      },
      {
        question: `使い方は難しいの？`,
        answer: `簡単です。誰でも使えるよう設計されています。`
      }
    ],
    reviewerName: `アヤ @美容ライター`,
    reviewerRole: `元美容部員・日本化粧品検定1級`,
    verificationDays: 30,
    priceRange: `約3万〜4万円`
  }
];
