'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({ users: 0, events: 0, donations: 0, pending: 0 });
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useApp();
  const router = useRouter();
  
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
      loadAdminData();
    }
  }, []);
  
  const handleLogin = () => {
    if (password === 'admin123' || password === 'dnyanasadhana2024') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      setError('');
      loadAdminData();
    } else {
      setError('Invalid admin password');
    }
  };
  
  const loadAdminData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setStats({
      users: Math.floor(Math.random() * 500) + 1200,
      events: Math.floor(Math.random() * 10) + 15,
      donations: Math.floor(Math.random() * 1000000) + 2500000,
      pending: Math.floor(Math.random() * 20) + 5
    });
    
    const sampleUsers = Array.from({length: 10}, (_, i) => ({
      id: i + 1,
      name: `Alumni ${i + 1}`,
      email: `alumni${i + 1}@example.com`,
      status: Math.random() > 0.2 ? 'Active' : 'Pending',
      joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      graduationYear: 2020 - Math.floor(Math.random() * 10)
    }));
    
    setUsers(sampleUsers);
    setIsLoading(false);
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
            
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Demo passwords:</p>
              <p className="text-xs text-gray-600"><code>admin123</code> or <code>dnyanasadhana2024</code></p>
            </div>
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
                    <button key={i} className={`p-4 rounded-lg transition-all hover:scale-105 ${action.color}`}>
                      <div className="text-2xl mb-2">{action.icon}</div>
                      <div className="text-sm font-semibold">{action.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">👥 User Management</h2>
                <div className="flex space-x-3">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700">
                    ➕ Add User
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
                    📤 Export
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Graduation</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Join Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-gray-800">{user.name}</td>
                        <td className="py-3 px-4 text-gray-600">{user.email}</td>
                        <td className="py-3 px-4 text-gray-600">{user.graduationYear}</td>
                        <td className="py-3 px-4 text-gray-600">{user.joinDate}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">✏️ Edit</button>
                            <button className="text-green-600 hover:text-green-800 font-semibold text-sm">✅ Verify</button>
                            <button className="text-red-600 hover:text-red-800 font-semibold text-sm">🚫 Suspend</button>
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
        
        {/* Add other tabs content here... */}
      </div>
    </div>
  );
}