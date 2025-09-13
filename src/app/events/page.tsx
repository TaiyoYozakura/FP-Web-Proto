'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function EventsPage() {

  const events = [
    { id: 1, title: 'Annual Alumni Meet 2024', date: 'Dec 15, 2024', location: 'College Campus', type: 'Reunion', registered: false },
    { id: 2, title: 'Tech Networking Evening', date: 'Jan 20, 2025', location: 'Mumbai', type: 'Networking', registered: true },
    { id: 3, title: 'Career Workshop', date: 'Feb 10, 2025', location: 'Online', type: 'Workshop', registered: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Image src="/SAC-header.png" alt="St Andrews College" width={40} height={40} className="rounded-full" />
              <h1 className="text-xl font-bold text-black">St Andrews Alumni Portal</h1>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-600 hover:text-black">Dashboard</Link>
              <Link href="/directory" className="text-gray-600 hover:text-black">Directory</Link>
              <Link href="/events" className="text-red-600 font-semibold">Events</Link>
              <Link href="/jobs" className="text-gray-600 hover:text-black">Jobs</Link>
              <Link href="/news" className="text-gray-600 hover:text-black">News</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-black mb-8">Alumni Events</h1>

        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm w-fit">
          <button className="px-6 py-2 rounded-md font-semibold bg-red-600 text-white">Upcoming</button>
          <button className="px-6 py-2 rounded-md font-semibold text-gray-600 hover:text-black">Past Events</button>
          <button className="px-6 py-2 rounded-md font-semibold text-gray-600 hover:text-black">My Events</button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">{event.title}</h3>
                    <div className="space-y-1 text-gray-600">
                      <p>📅 {event.date}</p>
                      <p>📍 {event.location}</p>
                      <p>🏷️ {event.type}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    event.registered ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {event.registered ? 'Registered' : 'Open'}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">Join us for an amazing gathering of alumni...</p>
                <button className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  event.registered 
                    ? 'bg-gray-200 text-gray-600 cursor-not-allowed' 
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}>
                  {event.registered ? 'Registered' : 'Register Now'}
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-black mb-4">Filter Events</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Event Type</label>
                  <div className="space-y-2">
                    {['Reunion', 'Networking', 'Workshop'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                        <span className="ml-2 text-gray-600">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
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