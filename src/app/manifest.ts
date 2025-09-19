import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dnyanasadhana College Alumni Portal',
    short_name: 'Alumni Portal',
    description: 'Official alumni portal of Dnyanasadhana College. Connect with 15,000+ alumni worldwide.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e3a8a',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['education', 'social', 'networking'],
    lang: 'en',
    orientation: 'portrait-primary',
  };
}