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
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const marker = window.innerHeight * 0.3;
      const current = chapters.find(({ id }) => {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        return rect && rect.top <= marker && rect.bottom > marker;
      });
      setActive(current?.id ?? "");
    };
    const queue = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", queue); window.removeEventListener("resize", queue); };
  }, []);
  return (
    <nav className="chapter-navigation" aria-label={language === "en" ? "Chapter navigation" : "章节导航"}>
      <a className="chapter-home" href="#top" onClick={jumpToSection} aria-label={language === "en" ? "Sydrick Wu — back to top" : "Sydrick Wu — 返回顶部"}>Sydrick Wu<span aria-hidden="true"> / </span></a>
      <div className="chapter-links">
        {chapters.map(({ id, en, zh }) => <a key={id} href={`#${id}`} onClick={jumpToSection} aria-current={active === id ? "location" : undefined}>{language === "en" ? en : zh}</a>)}
      </div>
    </nav>
  );
}
