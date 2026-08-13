import { useState, useEffect } from "react";
import { FiArrowRight, FiFileText } from "react-icons/fi";
import { useReveal } from "../hooks/useReveal";
import { profile } from "../data/portfolioData";
import "./Hero.css";

const TERMINAL_LINES = [
  { cmd: "whoami", out: [profile.fullName] },
  { cmd: "cat role.txt", out: [profile.role] },
  { cmd: "cat education.txt", out: ["KLH Aziznagar · B.Tech CSE (2025–2029)"] },
  { cmd: "ls ~/certifications", out: ["freeCodeCamp RWD", "Simplilearn ReactJS"] },
  { cmd: "./status --current", out: ["Building full-stack web applications & AI systems"] },
];

const SKILLS_CHIPS = ["Python", "Java", "JavaScript", "React", "HTML/CSS", "SQL", "Git", "AI/ML"];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Hero() {
  const ref = useReveal();
  const [typed, setTyped] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      for (let i = 0; i < TERMINAL_LINES.length; i++) {
        if (cancelled) return;
        const line = TERMINAL_LINES[i];

        for (let c = 0; c <= line.cmd.length; c++) {
          if (cancelled) return;
          setTyped((prev) => {
            const next = [...prev];
            next[i] = { typedCmd: line.cmd.slice(0, c), out: [] };
            return next;
          });
          await sleep(35 + Math.random() * 45);
        }

        await sleep(200);

        if (line.out) {
          for (let oi = 0; oi < line.out.length; oi++) {
            if (cancelled) return;
            setTyped((prev) => {
              const next = [...prev];
              next[i] = { ...next[i], out: [...(next[i].out || []), line.out[oi]] };
              return next;
            });
            await sleep(100);
          }
        }
        await sleep(150);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="hero" className="hero section" ref={ref}>
      <div className="container hero__split">
        <div className="hero__left reveal">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            <span>Available for Projects & Internships</span>
          </div>

          <h1 className="hero__title">
            Hello, I'm <br />
            <span className="gradient-text">{profile.name}</span>
          </h1>

          <p className="hero__subtitle">{profile.intro}</p>

          <div className="hero__ctas">
            <a href="#projects" className="btn btn-primary">
              Explore Work <FiArrowRight size={16} />
            </a>
            <a
              href={profile.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <FiFileText size={16} /> Resume
            </a>
          </div>
        </div>

        <div className="hero__right reveal" style={{ transitionDelay: "0.15s" }}>
          <div className="terminal glass">
            <div className="terminal__bar">
              <span className="tb-dot red" />
              <span className="tb-dot yellow" />
              <span className="tb-dot green" />
              <span className="terminal__title">terminal://srinath-os</span>
            </div>
            <div className="terminal__body">
              {TERMINAL_LINES.map((line, i) => {
                const t = typed[i];
                if (!t) return null;
                return (
                  <div key={i} className="terminal__line">
                    <div className="terminal__cmd">
                      <span className="terminal__prompt">
                        srinath@klh <span className="arrow">❯</span>
                      </span>
                      <span className="terminal__text">
                        {t.typedCmd}
                        {i === typed.length - 1 && <span className="terminal__caret" />}
                      </span>
                    </div>
                    {t.out && t.out.length > 0 && (
                      <div className="terminal__out">
                        {t.out.map((o, oi) => (
                          <div key={oi}>{o}</div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {typed.length === TERMINAL_LINES.length && (
                <div className="terminal__chips">
                  {SKILLS_CHIPS.map((chip, si) => (
                    <span key={si} className="terminal__chip">
                      {chip}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
