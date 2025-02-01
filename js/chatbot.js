/* Filename: js/chatbot.js */
document.addEventListener('DOMContentLoaded', () => {
  const sendMessageBtn = document.getElementById('sendMessage');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatbotMessages');
  const chatbotMinimize = document.getElementById('chatbotMinimize');

  sendMessageBtn.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message !== '') {
      addMessage('user', message);
      // Simuliere eine Bot-Antwort
      setTimeout(() => {
        addMessage('bot', "Danke für deine Nachricht. Wir melden uns in Kürze.");
      }, 1000);
      chatInput.value = '';
    }
  });

  function addMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Minimierungslogik: Toggle Chat-Fenster
  chatbotMinimize.addEventListener('click', () => {
    const chatbot = document.getElementById('chatbot');
    chatbot.classList.toggle('minimized');
  });
});
