'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Search, Menu, X, User, MessageCircle, Heart, LogOut } from 'lucide-react';
import NotificationBell from './NotificationBell';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <>
      {/* Clean Top Bar */}
      <div className="bg-blue-600 text-white py-2">
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
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-3 sm:py-4 lg:py-6">
            {/* Clean Logo */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 rounded-lg p-1 lg:p-2 min-w-0">
              <Image src="https://www.dnyanasadhanacollege.org/images/logo/logo-final.png" alt="Dnyanasadhana College" width={32} height={32} className="sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-sm sm:text-base lg:text-xl font-bold text-blue-600">Dnyanasadhana College</h1>
                <p className="text-xs sm:text-sm text-purple-600 font-medium">Alumni Portal</p>
              </div>
            </Link>
            
            {/* Clean Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              <Link href="/dashboard" className="text-blue-600 hover:text-purple-600 font-medium transition-colors px-2 xl:px-3 py-2 rounded-lg hover-border text-sm xl:text-base">Dashboard</Link>
              <Link href="/directory" className="text-blue-600 hover:text-purple-600 font-medium transition-colors px-2 xl:px-3 py-2 rounded-lg hover-border text-sm xl:text-base">Directory</Link>
              <Link href="/events" className="text-blue-600 hover:text-purple-600 font-medium transition-colors px-2 xl:px-3 py-2 rounded-lg hover-border text-sm xl:text-base">Events</Link>
              <Link href="/jobs" className="text-blue-600 hover:text-purple-600 font-medium transition-colors px-2 xl:px-3 py-2 rounded-lg hover-border text-sm xl:text-base">Careers</Link>
              <Link href="/news" className="text-blue-600 hover:text-purple-600 font-medium transition-colors px-2 xl:px-3 py-2 rounded-lg hover-border text-sm xl:text-base">News</Link>
              
              <div className="relative z-40">
                <NotificationBell />
              </div>
              
              {session?.user ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-theme-primary hover:text-theme-secondary font-semibold transition-colors hover-border rounded-lg p-2"
                  >
                    <div className="w-7 h-7 xl:w-8 xl:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs xl:text-sm font-bold shadow-lg">
                      {session.user.name?.[0] || 'U'}
                    </div>
                    <span className="text-sm xl:text-base">{session.user.name?.split(' ')[0]}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 xl:w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-[9999]">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-blue-600">{session.user.name}</p>
                        <p className="text-xs text-gray-600 truncate">{session.user.email}</p>
                      </div>
                      <Link href="/profile" className="flex items-center px-4 py-2 text-blue-600 hover:bg-gray-50 text-sm" onClick={() => setShowUserMenu(false)}>
                        <User className="w-4 h-4 mr-3" />
                        My Profile
                      </Link>
                      <Link href="/messaging" className="flex items-center px-4 py-2 text-blue-600 hover:bg-gray-50 text-sm" onClick={() => setShowUserMenu(false)}>
                        <MessageCircle className="w-4 h-4 mr-3" />
                        Messages
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">3</span>
                      </Link>
                      <Link href="/donation" className="flex items-center px-4 py-2 text-blue-600 hover:bg-gray-50 text-sm" onClick={() => setShowUserMenu(false)}>
                        <Heart className="w-4 h-4 mr-3" />
                        Donations
                      </Link>
                      <hr className="my-2" />
                      <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm">
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="bg-blue-600 text-white px-4 xl:px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm xl:text-base">
                  Login
                </Link>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 lg:hidden">
              {!session?.user && (
                <Link href="/login" className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700 transition-colors">
                  Login
                </Link>
              )}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-theme-primary hover:text-theme-secondary rounded-lg hover-border"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                
                {session?.user ? (
                  <>
                    <hr className="border-theme my-2" />
                    <div className="px-2 py-1">
                      <div className="flex items-center space-x-3 mb-3 px-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {session.user.name?.[0] || 'U'}
                        </div>
                        <div>
                          <p className="font-semibold text-blue-600 text-sm">{session.user.name}</p>
                          <p className="text-xs text-gray-600">{session.user.email}</p>
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