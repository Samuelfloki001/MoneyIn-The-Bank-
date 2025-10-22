// Load user info
auth.onAuthStateChanged(user => {
    if(user){
        const userRef = db.ref('users/' + user.uid);
        userRef.on('value', snapshot=>{
            const data = snapshot.val();
            if(data){
                document.getElementById('username').textContent = data.name;
                document.getElementById('userid').textContent = 'ID: '+data.id;
                document.getElementById('profilePic').src = data.profilePic || '';
            }
        });
    } else {
        window.location.href='login.html';
    }
});
document.getElementById('editProfileBtn').addEventListener('click', ()=>window.location.href='profile.html');
