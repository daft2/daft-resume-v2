import { useEffect, useRef } from "react";

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    // Use MutationObserver to detect dynamically added .reveal elements
    const observeAll = () => {
      const children = el.querySelectorAll(".reveal:not(.revealed)");
      children.forEach((child) => observer.observe(child));
    };

    observeAll();

    const mutation = new MutationObserver(observeAll);
    mutation.observe(el, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);

  return ref;
}
