import TacticalMap from "@/components/TacticalMap";
import type { Unit } from "@/components/TacticalMap";

export default function AnalystDashboard() {
  return (
    <section className="stack">
      {/* Header */}
      <div className="panel">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div className="title">İstihbarat ve Analiz Panosu</div>
            <div className="subtitle">İstihbarat Analisti</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className="chip">Veri Noktaları: 4.213</span>
            <span className="chip">Tehditler: 12</span>
            <span className="chip">Kalıplar: 5</span>
            <span className="chip">Güven: %71</span>
          </div>
        </div>
      </div>

      {/* Analysis Parameters & Results */}
      <div className="grid-2-balanced">
        <div className="panel">
          <h2>Analiz Parametreleri</h2>
          <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 8 }}>
            <span>Zaman Aralığı:</span>
            <label className="chip">Son 24 Saat</label>
            <span>Veri Kaynakları:</span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <label className="chip">Birim Konumları</label>
              <label className="chip">Sağlık Verisi</label>
              <label className="chip">Lojistik Verisi</label>
              <label className="chip">Hava Durumu Verisi</label>
            </div>
            <span>Analiz Türü:</span>
            <label className="chip">Desen Tanıma</label>
          </div>
        </div>
        <div className="panel">
          <h2>Analiz Sonuçları</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Bulgular</th>
                <th>Tür</th>
                <th>Güven</th>
                <th>Etkisi</th>
                <th>Zaman</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sektör 7'de rota anomali tespit edildi</td>
                <td>Anomali</td>
                <td>0.81</td>
                <td><span className="chip chip-risk-moderate">Orta</span></td>
                <td>12:04</td>
              </tr>
              <tr>
                <td>Hava-Lojistik korelasyonu gözlemlendi</td>
                <td>Korelasyon</td>
                <td>0.67</td>
                <td><span className="chip">Düşük</span></td>
                <td>11:48</td>
              </tr>
            </tbody>
          </table>
          <p className="muted" style={{ marginTop: 8 }}>Özet: Hava koşullarındaki bozulma, doğu güzergahında daha yavaş ikmalle ilişkilidir.</p>
        </div>
      </div>

      {/* Intelligence Monitoring */}
      <div className="grid-2-balanced">
        <div className="panel">
          <h2>Tehdit Değerlendirmesi</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="panel-2">
              <div className="chip chip-risk-moderate" style={{ marginBottom: 8, display: "inline-block" }}>GENEL: ORTA</div>
              <div> Kinetik Tehditler</div>
              <div className="bar"><div className="bar-fill" style={{ width: "30%" }} /></div>
              <div style={{ marginTop: 8 }}> Siber Tehditler</div>
              <div className="bar"><div className="bar-fill" style={{ width: "15%" }} /></div>
              <div style={{ marginTop: 8 }}> Çevresel</div>
              <div className="bar"><div className="bar-fill" style={{ width: "45%" }} /></div>
            </div>
            <div className="panel-2">
              <div className="title" style={{ fontSize: 16, marginBottom: 8 }}>İlgi Alanı: Sektör 7B</div>
              {(() => {
                const units: Unit[] = [
                  { id: "U-021", name: "Infantry-2", side: "friendly", path: [
                    { x: 20, y: 75 }, { x: 30, y: 70 }, { x: 42, y: 66 }
                  ] },
                  { id: "U-033", name: "Recon", side: "friendly", path: [
                    { x: 18, y: 60 }, { x: 26, y: 55 }, { x: 34, y: 52 }
                  ] },
                  { id: "E-12", name: "Enemy-Patrol", side: "enemy", path: [
                    { x: 78, y: 30 }, { x: 72, y: 36 }, { x: 66, y: 40 }
                  ] },
                ];
                return <TacticalMap units={units} height={200} speedMs={900} />;
              })()}
            </div>
          </div>
        </div>
        <div className="panel">
          <h2>Olay Geçmişi</h2>
          <ul>
            <li>12:01 — Sensör 3: Anomali</li>
            <li>12:09 — Operatör onayı</li>
            <li>12:15 — Görev güncellemesi</li>
          </ul>
        </div>
      </div>
    </section>
  );
}