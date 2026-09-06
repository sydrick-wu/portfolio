"use client";

import { useEffect, useRef, useState } from "react";
import { InteractivePortrait } from "./components/InteractivePortrait";
import { EditorialPhoto, PortraitEditorial, RaceEditorial } from "./components/EditorialPhotos";

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
          { label: "Selected results · 1.0 is the highest grade", courses: [
            ["Financial Economics", "1.0"],
            ["Topics in Macrofinance (Seminar)", "1.3"],
            ["Advanced Macroeconomics", "1.7"],
            ["Macroeconometrics", "1.7"],
            ["Household Finance and Macroeconomics", "1.7"],
          ] },
        ],
      }],
      ["2023 — 2024", "Y Combinator China · MiraclePlus", "Venture Capital · Founder Relations · User Growth", "Top 5% in deal sourcing; sourced and engaged 100+ early-stage technology startups, supporting four angel investments. Contributed to due diligence and Demo Day; later helped grow Startup School to 13,000+ enrollments."],
      ["2023", "University of Amsterdam", "Exchange · Economics & Business", {
        summary: "Grade point average (GPA): 8.20/10 · Top 4%.",
        groups: [
          { label: "High marks · out of 10", courses: [
            ["Mathematics 2 for Economics", "9.5"],
            ["Applied Econometrics for Business", "8.5"],
            ["Corporate Finance", "8.0"],
          ] },
        ],
      }],
      ["2020 — 2025", "University of Nottingham", "Bachelor of Science (Honours) in Economics", {
        summary: "Final average: 71/100 · First Class Honours · Top 10%.",
        groups: [
          { label: "2021–25 high marks · out of 100", courses: [
            ["Introduction to Microeconomics", "80"],
            ["Machine Learning", "78"],
            ["Advanced Experimental and Behavioural Economics", "74"],
            ["Econometrics I", "73"],
            ["Dissertation", "73"],
            ["Advanced Macroeconomics", "72"],
            ["Growth and Development in Long-Run Historical Perspective", "71"],
            ["Business Finance", "70"],
          ] },
          { label: "2020–21 high marks · out of 100", courses: [
            ["Introduction to Business Economics", "91"],
            ["Introduction to Information Technology", "90"],
            ["Introduction to Business & Management", "83"],
            ["Oral Communication Skills A", "81"],
            ["Undergraduate Reading and Writing in Academic Contexts", "72"],
            ["Oral Communication Skills B", "70"],
          ] },
          { label: "Nottingham Advantage Award · Recipient", items: ["Global Mentorship Program", "Nottingham University Business School China Consulting", "Writing Lab"] },
          { label: "Research & university sport", items: ["Research Assistant to the Dean of the Graduate School across five industry projects", "University of Nottingham Ningbo China half-marathon record holder", "University touch rugby varsity · Wing"] },
        ],
      }],
      ["2022", "GroupM · Unilever Team", "Data, Insight & Analytics", "Built three Power BI dashboards using Nielsen and planning datasets; automated reporting with Robotic Process Automation (RPA); delivered audience and campaign insights for Unilever."],
      ["2021", "Feilan Advertising", "Global E-commerce Marketing", "Used social data to refine overseas positioning; produced 100+ short videos and 200+ product visuals, helping add 7,000+ followers across overseas channels."],
      ["Selected", "Recognition & selected programmes", "Programme selections · Competitions · Creative work", {
        summary: "Selected programmes and activities alongside my studies.",
        groups: [
          { label: "Programme selections · 2018", items: ["Selected for the Harvard Summit for Young Leaders in China", "Selected for X Week · Harvard–Yale–Massachusetts Institute of Technology immersion"] },
          { label: "Competition projects", items: ["Massachusetts Institute of Technology Energy Hackathon · Collaborated with three students on an airline energy-cost project, 2018", "L’Oréal Global Business Strategy Competition · Developed a data-driven pop-up retail proposal, 2021"] },
          { label: "Creative credentials", items: ["Signed photographer · Orient IC and Tuchong", "B-Level sketching certificate"] },
        ],
      }],
    ],
    paceLabel: "03 / Pace",
    paceTitle: "The body is part of the work.",
    paceIntro: "Endurance sport is where planning becomes physical: consistency, recovery and honest feedback, repeated over years.",
    raceLog: "Race log",
    raceYear: "2025–2026 selection",
    paceModes: ["SWIM", "RIDE", "RUN"],
    sportingRecognition: "Team & recognition",
    sportingHonours: ["Sponsored triathlete · Beijing Huanyu Cycling Team", "University of Nottingham Ningbo China half-marathon record holder"],
    races: [
      ["48th", "ADAC Cycling Tour Classic", "48 / 1,660 overall · Heilbronn · 117.97 km · 3:10:37 · 23 Aug 2026"],
      ["1:19:50", "Frankfurter Mainova Half Marathon", "Frankfurt · Personal best · 22 Mar 2026"],
      ["1st", "Qiandao Lake Triathlon", "18–29 age group · Olympic distance"],
      ["4th", "Taizhou Asia Triathlon Cup", "18–29 age group · Sprint distance"],
      ["5th", "STC Shanghai Dishui Lake Triathlon", "18+ age group · Sprint distance · 2025"],
      ["3rd", "Duke Kunshan University Track Invitational", "Bronze medal · 2 miles · 2025"],
      ["2nd", "Duke Kunshan University Track Invitational", "Silver medal · Medley relay · 2025"],
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
          { label: "精选成绩 · 德国评分制，1.0 为最高分", courses: [
            ["金融经济学", "1.0"],
            ["宏观金融专题（研讨课）", "1.3"],
            ["高级宏观经济学", "1.7"],
            ["宏观计量经济学", "1.7"],
            ["家庭金融与宏观经济学", "1.7"],
          ] },
        ],
      }],
      ["2023 — 2024", "Y Combinator 中国 · 奇绩创坛", "风险投资 · 创始人关系 · 用户增长", "项目搜寻表现位列实习生前 5%；接触并筛选 100+ 家早期科技创业公司，支持 4 笔天使轮投资。参与尽职调查与 Demo Day，随后协助 Startup School 获得 13,000+ 报名。"],
      ["2023", "阿姆斯特丹大学", "交换学习 · 经济学与商业", {
        summary: "绩点：8.20/10 · 前 4%。",
        groups: [
          { label: "高分课程 · 满分 10 分", courses: [
            ["经济学数学 2", "9.5"],
            ["商业应用计量经济学", "8.5"],
            ["公司金融", "8.0"],
          ] },
        ],
      }],
      ["2020 — 2025", "诺丁汉大学", "经济学荣誉理学学士", {
        summary: "最终均分：71/100 · 一等荣誉学位 · 前 10%。",
        groups: [
          { label: "2021–25 年高分课程 · 满分 100 分", courses: [
            ["微观经济学导论", "80"],
            ["机器学习", "78"],
            ["高级实验与行为经济学", "74"],
            ["计量经济学 I", "73"],
            ["毕业论文", "73"],
            ["高级宏观经济学", "72"],
            ["长期历史视角下的增长与发展", "71"],
            ["商业金融", "70"],
          ] },
          { label: "2020–21 年高分课程 · 满分 100 分", courses: [
            ["商业经济学导论", "91"],
            ["信息技术导论", "90"],
            ["商业与管理导论", "83"],
            ["口语沟通技能 A", "81"],
            ["本科学术语境中的阅读与写作", "72"],
            ["口语沟通技能 B", "70"],
          ] },
          { label: "诺丁汉优势奖 · 获奖项目", items: ["全球导师计划", "诺丁汉大学商学院中国咨询项目", "写作实验室"] },
          { label: "研究与校队经历", items: ["担任研究生院院长研究助理，参与 5 个产业研究项目", "宁波诺丁汉大学半程马拉松纪录保持者", "校触式橄榄球队 · 边锋"] },
        ],
      }],
      ["2022", "群邑 · 联合利华团队", "数据、洞察与分析", "使用 Nielsen 与媒介规划数据搭建 3 个 Power BI 仪表板；通过机器人流程自动化（RPA）提升报告效率；为联合利华提供受众与营销活动洞察。"],
      ["2021", "飞岚广告", "全球电商营销", "利用社交媒体数据优化海外市场定位；制作 100+ 支短视频和 200+ 张产品视觉素材，帮助海外账号新增 7,000+ 名粉丝。"],
      ["精选", "荣誉与精选项目", "项目入选 · 竞赛参与 · 创作资质", {
        summary: "学习期间参与的精选项目与活动。",
        groups: [
          { label: "项目入选 · 2018 年", items: ["入选哈佛中美学生领袖峰会", "入选 X Week · 哈佛大学、耶鲁大学与麻省理工学院交流项目"] },
          { label: "竞赛项目", items: ["麻省理工学院能源黑客松 · 与三名学生合作研究航空能源成本项目，2018 年", "欧莱雅全球商业策略竞赛 · 提出基于数据分析的快闪零售方案，2021 年"] },
          { label: "创作资质", items: ["东方 IC 与图虫签约摄影师", "素描 B 级证书"] },
        ],
      }],
    ],
    paceLabel: "03 / 耐力",
    paceTitle: "身体，也是作品的一部分。",
    paceIntro: "耐力运动让计划变得可触摸：持续训练、充分恢复、诚实反馈，并以年为尺度重复。",
    raceLog: "赛事记录",
    raceYear: "2025–2026 精选",
    paceModes: ["游泳", "骑行", "跑步"],
    sportingRecognition: "车队与荣誉",
    sportingHonours: ["Beijing Huanyu Cycling Team 赞助铁三运动员", "宁波诺丁汉大学半程马拉松纪录保持者"],
    races: [
      ["第 48 名", "ADAC 自行车巡回赛经典赛", "总排名 48 / 1,660 · 海尔布隆 · 117.97 公里 · 3:10:37 · 2026 年 8 月 23 日"],
      ["1:19:50", "法兰克福 Mainova 半程马拉松", "个人最佳 · 2026 年 3 月 22 日"],
      ["冠军", "千岛湖铁人三项公开赛", "18–29 岁年龄组 · 奥林匹克距离"],
      ["第 4 名", "台州亚洲铁人三项杯", "18–29 岁年龄组 · 短距离"],
      ["第 5 名", "上海滴水湖铁人三项赛", "18 岁以上年龄组 · 短距离 · 2025 年"],
      ["季军", "昆山杜克大学田径邀请赛", "铜牌 · 两英里 · 2025 年"],
      ["亚军", "昆山杜克大学田径邀请赛", "银牌 · 混合接力 · 2025 年"],
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

        <PortraitEditorial language={language} />

        <section className="path section-pad" id="path">
          <div className="section-heading path-heading">
            <p className="eyebrow">{t.pathLabel}</p><h2>{t.pathTitle}</h2><p>{t.pathIntro}</p>
          </div>
          <div className="timeline">
            {t.timeline.map(([years, place, role, note], index) => (
              <article className={`timeline-row${typeof note === "string" ? "" : " timeline-row-expanded"}`} key={`${years}-${place}`}>
                <div className="timeline-index">0{index + 1}</div><div className="timeline-years">{years}</div>
                <div className="timeline-main">
                  <h3>{place}</h3><p className="timeline-role">{role}</p>
                  {index === 4 && <EditorialPhoto name="graduation" language={language} className="education-photo" caption={language === "en" ? "University of Nottingham · Graduation" : "诺丁汉大学 · 毕业典礼"} sizes="(max-width: 720px) 80vw, 48vw" />}
                  {typeof note === "string" ? <p className="timeline-note">{note}</p> : (
                    <div className="timeline-note timeline-note-structured">
                      <p className="timeline-note-summary">{note.summary}</p>
                      {note.groups.map((group, groupIndex) => (
                        <div className="timeline-note-group" key={`${place}-${groupIndex}`}>
                          {"label" in group && group.label ? <h4 className="timeline-note-label">{group.label}</h4> : null}
                          {"courses" in group ? (
                            <ul className="course-results">{group.courses.map(([course, grade]) => (
                              <li key={course}><span>{course}</span><strong>{grade}</strong></li>
                            ))}</ul>
                          ) : (
                            <ul className="timeline-note-list">{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {index === 7 && <EditorialPhoto name="heritage" language={language} className="heritage-photo" caption={language === "en" ? "A portrait in traditional dress" : "传统服饰肖像"} sizes="(max-width: 720px) 70vw, 28vw" />}
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
          <RaceEditorial language={language} />
          <div className="sporting-recognition">
            <h3>{t.sportingRecognition}</h3>
            <ul>{t.sportingHonours.map((honour) => <li key={honour}>{honour}</li>)}</ul>
          </div>
          <div className="race-board">
            <div className="race-board-title"><span>{t.raceLog}</span><span>{t.raceYear}</span></div>
            {t.races.map(([result, event, detail]) => (
              <article className="race-row" key={`${event}-${detail}`}><strong>{result}</strong><h3>{event}</h3><p>{detail}</p><span aria-hidden="true">↗</span></article>
            ))}
          </div>
          <div className="pace-quote"><p>{t.quote}</p><span>{t.principle}</span></div>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="contact-editorial-layout">
          <div className="contact-editorial-copy">
          <p className="eyebrow">{t.contactLabel}</p><h2>{t.contactTitle}</h2><p className="contact-copy">{t.contactIntro}</p>
          </div>
          <EditorialPhoto name="coast" language={language} className="contact-photo" caption={language === "en" ? "By the sea · At dusk" : "海边 · 日暮时分"} sizes="(max-width: 720px) 62vw, 25vw" />
          </div>
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
