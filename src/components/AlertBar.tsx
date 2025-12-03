export default function AlertBar() {
  return (
    <div className="container" style={{ padding: 8 }}>
      <div className="panel" role="status" aria-live="polite" style={{ borderLeft: "4px solid #e11d48" }}>
        <strong>Kritik Uyarı:</strong> Demo verileri gösteriliyor. Operasyonel kullanım için entegrasyon gerekli.
      </div>
    </div>
  );
}