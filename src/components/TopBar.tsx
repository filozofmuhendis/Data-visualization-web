export default function TopBar() {
  return (
    <div className="topbar">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "grid" }}>
          <div className="breadcrumb">Ana Sayfa</div>
          <div className="title" style={{ fontSize: 18 }}>Gösterge Paneli</div>
        </div>
        <span className="chip">Sistem: Operasyonel</span>
        <span className="chip">Uyarılar: 2</span>
      </div>
      <div className="topbar-actions">
        <input className="input" placeholder="Ara..." />
        <button className="btn">Ayarlar</button>
        <button className="btn btn-primary">Yenile</button>
      </div>
    </div>
  );
}