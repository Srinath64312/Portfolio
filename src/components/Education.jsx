import { useReveal } from "../hooks/useReveal";
import { education } from "../data/portfolioData";
import "./Education.css";

export default function Education() {
  const ref = useReveal();

  return (
    <section id="education" className="section education" ref={ref}>
      <div className="container">
        <p className="eyebrow reveal">Education</p>
        <h2 className="section-title reveal">Academic background</h2>

        <div className="education__timeline">
          {education.map((item, i) => (
            <div key={i} className="education__item glass reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <span className="education__years">
                {item.startYear} — {item.endYear}
              </span>
              <h3>{item.degree}</h3>
              <p className="education__institution">{item.institution}</p>
              <p className="education__coursework">{item.coursework}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
