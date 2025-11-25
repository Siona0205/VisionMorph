// src/components/ImageResult.jsx
import React from "react";

export default function ImageResult({ result, onDownload }) {
  if (!result) return null;
  const { type, data } = result;

  const src = type === "base64" ? data : data;

  return (
    <div className="glass p-4 rounded-xl mt-6 max-w-md">
      <div className="flex flex-col items-center gap-3">
        <div className="w-full flex items-center justify-center">
          <img src={src} alt="Generated sketch" className="max-w-full rounded-md shadow-md" />
        </div>
        <div className="flex gap-3">
          <button onClick={() => onDownload(result)} className="btn">Download</button>
        </div>
      </div>
    </div>
  );
}
