import TacticalMap from "../../components/TacticalMap";

export default function AnalystDashboard() {
  return (
    <section className="stack">
      {/* Header */}
      <div className="panel">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div className="title">Intelligence & Analysis Dashboard</div>
            <div className="subtitle">Intelligence Analyst</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className="chip">Data Points: 4,213</span>
            <span className="chip">Threats: 12</span>
            <span className="chip">Patterns: 5</span>
            <span className="chip">Confidence: 71%</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary">Run Analysis</button>
            <button className="btn">Export Data</button>
            <button className="btn">Refresh</button>
            <button className="btn btn-danger">Logout</button>
          </div>
        </div>
      </div>

      {/* Analysis Parameters & Results */}
      <div className="grid-2-balanced">
        <div className="panel">
          <h2>Analysis Parameters</h2>
          <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 8 }}>
            <span>Time Range:</span>
            <label className="chip">Last 24 Hours</label>
            <span>Data Sources:</span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <label className="chip">Unit Positions</label>
              <label className="chip">Health Data</label>
              <label className="chip">Logistics Data</label>
              <label className="chip">Weather Data</label>
            </div>
            <span>Analysis Type:</span>
            <label className="chip">Pattern Recognition</label>
          </div>
        </div>
        <div className="panel">
          <h2>Analysis Results</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Finding</th>
                <th>Type</th>
                <th>Confidence</th>
                <th>Impact</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Route anomaly detected on Sector 7</td>
                <td>Anomaly</td>
                <td>0.81</td>
                <td><span className="chip chip-risk-moderate">Medium</span></td>
                <td>12:04</td>
              </tr>
              <tr>
                <td>Weather-Logistics correlation observed</td>
                <td>Correlation</td>
                <td>0.67</td>
                <td><span className="chip">Low</span></td>
                <td>11:48</td>
              </tr>
            </tbody>
          </table>
          <p className="muted" style={{ marginTop: 8 }}>Summary: Weather degradation correlates with slower resupply on eastern route.</p>
        </div>
      </div>

      {/* Intelligence Monitoring */}
      <div className="grid-2-balanced">
        <div className="panel">
          <h2>Threat Assessment</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="panel-2">
              <div className="chip chip-risk-moderate" style={{ marginBottom: 8, display: "inline-block" }}>OVERALL: MODERATE</div>
              <div> Kinetic Threats</div>
              <div className="bar"><div className="bar-fill" style={{ width: "30%" }} /></div>
              <div style={{ marginTop: 8 }}> Cyber Threats</div>
              <div className="bar"><div className="bar-fill" style={{ width: "15%" }} /></div>
              <div style={{ marginTop: 8 }}> Environmental</div>
              <div className="bar"><div className="bar-fill" style={{ width: "45%" }} /></div>
            </div>
            <div className="panel-2">
              <div className="title" style={{ fontSize: 16, marginBottom: 8 }}>AOI: Sector 7B</div>
              {(() => {
                const units = [
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
                return <TacticalMap units={units as any} height={200} speedMs={900} />;
              })()}
            </div>
          </div>
        </div>
        <div className="panel">
          <h2>Event History</h2>
          <ul>
            <li>12:01 — Sensor 3: Anomaly</li>
            <li>12:09 — Operator approval</li>
            <li>12:15 — Mission update</li>
          </ul>
        </div>
      </div>
    </section>
  );
}