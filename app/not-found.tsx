import Link from "next/link";

export default function NotFound() {
  return (
    <section className="empty-state">
      <p className="pixel neon-magenta">404 · SIGNAL LOST</p>
      <h1 className="pixel neon-cyan">NOT IN THE VAULT</h1>
      <p>This page or game could not be found.</p>
      <Link className="btn lg" href="/" style={{ marginTop: 24 }}>BACK TO THE LIBRARY</Link>
    </section>
  );
}
