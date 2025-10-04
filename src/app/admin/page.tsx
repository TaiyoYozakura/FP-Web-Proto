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
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', graduationYear: '' });
  const [notifications, setNotifications] = useState([]);
  const [showDbConfig, setShowDbConfig] = useState(false);
  const [dbUri, setDbUri] = useState('sqlite:./alumni.db');
  const [events, setEvents] = useState([]);
  const [donations, setDonations] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [communications, setCommunications] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showCommModal, setShowCommModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '', venue: '' });
  const [newComm, setNewComm] = useState({ title: '', message: '', type: 'announcement' });
  const [systemLogs, setSystemLogs] = useState([]);
  const [realTimeStats, setRealTimeStats] = useState({ online: 0, newRegistrations: 0, activeEvents: 0 });
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
    
    // Enhanced stats with real-time data
    setStats({
      users: Math.floor(Math.random() * 500) + 1200,
      events: Math.floor(Math.random() * 10) + 15,
      donations: Math.floor(Math.random() * 1000000) + 2500000,
      pending: Math.floor(Math.random() * 20) + 5
    });
    
    // Sample users with more details
    const sampleUsers = Array.from({length: 15}, (_, i) => ({
      id: i + 1,
      name: [`Rahul Sharma`, `Priya Mehta`, `Amit Kumar`, `Sneha Patel`, `Vikram Singh`, `Anita Desai`, `Rohit Gupta`, `Kavya Nair`, `Arjun Reddy`, `Pooja Jain`, `Sanjay Yadav`, `Meera Shah`, `Karan Malhotra`, `Divya Agarwal`, `Nikhil Verma`][i],
      email: `alumni${i + 1}@example.com`,
      status: Math.random() > 0.2 ? 'Active' : Math.random() > 0.5 ? 'Pending' : 'Verified',
      joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      graduationYear: 2015 + Math.floor(Math.random() * 10),
      lastLogin: Math.random() > 0.3 ? `${Math.floor(Math.random() * 24)} hours ago` : 'Never',
      location: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai', 'Hyderabad'][Math.floor(Math.random() * 6)],
      company: ['TCS', 'Infosys', 'Google', 'Microsoft', 'Amazon', 'Wipro', 'Startup'][Math.floor(Math.random() * 7)]
    }));
    
    // Sample events
    const sampleEvents = [
      { id: 1, title: 'Annual Alumni Meet 2024', date: '2024-03-15', status: 'Upcoming', attendees: 250, venue: 'College Auditorium' },
      { id: 2, title: 'Tech Talk: AI in Industry', date: '2024-02-20', status: 'Completed', attendees: 180, venue: 'Virtual' },
      { id: 3, title: 'Career Guidance Workshop', date: '2024-04-10', status: 'Planning', attendees: 0, venue: 'Seminar Hall' }
    ];
    
    // Sample donations
    const sampleDonations = [
      { id: 1, donor: 'Rahul Sharma', amount: 50000, category: 'Scholarship Fund', date: '2024-01-15', status: 'Completed' },
      { id: 2, donor: 'Priya Mehta', amount: 25000, category: 'Infrastructure', date: '2024-01-20', status: 'Completed' },
      { id: 3, donor: 'Anonymous', amount: 100000, category: 'Research Fund', date: '2024-01-25', status: 'Pending' }
    ];
    
    // Analytics data
    const analyticsData = {
      userGrowth: [120, 150, 180, 220, 280, 350, 420],
      donationTrends: [50000, 75000, 120000, 95000, 180000, 220000, 300000],
      eventAttendance: [85, 92, 78, 95, 88, 91, 96],
      topLocations: [{ city: 'Mumbai', count: 245 }, { city: 'Delhi', count: 198 }, { city: 'Bangalore', count: 167 }],
      topCompanies: [{ company: 'TCS', count: 89 }, { company: 'Infosys', count: 67 }, { company: 'Google', count: 45 }]
    };
    
    // System logs
    const logs = [
      { id: 1, action: 'User Registration', user: 'Rahul Sharma', timestamp: new Date().toLocaleString(), status: 'Success' },
      { id: 2, action: 'Database Backup', user: 'System', timestamp: new Date(Date.now() - 3600000).toLocaleString(), status: 'Success' },
      { id: 3, action: 'Payment Processing', user: 'Priya Mehta', timestamp: new Date(Date.now() - 7200000).toLocaleString(), status: 'Success' }
    ];
    
    setUsers(sampleUsers);
    setEvents(sampleEvents);
    setDonations(sampleDonations);
    setAnalytics(analyticsData);
    setSystemLogs(logs);
    setRealTimeStats({ online: Math.floor(Math.random() * 50) + 20, newRegistrations: Math.floor(Math.random() * 10) + 5, activeEvents: 3 });
    setIsLoading(false);
  };
  
  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeStats(prev => ({
        online: Math.max(10, prev.online + Math.floor(Math.random() * 10) - 5),
        newRegistrations: prev.newRegistrations + Math.floor(Math.random() * 2),
        activeEvents: Math.floor(Math.random() * 5) + 2
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    router.push('/');
  };
  
  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.graduationYear) {
      const user = {
        id: users.length + 1,
        name: newUser.name,
        email: newUser.email,
        status: 'Active',
        joinDate: new Date().toLocaleDateString(),
        graduationYear: parseInt(newUser.graduationYear)
      };
      setUsers([...users, user]);
      setNewUser({ name: '', email: '', graduationYear: '' });
      setShowAddUser(false);
      alert('User added successfully!');
    }
  };
  
  const handleUserAction = (userId, action) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        if (action === 'suspend') {
          return { ...user, status: user.status === 'Active' ? 'Suspended' : 'Active' };
        } else if (action === 'verify') {
          return { ...user, status: 'Verified' };
        }
      }
      return user;
    }));
    alert(`User ${action}ed successfully!`);
  };
  
  const handleSendNotification = () => {
    const message = prompt('Enter notification message:');
    if (message) {
      const notification = {
        id: Date.now(),
        message,
        timestamp: new Date().toLocaleString(),
        status: 'Sent'
      };
      setNotifications([notification, ...notifications]);
      alert('Notification sent to all users!');
    }
  };
  
  const handleExportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Email,Graduation Year,Status,Join Date\n" +
      users.map(user => `${user.name},${user.email},${user.graduationYear},${user.status},${user.joinDate}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "alumni_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('Data exported successfully!');
  };
  
  const handleDbConfig = () => {
    if (dbUri) {
      localStorage.setItem('DATABASE_URL', dbUri);
      alert('Database URI updated successfully! Restart the application to apply changes.');
      setShowDbConfig(false);
    }
  };
  
  useEffect(() => {
    const savedDbUri = localStorage.getItem('DATABASE_URL');
    if (savedDbUri) {
      setDbUri(savedDbUri);
    }
  }, []);
  
  // Event management functions
  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.venue) {
      const event = {
        id: events.length + 1,
        title: newEvent.title,
        date: newEvent.date,
        status: 'Planning',
        attendees: 0,
        venue: newEvent.venue,
        description: newEvent.description
      };
      setEvents([...events, event]);
      setNewEvent({ title: '', date: '', description: '', venue: '' });
      setShowEventModal(false);
      alert('Event created successfully!');
    }
  };
  
  // Communication functions
  const handleSendCommunication = () => {
    if (newComm.title && newComm.message) {
      const communication = {
        id: communications.length + 1,
        title: newComm.title,
        message: newComm.message,
        type: newComm.type,
        timestamp: new Date().toLocaleString(),
        status: 'Sent',
        recipients: users.length
      };
      setCommunications([communication, ...communications]);
      setNewComm({ title: '', message: '', type: 'announcement' });
      setShowCommModal(false);
      alert(`${newComm.type} sent to ${users.length} users!`);
    }
  };
  
  // Advanced user actions
  const handleBulkAction = (action) => {
    const selectedUsers = users.filter(user => user.status === 'Pending');
    if (action === 'approve-all') {
      setUsers(users.map(user => user.status === 'Pending' ? { ...user, status: 'Active' } : user));
      alert(`${selectedUsers.length} users approved!`);
    } else if (action === 'export-active') {
      const activeUsers = users.filter(user => user.status === 'Active');
      const csvContent = "data:text/csv;charset=utf-8," + 
        "Name,Email,Company,Location,Graduation Year,Last Login\n" +
        activeUsers.map(user => `${user.name},${user.email},${user.company},${user.location},${user.graduationYear},${user.lastLogin}`).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "active_alumni.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert(`${activeUsers.length} active users exported!`);
    }
  };
  
  // Financial management
  const handleDonationAction = (donationId, action) => {
    setDonations(donations.map(donation => {
      if (donation.id === donationId) {
        if (action === 'approve') {
          return { ...donation, status: 'Completed' };
        } else if (action === 'reject') {
          return { ...donation, status: 'Rejected' };
        }
      }
      return donation;
    }));
    alert(`Donation ${action}d successfully!`);
  };
  
  // System maintenance
  const handleSystemAction = (action) => {
    const newLog = {
      id: systemLogs.length + 1,
      action: action,
      user: 'Admin',
      timestamp: new Date().toLocaleString(),
      status: 'Success'
    };
    setSystemLogs([newLog, ...systemLogs]);
    
    if (action === 'Database Backup') {
      alert('Database backup completed successfully!');
    } else if (action === 'Clear Cache') {
      alert('System cache cleared!');
    } else if (action === 'System Restart') {
      alert('System restart initiated!');
    }
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
            {/* Real-time stats banner */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">🔴 Live System Status</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{realTimeStats.online}</div>
                  <div className="text-sm opacity-90">Users Online</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{realTimeStats.newRegistrations}</div>
                  <div className="text-sm opacity-90">New Today</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{realTimeStats.activeEvents}</div>
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
                    { name: 'Send Notification', icon: '📢', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700', action: handleSendNotification },
                    { name: 'Create Event', icon: '🎉', color: 'bg-green-50 hover:bg-green-100 text-green-700', action: () => alert('Event creation feature coming soon!') },
                    { name: 'Export Data', icon: '📊', color: 'bg-purple-50 hover:bg-purple-100 text-purple-700', action: handleExportData },
                    { name: 'System Backup', icon: '💾', color: 'bg-orange-50 hover:bg-orange-100 text-orange-700', action: () => alert('System backup initiated!') }
                  ].map((action, i) => (
                    <button key={i} onClick={action.action} className={`p-4 rounded-lg transition-all hover:scale-105 ${action.color}`}>
                      <div className="text-2xl mb-2">{action.icon}</div>
                      <div className="text-sm font-semibold">{action.name}</div>
                    </button>
                  ))
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* User stats cards */}
            <div className="grid sm:grid-cols-4 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{users.filter(u => u.status === 'Active').length}</div>
                <div className="text-sm text-green-700">Active Users</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-600">{users.filter(u => u.status === 'Pending').length}</div>
                <div className="text-sm text-yellow-700">Pending Approval</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{users.filter(u => u.status === 'Verified').length}</div>
                <div className="text-sm text-blue-700">Verified Users</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">{users.filter(u => u.lastLogin !== 'Never').length}</div>
                <div className="text-sm text-purple-700">Recently Active</div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">👥 User Management</h2>
                  <div className="flex space-x-3">
                    <button onClick={() => setShowAddUser(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700">
                      ➕ Add User
                    </button>
                    <button onClick={handleExportData} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
                      📤 Export All
                    </button>
                  </div>
                </div>
                
                {/* Bulk actions */}
                <div className="flex space-x-2 mb-4">
                  <button onClick={() => handleBulkAction('approve-all')} className="bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-green-600">
                    ✅ Approve All Pending
                  </button>
                  <button onClick={() => handleBulkAction('export-active')} className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-blue-600">
                    📤 Export Active Only
                  </button>
                  <button onClick={() => alert('Bulk email sent!')} className="bg-purple-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-purple-600">
                    📧 Send Bulk Email
                  </button>
                </div>
              </div>
            
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Company</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Graduation</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Last Login</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-gray-800">{user.name}</td>
                        <td className="py-3 px-4 text-gray-600">{user.email}</td>
                        <td className="py-3 px-4 text-gray-600">{user.company}</td>
                        <td className="py-3 px-4 text-gray-600">{user.location}</td>
                        <td className="py-3 px-4 text-gray-600">{user.graduationYear}</td>
                        <td className="py-3 px-4 text-gray-600">{user.lastLogin}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            user.status === 'Active' ? 'bg-green-100 text-green-700' : 
                            user.status === 'Verified' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-1">
                            <button onClick={() => alert(`Editing ${user.name}...`)} className="text-blue-600 hover:text-blue-800 text-xs font-semibold">✏️</button>
                            <button onClick={() => handleUserAction(user.id, 'verify')} className="text-green-600 hover:text-green-800 text-xs font-semibold">✅</button>
                            <button onClick={() => handleUserAction(user.id, 'suspend')} className="text-red-600 hover:text-red-800 text-xs font-semibold">🚫</button>
                            <button onClick={() => alert(`Messaging ${user.name}...`)} className="text-purple-600 hover:text-purple-800 text-xs font-semibold">💬</button>
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
        
        {activeTab === 'content' && (
          <div className="space-y-8">
            {/* Events Management */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">🎉 Events Management</h2>
                <button onClick={() => setShowEventModal(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700">
                  ➕ Create Event
                </button>
              </div>
              
              <div className="grid gap-4">
                {events.map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-800">{event.title}</h3>
                        <p className="text-sm text-gray-600">{event.date} • {event.venue} • {event.attendees} attendees</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          event.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' :
                          event.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {event.status}
                        </span>
                        <button onClick={() => alert(`Managing ${event.title}...`)} className="text-blue-600 hover:text-blue-800 text-sm font-semibold">✏️ Edit</button>
                        <button onClick={() => alert(`${event.title} deleted!`)} className="text-red-600 hover:text-red-800 text-sm font-semibold">🗑️ Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* News & Announcements */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">📰 News & Announcements</h2>
                <button onClick={() => alert('News editor opening...')} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
                  ➕ Add News
                </button>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: 'New Scholarship Program Launched', date: '2024-01-20', status: 'Published', views: 1250 },
                  { title: 'Alumni Success Story: Tech Entrepreneur', date: '2024-01-18', status: 'Draft', views: 0 },
                  { title: 'College Infrastructure Update', date: '2024-01-15', status: 'Published', views: 890 }
                ].map((news, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div>
                      <h3 className="font-semibold text-gray-800">{news.title}</h3>
                      <p className="text-sm text-gray-600">{news.date} • {news.views} views</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        news.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {news.status}
                      </span>
                      <button onClick={() => alert(`Editing ${news.title}...`)} className="text-blue-600 hover:text-blue-800 text-sm font-semibold">✏️ Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Event Creation Modal */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🎉 Create New Event</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Event Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Venue</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={newEvent.venue}
                    onChange={(e) => setNewEvent({...newEvent, venue: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 h-20"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button onClick={() => setShowEventModal(false)} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={handleCreateEvent} className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700">
                  Create Event
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Communication Modal */}
        {showCommModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📢 Send Communication</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    value={newComm.title}
                    onChange={(e) => setNewComm({...newComm, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    value={newComm.type}
                    onChange={(e) => setNewComm({...newComm, type: e.target.value})}
                  >
                    <option value="announcement">Announcement</option>
                    <option value="newsletter">Newsletter</option>
                    <option value="event-invite">Event Invitation</option>
                    <option value="urgent">Urgent Notice</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 h-32"
                    value={newComm.message}
                    onChange={(e) => setNewComm({...newComm, message: e.target.value})}
                    placeholder="Enter your message here..."
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button onClick={() => setShowCommModal(false)} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={handleSendCommunication} className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700">
                  Send Communication
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Add User Modal */}
        {showAddUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Add New User</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Graduation Year</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    value={newUser.graduationYear}
                    onChange={(e) => setNewUser({...newUser, graduationYear: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button onClick={() => setShowAddUser(false)} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={handleAddUser} className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700">
                  Add User
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'system' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">⚙️ System Configuration</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-blue-800 mb-3">📊 Database Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-semibold text-blue-700 mb-1">Current Database URI:</label>
                      <p className="text-sm text-gray-600 bg-white p-2 rounded border">{dbUri}</p>
                    </div>
                    <button onClick={() => setShowDbConfig(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
                      🔧 Configure Database
                    </button>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-bold text-green-800 mb-3">🔄 System Actions</h3>
                  <div className="space-y-2">
                    <button onClick={() => alert('System backup initiated!')} className="w-full bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700">
                      💾 Create Backup
                    </button>
                    <button onClick={() => alert('Cache cleared!')} className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-700">
                      🗑️ Clear Cache
                    </button>
                    <button onClick={() => handleSystemAction('System Restart')} className="w-full bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700">
                      🔄 Restart System
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4">📄 System Logs</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {systemLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-semibold text-gray-800">{log.action}</span>
                        <span className="text-sm text-gray-600 ml-2">by {log.user}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">{log.timestamp}</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          log.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {log.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Database Configuration Modal */}
        {showDbConfig && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🔧 Database Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Database URI</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-20"
                    value={dbUri}
                    onChange={(e) => setDbUri(e.target.value)}
                    placeholder="postgresql://user:password@localhost:5432/alumni_db"
                  />
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Supported Databases:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• PostgreSQL: <code>postgresql://user:pass@host:5432/db</code></li>
                    <li>• MySQL: <code>mysql://user:pass@host:3306/db</code></li>
                    <li>• SQLite: <code>sqlite:./database.db</code></li>
                  </ul>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button onClick={() => setShowDbConfig(false)} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={handleDbConfig} className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">
                  Update Database
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'communication' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">📢 Communication Center</h2>
                <button onClick={() => setShowCommModal(true)} className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700">
                  ➕ Send Communication
                </button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">{communications.length}</div>
                  <div className="text-sm text-blue-700">Total Sent</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">{communications.reduce((sum, c) => sum + c.recipients, 0)}</div>
                  <div className="text-sm text-green-700">Total Recipients</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">98%</div>
                  <div className="text-sm text-purple-700">Delivery Rate</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">Recent Communications</h3>
                {communications.length > 0 ? communications.map((comm) => (
                  <div key={comm.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">{comm.title}</h4>
                        <p className="text-sm text-gray-600">{comm.type} • {comm.recipients} recipients • {comm.timestamp}</p>
                        <p className="text-sm text-gray-500 mt-1">{comm.message.substring(0, 100)}...</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">{comm.status}</span>
                        <button onClick={() => alert('Viewing analytics...')} className="text-blue-600 hover:text-blue-800 text-sm font-semibold">📊 Analytics</button>
                      </div>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-500 text-center py-8">No communications sent yet. Send your first message!</p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4">📈 User Growth Trends</h3>
                <div className="space-y-3">
                  {analytics.userGrowth && analytics.userGrowth.map((count, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Week {i + 1}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: `${(count/500)*100}%`}}></div>
                        </div>
                        <span className="text-sm font-semibold text-blue-600">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4">💰 Donation Analytics</h3>
                <div className="space-y-3">
                  {analytics.donationTrends && analytics.donationTrends.map((amount, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Month {i + 1}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{width: `${(amount/300000)*100}%`}}></div>
                        </div>
                        <span className="text-sm font-semibold text-green-600">₹{(amount/1000).toFixed(0)}K</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4">🌍 Top Locations</h3>
                <div className="space-y-3">
                  {analytics.topLocations && analytics.topLocations.map((loc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold text-gray-800">{loc.city}</span>
                      <span className="text-blue-600 font-bold">{loc.count} alumni</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4">🏢 Top Companies</h3>
                <div className="space-y-3">
                  {analytics.topCompanies && analytics.topCompanies.map((comp, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold text-gray-800">{comp.company}</span>
                      <span className="text-purple-600 font-bold">{comp.count} alumni</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'financial' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">₹{(donations.reduce((sum, d) => sum + d.amount, 0)/100000).toFixed(1)}L</div>
                <div className="text-sm text-green-700">Total Donations</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{donations.filter(d => d.status === 'Completed').length}</div>
                <div className="text-sm text-blue-700">Completed</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-600">{donations.filter(d => d.status === 'Pending').length}</div>
                <div className="text-sm text-yellow-700">Pending</div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">💰 Donation Management</h2>
              <div className="space-y-4">
                {donations.map((donation) => (
                  <div key={donation.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">{donation.donor}</h4>
                        <p className="text-sm text-gray-600">₹{donation.amount.toLocaleString()} • {donation.category} • {donation.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          donation.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          donation.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {donation.status}
                        </span>
                        {donation.status === 'Pending' && (
                          <>
                            <button onClick={() => handleDonationAction(donation.id, 'approve')} className="text-green-600 hover:text-green-800 text-sm font-semibold">✅ Approve</button>
                            <button onClick={() => handleDonationAction(donation.id, 'reject')} className="text-red-600 hover:text-red-800 text-sm font-semibold">❌ Reject</button>
                          </>
                        )}
                        <button onClick={() => alert('Generating tax certificate...')} className="text-blue-600 hover:text-blue-800 text-sm font-semibold">📄 Certificate</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Add other tabs content here... */}
      </div>
    </div>
  );
}