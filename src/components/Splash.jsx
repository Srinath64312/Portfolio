import { useEffect, useState } from "react";
import "./Splash.css";

const BOOT_LINES = [
  { head: true, html: 'srinath-os <span class="v">v24.05 LTS</span>  ·  tty1' },
  { sp: true },
  { k: "[    0.000000]", t: "booting srinath-os … cold start" },
  { k: "[    0.142801]", t: "probing hardware — cpu, gpu, entropy" },
  { ok: true, t: "Mounted /dev/portfolio" },
  { ok: true, t: "Reached target Local File Systems" },
  { ok: true, t: "Started Hardware RNG — entropy gathered" },
  { ok: true, t: "Loaded module react@19.0.0" },
  { ok: true, t: "Started GPU compositor  (3d-glassmorphism: active)" },
  { ok: true, t: "Started cursor daemon" },
  { ok: true, t: "Mounted /home/srinath (KLH Aziznagar)" },
  { ok: true, t: "Reached target Graphical Interface" },
  { sp: true },
  { login: true, t: "srinath login: Srinath Konda Venkata" },
  { run: true, t: "starting portfolio session" },
];

export default function Splash({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let idx = 0;

    const step = () => {
      if (cancelled) return;
      if (idx >= BOOT_LINES.length) {
        setTimeout(() => {
          if (!cancelled) {
            setDone(true);
            if (onComplete) onComplete();
          }
        }, 500);
        return;
      }

      setLines((prev) => [...prev, BOOT_LINES[idx]]);
      idx++;

      const delay = 60 + Math.random() * 50;
      setTimeout(step, delay);
    };

    step();

    const handleSkip = () => {
      if (cancelled || done) return;
      setLines(BOOT_LINES);
      setDone(true);
      if (onComplete) setTimeout(onComplete, 150);
    };

    window.addEventListener("keydown", handleSkip);
    window.addEventListener("click", handleSkip);

    return () => {
      cancelled = true;
      window.removeEventListener("keydown", handleSkip);
      window.removeEventListener("click", handleSkip);
    };
  }, []);

  return (
    <div className={`splash ${done ? "splash--exit" : ""}`} aria-hidden="true">
      <div className="splash__boot">
        <div className="splash__log">
          {lines.map((ln, i) => (
            <div
              key={i}
              className={`splash__line ${ln.head ? "splash__line--head" : ""} ${
                ln.sp ? "splash__line--sp" : ""
              }`}
            >
              {ln.sp ? (
                "\u00A0"
              ) : ln.head ? (
                <span dangerouslySetInnerHTML={{ __html: ln.html }} />
              ) : (
                <>
                  {ln.ok && (
                    <span className="b-br">
                      [<span className="b-ok">  OK  </span>]
                    </span>
                  )}
                  {ln.k && <span className="b-k">{ln.k} </span>}
                  <span className={ln.run ? "b-run" : "b-msg"}>{ln.t}</span>
                </>
              )}
            </div>
          ))}
          {!done && <span className="splash__caret" />}
        </div>
        <div className="splash__skip">press any key or click to skip</div>
      </div>
    </div>
  );
}
