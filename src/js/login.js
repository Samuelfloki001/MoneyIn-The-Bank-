import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDi2_nhoZ0WY0Jwv4BkD9HL6_ZOS8bG0so",
    authDomain: "money-in-the-bank-f0c53.firebaseapp.com",
    projectId: "money-in-the-bank-f0c53",
    storageBucket: "money-in-the-bank-f0c53.appspot.com",
    messagingSenderId: "429059379127",
    appId: "1:429059379127:web:YOUR_REAL_APP_ID"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app);

document.addEventListener("DOMContentLoaded", ()=>{
    const btn = document.getElementById("googleBtn");
    const status = document.getElementById("status");
    if(!btn){ console.error("Google login button not found!"); return; }

    btn.addEventListener("click", async ()=>{
        try{
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userRef = ref(db, "users/"+user.uid);
            const snapshot = await get(userRef);
            if(!snapshot.exists()){
                await set(userRef, {id:user.uid,name:user.displayName,email:user.email,profilePic:user.photoURL||"",balance:5.0,status:"Pending"});
            }
            status.textContent = "✅ Login successful!";
            setTimeout(()=>window.location.href="home.html",1000);
        }catch(err){
            console.error(err);
            status.textContent = "❌ Login failed: "+err.message;
        }
    });
});
