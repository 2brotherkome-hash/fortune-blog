import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "星知恵 | 当たる占い・星座占い完全ガイド",
    template: "%s | 星知恵",
  },
  description:
    "星座占い・恋愛占い・金運・スピリチュアルの情報をお届け。12星座別の運勢や相性、おすすめ占いサービスが見つかる。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "星知恵",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0f0a1a] font-[family-name:var(--font-noto-sans-jp)]">
        <Header />
        <div className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            <main className="flex-1 min-w-0">{children}</main>
            <Sidebar />
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
