import { EditorialPhoto } from "./EditorialPhotos";

const climbs = ["Alpe d’Huez", "Col du Galibier", "Col du Télégraphe", "Col de l’Iseran", "Col du Glandon", "Col de la Madeleine", "Col des Montets", "Col de la Forclaz", "Petit Saint-Bernard", "Grand-Saint-Bernard"];
const countries = [
  ["🇨🇳", "China", "中国"], ["🇺🇸", "United States", "美国"], ["🇵🇭", "Philippines", "菲律宾"],
  ["🇳🇱", "Netherlands", "荷兰"], ["🇩🇪", "Germany", "德国"], ["🇧🇪", "Belgium", "比利时"],
  ["🇫🇷", "France", "法国"], ["🇪🇸", "Spain", "西班牙"], ["🇮🇹", "Italy", "意大利"],
  ["🇨🇿", "Czechia", "捷克"], ["🇭🇺", "Hungary", "匈牙利"], ["🇦🇹", "Austria", "奥地利"],
  ["🇨🇭", "Switzerland", "瑞士"], ["🇱🇺", "Luxembourg", "卢森堡"], ["🇩🇰", "Denmark", "丹麦"],
  ["🇱🇮", "Liechtenstein", "列支敦士登"], ["🇲🇾", "Malaysia", "马来西亚"], ["🇸🇬", "Singapore", "新加坡"],
] as const;

const copy = {
  en: {
    label: "Journeys / On foot & on two wheels",
    title: "Beyond the finish line.",
    caminoLabel: "01 / Spain · On foot",
    caminoTitle: "Camino de Santiago",
    camino: "About five days on Spain’s Camino de Santiago: enough time for the rhythm of walking to make space for questions that everyday life rushes past. Two lines encountered along the way stayed with me:",
    caminoReflection: "Less a final answer than an invitation to stay curious. To leave room for uncertainty, keep moving, and not need everything figured out before taking the next step.",
    alpsLabel: "02 / The Alps · Summer 2026",
    alpsTitle: "Solo through the Alps.",
    alps: "An eight-day solo bikepacking journey, with six days on the bike — a journey that deepened my love of cycling. A notebook of climbs, each with its own memory:",
    climbsLabel: "Climbs along the way",
    metrics: [["8 days", "The journey · 6 riding days"], ["680 km", "Distance ridden"], ["15,388 m", "Total elevation gain"]],
    diary: "Rain and cold at Grand-Saint-Bernard, then a break in the clouds. Later, comfortable on the train, I wrote down what stayed with me: gratitude for my body, my bike, Ruben’s support, and everything that made this journey possible.",
    diaryLabel: "Grand-Saint-Bernard · Adapted from my travel journal",
    countriesTitle: "18 countries. Still exploring.",
    countriesIntro: "Travel is part of what keeps me curious — on foot, on two wheels, or simply somewhere new.",
    countriesLabel: "Countries I’ve been to",
    albumLabel: "Alpine field notes / Summer 2026",
  },
  zh: {
    label: "旅途 / 徒步与骑行",
    title: "终点线之外。",
    caminoLabel: "01 / 西班牙 · 徒步",
    caminoTitle: "圣地亚哥朝圣之路",
    camino: "在西班牙圣地亚哥朝圣之路上的约五天，脚步慢下来，平日匆忙略过的问题也有了停留的空间。沿途看到的两句话，留在了记忆里：",
    caminoReflection: "比起一个确定的答案，它们更像一种提醒：保持好奇，允许未知存在。不必想清楚一切，才迈出下一步。",
    alpsLabel: "02 / 阿尔卑斯 · 2026 年夏",
    alpsTitle: "独行阿尔卑斯。",
    alps: "八天的独自骑行旅行，其中六天在车上度过。这趟旅程，让我对骑行的热爱愈发坚定。一路翻过的山，每一座都有自己的记忆：",
    climbsLabel: "沿途爬坡记录",
    metrics: [["8 天", "旅程 · 其中 6 天骑行"], ["680 公里", "骑行距离"], ["15,388 米", "累计爬升"]],
    diary: "在 Grand-Saint-Bernard 遇上冷雨，随后天光放晴。后来，安稳地坐在火车上，我记下了最想留下的感受：感谢自己的身体、陪伴我的自行车、Ruben 的支持，以及让这趟旅程发生的一切。",
    diaryLabel: "Grand-Saint-Bernard · 改写自我的旅途日记",
    countriesTitle: "18 个国家，仍在探索。",
    countriesIntro: "旅行，是我保持好奇的方式之一。可以徒步，可以骑行，也可以只是走进一个陌生的地方。",
    countriesLabel: "我去过的国家",
    albumLabel: "阿尔卑斯影像手记 / 2026 年夏",
  },
} as const;

export function Journeys({ language }: { language: "en" | "zh" }) {
  const t = copy[language];
  return (
    <div className="journeys" id="journeys" role="region" aria-labelledby="journeys-title" tabIndex={-1}>
      <header className="journeys-heading">
        <p className="eyebrow">{t.label}</p>
        <h3 id="journeys-title">{t.title}</h3>
      </header>
      <div className="journeys-grid">
        <article className="journey journey-camino">
          <p className="journey-label">{t.caminoLabel}</p>
          <h4>{t.caminoTitle}</h4>
          <p>{t.camino}</p>
          <div className="camino-lines" lang="en">
            <p>“The Answer - Don’t Panic”</p>
            <p>“The Answer of life is the universe.”</p>
          </div>
          <p>{t.caminoReflection}</p>
        </article>
        <article className="journey journey-alps">
          <p className="journey-label">{t.alpsLabel}</p>
          <h4>{t.alpsTitle}</h4>
          <p>{t.alps}</p>
          <ul className="journey-climbs" aria-label={t.climbsLabel}>{climbs.map(climb => <li key={climb}>{climb}</li>)}</ul>
          <dl className="journey-metrics">
            {t.metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
          <figure className="journey-journal">
            <blockquote><p>{`“${t.diary}”`}</p></blockquote>
            <figcaption>{t.diaryLabel}</figcaption>
          </figure>
        </article>
      </div>
      <div className="alpine-album" role="group" aria-label={t.albumLabel}>
        <div className="alpine-album-heading"><span>{t.albumLabel}</span><span>01 — 03</span></div>
        <div className="alpine-album-grid">
          <EditorialPhoto name="alps-road" language={language} caption={language === "en" ? "01 / Solo bikepacking in the Alps" : "01 / 阿尔卑斯独自骑行旅行"} sizes="(max-width: 720px) 88vw, 40vw" />
          <EditorialPhoto name="alps-galibier" language={language} caption={language === "en" ? "02 / Col du Galibier" : "02 / 加利比耶山口"} sizes="(max-width: 720px) 42vw, 20vw" />
          <EditorialPhoto name="alps-stream" language={language} caption={language === "en" ? "03 / Col de l’Iseran" : "03 / 伊瑟兰山口"} sizes="(max-width: 720px) 42vw, 20vw" />
        </div>
      </div>
      <section className="journey-countries" aria-labelledby="countries-title">
        <div><h4 id="countries-title">{t.countriesTitle}</h4><p>{t.countriesIntro}</p></div>
        <ul aria-label={t.countriesLabel}>{countries.map(([flag, en, zh]) => <li key={en}><span aria-hidden="true">{flag}</span>{language === "en" ? en : zh}</li>)}</ul>
      </section>
    </div>
  );
}
