import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="stack">
      <div className="panel">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div className="title">Doğrudan Erişim</div>
            <div className="subtitle">Kimlik doğrulama kaldırıldı — panolara direkt geçiş yapın</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="chip">Durum: Açık Erişim</span>
            <span className="chip">Güvenlik: Demo</span>
          </div>
        </div>
      </div>
      
      <div className="panel">
        <h2>Hızlı Giriş</h2>
        <p className="muted">Demo amaçlı roller için doğrudan panolara geçiş yapın.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
          <Link className="btn btn-primary" href="/commander">Komutan olarak giriş</Link>
          <Link className="btn btn-primary" href="/analyst">Analist olarak giriş</Link>
          <Link className="btn btn-primary" href="/health">Sağlık Görevlisi olarak giriş</Link>
          <Link className="btn" href="/">Misafir olarak devam et</Link>
        </div>
      </div>
    </section>
  );
}