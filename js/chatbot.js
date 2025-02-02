/* Filename: js/chatbot.js */
document.addEventListener('DOMContentLoaded', () => {
  const chatbot = document.getElementById("chatbot");
  const minimizeBtn = document.getElementById("chatbotMinimize");
  const closeBtn = document.getElementById("chatbotClose");
  const sendBtn = document.getElementById("sendMessage");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatbotMessages");
  const launcher = document.getElementById("chatbotLauncher");

  // Lade den gespeicherten Chat-Zustand (open, minimized oder closed); Standard: closed
  let chatState = localStorage.getItem("chatState");
  if (!chatState) {
    chatState = "closed";
    localStorage.setItem("chatState", chatState);
  }
  if (chatState === "closed") {
    chatbot.style.display = "none";
    launcher.style.display = "block";
  } else if (chatState === "minimized") {
    chatbot.classList.add("minimized");
    chatbot.style.display = "flex";
    launcher.style.display = "none";
  } else { // "open"
    chatbot.style.display = "flex";
    chatbot.classList.remove("minimized");
    launcher.style.display = "none";
  }

  // Lade den gespeicherten Chatverlauf (falls vorhanden)
  let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
  chatHistory.forEach(message => {
    addMessage(message.sender, message.text, false);
  });

  // Schließen: Chatfenster ausblenden und Zustand speichern
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    chatbot.style.display = "none";
    launcher.style.display = "block";
    localStorage.setItem("chatState", "closed");
  });

  // Minimieren: Zustand zwischen minimiert und offen wechseln und speichern
  minimizeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!chatbot.classList.contains("minimized")) {
      chatbot.classList.add("minimized");
      localStorage.setItem("chatState", "minimized");
    } else {
      chatbot.classList.remove("minimized");
      localStorage.setItem("chatState", "open");
    }
  });

  // Launcher: Chatfenster öffnen und Zustand auf "open" setzen
  launcher.addEventListener("click", () => {
    chatbot.style.display = "flex";
    launcher.style.display = "none";
    chatbot.classList.remove("minimized");
    localStorage.setItem("chatState", "open");
  });

  // Nachricht senden per Button oder Enter-Taste
  sendBtn.addEventListener("click", sendUserMessage);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendUserMessage();
    }
  });

  async function sendUserMessage() {
    const text = chatInput.value.trim();
    if (text === "") return;
    addMessage("user", text, true);
    chatInput.value = "";

    // Sende POST-Request an die Netlify-Funktion
    try {
      const response = await fetch("/.netlify/functions/openai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userText: text })
      });
      if (!response.ok) {
        throw new Error(`Server Error: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.botReply) {
        addMessage("bot", data.botReply, true);
      } else {
        addMessage("bot", "Entschuldigung, etwas ist schiefgelaufen.", true);
      }
    } catch (err) {
      console.error(err);
      addMessage("bot", "Fehler beim Verbinden mit dem Server.", true);
    }
  }

  function addMessage(sender, msg, save = true) {
    const div = document.createElement("div");
    div.classList.add("message", sender);
    div.textContent = msg;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    if (save) {
      chatHistory.push({ sender, text: msg });
      localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }
  }
});
