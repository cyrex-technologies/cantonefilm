import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Preloader from '@/components/ui/Preloader';

export const metadata: Metadata = {
  metadataBase: new URL('https://cantonefilms.com'),
  title: "Cantone Films | Creating Stories That Last",
  description:
    "Cantone Films is a story-driven production company creating impactful visual narratives.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z6WEG04P9L"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-Z6WEG04P9L');`}
        </Script>
      </head>
      <body className="font-sans bg-cream text-black">
        <Preloader />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
