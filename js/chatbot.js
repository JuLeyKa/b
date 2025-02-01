/* Filename: js/chatbot.js */
document.addEventListener('DOMContentLoaded', () => {
  const chatbot = document.getElementById('chatbot');
  const minimizeBtn = document.getElementById('chatbotMinimize');
  const closeBtn = document.getElementById('chatbotClose');
  const sendBtn = document.getElementById('sendMessage');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatbotMessages');
  const launcher = document.getElementById('chatbotLauncher');

  // Chatverlauf laden – falls vorhanden
  let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
  chatHistory.forEach(message => {
    addMessage(message.sender, message.text, false);
  });

  // Minimieren / Wiederherstellen
  minimizeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!chatbot.classList.contains('minimized')) {
      // Vor Minimierung könnte man auch die aktuelle Position speichern, falls nötig.
      chatbot.classList.add('minimized');
      // Setze den Chat an eine feste, "schöne" Position (hier: untere rechte Ecke)
      chatbot.style.left = '';
      chatbot.style.top = '';
      chatbot.style.bottom = '20px';
      chatbot.style.right = '20px';
    } else {
      // Wiederherstellen: entferne den minimized-Zustand und setze die ursprüngliche Position zurück.
      chatbot.classList.remove('minimized');
      chatbot.style.bottom = '';
      chatbot.style.right = '';
      // Optional: Falls du die ursprüngliche Position speichern möchtest, kannst du diese hier wieder einsetzen.
    }
  });

  // Chat schließen – Chatfenster ausblenden, Launcher anzeigen und Verlauf löschen
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    chatbot.style.display = 'none';
    launcher.style.display = 'block';
    localStorage.removeItem('chatHistory');
    chatMessages.innerHTML = '';
    chatHistory = [];
  });

  // Chat per Launcher wieder öffnen
  launcher.addEventListener('click', () => {
    chatbot.style.display = 'flex';
    launcher.style.display = 'none';
  });

  // Nachricht senden (Button)
  sendBtn.addEventListener('click', () => {
    sendUserMessage();
  });

  // Nachricht senden (Enter-Taste)
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendUserMessage();
    }
  });

  function sendUserMessage() {
    const text = chatInput.value.trim();
    if (text === '') return;
    addMessage('user', text, true);
    chatInput.value = '';
    // Demo: Bot-Antwort nach 1 Sekunde
    setTimeout(() => {
      addMessage('bot', 'Danke für deine Nachricht. Wir melden uns in Kürze.', true);
    }, 1000);
  }

  /**
   * Fügt eine Nachricht in den Chat ein und speichert sie (falls save true ist)
   * @param {string} sender - 'user' oder 'bot'
   * @param {string} msg - Die Nachricht
   * @param {boolean} [save=true] - Ob die Nachricht gespeichert werden soll
   */
  function addMessage(sender, msg, save = true) {
    const div = document.createElement('div');
    div.classList.add('message', sender);
    div.textContent = msg;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    if (save) {
      chatHistory.push({ sender: sender, text: msg });
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }
  }
});
