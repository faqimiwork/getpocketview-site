import { innerPage, faqBlock } from '../layout.mjs';
import { deviceTable, foldTable, ESTIMATE_NOTE } from '../data/tables.mjs';

const slug = 'viewport-sizes';
const faq = [
  ['What is the most common mobile viewport width?', '<p>Most phones in use today are between 360 and 440 CSS px wide. 360 px (many Android phones), 390 to 402 px (most iPhones) and 412 px (large Android phones) are the widths to design for first.</p>'],
  ['What is the iPhone 17 viewport size?', '<p>iPhone 17 and iPhone 17 Pro are 402 × 874 CSS px at a pixel ratio of 3. iPhone 17 Pro Max is 440 × 956, and iPhone Air is 420 × 912.</p>'],
  ['What is the difference between CSS pixels and screen pixels?', '<p>Screen pixels are the physical dots on the display. CSS pixels are what your layout uses. The pixel ratio links them: an iPhone 17 Pro is 402 CSS px wide and 402 × 3 = 1206 screen pixels wide.</p>'],
  ['Why does my phone report a different size?', '<p>Display zoom and text size settings change the viewport. An iPhone with Display Zoom set to Larger Text reports a narrower width. Browser bars and the keyboard also change the visible height.</p>'],
];

export default {
  slug,
  title: 'Phone Viewport Sizes 2026: iPhone, Galaxy, iPad',
  description: 'CSS viewport width, height and pixel ratio for every current iPhone, Galaxy, Pixel, foldable and iPad, updated for 2026. Sortable table.',
  priority: 0.8,
  type: 'article',
  crumbs: [['Viewport sizes', '/' + slug]],
  faq,
  script: `<script>
(function(){
  var f=document.getElementById('devfilter');if(!f)return;
  function run(){var q=f.value.trim().toLowerCase();document.querySelectorAll('.prose tbody tr').forEach(function(r){var hit=q&&r.textContent.toLowerCase().indexOf(q)>-1;r.classList.toggle('hit',!!hit);r.style.display=(!q||hit)?'':'none'})}
  var p=new URLSearchParams(location.search).get('q');if(p){f.value=p;run();}
  f.addEventListener('input',run);
})();
</script>`,
  html: innerPage({
    slug,
    crumbs: [['Viewport sizes', '/' + slug]],
    h1: 'Phone and tablet viewport sizes (2026)',
    lead: 'The CSS viewport of every device in PocketView: the width and height your media queries see, the pixel ratio, and the physical screen resolution. Click a column to sort.',
    body: `
<label class="filter"><span class="sr-only">Filter devices</span><svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="6" stroke="#adadac" stroke-width="1.5"/><path d="M13.5 13.5l4 4" stroke="#adadac" stroke-width="1.5" stroke-linecap="round"/></svg><input id="devfilter" type="search" placeholder="Filter by name or width, e.g. fold or 390"></label>
<h2>Phone viewport sizes 2026</h2>
<h3>iPhone</h3>
${deviceTable('iPhone', { sortable: true })}
<h3>Android</h3>
${deviceTable('Android', { sortable: true })}

<h2>Tablet and foldable viewport sizes</h2>
<h3>Tablets</h3>
${deviceTable('Tablet', { sortable: true })}
<h3>Foldables</h3>
${foldTable()}
${ESTIMATE_NOTE}
<h3>Laptops and desktop</h3>
${deviceTable('Desktop', { sortable: true })}

<h2>Most common widths to design for</h2>
<ul>
  <li><strong>360 px:</strong> the smallest common width; many Android phones.</li>
  <li><strong>375 px:</strong> iPhone SE and iPhone 13 mini.</li>
  <li><strong>390 to 402 px:</strong> most current iPhones.</li>
  <li><strong>412 to 440 px:</strong> large Android phones and Pro Max iPhones.</li>
  <li><strong>768 to 834 px:</strong> iPads in portrait.</li>
  <li><strong>1280 to 1440 px:</strong> most laptops.</li>
</ul>
<p>Design mobile first at 360 px, then add breakpoints where your content breaks, not at specific devices. The <a href="/responsive-viewer">responsive viewer</a> shows exactly where that happens.</p>

<h2>The viewport meta tag</h2>
<p>None of these sizes apply unless your page has this line in its <code>&lt;head&gt;</code>:</p>
<p><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code></p>
<p>Without it, phones pretend to be about 980 px wide and shrink your page to fit, which makes text tiny and breaks every mobile breakpoint.</p>

<h2>Questions</h2>
${faqBlock(faq)}
<p>Feel free to link to this table. To see these sizes with your own site inside, try the <a href="/mobile-simulator">mobile simulator</a>.</p>
`,
  }),
};
