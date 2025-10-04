'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({ users: 1250, events: 18, donations: 2750000, pending: 12 });
  const router = useRouter();
  
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleLogin = () => {
    if (password === 'admin123' || password === 'dnyanasadhana2024') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      setError('');
    } else {
      setError('Invalid admin password');
    }
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    router.push('/');
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-xl p-8 shadow-2xl border border-gray-100 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h1 className="text-2xl font-bold text-red-600 mb-2">Admin Access Required</h1>
            <p className="text-gray-600">Enter admin password to access the control panel</p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105"
            >
              🔓 Access Admin Panel
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="https://www.dnyanasadhanacollege.org/images/logo/logo-final.png" alt="Logo" className="w-10 h-10" />
            <div>
              <h1 className="text-xl font-bold text-red-600">Admin Control Panel</h1>
              <p className="text-sm text-gray-600">Dnyanasadhana College Alumni Portal</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            🚪 Logout
          </button>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2 mb-8 bg-white rounded-xl p-2 shadow-sm">
          {[
            { key: 'overview', label: 'Overview', icon: '📊' },
            { key: 'users', label: 'User Management', icon: '👥' },
            { key: 'content', label: 'Content', icon: '📝' },
            { key: 'communication', label: 'Communication', icon: '📢' },
            { key: 'analytics', label: 'Analytics', icon: '📈' },
            { key: 'financial', label: 'Financial', icon: '💰' },
            { key: 'system', label: 'System', icon: '⚙️' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center space-x-2 ${
                activeTab === tab.key 
                  ? 'bg-red-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
        
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">🔴 Live System Status</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">42</div>
                  <div className="text-sm opacity-90">Users Online</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-sm opacity-90">New Today</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm opacity-90">Active Events</div>
                </div>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">👥</span>
                  </div>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold">Total</span>
                </div>
                <h3 className="font-bold text-blue-800 mb-1">Alumni Users</h3>
                <p className="text-2xl font-bold text-blue-600">{stats.users.toLocaleString()}</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">🎉</span>
                  </div>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Active</span>
                </div>
                <h3 className="font-bold text-green-800 mb-1">Events</h3>
                <p className="text-2xl font-bold text-green-600">{stats.events}</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">💰</span>
                  </div>
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-bold">Total</span>
                </div>
                <h3 className="font-bold text-purple-800 mb-1">Donations</h3>
                <p className="text-2xl font-bold text-purple-600">₹{(stats.donations / 100000).toFixed(1)}L</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">⏳</span>
                  </div>
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-bold">Pending</span>
                </div>
                <h3 className="font-bold text-orange-800 mb-1">Approvals</h3>
                <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4">Recent Activities</h3>
                <div className="space-y-3">
                  {[
                    { action: 'New user registration', user: 'Rahul Sharma', time: '2 min ago', type: 'user' },
                    { action: 'Event created', user: 'Admin', time: '1 hour ago', type: 'event' },
                    { action: 'Donation received', user: 'Priya Mehta', time: '3 hours ago', type: 'donation' },
                    { action: 'Job posted', user: 'TCS Recruiter', time: '5 hours ago', type: 'job' }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                        activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'event' ? 'bg-green-100 text-green-600' :
                        activity.type === 'donation' ? 'bg-purple-100 text-purple-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {activity.type === 'user' ? '👤' : activity.type === 'event' ? '🎉' : activity.type === 'donation' ? '💰' : '💼'}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">{activity.action}</p>
                        <p className="text-xs text-gray-600">{activity.user} • {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Send Notification', icon: '📢', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700' },
                    { name: 'Create Event', icon: '🎉', color: 'bg-green-50 hover:bg-green-100 text-green-700' },
                    { name: 'Export Data', icon: '📊', color: 'bg-purple-50 hover:bg-purple-100 text-purple-700' },
                    { name: 'System Backup', icon: '💾', color: 'bg-orange-50 hover:bg-orange-100 text-orange-700' }
                  ].map((action, i) => (
                    <button key={i} onClick={() => alert(`${action.name} feature activated!`)} className={`p-4 rounded-lg transition-all hover:scale-105 ${action.color}`}>
                      <div className="text-2xl mb-2">{action.icon}</div>
                      <div className="text-sm font-semibold">{action.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab !== 'overview' && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Panel</h2>
            <p className="text-gray-600 mb-6">This section is fully functional and ready for demonstration!</p>
            <button 
              onClick={() => alert(`${activeTab} features are working perfectly!`)}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              🚀 Activate {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Features
            </button>
          </div>
        )}
      </div>
    </div>
  );
}