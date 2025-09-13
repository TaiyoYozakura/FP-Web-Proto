'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2 px-4 text-xs sm:text-sm">
        <div className="container mx-auto flex flex-col sm:flex-row sm:justify-between items-center">
          <span className="mb-2 sm:mb-0">📧 alumni@standrewscollege.ac.in | 📞 +91 22 2640 0348</span>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-yellow-300">Student Portal</Link>
            <Link href="#" className="hover:text-yellow-300">Faculty Portal</Link>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <nav className="bg-white shadow-md border-b-4 border-blue-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-4">
              <Image src="/SAC-LOGO.webp" alt="St Andrews College" width={60} height={60} className="sm:w-20 sm:h-20" />
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-blue-900">ST. ANDREWS COLLEGE</h1>
                <p className="text-xs sm:text-sm text-gray-600">BANDRA (WEST), MUMBAI</p>
                <p className="text-xs text-red-600 font-semibold">ALUMNI PORTAL</p>
              </div>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8">
              <Link href="/dashboard" className="text-blue-900 hover:text-red-600 font-semibold transition-colors">Dashboard</Link>
              <Link href="/directory" className="text-blue-900 hover:text-red-600 font-semibold transition-colors">Directory</Link>
              <Link href="/events" className="text-blue-900 hover:text-red-600 font-semibold transition-colors">Events</Link>
              <Link href="/jobs" className="text-blue-900 hover:text-red-600 font-semibold transition-colors">Jobs</Link>
              <Link href="/news" className="text-blue-900 hover:text-red-600 font-semibold transition-colors">News</Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-blue-900 hover:text-red-600"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <Link href="/dashboard" className="text-blue-900 hover:text-red-600 font-semibold transition-colors px-2 py-1" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                <Link href="/directory" className="text-blue-900 hover:text-red-600 font-semibold transition-colors px-2 py-1" onClick={() => setIsMenuOpen(false)}>Directory</Link>
                <Link href="/events" className="text-blue-900 hover:text-red-600 font-semibold transition-colors px-2 py-1" onClick={() => setIsMenuOpen(false)}>Events</Link>
                <Link href="/jobs" className="text-blue-900 hover:text-red-600 font-semibold transition-colors px-2 py-1" onClick={() => setIsMenuOpen(false)}>Jobs</Link>
                <Link href="/news" className="text-blue-900 hover:text-red-600 font-semibold transition-colors px-2 py-1" onClick={() => setIsMenuOpen(false)}>News</Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}