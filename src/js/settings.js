document.getElementById('logoutBtn')?.addEventListener('click', ()=>{ localStorage.removeItem('mib_user'); location.href='login.html'; })
