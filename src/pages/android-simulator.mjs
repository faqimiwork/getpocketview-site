import { innerPage, shot, faqBlock } from '../layout.mjs';
import { deviceTable, ESTIMATE_NOTE } from '../data/tables.mjs';

const slug = 'android-simulator';
const faq = [
  ['Is there an Android emulator Chrome extension?', '<p>Extensions cannot run Android itself. What they can do is show websites at Android sizes with the Android user agent, which is what PocketView does. To run Android apps, use Android Studio’s emulator.</p>'],
  ['Does PocketView run Android apps?', '<p>No. PocketView is for websites and web apps, including PWAs. It shows them the way Chrome for Android would lay them out.</p>'],
  ['What is the most common Android viewport width?', '<p>360 px and 412 px are the two most common widths on Android phones. Test both, plus 393 px for many recent mid-range phones.</p>'],
];

export default {
  slug,
  title: 'Android Simulator for Chrome: Galaxy and Pixel',
  description: 'Test websites on Galaxy S25 Ultra, Z Fold8, Z Flip8 and Pixel frames with the Android user agent and Chrome bars. Free Chrome extension.',
  priority: 0.8,
  crumbs: [['Android simulator', '/' + slug]],
  faq,
  html: innerPage({
    slug,
    crumbs: [['Android simulator', '/' + slug]],
    h1: 'Android devices, right in Chrome',
    lead: 'Preview your website on Galaxy, Pixel and other Android phones side by side, with the Android user agent and Chrome’s mobile bars. No emulator to install.',
    heroShot: shot('android', 'Android simulator showing a website on a Galaxy S25 Ultra and a Pixel', { eager: true, cls: 'hero-shot' }),
    body: `
<h2>Test on Galaxy, Pixel and foldables in Chrome</h2>
<p>Android Studio’s emulator boots a whole phone, takes gigabytes of disk and a few minutes to start. For checking how a website looks, you do not need any of that. PocketView shows your site at each Android phone’s exact viewport, with its pixel ratio and the Chrome for Android user agent, in a second.</p>

<h2>Android models and viewport sizes</h2>
${deviceTable('Android')}
${ESTIMATE_NOTE}
<p>The generic <strong>Android Compact, Standard and Large</strong> sizes cover the three widths most Android phones share. Galaxy Z Fold8, Z Fold8 Ultra, Z Flip8 and Xiaomi 18 Fold are on the <a href="/foldable-simulator">foldable simulator</a> page.</p>

<h2>Chrome for Android bars and the Android user agent</h2>
<ul>
  <li><strong>Frames:</strong> punch-hole cameras, thin bezels and rounded corners that match each model.</li>
  <li><strong>Status bar and Chrome bar:</strong> see how much of the first screen is left for your content.</li>
  <li><strong>User agent:</strong> Chrome for Android, sent in the HTTP header, in JavaScript and in User-Agent Client Hints (<code>Sec-CH-UA-Mobile: ?1</code>), so sites that check any of these send their mobile version.</li>
</ul>

<h2>When you need Android Studio instead</h2>
<p>Use the Android emulator or a real phone when you are testing a native or hybrid app, Android-specific APIs (intents, notifications, file pickers), or performance on low-end hardware. For layout and responsive design, a simulator is faster and shows several phones at once.</p>

<h2>Questions</h2>
${faqBlock(faq)}
<p>Also see the <a href="/iphone-simulator">iPhone simulator</a> and the full <a href="/viewport-sizes">viewport sizes</a> table.</p>
`,
  }),
};
