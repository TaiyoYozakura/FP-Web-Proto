import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/contexts/AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Satish Pradhan Dnyanasadhana College Alumni Portal",
  description: "Connect with fellow alumni from Satish Pradhan Dnyanasadhana College Thane. Network, grow, and give back to your alma mater.",
  keywords: "Satish Pradhan Dnyanasadhana College, Alumni, Thane, Maharashtra, Network, Education, Commerce, Arts, Science",
  authors: [{ name: "Satish Pradhan Dnyanasadhana College" }],
  robots: "index, follow",
  openGraph: {
    title: "Satish Pradhan Dnyanasadhana College Alumni Portal",
    description: "Connect with fellow alumni from Satish Pradhan Dnyanasadhana College Thane",
    type: "website",
    locale: "en_US",
    siteName: "Satish Pradhan Dnyanasadhana Alumni Portal"
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
        <link rel="icon" href="https://www.dnyanasadhanacollege.org/images/logo/logo-final.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning={true}>
        <AppProvider>
          <div id="root">
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  );
}