import { formatDate, formatScore, seededScores } from "../lib/rankings";

export function Leaderboard({ gameId }: { gameId: string }) {
  const rows = seededScores(gameId).slice(0, 10);
  return (
    <section className="leaderboard" aria-labelledby="detail-ranking-title">
      <h3 id="detail-ranking-title">HIGH SCORES</h3>
      <ol className="ranking-list">
        {rows.map((row) => (
          <li key={row.id} className={`lb-row${row.rank <= 3 ? ` top${row.rank}` : ""}`}>
            <span className="rk">#{String(row.rank).padStart(2, "0")}</span>
            <span className="pl">{row.name}<span className="ranking-date">{formatDate(row.savedAt)}</span></span>
            <span className="sc">{formatScore(row.score)}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
