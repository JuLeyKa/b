/* Filename: js/chatbot.js */
document.addEventListener('DOMContentLoaded', () => {
  const chatbot = document.getElementById('chatbot');
  const minimizeBtn = document.getElementById('chatbotMinimize');
  const closeBtn = document.getElementById('chatbotClose');
  const sendBtn = document.getElementById('sendMessage');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatbotMessages');
  const launcher = document.getElementById('chatbotLauncher');

  // Minimieren / Wiederherstellen
  minimizeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    chatbot.classList.toggle('minimized');
  });

  // Chat schließen – verstecke Chatfenster und zeige Launcher
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    chatbot.style.display = 'none';
    launcher.style.display = 'block';
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
    addMessage('user', text);
    chatInput.value = '';
    // Demo-Antwort des Bots nach 1 Sekunde
    setTimeout(() => {
      addMessage('bot', 'Danke für deine Nachricht. Wir melden uns in Kürze.');
    }, 1000);
  }

  function addMessage(sender, msg) {
    const div = document.createElement('div');
    div.classList.add('message', sender);
    div.textContent = msg;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});
