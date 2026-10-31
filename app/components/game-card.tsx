import Link from "next/link";
import type { Game } from "../lib/catalog";
import { formatScore } from "../lib/rankings";
import { GameCover } from "./game-cover";

export function GameCard({ game }: { game: Game }) {
  return (
    <article className="card">
      <Link className="game-card-link" href={`/games/${game.id}`} aria-label={`View ${game.title}`}>
        <div className="cover">
          <GameCover cover={game.cover} />
          <span className="label">{game.cat}</span>
        </div>
        <div className="meta">
          <h2 className="title">{game.title}</h2>
          <p className="desc">{game.short}</p>
        </div>
      </Link>
      <div className="row">
        <div className="score-badge"><span>HIGH SCORE</span><b>{formatScore(game.best)}</b></div>
        <Link className={`btn ${game.color}`} href={`/games/${game.id}`} aria-label={`Play ${game.title}`}>PLAY</Link>
      </div>
    </article>
  );
}
