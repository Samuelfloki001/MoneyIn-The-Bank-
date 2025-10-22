import { auth, provider, db } from './firebase-config.js';
import { signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import { ref, get, set } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';

document.getElementById('googleBtn').addEventListener('click', async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const userRef = ref(db, 'users/' + user.uid);
        const snapshot = await get(userRef);
        if (!snapshot.exists()) {
            await set(userRef, {
                id: user.uid,
                name: user.displayName,
                email: user.email,
                profilePic: user.photoURL || '',
                balance: 5.0,
                status: 'Pending'
            });
        }
        document.getElementById('status').textContent = '✅ Login successful!';
        setTimeout(()=>window.location.href='home.html', 1000);
    } catch(err) {
        console.error(err);
        document.getElementById('status').textContent = '❌ Login failed: ' + err.message;
    }
});
