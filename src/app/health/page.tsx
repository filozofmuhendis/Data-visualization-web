export default function HealthDashboard() {
  return (
    <section className="stack">
      {/* Header */}
      <div className="panel">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div className="title">Health Monitoring Dashboard</div>
            <div className="subtitle">Medical Officer</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className="chip">Personnel: 42</span>
            <span className="chip chip-risk-low">Healthy: 35</span>
            <span className="chip chip-risk-moderate">Warning: 6</span>
            <span className="chip chip-risk-high">Critical: 1</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary">Refresh</button>
            <button className="btn">Export Report</button>
            <button className="btn btn-danger">Emergency Alert</button>
            <button className="btn">Logout</button>
          </div>
        </div>
      </div>

      {/* Main content balanced two-column layout */}
      <div className="grid-2-balanced">
        {/* Left: Overview + Alerts */}
        <div className="stack">
          <div className="panel">
            <h2>Health Status Overview</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Unit ID</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Heart Rate</th>
                  <th>SpO2</th>
                  <th>Last Update</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>U-013</td>
                  <td>J.Doe</td>
                  <td><span className="chip">Healthy</span></td>
                  <td>76</td>
                  <td>98%</td>
                  <td>2m ago</td>
                </tr>
                <tr>
                  <td>U-021</td>
                  <td>A.Smith</td>
                  <td><span className="chip chip-risk-moderate">Warning</span></td>
                  <td>102</td>
                  <td>92%</td>
                  <td>1m ago</td>
                </tr>
              </tbody>
            </table>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <label className="chip">Status: All</label>
              <label className="chip">Unit: All</label>
            </div>
          </div>
          <div className="panel">
            <h2>Health Alerts</h2>
            <ul>
              <li><span className="chip chip-risk-high">CRITICAL</span> — U-021 SpO2 &lt; 90%</li>
              <li><span className="chip chip-risk-moderate">WARNING</span> — U-033 HR &gt; 110 BPM</li>
            </ul>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button className="btn btn-success">Acknowledge Selected</button>
              <button className="btn btn-warning">Create Alert</button>
            </div>
          </div>
        </div>

        {/* Right: Details + Vitals */}
        <div className="stack">
          <div className="panel">
            <h2>Personnel Details</h2>
            <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 8 }}>
              <span>Unit ID:</span>
              <strong>U-021</strong>
              <span>Name:</span>
              <strong>A.Smith</strong>
              <span>Rank:</span>
              <strong>Sgt</strong>
              <span>Position:</span>
              <strong>Sector 7B</strong>
            </div>
          </div>
          <div className="panel">
            <h2>Current Vital Signs</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="card">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Heart Rate (BPM)</span>
                  <strong>102</strong>
                </div>
                <div className="chip chip-risk-moderate" style={{ marginTop: 8 }}>Warning</div>
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
                  <span>Body Temp (°C)</span>
                  <strong>37.1</strong>
                </div>
                <div className="chip">Normal</div>
              </div>
              <div className="card">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Stress Index</span>
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