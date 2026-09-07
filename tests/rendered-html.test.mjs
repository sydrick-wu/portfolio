import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("uses a static black-hole finale and preserves target-language labels and chapter focus", async () => {
  const html = await (await render()).text();
  assert.match(html, /Where paths meet\./);
  assert.doesNotMatch(html, /Pause motion|Resume motion/);
  assert.match(html, /black-hole-static-1920.webp/);
  const finale = await readFile(new URL("../app/components/OrbitFinale.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(finale, /optimized-black-hole|<canvas/);
  await access(new URL("../public/photos/black-hole-static-1920.webp", import.meta.url));
  assert.match(html, /切换中文/);
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /assistantAction: "Switch to English"/);
  const host = await readFile(new URL("../components/ui/optimized-black-hole.tsx", import.meta.url), "utf8");
  assert.match(host, /import\("\.\/optimized-black-hole-utils\/renderer"\)/);
  assert.match(host, /IntersectionObserver/);
  assert.match(host, /rendererRef.current\?\.dispose/);
  assert.match(host, /touch-pan-y/);
  const renderer = await readFile(new URL("../components/ui/optimized-black-hole-utils/renderer.ts", import.meta.url), "utf8");
  for (const feature of ["prefers-reduced-motion", "visibilitychange", "ResizeObserver", "1000 / 30", "material.dispose()", "geometry.dispose()"])
    assert.ok(renderer.includes(feature), `Missing renderer safeguard ${feature}`);
  const portrait = await readFile(new URL("../app/components/InteractivePortrait.tsx", import.meta.url), "utf8");
  assert.match(portrait, /readingFocus.current = sectionFocus.current \?\? progress/);
  assert.match(portrait, /frameloop=\{active \? "always" : "never"\}/);
});

test("provides bilingual chapter links, motion-aware navigation and a local contact action", async () => {
  const html = await (await render()).text();
  const navigation = await readFile(new URL("../app/components/ChapterNavigation.tsx", import.meta.url), "utf8");
  assert.match(html, /aria-label="Chapter navigation"/);
  for (const id of ["path", "experience", "pace", "contact"]) {
    assert.match(html, new RegExp(`href="#${id}"`));
    assert.match(html, new RegExp(`<section[^>]*id="${id}"[^>]*tabindex="-1"`));
  }
  assert.match(html, /Contact me/);
  assert.doesNotMatch(html, /View GitHub|By the sea · At dusk/);
  assert.match(html, /Étretat · Normandy, France/);
  assert.match(navigation, /prefers-reduced-motion: reduce/);
  assert.match(navigation, /reduceMotion \? "instant" : "smooth"/);
  assert.match(navigation, /target.focus\(\{ preventScroll: true \}\)/);
  assert.match(navigation, /aria-current/);
  assert.match(navigation, /zh: "教育"/);
});

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
  assert.match(html, /切换中文/);
  assert.doesNotMatch(html, /系统思考。|切换至英文|好，现在开始我用中文介绍/);
  assert.match(html, /University of Mannheim/);
  assert.match(html, /University of Zurich/);
  assert.match(html, /<span>Introduction to Business Economics<\/span><strong>91<\/strong>/);
  assert.match(html, /<span>Macroeconometrics<\/span><strong>1\.7<\/strong>/);
  assert.doesNotMatch(html, /Advanced Time Series Econometrics|Information and Data Management|Intermediate Mathematical Economics/);
  assert.match(html, /Sep 2026/);
  assert.match(html, /Qiandao Lake Triathlon/);
  assert.match(html, /id="profile"/);
  assert.match(html, /property="og:image" content="https:\/\/sydrick-wu\.github\.io\/portfolio\/og\.jpg"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps the experience responsive and accessible", async () => {
  const [page, portrait, layout, css, packageJson, work] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/InteractivePortrait.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/components/WorkExperience.tsx", import.meta.url), "utf8"),
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
  assert.match(work, /Built three Power BI dashboards using Nielsen and planning datasets/);
  assert.match(work, /使用 Nielsen 与媒介规划数据搭建 3 个 Power BI 仪表板/);
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
  assert.match(page, /Final average: 71\/100 · First Class Honours · Top 10%/);
  assert.match(page, /Nottingham Advantage Award/);
  assert.match(page, /Research Assistant to the Dean of the Graduate School across five industry projects/);
  assert.match(work, /Top 5% in deal sourcing/);
  assert.match(work, /13,000\+ enrollments/);
  assert.match(work, /Robotic Process Automation \(RPA\)/);
  assert.match(work, /Feilan Advertising/);
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
  assert.match(portrait, /tubeGeometry args=\{\[route, 160, 0\.003, 8, true\]\}/);
  assert.match(portrait, /ringGeometry args=\{\[radius - 0\.003, radius \+ 0\.003, 192\]\}/);
  assert.doesNotMatch(portrait, /#719b9e|iridescence/);
  assert.match(portrait, /route\.getPoint\(0\.01\)/);
  assert.match(portrait, /route\.getPoint\(0\.36\)/);
  assert.match(portrait, /route\.getPoint\(0\.5\)/);
  assert.doesNotMatch(portrait, /function GeographicArc/);
  assert.match(portrait, /meshPhysicalMaterial/);
  assert.match(portrait, /scale=\{1\.12\}/);
  assert.match(portrait, /opacity=\{0\.8\}/);
  assert.match(portrait, /transmission=\{0\.08\}/);
  assert.match(portrait, /const landingX = isNarrow \? 0 : 1\.03/);
  assert.match(portrait, /const landingY = isNarrow \? \(isShortPhone \? 1\.2 : 1\.15\) : 0\.08/);
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

test("renders the curated photographs with responsive local assets and English captions", async () => {
  const html = await (await render()).text();
  const names = ["portrait-new", "monochrome", "graduation", "heritage", "climb", "peloton", "finish", "coast", "frankfurt-finish", "frankfurt-notes"];
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map(([tag]) => tag);
  assert.equal(images.length, names.length + 1); // Decorative static finale.
  for (const name of names) {
    const tag = images.find((image) => image.includes(`./photos/${name}-1440.webp`));
    assert.ok(tag, `Missing photograph: ${name}`);
    assert.match(tag, /alt="[^"]+"/);
    assert.match(tag, /loading="lazy"/);
    assert.match(tag, /width="1440"/);
    assert.match(tag, /height="\d+"/);
    assert.ok(html.includes(`./photos/${name}-640.webp 640w`));
    await Promise.all([640, 1440].map((width) => access(new URL(`../public/photos/${name}-${width}.webp`, import.meta.url))));
  }
  assert.match(html, /Amsterdam · Along the canals/);
  assert.match(html, /Frankfurt \/ 22.03.2026/);
  assert.match(html, /The final metres/);
  assert.match(html, /Original activity record/);
  assert.match(html, /University of Nottingham · Graduation/);
  assert.match(html, /03 \/ Across the line/);
  assert.doesNotMatch(html, /个人影像|毕业典礼|终点之后|日暮时分/);
});

test("separates education, work and recognition without losing academic results", async () => {
  const html = await (await render()).text();
  const section = (id) => {
    const match = html.match(new RegExp(`<section[^>]*id="${id}"[^>]*>([\\s\\S]*?)</section>`));
    assert.ok(match, `Missing section ${id}`);
    return match[1];
  };
  const education = section("path");
  const work = section("experience");
  const recognition = section("recognition");
  assert.equal((education.match(/class="timeline-row timeline-row-expanded"/g) ?? []).length, 4);
  assert.equal((education.match(/<li><span>/g) ?? []).length, 22);
  assert.doesNotMatch(education, /Y Combinator|GroupM|Feilan|Energy Hackathon/);
  assert.match(education, /graduation-1440.webp/);
  assert.match(education, /Nottingham Advantage Award/);
  assert.equal((work.match(/class="experience-row"/g) ?? []).length, 4);
  assert.equal((work.match(/<li>/g) ?? []).length, 12);
  assert.match(work, /Apr — Oct 2024/);
  assert.match(work, /Sep 2023 — Jan 2024/);
  assert.match(work, /7,000\+ followers/);
  assert.doesNotMatch(work, /Final average|course-results/);
  assert.match(recognition, /Energy Hackathon/);
  assert.match(recognition, /heritage-1440.webp/);
  const lead = html.match(/<figure class="editorial-photo race-photo-lead">([\s\S]*?)<\/figure>/)?.[1];
  assert.ok(lead);
  assert.match(lead, /peloton-1440.webp/);
  assert.match(lead, /01 \/ In the bunch/);
  assert.match(html, /02 \/ The climb/);
});
