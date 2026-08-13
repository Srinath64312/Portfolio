import { useReveal } from "../hooks/useReveal";
import "./Skills.css";

const TECH_WALL = [
  { id: "py", name: "Python", icon: "python", color: "3776AB" },
  { id: "jv", name: "Java", icon: "logos:java", color: "" },
  { id: "js", name: "JavaScript", icon: "javascript", color: "F7DF1E" },
  { id: "react", name: "React", icon: "react", color: "61DAFB" },
  { id: "html", name: "HTML5", icon: "html5", color: "E34F26" },
  { id: "css", name: "CSS3", icon: "css3", color: "1572B6" },
  { id: "sql", name: "SQL", icon: "sqlite", color: "003B57" },
  { id: "postgres", name: "PostgreSQL", icon: "postgresql", color: "4169E1" },
  { id: "git", name: "Git", icon: "git", color: "F05032" },
  { id: "github", name: "GitHub", icon: "github", color: "ffffff" },
  { id: "vscode", name: "VS Code", icon: "visualstudiocode", color: "007ACC" },
  { id: "ml", name: "Machine Learning", icon: "scikitlearn", color: "F7931E" },
];

const getIconUrl = (t) =>
  t.icon.includes(":")
    ? `https://api.iconify.design/${t.icon}.svg`
    : `https://api.iconify.design/simple-icons:${t.icon}.svg?color=%23${t.color}`;

export default function Skills() {
  const ref = useReveal();

  return (
    <section id="skills" className="section skills" ref={ref}>
      <div className="container">
        <p className="eyebrow reveal">03 / Tech Stack</p>
        <h2 className="section-title reveal">The toolbox & technologies</h2>

        <div className="skills__wall">
          {TECH_WALL.map((tech, i) => (
            <div
              key={tech.id}
              className="tech-tile glass reveal"
              style={{ transitionDelay: `${(i % 4) * 0.06}s` }}
            >
              <div className="tech-tile__icon">
                <img src={getIconUrl(tech)} alt={tech.name} loading="lazy" />
              </div>
              <span className="tech-tile__name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
