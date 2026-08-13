import { useMemo, useState, useEffect } from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { useReveal } from "../hooks/useReveal";
import { githubConfig, fallbackProjects } from "../data/portfolioData";
import "./Projects.css";

const FILTERS = ["All", "Web", "AI/ML", "Java", "Python", "Other"];

const mapLanguageToCategory = (language, topics = []) => {
  if (!language) return "Other";
  
  const lowerLang = language.toLowerCase();
  if (["javascript", "typescript", "html", "css", "vue", "react"].includes(lowerLang)) return "Web";
  if (["python", "jupyter notebook"].includes(lowerLang) || topics.includes("machine-learning")) return "AI/ML";
  if (["java"].includes(lowerLang)) return "Java";
  
  return "Other";
};

export default function Projects() {
  const ref = useReveal();
  const [active, setActive] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/users/${githubConfig.username}/repos?sort=updated&per_page=12`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        const formattedProjects = data
          .filter(repo => !repo.fork) // ignore forks
          .map(repo => ({
            title: repo.name.replace(/-/g, " "),
            description: repo.description || "No description provided.",
            technologies: repo.language ? [repo.language] : ["N/A"],
            category: mapLanguageToCategory(repo.language, repo.topics),
            github: repo.html_url,
            demo: repo.homepage || repo.html_url,
          }));
        setProjects(formattedProjects);
        setLoading(false);
      })
      .catch(() => {
        console.warn("GitHub API rate limited. Falling back to curated projects.");
        setProjects(fallbackProjects);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active, projects]
  );

  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className="container">
        <p className="eyebrow reveal">Projects</p>
        <h2 className="section-title reveal">Things I've built</h2>

        <div className="projects__filters reveal" role="tablist" aria-label="Filter projects by category">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={active === f}
              className={`projects__filter-btn ${active === f ? "is-active" : ""}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="projects__empty reveal">Loading projects from GitHub...</p>
        ) : filtered.length === 0 ? (
          <p className="projects__empty reveal">No projects in this category yet.</p>
        ) : (
          <div className="projects__grid">
            {filtered.map((project, i) => (
              <article
                key={project.title + i}
                className="projects__card glass reveal"
                style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
              >
                <div className="projects__card-top">
                  <span className="projects__badge">{project.category}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="projects__tech">
                  {project.technologies.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="projects__links">
                  <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
                    <FiGithub size={15} /> Code
                  </a>
                  {project.demo !== project.github && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-ghost">
                      <FiExternalLink size={15} /> Live Demo
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
