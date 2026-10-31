export const CATEGORIES = ["ALL", "ARCADE", "PUZZLE", "SHOOTER", "VERSUS"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Game = {
  id: string;
  title: string;
  short: string;
  long: string;
  cat: Exclude<Category, "ALL">;
  cover: string;
  color: "cyan" | "magenta" | "yellow" | "green";
  best: number;
  plays: string;
};

export const GAMES: readonly Game[] = [
  {
    id: "bloque-buster",
    title: "BLOCK BUSTER",
    short: "Bounce the ball. Break through walls of neon.",
    long: "Pilot a paddle ship and bounce a plasma core through walls of colored blocks. Each level rearranges the grid into impossible patterns. How long can you keep your streak alive?",
    cat: "ARCADE",
    cover: "cover-bricks",
    color: "cyan",
    best: 28450,
    plays: "12.4K",
  },
  {
    id: "caida",
    title: "DROP",
    short: "Fit the pieces before the ceiling closes in.",
    long: "Geometric pieces fall out of the darkness. Rotate, stack, and clear lines to survive. The pace picks up relentlessly every ten lines.",
    cat: "PUZZLE",
    cover: "cover-tetro",
    color: "magenta",
    best: 184220,
    plays: "31.8K",
  },
  {
    id: "serpentina",
    title: "SERPENTINE",
    short: "Grow longer without biting your own tail.",
    long: "A snake of light crosses the grid in search of magenta cores. Each bite makes it longer and faster. One wrong turn and it devours itself.",
    cat: "ARCADE",
    cover: "cover-snake",
    color: "green",
    best: 7820,
    plays: "9.1K",
  },
  {
    id: "gloton",
    title: "GLUTTON",
    short: "Devour the dots. Stay ahead of the ghosts.",
    long: "A hungry circle patrols a maze collecting glowing dots. Four ghosts give chase, but a power pill occasionally turns the tables.",
    cat: "ARCADE",
    cover: "cover-glot",
    color: "yellow",
    best: 96400,
    plays: "27.2K",
  },
  {
    id: "invasores",
    title: "INVADERS",
    short: "Defend the planet from alien formations.",
    long: "Wave after wave of hostile pixels descends toward the planet. Move your cannon and fire with precision before they reach the surface.",
    cat: "SHOOTER",
    cover: "cover-invaders",
    color: "green",
    best: 54190,
    plays: "18.0K",
  },
  {
    id: "rocas",
    title: "ROCKS",
    short: "Shatter asteroids in zero gravity.",
    long: "Your triangular ship drifts through empty space. Rotate and fire to split rocks into smaller fragments. Watch for UFOs on the horizon.",
    cat: "SHOOTER",
    cover: "cover-rocas",
    color: "yellow",
    best: 41200,
    plays: "15.6K",
  },
  {
    id: "ranaria",
    title: "FROG RUN",
    short: "Hop across the pixel highway.",
    long: "Leap between lanes of speeding cars and logs drifting down the river. Reach the lily pads before time runs out.",
    cat: "ARCADE",
    cover: "cover-rana",
    color: "green",
    best: 18900,
    plays: "6.4K",
  },
  {
    id: "duelo-pixel",
    title: "PIXEL DUEL",
    short: "Two paddles. One ball. Pure reflexes.",
    long: "The simplest duel: two vertical paddles keep a glowing ball in play. A classic contest of timing, angles, and lightning-fast reactions.",
    cat: "VERSUS",
    cover: "cover-duelo",
    color: "cyan",
    best: 24,
    plays: "4.2K",
  },
];

export function getGame(id: string) {
  return GAMES.find((game) => game.id === id);
}
