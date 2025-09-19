'use client';

import { useState, useEffect } from 'react';

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New job posting: Software Engineer at TCS', time: '2m ago', unread: true },
    { id: 2, text: 'Alumni Meet registration is now open', time: '1h ago', unread: true },
    { id: 3, text: 'Your profile was viewed by 5 people', time: '3h ago', unread: false }
  ]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  useEffect(() => {
    // Simulate real-time notifications
    const timer = setInterval(() => {
      const newNotifications = [
        'New connection request from Rahul Sharma',
        'Event reminder: Tech Talk tomorrow',
        'Your donation receipt is ready',
        'New message from Alumni Committee'
      ];
      
      const randomNotif = newNotifications[Math.floor(Math.random() * newNotifications.length)];
      const newId = Date.now();
      
      setNotifications(prev => [
        { id: newId, text: randomNotif, time: 'now', unread: true },
        ...prev.slice(0, 4)
      ]);
      setUnreadCount(prev => prev + 1);
    }, 30000); // New notification every 30 seconds

    return () => clearInterval(timer);
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    setUnreadCount(0);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-theme-primary hover:text-theme-secondary transition-colors hover-border rounded-lg"
        suppressHydrationWarning={true}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM12.01 2.011a3.2 3.2 0 013.2 3.2c0 3.3-1.5 6.2-1.5 6.2s-1.5-2.9-1.5-6.2a3.2 3.2 0 011.8-3.2zM8 21.5A1.5 1.5 0 009.5 20h5a1.5 1.5 0 001.5 1.5 1.5 1.5 0 00-1.5 1.5h-5A1.5 1.5 0 008 21.5z" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
          <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-theme-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM12.01 2.011a3.2 3.2 0 013.2 3.2c0 3.3-1.5 6.2-1.5 6.2s-1.5-2.9-1.5-6.2a3.2 3.2 0 011.8-3.2z" />
              </svg>
              <h3 className="font-semibold text-theme-primary text-lg">Notifications</h3>
            </div>
            <button
              onClick={markAllRead}
              className="text-sm text-theme-secondary hover:text-theme-primary font-medium transition-colors"
              suppressHydrationWarning={true}
            >
              Mark all read
            </button>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                  notif.unread ? 'bg-blue-50 border-l-4 border-l-theme-primary' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${notif.unread ? 'bg-theme-primary' : 'bg-gray-300'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-theme-primary font-medium leading-relaxed">{notif.text}</p>
                    <p className="text-xs text-theme-secondary mt-2">{notif.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 text-center bg-gray-50 border-t border-gray-200">
            <button className="text-sm text-theme-primary hover:text-theme-secondary font-medium transition-colors">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}