import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchResults() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state || !state.matches) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold">No search data found</h2>
        <button className="btn mt-4" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );
  }

  const { matches, queryImage } = state;

  return (
    <div className="min-h-screen p-8 bg-aurora-bg">
      <h1 className="text-3xl font-bold text-center mb-6">
        Criminal Database Matches
      </h1>

      {/* Query Image */}
      <div className="glass p-6 rounded-xl max-w-md mx-auto mb-8">
        <h3 className="text-xl font-semibold">Searched Sketch</h3>
        <img
          src={queryImage}
          alt="query"
          className="w-full mt-4 rounded-lg shadow-xl"
        />
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {matches.map((m, idx) => (
          <div
            key={idx}
            className="glass p-4 rounded-xl shadow-lg text-center"
          >
            <h4 className="font-semibold mb-2">
              Criminal ID: {m.file.replace(".jpg", "")}
            </h4>
            <p className="text-lg font-bold mb-3">
              Similarity: {m.similarity.toFixed(2)}%
            </p>

            {/* The criminal sketch files are local — we display placeholder for now */}
            <div className="w-full h-56 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="opacity-70">Sketch Not Displayed</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button className="btn" onClick={() => navigate("/sketch")}>
          Back to Sketch
        </button>
      </div>
    </div>
  );
}
