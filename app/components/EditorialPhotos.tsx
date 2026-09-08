import Image from "next/image";

type Language = "en" | "zh";

const photos = {
  "portrait-new": { height: 2161, en: "Sydrick beside an Amsterdam canal in golden evening light", zh: "金色暮光中，坐在阿姆斯特丹运河边的 Sydrick" },
  "frankfurt-finish": { height: 2161, en: "Sydrick running through the Frankfurt half marathon finish area", zh: "Sydrick 跑过法兰克福半程马拉松终点区域" },
  "frankfurt-notes": { height: 2160, en: "Sydrick's Frankfurt race photograph with the original Strava activity overlay", zh: "Sydrick 的法兰克福比赛照片，保留原始 Strava 活动记录叠层" },
  portrait: { height: 2161, en: "Sydrick beside an Amsterdam canal in the evening light", zh: "傍晚光线下，坐在阿姆斯特丹运河边的 Sydrick" },
  monochrome: { height: 2559, en: "A black-and-white portrait of Sydrick smiling by the canal", zh: "运河边微笑的 Sydrick，黑白肖像" },
  graduation: { height: 960, en: "Sydrick at his University of Nottingham graduation ceremony", zh: "Sydrick 在诺丁汉大学毕业典礼上" },
  heritage: { height: 2175, en: "Sydrick wearing embroidered traditional clothing beside the palace moat", zh: "Sydrick 身穿刺绣传统服饰，站在宫城护城河边" },
  climb: { height: 2160, en: "Sydrick climbing a vineyard road during the Heilbronn cycling race", zh: "海尔布隆自行车赛中，Sydrick 骑行爬上葡萄园坡道" },
  peloton: { height: 2161, en: "Sydrick cornering with a group of riders through a village", zh: "Sydrick 随骑行集团经过村庄弯道" },
  finish: { height: 2364, en: "Sydrick catching his breath on the bike at the finish", zh: "抵达终点后，Sydrick 伏在车把上喘息" },
  coast: { height: 1920, en: "Sydrick by the sea at Étretat in Normandy, France, with the chalk cliffs and arch at dusk", zh: "法国诺曼底埃特勒塔海边的 Sydrick，暮色中可见象鼻山的白垩岩崖与海蚀拱门" },
} as const;

export function EditorialPhoto({ name, language, caption, className = "", sizes = "(max-width: 720px) 90vw, 45vw" }: {
  name: keyof typeof photos;
  language: Language;
  caption: string;
  className?: string;
  sizes?: string;
}) {
  const photo = photos[name];
  // Relative assets support both the /portfolio/ Pages route and the Sites root.
  const path = `./photos/${name}`;
  return (
    <figure className={`editorial-photo ${className}`}>
      <picture>
        <source type="image/webp" srcSet={`${path}-640.webp 640w, ${path}-1440.webp 1440w`} sizes={sizes} />
        <Image src={`${path}-1440.webp`} alt={photo[language]} width={1440} height={photo.height} unoptimized loading="lazy" />
      </picture>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function PortraitEditorial({ language }: { language: Language }) {
  return (
    <section className="portrait-editorial section-pad" aria-label={language === "en" ? "Personal photographs" : "个人影像"}>
      <div className="editorial-masthead"><span>Sydrick Wu</span><span>{language === "en" ? "Personal archive / 01" : "个人影像 / 01"}</span></div>
      <div className="portrait-editorial-grid">
        <EditorialPhoto name="portrait-new" language={language} caption={language === "en" ? "Amsterdam · Along the canals" : "阿姆斯特丹 · 运河边"} className="portrait-editorial-main" sizes="(max-width: 720px) 90vw, 52vw" />
        <div className="portrait-editorial-aside">
          <p className="editorial-location">{language === "en" ? "Amsterdam" : "阿姆斯特丹"}<span>52.37° N / 4.90° E</span></p>
          <EditorialPhoto name="monochrome" language={language} caption={language === "en" ? "A moment between places." : "旅途中的片刻。"} sizes="(max-width: 720px) 58vw, 25vw" />
        </div>
      </div>
    </section>
  );
}

export function RaceEditorial({ language }: { language: Language }) {
  const en = language === "en";
  return (
    <div className="race-editorial" role="group" aria-label={en ? "Heilbronn race photographs" : "海尔布隆比赛影像"}>
      <div className="race-editorial-header"><span>{en ? "Heilbronn / 23.08.2026" : "海尔布隆 / 2026.08.23"}</span><span>{en ? "Race day" : "比赛日"}</span></div>
      <div className="race-editorial-grid">
        <EditorialPhoto name="peloton" language={language} caption={en ? "01 / In the bunch" : "01 / 集团中"} className="race-photo-lead" sizes="(max-width: 720px) 90vw, 40vw" />
        <EditorialPhoto name="climb" language={language} caption={en ? "02 / The climb" : "02 / 爬坡"} sizes="(max-width: 720px) 42vw, 22vw" />
        <EditorialPhoto name="finish" language={language} caption={en ? "03 / Across the line" : "03 / 终点之后"} sizes="(max-width: 720px) 42vw, 22vw" />
      </div>
    </div>
  );
}

export function RunEditorial({ language }: { language: Language }) {
  const en = language === "en";
  return (
    <div className="run-editorial" role="group" aria-label={en ? "Frankfurt half marathon photographs" : "法兰克福半程马拉松影像"}>
      <div className="race-editorial-header"><span>{en ? "Frankfurt / 22.03.2026" : "法兰克福 / 2026.03.22"}</span><span>{en ? "21.1 km / Half marathon" : "21.1 公里 / 半程马拉松"}</span></div>
      <div className="run-editorial-grid">
        <EditorialPhoto name="frankfurt-notes" language={language} caption={en ? "01 / Race-day notes · Original activity record" : "01 / 比赛日记 · 原始活动记录"} sizes="(max-width: 720px) 90vw, 48vw" />
        <div className="run-editorial-aside">
          <p className="run-editorial-result"><span>{en ? "A personal best" : "个人最佳"}</span><strong>1:19:50</strong><span>{en ? "Frankfurter Mainova Half Marathon" : "法兰克福 Mainova 半程马拉松"}</span></p>
          <EditorialPhoto name="frankfurt-finish" language={language} caption={en ? "02 / The final metres" : "02 / 最后的冲刺"} sizes="(max-width: 720px) 67vw, 28vw" />
        </div>
      </div>
    </div>
  );
}
