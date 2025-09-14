import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/contexts/AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "St Andrews College Alumni Portal",
  description: "Connect with fellow alumni from St Andrews College Bandra West. Network, grow, and give back to your alma mater.",
  keywords: "St Andrews College, Alumni, Bandra West, Mumbai, Network, Education",
  authors: [{ name: "St Andrews College" }],
  robots: "index, follow",
  openGraph: {
    title: "St Andrews College Alumni Portal",
    description: "Connect with fellow alumni from St Andrews College Bandra West",
    type: "website",
    locale: "en_US",
    siteName: "St Andrews Alumni Portal"
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/SAC-LOGO.webp" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AppProvider>
          <div id="root">
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  );
}