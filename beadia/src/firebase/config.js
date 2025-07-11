// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6bxLSdd5X9F9xa4RUoK-De2hY7lIe-AU",
  authDomain: "beadia-b89fe.firebaseapp.com",
  projectId: "beadia-b89fe",
  storageBucket: "beadia-b89fe.firebasestorage.app",
  messagingSenderId: "812728991034",
  appId: "1:812728991034:web:63b3350de7a11337d6a403",
  measurementId: "G-SKC5PWQHZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; 