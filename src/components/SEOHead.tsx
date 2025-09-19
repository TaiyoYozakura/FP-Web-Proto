import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

export default function SEOHead({
  title = "Dnyanasadhana College Alumni Portal - Connect, Network, Give Back",
  description = "Official alumni portal of Dnyanasadhana College. Connect with 15,000+ alumni worldwide, explore career opportunities, attend events, and contribute to your alma mater.",
  keywords = "Dnyanasadhana College, alumni, networking, career services, education, Thane, Maharashtra, graduates",
  ogImage = "/og-image.jpg",
  canonical
}: SEOHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Dnyanasadhana College Alumni Portal" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://www.dnyanasadhanacollege.org" />
      <link rel="dns-prefetch" href="https://www.dnyanasadhanacollege.org" />
    </Head>
  );
}