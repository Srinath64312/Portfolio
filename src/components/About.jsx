import { useReveal } from "../hooks/useReveal";
import { about, profile } from "../data/portfolioData";
import "./About.css";

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="container">
        <p className="eyebrow reveal">About</p>
        <h2 className="section-title reveal">A little about me</h2>

        <div className="about__grid">
          <div className="about__visual glass reveal">
            <div className="about__avatar-ring">
              <span>{profile.name.charAt(0)}</span>
            </div>
          </div>

          <div className="about__text reveal">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            <div className="about__interests">
              {about.interests.map((item) => (
                <span key={item} className="about__tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
