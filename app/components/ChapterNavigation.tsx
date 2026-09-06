"use client";

import { useEffect, useState, type MouseEvent } from "react";

const chapters = [
  { id: "path", en: "Education", zh: "教育" },
  { id: "experience", en: "Work", zh: "工作" },
  { id: "pace", en: "Races", zh: "比赛" },
] as const;

export function jumpToSection(event: MouseEvent<HTMLAnchorElement>) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
  const id = event.currentTarget.hash.slice(1);
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  // Keep native, interruptible scrolling and honour the visitor's motion preference.
  window.history.pushState(null, "", `#${id}`);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth", block: "start" });
  target.focus({ preventScroll: true });
}

export function ChapterNavigation({ language }: { language: "en" | "zh" }) {
  const [active, setActive] = useState("");
  const [fraction, setFraction] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const marker = window.innerHeight * 0.3;
      const current = chapters.find(({ id }) => {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        return rect && rect.top <= marker && rect.bottom > marker;
      });
      setActive(current?.id ?? "");
      const rect = current && document.getElementById(current.id)?.getBoundingClientRect();
      setFraction(rect ? Math.max(0, Math.min(1, (marker - rect.top) / rect.height)) : 0);
    };
    const queue = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", queue); window.removeEventListener("resize", queue); };
  }, []);
  return (
    <nav className="chapter-navigation" aria-label={language === "en" ? "Chapter navigation" : "章节导航"}>
      <a className="chapter-home" href="#top" onClick={jumpToSection} aria-label={language === "en" ? "Sydrick Wu — back to top" : "Sydrick Wu — 返回顶部"}>Sydrick Wu
        <svg className="chapter-orbit" viewBox="0 0 36 36" aria-hidden="true" data-chapter={active}>
          <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" opacity=".2" />
          <ellipse cx="18" cy="18" rx="8" ry="15" fill="none" stroke="currentColor" opacity=".35" transform="rotate(40 18 18)" />
          <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="2" pathLength="100" strokeDasharray={`${fraction * 100} 100`} transform="rotate(-90 18 18)" />
          <circle cx="18" cy="18" r="3" fill="currentColor" />
        </svg>
      </a>
      <div className="chapter-links">
        {chapters.map(({ id, en, zh }) => <a key={id} href={`#${id}`} onClick={jumpToSection} aria-current={active === id ? "location" : undefined}>{language === "en" ? en : zh}</a>)}
      </div>
    </nav>
  );
}
