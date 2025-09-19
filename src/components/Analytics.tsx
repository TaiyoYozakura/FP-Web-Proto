'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Analytics tracking for production
export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page views
    if (typeof window !== 'undefined') {
      // Google Analytics 4 (replace with actual GA4 ID)
      if (window.gtag) {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: pathname,
        });
      }
      
      // Custom analytics tracking
      trackPageView(pathname);
    }
  }, [pathname]);

  const trackPageView = (path: string) => {
    // Custom analytics implementation
    const analytics = {
      page: path,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };
    
    // Send to analytics service (implement based on your needs)
    console.log('Page view tracked:', analytics);
  };

  return null;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}