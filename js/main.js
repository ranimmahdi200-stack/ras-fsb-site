/* IEEE RAS FSB SB — main.js
   Navbar behavior + data-driven section rendering (activities, projects, team, platforms). */

/* ==========================================================
   NAVBAR
   ========================================================== */
const navbar=document.getElementById('navbar');
window.addEventListener('scroll', ()=>{
  navbar.classList.toggle('scrolled', window.scrollY>40);
});
const burger=document.getElementById('burger'), navLinks=document.getElementById('navLinks');
burger.addEventListener('click', ()=>navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>navLinks.classList.remove('open')));

/* ==========================================================
   DATA-DRIVEN SECTIONS
   Each item below can take an `image` path. Drop your real photo
   at that path (create the file — the folder is already there under
   assets/images/…) and it will replace the icon/initials placeholder
   automatically. Leave `image` out, or leave the file missing, and
   the gradient + icon (or initials) fallback is used instead.
   ========================================================== */
const activityIcon = `<svg class="glyph" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`;

const activities=[
  {tag:'bootcamp', title:'CYBERTRON BOOTCAMP', desc:'It’s a transformation into the world of robotics, embedded systems, and intelligent machines.', image:'assets/images/BOOTCAMP.png',
    // Edit this list with your real workshops — each one shows up in the popup when the card is clicked.
    // `image` is optional per workshop: drop a photo at that path and it'll show as a rectangular thumbnail.
    workshops:[
      {name:'SESSION 1 — FUNDAMENTALS OF ROBOTICS', date:'11/07/2026', desc:'By Mr.Louay Sahbani', image:'assets/images/1.png'},
      {name:'SESSION 2 — The Embedded Blueprint', date:'13/07/2026', desc:'By Mr.Mohamed Kada', image:'assets/images/2.png'},
      {name:'SESSION 3 — The Language Behind Smart Devices', date:'15/07/2026', desc:'By Mr. Mohamed Amine Louati', image:'assets/images/3.png'},
      {name:'SESSION 4 — The IoT Odyssey', date:'16/07/2026', desc:'By Mr.Baha Eddine Hammou', image:'assets/images/4.png'},
      {name:'SESSION 5 — COMPUTER VISION FOR ROBOTICS', date:'20/07/2026', desc:'By Ms. Imen Masmoudi', image:'assets/images/5.png'},

    ]},
  {tag:'Workshop', title:'SOON', desc:'', image:'assets/images/'},
  {tag:'Competition', title:'SOON', desc:'', image:'assets/images/'},
];
const activityGrid=document.getElementById('activityGrid');
activities.forEach(a=>{
  const hasWorkshops = Array.isArray(a.workshops) && a.workshops.length>0;
  const card=document.createElement('div');
  card.className='activity-card glass'+(hasWorkshops ? ' clickable' : '');
  card.innerHTML=`
    <div class="activity-media">
      ${activityIcon}
      ${a.image ? `<img src="${a.image}" alt="${a.title}" loading="lazy" onerror="this.remove()">` : ''}
    </div>
    <div class="activity-body">
      <span class="tag">${a.tag}</span>
      <h3>${a.title}</h3>
      <p>${a.desc}</p>
    </div>`;
  if(hasWorkshops){
    card.addEventListener('click', ()=>openActivityModal(a));
  }
  activityGrid.appendChild(card);
});

/* Activity workshops modal — opens on click for any activity that has a `workshops` list */
function openActivityModal(activity){
  const modal=document.getElementById('activityModal');
  document.getElementById('activityModalTag').textContent=activity.tag;
  document.getElementById('activityModalTitle').textContent=activity.title;
  document.getElementById('activityModalDesc').textContent=activity.desc;
  document.getElementById('activityModalList').innerHTML = activity.workshops.map(w=>`
    <div class="workshop-item">
      ${w.image ? `<div class="workshop-media"><img src="${w.image}" alt="${w.name}" loading="lazy" onerror="this.parentElement.remove()"></div>` : ''}
      <div class="workshop-body">
        <div class="workshop-head">
          <h4>${w.name}</h4>
          <span class="workshop-date">${w.date||''}</span>
        </div>
        <p>${w.desc||''}</p>
      </div>
    </div>`).join('');
  modal.classList.add('open');
}
(function(){
  const modal=document.getElementById('activityModal');
  document.getElementById('activityModalClose').addEventListener('click', ()=>modal.classList.remove('open'));
  modal.addEventListener('click', (e)=>{ if(e.target===modal) modal.classList.remove('open'); });
  window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') modal.classList.remove('open'); });
})();

const projects = [
  {
    name: 'BIG THINGS COMING SOON',
    stack: ['Robotics', 'Embedded Systems', 'AI & Vision'],
    image: 'IEEE RAS FSB SB.png' // You can use your bootcamp teaser image or leave empty string ''
  }
];

const projScroll = document.getElementById('projectScroll');

projects.forEach(p => {
  projScroll.insertAdjacentHTML('beforeend', `
    <div class="project-card glass">
      ${p.image ? `
      <div class="project-media">
        <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.parentElement.remove()">
      </div>` : ''}
      <div class="project-body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="stack">${p.stack.map(s => `<span>${s}</span>`).join('')}</div>
        <a class="project-link" href="#contact">Propose a Project
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
        </a>
      </div>
    </div>`);
});

const team = [
  { 
    name: 'Samar Rouahi', 
    role: 'Chair', 
    image: 'assets/images/samar.jpg',
    linkedin: 'https://www.linkedin.com/in/samar-rouahi-05094238b/',
    email: 'samarrouahi3@gmail.com'
  },
  { 
    name: 'Elaa Turki', 
    role: 'Vice Chair', 
    image: 'assets/images/elaa.png',
    linkedin: 'https://www.linkedin.com/in/elaa-turki-420a88217/',
    email: 'elaa.turki@gmail.com'
  },
  { 
    name: 'Lina Khayati', 
    role: 'Secretary', 
    image: 'assets/images/lina.jpg',
    linkedin: 'https://www.linkedin.com/in/lina-khayati-512452373/',
    email: 'linakhayati20@gmail.com'
  },
  { 
    name: 'Ranim Mahdi', 
    role: 'Webmaster', 
    image: 'assets/images/ranim.png',
    linkedin: 'https://www.linkedin.com/in/ranim-mahdi-76890b360/',
    email: 'ranimmahdi200@gmail.com'
  },
  { 
    name: 'Nour Limem', 
    role: 'Treasurer', 
    image: 'assets/images/nour.jpg',
    linkedin: 'https://linkedin.com/in/nour-limem',
    email: 'nour@example.com'
  },
];

const teamGrid = document.getElementById('teamGrid');

team.forEach(m => {
  const initials = m.name.split(' ').map(w => w[0]).join('');
  
  teamGrid.insertAdjacentHTML('beforeend', `
    <div class="team-card glass">
      <div class="team-photo">
        <span class="initials">${initials}</span>
        ${m.image ? `<img src="${m.image}" alt="${m.name}" loading="lazy" onerror="this.remove()">` : ''}
        <div class="team-social">
          ${m.linkedin ? `<a href="${m.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg></a>` : ''}
          ${m.email ? `<a href="mailto:${m.email}" aria-label="Email"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7 10-7"/></svg></a>` : ''}
        </div>
      </div>
      <div class="team-info"><h3>${m.name}</h3><p>${m.role}</p></div>
    </div>`);
});

const platforms = [
  { 
    name: 'TikTok', 
    color: '#25f4ee', 
    url: 'https://www.tiktok.com/@ieee.ras.fsb.sbc?',
    desc: 'Quick robotics builds and behind-the-scenes clips.', 
    icon: `<path d="M16 3a5 5 0 005 5v3a8 8 0 01-5-1.7V15a6 6 0 11-6-6c.3 0 .7 0 1 .1v3.1a3 3 0 103 3V3h2z"/>`
  },
  { 
    name: 'Facebook', 
    color: '#1877f2', 
    url: 'https://www.facebook.com/profile.php?id=61590487647070',
    desc: 'Event announcements, recaps and branch updates.', 
    icon: `<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>`
  },
  { 
    name: 'LinkedIn', 
    color: '#0a66c2', 
    url: 'https://www.linkedin.com/company/ieee-ras-chapter-fsb-student-branch/?',
    desc: 'Professional updates, achievements and alumni network.', 
    icon: `<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/>`
  },
  { 
    name: 'Instagram', 
    color: '#e1306c', 
    url: 'https://www.instagram.com/ieee.ras.fsb/',
    desc: 'Photo stories from workshops, events and competitions.', 
    icon: `<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>`
  }
];

const platformGrid = document.getElementById('platformGrid');

platforms.forEach(p => {
  platformGrid.insertAdjacentHTML('beforeend', `
    <div class="platform-card glass">
      <div class="platform-top">
        <div class="platform-icon" style="background:${p.color}22;border:1px solid ${p.color}55;">
          <svg viewBox="0 0 24 24" fill="none" stroke="${p.color}" stroke-width="1.6">${p.icon}</svg>
        </div>
        <h3>${p.name}</h3>
      </div>
      <p>${p.desc}</p>
      <a class="follow-link" href="${p.url || '#'}" target="_blank" rel="noopener noreferrer" style="color:${p.color}">Follow Us
        <svg viewBox="0 0 24 24" fill="none" stroke="${p.color}" stroke-width="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
      </a>
    </div>`);
});

/* ==========================================================
   ABOUT — stat counters (count up when the section scrolls in)
   ========================================================== */
(function(){
  const stats=document.querySelectorAll('.stat-number');
  if(!stats.length) return;
  const statObserver=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const el=entry.target;
      const target=parseInt(el.dataset.target, 10) || 0;
      const duration=1200;
      const start=performance.now();
      function tick(now){
        const progress=Math.min((now-start)/duration, 1);
        const eased=1-Math.pow(1-progress, 3);
        el.textContent=Math.round(eased*target)+'+';
        if(progress<1) requestAnimationFrame(tick);
        else el.textContent=target+'+';
      }
      requestAnimationFrame(tick);
      statObserver.unobserve(el);
    });
  },{threshold:0.4});
  stats.forEach(el=>statObserver.observe(el));
})();