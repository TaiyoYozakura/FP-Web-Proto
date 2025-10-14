'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { User, MessageCircle, Heart, LogOut } from 'lucide-react';
import NotificationBell from './NotificationBell';

export default function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  
  const logout = async () => { await signOut({ redirect: false }); router.push('/'); };

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/directory', label: 'Directory' },
    { href: '/events', label: 'Events' },
    { href: '/jobs', label: 'Careers' },
    { href: '/news', label: 'News' }
  ];

  const userItems = [
    { href: '/profile', icon: User, label: 'Profile' },
    { href: '/messaging', icon: MessageCircle, label: 'Messages', badge: '3' },
    { href: '/donation', icon: Heart, label: 'Donations' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image src="https://www.dnyanasadhanacollege.org/images/logo/logo-final.png" alt="Logo" width={40} height={40} className="sm:w-12 sm:h-12" />
          <div>
            <h1 className="text-sm sm:text-base lg:text-lg font-bold text-blue-600 leading-tight">Satish Pradhan Dnyanasadhana</h1>
            <p className="text-[10px] sm:text-xs text-purple-600 font-medium">Alumni Portal</p>
          </div>
        </Link>
        
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className="text-blue-600 hover:text-purple-600 font-medium transition-colors text-sm xl:text-base">
              {item.label}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <div className="hidden sm:block"><NotificationBell /></div>
          {session?.user ? (
            <div className="relative">
              <button onClick={() => setShowUserMenu(!showUserMenu)} className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold hover:scale-105 transition-transform text-sm sm:text-base">
                {session.user.name?.[0] || 'U'}
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-[9999]">
                  <div className="px-4 py-3 border-b">
                    <p className="font-medium text-blue-600 text-sm">{session.user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                  </div>
                  {userItems.map(item => (
                    <Link key={item.href} href={item.href} onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700 text-sm">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      {item.badge && <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{item.badge}</span>}
                    </Link>
                  ))}
                  <hr className="my-2" />
                  <button onClick={logout} className="flex items-center gap-3 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 text-sm">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition-all text-sm sm:text-base">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
