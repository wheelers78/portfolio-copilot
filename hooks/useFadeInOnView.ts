import { useEffect, useRef, useState } from 'react';

interface UseFadeInOnViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Hook that triggers a callback when an element enters the viewport
 * Respects prefers-reduced-motion for accessibility
 */
export function useFadeInOnView(options: UseFadeInOnViewOptions = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px',
    once = true,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Check if user prefers reduced motion
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);

          // Stop observing if once is true
          if (once && observer) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          // Allow re-triggering if once is false
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, once]);

  return {
    ref,
    isInView: prefersReducedMotion ? true : isInView,
  };
}
