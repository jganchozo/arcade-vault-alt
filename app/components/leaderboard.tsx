"use client";

import { formatDate, formatScore, mergeRankings } from "../lib/rankings";
import type { RankingRow } from "../lib/demo-types";
import { useDemo } from "./demo-provider";

function Entry({ row }: { row: RankingRow }) {
  return <li value={row.rank} className={`lb-row${row.rank <= 3 ? ` top${row.rank}` : ""}${row.demo ? " demo-ranking" : ""}`}>
    <span className="rk">#{String(row.rank).padStart(2, "0")}</span>
    <span className="pl">{row.name}<span className="ranking-date">{formatDate(row.savedAt)}{row.demo ? " · PREVIEW" : ""}</span></span>
    <span className="sc">{formatScore(row.score)}</span>
  </li>;
}

export function Leaderboard({ gameId }: { gameId: string }) {
  const { state } = useDemo();
  const rows = mergeRankings(gameId, state.scores);
  const savedBelow = rows.slice(10).filter((row) => row.demo);
  return (
    <section className="leaderboard" aria-labelledby="detail-ranking-title">
      <h3 id="detail-ranking-title">HIGH SCORES</h3>
      <ol className="ranking-list">
        {rows.slice(0, 10).map((row) => <Entry key={row.id} row={row} />)}
      </ol>
      {savedBelow.length > 0 && <><h3>SAVED PREVIEWS</h3><ol className="ranking-list">{savedBelow.map((row) => <Entry key={row.id} row={row} />)}</ol></>}
    </section>
  );
}
