"use client";

import React, { useState } from "react";

interface FadeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export default function FadeImage({ src, alt, className = "", style, ...props }: FadeImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      className={className}
      style={{
        ...style,
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.35s ease",
      }}
      {...props}
    />
  );
}
