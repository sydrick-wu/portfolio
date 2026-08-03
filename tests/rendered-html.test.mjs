import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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
  assert.match(html, /Think in systems\./);
  assert.match(html, /Move with intent\./);
  assert.match(html, /AI ASSISTANT/);
  assert.match(html, /INTRODUCE IN CHINESE/);
  assert.doesNotMatch(html, /系统思考。|切换至英文|好，现在开始我用中文介绍/);
  assert.match(html, /University of Mannheim/);
  assert.match(html, /Qiandao Lake Triathlon/);
  assert.match(html, /href="#profile"/);
  assert.match(html, /property="og:image" content="https:\/\/sydrick-wu\.github\.io\/og\.jpg"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps the experience responsive and accessible", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Primary navigation/);
  assert.match(page, /IntersectionObserver/);
  assert.match(page, /pointermove/);
  assert.match(page, /sydrick-language/);
  assert.match(page, /const preferred = saved === "zh" \|\| saved === "en" \? saved : "en"/);
  assert.doesNotMatch(page, /navigator\.language/);
  assert.match(page, /好，现在开始我用中文介绍 Sydrick。/);
  assert.match(page, /All right—I'll introduce Sydrick in English from now on\./);
  assert.match(page, /setTransitionTarget\(next\)/);
  assert.match(page, /900/);
  assert.match(page, /InteractivePortrait/);
  assert.match(page, /系统思考。/);
  assert.match(layout, /summary_large_image/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /\.language-transition/);
  assert.match(css, /assistant-progress/);
  assert.match(css, /@media \(max-width:\s*720px\)/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
