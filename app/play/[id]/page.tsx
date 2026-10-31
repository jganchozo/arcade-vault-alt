import { notFound } from "next/navigation";
import { PlayerPreview } from "../../components/player-preview";
import { GAMES, getGame } from "../../lib/catalog";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const game = getGame((await params).id);
  return { title: game ? `${game.title} Preview` : "Game Not Found", description: "A decorative CRT player preview with fixed demo scores. Gameplay is not available." };
}

export function generateStaticParams() {
  return GAMES.map(({ id }) => ({ id }));
}

export default async function PlayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = getGame(id);
  if (!game) notFound();
  return <PlayerPreview key={game.id} game={game} />;
}
