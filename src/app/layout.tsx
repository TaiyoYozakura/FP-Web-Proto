import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/contexts/AppContext';
import { Providers } from './providers';
import ClientLayout from './ClientLayout';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

export const metadata: Metadata = {
  title: {
    default: 'Satish Pradhan Dnyanasadhana College Alumni Portal',
    template: '%s | Satish Pradhan Dnyanasadhana College'
  },
  description: 'Official alumni portal of Satish Pradhan Dnyanasadhana College. Connect with 15,000+ alumni worldwide, explore career opportunities, attend events, and contribute to your alma mater.',
  keywords: ['Satish Pradhan Dnyanasadhana College', 'Dnyanasadhana College', 'alumni', 'networking', 'career services', 'education', 'Thane', 'Maharashtra'],
  authors: [{ name: 'Satish Pradhan Dnyanasadhana College' }],
  creator: 'Satish Pradhan Dnyanasadhana College',
  publisher: 'Satish Pradhan Dnyanasadhana College',
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
    siteName: 'Satish Pradhan Dnyanasadhana College Alumni Portal',
    title: 'Satish Pradhan Dnyanasadhana College Alumni Portal - Connect, Network, Give Back',
    description: 'Official alumni portal of Satish Pradhan Dnyanasadhana College. Connect with 15,000+ alumni worldwide.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Satish Pradhan Dnyanasadhana College Alumni Portal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Satish Pradhan Dnyanasadhana College Alumni Portal',
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://www.dnyanasadhanacollege.org" />
        <link rel="dns-prefetch" href="https://www.dnyanasadhanacollege.org" />
      </head>
      <body className="antialiased" suppressHydrationWarning={true}>
        <Providers>
          <AppProvider>
            <ClientLayout>{children}</ClientLayout>
          </AppProvider>
        </Providers>
      </body>
    </html>
  );
}