'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { state, dispatch } = useApp();
  const router = useRouter();
  
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    router.push('/');
  };

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
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/dashboard" className="text-blue-900 hover:text-red-600 font-semibold transition-colors">Dashboard</Link>
              <Link href="/directory" className="text-blue-900 hover:text-red-600 font-semibold transition-colors">Directory</Link>
              <Link href="/events" className="text-blue-900 hover:text-red-600 font-semibold transition-colors">Events</Link>
              <Link href="/jobs" className="text-blue-900 hover:text-red-600 font-semibold transition-colors">Jobs</Link>
              <Link href="/news" className="text-blue-900 hover:text-red-600 font-semibold transition-colors">News</Link>
              
              {state.user && (
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-blue-900 hover:text-red-600 font-semibold transition-colors"
                  >
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {state.user.firstName[0]}{state.user.lastName[0]}
                    </div>
                    <span>{state.user.firstName}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50" onClick={() => setShowUserMenu(false)}>My Profile</Link>
                      <Link href="/messaging" className="block px-4 py-2 text-gray-700 hover:bg-gray-50" onClick={() => setShowUserMenu(false)}>Messages</Link>
                      <Link href="/donation" className="block px-4 py-2 text-gray-700 hover:bg-gray-50" onClick={() => setShowUserMenu(false)}>Donations</Link>
                      <hr className="my-2" />
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50">Logout</button>
                    </div>
                  )}
                </div>
              )}
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
                
                {state.user && (
                  <>
                    <hr className="border-gray-200" />
                    <div className="px-2 py-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {state.user.firstName[0]}{state.user.lastName[0]}
                        </div>
                        <span className="font-semibold text-blue-900">{state.user.firstName} {state.user.lastName}</span>
                      </div>
                      <Link href="/profile" className="block text-gray-600 hover:text-red-600 py-1" onClick={() => setIsMenuOpen(false)}>My Profile</Link>
                      <Link href="/messaging" className="block text-gray-600 hover:text-red-600 py-1" onClick={() => setIsMenuOpen(false)}>Messages</Link>
                      <Link href="/donation" className="block text-gray-600 hover:text-red-600 py-1" onClick={() => setIsMenuOpen(false)}>Donations</Link>
                      <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block text-red-600 hover:text-red-800 py-1 w-full text-left">Logout</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}