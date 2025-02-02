// netlify/functions/openai-chat.js

// 1) Import von "node-fetch", damit in der Netlify-Funktion "fetch" verfügbar ist
const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    // Prüfen, ob die HTTP-Methode POST ist
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Only POST requests are allowed" }),
      };
    }

    // Body parsen -> userText entnehmen
    const { userText } = JSON.parse(event.body || "{}");

    // OpenAI API Key (aus deinen Netlify-Env-Variables)
    const apiKey = process.env.OPENAI_API_KEY;

    // Wenn keine Eingabe vorliegt ("erster Besuch"), Begrüßung vorgeben
    let finalUserText = userText?.trim();
    if (!finalUserText) {
      finalUserText = `
        Bitte starte diese Konversation mit einer freundlichen Begrüßung.
        Stelle dich als "Juleyka" vor und gib kurz einen Überblick über deine KI-Dienstleistungen.
      `;
    }

    // Anfrage an OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`, // Wichtig: dein API-Key
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", 
        // ↑ Wenn du GPT-4 nutzen willst, trag hier "gpt-4" ein (sofern dein Key Zugriff hat)
        messages: [
          {
            role: "system",
            content: `Du bist Juleyka, ein professioneller KI-Berater-Bot...`
          },
          {
            role: "user",
            content: finalUserText
          }
        ],
        // Optional: temperature, top_p etc. 
        // z.B. temperature: 0.7
      }),
    });

    // Falls etwas mit dem API-Aufruf schiefgeht
    if (!response.ok) {
      throw new Error(`Fehler bei der Anfrage an OpenAI: ${response.statusText}`);
    }

    // JSON-Antwort von OpenAI lesen
    const data = await response.json();
    // Das eigentliche Chatbot-Antwort-Textfeld
    const botReply = data.choices[0].message.content;

    // Ausgabe an den Aufrufer
    return {
      statusCode: 200,
      body: JSON.stringify({ botReply }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Server Error",
        details: err.message,
      }),
    };
  }
};
