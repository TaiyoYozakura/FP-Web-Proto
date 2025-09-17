'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/contexts/AppContext';

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { state, dispatch } = useApp();

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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Image src="/SAC-LOGO.webp" alt="AlumniPortal" width={40} height={40} className="rounded-full" />
              <h1 className="text-xl font-bold text-black">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-red-600 font-semibold">Dashboard</span>
              <span className="text-gray-600">Users</span>
              <span className="text-gray-600">Events</span>
              <span className="text-gray-600">Reports</span>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">A</div>
                <span>Admin ▼</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-black mb-4">Admin Menu</h3>
              <div className="space-y-2">
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
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
                      activeSection === item.id 
                        ? 'bg-red-50 text-red-600 font-semibold' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-black mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your alumni portal</p>
            </div>

            {/* Stats Grid - Show when dashboard is active */}
            {activeSection === 'dashboard' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">{stat.title}</h3>
                    <p className="text-3xl font-bold text-black mb-1">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Recent Registrations - Show when dashboard is active */}
            {activeSection === 'dashboard' && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-xl font-bold text-black mb-6">Recent User Registrations</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-black">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-black">Batch</th>
                      <th className="text-left py-3 px-4 font-semibold text-black">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-black">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-black">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingUsers.map((user, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4">{user.batch}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            user.status === 'Pending' 
                              ? 'bg-orange-100 text-orange-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            {user.status === 'Pending' && (
                              <>
                                <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                                  Approve
                                </button>
                                <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
                                  Reject
                                </button>
                              </>
                            )}
                            <button className="border border-gray-300 text-black px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors">
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              </div>
            )}

            {/* Theme Settings - Show when settings section is active */}
            {activeSection === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-xl font-bold text-black mb-6">Website Theme Settings</h2>
                <div className="space-y-4">
                  <p className="text-gray-600 mb-4">Choose a theme for the entire website:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { id: 'default', name: 'St Andrews Bandra West', color: 'bg-red-600' },
                      { id: 'dark', name: 'Dark Mode', color: 'bg-gray-800' },
                      { id: 'purple', name: 'Dnyanasadhana', color: 'bg-purple-700' },
                      { id: 'skyblue', name: 'DG Ruparel', color: 'bg-sky-500' }
                    ].map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => dispatch({ type: 'SET_THEME', payload: theme.id })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          state.theme === theme.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-full h-8 ${theme.color} rounded mb-2`}></div>
                        <span className="text-sm font-semibold">{theme.name}</span>
                        {state.theme === theme.id && (
                          <div className="text-blue-600 text-xs mt-1">✓ Active</div>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Current Theme:</strong> {state.theme.charAt(0).toUpperCase() + state.theme.slice(1)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Theme changes apply instantly across the entire website.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions - Show when dashboard is active */}
            {activeSection === 'dashboard' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-black mb-6">Quick Actions</h2>
                <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
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
                      className="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
                    >
                      <span className="text-2xl mb-2">{action.icon}</span>
                      <span className="text-sm font-semibold text-center">{action.name}</span>
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