import { useEffect, useRef } from "react";
import "./Cursor.css";

export default function Cursor() {
  const innerRef = useRef(null);
  const outerRef = useRef(null);

  useEffect(() => {
    const inner = innerRef.current;
    const outer = outerRef.current;
    if (!inner || !outer) return;

    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) {
      inner.style.display = "none";
      outer.style.display = "none";
      return;
    }

    const isClickable = (el) => {
      try {
        while (el && el !== document.body) {
          const tag = el.tagName;
          if (tag && ["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT"].includes(tag)) return true;
          if (
            el.classList &&
            typeof el.classList.contains === "function" &&
            (el.classList.contains("glass") ||
              el.classList.contains("btn") ||
              el.classList.contains("tech-tile") ||
              el.classList.contains("projects__card") ||
              el.classList.contains("cert-card") ||
              el.classList.contains("nav-link"))
          ) {
            return true;
          }
          el = el.parentElement;
        }
      } catch (err) {
        console.error(err);
      }
      return false;
    };

    let revealed = false;

    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      // Use performant translate3d instead of left/top & animate()
      inner.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;
      outer.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;

      if (!revealed) {
        revealed = true;
        document.body.classList.add("cursor-shown");
      }

      const h = isClickable(e.target);
      inner.classList.toggle("hover", h);
      outer.classList.toggle("hover", h);
    };

    const onLeaveWindow = () => {
      revealed = false;
      document.body.classList.remove("cursor-shown");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeaveWindow);
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className="cursor-outer" aria-hidden="true" />
      <div ref={innerRef} className="cursor-inner" aria-hidden="true" />
    </>
  );
}
