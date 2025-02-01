/* Filename: js/main.js */
document.addEventListener('DOMContentLoaded', () => {
  const chatbot = document.getElementById('chatbot');
  const header = chatbot.querySelector('.chatbot-header');
  
  let isDragging = false;
  let offsetX, offsetY;
  
  header.addEventListener('mousedown', (e) => {
    // Drag nur, wenn der Chat nicht minimiert ist und nicht auf einen Button geklickt wird
    if (chatbot.classList.contains('minimized')) return;
    if (e.target.tagName === 'BUTTON') return;
    isDragging = true;
    offsetX = e.clientX - chatbot.offsetLeft;
    offsetY = e.clientY - chatbot.offsetTop;
    chatbot.style.transition = 'none';
  });
  
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      // Während des Draggen: Position über left/top setzen
      chatbot.style.left = (e.clientX - offsetX) + 'px';
      chatbot.style.top = (e.clientY - offsetY) + 'px';
      chatbot.style.position = 'fixed';
    }
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      chatbot.style.transition = 'all 0.3s ease';
    }
  });
});
