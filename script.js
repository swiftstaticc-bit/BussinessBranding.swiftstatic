'use strict';
/* ── Active nav link (matches current page filename) ── */
(function(){
  const page=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-link,.mob-link').forEach(a=>{
    const href=a.getAttribute('href')||'';
    if(href===page||(page===''&&href==='index.html'))a.classList.add('active');
  });
})();

/* ── Navbar scroll effect ── */
(function(){
  const nav=document.getElementById('navbar');
  if(!nav)return;
  let t=false;
  function upd(){nav.classList.toggle('scrolled',window.scrollY>30);t=false}
  window.addEventListener('scroll',()=>{if(!t){requestAnimationFrame(upd);t=true}},{passive:true});
  upd();
})();

/* ── Hamburger / Mobile menu ── */
(function(){
  const ham=document.getElementById('hamburger');
  const mob=document.getElementById('mob-menu');
  if(!ham||!mob)return;
  const close=()=>{mob.hidden=true;ham.setAttribute('aria-expanded','false');document.body.style.overflow=''};
  const open=()=>{mob.hidden=false;ham.setAttribute('aria-expanded','true');document.body.style.overflow='hidden'};
  ham.addEventListener('click',()=>ham.getAttribute('aria-expanded')==='true'?close():open());
  mob.querySelectorAll('.mob-link,.mob-cta').forEach(l=>l.addEventListener('click',close));
  document.addEventListener('click',e=>{if(!mob.hidden&&!mob.contains(e.target)&&!ham.contains(e.target))close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  window.addEventListener('resize',()=>{if(window.innerWidth>960)close()},{passive:true});
})();

/* ── Menu tabs ── */
(function(){
  const tabs=document.querySelectorAll('.tab');
  const panels=document.querySelectorAll('.menu-panel');
  if(!tabs.length)return;
  tabs.forEach(tab=>tab.addEventListener('click',()=>{
    tabs.forEach(t=>{t.classList.remove('active');t.setAttribute('aria-selected','false')});
    panels.forEach(p=>{p.classList.remove('active');p.hidden=true});
    tab.classList.add('active');tab.setAttribute('aria-selected','true');
    const t=document.getElementById('mp-'+tab.dataset.tab);
    if(t){t.classList.add('active');t.hidden=false}
  }));
})();

/* ── Gallery filter tabs ── */
(function(){
  const tabs=document.querySelectorAll('.gtab');
  const items=document.querySelectorAll('.g-item[data-cat]');
  if(!tabs.length)return;
  tabs.forEach(tab=>tab.addEventListener('click',()=>{
    tabs.forEach(t=>{t.classList.remove('active');t.setAttribute('aria-selected','false')});
    tab.classList.add('active');tab.setAttribute('aria-selected','true');
    const cat=tab.dataset.cat;
    items.forEach(item=>{
      if(cat==='all'||item.dataset.cat===cat){item.hidden=false}
      else{item.hidden=true}
    });
  }));
})();

/* ── Lightbox ── */
(function(){
  const items=document.querySelectorAll('.g-item');
  if(!items.length)return;
  const lb=document.createElement('div');lb.id='lightbox';
  const img=document.createElement('img');img.alt='';
  const cap=document.createElement('p');cap.id='lb-caption';
  const btn=document.createElement('button');btn.id='lb-close';btn.innerHTML='&#x2715;';btn.setAttribute('aria-label','Close');
  lb.appendChild(img);lb.appendChild(cap);lb.appendChild(btn);document.body.appendChild(lb);
  const close=()=>{lb.classList.remove('open');document.body.style.overflow=''};
  const open=(src,label)=>{img.src=src;cap.textContent=label||'';lb.classList.add('open');document.body.style.overflow='hidden'};
  items.forEach(item=>{
    item.setAttribute('tabindex','0');
    const handler=()=>{
      const i=item.querySelector('img');
      if(i)open(i.src.replace(/\?.*$/,'')+'?w=1200&auto=format&q=82',item.dataset.label||'');
    };
    item.addEventListener('click',handler);
    item.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();handler()}});
  });
  lb.addEventListener('click',e=>{if(e.target===lb||e.target===btn)close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();

/* ── Scroll animations ── */
(function(){
  const els=document.querySelectorAll('[data-anim]');
  if(!els.length)return;
  if(!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('vis'));return}
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target)}})
  },{threshold:.1});
  els.forEach(e=>obs.observe(e));
})();

/* ── Hero parallax ── */
(function(){
  const bg=document.querySelector('.home-hero .hero-bg');
  if(!bg||window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  let t=false;
  window.addEventListener('scroll',()=>{
    if(!t){requestAnimationFrame(()=>{
      const y=window.scrollY;
      if(y<window.innerHeight*1.2)bg.style.transform=`scale(1.06) translateY(${y*.15}px)`;
      t=false;
    });t=true}
  },{passive:true});
})();

/* ── Contact form → WhatsApp redirect ── */
(function(){
  const form=document.getElementById('cform');
  if(!form)return;
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const name=form.querySelector('#f-name')?.value||'';
    const msg=form.querySelector('#f-msg')?.value||'';
    const text=encodeURIComponent(`Hi! I'm ${name}. ${msg}`);
    window.open(`https://wa.me/919876543210?text=${text}`,'_blank','noopener');
  });
})();
