"use client";

import { useState } from "react";
import Image from "next/image";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import type { ProductPhoto } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductCarousel({ photos }: { photos: ProductPhoto[] }) {
  const [index, setIndex] = useState(0);
  const count = photos.length;
  const current = photos[index];
  const go = (delta: number) => setIndex((index + delta + count) % count);

  return (
    <div className="md:sticky md:top-24 md:self-start">
      {/* Image principale */}
      <div className="relative overflow-hidden rounded-2xl bg-rose/30">
        <Image
          src={current.src}
          alt={current.alt}
          width={1200}
          height={1500}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="aspect-[3/4] h-full w-full object-cover"
        />

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Image précédente"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-sand/90 text-ink backdrop-blur transition-colors hover:bg-sand"
            >
              <CaretLeft size={16} weight="bold" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Image suivante"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-sand/90 text-ink backdrop-blur transition-colors hover:bg-sand"
            >
              <CaretRight size={16} weight="bold" />
            </button>
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
              {photos.map((p, i) => (
                <span
                  key={p.src}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-5 bg-ink" : "w-1.5 bg-ink/30",
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Vignettes */}
      {count > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Voir l'image ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "overflow-hidden rounded-lg border-2 transition-opacity",
                i === index ? "border-sage" : "border-transparent opacity-60 hover:opacity-100",
              )}
            >
              <Image
                src={p.src}
                alt=""
                width={120}
                height={120}
                className="h-14 w-14 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
