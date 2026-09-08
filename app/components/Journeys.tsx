const copy = {
  en: {
    label: "Journeys / On foot & on two wheels",
    title: "Beyond the finish line.",
    caminoLabel: "01 / Spain · On foot",
    caminoTitle: "Camino de Santiago",
    camino: "I spent time walking Spain’s Camino de Santiago — a different rhythm from training and racing, exploring the pilgrimage route on foot.",
    alpsLabel: "02 / The Alps · Summer 2026",
    alpsTitle: "Solo through the Alps.",
    alps: "An eight-day solo bikepacking journey, with six days on the bike. The climbs included Alpe d’Huez, Col du Galibier, Col de l’Iseran and Grand-Saint-Bernard — a journey that deepened my love of cycling.",
    metrics: [["8 days", "The journey · 6 riding days"], ["680 km", "Distance ridden"], ["15,388 m", "Total elevation gain"]],
    diary: "Rain and cold at Grand-Saint-Bernard, then a break in the clouds. Later, comfortable on the train, I wrote down what stayed with me: gratitude for my body, my bike, Ruben’s support, and everything that made this journey possible.",
    diaryLabel: "Grand-Saint-Bernard · Adapted from my travel journal",
  },
  zh: {
    label: "旅途 / 徒步与骑行",
    title: "终点线之外。",
    caminoLabel: "01 / 西班牙 · 徒步",
    caminoTitle: "圣地亚哥朝圣之路",
    camino: "我曾徒步走过西班牙的 Camino de Santiago 圣地亚哥朝圣之路。离开训练与比赛的节奏，以步行的方式探索这条朝圣之路。",
    alpsLabel: "02 / 阿尔卑斯 · 2026 年夏",
    alpsTitle: "独行阿尔卑斯。",
    alps: "八天的独自骑行旅行，其中六天在车上度过。沿途挑战了 Alpe d’Huez、Col du Galibier、Col de l’Iseran 和 Grand-Saint-Bernard 等经典爬坡。这趟旅程，让我对骑行的热爱愈发坚定。",
    metrics: [["8 天", "旅程 · 其中 6 天骑行"], ["680 公里", "骑行距离"], ["15,388 米", "累计爬升"]],
    diary: "在 Grand-Saint-Bernard 遇上冷雨，随后天光放晴。后来，安稳地坐在火车上，我记下了最想留下的感受：感谢自己的身体、陪伴我的自行车、Ruben 的支持，以及让这趟旅程发生的一切。",
    diaryLabel: "Grand-Saint-Bernard · 改写自我的旅途日记",
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
        </article>
        <article className="journey journey-alps">
          <p className="journey-label">{t.alpsLabel}</p>
          <h4>{t.alpsTitle}</h4>
          <p>{t.alps}</p>
          <dl className="journey-metrics">
            {t.metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
          <figure className="journey-journal">
            <blockquote><p>{t.diary}</p></blockquote>
            <figcaption>{t.diaryLabel}</figcaption>
          </figure>
        </article>
      </div>
    </div>
  );
}
