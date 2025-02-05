// js/login.js
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase-config.js";

// Wenn der DOM geladen ist
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const loginMessage = document.getElementById('loginMessage');

  // Auth-Objekt erstellen
  const auth = getAuth(app);

  // Submit-Event vom Login-Formular abfangen
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      // Nutzer anmelden
      await signInWithEmailAndPassword(auth, email, password);

      loginMessage.textContent = "Login erfolgreich! Willkommen im Mitgliederbereich.";
      loginMessage.style.color = "green";

      // Weiterleiten
      setTimeout(() => {
        window.location.href = "member.html";
      }, 2000);

    } catch (error) {
      loginMessage.textContent = "Login fehlgeschlagen: " + error.message;
      loginMessage.style.color = "red";
    }
  });
});
