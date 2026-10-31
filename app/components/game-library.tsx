"use client";

import { useState } from "react";
import { CATEGORIES, GAMES, type Category } from "../lib/catalog";
import { GameCard } from "./game-card";

export function GameLibrary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("ALL");
  const filtered = GAMES.filter((game) => (category === "ALL" || game.cat === category)
    && game.title.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <div className="fade-in">
      <section className="av-hero" aria-labelledby="library-title">
        <h1 id="library-title" className="flicker">ARCADE VAULT</h1>
        <div className="sub">INSERT A COIN TO PLAY <span className="blink" aria-hidden="true">_</span></div>
      </section>
      <div className="av-filters">
        <div className="av-search">
          <span className="ico" aria-hidden="true">⌕</span>
          <label className="sr-only" htmlFor="game-search">Search games by name</label>
          <input id="game-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for a game by name…" aria-controls="game-grid" />
        </div>
        <div className="av-chips" role="group" aria-label="Game categories">
          {CATEGORIES.map((item) => (
            <button key={item} type="button" className={`chip${category === item ? " active" : ""}`}
              aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>
      </div>
      <p className="sr-only" role="status">{filtered.length} games found</p>
      <div className="av-grid" id="game-grid">
        {filtered.map((game) => <GameCard key={game.id} game={game} />)}
        {filtered.length === 0 && (
          <div className="empty-state">
            <h2 className="pixel neon-magenta">NO RESULTS FOUND</h2>
            <p>Try another search or category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
