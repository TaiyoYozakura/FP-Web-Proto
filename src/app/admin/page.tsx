'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/contexts/AppContext';
import SearchBar from '@/components/SearchBar';
import SkeletonLoader, { CardSkeleton, TableSkeleton } from '@/components/SkeletonLoader';
import AdminAuth from '@/components/AdminAuth';
import ExcelImport from '@/components/ExcelImport';
import DatabaseManager from '@/components/DatabaseManager';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('adminAuth') === 'true';
    }
    return false;
  });

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('adminAuth', 'true');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      setIsAuthenticated(false);
      sessionStorage.removeItem('adminAuth');
    }
  };
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'user' | 'event' | 'content'>('user');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { state, dispatch } = useApp();

  return (
    <div className="min-h-screen bg-theme-background">
      {!isAuthenticated ? (
        <AdminAuth onAuthenticated={handleAuthenticated} />
      ) : (

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setSearchQuery('');
    setSelectedUsers([]);
  };

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) {
      alert('Please select users first');
      return;
    }
    alert(`${action} applied to ${selectedUsers.length} users`);
    setSelectedUsers([]);
  };

  const handleExport = (type: string) => {
    alert(`Exporting ${type} data...`);
  };

  const stats = [
    { title: 'Total Alumni', value: '2,456', change: '+12 this month', color: 'text-green-600', icon: 'users' },
    { title: 'Active Users', value: '1,234', change: 'Last 30 days', color: 'text-blue-600', icon: 'activity' },
    { title: 'Pending Approvals', value: '23', change: 'Requires attention', color: 'text-orange-600', icon: 'clock' },
    { title: 'Total Revenue', value: '₹2.5Cr', change: '+₹50K this month', color: 'text-green-600', icon: 'trending-up' }
  ];

  const users = [
    { id: '1', name: 'John Smith', batch: '2020', email: 'john@email.com', status: 'Pending', role: 'Alumni', lastActive: '2 hours ago' },
    { id: '2', name: 'Sarah Johnson', batch: '2018', email: 'sarah@email.com', status: 'Active', role: 'Alumni', lastActive: '1 day ago' },
    { id: '3', name: 'Mike Wilson', batch: '2019', email: 'mike@email.com', status: 'Active', role: 'Alumni', lastActive: '3 days ago' },
    { id: '4', name: 'Lisa Brown', batch: '2021', email: 'lisa@email.com', status: 'Pending', role: 'Alumni', lastActive: '1 hour ago' }
  ];

  const events = [
    { id: '1', title: 'Annual Alumni Meet 2024', date: '2024-12-15', attendees: 150, status: 'Published' },
    { id: '2', title: 'Career Fair', date: '2024-11-20', attendees: 89, status: 'Draft' },
    { id: '3', title: 'Networking Session', date: '2024-10-30', attendees: 45, status: 'Published' }
  ];

  const content = [
    { id: '1', title: 'Welcome Message', type: 'Page', author: 'Admin', status: 'Published', date: '2024-01-15' },
    { id: '2', title: 'Alumni Success Stories', type: 'Blog', author: 'Editor', status: 'Draft', date: '2024-01-10' },
    { id: '3', title: 'College Updates', type: 'News', author: 'Admin', status: 'Published', date: '2024-01-05' }
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

      <nav className="sticky-nav bg-theme-surface shadow-sm border-b border-theme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-theme-background"
                aria-label="Toggle menu"
                aria-expanded={sidebarOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Image src="https://www.dnyanasadhanacollege.org/images/logo/logo-final.png" alt="Dnyanasadhana College" width={32} height={32} className="w-8 h-8 sm:w-10 sm:h-10" />
              <h1 className="text-base sm:text-lg lg:text-xl font-bold text-theme-primary">SPDNC Admin</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/" className="hidden sm:block text-theme-secondary hover:text-theme-primary font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-theme-background">Home</Link>
              <button 
                onClick={handleLogout}
                className="text-theme-secondary hover:text-theme-primary font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-theme-background"
              >
                Logout
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-theme-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">A</div>
                <span className="hidden sm:inline text-theme-primary">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div className="absolute inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}
          
          {/* Sidebar */}
          <div className={`fixed lg:relative lg:w-64 w-64 h-screen lg:h-auto bg-theme-surface lg:bg-transparent z-50 lg:z-auto transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}>
            <div className="p-4 lg:p-0 space-y-4 lg:space-y-6">
              <div className="card p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4 lg:mb-6">
                  <h3 className="text-lg font-bold text-theme-primary">Admin Menu</h3>
                  <button 
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden p-1 rounded hover:bg-theme-background"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-2">
                  {[
                    { id: 'dashboard', name: 'Dashboard', icon: 'grid' },
                    { id: 'database', name: 'Database Management', icon: 'database' },
                    { id: 'excel-import', name: 'Excel Import', icon: 'upload' },
                    { id: 'users', name: 'User Management', icon: 'users' },
                    { id: 'content', name: 'Content Management', icon: 'file-text' },
                    { id: 'events', name: 'Event Management', icon: 'calendar' },
                    { id: 'analytics', name: 'Analytics & Reports', icon: 'bar-chart' },
                    { id: 'settings', name: 'System Settings', icon: 'settings' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleSectionChange(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full text-left p-3 lg:p-4 rounded-lg transition-all flex items-center space-x-3 font-medium text-sm lg:text-base ${
                        activeSection === item.id 
                          ? 'bg-theme-primary text-white shadow-md' 
                          : 'hover:bg-theme-background text-theme-secondary hover:text-theme-primary'
                      }`}
                    >
                      <span className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0">
                        {item.icon === 'grid' && <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
                        {item.icon === 'database' && <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>}
                        {item.icon === 'upload' && <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>}
                        {item.icon === 'users' && <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg>}
                        {item.icon === 'file-text' && <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                        {item.icon === 'calendar' && <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                        {item.icon === 'bar-chart' && <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                        {item.icon === 'settings' && <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                      </span>
                      <span className="truncate">{item.name}</span>
                  </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="mb-6 lg:mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div className="mb-4 lg:mb-0">
                  <h1 className="text-2xl lg:text-3xl font-bold text-theme-primary mb-2">Admin Dashboard</h1>
                  <p className="text-theme-secondary text-sm lg:text-base">Manage Satish Pradhan Dnyanasadhana College Alumni Portal</p>
                </div>
                <div className="flex items-center space-x-2 lg:space-x-4">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 lg:w-auto px-3 lg:px-4 py-2 border border-theme rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary bg-theme-surface text-sm lg:text-base"
                  />
                  <button className="btn bg-theme-primary text-white px-3 lg:px-4 py-2 rounded-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid - Dashboard */}
            {activeSection === 'dashboard' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="card p-4 lg:p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-3 lg:mb-4">
                      <h3 className="text-xs lg:text-sm font-semibold text-theme-secondary uppercase tracking-wide">{stat.title}</h3>
                      <div className="w-6 h-6 lg:w-8 lg:h-8 bg-theme-primary/10 rounded-lg flex items-center justify-center">
                        <svg className="w-3 h-3 lg:w-4 lg:h-4 text-theme-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {stat.icon === 'users' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />}
                          {stat.icon === 'activity' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
                          {stat.icon === 'clock' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
                          {stat.icon === 'trending-up' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />}
                        </svg>
                      </div>
                    </div>
                    <p className="text-2xl lg:text-3xl font-bold text-theme-primary mb-2">{stat.value}</p>
                    <p className={`text-xs lg:text-sm font-medium ${stat.color}`}>{stat.change}</p>
                  </div>
                ))}
              </div>
            )}

            {/* User Management Section */}
            {activeSection === 'users' && (
              <div className="space-y-6">
                <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="responsive-header font-bold text-theme-primary">User Management</h2>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <button 
                      onClick={() => handleBulkAction('Approve')}
                      className="btn bg-green-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-green-700 text-sm lg:text-base"
                    >
                      Bulk Approve
                    </button>
                    <button 
                      onClick={() => handleExport('users')}
                      className="btn border border-theme text-theme-primary px-3 lg:px-4 py-2 rounded-lg hover:bg-theme-background text-sm lg:text-base"
                      title="Export Users"
                    >
                      <span className="hidden sm:inline">Export Users</span>
                      <span className="sm:hidden">Export</span>
                    </button>
                    <button 
                      onClick={() => setShowModal(true)}
                      className="btn bg-theme-primary text-white px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base"
                    >
                      Add User
                    </button>
                  </div>
                </div>
                
                <div className="card p-4 lg:p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead>
                        <tr className="border-b border-theme">
                          <th className="text-left py-2 lg:py-3 px-2 lg:px-4">
                            <input 
                              type="checkbox" 
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedUsers(filteredUsers.map(u => u.id));
                                } else {
                                  setSelectedUsers([]);
                                }
                              }}
                              className="rounded"
                            />
                          </th>
                          <th className="text-left responsive-cell font-semibold text-theme-primary">Name</th>
                          <th className="text-left responsive-cell font-semibold text-theme-primary hidden sm:table-cell">Email</th>
                          <th className="text-left responsive-cell font-semibold text-theme-primary">Batch</th>
                          <th className="text-left responsive-cell font-semibold text-theme-primary">Status</th>
                          <th className="text-left responsive-cell font-semibold text-theme-primary hidden lg:table-cell">Last Active</th>
                          <th className="text-left responsive-cell font-semibold text-theme-primary">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="border-b border-theme hover:bg-theme-background">
                            <td className="responsive-cell">
                              <input 
                                type="checkbox" 
                                checked={selectedUsers.includes(user.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedUsers([...selectedUsers, user.id]);
                                  } else {
                                    setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                                  }
                                }}
                                className="rounded"
                              />
                            </td>
                            <td className="responsive-cell text-theme-primary font-medium">
                              <div>
                                <div>{user.name}</div>
                                <div className="sm:hidden text-xs text-theme-secondary">{user.email}</div>
                              </div>
                            </td>
                            <td className="responsive-cell text-theme-secondary hidden sm:table-cell">{user.email}</td>
                            <td className="responsive-cell text-theme-secondary">{user.batch}</td>
                            <td className="py-2 lg:py-3 px-2 lg:px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                user.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                                user.status === 'Active' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="py-2 lg:py-3 px-2 lg:px-4 text-theme-secondary text-sm hidden lg:table-cell">{user.lastActive}</td>
                            <td className="py-2 lg:py-3 px-2 lg:px-4">
                              <div className="flex flex-col lg:flex-row space-y-1 lg:space-y-0 lg:space-x-2">
                                <button className="text-theme-primary hover:text-theme-secondary text-xs lg:text-sm font-medium mobile-touch">
                                  Edit
                                </button>
                                <button className="text-red-600 hover:text-red-800 text-xs lg:text-sm font-medium mobile-touch">
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}



            {/* Content Management Section */}
            {activeSection === 'content' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-2xl font-bold text-theme-primary mb-4 sm:mb-0">Content Management</h2>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleExport('content')}
                      className="btn border border-theme text-theme-primary px-4 py-2 rounded-lg hover:bg-theme-background"
                    >
                      Export Content
                    </button>
                    <button 
                      onClick={() => { setModalType('content'); setShowModal(true); }}
                      className="btn bg-theme-primary text-white px-4 py-2 rounded-lg"
                    >
                      Add Content
                    </button>
                  </div>
                </div>
                
                <div className="card p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-theme">
                          <th className="text-left py-3 px-4 font-semibold text-theme-primary">Title</th>
                          <th className="text-left py-3 px-4 font-semibold text-theme-primary">Type</th>
                          <th className="text-left py-3 px-4 font-semibold text-theme-primary">Author</th>
                          <th className="text-left py-3 px-4 font-semibold text-theme-primary">Status</th>
                          <th className="text-left py-3 px-4 font-semibold text-theme-primary">Date</th>
                          <th className="text-left py-3 px-4 font-semibold text-theme-primary">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {content.map((item) => (
                          <tr key={item.id} className="border-b border-theme hover:bg-theme-background">
                            <td className="py-3 px-4 text-theme-primary font-medium">{item.title}</td>
                            <td className="py-3 px-4 text-theme-secondary">{item.type}</td>
                            <td className="py-3 px-4 text-theme-secondary">{item.author}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                item.status === 'Published' ? 'bg-green-100 text-green-800' :
                                item.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-theme-secondary text-sm">{item.date}</td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <button className="text-theme-primary hover:text-theme-secondary text-sm font-medium">
                                  Edit
                                </button>
                                <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Event Management Section */}
            {activeSection === 'events' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-2xl font-bold text-theme-primary mb-4 sm:mb-0">Event Management</h2>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleExport('events')}
                      className="btn border border-theme text-theme-primary px-4 py-2 rounded-lg hover:bg-theme-background"
                    >
                      Export Events
                    </button>
                    <button 
                      onClick={() => { setModalType('event'); setShowModal(true); }}
                      className="btn bg-theme-primary text-white px-4 py-2 rounded-lg"
                    >
                      Create Event
                    </button>
                  </div>
                </div>
                
                <div className="card p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-theme">
                          <th className="text-left py-3 px-4 font-semibold text-theme-primary">Event Title</th>
                          <th className="text-left py-3 px-4 font-semibold text-theme-primary">Date</th>
                          <th className="text-left py-3 px-4 font-semibold text-theme-primary">Attendees</th>
                          <th className="text-left py-3 px-4 font-semibold text-theme-primary">Status</th>
                          <th className="text-left py-3 px-4 font-semibold text-theme-primary">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.map((event) => (
                          <tr key={event.id} className="border-b border-theme hover:bg-theme-background">
                            <td className="py-3 px-4 text-theme-primary font-medium">{event.title}</td>
                            <td className="py-3 px-4 text-theme-secondary">{event.date}</td>
                            <td className="py-3 px-4 text-theme-secondary">{event.attendees}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                event.status === 'Published' ? 'bg-green-100 text-green-800' :
                                event.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {event.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <button className="text-theme-primary hover:text-theme-secondary text-sm font-medium">
                                  Edit
                                </button>
                                <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Section */}
            {activeSection === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-theme-primary mb-6">Analytics & Reports</h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-theme-primary mb-4">User Growth</h3>
                    <div className="h-32 bg-theme-background rounded-lg flex items-center justify-center">
                      <p className="text-theme-secondary">Chart Placeholder</p>
                    </div>
                  </div>
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-theme-primary mb-4">Event Attendance</h3>
                    <div className="h-32 bg-theme-background rounded-lg flex items-center justify-center">
                      <p className="text-theme-secondary">Chart Placeholder</p>
                    </div>
                  </div>
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-theme-primary mb-4">Revenue Trends</h3>
                    <div className="h-32 bg-theme-background rounded-lg flex items-center justify-center">
                      <p className="text-theme-secondary">Chart Placeholder</p>
                    </div>
                  </div>
                </div>
                
                <div className="card p-6">
                  <h3 className="text-xl font-semibold text-theme-primary mb-4">Generate Reports</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button 
                      onClick={() => handleExport('user-report')}
                      className="btn border border-theme text-theme-primary p-4 rounded-lg hover:bg-theme-background text-center"
                    >
                      User Report
                    </button>
                    <button 
                      onClick={() => handleExport('event-report')}
                      className="btn border border-theme text-theme-primary p-4 rounded-lg hover:bg-theme-background text-center"
                    >
                      Event Report
                    </button>
                    <button 
                      onClick={() => handleExport('financial-report')}
                      className="btn border border-theme text-theme-primary p-4 rounded-lg hover:bg-theme-background text-center"
                    >
                      Financial Report
                    </button>
                    <button 
                      onClick={() => handleExport('activity-report')}
                      className="btn border border-theme text-theme-primary p-4 rounded-lg hover:bg-theme-background text-center"
                    >
                      Activity Report
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Database Management Section */}
            {activeSection === 'database' && (
              <div className="space-y-6">
                <h2 className="responsive-header font-bold text-theme-primary mb-6">Database Management</h2>
                <ErrorBoundary>
                  <DatabaseManager />
                </ErrorBoundary>
              </div>
            )}

            {/* Excel Import Section */}
            {activeSection === 'excel-import' && (
              <div className="space-y-6">
                <h2 className="responsive-header font-bold text-theme-primary mb-6">Excel Import</h2>
                <ErrorBoundary>
                  <ExcelImport />
                </ErrorBoundary>
              </div>
            )}

            {/* System Settings Section */}
            {activeSection === 'settings' && (
              <div className="space-y-6">
                <h2 className="responsive-header font-bold text-theme-primary mb-6">System Settings</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="card p-4 lg:p-6">
                    <h3 className="text-lg font-semibold text-theme-primary mb-4">General Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-theme-primary mb-2">Site Name</label>
                        <input 
                          type="text" 
                          defaultValue="Satish Pradhan Dnyanasadhana College Alumni Portal"
                          className="w-full px-3 py-2 border border-theme rounded-lg bg-theme-surface text-theme-primary text-sm lg:text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-theme-primary mb-2">Contact Email</label>
                        <input 
                          type="email" 
                          defaultValue="alumni@dnyanasadhana.edu.in"
                          className="w-full px-3 py-2 border border-theme rounded-lg bg-theme-surface text-theme-primary text-sm lg:text-base"
                        />
                      </div>
                      <button className="btn bg-theme-primary text-white px-4 py-2 rounded-lg text-sm lg:text-base">
                        Save Changes
                      </button>
                    </div>
                  </div>
                  
                  <div className="card p-4 lg:p-6">
                    <h3 className="text-lg font-semibold text-theme-primary mb-4">Security Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-theme-primary text-sm lg:text-base">Two-Factor Authentication</span>
                        <button className="bg-green-500 text-white px-3 py-1 rounded-full text-xs lg:text-sm">
                          Enabled
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-theme-primary text-sm lg:text-base">Auto-approve Alumni</span>
                        <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-xs lg:text-sm">
                          Disabled
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-theme-primary text-sm lg:text-base">Email Notifications</span>
                        <button className="bg-green-500 text-white px-3 py-1 rounded-full text-xs lg:text-sm">
                          Enabled
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Activity - Dashboard */}
            {activeSection === 'dashboard' && (
              <div className="card p-4 lg:p-6">
                <h2 className="text-lg lg:text-xl font-bold text-theme-primary mb-4 lg:mb-6">Recent Activity</h2>
                <div className="responsive-spacing">
                  {[
                    { action: 'New user registration', user: 'John Smith', time: '2 minutes ago', type: 'user' },
                    { action: 'Event published', user: 'Admin', time: '1 hour ago', type: 'event' },
                    { action: 'Content updated', user: 'Editor', time: '3 hours ago', type: 'content' },
                    { action: 'User approved', user: 'Admin', time: '5 hours ago', type: 'user' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-theme-background">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'user' ? 'bg-blue-500' :
                          activity.type === 'event' ? 'bg-green-500' :
                          'bg-orange-500'
                        }`}></div>
                        <div>
                          <p className="text-theme-primary font-medium text-sm lg:text-base">{activity.action}</p>
                          <p className="text-theme-secondary text-xs lg:text-sm">by {activity.user}</p>
                        </div>
                      </div>
                      <span className="text-theme-secondary text-xs lg:text-sm">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}