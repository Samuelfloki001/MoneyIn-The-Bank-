// Load and update profile from Firebase
auth.onAuthStateChanged(user => {
    if(user){
        const userRef = db.ref('users/' + user.uid);
        userRef.once('value', snapshot => {
            const data = snapshot.val();
            if(data){
                document.getElementById('usernameInput').value = data.name;
                document.getElementById('profilePic').src = data.profilePic || '';
            }
        });

        document.getElementById('saveProfileBtn').addEventListener('click', () => {
            const newName = document.getElementById('usernameInput').value;
            const fileInput = document.getElementById('profilePicInput');

            if(fileInput.files.length > 0){
                const file = fileInput.files[0];
                const storageRef = storage.ref('profilePics/' + user.uid);
                storageRef.put(file).then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
                    userRef.update({ name: newName, profilePic: url });
                    alert('Profile updated!');
                });
            } else {
                userRef.update({ name: newName });
                alert('Profile updated!');
            }
        });
    } else {
        window.location.href = 'login.html';
    }
});
