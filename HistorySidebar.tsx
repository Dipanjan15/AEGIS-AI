@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Space Grotesk", var(--font-sans);
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}

/* Custom glowing effects */
.glow-cyan {
  box-shadow: 0 0 15px rgba(34, 211, 238, 0.15);
}
.glow-amber {
  box-shadow: 0 0 15px rgba(251, 191, 36, 0.15);
}
.glow-rose {
  box-shadow: 0 0 15px rgba(244, 63, 94, 0.15);
}

/* Custom scrollbars */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: rgba(24, 24, 27, 0.5);
}
::-webkit-scrollbar-thumb {
  background: rgba(63, 63, 70, 0.8);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(82, 82, 91, 0.8);
}
