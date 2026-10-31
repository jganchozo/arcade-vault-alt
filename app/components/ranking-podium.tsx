import type { RankingRow } from "../lib/demo-types";
import { formatDate, formatScore } from "../lib/rankings";

export function RankingPodium({ rows }: { rows: readonly RankingRow[] }) {
  return (
    <section className="podium" aria-label="Top three players">
      {[1, 0, 2].map((index) => {
        const row = rows[index];
        if (!row) return null;
        return <div key={row.id} className={`podium-slot ${["gold", "silver", "bronze"][index]}`}>
          {index === 0 && <div className="pixel podium-champion">CHAMPION</div>}
          <div className={`rank-num${index === 0 ? " champion-rank" : ""}`}>{String(row.rank).padStart(2, "0")}</div>
          <h2 className="name">{row.name}</h2>
          <div className="score">{formatScore(row.score)}</div>
          <div className="date">{formatDate(row.savedAt)}</div>
        </div>;
      })}
    </section>
  );
}
