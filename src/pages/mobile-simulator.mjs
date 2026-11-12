import { videoBlock, videoSchema, innerPage, shot, faqBlock } from '../layout.mjs';
import { DEVICES } from '../data/devices.mjs';

const slug = 'mobile-simulator';
const count = DEVICES.length;
const group = (g) => DEVICES.filter((d) => d.group === g).map((d) => d.name).join(', ');

const faq = [
  ['Is a mobile simulator accurate?', '<p>For layout, yes. PocketView uses each device’s CSS viewport, pixel ratio and user agent, so media queries, breakpoints and mobile detection behave as on the phone. It runs on Chrome’s engine, so engine-specific bugs (Safari on iPhone, for example) still need a real device.</p>'],
  ['Can I test iOS Safari bugs with it?', '<p>Not fully. You will see the iPhone layout, Safari bars and iOS user agent, but rendering quirks unique to WebKit only show in Safari. Use PocketView for daily checks and a real iPhone or Xcode’s Simulator on a Mac for the final pass.</p>'],
  ['How is it different from Chrome DevTools device mode?', '<p>DevTools shows one device at a time inside the inspector. PocketView shows several devices side by side with real frames, syncs scrolling and clicks between them, and adds recording, mockups, app mode and foldables. Many developers use both.</p>'],
  ['Does it work offline or on localhost?', '<p>Yes. Any URL your browser can open works, including <code>localhost</code>, local IP addresses and staging servers.</p>'],
];

export default {
  slug,
  title: 'Mobile Simulator for Chrome: Test on 36 Devices',
  description: 'A free mobile simulator in your browser. Real iPhone, Galaxy and Pixel frames, mobile user agent, touch scrolling and dark mode. No ads.',
  priority: 0.9,
  crumbs: [['Mobile simulator', '/' + slug]],
  faq,
  schema: [videoSchema('devices'), { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'PocketView', applicationCategory: 'DeveloperApplication', operatingSystem: 'Chrome', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }],
  html: innerPage({
    slug,
    crumbs: [['Mobile simulator', '/' + slug]],
    h1: 'The mobile simulator that lives in your Chrome tab',
    lead: `PocketView turns any tab into a device lab: ${count} devices, from phones and foldables to tablets, laptops and a free-size responsive view, with real frames, the right user agent and touch scrolling. Free, no account needed.`,
    heroShot: shot('iphone', 'Mobile simulator showing a website on an iPhone 17 Pro Max and an iPhone SE', { eager: true, cls: 'hero-shot' }),
    body: `
<h2>What a mobile simulator does</h2>
<p>A mobile simulator shows your website the way a phone would: at the phone’s screen size, with its pixel density, and with the browser telling your site it is a phone. PocketView sets four things for every device:</p>
<ul>
  <li><strong>CSS viewport.</strong> The width and height your media queries see, such as 402 × 874 for iPhone 17 Pro.</li>
  <li><strong>Pixel ratio.</strong> <code>devicePixelRatio</code> of 2, 3 or 3.5, so sharp images and <code>srcset</code> choices match the device.</li>
  <li><strong>User agent.</strong> Sent in the HTTP header and in JavaScript (including <code>navigator.userAgentData</code>), so server-side and client-side mobile detection both fire.</li>
  <li><strong>Touch.</strong> A round touch cursor, drag to scroll with momentum, hidden scrollbars and <code>maxTouchPoints</code> set, like a finger on glass.</li>
</ul>

${videoBlock('devices', 'Picking devices, swapping in a foldable, and app mode, filmed in PocketView.')}
<h2>Simulator, emulator or real device?</h2>
<p>The words get mixed up, so here is the short version.</p>
<div class="table-wrap"><table>
<thead><tr><th>Tool</th><th>What it runs</th><th>Best for</th></tr></thead>
<tbody>
<tr><td>Mobile simulator (PocketView)</td><td>Your site in Chrome at device sizes, with the device user agent</td><td>Daily responsive checks, demos, screenshots</td></tr>
<tr><td>Emulator (Android Studio, Xcode Simulator)</td><td>A full copy of the phone’s operating system and browser</td><td>Engine-specific bugs, native apps</td></tr>
<tr><td>Real device</td><td>The real thing</td><td>Final check before launch, performance on slow phones</td></tr>
</tbody></table></div>
<p>Most layout problems show up in a simulator in seconds. Keep an emulator or a real phone for the last 5% of bugs.</p>

<h2>How to use PocketView in 3 steps</h2>
<ol class="steps">
  <li><strong>Add PocketView to Chrome.</strong><span> One click from the Chrome Web Store. Pin it to your toolbar.</span></li>
  <li><strong>Open any page and click the icon</strong><span> (or press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>). The tab turns into a simulator with two devices.</span></li>
  <li><strong>Pick your devices.</strong><span> Open Devices, search by name or size (try “fold” or “390”), or choose a quick set such as iPhone + Android.</span></li>
</ol>

<h2>The device library</h2>
<p>${count} devices (including the free-size responsive view), updated as new phones launch (see the <a href="/changelog">changelog</a>):</p>
<ul>
  <li><strong>Foldables:</strong> ${group('Foldable')}</li>
  <li><strong>iPhone:</strong> ${group('iPhone')}</li>
  <li><strong>Android:</strong> ${group('Android')}</li>
  <li><strong>Tablets:</strong> ${group('Tablet')}</li>
  <li><strong>Laptops and desktop:</strong> ${group('Desktop')}</li>
  <li><strong>Responsive:</strong> drag to any size, with a breakpoint ruler. Save your own custom devices too.</li>
</ul>
<p>Every viewport size is listed on the <a href="/viewport-sizes">viewport sizes</a> page.</p>

<h2>Features for developers</h2>
<ul>
  <li><strong>Dark mode:</strong> force <code>prefers-color-scheme: dark</code> without changing your system theme.</li>
  <li><strong>App mode:</strong> emulate <code>display-mode: standalone</code> and <code>fullscreen</code> to test your PWA, with the splash screen from your manifest.</li>
  <li><strong>Sites that block frames:</strong> PocketView lifts frame-blocking headers inside the simulator tab only, and if a site tries to break out, it reloads it in a contained mode and tells you.</li>
  <li><strong>Setup links:</strong> copy a link with the exact devices, orientation and mode to share with your team.</li>
  <li><strong>Keyboard:</strong> <kbd>R</kbd> rotates every device, <kbd>S</kbd> takes a screenshot.</li>
</ul>
${shot('appmode', 'A website previewed as an installed PWA in app mode on two phones', { caption: 'App mode shows your site as it looks when installed to the home screen.' })}

<h2>Questions</h2>
${faqBlock(faq)}
<p>Comparing tools? Read <a href="/alternatives">mobile simulator extensions compared</a>, or see the <a href="/iphone-simulator">iPhone simulator</a> and <a href="/android-simulator">Android simulator</a> pages.</p>
`,
  }),
};
