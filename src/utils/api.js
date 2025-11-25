// src/utils/api.js

// ⭐ Your LIVE backend URL (NO trailing slash)
export const API_BASE = "https://93dfe0dd993a.ngrok-free.app";

// Endpoint URLs
export const GENERATE_URL = `${API_BASE}/generate`;
export const EDIT_URL = `${API_BASE}/edit`;

// Generate sketch function
export async function generateSketch(prompt) {
  const res = await fetch(GENERATE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`❌ Server error: ${res.status} ${text}`);
  }

  const data = await res.json();

  if (data.image_base64) {
    return { type: "base64", data: data.image_base64 };
  }

  throw new Error("❌ Unexpected backend response (no image_base64)");
}

// Edit sketch function
export async function editSketch(prompt, imageBase64) {
  const res = await fetch(EDIT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
      image_base64: imageBase64,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`❌ Edit API error: ${res.status} ${text}`);
  }

  const data = await res.json();

  if (data.image_base64) {
    return { type: "base64", data: data.image_base64 };
  }

  throw new Error("❌ Unexpected backend response (no image_base64)");
}
