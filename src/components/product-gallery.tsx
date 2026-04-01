"use client";

import Image from "next/image";
import { useState } from "react";

export type GalleryImage = {
  src: string;
  alt: string;
};

type Props = {
  images: GalleryImage[];
  priority?: boolean;
};

export function ProductGallery({ images, priority }: Props) {
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];

  if (!current) return null;

  return (
    <div className="space-y-3">
      <div className="relative aspect-square w-full max-w-xl overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 shadow-sm">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 36rem"
          priority={priority}
        />
      </div>
      {images.length > 1 ? (
        <ul className="flex flex-wrap gap-2" role="list">
          {images.map((img, i) => {
            const selected = i === index;
            return (
              <li key={`${img.src}-${i}`}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`relative h-16 w-16 overflow-hidden rounded-md border-2 shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#375e21] focus-visible:ring-offset-2 ${
                    selected ? "border-[#375e21]" : "border-transparent ring-1 ring-neutral-200"
                  }`}
                  aria-label={`Show image ${i + 1} of ${images.length}`}
                  aria-pressed={selected}
                >
                  <Image src={img.src} alt="" fill className="object-cover" sizes="64px" />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
