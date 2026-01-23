const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");

function addMsg(text, type) {
  const div = document.createElement("div");
  div.className = `msg ${type}`;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function botReply(userText) {
  // SIMULASI AI (bisa diganti API)
  setTimeout(() => {
    addMsg(`🤖 ${CONFIG.botName}: Aku menerima pesanmu:\n"${userText}"`, "bot");
  }, 600);
}

function send() {
  const text = input.value.trim();
  if (!text) return;

  addMsg(text, "user");
  input.value = "";

  botReply(text);
}

sendBtn.onclick = send;

input.addEventListener("keydown", e => {
  if (e.key === "Enter") send();
});

// Pesan awal
addMsg("Halo 👋 Aku MODI AI. Tanyakan apa saja!", "bot");