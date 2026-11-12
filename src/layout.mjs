import { SITE, NAV, FOOTER } from './site.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export { esc };

export const ICONS = {
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="#0d1016" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  search: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="6" stroke="#adadac" stroke-width="1.5"/><path d="M13.5 13.5l4 4" stroke="#adadac" stroke-width="1.5" stroke-linecap="round"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  sync: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3L20 9M20 12a8 8 0 0 1-14 5.3L4 15"/><path d="M20 4v5h-5M4 20v-5h5"/></svg>',
  record: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.5" fill="currentColor"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 9"/></svg>',
  app: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10 6h4"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
  ruler: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="7" width="19" height="10" rx="2"/><path d="M7 7v4M11 7v3M15 7v4M19 7v3"/></svg>',
  ban: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/></svg>',
};

// Device silhouettes, drawn for the site (no third-party logos).
export function dev(kind, fg = '#0d1016', bg = '#fbfbfa') {
  const s = (vb, body) => `<svg viewBox="${vb}" aria-hidden="true">${body}</svg>`;
  switch (kind) {
    case 'duo': return s('0 0 56 72', `<rect x="1" y="1" width="54" height="70" rx="8" fill="${fg}"/><rect x="5" y="5" width="36" height="62" rx="5" fill="${bg}"/><circle cx="48" cy="11" r="3" fill="${bg}"/><rect x="46.5" y="28" width="3" height="14" rx="1.5" fill="${bg}"/>`);
    case 'fold': return s('0 0 84 64', `<rect x="1" y="1" width="82" height="62" rx="6" fill="${fg}"/><rect x="5" y="5" width="74" height="54" rx="3" fill="${bg}"/><rect x="41.5" y="5" width="1" height="54" fill="${fg}" opacity=".18"/><circle cx="62" cy="10" r="1.6" fill="${fg}"/>`);
    case 'flip': return s('0 0 40 76', `<rect x="1" y="1" width="38" height="74" rx="9" fill="${fg}"/><rect x="4.5" y="4.5" width="31" height="67" rx="6" fill="${bg}"/><rect x="4.5" y="37.5" width="31" height="1" fill="${fg}" opacity=".2"/><circle cx="20" cy="9" r="1.8" fill="${fg}"/>`);
    case 'tablet': return s('0 0 60 80', `<rect x="1" y="1" width="58" height="78" rx="8" fill="${fg}"/><rect x="5" y="5" width="50" height="70" rx="4" fill="${bg}"/>`);
    case 'laptop': return s('0 0 88 58', `<rect x="9" y="1" width="70" height="46" rx="4" fill="${fg}"/><rect x="13" y="5" width="62" height="38" rx="2" fill="${bg}"/><rect x="1" y="48" width="86" height="9" rx="3" fill="${fg}"/>`);
    case 'android': return s('0 0 40 76', `<rect x="1" y="1" width="38" height="74" rx="7" fill="${fg}"/><rect x="4" y="4" width="32" height="68" rx="4.5" fill="${bg}"/><circle cx="20" cy="8.5" r="1.8" fill="${fg}"/>`);
    case 'se': return s('0 0 40 76', `<rect x="1" y="1" width="38" height="74" rx="8" fill="${fg}"/><rect x="4" y="11" width="32" height="54" rx="1" fill="${bg}"/><circle cx="20" cy="70" r="3" fill="none" stroke="${bg}" stroke-width="1.4"/>`);
    default: return s('0 0 40 76', `<rect x="1" y="1" width="38" height="74" rx="9" fill="${fg}"/><rect x="4" y="4" width="32" height="68" rx="6.5" fill="${bg}"/><rect x="14.5" y="7.5" width="11" height="3.4" rx="1.7" fill="${fg}"/>`);
  }
}


// Product videos (files in public/assets/video). Plays muted when scrolled into view.
export const VIDEOS = {
  explainer: { name: 'PocketView in 50 seconds', description: 'See a website on two devices side by side, switch to a foldable and unfold it, and turn the screens into a mockup with PocketView, the free mobile simulator for Chrome.', duration: 'PT51S' },
  devices: { name: 'Test on 36 devices with PocketView', description: 'Open the device picker, search for foldables, swap a Galaxy Z Fold8 in and unfold it, then preview the site as an installed app.', duration: 'PT33S' },
  mockup: { name: 'Make a mockup in one click with PocketView', description: 'Open Mockup Studio, pick a background and tilt the devices to turn a live website into a post-ready mockup.', duration: 'PT20S' },
};
export function videoBlock(key, caption = '') {
  const v = VIDEOS[key];
  return `<figure class="video reveal"><video class="pv-video" src="/assets/video/pocketview-${key}.mp4" poster="/assets/video/pocketview-${key}-poster.jpg" width="1280" height="720" muted loop playsinline controls preload="none" aria-label="${esc(v.name)}"></video>${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
}
export function videoSchema(key) {
  const v = VIDEOS[key];
  return { '@context': 'https://schema.org', '@type': 'VideoObject', name: v.name, description: v.description,
    thumbnailUrl: `${SITE.url}/assets/video/pocketview-${key}-poster.jpg`, contentUrl: `${SITE.url}/assets/video/pocketview-${key}.mp4`,
    uploadDate: '2026-11-13', duration: v.duration };
}

export function storeHref(medium) {
  const sep = SITE.storeUrl.includes('?') ? '&' : '?';
  return `${SITE.storeUrl}${sep}utm_source=website&utm_medium=${encodeURIComponent(medium || 'home')}`;
}

export function installBtn(medium, label = 'Add to Chrome, it\u2019s free', cls = 'btn btn-dark') {
  return `<a class="${cls}" href="${storeHref(medium)}" rel="noopener" data-install><span class="flip">${esc(label)}</span></a>`;
}

export function linkBtn(href, label, cls = 'btn btn-light') {
  return `<a class="${cls}" href="${href}"><span class="flip">${esc(label)}</span></a>`;
}

export function shot(name, alt, { caption = '', eager = false, cls = 'shot' } = {}) {
  const small = ['hero', 'sync', 'devices', 'appmode', 'mockup'].includes(name);
  const srcset = small ? ` srcset="/assets/img/${name}-640.webp 640w, /assets/img/${name}.webp 1280w" sizes="(max-width: 1024px) 100vw, 600px"` : '';
  const img = `<img class="${cls}" src="/assets/img/${name}.webp"${srcset} width="1280" height="800" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}>`;
  return caption ? `<figure>${img}<figcaption>${caption}</figcaption></figure>` : img;
}

export function faqBlock(faq) {
  if (!faq || !faq.length) return '';
  return `<div class="faq">${faq.map(([q, a]) => `<details><summary><span>${esc(q)}</span><span class="plus" aria-hidden="true"></span></summary><div class="ans">${a}</div></details>`).join('')}</div>`;
}

export function ctaBand(medium, title = 'See your site on every screen.', text = 'Free Chrome extension. No account, no ads, no tracking.') {
  return `<aside class="cta-band reveal" aria-label="Install PocketView">
  <img src="/assets/img/pocketview-icon.svg" alt="" width="92" height="92" loading="lazy">
  <div><h2>${esc(title)}</h2><p>${esc(text)}</p></div>
  ${installBtn(medium + '-band', 'Add PocketView to Chrome', 'btn')}
</aside>`;
}

const stripTags = (h) => h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

function menuHtml(current) {
  return NAV.map((n) => {
    if (n.children) {
      return `<details><summary>${esc(n.label)}</summary><div>${n.children
        .map((c) => `<a href="${c.href}"${c.href === current ? ' aria-current="page"' : ''}>${esc(c.label)}<small>${esc(c.note)}</small></a>`)
        .join('')}</div></details>`;
    }
    return `<a href="${n.href}"${n.href === current ? ' aria-current="page"' : ''}>${esc(n.label)}</a>`;
  }).join('');
}

function footerHtml() {
  return `<footer class="site-foot"><div class="wrap" style="width:100%">
  <div class="foot-top">
    <div class="foot-tag"><img src="/assets/img/pocketview-logo-dark.svg" alt="PocketView" width="160" height="32" loading="lazy">
      <p>A free mobile simulator and responsive viewer for Chrome. See your site on every phone, tablet and foldable, then record it or turn it into a mockup.</p></div>
    <div class="foot-cols">
    ${FOOTER.map((c) => `<div><h4>${esc(c.title)}</h4><ul>${c.links.map(([l, h]) => `<li><a href="${h}">${esc(l)}</a></li>`).join('')}</ul></div>`).join('')}
    </div>
  </div>
  <div class="foot-bottom"><div class="foot-fine">
    <span>Contact: <a href="mailto:${SITE.email}">${SITE.email}</a></span>
    <span>&copy; ${SITE.year} PocketView. Made in Malaysia. No ads, no tracking.</span>
    <span>Chrome is a trademark of Google LLC. Device names belong to their makers.</span>
  </div></div>
</div>
<p class="massive" aria-hidden="true">Pocket<span>View</span></p>
</footer>`;
}

// meta: { slug, title, description, faq?, schema?, crumbs?, ogImage?, type? }
export function render(meta, body) {
  const path = meta.slug === '' ? '/' : `/${meta.slug}`;
  const canonical = SITE.url + path;
  const og = SITE.url + (meta.ogImage || SITE.ogImage);
  const schemas = [...(meta.schema || [])];
  if (meta.faq && meta.faq.length) {
    schemas.push({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: meta.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: stripTags(a) } })),
    });
  }
  if (meta.crumbs && meta.crumbs.length) {
    schemas.push({
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [['Home', '/'], ...meta.crumbs].map(([name, href], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE.url + href })),
    });
  }
  const ld = schemas.map((s) => `<script type="application/ld+json">${JSON.stringify(s).replace(/</g, '\\u003c')}</script>`).join('\n');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.description)}">
<link rel="canonical" href="${canonical}">
${meta.noindex ? '<meta name="robots" content="noindex">\n' : ''}<meta name="theme-color" content="#feffff">
<link rel="preload" href="/assets/fonts/hubot-sans.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/inter-tight.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css">
<link rel="icon" href="/assets/icons/favicon.ico" sizes="any">
<link rel="icon" href="/assets/icons/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon-180.png">
<link rel="manifest" href="/site.webmanifest">
<meta property="og:type" content="${meta.type || 'website'}">
<meta property="og:site_name" content="PocketView">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="PocketView mobile simulator showing a website on a tablet and a phone">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(meta.title)}">
<meta name="twitter:description" content="${esc(meta.description)}">
<meta name="twitter:image" content="${og}">
${ld}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="navbar">
  <div class="nav-left">
    <a class="logomark" href="/" aria-label="PocketView home"><img src="/assets/img/pocketview-icon.svg" alt="" width="34" height="34"></a>
    <a class="brandword" href="/">PocketView</a>
    <span class="vdiv" aria-hidden="true"></span>
  </div>
  <nav class="menu" id="menu" aria-label="Main">${menuHtml(path)}</nav>
  <div class="nav-right">
    <a class="nav-link-plain" href="/viewport-sizes">Viewport sizes</a>
    ${installBtn(`${meta.slug || 'home'}-header`, 'Add to Chrome', 'btn btn-dark btn-sm')}
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Open menu">${ICONS.menu}</button>
  </div>
</header>
<main id="main">
${body}
</main>
${footerHtml()}
<script>
(function(){
  var b=document.querySelector('.menu-btn'),m=document.getElementById('menu');
  if(b){b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)});}
  var ds=document.querySelectorAll('.menu details');
  ds.forEach(function(d){d.addEventListener('toggle',function(){if(d.open)ds.forEach(function(x){if(x!==d)x.open=false})})});
  document.addEventListener('click',function(e){if(!e.target.closest('.menu details'))ds.forEach(function(x){x.open=false})});
  var io=('IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15}):null;
  document.querySelectorAll('.reveal').forEach(function(el){io?io.observe(el):el.classList.add('in')});
  var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if('IntersectionObserver' in window&&!rm){var vo=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;if(e.isIntersecting){v.preload='auto';var pr=v.play();if(pr&&pr.catch)pr.catch(function(){})}else{v.pause()}})},{threshold:.4});document.querySelectorAll('video.pv-video').forEach(function(v){vo.observe(v)});}
  document.querySelectorAll('table[data-sort]').forEach(function(t){
    t.querySelectorAll('th button').forEach(function(btn,i){btn.addEventListener('click',function(){
      var tb=t.tBodies[0],rows=[].slice.call(tb.rows),asc=btn.dataset.dir!=='asc';btn.dataset.dir=asc?'asc':'desc';
      rows.sort(function(a,b){var x=a.cells[i].dataset.v||a.cells[i].textContent,y=b.cells[i].dataset.v||b.cells[i].textContent,nx=parseFloat(x),ny=parseFloat(y);
        var r=(!isNaN(nx)&&!isNaN(ny))?nx-ny:x.localeCompare(y);return asc?r:-r});
      rows.forEach(function(r){tb.appendChild(r)});
    })});
  });
})();
</script>
${meta.script || ''}
</body>
</html>
`;
}

// Inner pages: hero with crumbs, H1, lead, CTA, then prose, FAQ and the CTA band.
export function innerPage({ slug, crumbs, h1, lead, heroShot, body, faq }) {
  const crumbHtml = `<nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a>${crumbs
    .map(([l, h], i) => (i === crumbs.length - 1 ? ` / <span aria-current="page">${esc(l)}</span>` : ` / <a href="${h}">${esc(l)}</a>`))
    .join('')}</nav>`;
  const intro = `<div>
      <h1>${h1}</h1>
      <p class="sub">${lead}</p>
      <div class="actions">${installBtn(slug + '-hero')}</div>
      <p class="cta-note">Free for Chrome, Edge and Brave. No account needed.</p>
    </div>`;
  return `<section class="page-hero"><div class="glow g-lime" style="width:540px;height:540px;right:-220px;top:-200px"></div><div class="wrap">
  ${crumbHtml}
  ${heroShot ? `<div class="hero-grid">${intro}<div class="reveal">${heroShot}</div></div>` : intro}
</div></section>
<div class="wrap"><article class="prose read">
${body}
${faq && faq.length ? `<h2>Questions</h2>${faqBlock(faq)}` : ''}
</article>
${ctaBand(slug)}
</div>`;
}
