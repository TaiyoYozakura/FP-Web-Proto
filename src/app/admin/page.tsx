'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/contexts/AppContext';
import SearchBar from '@/components/SearchBar';
import SkeletonLoader, { CardSkeleton, TableSkeleton } from '@/components/SkeletonLoader';

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [defaultTheme, setDefaultTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('defaultTheme') || 'dark';
    }
    return 'dark';
  });
  const { state, dispatch } = useApp();

  const handleSectionChange = async (section: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate loading
    setActiveSection(section);
    setIsLoading(false);
  };

  const setAsDefault = (themeId: string) => {
    setDefaultTheme(themeId);
    localStorage.setItem('defaultTheme', themeId);
  };

  const setGlobalDefault = (themeId: string) => {
    localStorage.setItem('globalDefaultTheme', themeId);
    // Update all users' theme immediately
    dispatch({ type: 'SET_THEME', payload: themeId });
    alert(`Global default theme set to ${themeId.charAt(0).toUpperCase() + themeId.slice(1)} for all users!`);
  };

  const stats = [
    { title: 'Total Alumni', value: '2,456', change: '+12 this month', color: 'text-green-600' },
    { title: 'Active Users', value: '1,234', change: 'Last 30 days', color: 'text-blue-600' },
    { title: 'Pending Approvals', value: '23', change: 'Requires attention', color: 'text-orange-600' },
    { title: 'Total Donations', value: '₹2.5Cr', change: '+₹50K this month', color: 'text-green-600' }
  ];

  const pendingUsers = [
    { name: 'John Smith', batch: '2020', email: 'john@email.com', status: 'Pending' },
    { name: 'Sarah Johnson', batch: '2018', email: 'sarah@email.com', status: 'Approved' }
  ];

  return (
    <div className="min-h-screen bg-theme-background">
      <nav className="sticky-nav bg-theme-surface shadow-sm border-b border-theme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image src="/SAC-LOGO.webp" alt="AlumniPortal" width={32} height={32} className="rounded-full sm:w-10 sm:h-10" />
              <h1 className="text-lg sm:text-xl font-bold text-theme-primary">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-6">
              <Link href="/" className="text-theme-secondary hover:text-theme-primary font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-theme-background">🏠 Home</Link>
              <button 
                onClick={() => {
                  const currentTheme = state.theme;
                  const newTheme = currentTheme === 'dark' ? (localStorage.getItem('previousTheme') || defaultTheme) : 'dark';
                  if (currentTheme !== 'dark') {
                    localStorage.setItem('previousTheme', currentTheme);
                  }
                  dispatch({ type: 'SET_THEME', payload: newTheme });
                }}
                className="btn p-2 rounded-lg bg-theme-background hover:bg-theme-border micro-bounce"
                title="Toggle Dark Mode"
              >
                {state.theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-theme-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">A</div>
                <span className="hidden sm:inline text-theme-primary">Admin ▼</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 space-y-4 lg:space-y-6">
            <div className="card p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-theme-primary mb-4 lg:mb-6">Admin Menu</h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3">
                {[
                  { id: 'dashboard', name: 'Dashboard', icon: '📊' },
                  { id: 'users', name: 'User Management', icon: '👥' },
                  { id: 'content', name: 'Content Management', icon: '📝' },
                  { id: 'events', name: 'Event Management', icon: '📅' },
                  { id: 'analytics', name: 'Analytics', icon: '📈' },
                  { id: 'settings', name: 'System Settings', icon: '⚙️' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSectionChange(item.id)}
                    className={`btn ripple w-full text-left p-3 lg:p-4 rounded-xl transition-all flex flex-col lg:flex-row items-center lg:space-x-4 font-medium text-xs sm:text-sm lg:text-base ${
                      activeSection === item.id 
                        ? 'bg-theme-primary text-white shadow-lg' 
                        : 'hover:bg-theme-background text-theme-secondary'
                    }`}
                  >
                    <span className="text-lg lg:text-xl mb-1 lg:mb-0">{item.icon}</span>
                    <span className="text-center lg:text-left">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6 lg:mb-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-theme-primary mb-2 lg:mb-4">Admin Dashboard</h1>
                  <p className="text-body lg:text-lead text-theme-secondary">Manage your alumni portal</p>
                </div>
                <div className="mt-4 lg:mt-0 lg:w-96">
                  <SearchBar placeholder="Search users, events, reports..." className="w-full" />
                </div>
              </div>
            </div>

            {/* Stats Grid - Show when dashboard is active */}
            {activeSection === 'dashboard' && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-6 lg:mb-12">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <CardSkeleton key={i} />
                  ))
                ) : (
                  stats.map((stat, index) => (
                    <div key={index} className="card card-hover micro-pulse p-4 lg:p-8">
                      <h3 className="text-xs lg:text-small font-semibold text-theme-secondary mb-2 lg:mb-3 uppercase tracking-wide">{stat.title}</h3>
                      <p className="text-xl lg:text-4xl font-extrabold text-theme-primary mb-1 lg:mb-2">{stat.value}</p>
                      <p className={`text-xs lg:text-small font-medium ${stat.color}`}>{stat.change}</p>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Recent Registrations - Show when dashboard is active */}
            {activeSection === 'dashboard' && (
              <div className="card p-4 lg:p-8 mb-6 lg:mb-12">
                <h2 className="text-xl lg:text-2xl font-bold text-theme-primary mb-4 lg:mb-8">Recent User Registrations</h2>
              <div className="overflow-x-auto">
                {isLoading ? (
                  <TableSkeleton rows={3} />
                ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-theme">
                      <th className="text-left py-4 px-6 font-semibold text-theme-primary">Name</th>
                      <th className="text-left py-4 px-6 font-semibold text-theme-primary">Batch</th>
                      <th className="text-left py-4 px-6 font-semibold text-theme-primary">Email</th>
                      <th className="text-left py-4 px-6 font-semibold text-theme-primary">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-theme-primary">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingUsers.map((user, index) => (
                      <tr key={index} className="border-b border-theme hover:bg-theme-background">
                        <td className="py-4 px-6 text-theme-primary">{user.name}</td>
                        <td className="py-4 px-6 text-theme-secondary">{user.batch}</td>
                        <td className="py-4 px-6 text-theme-secondary">{user.email}</td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            user.status === 'Pending' 
                              ? 'bg-orange-100 text-orange-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex space-x-3">
                            {user.status === 'Pending' && (
                              <>
                                <button className="btn ripple bg-green-600 text-white px-4 py-2 rounded-lg text-small font-medium hover:bg-green-700">
                                  Approve
                                </button>
                                <button className="btn ripple bg-theme-primary text-white px-4 py-2 rounded-lg text-small font-medium hover:bg-theme-primary">
                                  Reject
                                </button>
                              </>
                            )}
                            <button className="btn border border-theme text-theme-primary px-4 py-2 rounded-lg text-small font-medium hover:bg-theme-background">
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                )}
              </div>
              </div>
            )}

            {/* Theme Settings - Show when settings section is active */}
            {activeSection === 'settings' && (
              <div className="card p-4 lg:p-8 mb-6 lg:mb-12">
                <h2 className="text-xl lg:text-2xl font-bold text-theme-primary mb-4 lg:mb-8">Website Theme Settings</h2>
                <div className="space-y-4 lg:space-y-6">
                  <p className="text-body lg:text-lead text-theme-secondary mb-4 lg:mb-6">Choose a theme for the entire website:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
                    {[
                      { id: 'default', name: 'St Andrews Bandra West', color: 'bg-red-600' },
                      { id: 'dark', name: 'Dark Mode', color: 'bg-gray-800' },
                      { id: 'purple', name: 'Dnyanasadhana', color: 'bg-purple-700' },
                      { id: 'skyblue', name: 'DG Ruparel', color: 'bg-sky-500' },
                      { id: 'oxford', name: 'Oxford Style', color: 'bg-blue-900' },
                      { id: 'harvard', name: 'Harvard Style', color: 'bg-red-800' },
                      { id: 'mithibai', name: 'Mithibai College', color: 'bg-orange-500' },
                      { id: 'kc', name: 'KC College', color: 'bg-green-600' },
                      { id: 'wilson', name: 'Wilson College', color: 'bg-blue-600' }
                    ].map((theme) => (
                      <div key={theme.id} className="relative">
                        <button
                          onClick={() => dispatch({ type: 'SET_THEME', payload: theme.id })}
                          className={`btn ripple card card-hover micro-bounce p-3 lg:p-6 border-2 transition-all w-full ${
                            state.theme === theme.id
                              ? 'border-blue-500 bg-blue-50 card-elevated'
                              : 'border-theme'
                          }`}
                        >
                          <div className={`w-full h-6 lg:h-10 ${theme.color} rounded-lg mb-2 lg:mb-4`}></div>
                          <span className="text-xs lg:text-body font-semibold text-center block">{theme.name}</span>
                          {state.theme === theme.id && (
                            <div className="text-blue-600 text-xs lg:text-small font-medium mt-1 lg:mt-2 text-center">✓ Active</div>
                          )}
                          {defaultTheme === theme.id && (
                            <div className="text-yellow-600 text-xs lg:text-small font-medium mt-1 text-center">★ Default</div>
                          )}
                        </button>
                        <div className="absolute top-2 right-2 flex gap-1">
                          <button
                            onClick={() => setAsDefault(theme.id)}
                            className={`p-1 rounded-full text-sm hover:bg-theme-background transition-colors ${
                              defaultTheme === theme.id ? 'text-yellow-500' : 'text-theme-secondary'
                            }`}
                            title="Set as personal default"
                          >
                            ★
                          </button>
                          <button
                            onClick={() => setGlobalDefault(theme.id)}
                            className="p-1 rounded-full text-sm hover:bg-theme-background text-red-600 transition-colors"
                            title="Set as global default for all users"
                          >
                            🌍
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-6 bg-theme-background rounded-xl">
                    <p className="text-body text-theme-secondary font-medium">
                      <strong>Current Theme:</strong> {state.theme.charAt(0).toUpperCase() + state.theme.slice(1)}
                    </p>
                    <p className="text-body text-theme-secondary font-medium mt-2">
                      <strong>Default Theme:</strong> {defaultTheme.charAt(0).toUpperCase() + defaultTheme.slice(1)}
                    </p>
                    <p className="text-small text-theme-secondary mt-2">
                      Theme changes apply instantly. Click the star (★) for personal default or globe (🌍) to set as global default for all users.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions - Show when dashboard is active */}
            {activeSection === 'dashboard' && (
              <div className="card p-4 lg:p-8">
                <h2 className="text-xl lg:text-2xl font-bold text-theme-primary mb-4 lg:mb-8">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
                  {[
                    { name: 'Send Newsletter', icon: '📧' },
                    { name: 'Create Event', icon: '📅' },
                    { name: 'Post News', icon: '📰' },
                    { name: 'Export Data', icon: '📊' },
                    { name: 'View Reports', icon: '📈' },
                    { name: 'System Backup', icon: '💾' }
                  ].map((action, index) => (
                    <button
                      key={index}
                      className="btn ripple card card-hover micro-bounce flex flex-col items-center p-3 lg:p-6 border border-theme group hover:border-theme-primary"
                    >
                      <span className="text-2xl lg:text-3xl mb-2 lg:mb-4 group-hover:scale-110 transition-transform">{action.icon}</span>
                      <span className="text-xs lg:text-small font-semibold text-center text-theme-primary group-hover:text-theme-primary">{action.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}