// 1) Falls lokal getestet wird, lade Umgebungsvariablen aus `.env`
require("dotenv").config();

// 2) OpenAI API Key abrufen
const apiKey = process.env.OPENAI_SECRET_KEY;

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

    // Wenn keine Eingabe vorliegt ("erster Besuch"), Begrüßung vorgeben
    let finalUserText = userText?.trim();
    if (!finalUserText) {
      finalUserText = `
        Bitte starte diese Konversation mit einer freundlichen Begrüßung.
        Stelle dich als "Juleyka" vor und gib kurz einen Überblick über deine KI-Dienstleistungen.
      `;
    }

    // Anfrage an OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Du bist Juleyka, ein professioneller KI-Berater-Bot...`,
          },
          {
            role: "user",
            content: finalUserText,
          },
        ],
      }),
    });

    // Falls etwas mit dem API-Aufruf schiefgeht
    if (!response.ok) {
      throw new Error(`Fehler bei der Anfrage an OpenAI: ${response.statusText}`);
    }

    // JSON-Antwort von OpenAI lesen
    const data = await response.json();
    const botReply = data.choices[0].message.content;

    // Antwort zurückgeben
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
