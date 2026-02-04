import { useRef } from "react";

// No-op hook — reveal animations removed
export function useReveal() {
  return useRef<HTMLDivElement>(null);
}
