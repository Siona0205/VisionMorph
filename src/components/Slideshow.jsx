// src/components/Slideshow.jsx
import React, { useEffect, useState, useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function Slideshow({ images = [], interval = 3000 }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  // Auto-slide
  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, [index, images]);

  const startAutoSlide = () => {
    stopAutoSlide();
    timerRef.current = setTimeout(() => {
      nextSlide();
    }, interval);
  };

  const stopAutoSlide = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images.length) return null;

  return (
    <div
      className="relative w-full max-w-4xl mx-auto glass rounded-2xl overflow-hidden"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      {/* Image */}
      <img
        src={images[index]}
        alt={`slide-${index}`}
        className="w-full h-[350px] object-contain bg-white transition-all duration-500"
      />

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
      >
        <AiOutlineLeft size={22} />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
      >
        <AiOutlineRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === index ? "bg-aurora-lavender" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
