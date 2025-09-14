'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useApp } from '@/contexts/AppContext';

export default function EventsPage() {
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const { state } = useApp();
  
  const handleRegister = (eventId: string) => {
    setRegisteredEvents(prev => [...prev, eventId]);
  };
  
  const handleUnregister = (eventId: string) => {
    setRegisteredEvents(prev => prev.filter(id => id !== eventId));
  };
  
  const isRegistered = (eventId: string) => registeredEvents.includes(eventId);
  
  const filteredEvents = state.events.filter(event => {
    if (selectedFilters.length === 0) return true;
    return selectedFilters.includes(event.type);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-4">Alumni Events</h1>
        <p className="text-gray-600 mb-6 lg:mb-8">Showing {filteredEvents.length} events</p>
        <div className="flex flex-wrap gap-1 mb-6 lg:mb-8 bg-white rounded-lg p-1 shadow-sm w-fit">
          {['upcoming', 'past', 'my-events'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 lg:px-6 py-2 rounded-md font-semibold text-sm lg:text-base transition-colors ${
                activeTab === tab ? 'bg-red-600 text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              {tab === 'upcoming' ? 'Upcoming' : tab === 'past' ? 'Past Events' : 'My Events'}
            </button>
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            {filteredEvents.map((event) => (
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
                    isRegistered(event.id) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {isRegistered(event.id) ? 'Registered' : 'Open'}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 text-sm lg:text-base">Join us for an amazing gathering of alumni...</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => isRegistered(event.id) ? handleUnregister(event.id) : handleRegister(event.id)}
                    className={`px-4 lg:px-6 py-2 rounded-lg font-semibold transition-colors text-sm lg:text-base ${
                      isRegistered(event.id) 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    {isRegistered(event.id) ? 'Registered ✓' : 'Register Now'}
                  </button>
                  {isRegistered(event.id) && (
                    <button 
                      onClick={() => handleUnregister(event.id)}
                      className="px-4 lg:px-6 py-2 rounded-lg font-semibold transition-colors text-sm lg:text-base border border-red-600 text-red-600 hover:bg-red-50"
                    >
                      Cancel
                    </button>
                  )}
                </div>
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
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                          checked={selectedFilters.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFilters(prev => [...prev, type]);
                            } else {
                              setSelectedFilters(prev => prev.filter(f => f !== type));
                            }
                          }}
                        />
                        <span className="ml-2 text-gray-600 text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedFilters([])}
                  className="w-full bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-sm"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}