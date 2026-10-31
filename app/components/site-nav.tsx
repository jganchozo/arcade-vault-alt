"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDemo } from "./demo-provider";

export function SiteNav() {
  const pathname = usePathname();
  const { state } = useDemo();
  const libraryActive = pathname === "/" || pathname.startsWith("/games/") || pathname.startsWith("/play/");
  return (
    <nav className="av-nav" aria-label="Primary navigation">
      <Link className="logo" href="/" aria-label="Arcade Vault home">
        <span className="logo-mark" aria-hidden="true" />
        <span className="logo-text neon-cyan">ARCADE <span className="neon-magenta">VAULT</span></span>
      </Link>
      <div className="links">
        <Link href="/" className={libraryActive ? "active" : ""} aria-current={libraryActive ? "page" : undefined}>Library</Link>
        <Link href="/hall-of-fame" className={pathname === "/hall-of-fame" ? "active" : ""} aria-current={pathname === "/hall-of-fame" ? "page" : undefined}>Hall of Fame</Link>
      </div>
      <div className="spacer" />
      <div className="coin-counter"><span className="coin" aria-hidden="true" /><span>CREDITS · 03</span></div>
      <Link className={`btn auth-btn${state.profile ? " ghost" : ""}`} href="/auth">
        {state.profile?.name ?? "Sign In"}
      </Link>
    </nav>
  );
}
