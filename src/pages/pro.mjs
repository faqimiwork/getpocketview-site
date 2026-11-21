import { faqBlock, storeHref } from '../layout.mjs';
import { SITE } from '../site.mjs';

const slug = 'pro';
const { monthly, yearly } = SITE.pro;
const yearlyPerMonth = (yearly / 12).toFixed(0);
const savePct = Math.round((1 - yearly / (monthly * 12)) * 100);

const FREE = [
  ['All 95 iPhone, Android, foldable and iPad screens', true],
  ['2 devices side by side, with sync scroll', true],
  ['Screenshots and full-page screenshots of every device', true],
  ['QR code to open the page on your phone', true],
  ['Screen recording up to 15 seconds', true],
  ['Studio editor with every style and background', true],
  ['Studio export at 1x with a small PocketView badge', true],
];
const PRO = [
  ['Everything in Free', true],
  ['Up to 6 devices side by side', true],
  ['Unlimited MP4 and GIF recording', true],
  ['Form sync: type in one device, every device fills in', true],
  ['Studio export up to 4x, no badge', true],
  ['Copy mockups to the clipboard without a badge', true],
  ['Use it on up to 5 computers', true],
];
const list = (items) => `<ul>${items.map(([t, on]) => `<li${on ? '' : ' class="off"'}>${t}</li>`).join('')}</ul>`;

const faq = [
  ['Can I cancel any time?', 'Yes. Cancel from <a href="/account">your account</a> in two clicks. Pro stays on until the end of the period you paid for, and you are not charged again.'],
  ['Do you offer refunds?', `Yes. If Pro is not right for you, email us within 14 days of your first payment and we refund it in full. See the <a href="/refund">refund policy</a>.`],
  ['How do I use Pro on another computer?', 'Open PocketView on that computer, choose Sign in, and enter the email you paid with. We email you a 6 digit code. No password needed.'],
  ['Is the free version still free?', 'Yes. The simulator, all 95 devices, sync scroll, screenshots and the Studio editor stay free. Pro removes the limits on devices, recording and export, and adds form sync.'],
  ['Which payment methods do you accept?', 'Cards, Apple Pay and Google Pay through Stripe. We never see or store your card number.'],
  ['Do prices include tax?', 'Prices are in US dollars. Where sales tax or VAT applies, it is shown at checkout before you pay.'],
];

export default {
  slug,
  title: 'PocketView Pro: more devices, longer recordings',
  description: `PocketView Pro adds 6 devices side by side, unlimited recording and 4x mockup export with no badge. USD ${monthly} a month or USD ${yearly} a year. Cancel any time.`,
  priority: 0.7,
  updated: '2026-11-18',
  crumbs: [['Pro', '/pro']],
  faq,
  html: `<section class="page-hero pro-hero"><div class="glow g-lime" style="width:540px;height:540px;right:-220px;top:-200px"></div><div class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <span aria-current="page">Pro</span></nav>
  <h1>PocketView Pro</h1>
  <p class="sub">The simulator stays free. Pro is for when you test and present every day: more screens at once, recordings as long as you need and clean, sharp mockups.</p>
  <div class="plan-toggle" role="group" aria-label="Billing period">
    <button type="button" data-plan="monthly" aria-pressed="false">Monthly</button>
    <button type="button" data-plan="yearly" aria-pressed="true">Yearly<span class="save">Save ${savePct}%</span></button>
  </div>
  <div class="price-grid">
    <div class="price-card">
      <h3>Free</h3>
      <div class="price-amt">$0</div>
      <p class="price-note">Free forever. No account.</p>
      ${list(FREE)}
      <a class="btn btn-light" href="${storeHref('pro')}" rel="noopener" data-install><span class="flip">Add to Chrome</span></a>
    </div>
    <div class="price-card pro">
      <h3>Pro</h3>
      <div class="price-amt" id="proAmt">$${yearly}<small>/ year</small></div>
      <p class="price-note" id="proNote">That is $${yearlyPerMonth} a month, billed yearly.</p>
      ${list(PRO)}
      <button class="btn btn-dark" type="button" id="buyBtn"><span class="flip">Upgrade to Pro</span></button>
      <p class="form-msg" id="buyMsg" role="status"></p>
    </div>
  </div>
  <p class="cta-note">Already Pro? <a href="/account">Sign in to your account</a>. Payments are handled by Stripe.</p>
</div></section>
<div class="wrap"><article class="prose read">
<h2>Questions</h2>
${faqBlock(faq)}
</article></div>`,
  script: `<script>
(function(){
  var plan='yearly', P={monthly:${monthly},yearly:${yearly}};
  var amt=document.getElementById('proAmt'), note=document.getElementById('proNote'), msg=document.getElementById('buyMsg'), btn=document.getElementById('buyBtn');
  document.querySelectorAll('.plan-toggle button').forEach(function(b){b.addEventListener('click',function(){
    plan=b.dataset.plan;
    document.querySelectorAll('.plan-toggle button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
    amt.innerHTML='$'+P[plan]+'<small>/ '+(plan==='yearly'?'year':'month')+'</small>';
    note.textContent=plan==='yearly'?'That is $${yearlyPerMonth} a month, billed yearly.':'Billed monthly. Cancel any time.';
  })});
  var q=new URLSearchParams(location.search);
  if(q.get('plan')==='monthly')document.querySelector('[data-plan=monthly]').click();
  if(q.get('canceled'))msg.textContent='Checkout was cancelled. You have not been charged.';
  btn.addEventListener('click',function(){
    btn.disabled=true; msg.className='form-msg'; msg.textContent='Opening secure checkout…';
    fetch('/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan:plan,source:q.get('from')||'web'})})
      .then(function(r){return r.json()}).then(function(d){ if(d.url){location.href=d.url}else{throw new Error(d.error||'')} })
      .catch(function(e){btn.disabled=false; msg.className='form-msg err'; msg.textContent=e.message||'Could not open checkout. Please try again.'});
  });
})();
</script>`,
};
