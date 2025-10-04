'use client';

import { useState, useEffect } from 'react';
import { Bell, Check } from 'lucide-react';
// No HeroUI imports needed

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
    <div className="relative z-50">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-blue-600 hover:text-purple-600 transition-colors rounded-lg hover:bg-gray-100"
        suppressHydrationWarning
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-purple-600 rounded-full"></span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-[9999]">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-600 text-lg">Notifications</h3>
              </div>
              <button
                onClick={markAllRead}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
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
              <button className="text-sm text-blue-600 hover:text-purple-600 font-medium transition-colors">
                View all notifications
              </button>
            </div>
        </div>
      )}
    </div>
  );
}