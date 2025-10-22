// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDi2_nhoZ0WY0Jwv4BkD9HL6_ZOS8bG0so',
  authDomain: 'money-in-the-bank-f0c53.firebaseapp.com',
  projectId: 'money-in-the-bank-f0c53',
  storageBucket: 'money-in-the-bank-f0c53.appspot.com',
  messagingSenderId: '429059379127',
  appId: '1:429059379127:web:YOUR_APP_ID'
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.database();
const storage = firebase.storage();
