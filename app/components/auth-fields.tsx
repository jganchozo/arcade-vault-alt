export function AuthFields({ signUp }: { signUp: boolean }) {
  return (
    <>
      <div className="field">
        <label htmlFor="auth-username">Username</label>
        <input id="auth-username" name="username" placeholder="px_kai" autoComplete="username" maxLength={10} required />
      </div>
      {signUp && <div className="field slide-in">
        <label htmlFor="auth-email">Email address</label>
        <input id="auth-email" name="email" type="email" placeholder="player@vault.gg" autoComplete="email" required />
      </div>}
      <div className="field">
        <label htmlFor="auth-password">Password</label>
        <input id="auth-password" name="password" type="password" placeholder="••••••••"
          autoComplete={signUp ? "new-password" : "current-password"} required />
      </div>
    </>
  );
}
