import { useEffect, useRef } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function initLenis() {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    lerp: 0.08,
    wheelMultiplier: 0.8,
    touchMultiplier: 1.5,
    infinite: false,
  });

  function raf(time: number) {
    lenisInstance?.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}

export function useLenis(callback?: (lenis: Lenis) => void) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = initLenis();

    if (callback && lenisRef.current) {
      lenisRef.current.on("scroll", () => callback(lenisRef.current!));
    }

    return () => {
      if (callback && lenisRef.current) {
        lenisRef.current.off("scroll", () => callback(lenisRef.current!));
      }
    };
  }, [callback]);

  return lenisRef.current;
}
