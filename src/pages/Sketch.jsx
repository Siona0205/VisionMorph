// src/pages/Sketch.jsx
import React, { useState } from "react";
import FeatureSection from "../components/FeatureSection";
import ImageResult from "../components/ImageResult";
import Spinner from "../components/Spinner";
// import { generateSketch } from "../utils/api";
import FullScreenLoader from "../components/FullScreenLoader";
import VoiceWave from "../components/VoiceWave";
import { generateSketch, searchCriminals } from "../utils/api";



// ⭐ INITIAL FORM STATE
const initialState = {
  gender: "",
  age: "",
  faceShape: "",
  hair: "",
  hair_text: "",
  hairline: "",
  forehead: "",
  eyebrows: "",
  eyes: "",
  nose: "",
  cheeks: "",
  lips: "",
  jaw: "",
  skin: "",
  ears: "",
  facial_hair: "",
  accessories: "",
  expression: "",
  notes: "",
};

export default function Sketch() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [changeReq, setChangeReq] = useState("");

  // ⭐ NEW STATES FOR VOICE INPUT
  const [voiceText, setVoiceText] = useState("");
  const [listening, setListening] = useState(false);

// ⭐ STATES FOR SEARCHING CRIMINALS
  const [searching, setSearching] = useState(false);
const [matches, setMatches] = useState([]);


  // ⭐ HELPERS
  const setField = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  // ⭐ BUILD PROMPT
  const buildPrompt = (extra = "") => {
    const parts = [];

    if (form.gender) parts.push(form.gender.toLowerCase());
    if (form.age) parts.push(`in the age group of ${form.age.toLowerCase()}`);
    if (form.faceShape) parts.push(`with a ${form.faceShape.toLowerCase()} face shape`);
    if (form.hair_text || form.hair)
      parts.push(`having ${(form.hair_text || form.hair).toLowerCase()} hair`);
    if (form.hairline) parts.push(`a ${form.hairline.toLowerCase()} hairline`);
    if (form.forehead) parts.push(`a ${form.forehead.toLowerCase()} forehead`);
    if (form.eyebrows) parts.push(`${form.eyebrows.toLowerCase()} eyebrows`);
    if (form.eyes) parts.push(`${form.eyes.toLowerCase()} eyes`);
    if (form.nose) parts.push(`a ${form.nose.toLowerCase()} nose`);
    if (form.cheeks) parts.push(`${form.cheeks.toLowerCase()} cheeks`);
    if (form.lips) parts.push(`${form.lips.toLowerCase()} lips`);
    if (form.jaw) parts.push(`a ${form.jaw.toLowerCase()} jawline`);
    if (form.skin) parts.push(`${form.skin.toLowerCase()} skin`);
    if (form.ears) parts.push(`${form.ears.toLowerCase()} ears`);
    if (form.facial_hair) parts.push(`${form.facial_hair.toLowerCase()}`);
    if (form.accessories)
      parts.push(`wearing ${form.accessories.toLowerCase()}`);
    if (form.expression)
      parts.push(`with a ${form.expression.toLowerCase()} expression`);
    if (form.notes) parts.push(form.notes.toLowerCase());

    let description = parts.join(", ");

    if (description.length > 0)
      description = description.charAt(0).toUpperCase() + description.slice(1);

    if (extra && extra.trim().length > 0) {
      description += `. Additionally, apply these requested changes: ${extra.toLowerCase()}.`;
    }

    description +=
      ". Generate a real pencil sketch with accurate proportions, plain neutral background, and precise facial detailing.";

    console.log("Generated prompt:", description);
    return description;
  };

  // ⭐ GENERATE SKETCH
  const handleGenerate = async (extra = "") => {
    setError("");
    setLoading(true);

    const prompt = buildPrompt(extra);

    try {
      const res = await generateSketch(prompt);
      let data = res.data;
      if (!data.startsWith("data:")) {
        data = `data:image/png;base64,${data}`;
      }
      setResult({ type: "base64", data });
    } catch (err) {
      console.error("Generate error:", err);
      setError(err.message || "Unknown error while generating sketch");
    } finally {
      setLoading(false);
    }
  };

  // ⭐ SEARCH CRIMINALS
  const handleSearchCriminals = async () => {
    if (!result?.data) return;

    try {
      setSearching(true);
      setError("");

      const response = await searchCriminals(result.data);
      setMatches(response.matches || []);
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message || "Failed to search criminals");
    } finally {
      setSearching(false);
    }
  };


  // ⭐ DOWNLOAD
  const handleDownload = async (res) => {
    try {
      if (res.type === "base64") {
        const dataUrl = res.data.startsWith("data:")
          ? res.data
          : `data:image/png;base64,${res.data}`;
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `visionmorph_sketch_${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        const resp = await fetch(res.data);
        const blob = await resp.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `visionmorph_sketch_${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Download failed", err);
      alert("Failed to download image.");
    }
  };

  // ⭐ NEW — Voice-to-Text
  const startVoiceInput = () => {
    try {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        alert("Speech Recognition is not supported in this browser.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = true;
      recognition.continuous = false;

      setVoiceText("");
      setListening(true);

      recognition.onresult = (event) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setVoiceText(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        alert("Voice recognition error. Try again.");
        setListening(false);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      alert("Voice recognition is not available.");
    }
  };

  // ⭐ DROPDOWN OPTIONS (unchanged)
  const faceShapes = ["Oval","Round","Square","Heart-shaped","Diamond","Triangular","Long/Oblong"];
  const hairOptions = ["Short","Medium","Long","Very long","Bald","Straight","Wavy","Curly","Coily","Kinky"];
  const hairlineOpts = ["Straight","Widow’s peak","Receding","Rounded"];
  const foreheadOpts = ["High","Low","Broad","Narrow","Average","Smooth","Wrinkled","Creased"];
  const eyebrowOpts = ["Straight","Curved","Arched","Angled","S-shaped","Thin","Medium","Thick","Close-set","Wide-set"];
  const eyeOpts = ["Almond","Round","Monolid","Hooded","Downturned","Upturned","Deep-set","Wide-set","Close-set","Protruding"];
  const eyeColorOpts = ["Brown","Black","Hazel","Blue","Green","Gray","Amber/mixed"];
  const noseOpts = ["Small","Medium","Large","Short","Long","Straight","Aquiline","Roman","Button","Snub","Flat","Hooked","Bulbous","Broad","Narrow","Upturned","Downturned"];
  const cheekOpts = ["High","Low","Prominent","Subtle","Full","Hollow","Average"];
  const lipOpts = ["Thin","Medium","Full","Wide","Narrow","Plump","Cupid’s bow"];
  const jawOpts = ["Strong/Square","Soft/Rounded","Narrow","Pointed","Wide"];
  const skinOpts = ["Fair","Light","Medium","Olive","Brown","Dark","Ebony","Warm undertone","Cool undertone","Neutral undertone","Smooth","Oily","Dry","Wrinkled","Scarred","Freckled"];
  const earOpts = ["Small","Medium","Large","Round","Pointed","Lobed","Attached","Detached"];
  const facialHairOpts = ["Mustache","Beard","Goatee","Sideburns","Stubble","Clean-shaven","Moustache and goatee"];
  const accessoryOpts = ["Glasses","Piercings","Jewelry","Tattoos","None"];
  const expressionOpts = ["Neutral","Happy/smiling","Sad/frowning","Angry","Surprised","Calm/serene","Tired","Stern/serious","Pensive","Friendly","Worried/anxious"];

  // ⭐ UI
  return (
    <div className="min-h-screen p-6 bg-aurora-bg">

      {/* FULLSCREEN LOADER */}
      <FullScreenLoader visible={loading} />

      <div className="max-w-5xl mx-auto">
        <div className="glass p-6 rounded-2xl mb-6">
          <h2 className="text-2xl font-bold">Sketch Builder</h2>
          <p className="mt-2 opacity-80">
            Fill the facial features below. Click “examples” to view image references.
          </p>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Your fields unchanged */}
          <FeatureSection id="gender" title="Gender" options={["Male","Female","Non-binary","Prefer not to say"]} value={form.gender} onChange={(v) => setField("gender", v)} />

          <div className="glass p-4 rounded-xl">
            <h4 className="font-semibold">Age</h4>
            <input className="w-full mt-3 p-3 rounded-md" placeholder="Type approximate age (e.g., early 20s)" value={form.age} onChange={(e)=>setField("age", e.target.value)} />
          </div>

          <FeatureSection id="faceShape" title="Face Shape" options={faceShapes} value={form.faceShape} onChange={(v) => setField("faceShape", v)} />

          <FeatureSection
            id="hair"
            title="Hair"
            options={hairOptions.concat(["Black","Brown","Blonde","Red","Gray","White","Dyed"])}
            value={form.hair_text || form.hair}
            onChange={(v)=> { setField("hair", v); setField("hair_text", v); }}
            placeholder="Type hair color/style"
          />

          <FeatureSection id="hairline" title="Hairline" options={hairlineOpts} value={form.hairline} onChange={(v)=>setField("hairline", v)} />

          <FeatureSection id="forehead" title="Forehead" options={foreheadOpts} value={form.forehead} onChange={(v)=>setField("forehead", v)} />

          <FeatureSection id="eyebrows" title="Eyebrows" options={eyebrowOpts} value={form.eyebrows} onChange={(v)=>setField("eyebrows", v)} />

          <FeatureSection id="eyes" title="Eyes" options={[...eyeOpts, ...eyeColorOpts]} value={form.eyes} onChange={(v)=>setField("eyes", v)} />

          <FeatureSection id="nose" title="Nose" options={noseOpts} value={form.nose} onChange={(v)=>setField("nose", v)} />

          <FeatureSection id="cheeks" title="Cheeks" options={cheekOpts} value={form.cheeks} onChange={(v)=>setField("cheeks", v)} />

          <FeatureSection id="lips" title="Lips" options={lipOpts} value={form.lips} onChange={(v)=>setField("lips", v)} />

          <FeatureSection id="jaw" title="Jawline" options={jawOpts} value={form.jaw} onChange={(v)=>setField("jaw", v)} />

          <FeatureSection id="skin" title="Skin" options={skinOpts} value={form.skin} onChange={(v)=>setField("skin", v)} />

          <FeatureSection id="ears" title="Ears" options={earOpts} value={form.ears} onChange={(v)=>setField("ears", v)} />

          <FeatureSection id="facial_hair" title="Facial Hair" options={facialHairOpts} value={form.facial_hair} onChange={(v)=>setField("facial_hair", v)} />

          <FeatureSection id="accessories" title="Accessories" options={accessoryOpts} value={form.accessories} onChange={(v)=>setField("accessories", v)} />

          <FeatureSection id="expression" title="Expression" options={expressionOpts} value={form.expression} onChange={(v)=>setField("expression", v)} />

          <div className="glass p-4 rounded-xl">
            <h4 className="font-semibold">Other Notable Features</h4>
            <textarea className="w-full mt-3 p-3 rounded-md" placeholder="e.g., scar on left cheek" value={form.notes} onChange={(e)=>setField("notes", e.target.value)} rows={3} />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <button className="btn" onClick={() => handleGenerate("")} disabled={loading}>
            {loading ? "Generating…" : "Generate Sketch"}
          </button>

          {/* EDIT BOX */}
          {result && (
            <div className="glass p-4 rounded-xl flex-1">
              <h4 className="font-semibold">Request edits (optional)</h4>
              <textarea
                value={changeReq}
                onChange={(e)=>setChangeReq(e.target.value)}
                className="w-full mt-3 p-3 rounded-md"
                placeholder="Type requested edits..."
                rows={2}
              />
              <div className="flex gap-3 mt-3">
                <button className="btn" disabled={!changeReq || loading} onClick={() => handleGenerate(changeReq)}>
                  {loading ? "Applying…" : "Apply Changes"}
                </button>
                <button className="px-4 py-2 rounded-xl" onClick={()=> setChangeReq("")}>
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ⭐ NEW — VOICE INPUT SECTION */}
        <div className="glass p-4 rounded-xl mt-6">
          <h4 className="font-semibold">Voice Input (Optional)</h4>

          {/* Start Listening Button */}
          <button
            className="btn mt-3"
            type="button"
            onClick={startVoiceInput}
            disabled={listening || loading}
          >
            {listening ? "Listening…" : "Start Voice Input 🎤"}
          </button>

          {/* ⭐ Waveform Animation (only when listening = true) */}
          <VoiceWave listening={listening} />

          {/* Voice Text Box */}
          <textarea
            value={voiceText}
            onChange={(e) => setVoiceText(e.target.value)}
            placeholder="Your spoken description will appear here..."
            className="w-full mt-4 p-3 rounded-md"
            rows={3}
          />

          {/* Generate Button */}
          <button
            className="btn mt-3"
            disabled={!voiceText || loading}
            onClick={() => handleGenerate(voiceText)}
          >
            {loading ? "Generating…" : "Generate Sketch From Voice Description"}
          </button>
        </div>


        {/* ERRORS */}
        {error && <div className="mt-4 text-red-600">{error}</div>}

        {/* RESULT */}
        <ImageResult result={result} onDownload={handleDownload} />

        {/* ⭐ NEW — Search Criminals Section */}
        {/* 🔍 SEARCH CRIMINAL DATABASE */}
        {result && (
          <div className="glass p-4 rounded-xl mt-6">
            <button
              className="btn"
              onClick={handleSearchCriminals}
              disabled={searching}
            >
              {searching ? "Searching…" : "Search from Previous Criminals"}
            </button>

            {/* RESULTS */}
            {matches.map((m, i) => (
              <div key={i} className="glass p-4 rounded-xl flex gap-4 items-center">

                {/* Criminal Image */}
                <img
                  src={m.image}
                  alt={m.id}
                  className="w-24 h-24 rounded-lg object-cover border"
                />

                <div className="flex-1">
                  <h4 className="font-semibold">{m.id}</h4>

                  {/* Confidence bar */}
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


      </div>
    </div>
  );
}