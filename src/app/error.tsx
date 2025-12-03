"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container" style={{ padding: 16 }}>
      <div className="panel">
        <h2>Bir hata oluştu</h2>
        <p className="muted">{error.message}</p>
        <button className="btn btn-primary" onClick={reset}>Tekrar dene</button>
      </div>
    </div>
  );
}