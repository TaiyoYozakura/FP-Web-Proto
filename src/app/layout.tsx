import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "St Andrews College Alumni Portal",
  description: "Connect with fellow alumni from St Andrews College Bandra West. Network, grow, and give back to your alma mater.",
  keywords: "St Andrews College, Alumni, Bandra West, Mumbai, Network, Education",
  authors: [{ name: "St Andrews College" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "St Andrews College Alumni Portal",
    description: "Connect with fellow alumni from St Andrews College Bandra West",
    type: "website",
    locale: "en_US",
    siteName: "St Andrews Alumni Portal"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/SAC-header.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}