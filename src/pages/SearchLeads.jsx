// src/pages/SearchLeads.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_BASE } from "../utils/api";
import { generateFakeProfile } from "../utils/fakeCriminalProfile";


export default function SearchLeads() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);


  // Image passed from Sketch.jsx
  const imageBase64 = location.state?.image;

  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");

  // 🚨 If user opens this page directly
  useEffect(() => {
    if (!imageBase64) {
      navigate("/sketch");
    }
  }, [imageBase64, navigate]);

  // 🔍 Fetch matches
  useEffect(() => {
    if (!imageBase64) return;

    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE}/search_criminals`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: imageBase64 }),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }

        const data = await res.json();
        setMatches(data.matches || []);
      } catch (err) {
        console.error(err);
        setError("Failed to search criminal database.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [imageBase64]);

  return (
    <div className="min-h-screen p-6 bg-aurora-bg">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="glass p-6 rounded-2xl mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">🔍 Top 5 Matches</h2>
          <button className="btn" onClick={() => navigate("/sketch")}>
            ← Back to Sketch
          </button>
        </div>

        {/* GENERATED IMAGE PREVIEW */}
        <div className="glass p-6 rounded-xl mb-6">
          <h3 className="font-semibold mb-3">🧾 Generated Sketch</h3>
          <img
            src={imageBase64}
            alt="Generated Sketch"
            className="max-w-xs rounded-lg border mx-auto"
          />
        </div>

        {/* LOADING */}
        {loading && (
          <div className="glass p-6 rounded-xl text-center">
            Searching criminal database…
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="glass p-6 rounded-xl text-red-600">
            {error}
          </div>
        )}

        {/* RESULTS */}
        {!loading && matches.length > 0 && (
          <div className="flex flex-col gap-4">
            {matches.map((m, i) => (
                <div
                    key={i}
                    className="glass p-4 rounded-xl flex gap-4 items-center cursor-pointer hover:scale-[1.01] transition"
                    onClick={() => setSelected(generateFakeProfile(m.id))}
                >

                {/* Criminal Image */}
                <img
                  src={m.image}
                  alt={m.id}
                  className="w-24 h-24 rounded-lg object-cover border"
                />

                {/* Info */}
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{m.id}</h4>

                  {/* Confidence Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all"
                      style={{ width: `${m.similarity}%` }}
                    />
                  </div>

                  <p className="text-sm mt-1">
                    Similarity: <strong>{m.similarity}%</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NO RESULTS */}
        {!loading && matches.length === 0 && !error && (
          <div className="glass p-6 rounded-xl text-center">
            No matches found.
          </div>
        )}

        {/* 🔎 CRIMINAL DETAILS PANEL */}
            {selected && (
            <div className="glass p-6 rounded-2xl mt-8">
                <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">🧾 Criminal Details</h3>
                <button className="btn" onClick={() => setSelected(null)}>
                    Close
                </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                <p><strong>Name:</strong> {selected.name}</p>
                <p><strong>Gender:</strong> {selected.gender}</p>
                <p><strong>Age:</strong> {selected.age}</p>
                <p><strong>Criminal Records:</strong> {selected.records}</p>
                </div>

                <div className="mt-4">
                <h4 className="font-semibold mb-2">🛑 Crimes Involved</h4>
                <ul className="list-disc ml-6">
                    {selected.crimes.map((c, i) => (
                    <li key={i}>{c}</li>
                    ))}
                </ul>
                </div>
            </div>
            )}

      </div>
    </div>
  );
}
