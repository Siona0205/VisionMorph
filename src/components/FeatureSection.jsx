// src/components/FeatureSection.jsx
import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

/**
 * Props:
 * - id (string)
 * - title (string)
 * - options (array of strings)
 * - value (string or array)
 * - onChange (fn)
 * - multiple (bool)
 * - placeholder (string)
 */
export default function FeatureSection({ id, title, options = [], value, onChange, multiple = false, placeholder = "Describe..." }) {
  // info open function — opens google images for the term
  const openInfo = (term) => {
    const q = encodeURIComponent(term);
    window.open(`https://www.google.com/search?tbm=isch&q=${q}`, "_blank");
  };

  const handleCheck = (opt) => {
    if (multiple) {
      const set = new Set(Array.isArray(value) ? value : []);
      if (set.has(opt)) set.delete(opt);
      else set.add(opt);
      onChange(Array.from(set));
    } else {
      onChange(opt);
    }
  };

  return (
    <div className="glass p-4 rounded-xl w-full">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-aura-deep">{title}</h4>
        <button onClick={() => openInfo(title)} className="text-sm opacity-80 flex items-center gap-1">
          <AiOutlineInfoCircle /> examples
        </button>
      </div>

      <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
        {options.map((opt) => {
          const checked = multiple ? (Array.isArray(value) && value.includes(opt)) : (value === opt);
          return (
            <button
              key={opt}
              onClick={() => handleCheck(opt)}
              className={`text-sm text-left px-3 py-2 rounded-lg transition ${checked ? "bg-aurora-lavender/80 text-aura-deep" : "bg-white/60 text-aura-deep/90"} shadow-sm`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <div className="mt-3">
        <textarea
          placeholder={placeholder}
          value={value && typeof value === "string" && !options.includes(value) ? value : (Array.isArray(value) && value.find(v => !options.includes(v)) || "")}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 rounded-md text-sm border border-transparent focus:border-aurora-lavender/40"
          rows={2}
        />
        <div className="text-xs opacity-70 mt-1">Tip: use the box to write additional details (e.g., 'arched left eyebrow, faint scar on right cheek')</div>
      </div>
    </div>
  );
}
