import type { Game } from "../lib/catalog";
import { CrtPreview } from "./crt-preview";

export function PlayerPreview({ game }: { game: Game }) {
  return (
    <div className="av-player fade-in">
      <h1 className="sr-only">{game.title} player preview</h1>
      <p className="preview-notice">VISUAL PREVIEW · GAMEPLAY IS NOT AVAILABLE</p>
      <CrtPreview title={game.title} />
    </div>
  );
}
