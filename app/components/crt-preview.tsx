export function CrtPreview({ title, paused = false }: { title: string; paused?: boolean }) {
  return (
    <div className={`crt${paused ? " is-paused" : ""}`}>
      <div className="crt-screen" id="crt-screen">
        <div className="game-arena" aria-hidden="true">
          <div className="grid-floor" />
          <div className="enemy e1" /><div className="enemy e2" /><div className="enemy e3" />
          <div className="player-ship" />
        </div>
        {paused && <div className="crt-content preview-pause" role="status">
          <div><div className="pixel neon-yellow">PAUSED</div><p>PRESS RESUME TO CONTINUE</p></div>
        </div>}
      </div>
      <div className="crt-bottom">
        <span className="led">SIGNAL OK</span>
        <span>{title} · CRT-83 · 60 HZ</span>
        <span>LOAD · 1MB</span>
      </div>
    </div>
  );
}
