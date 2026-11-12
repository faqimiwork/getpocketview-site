import { innerPage } from '../layout.mjs';

const slug = 'blog';
const fmt = (d) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export default {
  slug,
  title: 'PocketView Blog: Responsive Design and Mobile Testing',
  description: 'Practical guides on responsive design, mobile testing, viewport sizes, foldables and PWAs, from the team behind the PocketView mobile simulator.',
  priority: 0.6,
  crumbs: [['Blog', '/' + slug]],
  html: ({ posts }) => innerPage({
    slug,
    crumbs: [['Blog', '/' + slug]],
    h1: 'Guides for responsive design and mobile testing',
    lead: 'One practical guide a week: how to test, which sizes matter, and how to fix what breaks on phones.',
    body: `<ul class="post-list">${posts.map((p) => `<li><a href="/blog/${p.slug}"><span class="meta">${fmt(p.date)} · ${p.readMins} min read</span><h3>${p.h1}</h3><p>${p.description}</p></a></li>`).join('')}</ul>`,
  }),
};
