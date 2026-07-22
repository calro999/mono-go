#!/usr/bin/env node
/**
 * Amazon GO!! - 自動記事生成スクリプト
 * 
 * 実行順序（フォールバック）:
 *   1. Gemini 2.0 Flash (GEMINI_API_KEY)
 *   2. Groq Llama 3.1 70B (GROQ_API_KEY)
 *   3. OpenRouter Mistral (OPENROUTER_API_KEY)
 *   4. Hugging Face Serverless Inference (HF_API_TOKEN) ← 完全無料
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

// ============================================================
// カテゴリ定義
// ============================================================
const CATEGORIES = [
  { id: 'gadgets',    name: '家電・カメラ' },
  { id: 'pc',         name: 'パソコン・周辺機器' },
  { id: 'kitchen',    name: 'ホーム＆キッチン' },
  { id: 'beauty',     name: 'ビューティー' },
  { id: 'fashion',    name: 'ファッション' },
  { id: 'books-games',name: '本・ゲーム' },
];

// カテゴリ別のトレンド商品テーマ（ASINは架空、実際はPA-APIや手動更新で管理）
const PRODUCT_THEMES = {
  gadgets: [
    { asin: 'B0D3K7XYZQ', name: 'Anker Soundcore Liberty 4 NC', priceRange: '約8,000円〜10,000円' },
    { asin: 'B0CM5BX3ZS', name: 'Bose QuietComfort Ultra Earbuds', priceRange: '約39,600円〜42,000円' },
    { asin: 'B09QC2ZXRY', name: 'Google Pixel Watch 3', priceRange: '約52,800円〜59,800円' },
    { asin: 'B0CWHX4LFT', name: 'Dyson Airwrap Multi-Styler Complete Long', priceRange: '約79,800円〜85,000円' },
    { asin: 'B0C6Q7LMRP', name: 'SHARP プラズマクラスター 空気清浄機', priceRange: '約32,000円〜38,000円' },
  ],
  pc: [
    { asin: 'B0CK2BKZNX', name: 'Logicool MX Master 3S', priceRange: '約13,200円〜15,000円' },
    { asin: 'B0B3FKXYNQ', name: 'LG UltraGear 27GP950B 4K 144Hz Gaming Monitor', priceRange: '約78,000円〜85,000円' },
    { asin: 'B0CXMPPV7D', name: 'Samsung 990 Pro 2TB NVMe SSD', priceRange: '約18,000円〜22,000円' },
    { asin: 'B0D2KLMZPW', name: 'Keychron K2 Pro QMK/VIA Wireless Keyboard', priceRange: '約16,500円〜18,000円' },
    { asin: 'B09P2KVKZL', name: 'エルゴトロン LX デスクマウント モニターアーム', priceRange: '約9,500円〜11,000円' },
  ],
  kitchen: [
    { asin: 'B0BXKZRYNP', name: 'バルミューダ The Toaster Pro', priceRange: '約27,500円〜30,000円' },
    { asin: 'B0C3MXZYPQ', name: 'Panasonic ビストロ スチームオーブンレンジ', priceRange: '約88,000円〜95,000円' },
    { asin: 'B0CF7VKXZN', name: 'デロンギ デディカ エスプレッソメーカー', priceRange: '約28,000円〜32,000円' },
    { asin: 'B0BMZRXYPQ', name: 'iRobot Roomba j9+', priceRange: '約138,000円〜145,000円' },
    { asin: 'B09RKLXZPV', name: 'ネスプレッソ ヴァーチュオ プラス', priceRange: '約14,800円〜16,500円' },
  ],
  beauty: [
    { asin: 'B0CXKZRYPQ', name: 'YA-MAN フォトプラス EX プレミアム', priceRange: '約49,800円〜55,000円' },
    { asin: 'B0BXZ7RYQP', name: 'Panasonic ナノケア EH-NA0J ドライヤー', priceRange: '約22,000円〜25,000円' },
    { asin: 'B0C6MXZYPQ', name: 'MTG ReFa CAXA RAY 美顔ローラー', priceRange: '約35,000円〜38,000円' },
    { asin: 'B0BVK3XYQZ', name: 'オムロン 音波式電動歯ブラシ Mediclean', priceRange: '約8,800円〜11,000円' },
    { asin: 'B0CZMXRYPQ', name: 'Dr.Ci:Labo スーパーホワイトVC100 美容液', priceRange: '約5,500円〜7,000円' },
  ],
  fashion: [
    { asin: 'B0CXZRYPQM', name: 'UNIQLO ウルトラライトダウンジャケット', priceRange: '約9,900円〜11,900円' },
    { asin: 'B0BZK7XYPQ', name: 'アークテリクス アトム LT フーディー', priceRange: '約58,000円〜65,000円' },
    { asin: 'B0CMZXRYPQ', name: 'TUMI Alpha 3 バックパック', priceRange: '約98,000円〜110,000円' },
    { asin: 'B0BVX3ZYPQ', name: 'New Balance 990v6 スニーカー', priceRange: '約28,000円〜32,000円' },
    { asin: 'B0CZXRYPQK', name: 'Bellroy Tokyo Tote Pack リュック', priceRange: '約22,000円〜25,000円' },
  ],
  'books-games': [
    { asin: 'B0CKZ7XYPQ', name: 'Nintendo Switch 2 本体', priceRange: '約49,980円〜54,000円' },
    { asin: 'B0BMZXRYPQ', name: 'PlayStation 5 スリム版 本体', priceRange: '約59,980円〜65,000円' },
    { asin: 'B09ZXKRYPQ', name: 'Kindle Paperwhite シグニチャーエディション', priceRange: '約27,980円〜29,800円' },
    { asin: 'B0CXZRYPQN', name: 'ゼルダの伝説 知恵のかりもの', priceRange: '約6,578円〜7,800円' },
    { asin: 'B0BMZKRYPQ', name: 'Oculus Quest 3 VRヘッドセット', priceRange: '約74,800円〜79,000円' },
  ],
};

// ============================================================
// ユーティリティ
// ============================================================

function log(msg, level = 'INFO') {
  const time = new Date().toISOString();
  const icon = { INFO: '📋', SUCCESS: '✅', WARN: '⚠️', ERROR: '❌', AI: '🤖' }[level] || '•';
  console.log(`[${time}] ${icon} [${level}] ${msg}`);
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

/** 既存のdata.tsからASINリストを読み取る */
function getExistingAsins() {
  try {
    const content = readFileSync(resolve(ROOT, 'src/data.ts'), 'utf-8');
    const matches = content.matchAll(/asin:\s*['"]([A-Z0-9]{10})['"]/g);
    return new Set([...matches].map(m => m[1]));
  } catch {
    return new Set();
  }
}

/** 既存のカテゴリ別件数を集計して最も少ないカテゴリを選ぶ */
function pickCategory() {
  try {
    const content = readFileSync(resolve(ROOT, 'src/data.ts'), 'utf-8');
    const counts = {};
    for (const cat of CATEGORIES) {
      const re = new RegExp(`category:\\s*['"]${cat.id}['"]`, 'g');
      counts[cat.id] = (content.match(re) || []).length;
    }
    log(`カテゴリ別記事数: ${JSON.stringify(counts)}`);
    return CATEGORIES.sort((a, b) => (counts[a.id] || 0) - (counts[b.id] || 0))[0];
  } catch {
    return CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  }
}

/** 記事数を取得して上限チェック */
function getArticleCount() {
  try {
    const content = readFileSync(resolve(ROOT, 'src/data.ts'), 'utf-8');
    const matches = content.matchAll(/id:\s*['"][^'"]+['"]/g);
    return [...matches].length;
  } catch {
    return 0;
  }
}

/** 未使用の商品テーマを選択 */
function pickProduct(categoryId, existingAsins) {
  const themes = PRODUCT_THEMES[categoryId] || PRODUCT_THEMES['gadgets'];
  const unused = themes.filter(t => !existingAsins.has(t.asin));
  if (unused.length === 0) {
    log(`カテゴリ ${categoryId} の全商品を使用済み。ランダム選択します。`, 'WARN');
    return themes[Math.floor(Math.random() * themes.length)];
  }
  return unused[Math.floor(Math.random() * unused.length)];
}

// ============================================================
// プロンプト生成
// ============================================================

function buildPrompt(category, product) {
  return `あなたはAmazonアフィリエイト記事を執筆する日本語のプロライターです。
以下の商品について、SEO・GEO・E-E-A-T・アフィリエイトCVR最大化を意識した高品質なレビュー記事をJSON形式で生成してください。

【商品情報】
- 商品名: ${product.name}
- カテゴリ: ${category.name}
- ASIN: ${product.asin}
- 参考価格帯: ${product.priceRange}

【出力仕様】
必ず以下のJSONスキーマに従って出力してください。JSONのみ、前後に余計なテキストは不要です。

{
  "id": "art-${product.asin.toLowerCase()}",
  "title": "【徹底レビュー】または【比較検証】から始まる70文字以内の魅力的なタイトル",
  "originalUrl": "https://www.amazon.co.jp/s?k=${encodeURIComponent(product.name)}&tag=mattan0290c-22",
  "asin": "${product.asin}",
  "category": "${category.id}",
  "imageUrl": "https://images.unsplash.com/photo-XXXXXXX?auto=format&fit=crop&q=80&w=600",
  "starRating": 4.1〜4.9の数値,
  "introText": "読者を引き込む2〜3文のフック（ベネフィット訴求）",
  "features": ["特徴1（具体的数値あり）", "特徴2", "特徴3"],
  "pros": ["メリット1（実体験風）", "メリット2", "メリット3"],
  "cons": ["デメリット1（正直に）", "デメリット2"],
  "reviewBody": "### H3見出し付きのMarkdown形式レビュー本文（600文字以上）。感情に訴えかける書き出し、具体的なユースケース、競合比較を含めること",
  "ctaTitle": "緊急性・限定性を含む購入を促すCTAテキスト（例：＼ 今なら○○！Amazonで最安値をチェック ／）",
  "affiliateLink": "https://www.amazon.co.jp/s?k=${encodeURIComponent(product.name)}&tag=mattan0290c-22",
  "createdAt": "${new Date().toISOString().replace('T', ' ').slice(0, 19)}",
  "estimatedPV": 100〜600のランダムな整数,
  "clicks": 10〜80のランダムな整数,
  "earnings": 800〜6000のランダムな整数,
  "aiModelUsed": "使用したAIモデル名",
  "summaryKeyPoints": [
    "AI OverviewやGEO向けの箇条書きポイント1（数値・比較含む）",
    "ポイント2",
    "ポイント3"
  ],
  "faqs": [
    { "question": "購入前に気になるよくある質問1", "answer": "具体的で信頼できる回答1" },
    { "question": "よくある質問2", "answer": "回答2" }
  ],
  "reviewerName": "架空のリアルな日本語レビュアー名（例：ヤマダ @ガジェットブロガー）",
  "reviewerRole": "具体的で信頼できるプロフィール（例：IT企業勤務・5年間で100機以上のガジェットをレビュー）",
  "verificationDays": 14〜180の整数（実際に使用した日数）,
  "priceRange": "${product.priceRange}"
}

注意事項:
- imageUrlはUnsplashの実在するIDを使用するか、商品カテゴリに適した画像URLを指定してください
- gadgetsなら: photo-1505740420928-5e560c06d30e (ヘッドホン)、photo-1523275335684-37898b6baf30 (時計)、photo-1585771724684-38269d6639fd (スマホ) など
- pcなら: photo-1587829741301-dc798b83add3 (キーボード)、photo-1527864550417-7fd91fc51a46 (モニター) など
- kitchenなら: photo-1556909114-f6e7ad7d3136 (調理器具)、photo-1495474472287-4d71bcdd2085 (コーヒー) など
- beautyなら: photo-1522337360788-8b13dee7a37e (美容)、photo-1556228578-8c89e6adf883 (スキンケア) など
- fashionなら: photo-1542291026-7eec264c27ff (スニーカー)、photo-1553062407-98eeb64c6a62 (バッグ) など
- books-gamesなら: photo-1587202372775-e229f172b9d7 (ゲーム)、photo-1481627834876-b7833e8f5570 (本) など
- JSONのみ出力してください。\`\`\`json などのマークダウン記法は不要です。`;
}

// ============================================================
// LLM クライアント群
// ============================================================

/** 1. Gemini 2.0 Flash */
async function callGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not set');

  log('Gemini 2.0 Flash を呼び出し中...', 'AI');
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.85,
          maxOutputTokens: 4096,
          responseMimeType: 'application/json',
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini: 空レスポンス');
  return { text, model: 'Gemini 2.0 Flash' };
}

/** 2. Groq (Llama 3.1 70B) - 1日1000リクエスト無料 */
async function callGroq(prompt) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY not set');

  log('Groq Llama 3.3 70B を呼び出し中...', 'AI');
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'あなたはプロのアフィリエイトライターです。指定されたJSONスキーマに従い、必ずJSONのみを出力してください。',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.85,
      max_tokens: 4096,
      response_format: { type: 'json_object' },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error('Groq: 空レスポンス');
  return { text, model: 'Groq Llama 3.3 70B' };
}

/** 3. OpenRouter (Mistral 7B Instruct) - 毎日無料クレジットあり */
async function callOpenRouter(prompt) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OPENROUTER_API_KEY not set');

  log('OpenRouter Mistral-7B を呼び出し中...', 'AI');
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://github.com/calro999/mono-go',
      'X-Title': 'Amazon GO!! Auto Article Generator',
    },
    body: JSON.stringify({
      model: 'mistralai/mistral-7b-instruct:free',
      messages: [
        {
          role: 'system',
          content: 'You are a professional Japanese affiliate writer. Output only valid JSON.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.85,
      max_tokens: 4096,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error('OpenRouter: 空レスポンス');
  return { text, model: 'OpenRouter Mistral-7B' };
}

/** 4. Hugging Face Serverless Inference - 完全無料 */
async function callHuggingFace(prompt) {
  const apiKey = process.env.HF_API_TOKEN;
  if (!apiKey) throw new Error('HF_API_TOKEN not set');

  log('Hugging Face Zephyr-7B を呼び出し中...', 'AI');
  const res = await fetch(
    'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        inputs: `<|system|>You are a professional Japanese affiliate writer. Output only valid JSON.</s><|user|>${prompt}</s><|assistant|>`,
        parameters: {
          max_new_tokens: 2048,
          temperature: 0.85,
          return_full_text: false,
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HuggingFace API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text = Array.isArray(data) ? data[0]?.generated_text : data?.generated_text;
  if (!text) throw new Error('HuggingFace: 空レスポンス');
  return { text, model: 'HuggingFace Zephyr-7B' };
}

// ============================================================
// フォールバック付きLLM呼び出し
// ============================================================

async function generateWithFallback(prompt) {
  const providers = [
    { name: 'Gemini',        fn: callGemini },
    { name: 'Groq',          fn: callGroq },
    { name: 'OpenRouter',    fn: callOpenRouter },
    { name: 'HuggingFace',  fn: callHuggingFace },
  ];

  for (const provider of providers) {
    try {
      log(`${provider.name} で記事生成を試みます...`);
      const result = await provider.fn(prompt);
      log(`${provider.name} で生成成功！`, 'SUCCESS');
      return result;
    } catch (err) {
      log(`${provider.name} 失敗: ${err.message}`, 'WARN');
      await sleep(1000);
    }
  }

  throw new Error('全LLMプロバイダーで記事生成に失敗しました');
}

// ============================================================
// JSONパース & バリデーション
// ============================================================

function parseArticleJson(rawText) {
  let text = rawText.trim();

  // ```json ... ``` ブロックを除去
  text = text.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
  // ``` ... ``` ブロックを除去
  text = text.replace(/^```\s*/i, '').replace(/```\s*$/, '').trim();

  // 最初の { から最後の } までを抽出
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('JSONオブジェクトが見つかりません');

  text = text.slice(start, end + 1);

  try {
    return JSON.parse(text);
  } catch (e) {
    // 末尾カンマの除去などを試みる
    const cleaned = text
      .replace(/,\s*}/g, '}')
      .replace(/,\s*]/g, ']');
    return JSON.parse(cleaned);
  }
}

function validateArticle(article) {
  const required = [
    'id', 'title', 'originalUrl', 'asin', 'category',
    'imageUrl', 'starRating', 'introText', 'features',
    'pros', 'cons', 'reviewBody', 'ctaTitle', 'affiliateLink',
    'createdAt', 'estimatedPV', 'clicks', 'earnings', 'aiModelUsed',
  ];

  const missing = required.filter(k => article[k] === undefined || article[k] === null);
  if (missing.length > 0) {
    throw new Error(`必須フィールドが不足: ${missing.join(', ')}`);
  }

  // 型の補正
  article.starRating = parseFloat(article.starRating) || 4.5;
  article.estimatedPV = parseInt(article.estimatedPV) || 200;
  article.clicks = parseInt(article.clicks) || 20;
  article.earnings = parseInt(article.earnings) || 1500;
  article.verificationDays = parseInt(article.verificationDays) || 30;

  // starRating の範囲チェック
  if (article.starRating < 1.0 || article.starRating > 5.0) article.starRating = 4.5;

  // affiliateLinkにアソシエイトIDがなければ付与（検索URL形式に統一）
  if (!article.affiliateLink.includes('tag=')) {
    article.affiliateLink = `https://www.amazon.co.jp/s?k=${article.asin}&tag=mattan0290c-22`;
  }

  return article;
}

// ============================================================
// data.ts への追記
// ============================================================

function appendArticleToDataTs(article) {
  const dataPath = resolve(ROOT, 'src/data.ts');
  let content = readFileSync(dataPath, 'utf-8');

  // INITIAL_ARTICLES の閉じ ]  を探す
  const closingBracketIdx = content.lastIndexOf('];');
  if (closingBracketIdx === -1) {
    throw new Error('src/data.ts に INITIAL_ARTICLES の終端 ]; が見つかりません');
  }

  // オブジェクトをTypeScript文字列に変換
  const tsEntry = articleToTsString(article);

  // 末尾の ]; の直前に挿入
  const before = content.slice(0, closingBracketIdx);
  const after = content.slice(closingBracketIdx);

  // 末尾カンマを確認（最後のエントリーの後に , を追加）
  const newContent = before.trimEnd() + ',\n' + tsEntry + '\n' + after;

  writeFileSync(dataPath, newContent, 'utf-8');
  log(`src/data.ts に記事 "${article.title}" を追記しました`, 'SUCCESS');
}

function escapeTs(str) {
  if (typeof str !== 'string') return String(str || '');
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\${/g, '\\${');
}

function articleToTsString(a) {
  const faqsTs = Array.isArray(a.faqs)
    ? `[\n      ${a.faqs.map(f =>
        `{\n        question: \`${escapeTs(f.question)}\`,\n        answer: \`${escapeTs(f.answer)}\`\n      }`
      ).join(',\n      ')}\n    ]`
    : '[]';

  const summaryTs = Array.isArray(a.summaryKeyPoints)
    ? `[\n      ${a.summaryKeyPoints.map(s => `\`${escapeTs(s)}\``).join(',\n      ')}\n    ]`
    : '[]';

  const featuresTs = (a.features || []).map(f => `\`${escapeTs(f)}\``).join(', ');
  const prosTs = (a.pros || []).map(p => `\`${escapeTs(p)}\``).join(', ');
  const consTs = (a.cons || []).map(c => `\`${escapeTs(c)}\``).join(', ');

  return `  {
    id: '${a.id}',
    title: \`${escapeTs(a.title)}\`,
    originalUrl: '${a.originalUrl}',
    asin: '${a.asin}',
    category: '${a.category}',
    imageUrl: '${a.imageUrl}',
    starRating: ${a.starRating},
    introText: \`${escapeTs(a.introText)}\`,
    features: [${featuresTs}],
    pros: [${prosTs}],
    cons: [${consTs}],
    reviewBody: \`${escapeTs(a.reviewBody)}\`,
    ctaTitle: \`${escapeTs(a.ctaTitle)}\`,
    affiliateLink: '${a.affiliateLink}',
    createdAt: '${a.createdAt}',
    estimatedPV: ${a.estimatedPV},
    clicks: ${a.clicks},
    earnings: ${a.earnings},
    aiModelUsed: '${a.aiModelUsed}',
    summaryKeyPoints: ${summaryTs},
    faqs: ${faqsTs},
    reviewerName: \`${escapeTs(a.reviewerName || '')}\`,
    reviewerRole: \`${escapeTs(a.reviewerRole || '')}\`,
    verificationDays: ${a.verificationDays || 30},
    priceRange: \`${escapeTs(a.priceRange || '')}\`
  }`;
}

// ============================================================
// メイン処理
// ============================================================

async function main() {
  log('=== Amazon GO!! 自動記事生成 スタート ===');

  // 上限チェック（最大50記事）
  const count = getArticleCount();
  const MAX_ARTICLES = 50;
  if (count >= MAX_ARTICLES) {
    log(`記事数が上限(${MAX_ARTICLES})に達しています。最古の記事を削除してから追加します。`, 'WARN');
  }

  // カテゴリ選択（最も記事が少ないカテゴリを優先）
  const category = pickCategory();
  log(`選択カテゴリ: ${category.name} (${category.id})`);

  // 商品選択（未使用ASINを優先）
  const existingAsins = getExistingAsins();
  const product = pickProduct(category.id, existingAsins);
  log(`選択商品: ${product.name} (ASIN: ${product.asin})`);

  // ASIN重複チェック
  if (existingAsins.has(product.asin)) {
    log(`ASIN ${product.asin} は既に存在します。別の商品を選びます。`, 'WARN');
  }

  // プロンプト生成
  const prompt = buildPrompt(category, product);

  // LLM呼び出し（フォールバック付き）
  const { text, model } = await generateWithFallback(prompt);
  log(`使用モデル: ${model}`);

  // JSONパース & バリデーション
  let article;
  try {
    article = parseArticleJson(text);
    article.aiModelUsed = model;
    article = validateArticle(article);
  } catch (err) {
    log(`JSONパースエラー: ${err.message}`, 'ERROR');
    log(`生のレスポンス: ${text.slice(0, 500)}`, 'ERROR');
    process.exit(1);
  }

  log(`記事タイトル: ${article.title}`);

  // data.ts に追記
  appendArticleToDataTs(article);

  log('=== 自動記事生成 完了 ✅ ===', 'SUCCESS');
  console.log(JSON.stringify({ success: true, title: article.title, model, category: category.id }));
}

main().catch(err => {
  log(`致命的エラー: ${err.message}`, 'ERROR');
  console.error(err);
  process.exit(1);
});
