export type DemoProfile = { name: string };

export type DemoScore = {
  id: string;
  gameId: string;
  name: string;
  score: number;
  savedAt: string;
};

export type DemoState = {
  version: 1;
  profile: DemoProfile | null;
  scores: DemoScore[];
};

export type RankingRow = {
  id: string;
  rank: number;
  name: string;
  score: number;
  savedAt: string;
  demo: boolean;
};
