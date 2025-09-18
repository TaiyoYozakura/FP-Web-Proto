import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/contexts/AppContext";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dnyanasadhana College Alumni Portal",
  description: "Connect with fellow alumni from Dnyanasadhana College Thane. Network, grow, and give back to your alma mater.",
  keywords: "Dnyanasadhana College, Alumni, Thane, Maharashtra, Network, Education, Commerce, Arts, Science",
  authors: [{ name: "Dnyanasadhana College" }],
  robots: "index, follow",
  openGraph: {
    title: "Dnyanasadhana College Alumni Portal",
    description: "Connect with fellow alumni from Dnyanasadhana College Thane",
    type: "website",
    locale: "en_US",
    siteName: "Dnyanasadhana Alumni Portal"
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
          <ThemeProvider>
            <div id="root">
              {children}
            </div>
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}