// js/register.js
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { app } from "./firebase-config.js";

// Wenn der DOM geladen ist
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const registerMessage = document.getElementById("registerMessage");

  // Submit-Event vom Registrierungsformular abfangen
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const auth = getAuth(app);

      // Benutzer erzeugen
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      registerMessage.textContent = "Registrierung erfolgreich! Bitte bestätige deine E-Mail.";
      registerMessage.style.color = "green";

      // E-Mail-Bestätigung senden
      await sendEmailVerification(user);
      console.log("Bestätigungs-E-Mail gesendet.");

      // Nach 2 Sekunden weiterleiten
      setTimeout(() => {
        window.location.href = "member.html";
      }, 2000);

    } catch (error) {
      registerMessage.textContent = "Fehler: " + error.message;
      registerMessage.style.color = "red";
    }
  });
});
