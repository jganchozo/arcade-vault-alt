import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
const testDirectory = path.dirname(fileURLToPath(import.meta.url));

// Exercise the actual TypeScript modules with Node's runner, without another dependency.
const cache = new Map();
function load(file) {
  if (cache.has(file)) return cache.get(file).exports;
  const loaded = { exports: {} };
  cache.set(file, loaded);
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
  }).outputText;
  const resolve = (id) => load(path.resolve(path.dirname(file), `${id}.ts`));
  new Function("require", "module", "exports", code)(resolve, loaded, loaded.exports);
  return loaded.exports;
}
const storage = load(path.resolve(testDirectory, "../app/lib/demo-storage.ts"));
const rankings = load(path.resolve(testDirectory, "../app/lib/rankings.ts"));
const score = { id: "completion-1", gameId: "bloque-buster", name: " kai ", score: 12500, savedAt: "2026-10-30T12:00:00.000Z" };
const read = (value) => storage.readDemoState({ getItem: () => value });

test("empty, malformed, and incompatible storage recover to defaults", () => {
  for (const raw of [null, "{", "null", "[]", '{"version":2}']) {
    assert.deepEqual(read(raw), { state: storage.emptyDemoState(), available: true });
  }
});
test("blocked storage reports unavailable without throwing", () => {
  assert.equal(storage.readDemoState({ getItem() { throw new Error("blocked"); } }).available, false);
  assert.equal(storage.writeDemoState({ setItem() { throw new Error("quota"); } }, storage.emptyDemoState()), false);
});
test("normalizes names and removes invalid or duplicate saved records", () => {
  const invalid = [null, {}, { ...score, gameId: "missing" }, { ...score, score: -1 }, { ...score, score: "12500" }, { ...score, savedAt: "invalid" }, { ...score, name: " " }];
  const { state } = read(JSON.stringify({ version: 1, profile: { name: " neonfox-long " }, scores: [score, score, ...invalid] }));
  assert.deepEqual(state.profile, { name: "NEONFOX-LO" });
  assert.equal(state.scores.length, 1);
  assert.equal(state.scores[0].name, "KAI");
});
test("persistence round-trip strips credentials and unrelated fields", () => {
  let stored;
  const state = { version: 1, profile: { name: "kai", email: "private@example.com", password: "secret" }, scores: [{ ...score, password: "secret" }] };
  assert.equal(storage.writeDemoState({ setItem(key, value) { assert.equal(key, storage.STORAGE_KEY); stored = value; } }, state), true);
  assert(!stored.includes("secret") && !stored.includes("email") && !stored.includes("password"));
  assert.equal(read(stored).state.scores[0].score, 12500);
});
test("fixtures are deterministic, sorted, unique, and use valid dates", () => {
  const rows = rankings.seededScores("bloque-buster");
  assert.deepEqual(rows, rankings.seededScores("bloque-buster"));
  assert.equal(new Set(rows.map((row) => row.name)).size, 12);
  assert(rows.every((row, index) => row.rank === index + 1 && Number.isFinite(Date.parse(row.savedAt))));
  assert(rows.every((row, index) => !index || rows[index - 1].score >= row.score));
});
test("merging filters by game, reranks results, and keeps ties in save order", () => {
  const rows = rankings.mergeRankings("bloque-buster", [{ ...score, name: "FIRST" }, { ...score, id: "second", name: "SECOND" }, { ...score, id: "other", gameId: "caida" }]);
  assert.equal(rows.length, 14);
  assert.deepEqual(rows.filter((row) => row.demo).map((row) => row.name), ["FIRST", "SECOND"]);
  assert(rows.every((row, index) => row.rank === index + 1));
});
