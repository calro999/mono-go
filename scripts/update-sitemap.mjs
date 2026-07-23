import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import https from 'https';

console.log('🌐 [Sitemap & IndexNow] XMLサイトマップの自動更新およびBing IndexNow送信を開始します...');

const domain = 'https://mono-go.vercel.app';
const currentDate = new Date().toISOString().split('T')[0];

const dataPath = resolve(process.cwd(), 'src', 'data.ts');
const content = readFileSync(dataPath, 'utf8');

// Extract all article IDs from data.ts
const articleIds = [];
const artMatches = content.matchAll(/id:\s*['"](art-.*?)['"]/g);
for (const m of artMatches) {
  articleIds.push(m[1]);
}

// Extract all comparison IDs from data.ts
const comparisons = [
  'anessa-vs-biore-uv',
  'deonatulle-vs-8x4men',
  'primavista-vs-larocheposay',
  'concool-vs-nonio',
  'lipmonster-vs-meltylip',
  'ihada-vs-vtcica',
  'melanocc-vs-kanebo',
  'andhoney-vs-refa',
  'gatsby-ice-vs-biore-hiyashi',
  'romand-vs-kate'
];

const blogs = [
  'blog-men-summer-2026',
  'blog-women-summer-2026'
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${domain}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Blog Index -->
  <url>
    <loc>${domain}/blogs</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
`;

// Add VS Comparisons
comparisons.forEach((comp) => {
  xml += `  <url>
    <loc>${domain}/compare/${comp}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>\n`;
});

// Add Special Blog Posts
blogs.forEach((blog) => {
  xml += `  <url>
    <loc>${domain}/blogs/${blog}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>\n`;
});

// Add All Product Articles
articleIds.forEach((art) => {
  xml += `  <url>
    <loc>${domain}/articles/${art}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>\n`;
});

xml += `</urlset>`;

const outputPath = resolve(process.cwd(), 'public', 'sitemap.xml');
writeFileSync(outputPath, xml, 'utf8');
console.log(`✅ [Sitemap Updated] sitemap.xml を全 ${articleIds.length + comparisons.length + blogs.length + 2} URL で最新化しました。`);

// Send IndexNow Ping
const host = 'mono-go.vercel.app';
const apiKey = '68c4a5f456104e76a6e97576a953e959';
const keyLocation = `https://${host}/${apiKey}.txt`;

const postData = JSON.stringify({
  host: host,
  key: apiKey,
  keyLocation: keyLocation,
  urlList: [`https://${host}/`, ...articleIds.slice(-5).map(id => `https://${host}/articles/${id}`)]
});

const req = https.request({
  hostname: 'api.indexnow.org',
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(postData)
  }
}, (res) => {
  console.log(`📡 [IndexNow Response] Status Code: ${res.statusCode} (Bing/Copilot 登録受付完了)`);
});

req.on('error', (e) => {
  console.warn(`⚠️ [IndexNow Warning] ${e.message}`);
});

req.write(postData);
req.end();
