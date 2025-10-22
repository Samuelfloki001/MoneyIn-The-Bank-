// Sidebar toggle & navigation
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const sidebar = document.querySelector('.sidebar-container');
    if(menuBtn && sidebar){
        menuBtn.addEventListener('click', () => sidebar.classList.toggle('active'));
        sidebar.querySelectorAll('.sidebar-item').forEach(item => {
            item.addEventListener('click', () => {
                const view = item.dataset.view;
                if(view) location.href = view + '.html';
            });
        });
    }
});
