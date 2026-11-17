// Account page: sign in with an emailed code, see the plan, manage billing, connect the extension.
const slug = 'account';

export const ACCOUNT_JS = `
var PV={
  token:function(){try{return localStorage.getItem('pv_token')}catch(e){return null}},
  save:function(t){try{localStorage.setItem('pv_token',t)}catch(e){}},
  clear:function(){try{localStorage.removeItem('pv_token')}catch(e){}},
  api:function(path,opts){opts=opts||{};var h={'Content-Type':'application/json'};var t=PV.token();if(t&&opts.auth)h.Authorization='Bearer '+t;
    return fetch(path,{method:opts.method||'POST',headers:h,body:opts.body?JSON.stringify(opts.body):undefined}).then(function(r){return r.json().then(function(d){d.__status=r.status;return d})})},
  hasExt:function(){return document.documentElement.hasAttribute('data-pocketview')},
  // The PocketView extension listens for this message on getpocketview.com and stores the licence.
  sendToExt:function(token){return new Promise(function(res){
    if(!PV.hasExt())return res(false);
    var done=false;function on(e){if(e.source===window&&e.data&&e.data.type==='pocketview:license:ok'){done=true;window.removeEventListener('message',on);res(true)}}
    window.addEventListener('message',on);
    window.postMessage({type:'pocketview:license',token:token},location.origin);
    setTimeout(function(){if(!done){window.removeEventListener('message',on);res(false)}},2500);
  })},
  date:function(s){return s?new Date(s*1000).toLocaleDateString(undefined,{day:'numeric',month:'long',year:'numeric'}):''}
};`;

export default {
  slug,
  title: 'Your PocketView account',
  description: 'Sign in with your email to see your PocketView Pro plan, connect the Chrome extension, download invoices, change plan or cancel your subscription.',
  noindex: true,
  priority: 0.2,
  html: `<section class="page-hero"><div class="glow g-lime" style="width:540px;height:540px;right:-220px;top:-200px"></div><div class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <span aria-current="page">Account</span></nav>
  <h1>Your account</h1>
  <p class="sub">PocketView has no passwords. Enter the email you used to buy Pro and we will send you a sign-in code.</p>

  <div class="acct-box" id="stepEmail">
    <h2>Sign in</h2>
    <form id="emailForm">
      <label for="email">Email</label>
      <input id="email" type="email" autocomplete="email" required placeholder="you@example.com">
      <div class="row"><button class="btn btn-dark" type="submit"><span class="flip">Email me a code</span></button></div>
    </form>
    <p class="form-msg" id="emailMsg" role="status"></p>
    <p class="cta-note">No Pro plan yet? <a href="/pro">See PocketView Pro</a>.</p>
  </div>

  <div class="acct-box" id="stepCode" hidden>
    <h2>Check your email</h2>
    <p>If <strong id="sentTo"></strong> has a PocketView plan, a 6 digit code is on its way. It expires in 10 minutes.</p>
    <form id="codeForm">
      <label for="code">Code</label>
      <input id="code" class="code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" required>
      <div class="row"><button class="btn btn-dark" type="submit"><span class="flip">Sign in</span></button>
      <button class="linkish" type="button" id="backBtn">Use another email</button></div>
    </form>
    <p class="form-msg" id="codeMsg" role="status"></p>
  </div>

  <div class="acct-box" id="stepPlan" hidden>
    <h2 id="planTitle">PocketView Pro</h2>
    <dl id="planInfo"></dl>
    <div class="row">
      <button class="btn btn-dark" type="button" id="portalBtn"><span class="flip">Manage billing</span></button>
      <button class="btn btn-light" type="button" id="extBtn"><span class="flip">Connect this browser</span></button>
    </div>
    <p class="form-msg" id="planMsg" role="status"></p>
    <p class="cta-note"><button class="linkish" type="button" id="outBtn">Sign out</button></p>
  </div>
</div></section>`,
  script: `<script>${ACCOUNT_JS}
(function(){
  var $=function(id){return document.getElementById(id)};
  var email='';
  function show(id){['stepEmail','stepCode','stepPlan'].forEach(function(s){$(s).hidden=s!==id})}
  function plan(d){
    show('stepPlan');
    var rows=[['Email',d.email||''],['Plan',d.pro?('Pro, '+(d.plan==='yearly'?'yearly':'monthly')):'Free']];
    if(d.status&&d.status!=='active'&&d.status!=='none')rows.push(['Status',d.status.replace('_',' ')]);
    if(d.periodEnd)rows.push([d.cancelAtPeriodEnd||!d.pro?'Pro ends':'Renews',PV.date(d.periodEnd)]);
    $('planTitle').textContent=d.pro?'PocketView Pro':'No active plan';
    $('planInfo').innerHTML=rows.map(function(r){return '<dt>'+r[0]+'</dt><dd></dd>'}).join('');
    [].slice.call($('planInfo').querySelectorAll('dd')).forEach(function(dd,i){dd.textContent=rows[i][1]});
    $('extBtn').hidden=!PV.hasExt();
  }
  function load(){
    if(!PV.token())return show('stepEmail');
    PV.api('/api/license?fresh=1',{method:'GET',auth:true}).then(function(d){if(d.__status===401){PV.clear();show('stepEmail')}else plan(d)}).catch(function(){show('stepEmail')});
  }
  $('emailForm').addEventListener('submit',function(e){e.preventDefault();
    email=$('email').value.trim(); $('emailMsg').className='form-msg'; $('emailMsg').textContent='Sending…';
    PV.api('/api/login/start',{body:{email:email}}).then(function(d){
      if(d.error){$('emailMsg').className='form-msg err';$('emailMsg').textContent=d.error;return}
      $('emailMsg').textContent=''; $('sentTo').textContent=email; show('stepCode'); $('code').focus();
      if(d.wait)$('codeMsg').textContent='A code was sent a moment ago. You can ask for a new one in '+d.wait+' seconds.';
    }).catch(function(){$('emailMsg').className='form-msg err';$('emailMsg').textContent='Could not send the code. Please try again.'});
  });
  $('codeForm').addEventListener('submit',function(e){e.preventDefault();
    $('codeMsg').className='form-msg'; $('codeMsg').textContent='Checking…';
    PV.api('/api/login/verify',{body:{email:email,code:$('code').value,label:'website'}}).then(function(d){
      if(!d.token){$('codeMsg').className='form-msg err';$('codeMsg').textContent=d.error||'That code did not work.';return}
      PV.save(d.token); $('codeMsg').textContent=''; plan(d);
    });
  });
  $('backBtn').addEventListener('click',function(){show('stepEmail')});
  $('portalBtn').addEventListener('click',function(){
    $('planMsg').className='form-msg'; $('planMsg').textContent='Opening billing…';
    PV.api('/api/portal',{auth:true}).then(function(d){if(d.url)location.href=d.url;else{$('planMsg').className='form-msg err';$('planMsg').textContent=d.error||'Could not open billing.'}});
  });
  $('extBtn').addEventListener('click',function(){
    // Each install gets its own licence, so signing out on one does not affect another.
    $('planMsg').className='form-msg'; $('planMsg').textContent='Connecting…';
    PV.api('/api/license?issue=1',{auth:true,body:{label:'extension'}}).then(function(d){
      if(!d.token)throw new Error(d.error||'');
      return PV.sendToExt(d.token);
    }).then(function(ok){$('planMsg').textContent=ok?'PocketView in this browser is now Pro.':'Could not reach PocketView. Make sure it is installed and enabled, then reload this page.'})
    .catch(function(e){$('planMsg').className='form-msg err';$('planMsg').textContent=e.message||'Could not connect.'});
  });
  $('outBtn').addEventListener('click',function(){PV.api('/api/license',{method:'DELETE',auth:true}).finally(function(){PV.clear();show('stepEmail')})});
  load();
})();
</script>`,
};
