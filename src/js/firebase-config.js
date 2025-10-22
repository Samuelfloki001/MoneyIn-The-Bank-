// Firebase modular v9
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getAuth, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import { getDatabase, ref, get, set } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDi2_nhoZ0WY0Jwv4BkD9HL6_ZOS8bG0so',
  authDomain: 'money-in-the-bank-f0c53.firebaseapp.com',
  projectId: 'money-in-the-bank-f0c53',
  storageBucket: 'money-in-the-bank-f0c53.appspot.com',
  messagingSenderId: '429059379127',
  appId: '1:429059379127:web:YOUR_APP_ID'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getDatabase(app);
