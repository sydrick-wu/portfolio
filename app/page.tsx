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
    location: "Mannheim → Zurich ↔ Shanghai",
    headlineA: "About Sydrick",
    headlineB: "",
    intro: "MSc Economics at Universität Mannheim, currently at the University of Zurich for exchange. Previously worked across venture capital, user growth and data analytics for Unilever; train and race in triathlon, running and cycling events.",
    enter: "Explore the orbit",
    github: "View GitHub",
    stats: [
      ["8.20/10", "University of Amsterdam GPA"],
      ["18", "countries explored"],
      ["1st", "triathlon age group"],
    ],
    scroll: "Scroll · the system unfolds",
    profileLabel: "01 / Profile",
    profileTitle: "A personal operating system for the long game.",
    profileIntro: "Three disciplines, one method: observe carefully, choose the highest-leverage move, then compound it.",
    pillars: [
      ["Economist", "MSc Economics at Universität Mannheim, currently on exchange at the University of Zurich. My focus is finance, macroeconomics, econometrics and applied decision-making.", ["Finance", "Macroeconomics", "Econometrics"]],
      ["Builder", "Experience spanning venture capital, founder relations, investment research and user growth at Y Combinator China, complemented by data and analytics work with GroupM’s Unilever team.", ["Venture Capital", "User Growth", "Data"]],
      ["Endurance athlete", "Triathlete, runner and cyclist. Recent highlights include an age-group win at the Zhejiang Triathlon Race, a 1:19:50 Frankfurt half marathon, and 48th of 1,660 at the ADAC Cycling Tour Classic in Heilbronn.", ["Triathlon", "Cycling", "Running"]],
    ],
    pathLabel: "02 / Path",
    pathTitle: "Education.",
    pathIntro: "Education and work across economics, venture, growth and data.",
    timeline: [
      ["Sep 2026 — Present", "University of Zurich", "Exchange Student · Economics", {
        summary: "Current exchange study in Economics in Zurich, Switzerland.",
        groups: [{ items: ["Public Debt Management", "Principles of Neuroeconomics", "Labor Economics", "Global Poverty and Economic Development", "Behavioral Economics: An Introductory Course", "Machine Learning in Economics", "Global Poverty and Economic Development — Cases"] }],
      }],
      ["2025 — 2027", "University of Mannheim", "Master of Science (MSc) in Economics · Expected 2027", {
        summary: "Provisional average: 1.8.",
        groups: [
          { label: "Top grades", items: ["Financial Economics — 1.0", "Topics in Macrofinance — 1.3"] },
          { label: "Selected coursework", items: ["Advanced Macroeconomics", "Advanced Econometrics", "Macroeconometrics", "Household Finance & Macroeconomics"] },
        ],
      }],
      ["2023 — 2024", "Y Combinator China · MiraclePlus", "Venture Capital · Founder Relations · User Growth", "Top 5% in deal sourcing; sourced and engaged 100+ early-stage technology startups, supporting four angel investments. Contributed to due diligence and Demo Day; later helped grow Startup School to 13,000+ enrollments."],
      ["2023", "University of Amsterdam", "Exchange · Economics & Business", {
        summary: "GPA: 8.20/10.",
        groups: [
          { label: "Top grades", items: ["Mathematics 2 for Economics — 9.5", "Applied Econometrics for Business — 8.5", "Corporate Finance — 8.0"] },
          { label: "Additional coursework", items: ["Macroeconomics 2", "Information & Data Management"] },
        ],
      }],
      ["2020 — 2025", "University of Nottingham", "Bachelor of Science (Honours) in Economics", {
        summary: "Final average: 71/100 · First Class Honours · Top 10%.",
        groups: [
          { label: "High marks", items: ["Introduction to Microeconomics — 80", "Machine Learning — 78", "Advanced Experimental & Behavioural Economics — 74", "Econometrics I — 73", "Dissertation — 73"] },
          { label: "Honours", items: ["Nottingham Advantage Award", "Research Assistant to the Dean across five industry projects"] },
        ],
      }],
      ["2022", "GroupM · Unilever Team", "Data, Insight & Analytics", "Built three Power BI dashboards using Nielsen and planning datasets; automated reporting with Robotic Process Automation (RPA); delivered audience and campaign insights for Unilever."],
      ["2021", "Feilan Advertising", "Global E-commerce Marketing", "Used social data to refine overseas positioning; produced 100+ short videos and 200+ product visuals, helping add 7,000+ followers across overseas channels."],
    ],
    paceLabel: "03 / Pace",
    paceTitle: "The body is part of the work.",
    paceIntro: "Endurance sport is where planning becomes physical: consistency, recovery and honest feedback, repeated over years.",
    raceLog: "Race log",
    raceYear: "2025–2026 selection",
    paceModes: ["SWIM", "RIDE", "RUN"],
    races: [
      ["48th", "ADAC Cycling Tour Classic", "48 / 1,660 overall · Heilbronn · 117.97 km · 3:10:37 · 23 Aug 2026"],
      ["1:19:50", "Frankfurter Mainova Half Marathon", "Frankfurt · Personal best · 22 Mar 2026"],
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
    back: "Back to the orbit",
  },
  zh: {
    assistantLabel: "智能助手",
    assistantAction: "切换至英文",
    assistantAria: "请智能助手改用英文介绍",
    nav: ["简介", "经历", "耐力", "联系"],
    descriptor: "经济学 · 耐力运动 · 科技",
    contact: "与我联系",
    portfolio: "个人主页 / 2026",
    location: "德国曼海姆 → 瑞士苏黎世 ↔ 中国上海",
    headlineA: "关于 Sydrick",
    headlineB: "",
    intro: "曼海姆大学经济学硕士生，目前在苏黎世大学交换学习。曾从事风险投资、用户增长，并为联合利华开展数据分析工作；持续参加铁人三项、跑步和自行车赛事训练与竞赛。",
    enter: "沿轨道向下探索",
    github: "查看 GitHub",
    stats: [
      ["8.20/10", "阿姆斯特丹大学交换绩点"],
      ["18", "探索过的国家"],
      ["冠军", "铁人三项年龄组"],
    ],
    scroll: "向下滚动 · 轨道随之展开",
    profileLabel: "01 / 简介",
    profileTitle: "一套面向长期主义的个人操作系统。",
    profileIntro: "三个领域，同一种方法：认真观察，选择杠杆最高的一步，然后让成果持续复利。",
    pillars: [
      ["经济学者", "曼海姆大学经济学硕士生，目前在苏黎世大学交换学习；关注金融、宏观经济学、计量经济学与应用决策。", ["金融", "宏观经济学", "计量经济学"]],
      ["构建者", "曾在 Y Combinator 中国从事风险投资、创始人关系、投资研究与用户增长，并在群邑联合利华团队参与数据与分析工作。", ["风险投资", "用户增长", "数据分析"]],
      ["耐力运动者", "铁人三项、跑步和自行车运动者。近期成绩包括浙江铁人三项赛年龄组冠军、法兰克福半程马拉松 1:19:50，以及海尔布隆 ADAC 自行车巡回赛经典赛 1,660 人中第 48 名。", ["铁人三项", "骑行", "跑步"]],
    ],
    pathLabel: "02 / 经历",
    pathTitle: "教育经历。",
    pathIntro: "跨越经济学、风险投资、增长与数据的教育和工作经历。",
    timeline: [
      ["2026 年 9 月 — 至今", "苏黎世大学", "交换生 · 经济学", {
        summary: "目前在瑞士苏黎世进行经济学交换学习。",
        groups: [{ items: ["公共债务管理", "神经经济学原理", "劳动经济学", "全球贫困与经济发展", "行为经济学导论", "经济学中的机器学习", "全球贫困与经济发展案例"] }],
      }],
      ["2025 — 2027", "曼海姆大学", "经济学理学硕士 · 预计 2027 年毕业", {
        summary: "当前平均分：1.8。",
        groups: [
          { label: "高分课程", items: ["金融经济学 — 1.0", "宏观金融专题 — 1.3"] },
          { label: "精选课程", items: ["高级宏观经济学", "高级计量经济学", "宏观计量经济学", "家庭金融与宏观经济学"] },
        ],
      }],
      ["2023 — 2024", "Y Combinator 中国 · 奇绩创坛", "风险投资 · 创始人关系 · 用户增长", "项目搜寻表现位列实习生前 5%；接触并筛选 100+ 家早期科技创业公司，支持 4 笔天使轮投资。参与尽职调查与 Demo Day，随后协助 Startup School 获得 13,000+ 报名。"],
      ["2023", "阿姆斯特丹大学", "交换学习 · 经济学与商业", {
        summary: "绩点：8.20/10。",
        groups: [
          { label: "高分课程", items: ["经济学数学 — 9.5", "商业应用计量经济学 — 8.5", "公司金融 — 8.0"] },
          { label: "其他课程", items: ["宏观经济学 2", "信息与数据管理"] },
        ],
      }],
      ["2020 — 2025", "诺丁汉大学", "经济学荣誉理学学士", {
        summary: "最终均分：71/100 · 一等荣誉学位 · 前 10%。",
        groups: [
          { label: "高分课程", items: ["微观经济学导论 — 80", "机器学习 — 78", "高级实验与行为经济学 — 74", "计量经济学 I — 73", "毕业论文 — 73"] },
          { label: "荣誉经历", items: ["Nottingham Advantage Award（诺丁汉优势奖）", "担任研究生院院长研究助理，参与 5 个产业研究项目"] },
        ],
      }],
      ["2022", "群邑 · 联合利华团队", "数据、洞察与分析", "使用 Nielsen 与媒介规划数据搭建 3 个 Power BI 仪表板；通过机器人流程自动化（RPA）提升报告效率；为联合利华提供受众与营销活动洞察。"],
      ["2021", "飞岚广告", "全球电商营销", "利用社交媒体数据优化海外市场定位；制作 100+ 支短视频和 200+ 张产品视觉素材，帮助海外账号新增 7,000+ 名粉丝。"],
    ],
    paceLabel: "03 / 耐力",
    paceTitle: "身体，也是作品的一部分。",
    paceIntro: "耐力运动让计划变得可触摸：持续训练、充分恢复、诚实反馈，并以年为尺度重复。",
    raceLog: "赛事记录",
    raceYear: "2025–2026 精选",
    paceModes: ["游泳", "骑行", "跑步"],
    races: [
      ["第 48 名", "ADAC 自行车巡回赛经典赛", "总排名 48 / 1,660 · 海尔布隆 · 117.97 公里 · 3:10:37 · 2026 年 8 月 23 日"],
      ["1:19:50", "法兰克福 Mainova 半程马拉松", "个人最佳 · 2026 年 3 月 22 日"],
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
    back: "返回个人轨道",
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
        root.style.setProperty("--portrait-progress", `${progress}`);
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
                <div className="hero-title-system">
                  <span>{language === "zh" ? "个人系统 / 001" : "PERSONAL SYSTEM / 001"}</span>
                  <h1 aria-label={t.headlineA}>
                    <strong>Sydrick</strong>
                  </h1>
                </div>
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
                <div className="timeline-main">
                  <h3>{place}</h3><p className="timeline-role">{role}</p>
                  {typeof note === "string" ? <p className="timeline-note">{note}</p> : (
                    <div className="timeline-note timeline-note-structured">
                      <p className="timeline-note-summary">{note.summary}</p>
                      {note.groups.map((group, groupIndex) => (
                        <div className="timeline-note-group" key={`${place}-${groupIndex}`}>
                          {"label" in group && group.label ? <p className="timeline-note-label">{group.label}</p> : null}
                          <ul className="timeline-note-list">{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
