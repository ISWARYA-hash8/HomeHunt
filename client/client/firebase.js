// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "mernestate-b1e84.firebaseapp.com",
  projectId: "mernestate-b1e84",
  storageBucket: "mernestate-b1e84.firebasestorage.app",
  messagingSenderId: "992597943613",
  appId: "1:992597943613:web:503a5085b0f9f385719154"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

