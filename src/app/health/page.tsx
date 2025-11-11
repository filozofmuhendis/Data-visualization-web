export default function HealthDashboard() {
  return (
    <section className="stack">
      {/* Header */}
      <div className="panel">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div className="title">Sağlık İzleme Panosu</div>
            <div className="subtitle">Sağlık Görevlisi</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className="chip">Personel: 42</span>
            <span className="chip chip-risk-low">Sağlıklı: 35</span>
            <span className="chip chip-risk-moderate">Uyarı: 6</span>
            <span className="chip chip-risk-high">Kritik: 1</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-danger">Acil Uyarı</button>
          </div>
        </div>
      </div>

      {/* Main content balanced two-column layout */}
      <div className="grid-2-balanced">
        {/* Left: Overview + Alerts */}
        <div className="stack">
          <div className="panel">
            <h2>Sağlık Durumu Genel Bakış</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Birim ID</th>
                  <th>İsim</th>
                  <th>Durum</th>
                  <th>Nabız</th>
                  <th>SpO2</th>
                  <th>Son Güncelleme</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>U-013</td>
                  <td>J.Doe</td>
                  <td><span className="chip">Sağlıklı</span></td>
                  <td>76</td>
                  <td>98%</td>
                  <td>2dk önce</td>
                </tr>
                <tr>
                  <td>U-021</td>
                  <td>A.Smith</td>
                  <td><span className="chip chip-risk-moderate">Uyarı</span></td>
                  <td>102</td>
                  <td>92%</td>
                  <td>1dk önce</td>
                </tr>
              </tbody>
            </table>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <label className="chip">Durum: Tümü</label>
              <label className="chip">Birim: Tümü</label>
            </div>
          </div>
          <div className="panel">
            <h2>Sağlık Uyarıları</h2>
            <ul>
              <li><span className="chip chip-risk-high">KRİTİK</span> — U-021 SpO2 &lt; %90</li>
              <li><span className="chip chip-risk-moderate">UYARI</span> — U-033 Nabız &gt; 110 BPM</li>
            </ul>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button className="btn btn-success">Seçileni Onayla</button>
              <button className="btn btn-warning">Uyarı Oluştur</button>
            </div>
          </div>
        </div>

        {/* Right: Details + Vitals */}
        <div className="stack">
          <div className="panel">
            <h2>Personel Detayları</h2>
            <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 8 }}>
              <span>Birim ID:</span>
              <strong>U-021</strong>
              <span>İsim:</span>
              <strong>A.Smith</strong>
              <span>Rütbe:</span>
              <strong>Sgt</strong>
              <span>Konum:</span>
              <strong>Sektör 7B</strong>
            </div>
          </div>
          <div className="panel">
            <h2>Güncel Hayati Bulgular</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="card">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Nabız (BPM)</span>
                  <strong>102</strong>
                </div>
                <div className="chip chip-risk-moderate" style={{ marginTop: 8 }}>Uyarı</div>
              </div>
              <div className="card">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>SpO2 (%)</span>
                  <strong>92%</strong>
                </div>
                <div className="chip">Normal</div>
              </div>
              <div className="card">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Vücut Sıcaklığı (°C)</span>
                  <strong>37.1</strong>
                </div>
                <div className="chip">Normal</div>
              </div>
              <div className="card">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Stres İndeksi</span>
                  <strong>0.42</strong>
                </div>
                <div className="chip">Normal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}