import { useState, useEffect, useRef } from "react";

/* Fades + lifts its children into view when scrolled to.
   `delay` staggers entrances; `dataOpen` is passed through so callers
   can style the wrapper (used by the timeline dropdowns). */
export default function Reveal({ children, delay = 0, className = "", dataOpen }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      data-open={dataOpen}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(22px)",
        transition: `opacity .7s cubic-bezier(.2,.6,.2,1) ${delay}ms, transform .7s cubic-bezier(.2,.6,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
