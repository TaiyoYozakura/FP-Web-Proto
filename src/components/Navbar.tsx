'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import NotificationBell from './NotificationBell';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { state, dispatch } = useApp();
  const router = useRouter();

  // Close menus when clicking outside
  const handleClickOutside = () => {
    setShowUserMenu(false);
  };
  
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    router.push('/');
  };

  return (
    <>
      {/* Clean Top Bar */}
      <div className="bg-theme-primary text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center text-xs">
          <div className="flex items-center space-x-2 sm:space-x-6">
            <span className="hidden md:inline">Email: alumni@dnyanasadhana.edu.in</span>
            <span className="truncate">Phone: +91-22-2534-1191</span>
          </div>
          <div className="flex space-x-2">
            <Link href="/student-login" className="hover:text-white/80 transition-colors px-2 py-1 rounded hover-border text-xs">Student</Link>
            <Link href="/faculty-login" className="hover:text-white/80 transition-colors px-2 py-1 rounded hover-border text-xs">Faculty</Link>
          </div>
        </div>
      </div>
      
      {/* Professional Navigation */}
      <nav className="bg-theme-surface shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-3 sm:py-4 lg:py-6">
            {/* Clean Logo */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 rounded-lg p-1 lg:p-2 min-w-0">
              <Image src="https://www.dnyanasadhanacollege.org/images/logo/logo-final.png" alt="Dnyanasadhana College" width={32} height={32} className="sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-sm sm:text-lg lg:text-2xl font-bold text-theme-primary truncate">Dnyanasadhana College</h1>
                <p className="text-xs sm:text-sm text-theme-secondary font-medium">Alumni Portal</p>
              </div>
            </Link>
            
            {/* Clean Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              <Link href="/dashboard" className="text-theme-primary hover:text-theme-secondary font-medium transition-colors px-2 xl:px-3 py-2 rounded-lg hover-border text-sm xl:text-base">Dashboard</Link>
              <Link href="/directory" className="text-theme-primary hover:text-theme-secondary font-medium transition-colors px-2 xl:px-3 py-2 rounded-lg hover-border text-sm xl:text-base">Directory</Link>
              <Link href="/events" className="text-theme-primary hover:text-theme-secondary font-medium transition-colors px-2 xl:px-3 py-2 rounded-lg hover-border text-sm xl:text-base">Events</Link>
              <Link href="/jobs" className="text-theme-primary hover:text-theme-secondary font-medium transition-colors px-2 xl:px-3 py-2 rounded-lg hover-border text-sm xl:text-base">Careers</Link>
              <Link href="/news" className="text-theme-primary hover:text-theme-secondary font-medium transition-colors px-2 xl:px-3 py-2 rounded-lg hover-border text-sm xl:text-base">News</Link>
              
              <NotificationBell />
              
              <button className="p-2 text-theme-primary hover:text-theme-secondary transition-colors hover-border rounded-lg" title="Quick Search" suppressHydrationWarning={true}>
                <svg className="w-4 h-4 xl:w-5 xl:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {state.user ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-theme-primary hover:text-theme-secondary font-semibold transition-colors hover-border rounded-lg p-2"
                  >
                    <div className="w-7 h-7 xl:w-8 xl:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs xl:text-sm font-bold shadow-lg">
                      {state.user.firstName[0]}{state.user.lastName[0]}
                    </div>
                    <span className="text-sm xl:text-base">{state.user.firstName}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 xl:w-56 bg-theme-surface rounded-lg shadow-lg border border-theme py-2 z-50">
                      <div className="px-4 py-3 border-b border-theme">
                        <p className="text-sm font-medium text-theme-primary">{state.user.firstName} {state.user.lastName}</p>
                        <p className="text-xs text-theme-secondary truncate">{state.user.email}</p>
                      </div>
                      <Link href="/profile" className="flex items-center px-4 py-2 text-theme-primary hover:bg-theme-background text-sm" onClick={() => setShowUserMenu(false)}>
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Profile
                      </Link>
                      <Link href="/messaging" className="flex items-center px-4 py-2 text-theme-primary hover:bg-theme-background text-sm" onClick={() => setShowUserMenu(false)}>
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Messages
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">3</span>
                      </Link>
                      <Link href="/donation" className="flex items-center px-4 py-2 text-theme-primary hover:bg-theme-background text-sm" onClick={() => setShowUserMenu(false)}>
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Donations
                      </Link>
                      <hr className="my-2" />
                      <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="bg-theme-primary text-white px-4 xl:px-6 py-2 rounded-lg font-medium hover:bg-theme-primary/90 transition-colors text-sm xl:text-base">
                  Login
                </Link>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 lg:hidden">
              {!state.user && (
                <Link href="/login" className="bg-theme-primary text-white px-3 py-1 rounded text-sm font-medium">
                  Login
                </Link>
              )}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-theme-primary hover:text-theme-secondary rounded-lg hover-border"
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-theme py-3">
              <div className="flex flex-col space-y-1">
                <Link href="/dashboard" className="text-theme-primary hover:text-theme-secondary font-medium transition-colors px-4 py-2 rounded-lg hover-border" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                <Link href="/directory" className="text-theme-primary hover:text-theme-secondary font-medium transition-colors px-4 py-2 rounded-lg hover-border" onClick={() => setIsMenuOpen(false)}>Directory</Link>
                <Link href="/events" className="text-theme-primary hover:text-theme-secondary font-medium transition-colors px-4 py-2 rounded-lg hover-border" onClick={() => setIsMenuOpen(false)}>Events</Link>
                <Link href="/jobs" className="text-theme-primary hover:text-theme-secondary font-medium transition-colors px-4 py-2 rounded-lg hover-border" onClick={() => setIsMenuOpen(false)}>Careers</Link>
                <Link href="/news" className="text-theme-primary hover:text-theme-secondary font-medium transition-colors px-4 py-2 rounded-lg hover-border" onClick={() => setIsMenuOpen(false)}>News</Link>
                
                <div className="px-4 py-2">
                  <NotificationBell />
                </div>
                
                {state.user ? (
                  <>
                    <hr className="border-theme my-2" />
                    <div className="px-2 py-1">
                      <div className="flex items-center space-x-3 mb-3 px-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {state.user.firstName[0]}{state.user.lastName[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-theme-primary text-sm">{state.user.firstName} {state.user.lastName}</p>
                          <p className="text-xs text-theme-secondary">{state.user.email}</p>
                        </div>
                      </div>
                      <Link href="/profile" className="block text-theme-primary hover:text-theme-secondary py-2 px-2 rounded" onClick={() => setIsMenuOpen(false)}>My Profile</Link>
                      <Link href="/messaging" className="block text-theme-primary hover:text-theme-secondary py-2 px-2 rounded" onClick={() => setIsMenuOpen(false)}>Messages</Link>
                      <Link href="/donation" className="block text-theme-primary hover:text-theme-secondary py-2 px-2 rounded" onClick={() => setIsMenuOpen(false)}>Donations</Link>
                      <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block text-red-600 hover:text-red-800 py-2 px-2 w-full text-left rounded">Logout</button>
                    </div>
                  </>
                ) : (
                  <div className="px-4 py-2">
                    <Link href="/login" className="block bg-theme-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-theme-primary/90 transition-colors text-center" onClick={() => setIsMenuOpen(false)}>
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}