"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { formatScore } from "../lib/rankings";
import { normalizeName } from "../lib/demo-storage";
import { PREVIEW_SCORE } from "./player-hud";
import { useDemo } from "./demo-provider";
import { trapDialogFocus } from "../lib/dialog-focus";

type Props = { gameId: string; name: string; onDismiss: () => void; onReplay: () => void };

export function ScoreDialog({ gameId, name: initialName, onDismiss, onReplay }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const submitted = useRef(false);
  const [name, setName] = useState(initialName);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const { saveScore, ready, storageError } = useDemo();
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitted.current || !ready) return;
    const normalized = normalizeName(name);
    if (!normalized) { setError("Enter your initials or display name."); return; }
    submitted.current = true;
    saveScore({ id: crypto.randomUUID(), gameId, name: normalized, score: PREVIEW_SCORE, savedAt: new Date().toISOString() });
    setSaved(true);
  }
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    element?.querySelector<HTMLInputElement>("#score-name")?.focus();
    return () => element?.close();
  }, []);
  return (
    <dialog ref={dialog} className="modal-bd" aria-labelledby="score-dialog-title" onClose={onDismiss} onKeyDown={trapDialogFocus}>
      <div className="modal">
        <button className="modal-close" onClick={onDismiss} aria-label="Close score dialog">×</button>
        <h2 id="score-dialog-title">SESSION OVER</h2>
        <div className="final-label">FINAL PREVIEW SCORE</div>
        <div className="final">{formatScore(PREVIEW_SCORE)}</div>
        {!saved ? <form className="input-row" onSubmit={submit}>
          <label className="sr-only" htmlFor="score-name">Your initials or display name</label>
          <input id="score-name" name="name" value={name} onChange={(event) => setName(event.target.value.toUpperCase().slice(0, 10))}
            maxLength={10} placeholder="YOUR INITIALS" required autoFocus aria-describedby={error ? "score-error" : undefined} />
          <button className="btn yellow" type="submit" disabled={!ready}>SAVE SCORE</button>
        </form> : <>
          <div className="toast-saved" role="status">▸ SCORE SAVED_</div>
          {storageError && <p className="auth-feedback">Kept for this visit only. Browser storage is unavailable.</p>}
        </>}
        {error && !saved && <p id="score-error" className="auth-feedback" role="alert">{error}</p>}
        <div className="actions">
          <button className="btn" onClick={onReplay}>PLAY AGAIN</button>
          <Link className="btn magenta" href="/">BACK TO THE VAULT</Link>
        </div>
      </div>
    </dialog>
  );
}
