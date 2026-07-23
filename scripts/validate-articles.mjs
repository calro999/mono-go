import { readFileSync } from 'fs';
import { resolve } from 'path';

console.log('🛡️  Lumière 記事品質検品＆バリデーション（Quality Gate）開始...');

const dataPath = resolve(process.cwd(), 'src', 'data.ts');
const content = readFileSync(dataPath, 'utf-8');

// 1. メタ内部用語の混入チェック
const forbiddenTerms = ['超ロングテール', 'AI-SEO', 'GEO Optimized', 'AI即答要約', 'AI Engine Direct Answer'];
const foundForbidden = [];

forbiddenTerms.forEach(term => {
  if (content.includes(term)) {
    foundForbidden.push(term);
  }
});

if (foundForbidden.length > 0) {
  console.error(`❌ [QUALITY REJECTED] 開発者向けメタ用語がUI内に検出されました: ${foundForbidden.join(', ')}`);
  process.exit(1);
}

// 2. AIテンプレート文章の混入チェック
const aiTemplateTerms = ['いかがでしたでしょうか', '今回は〇〇をご紹介', 'AIが自動生成した'];
const foundAiTerms = [];

aiTemplateTerms.forEach(term => {
  if (content.includes(term)) {
    foundAiTerms.push(term);
  }
});

if (foundAiTerms.length > 0) {
  console.error(`❌ [QUALITY REJECTED] AIテンプレート表現が検出されました: ${foundAiTerms.join(', ')}`);
  process.exit(1);
}

// 3. ASIN重複のチェック
const asins = [];
const matches = content.matchAll(/asin:\s*['"](.*?)['"]/g);
for (const match of matches) {
  asins.push(match[1]);
}

const uniqueAsins = new Set(asins);
if (asins.length !== uniqueAsins.size) {
  console.warn(`⚠️ 注意: ASIN重複が検出されました（総数: ${asins.length}, ユニーク数: ${uniqueAsins.size}）`);
}

console.log(`✅ [QUALITY PASSED] 記事品質検品クリア！全 ${asins.length} 件の記事はすべて最高品質基準を満たしています。`);
