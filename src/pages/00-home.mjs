import { SITE } from '../site.mjs';
import { installBtn, linkBtn, faqBlock, ctaBand, ICONS, dev, videoBlock, videoSchema } from '../layout.mjs';
import { DEVICES } from '../data/devices.mjs';

const faq = [
  ['Is PocketView free?', '<p>Yes. The free version shows 2 devices side by side, with every device, sync scroll, screenshots, recording and Mockup Studio included. A Pro plan with more devices at once will come later, with one clear price.</p>'],
  ['Does it work with localhost and staging sites?', '<p>Yes. Open <code>http://localhost:3000</code> or any staging URL the same way as a live site. Your own browser loads it, so password-protected staging sites work when you are signed in.</p>'],
  ['Is it a real iOS or Android simulator?', '<p>No, and we say so plainly. PocketView simulates screen size, pixel ratio, user agent, touch and display mode inside Chrome. Layout and responsive CSS behave like on the device, but Safari engine bugs only show on a real iPhone. Do a final check on a real phone before a big launch.</p>'],
  ['Does PocketView collect my data?', '<p>No. There are no accounts, no analytics and no servers. Settings stay in your browser. Read the <a href="/privacy">privacy policy</a>.</p>'],
  ['Which browsers does it support?', '<p>Google Chrome, plus browsers that install Chrome Web Store extensions, such as Microsoft Edge, Brave and Arc.</p>'],
  ['How is it different from Chrome DevTools device mode?', '<p>DevTools shows one device at a time inside the inspector. PocketView shows devices side by side with real frames, syncs scrolling between them, and adds foldables, recording, mockups and app mode. See <a href="/mobile-view-chrome">3 ways to get mobile view in Chrome</a>.</p>'],
];

// Hanging cards on the hero string.
const cards = [
  ['iPhone Duo', 'duo', 'Foldable · 466 × 678', 'New, official colours'],
  ['Galaxy Z Fold8', 'fold', 'Foldable · 933 × 704 open', 'Fold and unfold'],
  ['iPhone 17 Pro', 'phone', 'iPhone · 402 × 874', 'iOS user agent'],
  ['Galaxy S25 Ultra', 'android', 'Android · 412 × 891', 'Android user agent'],
  ['iPad Pro 11"', 'tablet', 'Tablet · 834 × 1194', 'Portrait and landscape'],
  ['Galaxy Z Flip8', 'flip', 'Foldable · 412 × 960 open', 'New, official colours'],
  ['MacBook Air 13"', 'laptop', 'Laptop · 1470 × 956', 'Side by side with phones'],
];
const card = ([t, k, c, m], i) => `<div class="dcard-wrap" style="--i:${i}"><div class="pin"></div><div class="dcard">
  <div class="dcard-img">${dev(k, '#0d1016', '#eafec2')}</div>
  <div class="dcard-text"><p class="dcard-title">${t}</p><p class="dcard-cat">${c}</p></div>
  <div class="dcard-meta"><i>${ICONS.check}</i>${m}</div></div></div>`;

const kindOf = (d) => (d.id === 'iphone-duo' ? 'duo' : d.group === 'Foldable' ? (d.id.includes('flip') ? 'flip' : 'fold') : d.group === 'Tablet' ? 'tablet' : d.group === 'Desktop' ? 'laptop' : d.id === 'iphone-se' ? 'se' : d.group === 'Android' ? 'android' : 'phone');
const real = DEVICES.filter((d) => d.id !== 'responsive');
const style = [['#0d1016', '#c6f432'], ['#c6f432', '#0d1016'], ['#ffffff', '#0d1016']];
const chip = (d, i) => { const [bg, fg] = style[i % 3]; return `<span class="mchip"><span class="box" style="background:${bg}">${dev(kindOf(d), fg, bg)}</span><span class="name">${d.name}</span></span>`; };
const rowOf = (list) => [1, 2, 3, 4].map(() => `<div class="marq-group">${list.map(chip).join('')}</div>`).join('');
const r1 = real.filter((_, i) => i % 3 === 0), r2 = real.filter((_, i) => i % 3 === 1), r3 = real.filter((_, i) => i % 3 === 2);

const groups = [
  ['Foldables', 'Foldable', '/foldable-simulator', ['duo', 'fold', 'flip']],
  ['iPhone', 'iPhone', '/iphone-simulator', ['phone', 'phone', 'se']],
  ['Android', 'Android', '/android-simulator', ['android', 'android', 'fold']],
  ['Tablets', 'Tablet', '/viewport-sizes', ['tablet', 'tablet', 'tablet']],
  ['Laptops', 'Desktop', '/viewport-sizes', ['laptop', 'laptop', 'laptop']],
  ['Responsive', 'Responsive', '/responsive-viewer', ['phone', 'tablet', 'laptop']],
];
const vrow = ([n, g, href, kinds]) => `<a class="vrow" href="${href}"><span class="n">${n}<small>${DEVICES.filter((d) => d.group === g).length}</small></span><span class="ics">${kinds.map((k) => `<span class="ic">${dev(k)}</span>`).join('')}</span></a>`;

const fcard = (icon, title, cat, desc, foot, href) => `<a class="fcard" href="${href}"><span class="ico">${icon}</span><span class="ft">${title}</span><span class="fc">${cat}</span><span class="fd">${desc}</span><span class="ff"><i>${ICONS.check}</i>${foot}</span></a>`;

const kinds = ['phone', 'android', 'duo', 'fold', 'flip', 'tablet', 'laptop', 'se'];
const N = 36, R = 200;
const sphere = Array.from({ length: N }, (_, i) => {
  const y = -1 + (i / (N - 1)) * 2, ry = Math.sqrt(1 - y * y), th = i * 2.399963229728653;
  const x = Math.cos(th) * ry, z = Math.sin(th) * ry;
  const rotY = (Math.atan2(x, z) * 180) / Math.PI, rotX = (Math.asin(y) * 180) / Math.PI;
  const k = kinds[i % kinds.length], lime = i % 4 === 0;
  return `<span class="sph" style="transform:rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg) translateZ(${R}px)">${dev(k, lime ? '#a6e01f' : '#0d1016', '#ffffff')}</span>`;
}).join('');

const works = [
  ['React', 'Next.js', 'Vue', 'Nuxt', 'Svelte', 'Astro', 'Angular', 'Remix'],
  ['WordPress', 'Shopify', 'Webflow', 'Framer', 'Wix', 'Squarespace', 'Ghost', 'Bubble'],
  ['localhost', 'staging', 'PWA', 'Tailwind CSS', 'Bootstrap', 'Laravel', 'Django', 'Rails'],
  ['Landing pages', 'Web apps', 'Online stores', 'Blogs', 'Dashboards', 'Email previews', 'Docs', 'Portfolios'],
];
const trow = (list, dir) => `<div class="trow ${dir}"><div class="trow-inner">${[...list, ...list].map((t) => `<span class="tag${t === 'localhost' || t === 'PWA' ? ' hot' : ''}">${t}</span>`).join('')}</div></div>`;

const promises = [
  ['No ads, ever. Not in the free version, not in Pro.', 'Promise 1 of 5 · Clean'],
  ['No tracking. No analytics, no servers, no account.', 'Promise 2 of 5 · Private'],
  ['No surprise tabs on install, no pushy uninstall page.', 'Promise 3 of 5 · Respectful'],
  ['Two devices side by side, free. Pro gets one clear price.', 'Promise 4 of 5 · Fair'],
  ['New phones added as they launch, foldables included.', 'Promise 5 of 5 · Current'],
];

export default {
  slug: '',
  title: 'PocketView: Free Mobile Simulator for Chrome',
  description: 'Test any website on iPhone, Android, foldables and iPad side by side. Free Chrome extension with sync scroll, video recording and mockups.',
  priority: 1.0,
  faq,
  schema: [
    {
      '@context': 'https://schema.org', '@type': 'SoftwareApplication',
      name: 'PocketView', applicationCategory: 'DeveloperApplication', operatingSystem: 'Chrome',
      description: `Mobile simulator and responsive viewer for Chrome with ${DEVICES.length} devices, foldables, sync scroll, recording and mockups.`,
      url: SITE.url, image: SITE.url + '/assets/icons/pocketview-icon-512.png',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    { '@context': 'https://schema.org', '@type': 'Organization', name: 'PocketView', url: SITE.url, logo: SITE.url + '/assets/icons/pocketview-icon-512.png' },
    videoSchema('explainer'),
  ],
  script: `<script>
(function(){
  var P=${JSON.stringify(promises)},i=0,box=document.querySelector('.quote-box');
  if(!box||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var t=box.querySelector('.quote-text'),b=box.querySelector('.quote-by'),paused=false;
  box.addEventListener('mouseenter',function(){paused=true});box.addEventListener('mouseleave',function(){paused=false});
  setInterval(function(){if(paused)return;box.classList.add('swap');setTimeout(function(){i=(i+1)%P.length;t.textContent=P[i][0];b.textContent=P[i][1];box.classList.remove('swap')},350)},4000);
})();
</script>`,
  html: `
<section class="hero">
  <div class="hero-content">
    <h1 class="hero-title">See your site on <br>every screen</h1>
    <p class="sub hero-sub">Test any website on iPhone, Galaxy, foldables and iPad, side by side, right inside Chrome. Free mobile simulator and responsive viewer.</p>
    <div class="hero-buttons">${linkBtn('/mobile-simulator', 'See how it works')}${installBtn('home-hero')}</div>
  </div>
  <div class="cards-layer" aria-hidden="true">
    <svg class="string" viewBox="0 0 1 1"><path d="M -2000 -227 L -787.71 250.02 Q 0 559.98 787.71 250.02 L 2000 -227"/></svg>
    <div class="cards-origin">${Array.from({ length: 16 }, (_, i) => card(cards[i % cards.length], i)).join('')}</div>
  </div>
</section>

<section class="watch" aria-labelledby="watch-h">
  <div class="glow g-lime" style="width:600px;height:600px;right:-260px;top:-120px"></div>
  <div class="wrap">
    <div class="watch-head reveal"><span class="eyebrow">Watch, 50 seconds</span><h2 id="watch-h" style="font-size:clamp(36px,4.6vw,64px)">See PocketView in action</h2><p class="sub center" style="max-width:560px">Two devices side by side, a foldable unfolding, and a mockup in one click. Real footage, no edits to the product.</p></div>
    ${videoBlock('explainer')}
  </div>
</section>

<section class="about">
  <div class="glow g-soft" style="width:691px;height:691px;left:-169px;top:457px"></div>
  <div class="glow g-lime" style="width:543px;height:543px;right:-250px;top:-246px"></div>
  <div class="wrap">
    <h2 class="about-title reveal">We help you see your site on <span class="ibox">${dev('phone', '#0d1016', '#c6f432')}</span> every phone, tablet and foldable, so you can ship <span class="ibox">${ICONS.check.replace('stroke="#0d1016"', 'stroke="#a6e01f"')}</span> with confidence.</h2>
    <div class="chips-grid">
      <div class="chips-row">
        <div class="fchip c-ink reveal d1"><span class="t">${DEVICES.length} devices</span><span class="i">${dev('duo', '#c6f432', '#0d1016')}</span></div>
        <div class="fchip c-lime reveal pop d2"><span class="t">Sync scroll</span><span class="i">${ICONS.sync}</span></div>
      </div>
      <div class="chips-row">
        <div class="fchip c-lime reveal pop d3"><span class="t">MP4 and GIF</span><span class="i">${ICONS.record}</span></div>
        <div class="fchip c-ink reveal d4"><span class="t">No tracking</span><span class="i">${ICONS.ban}</span></div>
      </div>
    </div>
  </div>
</section>

<section class="marq-section" aria-labelledby="devices-h">
  <div class="glow g-lime" style="width:691px;height:691px;left:-331px;top:-293px"></div>
  <div class="wrap center reveal" style="max-width:1000px">
    <h2 id="devices-h">The newest phones,<br>ready when you are</h2>
    <p class="sub center" style="max-width:540px">From iPhone 5 to iPhone 18 Pro Max, Galaxy S20 to S26 Ultra, Pixel 5 to Pixel 11 Pro and the newest foldables. Real viewports, real pixel ratios, real user agents.</p>
  </div>
  <div class="marqs reveal d1" aria-hidden="true">
    <div class="marq-row left">${rowOf(r1)}</div>
    <div class="marq-row right">${rowOf(r2)}</div>
    <div class="marq-row left" style="animation-duration:68s">${rowOf(r3)}</div>
  </div>
  <p class="center" style="margin-top:48px;position:relative;z-index:2"><a href="/viewport-sizes">See every viewport size</a></p>
</section>

<section class="finder" aria-labelledby="finder-h">
  <div class="glow g-soft" style="width:691px;height:691px;left:-183px;top:455px"></div>
  <div class="glow g-lime" style="width:543px;height:543px;right:-250px;top:-243px"></div>
  <div class="finder-head reveal">
    <h2 id="finder-h">Find any device in seconds</h2>
    <p class="sub center" style="max-width:500px">Search by name or by width. Try “fold”, “Pixel” or “390”.</p>
  </div>
  <div class="finder-body reveal d1">
    <form class="search-shell" action="/viewport-sizes" method="get" role="search">
      <div class="search-inner">
        <label><span class="sr-only">Search devices</span><input type="search" name="q" placeholder="Search ${DEVICES.length} devices..." autocomplete="off">${ICONS.search}</label>
        <span class="sdiv" aria-hidden="true"></span>
        <button class="btn btn-lime" type="submit"><span class="flip">Search</span></button>
      </div>
    </form>
    <div class="vmarq"><div class="vtrack">${[...groups, ...groups].map(vrow).join('')}</div></div>
  </div>
</section>

<section class="feat" aria-label="Features">
  <div class="feat-wrap">
    <div class="feat-row">
      <div class="feat-text reveal from-left"><h2>Built for developers</h2><p class="sub">The details that make a simulator worth trusting: the right user agent, the right media queries, the right URL.</p></div>
      <div class="feat-cards">
        <div class="reveal from-left d1">${fcard(ICONS.code, 'Real user agent', 'HTTP header and JavaScript', 'Each device sends its own user agent and Client Hints, so server-side and script-based mobile detection both fire.', 'Every device', '/mobile-simulator')}</div>
        <div class="reveal from-left d2">${fcard(ICONS.moon, 'Dark and app mode', 'Media query emulation', 'Force prefers-color-scheme dark and preview your PWA in standalone or fullscreen with its launch splash.', 'No system change', '/mobile-simulator')}</div>
        <div class="reveal from-left d3">${fcard(ICONS.ruler, 'Breakpoint ruler', 'Responsive viewer', 'Drag the responsive device to any width and watch sm, md, lg, xl and 2xl light up as you cross them.', 'Tailwind friendly', '/responsive-viewer')}</div>
      </div>
    </div>
    <div class="feat-row bottom">
      <div class="feat-cards">
        <div class="reveal from-right d3">${fcard(ICONS.record, 'Record MP4 and GIF', 'Demos and bug reports', 'Capture the device frames with a ripple on every tap. Crop is automatic; nothing leaves your computer.', 'One click', '/mockup-generator')}</div>
        <div class="reveal from-right d2">${fcard(ICONS.image, 'Mockup Studio', 'Post-ready images', 'Backgrounds, headline, tilt and export sizes for posts, Stories, the Chrome Web Store and link previews.', '7 canvas sizes', '/mockup-generator')}</div>
        <div class="reveal from-right d1">${fcard(ICONS.link, 'Share your setup', 'Team friendly', 'Copy a link with the exact devices, orientation and mode, so your team and clients see what you see.', 'Works with localhost', '/responsive-checker')}</div>
      </div>
      <div class="feat-text reveal from-right"><h2>Built to show your work</h2><p class="sub">Turn the screens you just tested into a demo, a mockup or a bug report without opening another app.</p><p style="margin-top:28px">${linkBtn('/mockup-generator', 'See Mockup Studio', 'btn btn-lime')}</p></div>
    </div>
  </div>
</section>

<section class="promise" aria-labelledby="promise-h">
  <div class="glow g-soft" style="width:691px;height:691px;left:-266px;top:487px"></div>
  <div class="glow g-lime" style="width:543px;height:543px;right:-200px;top:0"></div>
  <div class="promise-head reveal">
    <h2 id="promise-h">Promises we keep</h2>
    <p class="sub center" style="max-width:560px">We read what people dislike about other simulators. Here is what we do differently.</p>
  </div>
  <div class="promise-grid wrap">
    <div class="sphere-box reveal from-left" aria-hidden="true"><div class="sphere">${sphere}</div></div>
    <div class="promise-col reveal from-right d1">
      <div class="quote-box" aria-live="polite"><p class="quote-text">${promises[0][0]}</p><p class="quote-by">${promises[0][1]}</p></div>
      <div class="tags-box"><p class="sr-only">Works with any site you build, from React and WordPress to localhost and staging.</p>
        ${trow(works[0], 'left')}${trow(works[1], 'right')}${trow(works[2], 'left')}${trow(works[3], 'right')}
      </div>
    </div>
  </div>
</section>

<section class="faq-section" aria-labelledby="faq-h">
  <div class="glow g-soft" style="width:691px;height:691px;left:-256px;top:-306px"></div>
  <div class="glow g-lime" style="width:543px;height:543px;right:-200px;bottom:-256px"></div>
  <div class="faq-head reveal"><h2 id="faq-h">Everything you need to know</h2><p class="sub center" style="max-width:520px">Short answers about price, privacy and how accurate a simulator really is.</p></div>
  <div class="wrap reveal d1">${faqBlock(faq)}</div>
</section>

<div class="wrap">${ctaBand('home')}</div>
`,
};
