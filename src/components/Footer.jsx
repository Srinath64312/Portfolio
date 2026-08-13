import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "../data/portfolioData";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__name">{profile.name}</p>

        <div className="footer__links">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <FiGithub size={18} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FiLinkedin size={18} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <FiMail size={18} />
          </a>
        </div>

        <p className="footer__meta">
          © {new Date().getFullYear()} {profile.name}. Built with React.
        </p>
      </div>
    </footer>
  );
}
