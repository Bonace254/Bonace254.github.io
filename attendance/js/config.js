const firebaseConfig = {
  apiKey: "AIzaSyDfF8P_VJBjErRXXvR7DpgUTwB9WSof2qM",
  authDomain: "attendance-52c31.firebaseapp.com",
  databaseURL: "https://attendance-52c31-default-rtdb.firebaseio.com",
  projectId: "attendance-52c31",
  storageBucket: "attendance-52c31.firebasestorage.app",
  messagingSenderId: "538076553317",
  appId: "1:538076553317:web:efb448328074087856268c",
  measurementId: "G-BCPQGJRZNS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()

console.log ('connected to firebase')