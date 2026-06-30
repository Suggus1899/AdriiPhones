"use client";

import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  model: string;
}

export default function ProductGallery({ images, model }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="aspect-[4/5] md:aspect-square bg-zinc-100 rounded-3xl overflow-hidden relative">
        <img
          src={images[activeIndex]}
          alt={`${model} - foto ${activeIndex + 1}`}
          className="w-full h-full object-cover object-center transition-opacity duration-300"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`aspect-square bg-zinc-100 rounded-xl overflow-hidden transition-all ${
                idx === activeIndex
                  ? "ring-2 ring-blue-600 ring-offset-2 opacity-100"
                  : "opacity-60 hover:opacity-90"
              }`}
            >
              <img src={img} alt={`${model} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
