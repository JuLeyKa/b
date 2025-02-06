/* Filename: js/main.js */
document.addEventListener('DOMContentLoaded', () => {

  (function(d, t) {
    const v = d.createElement(t);
    const s = d.getElementsByTagName(t)[0];

    v.onload = function() {
      window.voiceflow.chat.load({
        verify: { 
          // Deine Voiceflow-Projekt-ID
          projectID: '679f87050cacc3ebde036d21'
        },
        // Die URL und Version
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        
        // Hier überschreiben wir die Standard-Angaben
        assistant: {
          title: "Juleyka",                        // Neuer Name
          description: "Dein persönlicher KI-Assistent", // Beschreibung
          image: "https://deinbild.com/juleyka.png"      // Optionales Bild
          // color: "#123456"                       // Falls du die Chat-Farbe anpassen willst
        }
      });
    };

    // STABILE Bibliothek laden (ohne "-next")
    v.src = "https://cdn.voiceflow.com/widget/bundle.mjs"; 
    v.type = "text/javascript";
    s.parentNode.insertBefore(v, s);

  })(document, 'script');

});
