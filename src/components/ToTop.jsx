import { useState, useEffect } from "react";
import "./ToTop.css";

export default function ToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShown(window.scrollY > window.innerHeight * 0.6);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      type="button"
      className={`to-top glass ${shown ? "is-shown" : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <span className="to-top__arrow" aria-hidden="true">↑</span>
      <span className="to-top__label">TOP</span>
    </button>
  );
}
