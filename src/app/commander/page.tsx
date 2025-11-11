import TacticalMap from "../../components/TacticalMap";

export default function CommanderDashboard() {
  const units = [
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
            <div className="title">Commander Dashboard</div>
            <div className="subtitle">Welcome, Commander</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className="chip chip-risk-low">System: OPERATIONAL</span>
            <span className="chip">Units: 12/12</span>
            <span className="chip">Alerts: 2</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary">Refresh</button>
            <button className="btn">Settings</button>
            <button className="btn btn-danger">Logout</button>
          </div>
        </div>
      </div>

      {/* Main content two-column layout */}
      <div className="grid-2">
        {/* Left: Tactical Map + Mission */}
        <div className="stack">
          <div className="panel">
            <h2>Tactical Map</h2>
            <p className="muted">Katmanlar: Units, Threats, Missions, Weather</p>
            <TacticalMap units={units} height={360} speedMs={700} />
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="btn">Refresh Map</button>
              <button className="btn">Toggle Threats</button>
              <label className="chip">Heatmap: ON</label>
              <label className="chip">Routes: ON</label>
              <label className="chip">Zones: ON</label>
            </div>
          </div>
          <div className="panel">
            <h2>Current Mission Status</h2>
            <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 8 }}>
              <span>Mission:</span>
              <strong>Operation Sentinel</strong>
              <span>Phase:</span>
              <strong>Advance</strong>
              <span>Progress:</span>
              <div className="bar"><div className="bar-fill" style={{ width: "48%" }} /></div>
            </div>
          </div>
        </div>

        {/* Right: Tabs (Units, Health, Logistics, Alerts) */}
        <div className="stack">
          <div className="panel">
            <h2>Units</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Unit ID</th>
                  <th>Type</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Last Seen</th>
                  <th>Risk</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>U-013</td>
                  <td>Armor</td>
                  <td>41.012, 28.975</td>
                  <td><span className="chip">Operational</span></td>
                  <td>2m ago</td>
                  <td><span className="chip chip-risk-moderate">Moderate</span></td>
                  <td><button className="btn btn-primary">Select</button></td>
                </tr>
                <tr>
                  <td>U-021</td>
                  <td>Infantry</td>
                  <td>41.014, 28.978</td>
                  <td><span className="chip">Active</span></td>
                  <td>1m ago</td>
                  <td><span className="chip chip-risk-low">Low</span></td>
                  <td><button className="btn">Details</button></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="panel">
            <h2>Health</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Unit ID</th>
                  <th>HR</th>
                  <th>SpO2</th>
                  <th>Status</th>
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
                  <td><span className="chip chip-risk-moderate">Warning</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="panel">
            <h2>Logistics</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Unit ID</th>
                  <th>Fuel</th>
                  <th>Ammo</th>
                  <th>Resupply ETA</th>
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
            <h2>Alerts</h2>
            <ul>
              <li><span className="chip chip-risk-high">CRITICAL</span> — Enemy movement detected near Sector 7B</li>
              <li><span className="chip chip-risk-moderate">WARNING</span> — Weather degradation expected in 30 minutes</li>
            </ul>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button className="btn btn-success">Acknowledge Selected</button>
              <button className="btn btn-warning">Create Alert</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}