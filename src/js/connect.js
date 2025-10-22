document.getElementById('sendChat').addEventListener('click', ()=>{
  const txt = document.getElementById('chatInput').value.trim();
  if (!txt) return;
  const area = document.getElementById('chatArea');
  const el = document.createElement('div'); el.innerText = 'You: ' + txt; el.style.margin='6px 0';
  area.appendChild(el); document.getElementById('chatInput').value='';
});
