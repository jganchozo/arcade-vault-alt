"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { formatScore } from "../lib/rankings";
import { PREVIEW_SCORE } from "./player-hud";

type Props = { name: string; onDismiss: () => void; onReplay: () => void };

export function ScoreDialog({ name, onDismiss, onReplay }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);
  return (
    <dialog ref={dialog} className="modal-bd" aria-labelledby="score-dialog-title" onClose={onDismiss}>
      <div className="modal">
        <button className="modal-close" onClick={onDismiss} aria-label="Close score dialog">×</button>
        <h2 id="score-dialog-title">SESSION OVER</h2>
        <div className="final-label">FINAL PREVIEW SCORE</div>
        <div className="final">{formatScore(PREVIEW_SCORE)}</div>
        <form className="input-row" onSubmit={(event) => event.preventDefault()}>
          <label className="sr-only" htmlFor="score-name">Your initials or display name</label>
          <input id="score-name" name="name" defaultValue={name} maxLength={10} placeholder="YOUR INITIALS" required autoFocus />
          <button className="btn yellow" type="submit" disabled>SAVE SCORE</button>
        </form>
        <div className="actions">
          <button className="btn" onClick={onReplay}>PLAY AGAIN</button>
          <Link className="btn magenta" href="/">BACK TO THE VAULT</Link>
        </div>
      </div>
    </dialog>
  );
}
