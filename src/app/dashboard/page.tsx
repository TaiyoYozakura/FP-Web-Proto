'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useApp } from '@/contexts/AppContext';

export default function DashboardPage() {
  const { state } = useApp();
  const router = useRouter();
  
  useEffect(() => {
    if (!state.user) {
      router.push('/login');
    }
  }, [state.user, router]);
  
  if (!state.user) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
    </div>;
  }
  
  const profileCompletion = Math.round((
    (state.user.firstName ? 1 : 0) +
    (state.user.lastName ? 1 : 0) +
    (state.user.email ? 1 : 0) +
    (state.user.phone ? 1 : 0) +
    (state.user.position ? 1 : 0) +
    (state.user.company ? 1 : 0) +
    (state.user.location ? 1 : 0) +
    (state.user.bio ? 1 : 0)
  ) / 8 * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="lg:w-64 space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
              <h3 className="font-bold text-blue-900 mb-4 text-sm lg:text-base">Quick Links</h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                {[
                  { name: 'My Profile', href: '/profile' },
                  { name: 'My Connections', href: '/connections' },
                  { name: 'My Events', href: '/my-events' },
                  { name: 'Job Applications', href: '/applications' },
                  { name: 'Settings', href: '/settings' }
                ].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block p-2 lg:p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm lg:text-base text-center lg:text-left"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-6 lg:mb-8">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-900 mb-2">Welcome back, {state.user.firstName} {state.user.lastName}!</h1>
              <p className="text-gray-600 text-sm lg:text-base">Here's what's happening in your alumni network</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
              <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm font-semibold text-gray-600">Profile Completion</p>
                    <p className="text-2xl lg:text-3xl font-bold text-blue-900">{profileCompletion}%</p>
                    <Link href="/profile" className="text-red-600 hover:text-red-800 text-xs lg:text-sm font-semibold">
                      Complete profile →
                    </Link>
                  </div>
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="text-blue-600 text-xl lg:text-2xl">👤</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm font-semibold text-gray-600">Connections</p>
                    <p className="text-2xl lg:text-3xl font-bold text-blue-900">{state.alumni.length - 1}</p>
                    <Link href="/directory" className="text-red-600 hover:text-red-800 text-xs lg:text-sm font-semibold">
                      View all →
                    </Link>
                  </div>
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="text-blue-600 text-xl lg:text-2xl">👥</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm font-semibold text-gray-600">Upcoming Events</p>
                    <p className="text-2xl lg:text-3xl font-bold text-blue-900">{state.events.length}</p>
                    <Link href="/events" className="text-red-600 hover:text-red-800 text-xs lg:text-sm font-semibold">
                      View calendar →
                    </Link>
                  </div>
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="text-blue-600 text-xl lg:text-2xl">📅</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
              <h2 className="text-lg lg:text-xl font-bold text-blue-900 mb-4 lg:mb-6">Recent Activity</h2>
              <div className="space-y-3 lg:space-y-4">
                {[
                  { type: 'event', title: 'New Event: Annual Alumni Meet 2024', time: '2 hours ago', icon: '🎉' },
                  { type: 'job', title: 'Job Posted: Software Engineer at Tech Corp', time: '5 hours ago', icon: '💼' },
                  { type: 'news', title: 'News: College ranks #1 in Innovation', time: '1 day ago', icon: '📰' },
                  { type: 'connection', title: 'Sarah Johnson wants to connect', time: '2 days ago', icon: '👋' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-full flex items-center justify-center text-lg lg:text-xl flex-shrink-0">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-blue-900 text-sm lg:text-base truncate">{activity.title}</p>
                      <p className="text-xs lg:text-sm text-gray-600">{activity.time}</p>
                    </div>
                    <button className="text-red-600 hover:text-red-800 font-semibold text-sm lg:text-base flex-shrink-0">View</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}