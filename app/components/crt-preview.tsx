export function CrtPreview({ title }: { title: string }) {
  return (
    <div className="crt">
      <div className="crt-screen">
        <div className="game-arena" aria-hidden="true">
          <div className="grid-floor" />
          <div className="enemy e1" /><div className="enemy e2" /><div className="enemy e3" />
          <div className="player-ship" />
        </div>
      </div>
      <div className="crt-bottom">
        <span className="led">SIGNAL OK</span>
        <span>{title} · CRT-83 · 60 HZ</span>
        <span>LOAD · 1MB</span>
      </div>
    </div>
  );
}
