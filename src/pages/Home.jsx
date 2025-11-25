import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { useNavigate } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";

export default function Home() {
  const flipBook = useRef(null);
  const navigate = useNavigate();

  const pages = [
    {
      title: "VisionMorph",
      text: "AI-powered criminal sketch assistant.\nTransform witness memories into detailed sketches."
    },
    {
      title: "Why VisionMorph?",
      text: "Fast suspect reconstruction.\nSimple UI.\nAccurate details.\nAI-powered refinement."
    },
    {
      title: "Features",
      text: "• Facial-feature prompt builder\n• iterative edit refinement\n• high-quality sketches\n• easy download"
    },
    {
      title: "How it works",
      text: "Describe the face → AI builds prompt → Model creates sketch → You refine + download."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-aurora-bg">

      {/* HEADER */}
      <header className="w-full max-w-4xl mx-auto text-center">
        <div className="glass glow-border px-10 py-6">
          <h1 className="text-4xl font-extrabold">VisionMorph</h1>
          <p className="mt-2 text-lg opacity-80">
            AI Powered Criminal Sketching Assistant
          </p>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex flex-col items-center gap-12 mt-12">

        {/* NOTEBOOK WRAPPER */}
        <div className="relative">

          {/* METALLIC SPIRAL BINDING */}
          <div className="absolute -left-6 top-5 bottom-5 w-8 flex flex-col justify-between">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: "22px",
                  height: "10px",
                  borderRadius: "12px",
                  border: "3px solid #444",
                  margin: "5px 0",
                  boxShadow:
                    "inset 0 0 4px rgba(0,0,0,0.8), 0 1px 1px rgba(0,0,0,0.4)"
                }}
              ></div>
            ))}
          </div>

          {/* NOTEBOOK COVER */}
          <div
            className="rounded-xl shadow-2xl"
            style={{
              background: "#ffefb0", // butter-yellow improved tone
              padding: "24px",
              borderRadius: "16px",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.15), inset 0 0 12px rgba(255,255,255,0.4)"
            }}
          >
            {/* FLIPBOOK */}
            <div style={{ width: 360 }}>
              <HTMLFlipBook
                width={330}
                height={450}
                minWidth={250}
                maxWidth={380}
                maxHeight={600}
                showCover={false}
                mobileScrollSupport={true}
                ref={flipBook}
                className="rounded-xl"
                style={{
                  borderRadius: "14px",
                  boxShadow:
                    "0 4px 10px rgba(0,0,0,0.15), inset 0 0 8px rgba(0,0,0,0.1)"
                }}
              >
                {pages.map((p, i) => (
                  <article
                    key={i}
                    className="flip-page"
                    style={{
                      background: "#fffdf7",
                      padding: "35px 28px",
                      borderRadius: "12px",
                      fontFamily: "'Kalam', cursive",
                      fontSize: "1.05rem",
                      lineHeight: "1.55",
                      color: "#444",
                      whiteSpace: "pre-line",
                      boxShadow:
                        "inset 0 0 8px rgba(0,0,0,0.07), 0 2px 6px rgba(0,0,0,0.1)"
                    }}
                  >
                    <h3
                      className="text-xl mb-3"
                      style={{
                        fontFamily: "'Kalam', cursive",
                        fontWeight: "700",
                        color: "#222",
                        letterSpacing: "0.5px",
                        marginBottom: "10px"
                      }}
                    >
                      {p.title}
                    </h3>

                    <p>{p.text}</p>
                  </article>
                ))}
              </HTMLFlipBook>
            </div>

            {/* OPEN NOTEBOOK BUTTON */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => flipBook.current?.flip(1)}
                className="btn flex items-center gap-2"
              >
                <FaBookOpen /> Open Notebook
              </button>
            </div>
          </div>
        </div>

        {/* START SKETCHING BUTTON */}
        <button
          onClick={() => navigate("/sketch")}
          className="btn text-lg font-semibold"
        >
          Start Sketching
        </button>
      </main>

      {/* FOOTER */}
      <footer className="mt-14 opacity-80">
        © {new Date().getFullYear()} VisionMorph • Contact: visionmorph@example.com
      </footer>
    </div>
  );
}
