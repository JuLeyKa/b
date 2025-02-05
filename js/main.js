/* Filename: js/main.js */
document.addEventListener('DOMContentLoaded', () => {

  // Voiceflow Chatbot einbinden (Projekt-ID anpassen, wenn nötig)
  (function(d, t) {
    const v = d.createElement(t), s = d.getElementsByTagName(t)[0];
    v.onload = function() {
      window.voiceflow.chat.load({
        verify: { projectID: '679f87050cacc3ebde036d21' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production'
      });
    };
    v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; 
    v.type = "text/javascript"; 
    s.parentNode.insertBefore(v, s);
  })(document, 'script');

});
