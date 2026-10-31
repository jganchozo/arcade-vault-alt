import type { DemoScore, RankingRow } from "./demo-types";

const PLAYERS = [
  "PX_KAI", "NEONFOX", "Z3R0COOL", "M00NRYU", "VAULT_07", "GLITCHA",
  "ATARI_KID", "CYBER_LU", "MAGENTA88", "SCANLINE", "BIT_LORD", "ARKADYA",
  "DROID_X", "RGB_QUEEN", "PIXEL_DAD", "RETROVIRA", "VECTORX", "JOY_STK",
];

export function seededScores(gameId: string): RankingRow[] {
  let seed = [...gameId].reduce((sum, character) => sum + character.charCodeAt(0), 7);
  const random = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const used = new Set<string>();
  const rows: RankingRow[] = [];
  for (let index = 0; index < 12; index++) {
    let name: string;
    do { name = PLAYERS[Math.floor(random() * PLAYERS.length)]; } while (used.has(name));
    used.add(name);
    const score = Math.max(1000, Math.floor(50000 + random() * 250000) - index * Math.floor(2000 + random() * 4000));
    const day = String(1 + Math.floor(random() * 28)).padStart(2, "0");
    const month = String(1 + Math.floor(random() * 12)).padStart(2, "0");
    rows.push({ id: `seed-${gameId}-${index}`, rank: 0, name, score, savedAt: `2026-${month}-${day}T12:00:00.000Z`, demo: false });
  }
  return rows.sort((a, b) => b.score - a.score).map((row, index) => ({ ...row, rank: index + 1 }));
}

export function mergeRankings(gameId: string, scores: readonly DemoScore[]): RankingRow[] {
  const saved = scores.filter((score) => score.gameId === gameId)
    .map((score) => ({ ...score, rank: 0, demo: true }));
  // Stable sorting retains fixture order and then save order for tied scores.
  return [...seededScores(gameId), ...saved].sort((a, b) => b.score - a.score)
    .map((row, index) => ({ ...row, rank: index + 1 }));
}

export const formatScore = (score: number) => score.toLocaleString("en-US");
export const formatDate = (date: string) => new Intl.DateTimeFormat("en-US", {
  month: "2-digit", day: "2-digit", year: "numeric", timeZone: "UTC",
}).format(new Date(date));
