import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Footer from "@/components/layout/Footer";
import FloatingFaq from "@/components/layout/FloatingFaq";
import Header from "@/components/layout/Header";
import MainShell from "@/components/layout/MainShell";
import PublicViewportFit from "@/components/layout/PublicViewportFit";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://weborang.local"),
  title: {
    default: "PT Sulis Altha Abadi",
    template: "%s | PT Sulis Altha Abadi",
  },
  description:
    "PT Sulis Altha Abadi menghadirkan solusi ekspor rempah, konstruksi barang dan jasa, serta telekomunikasi dengan integritas, kualitas, dan komitmen.",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  other: {
    "google-adsense-account": "ca-pub-8957974802215246",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8957974802215246"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Header />
        <PublicViewportFit>
          <MainShell>{children}</MainShell>
          <Footer />
        </PublicViewportFit>
        <FloatingFaq />
      </body>
    </html>
  );
}
