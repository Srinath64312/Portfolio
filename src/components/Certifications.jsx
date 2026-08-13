import { FiAward, FiExternalLink } from "react-icons/fi";
import { useReveal } from "../hooks/useReveal";
import { certifications } from "../data/portfolioData";
import "./Certifications.css";

export default function Certifications() {
  const ref = useReveal();

  return (
    <section id="certifications" className="section certifications" ref={ref}>
      <div className="container">
        <p className="eyebrow reveal">Certifications</p>
        <h2 className="section-title reveal">Certifications</h2>

        {certifications.length === 0 ? (
          <div className="certifications__empty glass reveal">
            <FiAward size={26} />
            <p>Certifications will be added soon.</p>
          </div>
        ) : (
          <div className="certifications__grid">
            {certifications.map((cert, i) => (
              <div key={i} className="certifications__card glass reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
                <FiAward size={20} className="certifications__icon" />
                <h3>{cert.name}</h3>
                <p className="certifications__org">{cert.issuer}</p>
                <p className="certifications__date">{cert.date}</p>
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noreferrer" className="certifications__link">
                    View credential <FiExternalLink size={13} />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
