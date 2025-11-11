export function NavBar() {
  return (
    <header className="navbar">
      <div className="brand">MSA Gösterge Paneli</div>
      <nav>
        <a href="/" className="nav-link">Ana Sayfa</a>
        <a href="/analyst" className="nav-link">Analist</a>
        <a href="/commander" className="nav-link">Komutan</a>
        <a href="/health" className="nav-link">Sağlık</a>
      </nav>
    </header>
  );
}