"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useDemo } from "./demo-provider";

export function SiteNav() {
  const pathname = usePathname();
  const { state, signOut } = useDemo();
  const menu = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const closeMenu = () => menu.current?.close();
  const libraryActive = pathname === "/" || pathname.startsWith("/games/") || pathname.startsWith("/play/");
  return (
    <>
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
      {state.profile
        ? <button className="btn ghost auth-btn" onClick={signOut} aria-label={`Sign out ${state.profile.name}`} title="Sign out">{state.profile.name} ▾</button>
        : <Link className="btn auth-btn" href="/auth">Sign In</Link>}
      <button className="btn ghost hamburger" aria-label="Open menu" aria-haspopup="dialog" aria-expanded={open}
        onClick={() => { menu.current?.showModal(); setOpen(true); }}>≡</button>
    </nav>
    <dialog ref={menu} className="av-mobile-dialog" aria-labelledby="mobile-menu-title" onClose={() => setOpen(false)}
      onClick={(event) => { if (event.target === event.currentTarget) closeMenu(); }}>
      <div className="av-mobile-panel open">
        <div className="mobile-menu-heading">
          <h2 id="mobile-menu-title" className="pixel neon-cyan">MENU</h2>
          <button className="btn ghost" onClick={closeMenu} aria-label="Close menu" autoFocus>×</button>
        </div>
        <Link href="/" className={libraryActive ? "active" : ""} onClick={closeMenu}>Library</Link>
        <Link href="/hall-of-fame" className={pathname === "/hall-of-fame" ? "active" : ""} onClick={closeMenu}>Hall of Fame</Link>
        <Link href="/auth" className={pathname === "/auth" ? "active" : ""} onClick={closeMenu}>{state.profile ? "Demo Account" : "Sign In"}</Link>
        {state.profile && <button className="btn ghost" onClick={() => { signOut(); closeMenu(); }}>SIGN OUT</button>}
        <div className="mobile-menu-credits pixel">CREDITS · 03</div>
      </div>
    </dialog>
    </>
  );
}
