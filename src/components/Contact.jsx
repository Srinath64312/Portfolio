import { useState } from "react";
import { FiMail, FiGithub, FiLinkedin, FiSend } from "react-icons/fi";
import { useReveal } from "../hooks/useReveal";
import { profile } from "../data/portfolioData";
import "./Contact.css";

const FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || "";

function validate({ name, email, message }) {
  const errors = {};
  if (!name.trim()) errors.name = "Name is required.";
  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!message.trim() || message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

export default function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | failed

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (!FORM_ENDPOINT) {
      // No form service configured — fall back to a pre-filled mail client.
      const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("failed");
    }
  };

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="container">
        <p className="eyebrow reveal">Contact</p>
        <h2 className="section-title reveal">Let's talk</h2>

        <div className="contact__grid">
          <form className="contact__form glass reveal" onSubmit={handleSubmit} noValidate>
            <div className="contact__field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" value={form.name} onChange={handleChange} aria-invalid={!!errors.name} />
              {errors.name && <span className="contact__error">{errors.name}</span>}
            </div>

            <div className="contact__field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} aria-invalid={!!errors.email} />
              {errors.email && <span className="contact__error">{errors.email}</span>}
            </div>

            <div className="contact__field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" value={form.message} onChange={handleChange} aria-invalid={!!errors.message} />
              {errors.message && <span className="contact__error">{errors.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
              <FiSend size={16} />
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>

            {status === "sent" && <p className="contact__status contact__status--ok">Thanks — your message is on its way.</p>}
            {status === "failed" && <p className="contact__status contact__status--error">Something went wrong. Try emailing directly instead.</p>}
            {!FORM_ENDPOINT && (
              <p className="contact__note">
                No form service is configured yet — submitting will open your email client instead.
                See .env.example to connect Formspree or Web3Forms.
              </p>
            )}
          </form>

          <div className="contact__side reveal" style={{ transitionDelay: "0.1s" }}>
            <a href={`mailto:${profile.email}`} className="contact__side-link glass">
              <FiMail size={18} /> {profile.email}
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="contact__side-link glass">
              <FiGithub size={18} /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact__side-link glass">
              <FiLinkedin size={18} /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
