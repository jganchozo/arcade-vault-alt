"use client";

import { useState } from "react";
import type { Game } from "../lib/catalog";
import { CrtPreview } from "./crt-preview";
import { PlayerHud } from "./player-hud";
import { useDemo } from "./demo-provider";
import { ScoreDialog } from "./score-dialog";

export function PlayerPreview({ game }: { game: Game }) {
  const [paused, setPaused] = useState(false);
  const [over, setOver] = useState(false);
  const { state } = useDemo();
  return (
    <div className="av-player fade-in">
      <h1 className="sr-only">{game.title} player preview</h1>
      <p className="preview-notice">VISUAL PREVIEW · GAMEPLAY IS NOT AVAILABLE</p>
      <PlayerHud gameId={game.id} name={state.profile?.name ?? "GUEST"} paused={paused}
        onPause={() => setPaused((value) => !value)} onEnd={() => setOver(true)} />
      <CrtPreview title={game.title} paused={paused} />
      {over && <ScoreDialog gameId={game.id} name={state.profile?.name ?? "GUEST"} onDismiss={() => setOver(false)}
        onReplay={() => { setOver(false); setPaused(false); }} />}
    </div>
  );
}
