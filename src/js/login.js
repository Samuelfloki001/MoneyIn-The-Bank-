// Google Sign-In
document.getElementById('googleBtn').addEventListener('click', async () => {
    try {
        const result = await auth.signInWithPopup(provider);
        const user = result.user;
        const userRef = db.ref('users/' + user.uid);
        const snapshot = await userRef.once('value');
        if (!snapshot.exists()) {
            await userRef.set({
                id: user.uid,
                name: user.displayName,
                email: user.email,
                profilePic: user.photoURL || '',
                balance: 5.0,
                status: 'Pending'
            });
        }
        document.getElementById('status').textContent = '? Login successful!';
        setTimeout(()=>window.location.href='home.html',1000);
    } catch(err) {
        console.error(err);
        document.getElementById('status').textContent = '? Login failed: ' + err.message;
    }
});
