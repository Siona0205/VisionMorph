// src/components/FullScreenLoader.jsx
import React, { useEffect, useState } from "react";

export default function FullScreenLoader({ visible }) {
  const messages = [
    "VisionMorph is getting your vision ready…",
    "Hold on… crafting your sketch…",
    "Almost done… enhancing details…",
    "Final touches… stay with us!",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-gradient-to-br from-pastel-100/50 via-pastel-200/40 to-pastel-300/50 animate-fadeIn">
      <div className="glass rounded-2xl p-8 w-[90%] max-w-md text-center animate-slideUp">
        <div className="mx-auto mb-6 w-12 h-12 border-4 border-white/50 border-t-transparent rounded-full animate-spin" />
        <p className="text-xl font-semibold fadeText">{messages[index]}</p>
      </div>

      {/* Animations */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.4s ease forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease forwards;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fadeText {
          animation: fadeText 2s ease infinite;
        }
        @keyframes fadeText {
          0% { opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
