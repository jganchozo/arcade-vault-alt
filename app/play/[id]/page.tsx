import { notFound } from "next/navigation";
import { PlayerPreview } from "../../components/player-preview";
import { GAMES, getGame } from "../../lib/catalog";

export function generateStaticParams() {
  return GAMES.map(({ id }) => ({ id }));
}

export default async function PlayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = getGame(id);
  if (!game) notFound();
  return <PlayerPreview key={game.id} game={game} />;
}
