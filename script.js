const chat = document.getElementById("chat");
const input = document.getElementById("input");

/* ================================
   🔑 API KEY GEMINI
================================ */
const API_KEY = "AIzaSyB7WI_tFPnpa1_AyDpiNtOhoXkzZoihANo";
/* ================================ */

const API_URL =
`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// ===== STATE =====
let aiMode = localStorage.getItem("aiMode") || "friendly";
let aiLang = localStorage.getItem("aiLang") || "id";
let isTyping = false;

// ===== MEMORY =====
let history = JSON.parse(localStorage.getItem("history")) || [
  { role:"model", parts:[{ text:"Kamu AI pintar, ramah, dan SELALU menjawab apa pun." }] }
];

// ===== SAVE =====
function save(){
  localStorage.setItem("history", JSON.stringify(history));
  localStorage.setItem("aiMode", aiMode);
  localStorage.setItem("aiLang", aiLang);
}

// ===== UI ADD =====
function add(text,type,speak=false){
  const div = document.createElement("div");
  div.className = `msg ${type}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  if(type==="bot" && speak) speakText(text);
}

// ===== RESTORE CHAT =====
history.forEach(h=>{
  if(h.role==="model") add(h.parts[0].text,"bot");
});

// ===== TTS =====
function speakText(text){
  const u = new SpeechSynthesisUtterance(text);
  u.lang = aiLang==="id" ? "id-ID" : "en-US";
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

// ===== MIC =====
let rec;
if("webkitSpeechRecognition" in window){
  rec = new webkitSpeechRecognition();
  rec.lang="id-ID";
  rec.onresult=e=>{
    input.value = e.results[0][0].transcript;
    send();
  };
}

// ===== LOCAL AI =====
function localAI(text){
  const t=text.toLowerCase();
  if(t.includes("halo")) return "Halo 👋 aku aktif.";
  if(t.includes("siapa kamu")) return "Aku AI GOD++ buatan kamu 😎";
  return null;
}

// ===== FALLBACK =====
function fallbackAI(text){
  return `🤖 Aku tetap menjawab ya!

Pesan kamu:
"${text}"

AI utama sedang bermasalah tapi aku tetap di sini 😄`;
}

// ===== SEND =====
async function send(){
  if(isTyping) return;
  const text=input.value.trim();
  if(!text) return add("🤖 Ketik dulu 😄","bot");

  if(text.startsWith("/")){
    if(text==="/mic" && rec) rec.start();
    if(text==="/id") aiLang="id";
    if(text==="/en") aiLang="en";
    if(text==="/reset"){localStorage.clear();location.reload();}
    save();
    input.value="";
    return add("⚙️ Command diterima","bot");
  }

  add(text,"user");
  input.value="";
  isTyping=true;

  const typing=document.createElement("div");
  typing.className="msg bot";
  typing.textContent="🤖 AI berpikir...";
  chat.appendChild(typing);

  history.push({role:"user",parts:[{text}]});
  if(history.length>20) history=history.slice(-20);
  save();

  const local=localAI(text);
  if(local){
    typing.remove();
    add(local,"bot",true);
    history.push({role:"model",parts:[{text:local}]});
    save();
    isTyping=false;
    return;
  }

  try{
    const res=await fetch(API_URL,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({contents:history})
    });
    const data=await res.json();
    let reply=data?.candidates?.[0]?.content?.parts?.map(p=>p.text||"").join("").trim();
    if(!reply) reply=fallbackAI(text);

    typing.remove();
    add(reply,"bot",true);
    history.push({role:"model",parts:[{text:reply}]});
    save();
  }catch{
    typing.remove();
    add(fallbackAI(text),"bot",true);
  }
  isTyping=false;
}

// ===== ENTER =====
input.addEventListener("keydown",e=>{
  if(e.key==="Enter") send();
});
