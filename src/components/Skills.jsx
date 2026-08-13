import {
  FiCode, FiGlobe, FiDatabase, FiTool, FiCpu,
} from "react-icons/fi";
import { useReveal } from "../hooks/useReveal";
import { skills } from "../data/portfolioData";
import "./Skills.css";

const CATEGORY_ICON = {
  Programming: FiCode,
  "Web Development": FiGlobe,
  Database: FiDatabase,
  Tools: FiTool,
  "AI / ML": FiCpu,
};

export default function Skills() {
  const ref = useReveal();

  return (
    <section id="skills" className="section skills" ref={ref}>
      <div className="container">
        <p className="eyebrow reveal">Skills</p>
        <h2 className="section-title reveal">What I work with</h2>

        <div className="skills__grid">
          {skills.map((group, i) => {
            const Icon = CATEGORY_ICON[group.category] || FiCode;
            return (
              <div
                key={group.category}
                className="skills__card glass reveal"
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <div className="skills__card-header">
                  <Icon size={20} />
                  <h3>{group.category}</h3>
                </div>
                <ul className="skills__list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
