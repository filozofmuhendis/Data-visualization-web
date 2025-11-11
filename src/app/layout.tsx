import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MSA Dashboard",
  description: "Qt arayüzünün statik Next.js yeniden yapımı"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <header className="navbar">
          <div className="brand">MSA Dashboard</div>
          <nav>
            <a href="/" className="nav-link">Ana Sayfa</a>
            <a href="/login" className="nav-link">Login</a>
            <a href="/analyst" className="nav-link">Analyst</a>
            <a href="/commander" className="nav-link">Commander</a>
            <a href="/health" className="nav-link">Health</a>
          </nav>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}