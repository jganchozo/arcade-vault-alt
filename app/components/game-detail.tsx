import type { Game } from "../lib/catalog";
import Link from "next/link";
import { formatScore } from "../lib/rankings";
import { GameCover } from "./game-cover";
import { Leaderboard } from "./leaderboard";

export function GameDetail({ game }: { game: Game }) {
  return (
    <div className="av-detail fade-in">
      <div>
        <div className="detail-cover"><GameCover cover={game.cover} /></div>
        <div className="detail-info">
          <div className="detail-tags"><span>{game.cat}</span><span>1 PLAYER</span><span>KEYBOARD / TOUCH</span><span>RETRO 1985</span></div>
          <h1 className="neon-cyan">{game.title}</h1>
          <p>{game.long}</p>
          <dl className="stat-strip">
            <div><dt className="l">Plays</dt><dd className="v">{game.plays}</dd></div>
            <div><dt className="l">Global best</dt><dd className="v neon-magenta">{formatScore(game.best)}</dd></div>
            <div><dt className="l">Difficulty</dt><dd className="v neon-yellow" aria-label="3 out of 5 stars">★ ★ ★ ☆ ☆</dd></div>
          </dl>
          <div className="detail-actions">
            <Link className="btn xl pulse" href={`/play/${game.id}`}>▶ PLAY NOW</Link>
            <Link className="btn ghost lg" href="/">BACK TO THE VAULT</Link>
          </div>
        </div>
      </div>
      <aside><Leaderboard gameId={game.id} /></aside>
    </div>
  );
}
