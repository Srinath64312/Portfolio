import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "../data/portfolioData";
import "./Rail.css";

export default function Rail() {
  return (
    <aside className="rail glass" aria-label="Social Links">
      <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <FiGithub size={18} />
      </a>
      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <FiLinkedin size={18} />
      </a>
      <a href={`mailto:${profile.email}`} aria-label="Email">
        <FiMail size={18} />
      </a>
      <span className="rail__line" />
    </aside>
  );
}
