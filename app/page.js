"use client";

import { useEffect, useState } from "react";

const projects = [
  {
    number: "01",
    name: "Sterling Bloom",
    category: "Client website",
    description: "A refined digital home for an event and floral design business, with service storytelling, consultation booking, and a custom content-editing experience.",
    tags: ["Next.js", "Responsive design", "Admin experience"],
    image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1400&q=85",
    alt: "Elegant floral event styling",
    href: "https://sterlingbloom.vercel.app",
    label: "Explore live site",
  },
  {
    number: "02",
    name: "CRC Core",
    category: "Business platform",
    description: "A business website built around services, case studies, articles, testimonials, and a password-protected admin workflow for managing content.",
    tags: ["Next.js", "MongoDB", "CMS"],
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
    alt: "Contemporary workspace and meeting area",
    href: "https://thecrccore.vercel.app",
    label: "Explore live site",
  },
  {
    number: "03",
    name: "Eisha’s",
    category: "E-commerce concept",
    description: "A multi-store e-commerce concept bringing fashion, beauty, and jewelry under one umbrella, with distinct visual identities and a shared shopping experience.",
    tags: ["E-commerce", "Brand systems", "Next.js"],
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85",
    alt: "Fashion editorial shopping scene",
    href: "https://eishas.vercel.app",
    label: "Explore the concept",
  },
  {
    number: "04",
    name: "FORME",
    category: "Creative web experience",
    description: "An editorial visual experience exploring layout, typography, motion, and a more expressive approach to presenting a fashion lookbook.",
    tags: ["React", "Motion", "Art direction"],
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=85",
    alt: "Minimal fashion editorial",
    href: "https://forme.vercel.app",
    github: "https://github.com/MurtazaSiddiqui2003/FORME",
    label: "Explore the experience",
  },
];

const services = [
  { icon: "↗", title: "Websites & digital products", text: "Responsive websites, landing pages, CMS experiences, and useful interfaces built around a clear goal." },
  { icon: "◇", title: "E-commerce & Shopify", text: "Storefront improvements, product presentation, and practical theme customization with HTML, CSS, JavaScript, and Liquid." },
  { icon: "✳", title: "Branding & visual direction", text: "Digital identities, campaign concepts, visual consistency, and assets that help a brand feel intentional." },
  { icon: "◎", title: "Social media & content", text: "Account support, content planning, creative concepts, and platform-aware publishing for social channels." },
  { icon: "▧", title: "Photography & product visuals", text: "Product photos, lifestyle concepts, and coordinated visual assets for web stores and campaigns." },
  { icon: "✧", title: "AI-assisted creative workflows", text: "Combining human direction with AI tools for concept development, lifestyle imagery, and production experiments." },
];

const capabilities = [
  ["Web development", "HTML · CSS · JavaScript · React · Next.js"],
  ["E-commerce", "Shopify · Liquid fundamentals · storefront UX"],
  ["Creative production", "Visual concepts · product imagery · editing"],
  ["Growth & content", "Instagram management · content planning"],
  ["AI workflows", "Image concepts · image-to-video experiments"],
];

export default function Home() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = window.localStorage.getItem("murtaza-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = saved || (prefersDark ? "dark" : "light");
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("murtaza-theme", nextTheme);
  }

  return (
    <main>
      <div className="site-shell">
        <header className="topbar">
          <a className="wordmark" href="#home" aria-label="Murtaza Siddiqui home">
            <span className="mark">ms.</span>
            <span>Murtaza Siddiqui</span>
          </a>
          <nav className="nav" aria-label="Main navigation">
            <a className="nav-link" href="#work">Work</a>
            <a className="nav-link" href="#services">What I do</a>
            <a className="nav-link" href="#about">About</a>
            <a className="nav-link" href="#contact">Contact</a>
          </nav>
          <div className="nav-actions">
            <span className="availability"><span className="dot" /> Open to projects</span>
            <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"} title="Toggle theme">
              {theme === "dark" ? "☼" : "☾"}
            </button>
          </div>
        </header>

        <section className="hero reveal" id="home">
          <div>
            <div className="hero-label eyebrow"><span className="dot" /> Independent digital creator · Karachi, Pakistan</div>
            <h1>I turn ideas into <span className="line-two">digital things</span> that <span className="accent-word">work.</span></h1>
          </div>
          <div className="hero-copy">
            <p>I’m Murtaza — a multidisciplinary digital creator working across websites, e-commerce, branding, social content, and AI-assisted creative production.</p>
            <div className="button-row">
              <a className="button button-primary" href="#work">Explore my work <span className="arrow">↘</span></a>
              <a className="button button-secondary" href="#contact">Start a project <span className="arrow">↗</span></a>
            </div>
          </div>
        </section>

        <div className="hero-strip" aria-label="Areas of work">
          <div className="strip-item"><strong>Digital</strong><span>Websites & e-commerce</span></div>
          <div className="strip-item"><strong>Creative</strong><span>Branding & visual content</span></div>
          <div className="strip-item"><strong>Social</strong><span>Content & account support</span></div>
          <div className="strip-item"><strong>AI-assisted</strong><span>Smarter creative workflows</span></div>
        </div>

        <section className="section" id="work">
          <div className="section-head">
            <div>
              <div className="section-kicker"><span className="num">01 /</span> Selected work</div>
              <h2>A few things I’ve<br />been bringing to life.</h2>
            </div>
            <p className="section-intro">A selection of websites and digital concepts across different industries. Each one is a chance to solve a different kind of problem.</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <a className="project-visual" href={project.href} target="_blank" rel="noreferrer" aria-label={project.label + ": " + project.name}>
                  <img src={project.image} alt={project.alt} loading="lazy" />
                  <div className="visual-overlay">
                    <span className="tag">{project.category}</span>
                    <span className="open-project" aria-hidden="true">↗</span>
                  </div>
                </a>
                <div className="project-card-head">
                  <h3>{project.name}</h3>
                  <span className="project-index">{project.number} / 04</span>
                </div>
                <p>{project.description}</p>
                <div className="pills">{project.tags.map((tag) => <span className="pill" key={tag}>{tag}</span>)}</div>
                <a className="project-link" href={project.href} target="_blank" rel="noreferrer">{project.label} <span>↗</span></a>
                {project.github && <a className="project-link" href={project.github} target="_blank" rel="noreferrer" style={{ marginLeft: 18 }}>View source <span>↗</span></a>}
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="section services-section" id="services">
        <div className="site-shell">
          <div className="section-head">
            <div>
              <div className="section-kicker"><span className="num">02 /</span> What I can help with</div>
              <h2>Different skills.<br />One joined-up approach.</h2>
            </div>
            <p className="section-intro">Whether you need a digital home, stronger product visuals, or a more consistent online presence, we can start with the problem and shape the right solution.</p>
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <article className="service" key={service.title}>
                <div className="service-icon" aria-hidden="true">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="site-shell">
        <section className="section" id="about">
          <div className="about-grid">
            <div>
              <div className="section-kicker"><span className="num">03 /</span> A little about me</div>
              <p className="about-note">Curious by default. Practical by design. Always learning by making.</p>
            </div>
            <div className="about-main">
              <h2>I like connecting the dots between technology and creativity.</h2>
              <p>I’m not interested in building something just because it looks impressive. I want to understand what it needs to do, who it needs to help, and how the details can make the whole experience better.</p>
              <p>My work crosses frontend development, e-commerce, brand presentation, social content, photography, and AI-assisted production. I use the right mix of tools for the job, keep learning as I go, and care about delivering something people can actually use.</p>
              <div className="capability-list">
                {capabilities.map(([title, detail], i) => (
                  <div className="capability-row" key={title}>
                    <span className="n">0{i + 1}</span>
                    <strong>{title}</strong>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="process">
          <div className="section-kicker"><span className="num">04 /</span> How I work</div>
          <h2>Clear steps. No mystery.</h2>
          <div className="process-grid">
            <div className="process-step"><div className="process-number">01 — Discover</div><h3>Understand the goal</h3><p>We get clear on the audience, the problem, the budget, and what success should look like.</p></div>
            <div className="process-step"><div className="process-number">02 — Shape</div><h3>Find the right direction</h3><p>We map the content, choose the visual direction, and agree on the scope before going too far.</p></div>
            <div className="process-step"><div className="process-number">03 — Build</div><h3>Make it real</h3><p>I develop, design, test, and refine the work, sharing progress so we stay aligned.</p></div>
            <div className="process-step"><div className="process-number">04 — Improve</div><h3>Launch and learn</h3><p>We check the details, launch with care, and identify what should be improved next.</p></div>
          </div>
        </section>

        <section className="contact-panel" id="contact">
          <div>
            <div className="section-kicker"><span className="num">05 /</span> Have something in mind?</div>
            <h2>Let’s make your next idea real.</h2>
            <p>Tell me what you’re working on, what’s not working yet, or what you’d love to create. We’ll figure out a practical next step.</p>
          </div>
          <a className="button" href="https://github.com/MurtazaSiddiqui2003" target="_blank" rel="noreferrer">Connect with me <span className="arrow">↗</span></a>
        </section>

        <footer className="footer">
          <a className="wordmark" href="#home"><span className="mark">ms.</span><span>Murtaza Siddiqui</span></a>
          <div className="footer-links">
            <a href="https://github.com/MurtazaSiddiqui2003" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://thecrccore.vercel.app" target="_blank" rel="noreferrer">CRC Core ↗</a>
            <a href="https://eishas.vercel.app" target="_blank" rel="noreferrer">Eisha’s ↗</a>
          </div>
          <span className="footer-note">Made with intention · © {new Date().getFullYear()}</span>
        </footer>
      </div>
    </main>
  );
}
