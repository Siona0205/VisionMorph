// src/components/Spinner.jsx
import React from "react";

export default function Spinner({ size = 48 }) {
  return (
    <div style={{ width: size, height: size }} className="flex items-center justify-center">
      <svg className="animate-spin" width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="rgba(46,46,56,0.15)" strokeWidth="4"></circle>
        <path d="M22 12a10 10 0 00-10-10" stroke="rgba(222,200,255,0.95)" strokeWidth="4" strokeLinecap="round"></path>
      </svg>
    </div>
  );
}
