"use client";

import { useState } from "react";
import type { Game } from "../lib/catalog";
import { CrtPreview } from "./crt-preview";
import { PlayerHud } from "./player-hud";
import { useDemo } from "./demo-provider";

export function PlayerPreview({ game }: { game: Game }) {
  const [paused, setPaused] = useState(false);
  const { state } = useDemo();
  return (
    <div className="av-player fade-in">
      <h1 className="sr-only">{game.title} player preview</h1>
      <p className="preview-notice">VISUAL PREVIEW · GAMEPLAY IS NOT AVAILABLE</p>
      <PlayerHud gameId={game.id} name={state.profile?.name ?? "GUEST"} paused={paused} onPause={() => setPaused((value) => !value)} />
      <CrtPreview title={game.title} paused={paused} />
    </div>
  );
}
