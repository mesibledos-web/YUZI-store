// brain.js
const yuziBrain = (() => {
  const memoryContext = 20;
  const randomChoice = arr => arr[Math.floor(Math.random()*arr.length)];
  const knowledge = {
    sains: [
      "Fisika: Hukum Newton menjelaskan gerak benda.",
      "Kimia: Reaksi kimia melibatkan perubahan zat.",
      "Biologi: Sel adalah unit dasar kehidupan.",
      "Matematika: Rumus Pythagoras a²+b²=c²",
      "AI: AI membantu pekerjaan tapi perlu data dan algoritma jelas."
    ],
    sejarah: [
      "Sejarah: Revolusi Industri mengubah dunia.",
      "Tokoh: Albert Einstein menemukan teori relativitas.",
      "Perang: Perang Dunia II terjadi 1939-1945.",
      "Penemuan: Listrik oleh Michael Faraday dan Nikola Tesla."
    ],
    teknologi: [
      "Komputer: CPU adalah otak komputer.",
      "Internet: Menghubungkan jutaan perangkat di dunia.",
      "Blockchain: Teknologi ledger terdesentralisasi."
    ],
    humor: [
      "Kenapa komputer tidak bisa tidur? Karena selalu standby!",
      "AI suka kopi karena bisa debug sambil ngopi!",
      "Algoritma juga butuh hiburan!"
    ],
    tips: [
      "Bagi masalah jadi langkah kecil, kerjakan satu per satu.",
      "Konsistensi adalah kunci belajar skill baru.",
      "Catat progres dan evaluasi hasil setiap hari."
    ],
    perasaan: [
      "Dengarkan hati, komunikasikan jujur.",
      "Empati dan perhatian membuat ikatan lebih kuat.",
      "Fokus ke solusi daripada menyalahkan."
    ]
  };

  function getReply(msg, memory) {
    const lastUser = memory.filter(m=>m.type==="user").slice(-memoryContext).map(m=>m.text);
    msg = msg.trim().toLowerCase();

    if(/siapa (membuat|mencipta|pencipta|pembuatmu)/.test(msg))
      return "Aku diciptakan oleh DIMAS AZKA 🤓 Maha Tau!";

    if(/halo|hai|hi|selamat pagi|selamat siang|selamat malam/.test(msg))
      return randomChoice([
        "Halo! Aku YUZI AI 🤓, siap menjawab pertanyaanmu.",
        "Hai! 🤓 Aku YUZI AI, selalu siap membantu.",
        "Salam! Aku YUZI AI 🤓, bisa menjawab apa saja."
      ]);

    if(/joke|lucu|humor|ngakak/.test(msg)) return randomChoice(knowledge.humor);
    if(/tips|trik|cara|tutorial/.test(msg)) return randomChoice(knowledge.tips);
    if(/cinta|suka|sayang|teman|pacar/.test(msg)) return randomChoice(knowledge.perasaan);
    if(/fizik|kimia|biologi|matematika|ilmu|teknologi|AI|komputer/.test(msg))
      return randomChoice([...knowledge.sains,...knowledge.teknologi]);
    if(/sejarah|tahun|perang|penemuan|tokoh|bangsa/.test(msg)) return randomChoice(knowledge.sejarah);

    if(msg.startsWith("apa ")) return `🤓 Jawaban YUZI AI: "${msg}"\nLangkah-langkah: ...\n${lastUser.length?`Konteks: ${lastUser.join("; ")}`:""}`;
    if(msg.startsWith("siapa ")) return `🤓 Jawaban YUZI AI: "${msg}"\nIdentitas/deskripsi: ...`;
    if(msg.startsWith("dimana ")) return `🤓 Jawaban YUZI AI: Lokasi terkait: ...`;
    if(msg.startsWith("kapan ")) return `🤓 Jawaban YUZI AI: Waktu/tanggal: ...`;
    if(/^(mengapa|kenapa)/.test(msg)) return `🤓 Jawaban YUZI AI: Sebab-akibat: ...`;
    if(msg.startsWith("bagaimana ")) return `🤓 Jawaban YUZI AI: Langkah-langkah: ...`;

    return `Aku mendengar kamu: "${msg}".\nAku YUZI AI 🤓 Maha Tau.\n${lastUser.length?`Referensi: ${lastUser.join("; ")}`:""}\nTanya lebih lanjut jika ingin contoh spesifik.`;
  }

  return { getReply };
})();