import { innerPage, shot, faqBlock } from '../layout.mjs';
import { deviceTable, ESTIMATE_NOTE } from '../data/tables.mjs';

const slug = 'iphone-simulator';
const faq = [
  ['Can I run Safari on Windows?', '<p>No. Apple stopped making Safari for Windows in 2012. On Windows you can preview iPhone layouts in Chrome with an iPhone simulator like PocketView, but to test Safari’s own engine you need a Mac (Xcode’s Simulator), a real iPhone, or a cloud device service.</p>'],
  ['Is there a free iOS simulator online?', '<p>Cloud services stream real iPhones, usually with a free trial and then a monthly price. For everyday layout checks, PocketView is free and runs in your own browser, so it also works on localhost.</p>'],
  ['Which iPhone sizes matter most?', '<p>Most current iPhones are 390 to 402 px wide; the Pro Max and Plus models are 430 to 440 px. If your layout works at 375, 390, 402 and 440 px, it will work on almost every iPhone in use.</p>'],
  ['Does PocketView show the Dynamic Island and Safari bars?', '<p>Yes. iPhone frames show the Dynamic Island, the notch or the Home button depending on the model, an iOS status bar, and Safari’s address bar when browser bars are on.</p>'],
];

export default {
  slug,
  title: 'iPhone Simulator for Chrome: iPhone 17 to SE',
  description: 'Preview websites on iPhone 17 Pro Max, iPhone Air, 16, 15 and SE frames with Safari bars and the iOS user agent. Free Chrome extension.',
  priority: 0.8,
  crumbs: [['iPhone simulator', '/' + slug]],
  faq,
  html: innerPage({
    slug,
    crumbs: [['iPhone simulator', '/' + slug]],
    h1: 'iPhone simulator for your website',
    lead: 'See your site on 35 iPhones, from iPhone 18 Pro Max back to iPhone 5, right in Chrome on Windows, Mac or Linux. No Mac or Xcode needed for layout checks.',
    heroShot: shot('iphone', 'iPhone simulator in Chrome showing an iPhone 17 Pro Max and an iPhone SE', { eager: true, cls: 'hero-shot' }),
    body: `
<h2>Test your site on iPhone without a Mac</h2>
<p>Apple’s own simulator only runs on a Mac, inside Xcode. If you build on Windows or Linux, or just want a faster check, PocketView shows your website inside accurate iPhone frames in Chrome. Each iPhone uses its real CSS viewport, pixel ratio and iOS user agent, so your responsive CSS and any iPhone detection behave as they would on the phone.</p>

<h2>iPhone models included</h2>
<p>Sizes are CSS pixels in portrait, the numbers your media queries see.</p>
${deviceTable('iPhone')}
${ESTIMATE_NOTE}
<p>Plus <strong>iPhone Duo</strong> on the <a href="/foldable-simulator">foldable simulator</a> page, and iPads on the <a href="/viewport-sizes">viewport sizes</a> page.</p>

<h2>Safari bars, Dynamic Island and the iOS user agent</h2>
<ul>
  <li><strong>Real frames:</strong> Dynamic Island on iPhone 14 Pro and later, the notch on older models, the Home button on iPhone SE.</li>
  <li><strong>Status bar and Safari bar:</strong> turn browser bars on to see how much space Safari’s address bar takes from your first screen.</li>
  <li><strong>iOS user agent:</strong> sent in the HTTP header and JavaScript, so server-side redirects and scripts that look for “iPhone” both work.</li>
  <li><strong>Frame colours:</strong> pick a finish for screenshots and mockups that match the phone your client owns.</li>
</ul>

<h2>What an iPhone simulator in Chrome cannot do</h2>
<p>Every browser on iPhone uses Apple’s WebKit engine. PocketView runs on Chrome’s Blink engine, so it shows the iPhone layout, not WebKit’s rendering. Things to double-check on a real iPhone or in Xcode’s Simulator:</p>
<ul>
  <li><code>100vh</code> and the moving Safari toolbar (use <code>100dvh</code> or <code>100svh</code>)</li>
  <li>Date and select inputs, which use native iOS pickers</li>
  <li>Autoplay rules for video and audio</li>
  <li>Very new CSS features that WebKit has not shipped yet</li>
</ul>
<p>For everything else (layout, breakpoints, images, fonts, navigation) the simulator is the fastest way to check.</p>

<h2>Questions</h2>
${faqBlock(faq)}
<p>Testing Android too? See the <a href="/android-simulator">Android simulator</a>, or put an iPhone and a Galaxy side by side in the <a href="/responsive-viewer">responsive viewer</a>.</p>
`,
  }),
};
