import Link from "next/link";
import { formatScore } from "../lib/rankings";

export const PREVIEW_SCORE = 12500;

type Props = { gameId: string; name: string; paused: boolean; onPause: () => void; onEnd?: () => void };

export function PlayerHud({ gameId, name, paused, onPause, onEnd }: Props) {
  return (
    <div className="player-hud">
      <dl className="hud-stats">
        <div className="hud-stat"><dt className="l">Player</dt><dd className="v hud-name">{name}</dd></div>
        <div className="hud-stat"><dt className="l">Score</dt><dd className="v">{formatScore(PREVIEW_SCORE)}</dd></div>
        <div className="hud-stat lives"><dt className="l">Lives</dt><dd className="v" aria-label="3 lives">♥ ♥ ♥</dd></div>
        <div className="hud-stat level"><dt className="l">Level</dt><dd className="v">01</dd></div>
      </dl>
      <div className="hud-actions">
        <button className="btn yellow" onClick={onPause} aria-pressed={paused} aria-controls="crt-screen">{paused ? "RESUME" : "PAUSE"}</button>
        <button className="btn magenta" onClick={onEnd} disabled={!onEnd}>END</button>
        <Link className="btn ghost" href={`/games/${gameId}`}>EXIT</Link>
      </div>
    </div>
  );
}
