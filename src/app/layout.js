import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/layout/Footer";
import FloatingFaq from "@/components/layout/FloatingFaq";
import Header from "@/components/layout/Header";
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
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <PublicViewportFit>
          <Header />
          <main>{children}</main>
          <Footer />
        </PublicViewportFit>
        <FloatingFaq />
      </body>
    </html>
  );
}
