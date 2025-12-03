import Link from "next/link";
import AdminPanel from "@/components/AdminPanel";
import StatCard from "@/components/StatCard";

export default function HomePage() {
  return (
    <section>
      <h1>Alethiea Veri Takip Paneli</h1>
      <AdminPanel />
      <div className="grid" style={{ marginBottom: 12 }}>
        <>
          <StatCard title="Birimler" value={12} trendLabel="+2 bugün" />
          <StatCard title="Uyarılar" value={2} trendLabel="-1 bugün" />
          <StatCard title="Sağlık Uyarıları" value={1} trendLabel="0 bugün" />
        </>
      </div>
      <ul className="grid">
        <li className="card">
          <h3>Komutan Panosu</h3>
          <p className="muted">Operasyon durumu ve birim görünümü.</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "8px 0" }}>
            <span className="chip">Birimler: 4</span>
            <span className="chip">Uyarılar: 2</span>
            <span className="chip">Durum: Operasyonel</span>
          </div>
          <Link className="btn btn-primary" href="/commander">Aç</Link>
        </li>

        <li className="card">
          <h3>Analist Panosu</h3>
          <p className="muted">Veri trendleri ve hedef analizi.</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "8px 0" }}>
            <span className="chip">Veri Noktaları: 1.2K</span>
            <span className="chip">Trendler: 3</span>
            <span className="chip">Model: Hazır</span>
          </div>
          <Link className="btn btn-primary" href="/analyst">Aç</Link>
        </li>

        <li className="card">
          <h3>Sağlık Panosu</h3>
          <p className="muted">Birlik sağlık durumu ve uyarılar.</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "8px 0" }}>
            <span className="chip">Uyarılar: 1</span>
            <span className="chip">Durum: İzleniyor</span>
          </div>
          <p className="muted">Son kontrol: 10 dk önce</p>
          <Link className="btn btn-primary" href="/health">Aç</Link>
        </li>

        
      </ul>
    </section>
  );
}