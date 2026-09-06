type Language = "en" | "zh";

// Roles and achievements are drawn from the CV supplied by Sydrick.
const experience = {
  en: {
    label: "03 / Experience",
    title: "Work experience.",
    intro: "Venture capital, product growth and commercial data analysis.",
    roles: [
      {
        id: "miracleplus-growth", date: "Apr — Oct 2024", location: "Shanghai, China",
        company: "Y Combinator China", affiliation: "MiraclePlus",
        role: "Product Marketing & User Growth",
        points: [
          ["User acquisition", "Developed acquisition campaigns for Startup School across ambassador referrals, creator partnerships and multiple marketing channels, contributing to 13,000+ enrollments."],
          ["Growth operations", "Tracked conversion-funnel metrics to refine campaigns on a budget below CNY 10,000 (Chinese yuan); helped establish three communities connected to the programme."],
          ["Events", "Delivered 10+ startup-focused events, from planning through launch, to support deal sourcing and product exposure."],
        ],
      },
      {
        id: "miracleplus-investment", date: "Sep 2023 — Jan 2024", location: "Beijing, China",
        company: "Y Combinator China", affiliation: "MiraclePlus",
        role: "Founder Relations & Investment Intern",
        points: [
          ["Deal sourcing", "Top 5% in deal sourcing among interns. Identified and engaged 100+ early-stage technology startups, supporting four angel-round investments and acceleration programmes."],
          ["Investment research", "Conducted due diligence on shortlisted startups and prepared research to support investment decisions by founder Qi Lu."],
          ["Founder & investor relations", "Prepared presentation materials for global limited partners and helped organise Demo Day roadshows attended by 4,000+ investors, alongside 20+ entrepreneurship events."],
        ],
      },
      {
        id: "groupm", date: "Jun — Sep 2022", location: "Shanghai, China",
        company: "GroupM", affiliation: "Unilever Team · WPP",
        role: "Data Analysis Intern · Insight & Analytics",
        points: [
          ["Dashboards", "Built three Power BI dashboards using Nielsen and planning datasets, bringing media tracking, data consolidation and performance visualisation into reusable reporting tools."],
          ["Audience insights", "Used the Yuntu platform, audience segmentation and eight clustering models to evaluate campaign performance and refine target-audience strategy."],
          ["Reporting automation", "Automated data collection with Robotic Process Automation (RPA), improving reporting speed and reliability; applied traffic-quality and time-of-day filters to strengthen analysis."],
        ],
      },
      {
        id: "feilan", date: "Jun — Sep 2021", location: "Shanghai, China",
        company: "Feilan Advertising", affiliation: "Global e-commerce",
        role: "Global E-commerce Marketing Intern",
        points: [
          ["Market insights", "Analysed social-media performance to refine overseas product positioning, digital strategy and brand engagement."],
          ["Content production", "Produced 100+ short videos and 200+ product visuals for international marketing campaigns."],
          ["Channel growth", "Launched and operated overseas social-media accounts across multiple platforms, collectively adding 7,000+ followers."],
        ],
      },
    ],
  },
  zh: {
    label: "03 / 工作经历", title: "工作经历。", intro: "风险投资、产品增长与商业数据分析。",
    roles: [
      {
        id: "miracleplus-growth", date: "2024 年 4 — 10 月", location: "中国上海",
        company: "Y Combinator 中国", affiliation: "奇绩创坛", role: "产品营销与用户增长",
        points: [
          ["用户获取", "为创业学校设计用户获取活动，结合品牌大使推荐、内容创作者合作与多渠道营销，推动项目累计获得 13,000+ 报名。"],
          ["增长运营", "跟踪转化漏斗指标，以不足人民币 10,000 元的预算优化活动，并协助建立三个与项目关联的社群。"],
          ["活动执行", "从策划到落地推进 10+ 场创业主题活动，支持项目搜寻与产品曝光。"],
        ],
      },
      {
        id: "miracleplus-investment", date: "2023 年 9 月 — 2024 年 1 月", location: "中国北京",
        company: "Y Combinator 中国", affiliation: "奇绩创坛", role: "创始人关系与投资实习生",
        points: [
          ["项目搜寻", "项目搜寻表现位列实习生前 5%；识别并接触 100+ 家早期科技创业公司，支持四笔天使轮投资及创业加速。"],
          ["投资研究", "对入围创业项目开展尽职调查，为创始人陆奇的投资决策提供研究支持。"],
          ["创始人与投资人关系", "整理面向全球有限合伙人的展示材料，协助组织 4,000+ 投资人参加的项目展示日路演，以及 20+ 场创业相关活动。"],
        ],
      },
      {
        id: "groupm", date: "2022 年 6 — 9 月", location: "中国上海",
        company: "群邑", affiliation: "联合利华团队 · WPP 集团", role: "数据分析实习生 · 洞察与分析",
        points: [
          ["数据可视化", "使用 Nielsen 与媒介规划数据搭建 3 个 Power BI 仪表板，将媒介跟踪、数据整合和效果可视化转化为可复用的报告工具。"],
          ["受众洞察", "应用云图平台、受众分层及八种聚类模型，评估营销活动表现并优化目标受众策略。"],
          ["报告自动化", "通过机器人流程自动化（RPA）采集数据，提升报告速度与可靠性；结合流量质量和时段筛选，提高分析质量。"],
        ],
      },
      {
        id: "feilan", date: "2021 年 6 — 9 月", location: "中国上海",
        company: "飞岚广告", affiliation: "全球电商", role: "全球电商营销实习生",
        points: [
          ["市场洞察", "分析社交媒体表现，为海外产品定位、数字营销策略与品牌互动提供支持。"],
          ["内容制作", "为国际市场营销制作 100+ 支短视频及 200+ 张产品视觉素材。"],
          ["渠道增长", "开设并运营多个平台的海外社交账号，累计新增 7,000+ 名粉丝。"],
        ],
      },
    ],
  },
} as const;

export function WorkExperience({ language }: { language: Language }) {
  const t = experience[language];
  return (
    <section className="experience section-pad" id="experience" aria-labelledby="experience-title">
      <div className="section-heading experience-heading">
        <p className="eyebrow">{t.label}</p><h2 id="experience-title">{t.title}</h2><p>{t.intro}</p>
      </div>
      <div className="experience-list">
        {t.roles.map((item, index) => (
          <article className="experience-row" key={item.id} aria-labelledby={`${item.id}-title`}>
            <div className="experience-meta"><span className="experience-index">0{index + 1}</span><p>{item.date}</p><span>{item.location}</span></div>
            <div className="experience-body">
              <header className="experience-company"><h3 id={`${item.id}-title`}>{item.company}</h3><span>{item.affiliation}</span></header>
              <p className="experience-role">{item.role}</p>
              <ul className="experience-points">
                {item.points.map(([label, description]) => <li key={label}><strong>{label}</strong><p>{description}</p></li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
