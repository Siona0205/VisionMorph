import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { useNavigate } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
import Slideshow from "../components/Slideshow";

export default function Home() {
  const flipBook = useRef(null);
  const navigate = useNavigate();

  const showcaseImages = [
    "/showcase/sketch1.png",
    "/showcase/sketch2.png",
    "/showcase/sketch3.png",
    "/showcase/sketch4.png",
    "/showcase/sketch5.png",
    "/showcase/sketch6.png",
    "/showcase/sketch7.png",
    "/showcase/sketch8.png",
    "/showcase/sketch9.png",
    "/showcase/sketch10.png",
    "/showcase/sketch11.png",
    "/showcase/sketch12.png",
    
  ];

  const pages = [
    {
      title: "VisionMorph",
      text: "AI-powered criminal sketch assistant.\nTransform descriptions into visual sketches.",
    },
    {
      title: "Why VisionMorph?",
      text: "Fast suspect reconstruction.\nSimple UI.\nAccurate details.\nAI-powered refinement. We help you to visualize your thoughts without delay",
    },
    {
      title: "Features",
      text: "• Facial-feature prompt builder\n• Iterative edit refinement\n• High-quality sketches\n• Easy download",
    },
    {
      title: "How it works",
      text: "Describe the face → AI builds prompt → Model creates sketch → You refine + download.",
    },
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
      <main className="w-full flex flex-col items-center gap-16 mt-12">

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl w-full">

          {/* LEFT — SLIDESHOW */}
            <div className="flex flex-col items-center">

              {/* 🖼️ SLIDESHOW HEADING */}
              <h3 className="text-xl font-semibold text-center">
                Previously Generated Sketches
              </h3>

              <p className="text-center text-sm opacity-70 mt-1 mb-4 max-w-sm">
                A glimpse of sketches created earlier using VisionMorph to assist
                investigations.
              </p>

              {/* OPTIONAL DECORATIVE LINE */}
              <div className="w-24 h-1 bg-aurora-lavender/60 mb-6 rounded-full"></div>

              {/* SLIDESHOW */}
              <Slideshow images={showcaseImages} interval={1050} />
            </div>


          {/* RIGHT — FLIPBOOK */}
          <div className="flex justify-center">
            <div className="relative">
              <h3 className="text-xl font-semibold text-center">
                What is VisionMorph?
              </h3>

              <p className="text-center text-sm opacity-70 mt-1 mb-4 max-w-sm">
                Turn the pages of our notebook to discover VisionMorph!! 
              </p>

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
                        "inset 0 0 4px rgba(0,0,0,0.8), 0 1px 1px rgba(0,0,0,0.4)",
                    }}
                  />
                ))}
              </div>

              {/* NOTEBOOK COVER */}
              <div
                className="rounded-xl shadow-2xl"
                style={{
                  background: "#ffefb0",
                  padding: "24px",
                  borderRadius: "16px",
                  boxShadow:
                    "0 8px 20px rgba(0,0,0,0.15), inset 0 0 12px rgba(255,255,255,0.4)",
                }}
              >
                {/* FLIPBOOK */}
                <div style={{ width: 360 }}>
                  <HTMLFlipBook
                    width={330}
                    height={450}
                    showCover={false}
                    mobileScrollSupport={true}
                    ref={flipBook}
                  >
                    {pages.map((p, i) => (
                      <article
                        key={i}
                        className="flip-page"
                        style={{
                          background: "#fffdf7",
                          padding: "35px 28px",
                          fontFamily: "'Kalam', cursive",
                          whiteSpace: "pre-line",
                          boxShadow:
                            "inset 0 0 8px rgba(0,0,0,0.07), 0 2px 6px rgba(0,0,0,0.1)",
                        }}
                      >
                        <h3 className="text-xl mb-3 font-bold">{p.title}</h3>
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
        © {new Date().getFullYear()} VisionMorph • Contact: visionmorph@gmail.com
      </footer>
    </div>
  );
}
