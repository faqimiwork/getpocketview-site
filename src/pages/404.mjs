import { linkBtn } from '../layout.mjs';

export default {
  slug: '404',
  noindex: true,
  title: 'Page not found | PocketView',
  description: 'This page does not exist. Try the mobile simulator, the viewport sizes table or the responsive checker guide on getpocketview.com instead.',
  html: `<section class="page-hero" style="min-height:70vh"><div class="wrap center" style="text-align:center">
  <h1>This screen is empty</h1>
  <p class="sub center" style="max-width:520px;margin:0 auto 28px">The page you were looking for moved or never existed. These are the most popular pages:</p>
  <div class="actions" style="justify-content:center">${linkBtn('/', 'Home', 'btn btn-dark')}${linkBtn('/mobile-simulator', 'Mobile simulator')}${linkBtn('/viewport-sizes', 'Viewport sizes')}</div>
</div></section>`,
};
