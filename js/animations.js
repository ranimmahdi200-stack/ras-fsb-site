/* IEEE RAS FSB SB — animations.js
   Custom cursor + scroll-reveal animations. Respects prefers-reduced-motion via CSS. */

/* ==========================================================
   CUSTOM CURSOR
   ========================================================== */
(function(){
  if(window.matchMedia('(max-width: 860px)').matches) return;
  const dot=document.getElementById('cursorDot'), ring=document.getElementById('cursorRing');
  let rx=0, ry=0, mx=0, my=0;
  window.addEventListener('mousemove', e=>{
    mx=e.clientX; my=e.clientY;
    dot.style.left=mx+'px'; dot.style.top=my+'px';
  });
  function loop(){
    rx += (mx-rx)*0.18; ry += (my-ry)*0.18;
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(loop);
  }
  loop();
  document.querySelectorAll('a, button, .logo-orb, .activity-card, .project-card, .team-card, .platform-card').forEach(el=>{
    el.addEventListener('mouseenter', ()=>ring.classList.add('active'));
    el.addEventListener('mouseleave', ()=>ring.classList.remove('active'));
  });
})();

/* ==========================================================
   SCROLL REVEAL
   ========================================================== */
const revealEls=document.querySelectorAll('.reveal');
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
},{threshold:0.15});
revealEls.forEach(el=>io.observe(el));
