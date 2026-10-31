import { AuthScreen } from "../components/auth-screen";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sign In", description: "Explore Arcade Vault with a local demo profile or as a guest." };

export default function AuthPage() {
  return <AuthScreen />;
}
