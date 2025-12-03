"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopBar() {
  return (
    <header className="topbar" role="banner">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "grid", gap: 4 }}>
          <h1 className="title" style={{ fontSize: 18, margin: 0 }}>Alethiea Veri Takip Paneli</h1>
          <nav aria-label="Ana gezinme">
            <Link href="/" className="nav-link">Admin Paneli</Link> 
            <Link href="/analyst" className="nav-link">Analist</Link> 
            <Link href="/commander" className="nav-link">Komutan</Link> 
            <Link href="/health" className="nav-link">Sağlık</Link>
          </nav>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }} aria-label="Durum">
            <span className="chip">Sistem: Operasyonel</span>
            <span className="chip">Uyarılar: 2</span>
          </div>
        </div>
        <div className="topbar-actions" aria-label="Hızlı işlemler" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input className="input" type="search" aria-label="Arama" placeholder="Ara..." />
          <button className="btn" type="button">Ayarlar</button>
          <button className="btn btn-primary" type="button">Yenile</button>
        </div>
      </div>
    </header>
  );
}