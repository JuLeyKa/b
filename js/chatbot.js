/* Filename: js/chatbot.js */
document.addEventListener('DOMContentLoaded', () => {
  const chatbot = document.getElementById('chatbot');
  const minimizeBtn = document.getElementById('chatbotMinimize');
  const closeBtn = document.getElementById('chatbotClose');
  const sendBtn = document.getElementById('sendMessage');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatbotMessages');
  const launcher = document.getElementById('chatbotLauncher');

  // Lade den gespeicherten Chat-Zustand; Standardwert ist "closed"
  let chatState = localStorage.getItem('chatState');
  if (!chatState) {
    chatState = 'closed';
    localStorage.setItem('chatState', chatState);
  }
  // Setze den Chat je nach gespeichertem Zustand
  if (chatState === 'closed') {
    chatbot.style.display = 'none';
    launcher.style.display = 'block';
  } else if (chatState === 'minimized') {
    chatbot.classList.add('minimized');
    chatbot.style.display = 'flex';
    launcher.style.display = 'none';
  } else { // "open"
    chatbot.style.display = 'flex';
    chatbot.classList.remove('minimized');
    launcher.style.display = 'none';
  }

  // Chatverlauf laden (falls vorhanden)
  let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
  chatHistory.forEach(message => {
    addMessage(message.sender, message.text, false);
  });

  // Schließen-Button: Chatfenster ausblenden und Zustand speichern
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    chatbot.style.display = 'none';
    launcher.style.display = 'block';
    localStorage.setItem('chatState', 'closed');
  });

  // Minimieren-Button: Zwischen minimiert und offen wechseln und Zustand speichern
  minimizeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!chatbot.classList.contains('minimized')) {
      chatbot.classList.add('minimized');
      localStorage.setItem('chatState', 'minimized');
    } else {
      chatbot.classList.remove('minimized');
      localStorage.setItem('chatState', 'open');
    }
  });

  // Launcher-Button: Chatfenster öffnen und Zustand auf "open" setzen
  launcher.addEventListener('click', () => {
    chatbot.style.display = 'flex';
    launcher.style.display = 'none';
    chatbot.classList.remove('minimized');
    localStorage.setItem('chatState', 'open');
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
    // Demo-Antwort des Bots nach 1 Sekunde
    setTimeout(() => {
      addMessage('bot', 'Danke für deine Nachricht. Wir melden uns in Kürze.', true);
    }, 1000);
  }

  /**
   * Fügt eine Nachricht in den Chat ein und speichert sie ggf. im localStorage.
   * @param {string} sender - "user" oder "bot"
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
