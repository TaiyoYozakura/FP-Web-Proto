'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import NavbarMobile from '@/components/Navbar_mobile';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {isMobile ? <NavbarMobile /> : <Navbar />}
      {children}
    </>
  );
}
