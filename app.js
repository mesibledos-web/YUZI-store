const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const themeBtn = document.getElementById("themeBtn");

let memory = [];

// ======= Dark/Light Mode =======
function setTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  themeBtn.innerText = isDark ? "☀️" : "🌙";
  localStorage.setItem("yuzi-theme", isDark ? "dark" : "light");
}

// Load preferensi user
const savedTheme = localStorage.getItem("yuzi-theme");
setTheme(savedTheme === "dark");

themeBtn.addEventListener("click", () => {
  setTheme(!document.body.classList.contains("dark"));
});

// ======= Chat Function =======
function saveMessage(text, type="user") {
  memory.push({text, type});
}

function addMsg(text, type="yuzi") {
  const div = document.createElement("div");
  div.className = type === "user" ? "user-msg" : "yuzi-msg";
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
  const msg = input.value.trim();
  if(!msg) return;

  addMsg(msg, "user");
  saveMessage(msg, "user");

  const reply = yuziBrain.getReply(msg, memory);

  addMsg(reply, "yuzi");
  saveMessage(reply, "yuzi");

  input.value = "";
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => {
  if(e.key === "Enter") sendMessage();
});