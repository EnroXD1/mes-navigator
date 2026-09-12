const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { webcrypto } = require("node:crypto");
const markdownit = require("../dist/markdown-it.min.js");

const source = fs.readFileSync(path.join(__dirname, "../dist/ai-tutor.js"), "utf8");

class Element {
  constructor() {
    this.listeners = {};
    this.children = [];
    this.dataset = {};
    this.value = "";
    this.open = false;
    this.classList = { toggle() {} };
  }
  addEventListener(type, callback) { this.listeners[type] = callback; }
  showModal() { this.open = true; }
  close() { this.open = false; }
  focus() {}
  append(...children) { children.forEach((child) => { child.parent = this; this.children.push(child); }); }
  replaceChildren() { this.children = []; }
  querySelector(selector) {
    if (selector === "table") return this.innerHTML?.includes("<table>") ? new Element() : null;
    return this.children.find((child) => `.${child.className}` === selector) || null;
  }
  setAttribute(name, value) { this[name] = value; }
  remove() { if (this.parent) this.parent.children = this.parent.children.filter((child) => child !== this); }
}

function harness(href, initialSession = {}, fetchResult = () => ({ choices: [{ message: { content: "MES управляет выполнением задания в цехе." } }], model: "test/free" })) {
  const ids = ["ai-dialog", "ai-messages", "ai-question", "ai-send", "ai-status", "ai-connect-panel", "ai-connected-panel", "ai-connection-label", "ai-context-title", "ai-context-description", "ai-close", "ai-connect", "ai-use-key", "ai-key-input", "ai-disconnect", "ai-form"];
  const nodes = new Map(ids.map((id) => [id, new Element()]));
  const storage = new Map(Object.entries(initialSession));
  const listeners = {};
  const requests = [];
  let cleanedUrl = null;
  const context = {
    document: {
      querySelector: (selector) => nodes.get(selector.slice(1)),
      querySelectorAll: () => [],
      createElement: () => new Element()
    },
    window: {
      addEventListener: (name, callback) => { listeners[name] = callback; },
      markdownit,
      crypto: webcrypto,
      history: { replaceState: (_state, _title, url) => { cleanedUrl = url; } }
    },
    location: new URL(href),
    sessionStorage: {
      getItem: (key) => storage.get(key) || null,
      setItem: (key, value) => { storage.set(key, value); },
      removeItem: (key) => { storage.delete(key); }
    },
    navigator: { onLine: true },
    fetch: async (url, options) => {
      requests.push({ url, options });
      return { ok: true, json: async () => fetchResult(url, options) };
    },
    crypto: webcrypto,
    TextEncoder,
    URL,
    AbortController,
    setTimeout,
    clearTimeout,
    btoa: (value) => Buffer.from(value, "binary").toString("base64")
  };
  vm.runInNewContext(source, context);
  return { nodes, storage, listeners, requests, get cleanedUrl() { return cleanedUrl; } };
}

async function tick() { await new Promise((resolve) => setImmediate(resolve)); }

async function run() {
  const app = harness("https://enroxd1.github.io/mes-navigator/");
  app.listeners["ceh-znaniy:open-ai"]({ detail: { title: "Тема 1 · MES", description: "Исполнение", content: "MES ведёт цеховой заказ." } });
  assert.equal(app.nodes.get("ai-dialog").open, true);
  app.nodes.get("ai-key-input").value = "sk-or-test";
  app.nodes.get("ai-use-key").listeners.click();
  app.nodes.get("ai-question").value = "Что такое MES?";
  app.nodes.get("ai-form").listeners.submit({ preventDefault() {} });
  await tick();
  assert.equal(app.requests.length, 1);
  const payload = JSON.parse(app.requests[0].options.body);
  assert.equal(payload.model, "openrouter/free");
  assert.match(payload.messages.at(-1).content, /MES ведёт цеховой заказ/);
  assert.match(payload.messages.at(-1).content, /Что такое MES/);
  assert.equal(app.nodes.get("ai-messages").children.length, 2);
  assert.equal(app.storage.has("ceh-znaniy-state"), false);

  const flattenedTable = "**BOM** — рецепт изделия.  **Коротко:**  | Понятие | Что показывает | Где используется | |---|---|---| | **EBOM** | Задумка конструктора | PLM | | **MBOM** | Производственная сборка | MES |  **Пример:** подшипник ротора.";
  const rich = harness("https://enroxd1.github.io/mes-navigator/", {}, () => ({
    choices: [{ message: { content: `${flattenedTable}\n\n<script>alert(1)</script> ![x](https://example.com/x.png) [опасная ссылка](javascript:alert(1))` } }]
  }));
  rich.listeners["ceh-znaniy:open-ai"]({ detail: { title: "BOM", content: "BOM" } });
  rich.nodes.get("ai-key-input").value = "sk-or-test";
  rich.nodes.get("ai-use-key").listeners.click();
  rich.nodes.get("ai-question").value = "Сравни EBOM и MBOM";
  rich.nodes.get("ai-form").listeners.submit({ preventDefault() {} });
  await tick();
  const rendered = rich.nodes.get("ai-messages").children[1].children[1].innerHTML;
  assert.match(rendered, /<table>/);
  assert.match(rendered, /<strong>BOM<\/strong>/);
  assert.match(rendered, /<td>Задумка конструктора<\/td>/);
  assert.doesNotMatch(rendered, /<script|<img|href="javascript:/);

  const draft = harness("https://enroxd1.github.io/mes-navigator/", {}, () => ({
    choices: [{ message: { content: "Here's a thinking process:\n1. Analyze user input\n2. Choose response" } }]
  }));
  draft.listeners["ceh-znaniy:open-ai"]({ detail: { title: "BOM", content: "BOM" } });
  draft.nodes.get("ai-key-input").value = "sk-or-test";
  draft.nodes.get("ai-use-key").listeners.click();
  draft.nodes.get("ai-question").value = "Что такое BOM?";
  draft.nodes.get("ai-form").listeners.submit({ preventDefault() {} });
  await tick();
  assert.equal(draft.nodes.get("ai-messages").children.length, 1);
  assert.match(draft.nodes.get("ai-status").textContent, /черновик/);

  const callback = harness("https://enroxd1.github.io/mes-navigator/?code=temporary", {
    "ceh-znaniy-openrouter-auth-flow": JSON.stringify({ verifier: "verifier", context: { title: "PD96", content: "Планирование" }, createdAt: Date.now() })
  }, () => ({ key: "sk-or-from-oauth" }));
  await tick();
  assert.equal(callback.cleanedUrl, "/mes-navigator/");
  assert.equal(callback.storage.get("ceh-znaniy-openrouter-session-key"), "sk-or-from-oauth");
  assert.equal(callback.nodes.get("ai-context-title").textContent, "PD96");
  assert.equal(callback.nodes.get("ai-dialog").open, true);
  console.log("AI tutor smoke tests passed");
}

run().catch((error) => { console.error(error); process.exitCode = 1; });
