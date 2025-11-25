// src/components/VoiceWave.jsx
import React from "react";

export default function VoiceWave({ listening }) {
  if (!listening) return null;

  return (
    <div className="mt-4 flex justify-center">
      <div className="relative w-20 h-20">
        {/* Outer pulsing ring */}
        <div className="absolute inset-0 rounded-full bg-pink-300/30 animate-ping"></div>

        {/* Inner glowing circle */}
        <div className="absolute inset-3 rounded-full bg-gradient-to-br from-pink-200 to-purple-300 shadow-xl blur-sm opacity-80 animate-pulse"></div>

        {/* Core dot */}
        <div className="absolute inset-6 rounded-full bg-white/90 shadow-lg"></div>
      </div>
    </div>
  );
}
