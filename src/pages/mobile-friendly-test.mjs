import { innerPage, shot, faqBlock } from '../layout.mjs';

const slug = 'mobile-friendly-test';
const faq = [
  ['How do I check if my site is mobile friendly?', '<p>Run Lighthouse (built into Chrome DevTools) or PageSpeed Insights for the automated checks, then look at the page yourself on a few real phone sizes using the 12-point checklist on this page. The automated tools catch tiny text and missing viewport tags; your eyes catch overlapping menus and awkward layouts.</p>'],
  ['Does mobile friendliness affect SEO?', '<p>Yes. Google indexes the mobile version of your pages first, and mobile usability is part of its page experience guidance. A page that is hard to use on a phone also loses visitors, which matters more than any single ranking signal.</p>'],
  ['Is the Google Mobile-Friendly Test still available?', '<p>No. Google retired the Mobile-Friendly Test tool, its API and the Search Console Mobile Usability report in December 2023 and points people to Lighthouse instead.</p>'],
];

export default {
  slug,
  title: 'Mobile Friendly Test: Free Checklist and Tool',
  description: 'Google retired its Mobile-Friendly Test tool. Here is a free checklist and how to check any page on real device sizes in Chrome.',
  priority: 0.7,
  type: 'article',
  crumbs: [['Mobile friendly test', '/' + slug]],
  faq,
  schema: [{
    '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to test if a page is mobile friendly',
    step: [
      { '@type': 'HowToStep', name: 'Run Lighthouse', text: 'Open Chrome DevTools, go to the Lighthouse tab, choose Mobile and run the report.' },
      { '@type': 'HowToStep', name: 'Check real device sizes', text: 'Open the page on a small phone, an average phone and a tablet size and scroll the whole page.' },
      { '@type': 'HowToStep', name: 'Go through the checklist', text: 'Check the viewport tag, text size, tap targets, sideways scroll, images, forms, navigation and pop-ups.' },
    ],
  }],
  html: innerPage({
    slug,
    crumbs: [['Mobile friendly test', '/' + slug]],
    h1: 'Mobile friendly test, done properly',
    lead: 'Google’s one-click Mobile-Friendly Test is gone. Here is what replaced it, a 12-point checklist you can run on any page, and how to see the page on real phone sizes.',
    body: `
<h2>Google retired the Mobile-Friendly Test. What replaced it?</h2>
<p>In December 2023 Google shut down the Mobile-Friendly Test, its API and the Mobile Usability report in Search Console. Mobile usability still matters for search; Google simply recommends other tools now:</p>
<ul>
  <li><strong>Lighthouse</strong> in Chrome DevTools (Lighthouse tab, choose Mobile): checks the viewport tag, font sizes, tap targets and much more, with a score out of 100.</li>
  <li><strong>PageSpeed Insights</strong> (pagespeed.web.dev): the same Lighthouse audit run from Google’s servers, plus real-user speed data for popular pages.</li>
  <li><strong>Search Console’s Core Web Vitals report:</strong> speed and stability on real phones for your whole site.</li>
</ul>
<p>Automated tools are good at rules. They cannot tell you that your menu covers the logo at 390 px or that the pricing table is unreadable on a small phone. For that you need to look.</p>

<h2>Free 12-point mobile friendly checklist</h2>
<ol>
  <li><strong>Viewport tag</strong> present: <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code>.</li>
  <li><strong>No sideways scroll</strong> at 360 px.</li>
  <li><strong>Body text</strong> at least 16 px.</li>
  <li><strong>Tap targets</strong> at least 48 × 48 px, with 8 px between them.</li>
  <li><strong>Navigation</strong> reachable with one thumb; the menu button is easy to find.</li>
  <li><strong>Images</strong> scale down and stay sharp; no fixed widths wider than the screen.</li>
  <li><strong>Forms</strong> use the right input types, and labels stay visible while typing.</li>
  <li><strong>No intrusive pop-ups</strong> that cover the content as soon as the page opens.</li>
  <li><strong>Sticky bars</strong> (header, cookie notice, chat) leave most of the screen for content.</li>
  <li><strong>Tables and code blocks</strong> scroll inside their own box.</li>
  <li><strong>Speed:</strong> Largest Contentful Paint under 2.5 s on a mid-range phone.</li>
  <li><strong>Landscape</strong> works too.</li>
</ol>

<h2>Test your page on real device sizes</h2>
<p>To check points 2 to 10 quickly, open the page in PocketView. It shows a small and a large phone side by side with their real viewport and mobile user agent; switch to a tablet with one click and press <kbd>R</kbd> for landscape.</p>
${shot('hero', 'Checking if a page is mobile friendly on an iPhone and a Galaxy phone side by side')}

<h2>Questions</h2>
${faqBlock(faq)}
<p>More: the <a href="/responsive-checker">responsive checker guide</a> and the <a href="/viewport-sizes">viewport sizes</a> table.</p>
<p class="meta">Source: <a href="https://searchengineland.com/google-officially-drops-mobile-usability-report-mobile-friendly-test-tool-and-mobile-friendly-test-api-435377" rel="noopener">Search Engine Land, December 2023</a>.</p>
`,
  }),
};
