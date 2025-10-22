document.querySelectorAll('.menu-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        document.querySelector('.sidebar-container').classList.toggle('active');
    });
});
document.querySelectorAll('.sidebar-item').forEach(item=>{
    item.addEventListener('click', ()=>{
        document.querySelectorAll('.sidebar-item').forEach(i=>i.classList.remove('active'));
        item.classList.add('active');
    });
});
