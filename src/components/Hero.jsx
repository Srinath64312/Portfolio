import { FiGithub, FiLinkedin, FiArrowDown, FiDownload } from "react-icons/fi";
import { profile } from "../data/portfolioData";
import "./Hero.css";

// A quiet, generative node-graph — nods to the AI/ML thread without
// leaning on a literal brain icon or stock illustration.
function NodeField() {
  const nodes = [
    [8, 22], [22, 55], [15, 82], [38, 30], [46, 68],
    [62, 18], [58, 48], [74, 72], [86, 34], [92, 58],
  ];
  const edges = [
    [0, 3], [3, 5], [5, 6], [6, 8], [8, 9],
    [1, 3], [1, 4], [4, 6], [4, 7], [7, 9], [2, 1],
  ];

  return (
    <svg
      className="hero__nodefield"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent-1)" />
          <stop offset="100%" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="url(#edgeGrad)"
          strokeWidth="0.15"
          opacity="0.35"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="0.9"
          fill="var(--accent-2)"
          className="hero__node"
          style={{ animationDelay: `${i * 0.35}s` }}
        />
      ))}
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="home" className="hero">
      <NodeField />
      <div className="hero__glow" />
      <div className="container hero__content">
        <p className="eyebrow hero-anim" style={{ animationDelay: "0s" }}>// welcome</p>
        <h1 className="hero__title hero-anim" style={{ animationDelay: "0.08s" }}>
          Hi, I'm <span className="gradient-text">{profile.name}</span>
        </h1>
        <p className="hero__role hero-anim" style={{ animationDelay: "0.18s" }}>
          {profile.role}
        </p>
        <p className="hero__intro hero-anim" style={{ animationDelay: "0.28s" }}>
          {profile.intro}
        </p>

        <div className="hero__actions hero-anim" style={{ animationDelay: "0.38s" }}>
          <a href="#projects" className="btn btn-primary">
            View My Projects
          </a>
          <a href={profile.resumePath} download className="btn btn-ghost">
            <FiDownload size={16} /> Download Resume
          </a>
          <a href="#contact" className="btn btn-ghost">
            Contact Me
          </a>
        </div>

        <div className="hero__socials hero-anim" style={{ animationDelay: "0.48s" }}>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
            <FiGithub size={20} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
            <FiLinkedin size={20} />
          </a>
        </div>
      </div>

      <a href="#about" className="hero__scroll-cue" aria-label="Scroll to About section">
        <FiArrowDown size={18} />
      </a>
    </section>
  );
}
