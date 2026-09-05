import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/portfolio/", {
      headers: { accept: "text/html", host: "portfolio.example" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Sydrick's finished portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Sydrick Wu — Economics, Endurance &amp; Technology<\/title>/i);
  assert.match(html, /<h1 aria-label="About Sydrick"><strong>Sydrick<\/strong><\/h1>/);
  assert.doesNotMatch(html, /Think in systems|Move with intent/);
  assert.match(html, /AI ASSISTANT/);
  assert.match(html, /INTRODUCE IN CHINESE/);
  assert.doesNotMatch(html, /系统思考。|切换至英文|好，现在开始我用中文介绍/);
  assert.match(html, /University of Mannheim/);
  assert.match(html, /University of Zurich/);
  assert.match(html, /Sep 2026/);
  assert.match(html, /Qiandao Lake Triathlon/);
  assert.match(html, /id="profile"/);
  assert.match(html, /property="og:image" content="https:\/\/sydrick-wu\.github\.io\/portfolio\/og\.jpg"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps the experience responsive and accessible", async () => {
  const [page, portrait, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/InteractivePortrait.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /sen-chrome/);
  assert.doesNotMatch(page, /Primary navigation|IntersectionObserver/);
  assert.match(page, /pointermove/);
  assert.match(page, /sydrick-language/);
  assert.match(page, /const preferred = saved === "zh" \|\| saved === "en" \? saved : "en"/);
  assert.doesNotMatch(page, /navigator\.language/);
  assert.match(page, /好，现在开始我用中文介绍 Sydrick。/);
  assert.match(page, /All right—I'll introduce Sydrick in English from now on\./);
  assert.match(page, /setTransitionTarget\(next\)/);
  assert.match(page, /900/);
  assert.match(page, /InteractivePortrait/);
  assert.match(page, /storyProgress/);
  assert.match(page, /轨道随之展开/);
  assert.match(page, /pathTitle: "Education\."/);
  assert.match(page, /pathTitle: "教育经历。"/);
  assert.doesNotMatch(page, /Selected coordinates\.|人生坐标。/);
  assert.match(page, /My focus is finance, macroeconomics, econometrics and applied decision-making/);
  assert.match(page, /关注金融、宏观经济学、计量经济学与应用决策/);
  assert.doesNotMatch(page, /incentives, markets and applied decision-making/);
  assert.match(page, /Experience spanning venture capital, founder relations, investment research and user growth at Y Combinator China/);
  assert.match(page, /曾在 Y Combinator 中国从事风险投资、创始人关系、投资研究与用户增长/);
  assert.doesNotMatch(page, /At MiraclePlus, I worked across venture capital/);
  assert.doesNotMatch(page, /Experience in founder relations, investment research and growth at MiraclePlus/);
  assert.match(page, /Built three Power BI dashboards using Nielsen and planning datasets/);
  assert.match(page, /使用 Nielsen 与媒介规划数据搭建 3 个 Power BI 仪表板/);
  assert.doesNotMatch(page, /Commercial data analysis and insights at the intersection/);
  assert.match(page, /Recent highlights include an age-group win at the Zhejiang Triathlon Race/);
  assert.match(page, /1:19:50 Frankfurt half marathon/);
  assert.match(page, /48th of 1,660 at the ADAC Cycling Tour Classic in Heilbronn/);
  assert.match(page, /2025–2026 selection/);
  assert.match(page, /ADAC Cycling Tour Classic/);
  assert.match(page, /Frankfurter Mainova Half Marathon/);
  assert.match(page, /48 \/ 1,660 overall · Heilbronn · 117\.97 km · 3:10:37 · 23 Aug 2026/);
  assert.match(page, /法兰克福半程马拉松 1:19:50/);
  assert.match(page, /海尔布隆 ADAC 自行车巡回赛经典赛 1,660 人中第 48 名/);
  assert.doesNotMatch(page, /My 2025 results include/);
  assert.match(page, /Provisional average: 1\.8/);
  assert.doesNotMatch(page, /Prospective coursework — subject to final enrolment|拟选课程（以最终选课结果为准）/);
  assert.match(page, /items: \["Public Debt Management", "Principles of Neuroeconomics", "Labor Economics"/);
  assert.match(page, /"Global Poverty and Economic Development", "Behavioral Economics: An Introductory Course"/);
  assert.match(page, /"Machine Learning in Economics", "Global Poverty and Economic Development — Cases"/);
  assert.match(page, /items: \["公共债务管理", "神经经济学原理", "劳动经济学"/);
  assert.match(page, /"经济学中的机器学习", "全球贫困与经济发展案例"/);
  assert.match(page, /items: \["Financial Economics — 1\.0", "Topics in Macrofinance — 1\.3"\]/);
  assert.match(page, /GPA: 8\.20\/10/);
  assert.match(page, /items: \["Mathematics 2 for Economics — 9\.5", "Applied Econometrics for Business — 8\.5", "Corporate Finance — 8\.0"\]/);
  assert.match(page, /Final average: 71\/100 · First Class Honours · Top 10%/);
  assert.match(page, /Machine Learning — 78/);
  assert.match(page, /Nottingham Advantage Award/);
  assert.match(page, /Research Assistant to the Dean across five industry projects/);
  assert.match(page, /Top 5% in deal sourcing/);
  assert.match(page, /Startup School to 13,000\+ enrollments/);
  assert.match(page, /Robotic Process Automation \(RPA\)/);
  assert.match(page, /Feilan Advertising/);
  assert.match(portrait, /PersonalOrbit/);
  assert.match(portrait, /OrbitBand/);
  assert.match(portrait, /OrbitNode/);
  assert.match(portrait, /nodeChapterRanges/);
  assert.match(portrait, /getChapterFocus/);
  assert.match(portrait, /Math\.cos\(currentAngle\.current\) \* radius/);
  assert.match(portrait, /Math\.sin\(currentAngle\.current\) \* radius/);
  assert.match(portrait, /angle=\{0\.28\} chapter=\{1\} focusAngle=\{0\.2\}/);
  assert.match(portrait, /metric="8\.20"/);
  assert.doesNotMatch(portrait, /metric="TOP 3%"/);
  assert.match(portrait, /angle=\{4\.22\} chapter=\{2\} focusAngle=\{1\.99\}/);
  assert.match(portrait, /angle=\{3\.64\} chapter=\{3\} focusAngle=\{3\.24\}/);
  assert.doesNotMatch(portrait, /focusPosition/);
  assert.match(portrait, /torusGeometry/);
  assert.match(portrait, /CatmullRomCurve3/);
  assert.match(portrait, /function GeographicOrbit/);
  assert.match(portrait, /new THREE\.CatmullRomCurve3\([\s\S]*?\n\s*true,\n\s*"centripetal"/);
  assert.match(portrait, /tubeGeometry args=\{\[route, 160, 0\.011, 8, true\]\}/);
  assert.match(portrait, /route\.getPoint\(0\.01\)/);
  assert.match(portrait, /route\.getPoint\(0\.36\)/);
  assert.match(portrait, /route\.getPoint\(0\.5\)/);
  assert.doesNotMatch(portrait, /function GeographicArc/);
  assert.match(portrait, /meshPhysicalMaterial/);
  assert.match(portrait, /scale=\{1\.12\}/);
  assert.match(portrait, /opacity=\{0\.8\}/);
  assert.match(portrait, /transmission=\{0\.08\}/);
  assert.match(portrait, /const landingX = isNarrow \? 0 : 0\.72/);
  assert.match(portrait, /const landingY = isNarrow \? 0\.68 : 0\.08/);
  assert.match(portrait, /MANNHEIM/);
  assert.match(portrait, /SHANGHAI/);
  assert.match(portrait, /ZURICH/);
  assert.doesNotMatch(portrait, /sydrick-portrait\.jpg|PortraitCore|useTexture/);
  assert.doesNotMatch(portrait, /sydrick-face-texture|sydrick-hair-texture|FaceSticker/);
  assert.match(portrait, /sampleCamera/);
  assert.match(layout, /summary_large_image/);
  assert.match(layout, /Instrument_Sans/);
  assert.doesNotMatch(layout, /Instrument_Serif|Space_Grotesk/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /\.language-transition/);
  assert.match(css, /assistant-progress/);
  assert.match(css, /@media \(max-width:\s*720px\)/);
  assert.match(css, /\.story-intro\s*\{[\s\S]*?background:\s*none;/);
  assert.match(css, /font-variation-settings:\s*"wdth" 100, "wght" 650/);
  assert.match(css, /--node-focus/);
  assert.match(css, /\.timeline-note\s*\{[^}]*white-space:\s*pre-line/);
  assert.match(css, /\.timeline-note-structured\s*\{[^}]*display:\s*grid/);
  assert.match(css, /\.timeline-note-list\s*\{[^}]*display:\s*grid/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
