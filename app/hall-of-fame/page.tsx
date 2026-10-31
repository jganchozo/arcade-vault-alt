import { HallOfFame } from "../components/hall-of-fame";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Hall of Fame", description: "Browse sample high scores and your saved Arcade Vault previews." };

export default function HallPage() {
  return <HallOfFame />;
}
