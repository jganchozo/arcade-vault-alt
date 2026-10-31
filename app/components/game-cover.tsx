import type { Game } from "../lib/catalog";

export function GameCover({ cover }: Pick<Game, "cover">) {
  return <div className={`cover-bg ${cover}`} aria-hidden="true" />;
}
