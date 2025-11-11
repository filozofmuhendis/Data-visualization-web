export default function LoginPage() {
  return (
    <section className="stack">
      <div className="panel">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div className="title">Secure Login</div>
            <div className="subtitle">Role-based access for MSA Dashboard</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="chip">Security: AES-256</span>
            <span className="chip">Protocol: OAuth2</span>
          </div>
        </div>
      </div>
      <div className="panel">
        <h2>Kimlik Doğrulama</h2>
        <p className="muted">Komutan, Sağlık Görevlisi ve Analist rollerini statik olarak seçebilirsiniz.</p>
        <div style={{ display: "grid", gap: 10, maxWidth: 420 }}>
          <input placeholder="Kullanıcı adı" style={{ padding: 10, borderRadius: 8, border: "1px solid var(--border)", background: "#0b1220", color: "#e5e9f2" }} />
          <input type="password" placeholder="Parola" style={{ padding: 10, borderRadius: 8, border: "1px solid var(--border)", background: "#0b1220", color: "#e5e9f2" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            <button className="btn">Commander</button>
            <button className="btn">Health Officer</button>
            <button className="btn">Analyst</button>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary">Giriş</button>
            <button className="btn">Temizle</button>
          </div>
        </div>
      </div>
    </section>
  );
}