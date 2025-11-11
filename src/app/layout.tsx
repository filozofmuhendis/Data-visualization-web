import type { Metadata } from "next";
import "./globals.css";
import TopBar from "../components/TopBar";

export const metadata: Metadata = {
  title: "MSA Gösterge Paneli",
  description: "Qt arayüzünün statik Next.js yeniden yapımı"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <TopBar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}