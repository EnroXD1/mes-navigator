const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { webcrypto } = require("node:crypto");

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
  querySelector(selector) { return this.children.find((child) => `.${child.className}` === selector) || null; }
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
