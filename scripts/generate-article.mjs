import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

// ============================================================
// 設定・定義 (美容系専門)
// ============================================================
const CATEGORIES = [
  { id: 'skincare', name: 'スキンケア', keywords: ['美容液', '化粧水', 'クリーム'] },
  { id: 'haircare', name: 'ヘアケア', keywords: ['ドライヤー', 'ヘアアイロン', 'トリートメント'] },
  { id: 'device', name: '美容家電', keywords: ['美顔器', 'スチーマー', '脱毛器'] },
  { id: 'makeup', name: 'メイクアップ', keywords: ['ファンデーション', 'リップ', 'アイシャドウ'] }
];

const TARGET_PRODUCTS = [
  // 夏のスキンケア・UVケア
  { category: 'skincare', asin: 'B08S324BZS', name: 'アネッサ パーフェクトUV スキンケアミルク N' },
  { category: 'skincare', asin: 'B0CNVDB4Z7', name: 'POLA B.A ライト セレクター N' },
  { category: 'skincare', asin: 'B0CT5HDKC4', name: 'KANEBO ヴェイル オブ デイ' },
  { category: 'skincare', asin: 'B0CPQ1ZJ9K', name: 'RMK クーリングジェル' },
  
  // 夏の崩れないベースメイク
  { category: 'makeup', asin: 'B0BVB89XFT', name: 'LANCOME タンイドル ウルトラ ウェア リキッド' },
  { category: 'makeup', asin: 'B09YJ8HFTC', name: 'TIRTIR マスクフィットレッドクッション' },
  { category: 'makeup', asin: 'B09Q87J1Q5', name: 'Dior ディオールスキン フォーエヴァー フルイド マット' },
  
  // 夏限定カラー・ウォータープルーフ
  { category: 'makeup', asin: 'B0CVXF4M7C', name: 'SUQQU シグニチャー カラー アイズ (夏限定)' },
  { category: 'makeup', asin: 'B08F22L4QG', name: 'ヒロインメイクSP スムースリキッドアイライナー スーパーキープ' },
  
  // 夏のヘアケア (紫外線ダメージケア)
  { category: 'haircare', asin: 'B0CVWZQKZK', name: 'オージュア QU クエンチ ヘアトリートメント' },
  { category: 'haircare', asin: 'B0CN2NXZP7', name: 'ReFa LOCK OIL LIGHT' },
  
  // 既存美容家電
  { category: 'device', asin: 'B0CXKZRYPQ', name: 'YA-MAN フォトプラス EX プレミアム' },
  { category: 'device', asin: 'B0B8CRZ459', name: 'Panasonic スチーマー ナノケア EH-SA0B' }
];

// イメージマッピング（Unsplash）
const IMAGE_MAPPING = {
  skincare: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600',
  haircare: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
  device: 'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?auto=format&fit=crop&q=80&w=600',
  makeup: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600',
  default: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=600'
};

function log(msg, type = 'INFO') {
  const prefix = type === 'INFO' ? 'ℹ️' : type === 'SUCCESS' ? '✅' : type === 'WARN' ? '⚠️' : '❌';
  console.log(`[${new Date().toISOString()}] ${prefix} ${msg}`);
}

// ------------------------------------------------------------
// APIクライアント群
// ------------------------------------------------------------

async function generateWithGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: 'application/json'
      }
    })
  });
  if (!res.ok) throw new Error(`Gemini Error: ${await res.text()}`);
  const data = await res.json();
  let text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return { text, model: 'Gemini 2.5 Flash' };
}

async function generateWithGroq(prompt) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY is not set');

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: 'You are a beauty expert JSON generator. Output ONLY valid JSON.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' }
    })
  });
  if (!res.ok) throw new Error(`Groq Error: ${await res.text()}`);
  const data = await res.json();
  return { text: data.choices[0].message.content, model: 'Groq Llama 3.3 70B' };
}

async function generateWithFallback(prompt) {
  try {
    log('GeminiAPIで生成を試行します...');
    return await generateWithGemini(prompt);
  } catch (e) {
    log(`GeminiAPI失敗: ${e.message}`, 'WARN');
    log('GroqAPI(Llama3.3)にフォールバックします...');
    return await generateWithGroq(prompt);
  }
}

// ------------------------------------------------------------
// ロジック群
// ------------------------------------------------------------

function getExistingAsins() {
  const dataPath = resolve(process.cwd(), 'src', 'data.ts');
  const content = readFileSync(dataPath, 'utf-8');
  const asins = new Set();
  const matches = content.matchAll(/asin:\s*['"](.*?)['"]/g);
  for (const match of matches) {
    asins.add(match[1]);
  }
  return asins;
}

function pickProduct(existingAsins) {
  const available = TARGET_PRODUCTS.filter(p => !existingAsins.has(p.asin));
  if (available.length === 0) {
    // 全て記事化済みの場合はランダムに一つ
    return TARGET_PRODUCTS[Math.floor(Math.random() * TARGET_PRODUCTS.length)];
  }
  return available[0]; // 順番に選択
}

function buildPrompt(product) {
  return `
あなたは20代〜30代女性向けのトップ美容ブロガー・コスメコンシェルジュです。
以下の商品についての魅力的で高級感のあるレビュー記事を生成してください。

- 対象商品: ${product.name}
- カテゴリ: ${product.category}

必ず以下のJSONスキーマに従い、JSONのみを出力してください（Markdownの修飾等は不要です）。

{
  "title": "【記事タイトル（商品名を含め、女性が惹かれるキャッチーな30文字程度）】",
  "starRating": 4.5, // 4.0〜5.0
  "introText": "【読者の悩みに寄り添う共感性の高い導入文（約100文字）】",
  "features": ["特徴1", "特徴2", "特徴3"], // 各40文字以内
  "pros": ["メリット1", "メリット2", "メリット3"],
  "cons": ["デメリット1", "デメリット2"],
  "reviewBody": "【記事本文：Markdown形式。上品な言葉遣いで、自身の体験や肌の変化、使用感などをリアルにレビュー。見出し(###)を数個含めて600文字程度】",
  "ctaTitle": "【今すぐ商品を見たくなるボタン用のキャッチコピー】",
  "summaryKeyPoints": ["まとめ1", "まとめ2", "まとめ3"],
  "faqs": [
    { "question": "よくある質問1", "answer": "回答1" },
    { "question": "よくある質問2", "answer": "回答2" }
  ],
  "reviewerName": "【著者名（例：アヤ @美容ライター）】",
  "reviewerRole": "【著者の肩書（例：元美容部員・日本化粧品検定1級）】",
  "verificationDays": 30, // 検証日数（数字のみ）
  "priceRange": "【大体の価格帯（例：約30,000円〜）】"
}
`;
}

function parseArticleJson(text) {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('JSONが見つかりません');
  return JSON.parse(jsonMatch[0]);
}

function appendArticleToDataTs(article, product) {
  const dataPath = resolve(process.cwd(), 'src', 'data.ts');
  const content = readFileSync(dataPath, 'utf-8');

  const closingBracketIdx = content.lastIndexOf('];');
  if (closingBracketIdx === -1) throw new Error('src/data.ts に ]; が見つかりません');

  const imageUrl = IMAGE_MAPPING[product.category] || IMAGE_MAPPING.default;

  const escapeTs = (str) => {
    if (typeof str !== 'string') return String(str || '');
    return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\${/g, '\\${');
  };

  const a = article;
  
  // URLはフロント側で動的に上書きされるが、ソースにも商品名を記載しておく
  const safeProductName = encodeURIComponent(product.name);
  const link = `https://www.amazon.co.jp/s?k=${safeProductName}&tag=mattan0290c-22`;

  const faqsTs = Array.isArray(a.faqs)
    ? `[\n      ${a.faqs.map(f => `{\n        question: \`${escapeTs(f.question)}\`,\n        answer: \`${escapeTs(f.answer)}\`\n      }`).join(',\n      ')}\n    ]`
    : '[]';

  const summaryTs = Array.isArray(a.summaryKeyPoints)
    ? `[\n      ${a.summaryKeyPoints.map(s => `\`${escapeTs(s)}\``).join(',\n      ')}\n    ]`
    : '[]';

  const featuresTs = (a.features || []).map(f => `\`${escapeTs(f)}\``).join(', ');
  const prosTs = (a.pros || []).map(p => `\`${escapeTs(p)}\``).join(', ');
  const consTs = (a.cons || []).map(c => `\`${escapeTs(c)}\``).join(', ');

  const tsEntry = `  {
    id: 'art-${product.asin.toLowerCase()}',
    title: \`${escapeTs(a.title)}\`,
    originalUrl: '${link}',
    asin: '${product.asin}',
    productName: '${escapeTs(product.name)}',
    category: '${product.category}',
    imageUrl: '${imageUrl}',
    starRating: ${a.starRating || 4.5},
    introText: \`${escapeTs(a.introText)}\`,
    features: [${featuresTs}],
    pros: [${prosTs}],
    cons: [${consTs}],
    reviewBody: \`${escapeTs(a.reviewBody)}\`,
    ctaTitle: \`${escapeTs(a.ctaTitle)}\`,
    affiliateLink: '${link}',
    createdAt: '${new Date().toISOString().replace('T', ' ').slice(0, 19)}',
    estimatedPV: Math.floor(Math.random() * 500) + 100,
    clicks: Math.floor(Math.random() * 50) + 10,
    earnings: Math.floor(Math.random() * 5000) + 500,
    aiModelUsed: '${a.aiModelUsed}',
    summaryKeyPoints: ${summaryTs},
    faqs: ${faqsTs},
    reviewerName: \`${escapeTs(a.reviewerName || '')}\`,
    reviewerRole: \`${escapeTs(a.reviewerRole || '')}\`,
    verificationDays: ${a.verificationDays || 30},
    priceRange: \`${escapeTs(a.priceRange || '')}\`
  }`;

  const before = content.slice(0, closingBracketIdx);
  const after = content.slice(closingBracketIdx);
  const newContent = before.trimEnd() + ',\n' + tsEntry + '\n' + after;

  writeFileSync(dataPath, newContent, 'utf-8');
}

async function main() {
  log('=== Beauty GO!! 自動記事生成 スタート ===');

  const existingAsins = getExistingAsins();
  const product = pickProduct(existingAsins);
  log(`選択商品: ${product.name} (ASIN: ${product.asin})`);

  const prompt = buildPrompt(product);
  const { text, model } = await generateWithFallback(prompt);
  log(`使用モデル: ${model}`);

  try {
    const article = parseArticleJson(text);
    article.aiModelUsed = model;
    
    appendArticleToDataTs(article, product);
    log(`記事追記成功: ${article.title}`, 'SUCCESS');
  } catch (err) {
    log(`処理エラー: ${err.message}`, 'ERROR');
    process.exit(1);
  }
}

main().catch(err => {
  log(`致命的エラー: ${err.message}`, 'ERROR');
  process.exit(1);
});
