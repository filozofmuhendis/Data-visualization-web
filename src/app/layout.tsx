import type { Metadata } from "next";
import "./globals.css";
import TopBar from "../components/TopBar";
import AlertBar from "@/components/AlertBar";

export const metadata: Metadata = {
  title: "MSA Gösterge Paneli",
  description: "Qt arayüzünün statik Next.js yeniden yapımı"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <TopBar />
        <AlertBar />
        <main id="main-content" className="container">{children}</main>
      </body>
    </html>
  );
}