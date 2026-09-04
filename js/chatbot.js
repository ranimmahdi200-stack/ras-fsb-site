/* IEEE RAS FSB SB — chatbot.js */
(function(){
  const fab=document.getElementById('chatFab');
  const win=document.getElementById('chatWindow');
  const body=document.getElementById('chatBody');
  const input=document.getElementById('chatInput');
  const send=document.getElementById('chatSend');
  const clearBtn=document.getElementById('chatClear');

  let history=[];

  function addMsg(text, who){
    const div=document.createElement('div');
    div.className='msg '+who;
    div.textContent=text;
    body.appendChild(div);
    body.scrollTop=body.scrollHeight;
    history.push({role: who==='user' ? 'user' : 'assistant', text});
  }

  function greet(){
    body.innerHTML='';
    history=[];
    addMsg("Hi! I'm the RAS Assistant. Ask me about our workshops, projects, or anything else.", 'bot');
  }
  greet();

  fab.addEventListener('click', ()=>win.classList.toggle('open'));
  clearBtn.addEventListener('click', greet);

  // Local fallback only — used if backend server is completely turned off.
  function localFallback(userText){
    const t=userText.toLowerCase();
    if(t.includes('join') || t.includes('member')) return "You can join through the 'Become a Member' button — fill the form and our team will follow up by email.";
    if(t.includes('event') || t.includes('workshop')) return "Check the Activities section above — we run workshops, bootcamps and technical sessions throughout the year.";
    if(t.includes('project')) return "Have a look at the Projects section — recent builds include a gesture-controlled robotic arm and an autonomous rover.";
    if(t.includes('team') || t.includes('who')) return "The team is listed in the Team section above — we are a group of students passionate about robotics and AI.";
    return "Sorry, I couldn't come up with a reply just now. You can also check the website sections above for more info.";
  
  }

  async function getReply(userText){
    try{
      // Target port 3000 directly so Live Server on port 5500 can communicate with Node backend
      const res = await fetch('/api/chat', {       method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({message:userText, history})
      });
      if(!res.ok) throw new Error('backend error');
      const data=await res.json();
      return data.reply || localFallback(userText);
    }catch(err){
      return localFallback(userText);
    }
  }

  async function sendMessage(){
    const text=input.value.trim();
    if(!text) return;
    addMsg(text, 'user');
    input.value='';

    const typing=document.createElement('div');
    typing.className='typing';
    typing.innerHTML='<span></span><span></span><span></span>';
    body.appendChild(typing);
    body.scrollTop=body.scrollHeight;

    const reply=await getReply(text);
    typing.remove();
    addMsg(reply, 'bot');
  }

  send.addEventListener('click', sendMessage);
  input.addEventListener('keydown', e=>{ if(e.key==='Enter') sendMessage(); });
})();