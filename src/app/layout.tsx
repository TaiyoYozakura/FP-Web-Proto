import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/contexts/AppContext';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

export const metadata: Metadata = {
  title: {
    default: 'Dnyanasadhana College Alumni Portal',
    template: '%s | Dnyanasadhana College Alumni Portal'
  },
  description: 'Official alumni portal of Dnyanasadhana College. Connect with 15,000+ alumni worldwide, explore career opportunities, attend events, and contribute to your alma mater.',
  keywords: ['Dnyanasadhana College', 'alumni', 'networking', 'career services', 'education', 'Thane', 'Maharashtra'],
  authors: [{ name: 'Dnyanasadhana College' }],
  creator: 'Dnyanasadhana College',
  publisher: 'Dnyanasadhana College',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://alumni.dnyanasadhana.edu.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alumni.dnyanasadhana.edu.in',
    siteName: 'Dnyanasadhana College Alumni Portal',
    title: 'Dnyanasadhana College Alumni Portal - Connect, Network, Give Back',
    description: 'Official alumni portal of Dnyanasadhana College. Connect with 15,000+ alumni worldwide.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dnyanasadhana College Alumni Portal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dnyanasadhana College Alumni Portal',
    description: 'Connect with 15,000+ alumni worldwide. Explore career opportunities and give back to your alma mater.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1e3a8a' },
    { media: '(prefers-color-scheme: dark)', color: '#1e3a8a' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="preconnect" href="https://www.dnyanasadhanacollege.org" />
        <link rel="dns-prefetch" href="https://www.dnyanasadhanacollege.org" />
      </head>
      <body className="antialiased" suppressHydrationWarning={true}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}