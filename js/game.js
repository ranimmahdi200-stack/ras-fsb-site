/* IEEE RAS FSB SB — game.js
   'Signal Catch' mini-game shown when the hero logo is clicked. */

/* ==========================================================
   INTERACTIVE LOGO MINI-GAME — "Signal Catch"
   ========================================================== */
(function(){
  const modal=document.getElementById('gameModal');
  const openBtn=document.getElementById('logoOrb');
  const closeBtn=document.getElementById('gameClose');
  const canvas=document.getElementById('gameCanvas');
  const ctx=canvas.getContext('2d');
  const scoreEl=document.getElementById('gameScore');
  const livesEl=document.getElementById('gameLives');

  let W=canvas.width, H=canvas.height;
  let paddle={x:W/2-30,w:60,h:10,y:H-24};
  let nodes=[];
  let score=0, lives=3, running=false, rafId=null, spawnTimer=0;
  let keys={left:false,right:false};

  function resetGame(){
    nodes=[]; score=0; lives=3; spawnTimer=0;
    paddle.x=W/2-paddle.w/2;
    scoreEl.textContent='0';
    livesEl.textContent='♥ ♥ ♥';
  }

  function spawnNode(){
    nodes.push({x:Math.random()*(W-14)+7, y:-10, r:7, speed:1.4+Math.random()*1.6});
  }

  function update(){
    spawnTimer++;
    if(spawnTimer>55){ spawnNode(); spawnTimer=0; }
    nodes.forEach(n=> n.y += n.speed);
    // collisions
    nodes=nodes.filter(n=>{
      if(n.y > paddle.y-6 && n.y < paddle.y+paddle.h && n.x > paddle.x-6 && n.x < paddle.x+paddle.w+6){
        score++; scoreEl.textContent=score; return false;
      }
      if(n.y > H+10){
        lives--; livesEl.textContent='♥ '.repeat(Math.max(lives,0)).trim()||'—';
        return false;
      }
      return true;
    });
    if(keys.left) paddle.x -= 5;
    if(keys.right) paddle.x += 5;
    paddle.x=Math.max(0,Math.min(W-paddle.w,paddle.x));
    if(lives<=0){ running=false; }
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    // grid backdrop
    ctx.strokeStyle='rgba(255,255,255,0.04)';
    for(let gx=0; gx<W; gx+=20){ ctx.beginPath(); ctx.moveTo(gx,0); ctx.lineTo(gx,H); ctx.stroke(); }
    // nodes
    nodes.forEach(n=>{
      const grad=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r*2.4);
      grad.addColorStop(0,'#B23347'); grad.addColorStop(1,'rgba(139,63,160,0)');
      ctx.fillStyle=grad; ctx.beginPath(); ctx.arc(n.x,n.y,n.r*2.4,0,7); ctx.fill();
      ctx.fillStyle='#F4F1F7'; ctx.beginPath(); ctx.arc(n.x,n.y,n.r*0.5,0,7); ctx.fill();
    });
    // paddle
    const pg=ctx.createLinearGradient(paddle.x,0,paddle.x+paddle.w,0);
    pg.addColorStop(0,'#862633'); pg.addColorStop(1,'#5F2167');
    ctx.fillStyle=pg;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(paddle.x,paddle.y,paddle.w,paddle.h,6) : ctx.rect(paddle.x,paddle.y,paddle.w,paddle.h);
    ctx.fill();

    if(!running){
      ctx.fillStyle='rgba(10,8,16,0.55)'; ctx.fillRect(0,0,W,H);
      ctx.fillStyle='#F4F1F7'; ctx.font='600 16px sans-serif'; ctx.textAlign='center';
      ctx.fillText(lives<=0 ? 'Game over — tap to retry' : 'Tap to start', W/2, H/2);
    }
  }

  function loop(){
    if(running) update();
    draw();
    rafId=requestAnimationFrame(loop);
  }

  function startGame(){
    if(!running){ resetGame(); running=true; }
  }

  canvas.addEventListener('pointerdown', (e)=>{
    if(!running){ startGame(); return; }
    const rect=canvas.getBoundingClientRect();
    const relX=(e.clientX-rect.left)*(W/rect.width);
    paddle.x=Math.max(0,Math.min(W-paddle.w, relX-paddle.w/2));
  });
  canvas.addEventListener('pointermove', (e)=>{
    if(e.buttons!==1 && e.pointerType!=='touch') return;
    const rect=canvas.getBoundingClientRect();
    const relX=(e.clientX-rect.left)*(W/rect.width);
    paddle.x=Math.max(0,Math.min(W-paddle.w, relX-paddle.w/2));
  });
  window.addEventListener('keydown', e=>{
    if(!modal.classList.contains('open')) return;
    if(e.key==='ArrowLeft') keys.left=true;
    if(e.key==='ArrowRight') keys.right=true;
  });
  window.addEventListener('keyup', e=>{
    if(e.key==='ArrowLeft') keys.left=false;
    if(e.key==='ArrowRight') keys.right=false;
  });

  openBtn.addEventListener('click', ()=>{
    modal.classList.add('open');
    resetGame();
    if(!rafId) loop();
  });
  closeBtn.addEventListener('click', ()=>{
    modal.classList.remove('open');
    running=false;
  });
  modal.addEventListener('click', (e)=>{ if(e.target===modal){ modal.classList.remove('open'); running=false; } });
})();
