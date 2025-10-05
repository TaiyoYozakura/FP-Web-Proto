'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Calendar, MapPin, Clock, Users as UsersIcon, CheckCircle } from 'lucide-react';

const EventCard = ({ event, isRegistered, onRegister, onCancel }: any) => (
  <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all">
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            event.type === 'Reunion' ? 'bg-purple-100 text-purple-700' :
            event.type === 'Workshop' ? 'bg-blue-100 text-blue-700' :
            'bg-green-100 text-green-700'
          }`}>{event.type}</span>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <UsersIcon className="w-4 h-4 text-blue-600" />
            <span>{event.attendees}</span>
          </div>
        </div>
      </div>
      
      {isRegistered && (
        <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
          <CheckCircle className="w-3 h-3" />
          <span>Registered</span>
        </div>
      )}
    </div>
    
    <p className="text-gray-700 text-sm mb-4 leading-relaxed">{event.description}</p>
    
    <div className="flex flex-wrap gap-2 mb-4">
      {event.highlights.map((h: string, i: number) => (
        <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs border border-blue-200">
          {h}
        </span>
      ))}
    </div>
    
    <div className="flex gap-2">
      <button 
        onClick={() => isRegistered ? onCancel(event.id) : onRegister(event.id)}
        className={`flex-1 px-4 py-2.5 rounded-xl font-semibold transition-all active:scale-95 ${
          isRegistered 
            ? 'bg-green-600 text-white hover:bg-green-700' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
        }`}
      >
        {isRegistered ? '✓ Registered' : 'Register Now'}
      </button>
      {isRegistered && (
        <button onClick={() => onCancel(event.id)} className="px-4 py-2.5 rounded-xl font-semibold border-2 border-red-300 text-red-600 hover:bg-red-50 active:scale-95 transition-all">
          Cancel
        </button>
      )}
    </div>
  </div>
);

export default function EventsPage() {
  const [registered, setRegistered] = useState<string[]>([]);
  const [tab, setTab] = useState('upcoming');

  const events = [
    {
      id: '1',
      title: 'Annual Alumni Meet 2024',
      date: 'December 15, 2024',
      time: '10:00 AM - 6:00 PM',
      location: 'Dnyanasadhana College Campus, Thane',
      type: 'Reunion',
      description: 'Join us for our biggest alumni gathering! Reconnect with classmates, enjoy cultural programs, and celebrate 60 years of excellence.',
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
      highlights: ['Professional Networking', 'Industry Discussions', 'Dinner', 'Business Exchange']
    }
  ];

  const tabs = [
    { key: 'upcoming', label: 'Upcoming', icon: '🔥', count: '9' },
    { key: 'past', label: 'Past', icon: '📅', count: '25' },
    { key: 'my-events', label: 'My Events', icon: '⭐', count: '3' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 text-white rounded-2xl p-6 mb-6 shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <img src="https://www.dnyanasadhanacollege.org/images/logo/logo-final.png" alt="Logo" className="w-12 h-12 drop-shadow-lg" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Alumni Events</h1>
              <p className="text-sm opacity-90">Dnyanasadhana College</p>
            </div>
          </div>
          <p className="text-base mb-3">Connect, Network, and Celebrate</p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">📅 {events.length} Events</span>
            <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">🎆 Reunions</span>
            <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">🎓 60+ Years</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-6 scrollbar-hide">
          {tabs.map(t => (
            <button 
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all whitespace-nowrap active:scale-95 ${
                tab === t.key 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:text-blue-600 shadow-md'
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                tab === t.key ? 'bg-white/20' : 'bg-blue-100 text-blue-600'
              }`}>{t.count}</span>
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {events.map(event => (
            <EventCard 
              key={event.id}
              event={event}
              isRegistered={registered.includes(event.id)}
              onRegister={(id: string) => setRegistered([...registered, id])}
              onCancel={(id: string) => setRegistered(registered.filter(r => r !== id))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
