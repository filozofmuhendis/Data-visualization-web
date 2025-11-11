export function NavBar() {
  return (
    <header className="navbar">
      <div className="brand">MSA Dashboard</div>
      <nav>
        <a href="/" className="nav-link">Ana Sayfa</a>
        <a href="/login" className="nav-link">Login</a>
        <a href="/analyst" className="nav-link">Analyst</a>
        <a href="/commander" className="nav-link">Commander</a>
        <a href="/health" className="nav-link">Health</a>
      </nav>
    </header>
  );
}