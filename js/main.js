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

  // Voiceflow Chatbot einbinden
  (function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
      v.onload = function() {
        window.voiceflow.chat.load({
          verify: { projectID: '679f87050cacc3ebde036d21' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production'
        });
      }
      v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; 
      v.type = "text/javascript"; 
      s.parentNode.insertBefore(v, s);
  })(document, 'script');
});
