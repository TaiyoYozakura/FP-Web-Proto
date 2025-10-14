'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, User, MessageCircle, Heart, LogOut, Home, Users, Calendar, Briefcase, Newspaper } from 'lucide-react';
import NotificationBell from './NotificationBell';

const NavLink = ({ href, icon: Icon, label, onClick, badge }: any) => (
  <Link href={href} onClick={onClick} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all active:scale-95">
    <Icon className="w-5 h-5" />
    <span className="font-medium">{label}</span>
    {badge && <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{badge}</span>}
  </Link>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  
  const close = () => setOpen(false);
  const logout = async () => { await signOut({ redirect: false }); router.push('/'); };

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [open]);

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/directory', icon: Users, label: 'Directory' },
    { href: '/events', icon: Calendar, label: 'Events' },
    { href: '/jobs', icon: Briefcase, label: 'Careers' },
    { href: '/news', icon: Newspaper, label: 'News' }
  ];

  const userItems = [
    { href: '/profile', icon: User, label: 'Profile' },
    { href: '/messaging', icon: MessageCircle, label: 'Messages', badge: '3' },
    { href: '/donation', icon: Heart, label: 'Donations' }
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100 active:scale-95 transition-all">
            <Menu className="w-6 h-6 text-blue-600" />
          </button>
          
          <Link href="/" className="flex items-center gap-2 flex-1 justify-center lg:justify-start lg:flex-none">
            <Image src="https://www.dnyanasadhanacollege.org/images/logo/logo-final.png" alt="Logo" width={40} height={40} />
            <div className="hidden sm:block">
              <h1 className="text-base font-bold text-blue-600 leading-tight">Dnyanasadhana</h1>
              <p className="text-xs text-purple-600 font-medium">Alumni Portal</p>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {navItems.map(item => (
              <Link key={item.href} href={item.href} className="text-blue-600 hover:text-purple-600 font-medium transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="hidden lg:block"><NotificationBell /></div>
            {session?.user ? (
              <div className="relative hidden lg:block">
                <button onClick={() => setShowMenu(!showMenu)} className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold hover:scale-105 transition-transform">
                  {session.user.name?.[0] || 'U'}
                </button>
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-[9999]">
                    <div className="px-4 py-3 border-b">
                      <p className="font-medium text-blue-600 text-sm">{session.user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                    </div>
                    {userItems.map(item => (
                      <Link key={item.href} href={item.href} onClick={() => setShowMenu(false)} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700">
                        <item.icon className="w-4 h-4" />
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    ))}
                    <hr className="my-2" />
                    <button onClick={logout} className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50">
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 active:scale-95 transition-all text-sm">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {open && <div className="fixed inset-0 bg-black/60 z-[60] lg:hidden backdrop-blur-sm" onClick={close} />}

      <div className={`fixed top-0 left-0 h-full w-80 bg-white z-[70] transform transition-transform duration-300 lg:hidden shadow-2xl ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Image src="https://www.dnyanasadhanacollege.org/images/logo/logo-final.png" alt="Logo" width={48} height={48} className="drop-shadow-lg" />
                <div className="text-white">
                  <h2 className="font-bold text-lg">Dnyanasadhana</h2>
                  <p className="text-xs opacity-90">Alumni Portal</p>
                </div>
              </div>
              <button onClick={close} className="p-2 rounded-xl hover:bg-white/20 active:scale-95 transition-all">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            {session?.user && (
              <div className="bg-white/15 rounded-xl p-3 backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 text-lg font-bold shadow-lg">
                    {session.user.name?.[0] || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">{session.user.name}</p>
                    <p className="text-xs text-white/80 truncate">{session.user.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-1">
              {navItems.map(item => <NavLink key={item.href} {...item} onClick={close} />)}
              <div className="px-4 py-3"><NotificationBell /></div>
            </div>
            {session?.user && (
              <>
                <div className="border-t my-4" />
                <div className="space-y-1">
                  {userItems.map(item => <NavLink key={item.href} {...item} onClick={close} />)}
                </div>
              </>
            )}
          </div>
          
          <div className="border-t p-4">
            {session?.user ? (
              <button onClick={() => { logout(); close(); }} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 active:scale-95 transition-all font-medium">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            ) : (
              <Link href="/login" onClick={close} className="flex items-center justify-center w-full px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all font-medium">
                Login to Continue
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}