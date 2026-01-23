document.addEventListener("visibilitychange", () => {
  if (document.hidden) lastSend = 0;
});