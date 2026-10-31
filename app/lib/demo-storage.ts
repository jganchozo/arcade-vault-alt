import { getGame } from "./catalog";
import type { DemoScore, DemoState } from "./demo-types";

export const STORAGE_KEY = "arcade-vault:demo:v1";
export const emptyDemoState = (): DemoState => ({ version: 1, profile: null, scores: [] });
export const normalizeName = (name: string) => name.trim().toUpperCase().slice(0, 10);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isScore(value: unknown): value is DemoScore {
  return isRecord(value)
    && typeof value.id === "string" && value.id.trim().length > 0
    && typeof value.gameId === "string" && Boolean(getGame(value.gameId))
    && typeof value.name === "string" && normalizeName(value.name).length > 0
    && typeof value.score === "number" && Number.isFinite(value.score) && value.score >= 0
    && typeof value.savedAt === "string" && Number.isFinite(Date.parse(value.savedAt));
}

export function readDemoState(storage: Pick<Storage, "getItem">): { state: DemoState; available: boolean } {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return { state: emptyDemoState(), available: true };
    let parsed: unknown;
    try { parsed = JSON.parse(raw); } catch { return { state: emptyDemoState(), available: true }; }
    if (!isRecord(parsed) || parsed.version !== 1) return { state: emptyDemoState(), available: true };
    const name = isRecord(parsed.profile) && typeof parsed.profile.name === "string"
      ? normalizeName(parsed.profile.name) : "";
    const seen = new Set<string>();
    const scores = (Array.isArray(parsed.scores) ? parsed.scores : []).filter(isScore)
      .filter((score) => {
        if (seen.has(score.id)) return false;
        seen.add(score.id);
        return true;
      }).map((score) => ({
        id: score.id, gameId: score.gameId, name: normalizeName(score.name),
        score: score.score, savedAt: score.savedAt,
      }));
    return { state: { version: 1, profile: name ? { name } : null, scores }, available: true };
  } catch {
    return { state: emptyDemoState(), available: false };
  }
}

export function writeDemoState(storage: Pick<Storage, "setItem">, state: DemoState): boolean {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify({
      version: 1,
      profile: state.profile ? { name: normalizeName(state.profile.name) } : null,
      scores: state.scores.map(({ id, gameId, name, score, savedAt }) => ({
        id, gameId, name: normalizeName(name), score, savedAt,
      })),
    }));
    return true;
  } catch {
    return false;
  }
}
