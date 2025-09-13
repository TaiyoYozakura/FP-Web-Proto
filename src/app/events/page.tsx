'use client';

import Navbar from '@/components/Navbar';

export default function EventsPage() {
  const events = [
    { id: 1, title: 'Annual Alumni Meet 2024', date: 'Dec 15, 2024', location: 'College Campus', type: 'Reunion', registered: false },
    { id: 2, title: 'Tech Networking Evening', date: 'Jan 20, 2025', location: 'Mumbai', type: 'Networking', registered: true },
    { id: 3, title: 'Career Workshop', date: 'Feb 10, 2025', location: 'Online', type: 'Workshop', registered: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-6 lg:mb-8">Alumni Events</h1>
        <div className="flex flex-wrap gap-1 mb-6 lg:mb-8 bg-white rounded-lg p-1 shadow-sm w-fit">
          <button className="px-4 lg:px-6 py-2 rounded-md font-semibold bg-red-600 text-white text-sm lg:text-base">Upcoming</button>
          <button className="px-4 lg:px-6 py-2 rounded-md font-semibold text-gray-600 hover:text-black text-sm lg:text-base">Past Events</button>
          <button className="px-4 lg:px-6 py-2 rounded-md font-semibold text-gray-600 hover:text-black text-sm lg:text-base">My Events</button>
        </div>
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-sm p-4 lg:p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-black mb-2">{event.title}</h3>
                    <div className="space-y-1 text-gray-600 text-sm lg:text-base">
                      <p>📅 {event.date}</p>
                      <p>📍 {event.location}</p>
                      <p>🏷️ {event.type}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs lg:text-sm font-semibold self-start ${
                    event.registered ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {event.registered ? 'Registered' : 'Open'}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 text-sm lg:text-base">Join us for an amazing gathering of alumni...</p>
                <button className={`px-4 lg:px-6 py-2 rounded-lg font-semibold transition-colors text-sm lg:text-base ${
                  event.registered 
                    ? 'bg-gray-200 text-gray-600 cursor-not-allowed' 
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}>
                  {event.registered ? 'Registered' : 'Register Now'}
                </button>
              </div>
            ))}
          </div>
          <div className="space-y-4 lg:space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
              <h3 className="font-bold text-black mb-4 text-sm lg:text-base">Filter Events</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs lg:text-sm font-semibold text-black mb-2">Event Type</label>
                  <div className="space-y-2">
                    {['Reunion', 'Networking', 'Workshop'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                        <span className="ml-2 text-gray-600 text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}