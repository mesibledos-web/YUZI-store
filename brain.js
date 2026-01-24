// brain.js
const yuziBrain = (() => {
  const memoryContext = 20; // konteks percakapan terakhir
  const randomChoice = arr => arr[Math.floor(Math.random() * arr.length)];

  // Knowledge base offline
  const knowledge = {
    sains: [
      "Fisika: Hukum Newton menjelaskan gerak benda. Contoh: gaya F = m*a.",
      "Kimia: Reaksi kimia melibatkan perubahan zat, misal H2 + O2 → H2O.",
      "Biologi: Sel adalah unit dasar kehidupan.",
      "Matematika: Rumus Pythagoras a²+b²=c², berguna untuk segitiga siku-siku.",
      "Listrik: Arus listrik adalah aliran elektron melalui konduktor.",
      "AI: Kecerdasan buatan memproses data, belajar dari pengalaman, dan bisa membuat prediksi."
    ],
    sejarah: [
      "Revolusi Industri mengubah dunia pada abad ke-18.",
      "Albert Einstein menemukan teori relativitas.",
      "Perang Dunia II berlangsung 1939-1945.",
      "Michael Faraday menemukan prinsip induksi elektromagnetik."
    ],
    teknologi: [
      "CPU adalah otak komputer, memproses semua instruksi.",
      "Internet menghubungkan jutaan perangkat di dunia.",
      "Blockchain adalah teknologi ledger terdesentralisasi.",
      "AI modern memanfaatkan deep learning untuk analisis data besar."
    ],
    humor: [
      "Kenapa komputer tidak bisa tidur? Karena selalu standby!",
      "AI suka kopi, karena bisa debug sambil ngopi!",
      "Algoritma juga butuh hiburan!"
    ],
    tips: [
      "Bagi masalah menjadi langkah kecil, kerjakan satu per satu.",
      "Konsistensi adalah kunci belajar skill baru.",
      "Catat progres dan evaluasi hasil setiap hari."
    ],
    perasaan: [
      "Dengarkan hati, komunikasikan jujur.",
      "Empati dan perhatian membuat ikatan lebih kuat.",
      "Fokus ke solusi daripada menyalahkan."
    ]
  };

  // Fungsi untuk mencari kata kunci dalam knowledge base
  function searchKnowledge(msg) {
    const all = Object.values(knowledge).flat();
    const found = all.find(k => k.toLowerCase().includes(msg.toLowerCase()));
    return found ? found : null;
  }

  // Fungsi reasoning sederhana step-by-step untuk pertanyaan logika
  function reasoning(msg, memory) {
    const lastUser = memory.filter(m => m.type === "user").slice(-memoryContext).map(m => m.text);
    let answer = searchKnowledge(msg);
    if(answer) return `🤓 Menurut YUZI AI: ${answer}\n${lastUser.length?`Konteks: ${lastUser.join("; ")}`:""}`;
    
    // Jika tidak ada, buat reasoning generik
    if(msg.startsWith("apa ") || msg.startsWith("siapa ") || msg.startsWith("dimana ") || msg.startsWith("kapan ") || /^(mengapa|kenapa)/.test(msg) || msg.startsWith("bagaimana ")) {
      return `🤓 Menurut YUZI AI:\n1️⃣ Pertama, kita analisa pertanyaan: "${msg}"\n2️⃣ Pertimbangkan konteks dan fakta terkait.\n3️⃣ Coba tarik kesimpulan logis.\n4️⃣ Jika masih kurang jelas, tanyakan detail lebih spesifik.\n${lastUser.length?`Referensi percakapan: ${lastUser.join("; ")}`:""}`;
    }

    return null;
  }

  function getReply(msg, memory) {
    const lowerMsg = msg.trim().toLowerCase();

    // Pengenalan pencipta
    if (/siapa (membuat|mencipta|pencipta|pembuatmu)/.test(lowerMsg))
      return "Aku diciptakan oleh DIMAS AZKA 🤓 Maha Tau!";

    // Salam
    if (/halo|hai|hi|selamat pagi|selamat siang|selamat malam/.test(lowerMsg))
      return randomChoice([
        "Halo! Aku YUZI AI 🤓, siap menjawab pertanyaanmu.",
        "Hai! 🤓 Aku YUZI AI, selalu siap membantu.",
        "Salam! Aku YUZI AI 🤓, bisa menjawab apa saja."
      ]);

    // Humor
    if (/joke|lucu|humor|ngakak/.test(lowerMsg))
      return randomChoice(knowledge.humor);

    // Tips / Tutorial
    if (/tips|trik|cara|tutorial/.test(lowerMsg))
      return randomChoice(knowledge.tips);

    // Perasaan / Hubungan
    if (/cinta|suka|sayang|teman|pacar/.test(lowerMsg))
      return randomChoice(knowledge.perasaan);

    // Sains / Teknologi / Matematika / AI
    if (/fizik|kimia|biologi|matematika|ilmu|teknologi|ai|komputer|listrik/.test(lowerMsg))
      return reasoning(msg, memory);

    // Sejarah
    if (/sejarah|tahun|perang|penemuan|tokoh|bangsa/.test(lowerMsg))
      return reasoning(msg, memory);

    // Pertanyaan logika generik
    const r = reasoning(msg, memory);
    if(r) return r;

    // Default fallback
    return `Aku mendengar kamu: "${msg}".\nAku YUZI AI 🤓 Maha Tau.\n${memory.length?`Referensi percakapan: ${memory.filter(m=>m.type==="user").slice(-memoryContext).map(m=>m.text).join("; ")}`:""}\nTanya lebih lanjut untuk jawaban detail.`;
  }

  return { getReply };
})();