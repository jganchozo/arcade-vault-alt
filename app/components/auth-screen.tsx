"use client";

import { useState, type KeyboardEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { normalizeName } from "../lib/demo-storage";
import { useDemo } from "./demo-provider";
import { AuthFields } from "./auth-fields";

export function AuthScreen() {
  const [tab, setTab] = useState<"in" | "up">("in");
  const [feedback, setFeedback] = useState("");
  const { signIn, signOut, ready } = useDemo();
  const router = useRouter();
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = normalizeName(String(data.get("username") ?? ""));
    if (!name || !String(data.get("password") ?? "").trim()) {
      setFeedback("Enter a username and password to preview your account.");
      return;
    }
    signIn(name);
    form.reset();
    router.push("/");
  }
  function moveTab(event: KeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? "in" : event.key === "End" ? "up" : tab === "in" ? "up" : "in";
    setTab(next);
    event.currentTarget.parentElement?.querySelector<HTMLButtonElement>(`#auth-tab-${next}`)?.focus();
  }
  return (
    <div className="av-auth-wrap fade-in">
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-header">
          <div className="mark" aria-hidden="true" />
          <h1 id="auth-title" className="neon-cyan">ARCADE VAULT</h1>
          <p className="auth-subtitle">SYSTEM ACCESS · v0.1</p>
        </div>
        <div className="auth-tabs" role="tablist" aria-label="Account access">
          {(["in", "up"] as const).map((item) => <button key={item} id={`auth-tab-${item}`} type="button"
            role="tab" aria-selected={tab === item} aria-controls="auth-panel" tabIndex={tab === item ? 0 : -1}
            className={tab === item ? "on" : ""} onClick={() => setTab(item)} onKeyDown={moveTab}>
            {item === "in" ? "SIGN IN" : "CREATE ACCOUNT"}
          </button>)}
        </div>
        <div id="auth-panel" role="tabpanel" aria-labelledby={`auth-tab-${tab}`}>
          <form onSubmit={submit}>
            <AuthFields signUp={tab === "up"} />
            <button className="btn lg auth-submit" type="submit" disabled={!ready}>{tab === "in" ? "ENTER THE VAULT" : "CREATE & EXPLORE"}</button>
          </form>
        </div>
        <button className="btn ghost auth-guest" type="button" disabled={!ready}
          onClick={() => { signOut(); router.push("/"); }}>CONTINUE AS GUEST</button>
        <div className="auth-divider">OR CONTINUE WITH</div>
        <div className="social">
          <button className="btn ghost" type="button" onClick={() => setFeedback("Google sign-in is unavailable in this demo.")}>◆ GOOGLE</button>
          <button className="btn ghost" type="button" onClick={() => setFeedback("GitHub sign-in is unavailable in this demo.")}>▣ GITHUB</button>
        </div>
        <p className="auth-feedback" role="status">{feedback}</p>
        <p className="auth-disclaimer">Demo access. No real account is created.</p>
      </section>
    </div>
  );
}
