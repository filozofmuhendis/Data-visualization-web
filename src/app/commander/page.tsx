import TacticalMap from "@/components/TacticalMap";
import type { Unit } from "@/components/TacticalMap";

export default function CommanderDashboard() {
  const units: Unit[] = [
    { id: "U-013", name: "Armor-1", side: "friendly", path: [
      { x: 10, y: 80 }, { x: 20, y: 72 }, { x: 32, y: 66 }, { x: 44, y: 58 }, { x: 56, y: 52 }
    ] },
    { id: "U-021", name: "Infantry-2", side: "friendly", path: [
      { x: 15, y: 85 }, { x: 24, y: 78 }, { x: 34, y: 70 }, { x: 46, y: 64 }, { x: 59, y: 59 }
    ] },
    { id: "E-07", name: "Enemy-Scout", side: "enemy", path: [
      { x: 82, y: 30 }, { x: 78, y: 36 }, { x: 74, y: 42 }, { x: 70, y: 48 }
    ] },
  ];
  return (
    <section className="stack">
      {/* Header */}
      <div className="panel">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div className="title">Komutan Panosu</div>
            <div className="subtitle">Hoş geldiniz, Komutan</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className="chip chip-risk-low">Sistem: OPERASYONEL</span>
            <span className="chip">Birimler: 12/12</span>
            <span className="chip">Uyarılar: 2</span>
          </div>
        </div>
      </div>

      {/* Main content two-column layout */}
      <div className="grid-2">
        {/* Left: Tactical Map + Mission */}
        <div className="stack">
          <div className="panel">
            <h2>Taktik Harita</h2>
            <p className="muted">Katmanlar: Birimler, Tehditler, Görevler, Hava Durumu</p>
            <TacticalMap units={units} height={360} speedMs={700} showControls />
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="btn">Haritayı Yenile</button>
              <button className="btn">Tehditleri Aç/Kapat</button>
              <label className="chip">Isı Haritası: AÇIK</label>
              <label className="chip">Rotalar: AÇIK</label>
              <label className="chip">Bölgeler: AÇIK</label>
            </div>
          </div>
          <div className="panel">
            <h2>Mevcut Görev Durumu</h2>
            <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 8 }}>
              <span>Görev:</span>
              <strong>Operasyon Sentinel</strong>
              <span>Aşama:</span>
              <strong>İlerleme</strong>
              <span>İlerleme:</span>
              <div className="bar"><div className="bar-fill" style={{ width: "48%" }} /></div>
            </div>
          </div>
        </div>

        {/* Right: Tabs (Units, Health, Logistics, Alerts) */}
        <div className="stack">
          <div className="panel">
            <h2>Birimler</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Birim ID</th>
                  <th>Tür</th>
                  <th>Konum</th>
                  <th>Durum</th>
                  <th>Son Görülme</th>
                  <th>Risk</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>U-013</td>
                  <td>Zırhlı</td>
                  <td>41.012, 28.975</td>
                  <td><span className="chip">Operasyonel</span></td>
                  <td>2dk önce</td>
                  <td><span className="chip chip-risk-moderate">Orta</span></td>
                  <td><button className="btn btn-primary">Seç</button></td>
                </tr>
                <tr>
                  <td>U-021</td>
                  <td>Piyade</td>
                  <td>41.014, 28.978</td>
                  <td><span className="chip">Aktif</span></td>
                  <td>1dk önce</td>
                  <td><span className="chip chip-risk-low">Düşük</span></td>
                  <td><button className="btn">Detaylar</button></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="panel">
            <h2>Sağlık</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Birim ID</th>
                  <th>Nabız</th>
                  <th>SpO2</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>U-013</td>
                  <td>78</td>
                  <td>97%</td>
                  <td><span className="chip">Normal</span></td>
                </tr>
                <tr>
                  <td>U-021</td>
                  <td>101</td>
                  <td>93%</td>
                  <td><span className="chip chip-risk-moderate">Uyarı</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="panel">
            <h2>Lojistik</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Birim ID</th>
                  <th>Yakıt</th>
                  <th>Mühimmat</th>
                  <th>İkmal ETA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>U-013</td>
                  <td>62%</td>
                  <td>78%</td>
                  <td>15m</td>
                </tr>
                <tr>
                  <td>U-021</td>
                  <td>54%</td>
                  <td>65%</td>
                  <td>22m</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="panel">
            <h2>Uyarılar</h2>
            <ul>
              <li><span className="chip chip-risk-high">KRİTİK</span> — Sektör 7B yakınında düşman hareketi tespit edildi</li>
              <li><span className="chip chip-risk-moderate">WARNING</span> — Weather degradation expected in 30 minutes</li>
            </ul>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button className="btn btn-success">Seçileni Onayla</button>
              <button className="btn btn-warning">Uyarı Oluştur</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}