"use client";

import { useState, useEffect, CSSProperties } from "react";

export interface LogoImageProps {
  name: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
}

export const LogoImage = ({ name, alt, className, style }: LogoImageProps) => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check current theme from document
    const theme = document.documentElement.getAttribute("data-theme");
    setIsDark(theme === "dark");

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute("data-theme");
      setIsDark(newTheme === "dark");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return null;
  }

  const logoSrc = isDark
    ? `/logos/${name}_white.svg`
    : `/logos/${name}.svg`;

  return (
    <img
      src={logoSrc}
      alt={alt}
      className={className}
      style={style}
    />
  );
};

export interface BrandLogoProps {
  name: string;
  alt: string;
}

export const BrandLogo = ({ name, alt }: BrandLogoProps) => {
  return (
    <LogoImage
      name={name}
      alt={alt}
      className="h-8 w-auto object-contain opacity-75 hover:opacity-100 transition-opacity duration-300"
    />
  );
};
