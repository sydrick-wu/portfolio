"use client";
import { useState } from "react";
import BlackHole from "@/components/ui/optimized-black-hole";
import { jumpToSection } from "./ChapterNavigation";

export function OrbitFinale({ language }: { language: "en" | "zh" }) {
  const [paused, setPaused] = useState(false);
  const en=language === "en";
  return <section className="orbit-finale" aria-label={en ? "From exploration to connection" : "从探索到连接"}>
    <div className="orbit-finale-visual"><BlackHole paused={paused} /></div>
    <div className="orbit-finale-copy">
      <p className="eyebrow">{en ? "A shared orbit" : "相遇的轨道"}</p>
      <h2>{en ? "Where paths meet." : "在此交汇。"}</h2>
      <a href="#contact" onClick={jumpToSection}>{en ? "Start a conversation" : "开始交流"}<span aria-hidden="true"> ↘</span></a>
    </div>
    <button type="button" className="orbit-motion-control" onClick={() => setPaused(!paused)} aria-pressed={paused}>{en ? (paused ? "Resume motion" : "Pause motion") : (paused ? "继续动画" : "暂停动画")}</button>
  </section>;
}
