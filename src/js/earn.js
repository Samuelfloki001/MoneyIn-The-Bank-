// Music player
const mp = document.getElementById('musicPlayer');
let files = [];
document.getElementById('musicFiles').addEventListener('change', e => {
    files = Array.from(e.target.files);
    if (files.length) { mp.src = URL.createObjectURL(files[0]); mp.play(); }
});

// Rewarded Ad logic
document.getElementById('watchReward').addEventListener('click', async () => {
    const u = JSON.parse(localStorage.getItem('mib_user')||'{}');
    if (!u || !u.name) { return alert('Please login first'); }

    // Web simulation
    u.balance = (u.balance||0) + 0.25; // simulate reward
    localStorage.setItem('mib_user', JSON.stringify(u));
    document.getElementById('earnStatus').innerText = 'Credited .25 (web demo)';

    // Android: trigger actual AdMob rewarded ad if running in app
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob) {
        try {
            const admob = window.Capacitor.Plugins.AdMob;
            await admob.showRewardVideo({
                adId: 'ca-app-pub-6394894143909202/9244546846'
            });
            // Credit after real ad watched
            u.balance += 0.25;
            localStorage.setItem('mib_user', JSON.stringify(u));
            document.getElementById('earnStatus').innerText = 'Credited .25 (real ad)';
        } catch(e) {
            console.error('AdMob failed', e);
        }
    }
});
