"use client";
import Image from "next/image";
import { jumpToSection } from "./ChapterNavigation";

export function OrbitFinale({ language }: { language: "en" | "zh" }) {
  const en=language === "en";
  return <section className="orbit-finale" aria-label={en ? "From exploration to connection" : "从探索到连接"}>
    <picture className="orbit-finale-visual">
      <source type="image/webp" srcSet="./photos/black-hole-static-960.webp 960w, ./photos/black-hole-static-1920.webp 1920w" sizes="100vw" />
      <Image src="./photos/black-hole-static-1920.webp" width={1920} height={1080} alt="" unoptimized loading="lazy" />
    </picture>
    <div className="orbit-finale-copy">
      <p className="eyebrow">{en ? "A shared orbit" : "相遇的轨道"}</p>
      <h2>{en ? "Where paths meet." : "在此交汇。"}</h2>
      <a href="#contact" onClick={jumpToSection}>{en ? "Start a conversation" : "开始交流"}<span aria-hidden="true"> ↘</span></a>
    </div>
  </section>;
}
