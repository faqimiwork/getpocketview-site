// PocketView website build. No dependencies: run `node build.mjs`, output goes to dist/.
import { readdir, rm, mkdir, writeFile, cp } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';
import { SITE } from './src/site.mjs';
import { render } from './src/layout.mjs';

const ROOT = new URL('.', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');
const today = new Date().toISOString().slice(0, 10);

async function load(dir) {
  const files = (await readdir(join(ROOT, dir))).filter((f) => f.endsWith('.mjs')).sort();
  const out = [];
  for (const f of files) {
    const mod = await import(pathToFileURL(join(ROOT, dir, f)).href);
    out.push(mod.default);
  }
  return out;
}

const problems = [];
function check(p, html) {
  const where = p.slug || 'home';
  if (p.title.length > 60) problems.push(`${where}: title is ${p.title.length} chars (max 60)`);
  if (p.description.length < 120 || p.description.length > 160) problems.push(`${where}: description is ${p.description.length} chars (aim 140 to 155)`);
  if (html.includes('—')) problems.push(`${where}: contains an em dash`);
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) problems.push(`${where}: needs exactly one h1`);
}

await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });
await cp(join(ROOT, 'public'), DIST, { recursive: true });

const pages = await load('src/pages');
const posts = (await load('src/blog')).filter((p) => !p.draft);
const all = [...pages, ...posts.map((p) => ({ ...p, slug: `blog/${p.slug}` }))];

// Blog posts list is handed to the blog index page.
globalThis.__POSTS__ = posts.sort((a, b) => (a.date < b.date ? 1 : -1));

const seen = new Set();
for (const p of all) {
  const body = typeof p.html === 'function' ? p.html({ posts: globalThis.__POSTS__ }) : p.html;
  const html = render(p, body);
  check(p, html);
  if (seen.has(p.title)) problems.push(`${p.slug}: duplicate title`);
  seen.add(p.title);
  const file = p.slug === '' ? 'index.html' : p.slug === '404' ? '404.html' : `${p.slug}.html`;
  await mkdir(join(DIST, file, '..'), { recursive: true });
  await writeFile(join(DIST, file), html);
}

// sitemap.xml, robots.txt, web manifest
const indexable = all.filter((p) => p.slug !== '404' && !p.noindex);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map((p) => `  <url><loc>${SITE.url}/${p.slug}</loc><lastmod>${p.updated || p.date || today}</lastmod><priority>${p.priority ?? 0.6}</priority></url>`)
  .join('\n')
  .replace(`${SITE.url}/</loc>`, `${SITE.url}/</loc>`)}
</urlset>
`;
await writeFile(join(DIST, 'sitemap.xml'), sitemap);
await writeFile(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
await writeFile(join(DIST, 'site.webmanifest'), JSON.stringify({
  name: 'PocketView', short_name: 'PocketView', start_url: '/', display: 'standalone',
  background_color: '#0d1016', theme_color: '#0d1016',
  icons: [
    { src: '/assets/icons/pocketview-icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/assets/icons/pocketview-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}, null, 2));

console.log(`Built ${all.length} pages into dist/ (${indexable.length} in the sitemap).`);
if (problems.length) {
  console.log('\nChecks:\n- ' + problems.join('\n- '));
  if (problems.some((p) => p.includes('em dash') || p.includes('h1'))) process.exit(1);
}
