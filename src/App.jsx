import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Cursor from "./components/Cursor";
import Rail from "./components/Rail";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import GithubSection from "./components/GithubSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ToTop from "./components/ToTop";

export default function App() {
  return (
    <ThemeProvider>
      <Cursor />
      <Rail />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <GithubSection />
        <Contact />
      </main>
      <Footer />
      <ToTop />
    </ThemeProvider>
  );
}
