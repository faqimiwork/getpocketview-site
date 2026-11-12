import { videoBlock, videoSchema, innerPage, shot, faqBlock } from '../layout.mjs';

const slug = 'mockup-generator';
const faq = [
  ['Can I make a transparent PNG mockup?', '<p>Yes. Turn on transparent screenshots and press <kbd>S</kbd>: PocketView saves the device frames on a transparent background, ready to drop into a slide or an email.</p>'],
  ['Which export sizes are supported?', '<p>Square post (1080 × 1080), portrait post (1080 × 1350), Story and Reel (1080 × 1920), landscape (1920 × 1080), Chrome Web Store (1280 × 800) and link preview (1200 × 630), or fit to the devices.</p>'],
  ['Do I need the website to be live?', '<p>No. Mockups work on any page your browser can open, including localhost and staging, so you can share a design before launch.</p>'],
  ['Can I record a video mockup?', '<p>Yes. Record captures the same canvas as an MP4 or a GIF, with a ripple on every tap.</p>'],
];

export default {
  slug,
  title: 'Device Mockup Generator from Any URL',
  description: 'Turn any website into a phone or laptop mockup with backgrounds, headline text and tilt. Export for Instagram, Stories and link previews.',
  priority: 0.7,
  crumbs: [['Mockup generator', '/' + slug]],
  faq,
  schema: [videoSchema('mockup')],
  html: innerPage({
    slug,
    crumbs: [['Mockup generator', '/' + slug]],
    h1: 'Mockups from a live website',
    lead: 'Mockup Studio turns the devices on your screen into a post-ready image or video: a live website, a real device frame, your headline, at the exact size each platform wants.',
    heroShot: shot('mockup', 'Mockup Studio turning a live website into a portrait post with a lime background', { eager: true, cls: 'hero-shot' }),
    body: `
<h2>From a live URL to a mockup in one click</h2>
<p>Classic mockups mean taking screenshots, opening a design tool, finding a phone template and lining everything up. With PocketView the website is already inside the device frames, so a mockup is one click away: open <strong>Mockup</strong> in the top bar and the canvas appears around your devices.</p>
<ol class="steps">
  <li><strong>Open your site in PocketView</strong><span> and choose the devices (an iPhone and an iPad look great together).</span></li>
  <li><strong>Click Mockup.</strong><span> Pick a background, then click the headline on the canvas to write your own.</span></li>
  <li><strong>Press Screenshot</strong><span> to save a PNG, or Record for MP4 or GIF.</span></li>
</ol>

${videoBlock('mockup', 'Mockup Studio: backgrounds, tilt and export, filmed in PocketView.')}
<h2>Backgrounds, headline text, tilt and export sizes</h2>
<ul>
  <li><strong>Backgrounds:</strong> Ambient (colours taken from your site), PocketView dark, Lime, gradients, paper, black, or any custom colour.</li>
  <li><strong>Headline and subline:</strong> edit right on the canvas; the text scales with the canvas size.</li>
  <li><strong>Perspective:</strong> flat, tilt left or tilt right.</li>
  <li><strong>Shadow and padding:</strong> none, soft or strong; padding from tight to roomy.</li>
  <li><strong>Sizes:</strong> square and portrait posts, Story and Reel, landscape 1920 \u00d7 1080, Chrome Web Store, link preview, or fit to the devices.</li>
</ul>

<h2>Record MP4 and GIF instead of a still</h2>
<p>Motion sells a website better than a still. Record scrolls, taps and menu animations straight from the devices. PocketView crops the video to the device area or the mockup canvas and adds a soft ripple wherever you tap, so viewers can follow along. GIFs are kept small for chat and docs; MP4 is best for social posts.</p>
${shot('sync', 'Two phones on a lime mockup background with the headline Scroll one, every device follows', { caption: 'Made with Mockup Studio on the Lime background.' })}

<h2>Questions</h2>
${faqBlock(faq)}
<p>Learn more about the <a href="/mobile-simulator">mobile simulator</a> behind the mockups, or see the <a href="/foldable-simulator">foldables</a> that make mockups stand out.</p>
`,
  }),
};
