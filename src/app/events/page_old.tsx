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
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <div className="flex items-center mb-3 sm:mb-4">
            <img src="https://www.dnyanasadhanacollege.org/images/logo/logo-final.png" alt="Dnyanasadhana College" className="w-10 h-10 sm:w-12 sm:h-12 mr-3 sm:mr-4" />
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Alumni Events</h1>
              <p className="text-sm sm:text-base md:text-lg opacity-90">Dnyanasadhana College</p>
            </div>
          </div>
          <p className="text-base sm:text-lg md:text-xl mb-3 sm:mb-4">Connect, Network, and Celebrate</p>
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">📅 {filteredEvents.length} Events</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">🎆 Reunions</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">🎓 60+ Years</span>
          </div>
        </div>
        <div className="flex overflow-x-auto gap-2 mb-6 sm:mb-8 bg-white rounded-xl p-2 shadow-lg border border-gray-100 scrollbar-hide">
          {[
            { key: 'upcoming', label: 'Upcoming', icon: '🔥', count: '9' },
            { key: 'past', label: 'Past', icon: '📅', count: '25' },
            { key: 'my-events', label: 'My Events', icon: '⭐', count: '3' }
          ].map((tab) => (
            <button 
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 whitespace-nowrap ${
                activeTab === tab.key 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="text-sm sm:text-base">{tab.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                activeTab === tab.key ? 'bg-white/20' : 'bg-blue-100 text-blue-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Sample Dnyanasadhana Events */}
            {[
              {
                id: '1',
                title: 'Annual Alumni Meet 2024',
                date: 'December 15, 2024',
                time: '10:00 AM - 6:00 PM',
                location: 'Dnyanasadhana College Campus, Thane',
                type: 'Reunion',
                description: 'Join us for our biggest alumni gathering of the year! Reconnect with classmates, enjoy cultural programs, and celebrate 60 years of excellence.',
                attendees: '500+',
                highlights: ['Cultural Programs', 'Awards Ceremony', 'Networking Lunch', 'Campus Tour']
              },
              {
                id: '2', 
                title: 'Commerce Career Conclave',
                date: 'January 20, 2025',
                time: '2:00 PM - 5:00 PM',
                location: 'Virtual + Campus Hybrid',
                type: 'Workshop',
                description: 'Expert sessions on modern commerce careers, fintech opportunities, and entrepreneurship by successful alumni.',
                attendees: '200+',
                highlights: ['Industry Insights', 'Career Guidance', 'Startup Stories', 'Q&A Sessions']
              },
              {
                id: '3',
                title: 'Mumbai Chapter Networking',
                date: 'February 10, 2025', 
                time: '7:00 PM - 9:00 PM',
                location: 'Hotel Taj, Mumbai',
                type: 'Networking',
                description: 'Exclusive networking evening for Mumbai-based alumni. Connect with professionals across industries.',
                attendees: '150+',
                highlights: ['Professional Networking', 'Industry Discussions', 'Dinner', 'Business Cards Exchange']
              }
            ].map((event) => (
              <div key={event.id} className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100">
                <div className="flex flex-col gap-3 mb-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-blue-600">{event.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        event.type === 'Reunion' ? 'bg-purple-100 text-purple-700' :
                        event.type === 'Workshop' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {event.type}
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <span className="text-blue-600 mr-2">📅</span>
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <span className="text-blue-600 mr-2">⏰</span>
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <span className="text-blue-600 mr-2">📍</span>
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <span className="text-blue-600 mr-2">👥</span>
                        {event.attendees} Expected
                      </div>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold self-start ${
                    isRegistered(event.id) ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {isRegistered(event.id) ? '✓ Registered' : 'Open Registration'}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">{event.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-blue-600 mb-2">Event Highlights:</h4>
                  <div className="flex flex-wrap gap-2">
                    {event.highlights.map((highlight, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button 
                    onClick={() => isRegistered(event.id) ? handleUnregister(event.id) : handleRegister(event.id)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                      isRegistered(event.id) 
                        ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                    }`}
                  >
                    {isRegistered(event.id) ? '✓ Registered' : 'Register Now'}
                  </button>
                  {isRegistered(event.id) && (
                    <button 
                      onClick={() => handleUnregister(event.id)}
                      className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all border-2 border-red-300 text-red-600 hover:bg-red-50 text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                  )}
                  <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all border-2 border-blue-300 text-blue-600 hover:bg-blue-50 text-sm sm:text-base">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            {/* Event Filters */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="font-bold text-blue-600 mb-6 text-lg flex items-center">
                <span className="text-blue-600 mr-2">🔍</span>
                Filter Events
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-blue-600 mb-3">Event Type</label>
                  <div className="space-y-3">
                    {[
                      { type: 'Reunion', icon: '🎆', count: '2' },
                      { type: 'Networking', icon: '🤝', count: '3' },
                      { type: 'Workshop', icon: '📚', count: '4' }
                    ].map(({type, icon, count}) => (
                      <label key={type} className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            className="rounded border-blue-300 text-blue-600 focus:ring-blue-500 mr-3" 
                            checked={selectedFilters.includes(type)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedFilters(prev => [...prev, type]);
                              } else {
                                setSelectedFilters(prev => prev.filter(f => f !== type));
                              }
                            }}
                          />
                          <span className="mr-2">{icon}</span>
                          <span className="text-gray-700">{type}</span>
                        </div>
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold">{count}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedFilters([])}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
              <h3 className="font-bold text-purple-700 mb-4 flex items-center">
                <span className="text-purple-600 mr-2">📊</span>
                Event Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-bold text-purple-600">5 Events</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Registrations</span>
                  <span className="font-bold text-purple-600">850+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Attendance</span>
                  <span className="font-bold text-purple-600">85%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}