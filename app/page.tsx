"use client";

import { useEffect, useRef, useState } from "react";
import { InteractivePortrait } from "./components/InteractivePortrait";

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
    headlineA: "About Sydrick",
    headlineB: "",
    intro: "MSc Economics student at the University of Mannheim. Previously worked across venture, growth and analytics; trains and races in triathlon, running and cycling.",
    enter: "Scroll through the portrait",
    github: "View GitHub",
    stats: [
      ["Top 3%", "Amsterdam economics cohort"],
      ["18", "countries explored"],
      ["1st", "triathlon age group"],
    ],
    scroll: "Scroll · the camera follows",
    profileLabel: "01 / Profile",
    profileTitle: "A personal operating system for the long game.",
    profileIntro: "Three disciplines, one method: observe carefully, choose the highest-leverage move, then compound it.",
    pillars: [
      ["Economist", "MSc Economics at the University of Mannheim, following economics study at Amsterdam and Nottingham. My focus is incentives, markets and applied decision-making.", ["Economics", "Data", "Strategy"]],
      ["Builder", "Experience in founder relations, investment research and growth at MiraclePlus, plus data and analytics work with GroupM’s Unilever team.", ["Artificial Intelligence", "Venture", "Growth"]],
      ["Endurance athlete", "Triathlete, runner and cyclist. My 2025 results include an age-group win at Qiandao Lake and a 1:26:09 half marathon.", ["Triathlon", "Cycling", "Running"]],
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
    headlineA: "关于 Sydrick",
    headlineB: "",
    intro: "曼海姆大学经济学硕士生，曾从事风险投资、增长与数据分析工作；同时持续参加铁人三项、跑步和自行车赛事。",
    enter: "沿头像向下探索",
    github: "查看 GitHub",
    stats: [
      ["前 3%", "阿姆斯特丹经济学专业"],
      ["18", "探索过的国家"],
      ["冠军", "铁人三项年龄组"],
    ],
    scroll: "向下滚动 · 镜头随之移动",
    profileLabel: "01 / 简介",
    profileTitle: "一套面向长期主义的个人操作系统。",
    profileIntro: "三个领域，同一种方法：认真观察，选择杠杆最高的一步，然后让成果持续复利。",
    pillars: [
      ["经济学者", "现就读于曼海姆大学经济学硕士，此前在阿姆斯特丹与诺丁汉学习经济学，关注激励、市场与应用决策。", ["经济学", "数据", "战略"]],
      ["构建者", "曾在奇绩创坛参与创始人关系、投资研究与增长，也在群邑联合利华团队从事数据与分析工作。", ["人工智能", "风险投资", "增长"]],
      ["耐力运动者", "铁人三项、跑步和自行车运动者。2025 年取得千岛湖铁人三项年龄组冠军，并跑出 1:26:09 半程马拉松。", ["铁人三项", "骑行", "跑步"]],
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
  const [storyStage, setStoryStage] = useState(0);
  const transitionTimers = useRef<number[]>([]);
  const storyRef = useRef<HTMLElement>(null);
  const storyProgress = useRef(0);
  const t = content[language];

  useEffect(() => {
    const saved = window.localStorage.getItem("sydrick-language") as Language | null;
    const preferred = saved === "zh" || saved === "en" ? saved : "en";
    const timers = transitionTimers.current;
    const languageFrame = window.requestAnimationFrame(() => {
      setLanguage(preferred);
      document.documentElement.lang = preferred === "zh" ? "zh-CN" : "en";
    });
    return () => {
      window.cancelAnimationFrame(languageFrame);
      timers.forEach(window.clearTimeout);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let currentStoryStage = 0;
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
      if (storyRef.current) {
        const rect = storyRef.current.getBoundingClientRect();
        const storyRange = Math.max(1, storyRef.current.offsetHeight - innerHeight);
        const progress = Math.min(1, Math.max(0, -rect.top / storyRange));
        storyProgress.current = progress;
        storyRef.current.style.setProperty("--story-progress", `${progress}`);
        const nextStage = progress < 0.14 ? 0 : progress < 0.39 ? 1 : progress < 0.64 ? 2 : 3;
        if (nextStage !== currentStoryStage) {
          currentStoryStage = nextStage;
          setStoryStage(nextStage);
        }
      }
    };
    addEventListener("pointermove", updatePointer, { passive: true });
    addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => {
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
      <div className="global-portrait-scene" aria-hidden="true">
        <InteractivePortrait language={language} progressRef={storyProgress} />
      </div>
      <div className="progress-rail" aria-hidden="true"><span /></div>
      <header className={`topbar sen-chrome stage-${storyStage}`}>
        <div className="sen-frame" aria-hidden="true" />
        <span className="sen-mark sen-mark-tl" aria-hidden="true">+</span>
        <span className="sen-mark sen-mark-tr" aria-hidden="true">+</span>
        <span className="sen-mark sen-mark-bl" aria-hidden="true">+</span>
        <span className="sen-mark sen-mark-br" aria-hidden="true">+</span>
        <a className="brand" href="#top" aria-label={language === "zh" ? "Sydrick Wu — 返回顶部" : "Sydrick Wu — back to top"}>
          <span className="brand-copy"><strong>Sydrick Wu</strong><small>{t.descriptor}</small></span>
        </a>
        <div className="sen-meta sen-meta-top">{t.portfolio}</div>
        <div className="sen-meta sen-meta-bottom">{t.descriptor}</div>
        <div className="sen-meta sen-meta-side">{t.location}</div>
        <div className="top-actions">
          <button className="language-toggle" type="button" onClick={toggleLanguage} aria-label={t.assistantAria} disabled={Boolean(transitionTarget)}>
            <span className="assistant-orb" aria-hidden="true">✦</span>
            <span className="language-copy"><small>{t.assistantLabel}</small><strong>{t.assistantAction}</strong></span>
          </button>
          <a className="top-contact" href="mailto:sydrick.wu@gmail.com">{t.contact} <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <main>
        <section className="portrait-story" id="profile" ref={storyRef} data-stage={storyStage}>
          <span className="top-anchor" id="top" />
          <span className="story-anchor story-anchor-one" id="portrait-chapter-1" />
          <div className="story-sticky">
            <div className="story-copy-stack">
              <article className={`story-copy story-intro ${storyStage === 0 ? "active" : ""}`} aria-hidden={storyStage !== 0}>
                <h1>{t.headlineA}</h1>
                <p className="hero-intro">{t.intro}</p>
                <div className="hero-actions">
                  <a className="button primary" href="#portrait-chapter-1">{t.enter}<span aria-hidden="true">↓</span></a>
                  <a className="text-link" href="https://github.com/sydrick-wu" target="_blank" rel="noreferrer">{t.github}<span aria-hidden="true">↗</span></a>
                </div>
              </article>

              {t.pillars.map(([title, copy, tags], index) => (
                <article className={`story-copy story-chapter ${storyStage === index + 1 ? "active" : ""}`} aria-hidden={storyStage !== index + 1} key={title}>
                  <p className="eyebrow">0{index + 1} / {t.profileLabel.split(" / ")[1]}</p>
                  <h2>{title}</h2>
                  <p>{copy}</p>
                  <ul aria-label={language === "zh" ? `${title}主题` : `${title} topics`}>{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                </article>
              ))}
            </div>

            <p className={`scroll-cue ${storyStage === 0 ? "active" : ""}`}>{t.scroll}<span aria-hidden="true">↓</span></p>
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
