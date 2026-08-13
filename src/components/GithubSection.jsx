import { useEffect, useState } from "react";
import { FiStar, FiGithub, FiExternalLink } from "react-icons/fi";
import { useReveal } from "../hooks/useReveal";
import { githubConfig, profile } from "../data/portfolioData";
import "./GithubSection.css";

export default function GithubSection() {
  const ref = useReveal();
  const [status, setStatus] = useState("loading"); // loading | success | error | empty
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${githubConfig.username}/repos?sort=updated&per_page=6`
        );
        if (!res.ok) throw new Error(`GitHub API responded with ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        if (!Array.isArray(data) || data.length === 0) {
          setStatus("empty");
        } else {
          setRepos(data);
          setStatus("success");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    fetchRepos();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="github" className="section github" ref={ref}>
      <div className="container">
        <p className="eyebrow reveal">GitHub</p>
        <h2 className="section-title reveal">Recent repositories</h2>

        {status === "loading" && (
          <div className="github__grid">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="github__card github__card--skeleton glass" />
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="github__state glass reveal">
            <FiGithub size={24} />
            <p>Couldn't load repositories right now. Please check back later.</p>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
              View profile on GitHub
            </a>
          </div>
        )}

        {status === "empty" && (
          <div className="github__state glass reveal">
            <FiGithub size={24} />
            <p>No public repositories yet — check back soon.</p>
          </div>
        )}

        {status === "success" && (
          <div className="github__grid">
            {repos.map((repo, i) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="github__card glass reveal"
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <div className="github__card-head">
                  <h3>{repo.name}</h3>
                  <FiExternalLink size={14} />
                </div>
                <p>{repo.description || "No description provided."}</p>
                <div className="github__meta">
                  {repo.language && <span>{repo.language}</span>}
                  <span className="github__stars">
                    <FiStar size={13} /> {repo.stargazers_count}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
