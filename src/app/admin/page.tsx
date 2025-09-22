'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/contexts/AppContext';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { } = useApp();

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
    { title: 'Total Alumni', value: '2,456', change: '+12 this month', color: 'text-green-600' },
    { title: 'Active Users', value: '1,234', change: 'Last 30 days', color: 'text-blue-600' },
    { title: 'Pending Approvals', value: '23', change: 'Requires attention', color: 'text-orange-600' },
    { title: 'Total Revenue', value: '₹2.5Cr', change: '+₹50K this month', color: 'text-green-600' }
  ];

  const users = [
    { id: '1', name: 'John Smith', batch: '2020', email: 'john@email.com', status: 'Pending', lastActive: '2 hours ago' },
    { id: '2', name: 'Sarah Johnson', batch: '2018', email: 'sarah@email.com', status: 'Active', lastActive: '1 day ago' },
    { id: '3', name: 'Mike Wilson', batch: '2019', email: 'mike@email.com', status: 'Active', lastActive: '3 days ago' },
    { id: '4', name: 'Lisa Brown', batch: '2021', email: 'lisa@email.com', status: 'Pending', lastActive: '1 hour ago' }
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-theme-background">
      {!isAuthenticated ? (
        <AdminAuth onAuthenticated={handleAuthenticated} />
      ) : (
        <>
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
              {sidebarOpen && (
                <div className="absolute inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
              )}
              
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
                        { id: 'dashboard', name: 'Dashboard' },
                        { id: 'database', name: 'Database Management' },
                        { id: 'excel-import', name: 'Excel Import' },
                        { id: 'users', name: 'User Management' },
                        { id: 'settings', name: 'System Settings' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            handleSectionChange(item.id);
                            setSidebarOpen(false);
                          }}
                          className={`w-full text-left p-3 lg:p-4 rounded-lg transition-all font-medium text-sm lg:text-base ${
                            activeSection === item.id 
                              ? 'bg-theme-primary text-white shadow-md' 
                              : 'hover:bg-theme-background text-theme-secondary hover:text-theme-primary'
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

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

                {activeSection === 'dashboard' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
                      {stats.map((stat, index) => (
                        <div key={index} className="card p-4 lg:p-6 hover:shadow-lg transition-all">
                          <h3 className="text-xs lg:text-sm font-semibold text-theme-secondary uppercase tracking-wide mb-2">{stat.title}</h3>
                          <p className="text-2xl lg:text-3xl font-bold text-theme-primary mb-2">{stat.value}</p>
                          <p className={`text-xs lg:text-sm font-medium ${stat.color}`}>{stat.change}</p>
                        </div>
                      ))}
                    </div>
                    <div className="card p-4 lg:p-6">
                      <h2 className="text-lg lg:text-xl font-bold text-theme-primary mb-4 lg:mb-6">Recent Activity</h2>
                      <div className="space-y-3 lg:space-y-4">
                        {[
                          { action: 'New user registration', user: 'John Smith', time: '2 minutes ago' },
                          { action: 'Event published', user: 'Admin', time: '1 hour ago' },
                          { action: 'Content updated', user: 'Editor', time: '3 hours ago' }
                        ].map((activity, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-theme-background">
                            <div>
                              <p className="text-theme-primary font-medium text-sm lg:text-base">{activity.action}</p>
                              <p className="text-theme-secondary text-xs lg:text-sm">by {activity.user}</p>
                            </div>
                            <span className="text-theme-secondary text-xs lg:text-sm">{activity.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeSection === 'database' && (
                  <div className="space-y-6">
                    <h2 className="text-xl lg:text-2xl font-bold text-theme-primary mb-6">Database Management</h2>
                    <ErrorBoundary>
                      <DatabaseManager />
                    </ErrorBoundary>
                  </div>
                )}

                {activeSection === 'excel-import' && (
                  <div className="space-y-6">
                    <h2 className="text-xl lg:text-2xl font-bold text-theme-primary mb-6">Excel Import</h2>
                    <ErrorBoundary>
                      <ExcelImport />
                    </ErrorBoundary>
                  </div>
                )}

                {activeSection === 'users' && (
                  <div className="space-y-6">
                    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                      <h2 className="text-xl lg:text-2xl font-bold text-theme-primary">User Management</h2>
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
                        >
                          Export Users
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
                              <th className="text-left py-2 lg:py-3 px-2 lg:px-4 font-semibold text-theme-primary text-sm lg:text-base">Name</th>
                              <th className="text-left py-2 lg:py-3 px-2 lg:px-4 font-semibold text-theme-primary text-sm lg:text-base hidden sm:table-cell">Email</th>
                              <th className="text-left py-2 lg:py-3 px-2 lg:px-4 font-semibold text-theme-primary text-sm lg:text-base">Status</th>
                              <th className="text-left py-2 lg:py-3 px-2 lg:px-4 font-semibold text-theme-primary text-sm lg:text-base">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredUsers.map((user) => (
                              <tr key={user.id} className="border-b border-theme hover:bg-theme-background">
                                <td className="py-2 lg:py-3 px-2 lg:px-4">
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
                                <td className="py-2 lg:py-3 px-2 lg:px-4 text-theme-primary font-medium text-sm lg:text-base">
                                  <div>
                                    <div>{user.name}</div>
                                    <div className="sm:hidden text-xs text-theme-secondary">{user.email}</div>
                                  </div>
                                </td>
                                <td className="py-2 lg:py-3 px-2 lg:px-4 text-theme-secondary text-sm lg:text-base hidden sm:table-cell">{user.email}</td>
                                <td className="py-2 lg:py-3 px-2 lg:px-4">
                                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    user.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                                    user.status === 'Active' ? 'bg-green-100 text-green-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {user.status}
                                  </span>
                                </td>
                                <td className="py-2 lg:py-3 px-2 lg:px-4">
                                  <div className="flex flex-col lg:flex-row space-y-1 lg:space-y-0 lg:space-x-2">
                                    <button className="text-theme-primary hover:text-theme-secondary text-xs lg:text-sm font-medium min-h-[44px] lg:min-h-0 py-2 lg:py-0">
                                      Edit
                                    </button>
                                    <button className="text-red-600 hover:text-red-800 text-xs lg:text-sm font-medium min-h-[44px] lg:min-h-0 py-2 lg:py-0">
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

                {activeSection === 'settings' && (
                  <div className="space-y-6">
                    <h2 className="text-xl lg:text-2xl font-bold text-theme-primary mb-6">System Settings</h2>
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
                          <button className="btn bg-theme-primary text-white px-4 py-2 rounded-lg text-sm lg:text-base">
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}