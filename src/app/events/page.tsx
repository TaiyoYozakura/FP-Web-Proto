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
    <div className="min-h-screen bg-theme-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-theme-primary mb-4">Alumni Events</h1>
        <p className="text-theme-secondary mb-8 text-lg">Showing {filteredEvents.length} events</p>
        <div className="flex flex-wrap gap-1 mb-8 bg-theme-surface rounded-lg p-1 shadow-sm w-fit">
          {['upcoming', 'past', 'my-events'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                activeTab === tab ? 'bg-theme-primary text-white' : 'text-theme-secondary hover:text-theme-primary'
              }`}
            >
              {tab === 'upcoming' ? 'Upcoming' : tab === 'past' ? 'Past Events' : 'My Events'}
            </button>
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {filteredEvents.map((event) => (
              <div key={event.id} className="card p-6 hover:shadow-lg transition-all">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-theme-primary mb-2">{event.title}</h3>
                    <div className="space-y-1 text-theme-secondary">
                      <p>{event.date}</p>
                      <p>{event.location}</p>
                      <p>{event.type}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs lg:text-sm font-semibold self-start ${
                    isRegistered(event.id) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {isRegistered(event.id) ? 'Registered' : 'Open'}
                  </span>
                </div>
                <p className="text-theme-secondary mb-4">Join us for an amazing gathering of alumni...</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => isRegistered(event.id) ? handleUnregister(event.id) : handleRegister(event.id)}
                    className={`btn px-6 py-2 rounded-lg font-semibold transition-colors ${
                      isRegistered(event.id) 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-theme-primary text-white hover:bg-theme-primary-hover'
                    }`}
                  >
                    {isRegistered(event.id) ? 'Registered ✓' : 'Register Now'}
                  </button>
                  {isRegistered(event.id) && (
                    <button 
                      onClick={() => handleUnregister(event.id)}
                      className="btn px-6 py-2 rounded-lg font-semibold transition-colors border border-theme-primary text-theme-primary hover:bg-theme-background"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-bold text-theme-primary mb-6 text-lg">Filter Events</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-theme-primary mb-2">Event Type</label>
                  <div className="space-y-2">
                    {['Reunion', 'Networking', 'Workshop'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded border-theme text-theme-primary focus:ring-theme-primary" 
                          checked={selectedFilters.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFilters(prev => [...prev, type]);
                            } else {
                              setSelectedFilters(prev => prev.filter(f => f !== type));
                            }
                          }}
                        />
                        <span className="ml-2 text-theme-secondary">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedFilters([])}
                  className="btn w-full bg-theme-primary text-white py-3 rounded-lg font-semibold hover:bg-theme-primary-hover"
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