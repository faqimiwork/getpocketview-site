// Shown after Stripe Checkout. Claims the licence and hands it to the extension in this browser.
import { ACCOUNT_JS } from './account.mjs';

export default {
  slug: 'pro/success',
  title: 'Welcome to PocketView Pro',
  description: 'Your PocketView Pro plan is ready. This page connects Pro to the PocketView extension in this browser and shows how to use Pro on other computers.',
  noindex: true,
  priority: 0.1,
  html: `<section class="page-hero"><div class="glow g-lime" style="width:540px;height:540px;right:-220px;top:-200px"></div><div class="wrap">
  <h1>Welcome to Pro</h1>
  <p class="sub" id="lead">Confirming your payment…</p>
  <div class="acct-box" id="box" hidden>
    <h2 id="boxTitle">You are all set</h2>
    <dl id="info"></dl>
    <p id="extNote"></p>
    <div class="row"><a class="btn btn-dark" href="/account"><span class="flip">Your account</span></a></div>
    <p class="cta-note">On another computer, open PocketView, choose Sign in and enter <strong id="em"></strong>. We will email you a code.</p>
  </div>
  <p class="form-msg" id="msg" role="status"></p>
</div></section>`,
  script: `<script>${ACCOUNT_JS}
(function(){
  var $=function(id){return document.getElementById(id)};
  var id=new URLSearchParams(location.search).get('session_id');
  if(!id){$('lead').textContent='Nothing to confirm here. Sign in on your account page to manage Pro.';return}
  var tries=0;
  function claim(){
    PV.api('/api/claim',{body:{session_id:id,label:'checkout'}}).then(function(d){
      if(d.__status===409&&tries++<5)return setTimeout(claim,2000);
      if(!d.token){$('lead').textContent='We could not confirm the payment on this page.';$('msg').className='form-msg err';$('msg').innerHTML='';$('msg').append(d.error||'Please refresh, or sign in on the ',Object.assign(document.createElement('a'),{href:'/account',textContent:'account page'}),'.');return}
      PV.save(d.token);
      $('lead').textContent='Thank you for supporting PocketView. A receipt is on its way to your email.';
      $('em').textContent=d.email||'your email';
      $('info').innerHTML='<dt>Plan</dt><dd></dd><dt>Renews</dt><dd></dd>';
      var dd=$('info').querySelectorAll('dd');dd[0].textContent='Pro, '+(d.plan==='yearly'?'yearly':'monthly');dd[1].textContent=PV.date(d.periodEnd);
      $('box').hidden=false;
      // A second licence for the extension, so the website and the extension can sign out separately.
      return PV.api('/api/license?issue=1',{auth:true,body:{label:'extension'}}).then(function(x){return x.token?PV.sendToExt(x.token):false}).then(function(ok){
        $('extNote').textContent=ok?'PocketView in this browser is now Pro. Reopen the simulator or Studio to see it.':'Open PocketView and choose Sign in to turn on Pro in the extension.';
      });
    }).catch(function(){$('msg').className='form-msg err';$('msg').textContent='Network problem. Please refresh this page.'});
  }
  claim();
})();
</script>`,
};
