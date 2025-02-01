/* Filename: js/cookie.js */
document.addEventListener('DOMContentLoaded', () => {
  const cookiePopup = document.getElementById('cookiePopup');
  const cookieAccept = document.getElementById('cookieAccept');

  // Prüfe, ob die Cookie-Einwilligung bereits erfolgt ist
  if (localStorage.getItem('cookieConsent')) {
    cookiePopup.style.display = 'none';
  }

  cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'true');
    cookiePopup.style.display = 'none';
  });
});
