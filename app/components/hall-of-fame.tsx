"use client";

import Link from "next/link";
import { useState, type KeyboardEvent } from "react";
import { GAMES } from "../lib/catalog";
import { formatDate, formatScore, mergeRankings } from "../lib/rankings";
import { RankingPodium } from "./ranking-podium";
import { useDemo } from "./demo-provider";

export function HallOfFame() {
  const [selected, setSelected] = useState(GAMES[0].id);
  const game = GAMES.find((item) => item.id === selected)!;
  const { state } = useDemo();
  const rows = mergeRankings(selected, state.scores);
  const shown = [...rows.slice(0, 12), ...rows.slice(12).filter((row) => row.demo)];
  const personalBest = state.profile ? rows.find((row) => row.demo && row.name === state.profile?.name) : undefined;
  function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? GAMES.length - 1
      : (index + (event.key === "ArrowRight" ? 1 : -1) + GAMES.length) % GAMES.length;
    setSelected(GAMES[next].id);
    event.currentTarget.parentElement?.querySelector<HTMLButtonElement>(`#hall-tab-${GAMES[next].id}`)?.focus();
  }
  return (
    <div className="av-hall fade-in">
      <header className="hall-head"><h1>HALL OF FAME</h1><p className="pixel">THE NAMES THAT NEVER LEAVE THE SCREEN</p></header>
      <div className="hall-tabs" role="tablist" aria-label="Game rankings">
        {GAMES.map((item, index) => <button key={item.id} id={`hall-tab-${item.id}`} className={`chip${selected === item.id ? " active" : ""}`}
          role="tab" aria-selected={selected === item.id} aria-controls="hall-ranking-panel" tabIndex={selected === item.id ? 0 : -1}
          onClick={() => setSelected(item.id)} onKeyDown={(event) => moveTab(event, index)}>{item.title}</button>)}
      </div>
      <div id="hall-ranking-panel" role="tabpanel" aria-labelledby={`hall-tab-${selected}`}>
        <RankingPodium rows={rows} />
        <div className="hall-table" role="table" aria-label={`${game.title} high scores`}>
          <div className="th" role="row">{["RANK", "PLAYER", "SCORE", "DATE"].map((label) => <div key={label} role="columnheader">{label}</div>)}</div>
          {shown.map((row, index) => <div key={`${selected}-${row.id}`} role="row" className={`tr${row.rank <= 3 ? ` top${row.rank}` : ""}${row.demo ? " demo-ranking" : ""}`} style={{ animationDelay: `${Math.min(index, 12) * 50}ms` }}>
            <div className="rk" role="cell">#{String(row.rank).padStart(2, "0")}</div>
            <div className="pl" role="cell">{row.name}{row.demo && <span className="preview-badge">PREVIEW</span>}</div>
            <div className="sc" role="cell">{formatScore(row.score)}</div>
            <div className="dt" role="cell">{formatDate(row.savedAt)}</div>
          </div>)}
          {personalBest && <>
            <div className="tr you-label" role="row"><div role="cell" aria-colspan={4}>▸ YOUR BEST PREVIEW IN {game.title}</div></div>
            <div className="tr you" role="row">
              <div className="rk" role="cell">#{String(personalBest.rank).padStart(2, "0")}</div>
              <div className="pl" role="cell">{personalBest.name}</div>
              <div className="sc" role="cell">{formatScore(personalBest.score)}</div>
              <div className="dt" role="cell">{formatDate(personalBest.savedAt)}</div>
            </div>
          </>}
        </div>
        {state.profile && !personalBest && <p className="personal-empty">No saved preview for this game yet.</p>}
      </div>
      <div className="hall-return"><Link className="btn lg" href="/">BACK TO THE LIBRARY</Link></div>
    </div>
  );
}
