import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container" style={{ padding: 16 }}>
      <div className="panel">
        <h2>Sayfa bulunamadı</h2>
        <p className="muted">İstediğiniz sayfa mevcut değil veya taşınmış olabilir.</p>
        <Link className="btn btn-primary" href="/">Ana sayfaya dön</Link>
      </div>
    </div>
  );
}