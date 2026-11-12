import { innerPage, shot, faqBlock } from '../layout.mjs';

const slug = 'responsive-checker';
const faq = [
  ['Is there a responsive checker that works without installing anything?', '<p>Chrome DevTools has a device mode built in (press <kbd>F12</kbd>, then <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>). It shows one device at a time. Online checkers load your site inside frames on their own website, which fails for many sites and cannot reach localhost. An extension like PocketView runs in your own browser, so it works with any URL.</p>'],
  ['Why does a site load blank in a responsive checker?', '<p>Many sites send headers that forbid being shown inside a frame, and checkers that use frames show a blank box. PocketView lifts those headers inside its own tab only, and reloads sites that try to break out of the frame in a contained mode, so far fewer sites come up blank.</p>'],
  ['How many sizes should I check?', '<p>At least four: a small phone (360 px), an average iPhone (390 to 402 px), a tablet in portrait (768 to 834 px) and a laptop (1280 px or more). Add a foldable if your audience uses them.</p>'],
];

export default {
  slug,
  title: 'Responsive Checker: Test Website on Mobile Free',
  description: 'Check how a website responds on real phone and tablet sizes. Paste a URL or use the Chrome extension, including localhost and staging.',
  priority: 0.8,
  crumbs: [['Responsive checker', '/' + slug]],
  faq,
  html: innerPage({
    slug,
    crumbs: [['Responsive checker', '/' + slug]],
    h1: 'Check your site on real device sizes',
    lead: 'A responsive check takes 30 seconds when the devices are already set up. Here is the quick method, a 10-point checklist, and how to test sites that are not live yet.',
    body: `
<h2>Check any website in 30 seconds</h2>
<ol class="steps">
  <li><strong>Open the page you want to check</strong><span> in Chrome: live, staging or localhost.</span></li>
  <li><strong>Click the PocketView icon.</strong><span> The page opens on an iPhone and an Android phone side by side.</span></li>
  <li><strong>Scroll from top to bottom.</strong><span> Sync scroll moves both devices together. Look for anything that overflows, overlaps or shrinks too small.</span></li>
  <li><strong>Swap in a tablet and a laptop.</strong><span> Use the Phone + Tablet or Mobile + Desktop quick set, then press <kbd>R</kbd> to check landscape.</span></li>
</ol>
${shot('hero', 'A website checked on an iPhone and a Galaxy phone in the PocketView responsive checker')}

<h2>What to look for: a 10-point responsive checklist</h2>
<ol>
  <li><strong>No sideways scroll.</strong> Nothing should be wider than the screen. Swipe left on each device; the page should not move.</li>
  <li><strong>Readable text.</strong> Body text at least 16 px on phones, line length under about 75 characters on large screens.</li>
  <li><strong>Tap targets.</strong> Buttons and links at least 44 to 48 px tall, with space between them.</li>
  <li><strong>Navigation.</strong> The menu opens, closes and fits on a 360 px screen.</li>
  <li><strong>Images.</strong> Not stretched, not cropped badly, and sharp on 3x screens.</li>
  <li><strong>Forms.</strong> Inputs fill the width, labels stay visible and the right keyboard type is set (<code>type="email"</code>, <code>inputmode="numeric"</code>).</li>
  <li><strong>Tables.</strong> Wide tables scroll inside their own box instead of pushing the page wider.</li>
  <li><strong>Sticky elements.</strong> Headers, cookie bars and chat buttons do not cover the content on short screens.</li>
  <li><strong>Landscape.</strong> Nothing breaks when the phone is turned sideways.</li>
  <li><strong>Dark mode.</strong> If your site supports it, check it with PocketView’s dark mode switch.</li>
</ol>

<h2>Testing localhost and staging sites</h2>
<p>Online checkers run on someone else’s server, so they cannot see <code>localhost</code> or a staging site behind a login. PocketView runs in your own browser, so it can. Start your dev server, open <code>http://localhost:3000</code> (or your port) and click the icon. Hot reload keeps working inside the devices.</p>
<div class="callout"><span class="dot"></span><p><strong>Tip:</strong> Copy setup link saves your devices and settings in a URL. Pin it next to your dev server and every check starts with the same screens.</p></div>

<h2>When to check on a real device</h2>
<p>A simulator gets layout right because it uses each phone’s real viewport, pixel ratio and user agent. It cannot reproduce a phone’s browser engine, its speed or its on-screen keyboard. Before a big launch, open the site on one real iPhone and one real Android phone, focusing on forms, video, and anything with fixed positioning.</p>

<h2>Questions</h2>
${faqBlock(faq)}
<p>Next: the <a href="/mobile-friendly-test">mobile friendly test checklist</a>, or see all widths at once in the <a href="/responsive-viewer">responsive viewer</a>.</p>
`,
  }),
};
