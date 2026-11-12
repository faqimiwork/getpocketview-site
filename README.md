# getpocketview.com

Website for PocketView, the free mobile simulator and responsive viewer for Chrome.

Plain static HTML built by a small Node script. No framework and no dependencies.

## Run it

```bash
node build.mjs        # builds every page into dist/
npx serve dist        # or any static server, then open http://localhost:3000
```

The build fails if a page has an em dash or more than one H1, and warns when a title or meta description is too long.

## Where things live

| Path | What |
| --- | --- |
| `src/site.mjs` | Site settings, navigation, footer links. **Set `storeUrl` to the Chrome Web Store listing once it is approved.** |
| `src/layout.mjs` | Page shell: head tags, Open Graph, JSON-LD, navbar, footer, shared blocks (buttons, FAQ, CTA band, device icons) |
| `src/pages/*.mjs` | One file per page: slug, title, description, FAQ, schema and HTML |
| `src/blog/*.mjs` | Blog posts (same shape, plus `date` and `readMins`). Set `draft: true` to hide one |
| `src/data/devices.mjs` | Copy of the extension's device list. Viewport tables are generated from it, so update it when the extension gets new devices |
| `public/` | Copied as is: CSS, fonts, images, icons |
| `netlify.toml` | Build command, www redirect, headers |

## Add a blog post

1. Copy `src/blog/test-website-on-mobile-without-a-phone.mjs` to a new file named after the slug.
2. Change `slug`, `date`, `title` (max 60 characters), `description` (140 to 155), `h1`, `crumbs`, the FAQ and the body.
3. Link to one money page (`/mobile-simulator`, `/responsive-viewer`, `/iphone-simulator` ...) in the first 150 words.
4. `node build.mjs`, check it locally, commit and push. Netlify deploys automatically and the sitemap updates itself.

## Deploy (GitHub + Netlify)

1. Create a GitHub repository `getpocketview-site` and push this folder.
2. In Netlify: Add new site, Import from Git, choose the repository. Netlify reads `netlify.toml` (build `node build.mjs`, publish `dist`).
3. Domain settings: add `getpocketview.com` and `www.getpocketview.com`, point the DNS to Netlify, and turn on HTTPS.
4. Google Search Console: verify the domain with a DNS TXT record and submit `https://getpocketview.com/sitemap.xml`.

## Credits

Fonts: Hubot Sans and Inter Tight, SIL Open Font License (see `public/assets/fonts`). Layout style adapted from the SaaSHub landing template.
