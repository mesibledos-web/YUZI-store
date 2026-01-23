const chat = document.getElementById("chat");
const input = document.getElementById("input");

/* ================================
   🔑 API KEY GEMINI
   TEMPEL API KEY KAMU DI SINI
================================ */
const API_KEY = "AIzaSyBpYtlmilyRJsFWhmliiH2SUunnSmPqYKE";

/* ================================
   END API KEY
================================ */

const API_URL =
`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// Memory percakapan (ChatGPT-style)
let history = [
  {
    role: "user",
    parts: [{
      text: `Kamu adalah AI seperti ChatGPT.
Ramah, pintar, santai, asik diajak ngobrol.
Jawaban jelas, lengkap, dan mudah dipahami.
Gunakan Bahasa Indonesia.`
    }]
  }
];

// Tambah pesan ke chat
function add(text, type) {
  const div = document.createElement("div");
  div.className = `msg ${type}`;
  div.textContent = text; // aman (anti XSS)
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// Kirim pesan
async function send() {
  const text = input.value.trim();
  if (!canSend(text)) return;

  add(text, "user");
  input.value = "";

  const typing = document.createElement("div");
  typing.className = "msg bot";
  typing.textContent = "🤖 AI sedang mengetik...";
  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;

  history.push({ role: "user", parts: [{ text }] });

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: history,
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 800
        }
      })
    });

    if (!res.ok) throw new Error("API ERROR");

    const data = await res.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text
      || "⚠️ AI tidak memberi jawaban.";

    typing.remove();
    add(reply, "bot");

    history.push({
      role: "model",
      parts: [{ text: reply }]
    });

  } catch (err) {
    typing.remove();
    add("⚠️ Koneksi AI bermasalah, coba lagi.", "bot");
  }
}