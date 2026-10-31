import { notFound } from "next/navigation";
import { GameDetail } from "../../components/game-detail";
import { GAMES, getGame } from "../../lib/catalog";

export function generateStaticParams() {
  return GAMES.map(({ id }) => ({ id }));
}

export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = getGame(id);
  if (!game) notFound();
  return <GameDetail game={game} />;
}
