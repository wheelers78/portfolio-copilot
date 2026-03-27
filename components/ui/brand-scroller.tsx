"use client";

import { BrandLogo } from "./brand-logo";

export interface BrandScrollerProps {
  brands: Array<{
    name: string;
    alt: string;
  }>;
  reverse?: boolean;
}

export const BrandScroller = ({ brands, reverse = false }: BrandScrollerProps) => {
  const animationClass = reverse ? "animate-marquee-reverse" : "animate-marquee";

  return (
    <div className="flex overflow-hidden py-4 [--gap:2.5rem] [gap:var(--gap)] flex-row w-screen -mx-16 [mask-image:linear-gradient(to_right,_rgba(0,_0,_0,_0),rgba(0,_0,_0,_1)_10%,rgba(0,_0,_0,_1)_90%,rgba(0,_0,_0,_0))]">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div
            className={`flex shrink-0 [gap:var(--gap)] ${animationClass} flex-row`}
            key={i}
          >
            {brands.map((brand, idx) => (
              <div key={idx} className="flex items-center justify-center shrink-0">
                <BrandLogo name={brand.name} alt={brand.alt} />
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};
