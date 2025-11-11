import TacticalMap, { Unit } from "./TacticalMap";

export default function AdminPanel() {
  const commanderUnits: Unit[] = [
    { id: "C1", name: "C1", side: "friendly", path: [ { x: 10, y: 20 }, { x: 18, y: 28 }, { x: 26, y: 30 } ] },
    { id: "C2", name: "C2", side: "friendly", path: [ { x: 35, y: 40 }, { x: 40, y: 42 }, { x: 46, y: 45 } ] },
    { id: "C3", name: "C3", side: "friendly", path: [ { x: 60, y: 55 }, { x: 58, y: 48 }, { x: 54, y: 44 } ] },
    { id: "C4", name: "C4", side: "friendly", path: [ { x: 75, y: 30 }, { x: 70, y: 35 }, { x: 65, y: 38 } ] },
  ];

  const analystUnits: Unit[] = [
    { id: "A1", name: "A1", side: "enemy", path: [ { x: 20, y: 30 }, { x: 25, y: 35 }, { x: 28, y: 40 } ] },
    { id: "A2", name: "A2", side: "enemy", path: [ { x: 45, y: 60 }, { x: 48, y: 55 }, { x: 50, y: 52 } ] },
    { id: "A3", name: "A3", side: "enemy", path: [ { x: 70, y: 25 }, { x: 66, y: 28 }, { x: 60, y: 30 } ] },
    { id: "A4", name: "A4", side: "enemy", path: [ { x: 55, y: 50 }, { x: 58, y: 48 }, { x: 62, y: 46 } ] },
  ];

  const healthRows = [
    { unit: "Bravo-2", status: "İyi", vitals: "HR 78, SpO2 98%" },
    { unit: "Echo-7", status: "Dikkat", vitals: "HR 102, SpO2 93%" },
  ];

  return (
    <section className="panel">
      <h1>Yönetici Paneli</h1>
      <p>Komutan, Analist ve Sağlık panolarının özet görünümü.</p>
      <div className="grid-3-balanced">
        {/* Komutan Paneli */}
        <div className="panel">
          <h2>Komutan</h2>
          <div className="chips">
            <span className="chip">Birimler: 4</span>
            <span className="chip">Uyarılar: 2</span>
            <span className="chip">Durum: Operasyonel</span>
          </div>
          <div style={{ height: 220 }}>
            <TacticalMap units={commanderUnits} speedMs={700} />
          </div>
          <div className="mt-2">
            <button className="btn btn-primary">Görevleri Gör</button>
            <button className="btn btn-secondary">Rapor Al</button>
          </div>
        </div>

        {/* Analist Paneli */}
        <div className="panel">
          <h2>Analist</h2>
          <div className="chips">
            <span className="chip">Veri Noktaları: 1.2K</span>
            <span className="chip">Trendler: 3</span>
            <span className="chip">Model: Hazır</span>
          </div>
          <div style={{ height: 220 }}>
            <TacticalMap units={analystUnits} speedMs={900} />
          </div>
          <div className="mt-2">
            <button className="btn btn-primary">Analizleri Aç</button>
            <button className="btn btn-secondary">Dışa Aktar</button>
          </div>
        </div>

        {/* Sağlık Paneli */}
        <div className="panel">
          <h2>Sağlık</h2>
          <div className="chips">
            <span className="chip">Uyarılar: 1</span>
            <span className="chip">Durum: İzleniyor</span>
          </div>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Birim</th>
                  <th>Durum</th>
                  <th>Hayati Değerler</th>
                </tr>
              </thead>
              <tbody>
                {healthRows.map((r) => (
                  <tr key={r.unit}>
                    <td>{r.unit}</td>
                    <td>{r.status}</td>
                    <td>{r.vitals}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2">
            <button className="btn btn-primary">Sağlık Panelini Aç</button>
            <button className="btn btn-secondary">PDF Raporu</button>
          </div>
        </div>
      </div>
    </section>
  );
}