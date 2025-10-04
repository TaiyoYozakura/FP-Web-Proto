'use client';

import { useState, useEffect } from 'react';

export default function LiveActivityFeed() {
  const [activities, setActivities] = useState([]);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;

    const generateActivity = () => {
      const activityTypes = [
        { type: 'join', icon: '🎉', color: 'text-green-600', templates: ['joined the network', 'completed profile', 'verified account'] },
        { type: 'job', icon: '💼', color: 'text-blue-600', templates: ['got promoted to', 'joined as', 'started working at'] },
        { type: 'achievement', icon: '🏆', color: 'text-yellow-600', templates: ['won award at', 'got featured in', 'achieved milestone'] },
        { type: 'event', icon: '📅', color: 'text-purple-600', templates: ['registered for', 'attended', 'organized'] }
      ];

      const names = ['Rajesh S.', 'Priya M.', 'Amit K.', 'Sneha P.', 'Rohit T.', 'Kavya R.'];
      const companies = ['Google', 'Microsoft', 'TCS', 'Infosys', 'Amazon', 'Flipkart'];
      const events = ['Alumni Meet 2024', 'Tech Conference', 'Networking Event'];

      const activity = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      const name = names[Math.floor(Math.random() * names.length)];
      
      let message = '';
      if (activity.type === 'job') {
        message = `${activity.templates[Math.floor(Math.random() * activity.templates.length)]} ${companies[Math.floor(Math.random() * companies.length)]}`;
      } else if (activity.type === 'event') {
        message = `${activity.templates[Math.floor(Math.random() * activity.templates.length)]} ${events[Math.floor(Math.random() * events.length)]}`;
      } else {
        message = activity.templates[Math.floor(Math.random() * activity.templates.length)];
      }

      return {
        id: Date.now(),
        name,
        message,
        icon: activity.icon,
        color: activity.color,
        time: 'Just now'
      };
    };

    const interval = setInterval(() => {
      const newActivity = generateActivity();
      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
    }, 3000);

    // Initial activities
    setActivities([generateActivity(), generateActivity(), generateActivity()]);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <span className="text-2xl mr-3">📡</span>
          <h3 className="text-xl font-bold text-gray-800">Live Alumni Activity</h3>
          <div className="ml-3 flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="ml-2 text-sm text-green-600 font-semibold">LIVE</span>
          </div>
        </div>
        <button
          onClick={() => setIsLive(!isLive)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            isLive ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          {isLive ? '⏸️ Pause' : '▶️ Resume'}
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-500 ${
              index === 0 ? 'bg-blue-50 border border-blue-200 animate-fadeInUp' : 'hover:bg-gray-50'
            }`}
          >
            <div className="text-2xl">{activity.icon}</div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold text-gray-800">{activity.name}</span>
                <span className="text-gray-600 ml-1">{activity.message}</span>
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
            <div className={`text-xs font-bold ${activity.color}`}>
              {index === 0 ? 'NEW' : ''}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          🔥 {activities.length} activities in the last few minutes
        </p>
      </div>
    </div>
  );
}