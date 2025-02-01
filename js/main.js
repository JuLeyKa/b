/* Filename: js/main.js */
// Gemeinsame JS-Funktionen und z. B. Drag-and-Drop für den Chatbot

document.addEventListener('DOMContentLoaded', () => {
  const chatbot = document.getElementById('chatbot');
  const header = chatbot.querySelector('.chatbot-header');
  let isDragging = false;
  let offsetX, offsetY;

  header.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - chatbot.offsetLeft;
    offsetY = e.clientY - chatbot.offsetTop;
    chatbot.style.transition = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      chatbot.style.left = (e.clientX - offsetX) + 'px';
      chatbot.style.top = (e.clientY - offsetY) + 'px';
      chatbot.style.position = 'absolute';
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    chatbot.style.transition = 'all 0.3s ease';
  });
});
