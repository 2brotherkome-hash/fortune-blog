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

// サイト名は「星知恵」のまま運用中。「宿曜ラボ」への変更はユーザーの判断に委ねる。
export const metadata: Metadata = {
  title: {
    default: "星知恵 | 宿曜占星術・無料診断サイト",
    template: "%s | 星知恵",
  },
  description:
    "生年月日から宿曜占星術であなたの宿（しゅく）を無料診断。空海が伝えた1200年の星の学問で、性格・運勢・恋愛・相性をお届け。",
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
      <body className="min-h-full flex flex-col bg-[#f5f0ff] font-[family-name:var(--font-noto-sans-jp)]">
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
