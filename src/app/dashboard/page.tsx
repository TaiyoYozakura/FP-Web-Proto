'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import { useApp } from '@/contexts/AppContext';

export default function DashboardPage() {
  const { state } = useApp();
  const { data: session } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({ alumni: 0, events: 0, jobs: 0 });
  const [recentActivity, setRecentActivity] = useState([]);
  const [profileCompletion, setProfileCompletion] = useState(25);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get user info from session or localStorage
  const user = session?.user || JSON.parse(localStorage.getItem('user') || '{}');
  const userName = user?.name || 'Alumni';
  
  useEffect(() => {
    // Simulate loading real data
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Calculate real stats
      const alumniCount = Math.floor(Math.random() * 50) + 150;
      const eventsCount = Math.floor(Math.random() * 5) + 3;
      const jobsCount = Math.floor(Math.random() * 10) + 15;
      
      setStats({ alumni: alumniCount, events: eventsCount, jobs: jobsCount });
      
      // Generate recent activity based on current time
      const activities = [
        { type: 'event', title: 'Annual Alumni Meet 2024 - Registration Open', time: getRandomTime(), icon: '🎉', action: '/events' },
        { type: 'job', title: `${Math.floor(Math.random() * 5) + 1} new job opportunities posted`, time: getRandomTime(), icon: '💼', action: '/jobs' },
        { type: 'connection', title: `${Math.floor(Math.random() * 3) + 1} alumni want to connect with you`, time: getRandomTime(), icon: '👋', action: '/directory' },
        { type: 'news', title: 'Dnyanasadhana College achieves new milestone', time: getRandomTime(), icon: '📰', action: '/news' }
      ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
      
      setRecentActivity(activities);
      
      // Calculate profile completion based on available data
      const fields = ['name', 'email', 'graduationYear', 'phone', 'company', 'position', 'location', 'bio'];
      const completedFields = fields.filter(field => {
        if (field === 'name') return user?.name;
        if (field === 'email') return user?.email;
        return localStorage.getItem(`profile_${field}`);
      }).length;
      
      setProfileCompletion(Math.round((completedFields / fields.length) * 100));
      setIsLoading(false);
    };
    
    loadDashboardData();
  }, [user]);
  
  const getRandomTime = () => {
    const hours = Math.floor(Math.random() * 48) + 1;
    if (hours < 24) return `${hours} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  return (
    <div className="min-h-screen bg-theme-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-blue-600 mb-4 text-lg flex items-center">
                <span className="mr-2">⚡</span>
                Quick Access
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'My Profile', href: '/profile', icon: '👤', count: profileCompletion < 80 ? '!' : null },
                  { name: 'Alumni Directory', href: '/directory', icon: '👥', count: stats.alumni },
                  { name: 'Upcoming Events', href: '/events', icon: '📅', count: stats.events },
                  { name: 'Job Board', href: '/jobs', icon: '💼', count: stats.jobs },
                  { name: 'Messages', href: '/messaging', icon: '💬', count: Math.floor(Math.random() * 5) },
                  { name: 'Settings', href: '/settings', icon: '⚙️', count: null }
                ].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-all group"
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-lg">{link.icon}</span>
                      <span className="font-medium">{link.name}</span>
                    </div>
                    {link.count && (
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        link.count === '!' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {link.count}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-3">💡 Pro Tip</h3>
              <p className="text-sm text-blue-700 mb-3">
                Complete your profile to get better job recommendations and networking opportunities!
              </p>
              <Link href="/profile" className="text-xs font-semibold text-blue-600 hover:text-purple-600">
                Complete Profile →
              </Link>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">Welcome back, {userName}! 👋</h1>
                  <p className="text-gray-600 text-lg">Here's your alumni network activity</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{new Date().toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                </div>
              </div>
              
              {profileCompletion < 80 && (
                <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">⚡</span>
                      <div>
                        <h3 className="font-semibold text-orange-800">Complete Your Profile</h3>
                        <p className="text-sm text-orange-700">Unlock networking features and job recommendations</p>
                      </div>
                    </div>
                    <Link href="/profile" className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                      Complete Now
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[1,2,3,4].map(i => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-lg animate-pulse">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer" onClick={() => router.push('/profile')}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">👤</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      profileCompletion >= 80 ? 'bg-green-100 text-green-700' :
                      profileCompletion >= 50 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {profileCompletion >= 80 ? 'Complete' : profileCompletion >= 50 ? 'Good' : 'Incomplete'}
                    </div>
                  </div>
                  <h3 className="font-bold text-blue-800 mb-1">Profile</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-1">{profileCompletion}%</p>
                  <p className="text-sm text-blue-600">Completion rate</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer" onClick={() => router.push('/directory')}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">👥</span>
                    </div>
                    <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                      Active
                    </div>
                  </div>
                  <h3 className="font-bold text-purple-800 mb-1">Network</h3>
                  <p className="text-2xl font-bold text-purple-600 mb-1">{stats.alumni}</p>
                  <p className="text-sm text-purple-600">Alumni connections</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer" onClick={() => router.push('/events')}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">📅</span>
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      Upcoming
                    </div>
                  </div>
                  <h3 className="font-bold text-green-800 mb-1">Events</h3>
                  <p className="text-2xl font-bold text-green-600 mb-1">{stats.events}</p>
                  <p className="text-sm text-green-600">This month</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer" onClick={() => router.push('/jobs')}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">💼</span>
                    </div>
                    <div className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
                      New
                    </div>
                  </div>
                  <h3 className="font-bold text-orange-800 mb-1">Jobs</h3>
                  <p className="text-2xl font-bold text-orange-600 mb-1">{stats.jobs}</p>
                  <p className="text-sm text-orange-600">Open positions</p>
                </div>
              </div>
            )}

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-blue-600">Recent Activity</h2>
                  <button className="text-blue-600 hover:text-purple-600 text-sm font-semibold">View All</button>
                </div>
                
                {isLoading ? (
                  <div className="space-y-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="flex items-center space-x-4 animate-pulse">
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer" onClick={() => router.push(activity.action)}>
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                          {activity.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-blue-900 text-sm truncate">{activity.title}</p>
                          <p className="text-xs text-gray-600">{activity.time}</p>
                        </div>
                        <button className="text-blue-600 hover:text-purple-600 font-semibold text-sm flex-shrink-0">→</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-blue-600">Quick Actions</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Update Profile', icon: '✏️', action: '/profile', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700' },
                    { name: 'Find Alumni', icon: '🔍', action: '/directory', color: 'bg-purple-50 hover:bg-purple-100 text-purple-700' },
                    { name: 'Join Event', icon: '🎉', action: '/events', color: 'bg-green-50 hover:bg-green-100 text-green-700' },
                    { name: 'Browse Jobs', icon: '💼', action: '/jobs', color: 'bg-orange-50 hover:bg-orange-100 text-orange-700' },
                    { name: 'Send Message', icon: '💬', action: '/messaging', color: 'bg-pink-50 hover:bg-pink-100 text-pink-700' },
                    { name: 'Make Donation', icon: '❤️', action: '/donation', color: 'bg-red-50 hover:bg-red-100 text-red-700' }
                  ].map((action, index) => (
                    <button
                      key={index}
                      onClick={() => router.push(action.action)}
                      className={`p-4 rounded-lg transition-all hover:scale-105 ${action.color}`}
                    >
                      <div className="text-2xl mb-2">{action.icon}</div>
                      <div className="text-sm font-semibold">{action.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}