// js/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Deine Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyC3yHFXPLtlod0lfYrM7s5_s3zoUMd0rfM",
  authDomain: "juleykawebsite.firebaseapp.com",
  projectId: "juleykawebsite",
  storageBucket: "juleykawebsite.firebasestorage.app",
  messagingSenderId: "520059467518",
  appId: "1:520059467518:web:740385071b364b18b557af",
  measurementId: "G-VTRHVWNNKN"
};

// Initialisiere Firebase und Analytics
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exportiere das app-Objekt für die anderen Module
export { app };
