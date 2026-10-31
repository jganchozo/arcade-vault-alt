import { GAMES } from "../lib/catalog";
import { GameCard } from "./game-card";

export function GameLibrary() {
  return (
    <div className="fade-in">
      <section className="av-hero" aria-labelledby="library-title">
        <h1 id="library-title" className="flicker">ARCADE VAULT</h1>
        <div className="sub">INSERT A COIN TO PLAY <span className="blink" aria-hidden="true">_</span></div>
      </section>
      <div className="av-grid">
        {GAMES.map((game) => <GameCard key={game.id} game={game} />)}
      </div>
    </div>
  );
}
