/* Neuroflow interactions: all non-essential motion has a reduced-motion fallback. */
(function(){
  const $=(s,c=document)=>c.querySelector(s); const $$=(s,c=document)=>[...c.querySelectorAll(s)];
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const video=$('#bg-video'); const videoPoster=$('.video-poster'); const progress=$('.scroll-progress span'); const header=$('[data-header]');
  const workflowTrack=$('[data-workflow-track]'); const workflowLine=$('.workflow-line span'); const videoTimeReadout=$('[data-video-time]');
  let duration=0, lastVideoTime=-1;

  function setVideoFromScroll(){
    if(!duration || reduce) return;
    const max=document.documentElement.scrollHeight-window.innerHeight;
    const p=max>0?Math.min(1,Math.max(0,window.scrollY/max)):0;
    const next=p*duration;
    if(Math.abs(next-lastVideoTime)>.025){ video.currentTime=next; lastVideoTime=next; }
    if(videoTimeReadout) videoTimeReadout.textContent=`${String(Math.floor(next/60)).padStart(2,'0')}:${String(Math.floor(next%60)).padStart(2,'0')}`;
  }
  function updateWorkflowProgress(){
    if(!workflowTrack||!workflowLine) return;
    const section=workflowTrack.closest('.workflow-section'); const start=section.offsetTop-window.innerHeight*.72; const end=section.offsetTop+section.offsetHeight-window.innerHeight*.42;
    const p=Math.min(1,Math.max(0,(window.scrollY-start)/(end-start))); const mobile=window.innerWidth<=900;
    workflowLine.style.width=mobile?'7px':`${p*100}%`; workflowLine.style.height=mobile?`${p*100}%`:'7px'; workflowTrack.dataset.progress=p.toFixed(3);
  }
  function setCountersFinal(){
    $$('.metric strong[data-count]').forEach(el=>{const target=parseFloat(el.dataset.count);const decimal=el.dataset.decimal||0;const suffix=el.dataset.suffix||'';el.textContent=target.toFixed(decimal)+suffix});
  }
  function updateProgress(){
    const max=document.documentElement.scrollHeight-window.innerHeight;
    progress.style.width=`${max?window.scrollY/max*100:0}%`;
    header.classList.toggle('scrolled',window.scrollY>18); setVideoFromScroll(); updateWorkflowProgress();
  }
  video.addEventListener('loadedmetadata',()=>{duration=video.duration; setVideoFromScroll()});
  video.addEventListener('error',()=>{video.classList.add('video-failed'); videoPoster.classList.add('visible')});
  window.addEventListener('scroll',updateProgress,{passive:true}); window.addEventListener('resize',updateProgress,{passive:true}); updateProgress();

  const initGsap=()=>{
    if(!window.gsap||!window.ScrollTrigger||reduce){ $$('.reveal').forEach(el=>{el.style.opacity=1;el.style.transform='none'}); setCountersFinal(); return; }
    gsap.registerPlugin(ScrollTrigger);
    $$('.reveal').forEach(el=>gsap.to(el,{opacity:1,y:0,duration:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 85%',once:true}}));
    $$('.workflow-step').forEach((step,i)=>ScrollTrigger.create({trigger:step,start:'top 66%',end:'bottom 45%',onEnter:()=>step.classList.add('active'),onEnterBack:()=>step.classList.add('active'),onLeaveBack:()=>{if(i>0) step.classList.remove('active')}}));
    $$('.metric strong[data-count]').forEach(el=>{const target=parseFloat(el.dataset.count); const decimal=el.dataset.decimal||0; const suffix=el.dataset.suffix||''; const obj={value:0}; ScrollTrigger.create({trigger:el,start:'top 86%',once:true,onEnter:()=>gsap.to(obj,{value:target,duration:1.5,ease:'power2.out',onUpdate:()=>el.textContent=obj.value.toFixed(decimal)+suffix})})});
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initGsap); else initGsap();

  const sections=$$('[data-section]'); const navLinks=$$('[data-nav]');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.dataset.nav===entry.target.dataset.section))}}),{rootMargin:'-35% 0px -55%'});
  sections.filter(section=>navLinks.some(link=>link.dataset.nav===section.dataset.section)).forEach(section=>observer.observe(section));

  const theme=$('.theme-toggle'); if(localStorage.getItem('neuroflow-theme')==='light') document.body.classList.add('light-mode');
  theme.addEventListener('click',()=>{document.body.classList.toggle('light-mode');localStorage.setItem('neuroflow-theme',document.body.classList.contains('light-mode')?'light':'dark')});
  const menu=$('.mobile-menu'), menuToggle=$('.menu-toggle');
  menuToggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuToggle.setAttribute('aria-expanded',open);menu.setAttribute('aria-hidden',!open)});
  $$('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menu.setAttribute('aria-hidden','true')}));

  const cursor=$('.cursor-glow'); const heroField=$('.hero-3d-field'); const hero=$('.hero');
  if(window.matchMedia('(pointer:fine)').matches&&!reduce){window.addEventListener('pointermove',e=>{cursor.style.opacity=1;cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});window.addEventListener('pointerleave',()=>cursor.style.opacity=0);hero.addEventListener('pointermove',e=>{const rect=hero.getBoundingClientRect();const x=(e.clientX-rect.left)/rect.width-.5;const y=(e.clientY-rect.top)/rect.height-.5;heroField.style.setProperty('--mx',x.toFixed(3));heroField.style.setProperty('--my',y.toFixed(3))});hero.addEventListener('pointerleave',()=>{heroField.style.setProperty('--mx','0');heroField.style.setProperty('--my','0')})}

  const cases={product:{label:'Product & research',title:'Turn every conversation into product clarity.',body:'Find recurring pain, sharpen the roadmap, and keep discovery close to the decisions it informs.',metric:'+68%'},revenue:{label:'Revenue & growth',title:'See the story behind every growth signal.',body:'Connect the voice of your market to the moves that create durable, compounding growth.',metric:'+41%'},ops:{label:'Operations & execs',title:'Give the whole company a clearer next step.',body:'Replace status sprawl with a living view of what changed, what matters, and who moves next.',metric:'+53%'}};
  $$('.use-case').forEach(button=>button.addEventListener('click',()=>{ $$('.use-case').forEach(b=>b.classList.remove('active'));button.classList.add('active');const data=cases[button.dataset.case];const panel=$('.use-case-panel');panel.animate([{opacity:.35,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:260,easing:'ease-out'});$('.use-case-panel .eyebrow').textContent=data.label;$('.use-case-panel h3').textContent=data.title;$('.use-case-panel p').textContent=data.body;$('.panel-foot strong').textContent=data.metric}));

  const form=$('.signup-form'); form.addEventListener('submit',e=>{e.preventDefault();const input=$('#email'), message=$('.form-message');if(!input.validity.valid){input.focus();message.textContent='Enter a valid work email to continue.';message.style.color='#ff9cbd';return}message.textContent='You’re on the list — we’ll be in touch.';message.style.color='var(--cyan)';input.value='';});

  const widget=$('[data-chat-widget]'), launcher=$('.chat-launcher'), close=$('.chat-close'), chatForm=$('.chat-form'), chatInput=$('.chat-form input'), bubble=$('.chat-bubble');
  const setChat=open=>{widget.classList.toggle('open',open);launcher.setAttribute('aria-expanded',open);$('.chat-panel').setAttribute('aria-hidden',!open);if(open)chatInput.focus()}; launcher.addEventListener('click',()=>setChat(!widget.classList.contains('open')));close.addEventListener('click',()=>setChat(false));
  const answers={'how does it work?':'Bring in the messy inputs, and Neuroflow turns the meaningful patterns into a clear next move.','is it secure?':'Yes — the workspace is permissioned by design, with explanations kept close to every output.'};
  function reply(text){bubble.textContent=answers[text.toLowerCase()]||'Great question. Leave your email above and our team will show you the clearest path through it.';}
  $$('.chat-suggestions button').forEach(b=>b.addEventListener('click',()=>reply(b.textContent))); chatForm.addEventListener('submit',e=>{e.preventDefault();if(chatInput.value.trim()){reply(chatInput.value.trim());chatInput.value=''}});
})();
