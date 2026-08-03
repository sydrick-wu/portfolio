"use client";

import { useEffect, useState } from "react";

const navigation = [
  { href: "#profile", label: "Profile" },
  { href: "#path", label: "Path" },
  { href: "#pace", label: "Pace" },
  { href: "#contact", label: "Contact" },
];

const pillars = [
  {
    index: "01",
    title: "Economist",
    copy: "I use economic reasoning to turn noisy markets, incentives and human behaviour into decisions that can survive contact with reality.",
    tags: ["Economics", "Data", "Strategy"],
  },
  {
    index: "02",
    title: "Builder",
    copy: "From venture scouting to product growth, I like moving between research, systems and hands-on execution—especially around emerging technology.",
    tags: ["AI", "Venture", "Growth"],
  },
  {
    index: "03",
    title: "Endurance athlete",
    copy: "Running, riding and swimming are my long-form practice in patience: measure the signal, manage the load, and keep moving forward.",
    tags: ["Triathlon", "Cycling", "Running"],
  },
];

const timeline = [
  {
    years: "2025 — 2027",
    place: "University of Mannheim",
    role: "MSc Economics",
    note: "Graduate study in economics in Mannheim, Germany.",
  },
  {
    years: "2023 — 2024",
    place: "MiraclePlus · former YC China",
    role: "Founder Relations · Investment · Growth",
    note: "Deal sourcing, due diligence and product user growth for the startup ecosystem.",
  },
  {
    years: "2023",
    place: "University of Amsterdam",
    role: "BSc Economics & Business Economics",
    note: "8.20 / 10.00 GPA · Top 3% of the cohort.",
  },
  {
    years: "2020 — 2025",
    place: "University of Nottingham",
    role: "BSc (Hons) Economics",
    note: "First Class Honours. A cross-cultural education across China and Europe.",
  },
  {
    years: "2022",
    place: "GroupM · Unilever Team",
    role: "Data, Insight & Analytics",
    note: "Commercial analysis at the intersection of media, consumers and technology.",
  },
];

const raceLog = [
  {
    result: "1st",
    event: "Qiandao Lake Triathlon",
    detail: "18–29 age group · Olympic distance",
  },
  {
    result: "4th",
    event: "Taizhou Asia Triathlon Cup",
    detail: "18–29 age group · Sprint distance",
  },
  {
    result: "1:26:09",
    event: "Half Marathon Asian Championship",
    detail: "Half marathon · 2025",
  },
  {
    result: "3rd",
    event: "Ningbo Half Marathon",
    detail: "Men’s 10 km · 2025",
  },
];

const links = [
  { label: "GitHub", href: "https://github.com/sydrick-wu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sydrick-wu" },
  { label: "Strava", href: "https://www.strava.com/athletes/134105140" },
  { label: "Instagram", href: "https://www.instagram.com/syddddddrick" },
  { label: "Email", href: "mailto:sydrick.wu@gmail.com" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const updatePointer = (event: PointerEvent) => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        root.style.setProperty("--pointer-x", `${x}`);
        root.style.setProperty("--pointer-y", `${y}`);
      });
    };

    const updateScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      const progress = available > 0 ? window.scrollY / available : 0;
      root.style.setProperty("--scroll-progress", `${progress}`);
    };

    const sections = [...document.querySelectorAll<HTMLElement>("section[id]")];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-32% 0px -46% 0px", threshold: [0.05, 0.25, 0.55] },
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("scroll", updateScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="site-shell">
      <div className="ambient" aria-hidden="true" />
      <div className="progress-rail" aria-hidden="true">
        <span />
      </div>

      <header className="topbar">
        <a className="brand" href="#top" aria-label="Sydrick Wu — back to top">
          <span className="brand-mark">SW</span>
          <span className="brand-copy">
            <strong>Sydrick Wu</strong>
            <small>Economics · Endurance · Technology</small>
          </span>
        </a>

        <nav aria-label="Primary navigation">
          {navigation.map((item) => (
            <a
              href={item.href}
              key={item.href}
              className={activeSection === item.href.slice(1) ? "active" : ""}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className="top-contact" href="mailto:sydrick.wu@gmail.com">
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-kicker reveal">
            <span className="live-dot" aria-hidden="true" />
            Portfolio / 2026
          </div>

          <div className="hero-scene" aria-hidden="true">
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />
            <div className="coordinate coordinate-one">49.4875° N</div>
            <div className="coordinate coordinate-two">08.4660° E</div>
            <div className="portrait-halo" />
            <figure className="portrait-frame">
              <img
                src="/sydrick-portrait.jpg"
                alt=""
                width="1024"
                height="1537"
              />
            </figure>
            <div className="scene-tag tag-econ"><span>01</span> ECON</div>
            <div className="scene-tag tag-build"><span>02</span> BUILD</div>
            <div className="scene-tag tag-move"><span>03</span> MOVE</div>
            <div className="scene-axis axis-x" />
            <div className="scene-axis axis-y" />
          </div>

          <div className="hero-copy reveal">
            <p className="eyebrow">Mannheim, Germany ↔ Shanghai, China</p>
            <h1>
              Think in systems.
              <span>Move with intent.</span>
            </h1>
            <p className="hero-intro">
              I&apos;m Sydrick—an economics graduate student, technology operator
              and endurance athlete exploring how ambitious ideas become
              measurable progress.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#profile">
                Enter my world <span aria-hidden="true">↓</span>
              </a>
              <a className="text-link" href="https://github.com/sydrick-wu" target="_blank" rel="noreferrer">
                View GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="hero-stats reveal" aria-label="Highlights">
            <div><strong>Top 3%</strong><span>UvA economics cohort</span></div>
            <div><strong>18</strong><span>countries explored</span></div>
            <div><strong>1st</strong><span>triathlon age group</span></div>
          </div>

          <p className="scroll-cue">Scroll to navigate the system <span aria-hidden="true">↓</span></p>
        </section>

        <section className="profile section-pad" id="profile">
          <div className="section-heading">
            <p className="eyebrow">01 / Profile</p>
            <h2>A personal operating system for the long game.</h2>
            <p>
              Three disciplines, one method: observe carefully, choose the
              highest-leverage move, then compound it.
            </p>
          </div>

          <div className="pillar-grid">
            {pillars.map((pillar) => (
              <article className="pillar-card" key={pillar.index}>
                <div className="pillar-top">
                  <span>{pillar.index}</span>
                  <span aria-hidden="true">↗</span>
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
                <ul aria-label={`${pillar.title} topics`}>
                  {pillar.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="path section-pad" id="path">
          <div className="section-heading path-heading">
            <p className="eyebrow">02 / Path</p>
            <h2>Selected coordinates.</h2>
            <p>Education and work across economics, venture, growth and data.</p>
          </div>

          <div className="timeline">
            {timeline.map((item, index) => (
              <article className="timeline-row" key={`${item.years}-${item.place}`}>
                <div className="timeline-index">0{index + 1}</div>
                <div className="timeline-years">{item.years}</div>
                <div className="timeline-main">
                  <h3>{item.place}</h3>
                  <p className="timeline-role">{item.role}</p>
                  <p className="timeline-note">{item.note}</p>
                </div>
                <span className="timeline-plus" aria-hidden="true">+</span>
              </article>
            ))}
          </div>
        </section>

        <section className="pace section-pad" id="pace">
          <div className="pace-orbit" aria-hidden="true">
            <span>SWIM</span><span>RIDE</span><span>RUN</span>
          </div>
          <div className="section-heading pace-heading">
            <p className="eyebrow">03 / Pace</p>
            <h2>The body is part of the work.</h2>
            <p>
              Endurance sport is where planning becomes physical: consistency,
              recovery and honest feedback, repeated over years.
            </p>
          </div>

          <div className="race-board">
            <div className="race-board-title">
              <span>Race log</span>
              <span>2025 selection</span>
            </div>
            {raceLog.map((race) => (
              <article className="race-row" key={race.event}>
                <strong>{race.result}</strong>
                <h3>{race.event}</h3>
                <p>{race.detail}</p>
                <span aria-hidden="true">↗</span>
              </article>
            ))}
          </div>

          <div className="pace-quote">
            <p>“Give, share, lose, lest we die unbloomed.”</p>
            <span>Personal principle</span>
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <p className="eyebrow">04 / Contact</p>
          <h2>Build something worth the miles.</h2>
          <p className="contact-copy">
            I&apos;m always open to thoughtful conversations around economics,
            technology, venture, ambitious products and endurance sport.
          </p>
          <a className="contact-email" href="mailto:sydrick.wu@gmail.com">
            sydrick.wu@gmail.com <span aria-hidden="true">↗</span>
          </a>
          <div className="social-row">
            {links.map((link) => (
              <a href={link.href} key={link.label} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                {link.label}<span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <footer>
            <span>© 2026 Sydrick Wu</span>
            <span>Economics × Endurance × Technology</span>
            <a href="#top">Back to orbit ↑</a>
          </footer>
        </section>
      </main>
    </div>
  );
}
