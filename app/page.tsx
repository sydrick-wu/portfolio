"use client";

import { useEffect, useRef, useState } from "react";
import { InteractivePortrait, type Expression } from "./components/InteractivePortrait";

type Language = "en" | "zh";

const content = {
  en: {
    assistantLabel: "AI ASSISTANT",
    assistantAction: "INTRODUCE IN CHINESE",
    assistantAria: "Ask the AI assistant to continue in Chinese",
    nav: ["Profile", "Path", "Pace", "Contact"],
    descriptor: "Economics · Endurance · Technology",
    contact: "Let’s talk",
    portfolio: "Portfolio / 2026",
    location: "Mannheim, Germany ↔ Shanghai, China",
    headlineA: "Think in systems.",
    headlineB: "Move with intent.",
    intro: "I’m Sydrick—an economics graduate student, technology operator and endurance athlete exploring how ambitious ideas become measurable progress.",
    enter: "Enter my world",
    github: "View GitHub",
    stats: [
      ["Top 3%", "Amsterdam economics cohort"],
      ["18", "countries explored"],
      ["1st", "triathlon age group"],
    ],
    scroll: "Scroll to navigate the system",
    profileLabel: "01 / Profile",
    profileTitle: "A personal operating system for the long game.",
    profileIntro: "Three disciplines, one method: observe carefully, choose the highest-leverage move, then compound it.",
    pillars: [
      ["Economist", "I use economic reasoning to turn noisy markets, incentives and human behaviour into decisions that can survive contact with reality.", ["Economics", "Data", "Strategy"]],
      ["Builder", "From venture scouting to product growth, I move between research, systems and hands-on execution—especially around emerging technology.", ["Artificial Intelligence", "Venture", "Growth"]],
      ["Endurance athlete", "Running, riding and swimming are my long-form practice in patience: measure the signal, manage the load, keep moving.", ["Triathlon", "Cycling", "Running"]],
    ],
    pathLabel: "02 / Path",
    pathTitle: "Selected coordinates.",
    pathIntro: "Education and work across economics, venture, growth and data.",
    timeline: [
      ["2025 — 2027", "University of Mannheim", "Master of Science (MSc) in Economics", "Graduate study in economics in Mannheim, Germany."],
      ["2023 — 2024", "MiraclePlus · former YC China", "Founder Relations · Investment · Growth", "Deal sourcing, due diligence and product user growth for the startup ecosystem."],
      ["2023", "University of Amsterdam", "Bachelor of Science in Economics & Business Economics", "8.20 / 10.00 grade point average · Top 3% of the cohort."],
      ["2020 — 2025", "University of Nottingham", "Bachelor of Science (Honours) in Economics", "First Class Honours. A cross-cultural education across China and Europe."],
      ["2022", "GroupM · Unilever Team", "Data, Insight & Analytics", "Commercial analysis at the intersection of media, consumers and technology."],
    ],
    paceLabel: "03 / Pace",
    paceTitle: "The body is part of the work.",
    paceIntro: "Endurance sport is where planning becomes physical: consistency, recovery and honest feedback, repeated over years.",
    raceLog: "Race log",
    raceYear: "2025 selection",
    paceModes: ["SWIM", "RIDE", "RUN"],
    races: [
      ["1st", "Qiandao Lake Triathlon", "18–29 age group · Olympic distance"],
      ["4th", "Taizhou Asia Triathlon Cup", "18–29 age group · Sprint distance"],
      ["1:26:09", "Half Marathon Asian Championship", "Half marathon · 2025"],
      ["3rd", "Ningbo Half Marathon", "Men’s 10 km · 2025"],
    ],
    quote: "“Give, share, lose, lest we die unbloomed.”",
    principle: "Personal principle",
    contactLabel: "04 / Contact",
    contactTitle: "Build something worth the miles.",
    contactIntro: "I’m open to thoughtful conversations around economics, technology, venture, ambitious products and endurance sport.",
    socialLabels: ["GitHub", "LinkedIn", "Strava", "Instagram", "Email"],
    back: "Back to the portrait",
  },
  zh: {
    assistantLabel: "智能助手",
    assistantAction: "切换至英文",
    assistantAria: "请智能助手改用英文介绍",
    nav: ["简介", "经历", "耐力", "联系"],
    descriptor: "经济学 · 耐力运动 · 科技",
    contact: "与我联系",
    portfolio: "个人主页 / 2026",
    location: "德国曼海姆 ↔ 中国上海",
    headlineA: "系统思考。",
    headlineB: "坚定前行。",
    intro: "我是 Sydrick——经济学硕士生、科技行业实践者与耐力运动者。我关注宏大想法如何转化为可衡量、可持续的进步。",
    enter: "进入我的世界",
    github: "查看 GitHub",
    stats: [
      ["前 3%", "阿姆斯特丹经济学专业"],
      ["18", "探索过的国家"],
      ["冠军", "铁人三项年龄组"],
    ],
    scroll: "向下滚动，浏览我的系统",
    profileLabel: "01 / 简介",
    profileTitle: "一套面向长期主义的个人操作系统。",
    profileIntro: "三个领域，同一种方法：认真观察，选择杠杆最高的一步，然后让成果持续复利。",
    pillars: [
      ["经济学者", "我用经济学思维理解市场、激励与人的行为，把嘈杂的信息转化为经得起现实检验的决策。", ["经济学", "数据", "战略"]],
      ["构建者", "从风险投资项目搜寻到产品增长，我在研究、系统与实际执行之间切换，尤其关注前沿科技。", ["人工智能", "风险投资", "增长"]],
      ["耐力运动者", "跑步、骑行和游泳是我长期训练耐心的方式：识别信号、管理负荷、持续前进。", ["铁人三项", "骑行", "跑步"]],
    ],
    pathLabel: "02 / 经历",
    pathTitle: "人生坐标。",
    pathIntro: "跨越经济学、风险投资、增长与数据的教育和工作经历。",
    timeline: [
      ["2025 — 2027", "曼海姆大学", "经济学理学硕士", "在德国曼海姆进行经济学研究生阶段学习。"],
      ["2023 — 2024", "奇绩创坛 · 原 YC 中国", "创始人关系 · 投资 · 增长", "参与项目搜寻、尽职调查与创业生态产品的用户增长。"],
      ["2023", "阿姆斯特丹大学", "经济学与商业经济学理学学士", "平均成绩 8.20 / 10.00 · 年级前 3%。"],
      ["2020 — 2025", "诺丁汉大学", "经济学荣誉理学学士", "一等荣誉学位，学习经历横跨中国与欧洲。"],
      ["2022", "群邑 · 联合利华团队", "数据、洞察与分析", "在媒体、消费者与技术交叉领域进行商业分析。"],
    ],
    paceLabel: "03 / 耐力",
    paceTitle: "身体，也是作品的一部分。",
    paceIntro: "耐力运动让计划变得可触摸：持续训练、充分恢复、诚实反馈，并以年为尺度重复。",
    raceLog: "赛事记录",
    raceYear: "2025 精选",
    paceModes: ["游泳", "骑行", "跑步"],
    races: [
      ["冠军", "千岛湖铁人三项公开赛", "18–29 岁年龄组 · 奥林匹克距离"],
      ["第 4 名", "台州亚洲铁人三项杯", "18–29 岁年龄组 · 短距离"],
      ["1:26:09", "亚洲半程马拉松锦标赛", "半程马拉松 · 2025"],
      ["季军", "宁波半程马拉松", "男子 10 公里 · 2025"],
    ],
    quote: "“付出、分享、舍弃，莫让生命未曾绽放。”",
    principle: "个人准则",
    contactLabel: "04 / 联系",
    contactTitle: "做值得长途奔赴的事。",
    contactIntro: "欢迎和我交流经济学、科技、风险投资、富有野心的产品，以及耐力运动。",
    socialLabels: ["GitHub", "领英", "Strava", "Instagram", "邮箱"],
    back: "返回 3D 人物",
  },
} as const;

const sectionIds = ["profile", "path", "pace", "contact"];

const socialLinks = [
  "https://github.com/sydrick-wu",
  "https://www.linkedin.com/in/sydrick-wu",
  "https://www.strava.com/athletes/134105140",
  "https://www.instagram.com/syddddddrick",
  "mailto:sydrick.wu@gmail.com",
];

const assistantMessages: Record<Language, string> = {
  en: "All right—I'll introduce Sydrick in English from now on.",
  zh: "好，现在开始我用中文介绍 Sydrick。",
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [transitionTarget, setTransitionTarget] = useState<Language | null>(null);
  const [activeSection, setActiveSection] = useState("profile");
  const [expression, setExpression] = useState<Expression>("neutral");
  const transitionTimers = useRef<number[]>([]);
  const t = content[language];

  useEffect(() => {
    const saved = window.localStorage.getItem("sydrick-language") as Language | null;
    const preferred = saved === "zh" || saved === "en" ? saved : "en";
    setLanguage(preferred);
    document.documentElement.lang = preferred === "zh" ? "zh-CN" : "en";
    return () => transitionTimers.current.forEach(window.clearTimeout);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const updatePointer = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--pointer-x", `${event.clientX / innerWidth - 0.5}`);
        root.style.setProperty("--pointer-y", `${event.clientY / innerHeight - 0.5}`);
      });
    };
    const updateScroll = () => {
      const available = root.scrollHeight - innerHeight;
      root.style.setProperty("--scroll-progress", `${available > 0 ? scrollY / available : 0}`);
    };
    const sections = [...document.querySelectorAll<HTMLElement>("section[id]")];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-32% 0px -46% 0px", threshold: [0.05, 0.25, 0.55] },
    );
    sections.forEach((section) => observer.observe(section));
    addEventListener("pointermove", updatePointer, { passive: true });
    addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => {
      observer.disconnect();
      removeEventListener("pointermove", updatePointer);
      removeEventListener("scroll", updateScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const toggleLanguage = () => {
    if (transitionTarget) return;
    const next = language === "en" ? "zh" : "en";
    setTransitionTarget(next);
    transitionTimers.current.push(window.setTimeout(() => {
      setLanguage(next);
      window.localStorage.setItem("sydrick-language", next);
      document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
    }, 900));
    transitionTimers.current.push(window.setTimeout(() => setTransitionTarget(null), 1180));
  };

  return (
    <>
      {transitionTarget && (
        <div className="language-transition" role="status" aria-live="assertive">
          <div className="assistant-transition-card">
            <span>{content[transitionTarget].assistantLabel}</span>
            <p>{assistantMessages[transitionTarget]}</p>
            <i aria-hidden="true" />
          </div>
        </div>
      )}
      <div className="site-shell" aria-hidden={transitionTarget ? true : undefined}>
      <div className="progress-rail" aria-hidden="true"><span /></div>
      <header className="topbar">
        <a className="brand" href="#top" aria-label={language === "zh" ? "Sydrick Wu — 返回顶部" : "Sydrick Wu — back to top"}>
          <span className="brand-mark">SW</span>
          <span className="brand-copy"><strong>Sydrick Wu</strong><small>{t.descriptor}</small></span>
        </a>
        <nav aria-label={language === "zh" ? "主导航" : "Primary navigation"}>
          {sectionIds.map((id, index) => (
            <a href={`#${id}`} key={id} className={activeSection === id ? "active" : ""}>{t.nav[index]}</a>
          ))}
        </nav>
        <div className="top-actions">
          <button className="language-toggle" type="button" onClick={toggleLanguage} aria-label={t.assistantAria} disabled={Boolean(transitionTarget)}>
            <span className="assistant-orb" aria-hidden="true">✦</span>
            <span className="language-copy"><small>{t.assistantLabel}</small><strong>{t.assistantAction}</strong></span>
          </button>
          <a className="top-contact" href="mailto:sydrick.wu@gmail.com">{t.contact} <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-kicker"><span className="live-dot" aria-hidden="true" />{t.portfolio}</div>
          <div className="hero-copy">
            <p className="eyebrow">{t.location}</p>
            <h1>{t.headlineA}<span>{t.headlineB}</span></h1>
            <p className="hero-intro">{t.intro}</p>
            <div className="hero-actions">
              <a className="button primary" href="#profile">{t.enter}<span aria-hidden="true">↓</span></a>
              <a className="text-link" href="https://github.com/sydrick-wu" target="_blank" rel="noreferrer">{t.github}<span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="hero-scene">
            <div className="scene-coordinate coordinate-one">49.4875° N</div>
            <div className="scene-coordinate coordinate-two">08.4660° E</div>
            <InteractivePortrait expression={expression} language={language} onExpressionChange={setExpression} />
          </div>
          <div className="hero-stats" aria-label={language === "zh" ? "个人亮点" : "Highlights"}>
            {t.stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
          </div>
          <p className="scroll-cue">{t.scroll}<span aria-hidden="true">↓</span></p>
        </section>

        <section className="profile section-pad" id="profile">
          <div className="section-heading">
            <p className="eyebrow">{t.profileLabel}</p>
            <h2>{t.profileTitle}</h2>
            <p>{t.profileIntro}</p>
          </div>
          <div className="pillar-grid">
            {t.pillars.map(([title, copy, tags], index) => (
              <article className="pillar-card" key={title}>
                <div className="pillar-top"><span>0{index + 1}</span><span aria-hidden="true">↗</span></div>
                <h3>{title}</h3><p>{copy}</p>
                <ul aria-label={language === "zh" ? `${title}主题` : `${title} topics`}>{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="path section-pad" id="path">
          <div className="section-heading path-heading">
            <p className="eyebrow">{t.pathLabel}</p><h2>{t.pathTitle}</h2><p>{t.pathIntro}</p>
          </div>
          <div className="timeline">
            {t.timeline.map(([years, place, role, note], index) => (
              <article className="timeline-row" key={`${years}-${place}`}>
                <div className="timeline-index">0{index + 1}</div><div className="timeline-years">{years}</div>
                <div className="timeline-main"><h3>{place}</h3><p className="timeline-role">{role}</p><p className="timeline-note">{note}</p></div>
                <span className="timeline-plus" aria-hidden="true">+</span>
              </article>
            ))}
          </div>
        </section>

        <section className="pace section-pad" id="pace">
          <div className="pace-rings" aria-hidden="true">{t.paceModes.map((mode) => <span key={mode}>{mode}</span>)}</div>
          <div className="section-heading pace-heading">
            <p className="eyebrow">{t.paceLabel}</p><h2>{t.paceTitle}</h2><p>{t.paceIntro}</p>
          </div>
          <div className="race-board">
            <div className="race-board-title"><span>{t.raceLog}</span><span>{t.raceYear}</span></div>
            {t.races.map(([result, event, detail]) => (
              <article className="race-row" key={event}><strong>{result}</strong><h3>{event}</h3><p>{detail}</p><span aria-hidden="true">↗</span></article>
            ))}
          </div>
          <div className="pace-quote"><p>{t.quote}</p><span>{t.principle}</span></div>
        </section>

        <section className="contact section-pad" id="contact">
          <p className="eyebrow">{t.contactLabel}</p><h2>{t.contactTitle}</h2><p className="contact-copy">{t.contactIntro}</p>
          <a className="contact-email" href="mailto:sydrick.wu@gmail.com">sydrick.wu@gmail.com <span aria-hidden="true">↗</span></a>
          <div className="social-row">
            {socialLinks.map((href, index) => <a href={href} key={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{t.socialLabels[index]}<span aria-hidden="true">↗</span></a>)}
          </div>
          <footer><span>© 2026 Sydrick Wu</span><span>{t.descriptor}</span><a href="#top">{t.back} ↑</a></footer>
        </section>
      </main>
      </div>
    </>
  );
}
