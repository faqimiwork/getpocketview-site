import { videoBlock, videoSchema, innerPage, shot, faqBlock } from '../layout.mjs';
import { foldTable, ESTIMATE_NOTE } from '../data/tables.mjs';

const slug = 'foldable-simulator';
const faq = [
  ['What is the viewport of the Galaxy Z Fold8?', '<p>In PocketView, the Galaxy Z Fold8 uses 475 × 751 CSS px on the cover screen and 933 × 704 CSS px unfolded, at a pixel ratio of 2.625. These are estimates from the panel resolution; check the exact value on a real device once you have one.</p>'],
  ['Do I need special CSS for foldables?', '<p>Usually not. A well-built responsive layout already handles the cover screen like a narrow phone and the inner screen like a small tablet. Check that nothing assumes “phones are always tall”: open book-style foldables are almost square or wider than tall, so <code>orientation: landscape</code> can be true on a device held upright.</p>'],
  ['How do I fold and unfold a device in PocketView?', '<p>Each foldable has a Fold switch in its label bar above the frame. Click it to open or close the device and the screen changes to the new size, just as it does when you open a real foldable.</p>'],
];

export default {
  slug,
  title: 'Foldable Simulator: Galaxy Z Fold8, iPhone Duo',
  description: 'Preview your site folded and unfolded on Galaxy Z Fold8, Z Flip8, Xiaomi 18 Fold and iPhone Duo, in their official colours. Free for Chrome.',
  priority: 0.8,
  crumbs: [['Foldable simulator', '/' + slug]],
  faq,
  schema: [videoSchema('devices')],
  html: innerPage({
    slug,
    crumbs: [['Foldable simulator', '/' + slug]],
    h1: 'Test your site on foldables',
    lead: 'Folding phones are the fastest-changing screens on the market. PocketView includes the newest ones, folded and unfolded, in their official colours.',
    heroShot: shot('foldable', 'Foldable simulator showing a Galaxy Z Fold8 unfolded and a Galaxy Z Flip8 open', { eager: true, cls: 'hero-shot' }),
    body: `
<h2>Galaxy Z Fold8, Z Fold8 Ultra, Z Flip8, Xiaomi 18 Fold and iPhone Duo</h2>
<p>Each foldable has two screens that your website has to work on: a cover screen when it is closed and a larger inner screen when it is open. Here are the sizes PocketView uses.</p>
${foldTable()}
${ESTIMATE_NOTE}

${videoBlock('devices', 'Swap in the Galaxy Z Fold8 and unfold it, filmed in PocketView.')}
<h2>Fold and unfold: what changes for your layout</h2>
<ul>
  <li><strong>Book-style foldables</strong> (Galaxy Z Fold8, Xiaomi 18 Fold) open to a wide, almost square screen of 860 to 954 px. Your tablet breakpoint (<code>md</code>, 768 px) kicks in, so check that a two-column layout really fits.</li>
  <li><strong>Passport-style iPhone Duo</strong> is wide even when closed, with a control column beside the screen. Its cover screen sits between a phone and a small tablet.</li>
  <li><strong>Flip phones</strong> (Galaxy Z Flip8) open to a normal tall phone, but the small cover screen can also run websites. Check that your header and cookie banner do not fill it.</li>
  <li>Unfolding resizes the page while it is open. Make sure your site handles a <code>resize</code> without losing form input or scroll position.</li>
</ul>

<h2>CSS for foldables</h2>
<p>Most foldable support comes from ordinary responsive CSS. A few extra tools help:</p>
<ul>
  <li><strong>Aspect ratio queries:</strong> <code>@media (min-aspect-ratio: 4/5)</code> catches open book-style foldables that are wider than a phone but not as wide as a tablet in landscape.</li>
  <li><strong>Container queries:</strong> let a card or sidebar adapt to its own width, which works on every screen shape.</li>
  <li><strong>Viewport segments:</strong> browsers are adding <code>@media (horizontal-viewport-segments: 2)</code> and the <code>env(viewport-segment-*)</code> variables for content that should avoid the fold. Check support before relying on them, and treat them as an extra, not a requirement.</li>
</ul>

<h2>Questions</h2>
${faqBlock(faq)}
<p>See every device size on the <a href="/viewport-sizes">viewport sizes</a> page, or compare foldables with regular phones in the <a href="/responsive-viewer">responsive viewer</a>.</p>
`,
  }),
};
