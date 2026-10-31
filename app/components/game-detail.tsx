import type { Game } from "../lib/catalog";
import { GameCover } from "./game-cover";
import { Leaderboard } from "./leaderboard";

export function GameDetail({ game }: { game: Game }) {
  return (
    <div className="av-detail fade-in">
      <div>
        <div className="detail-cover"><GameCover cover={game.cover} /></div>
        <div className="detail-info"><h1 className="neon-cyan">{game.title}</h1></div>
      </div>
      <aside><Leaderboard gameId={game.id} /></aside>
    </div>
  );
}
