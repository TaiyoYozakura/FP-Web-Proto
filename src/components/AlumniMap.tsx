'use client';

import { useState } from 'react';

export default function AlumniMap() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  const alumniData = {
    'India': { count: 8500, cities: ['Mumbai', 'Pune', 'Bangalore', 'Delhi'], color: 'bg-blue-500' },
    'USA': { count: 1200, cities: ['New York', 'San Francisco', 'Seattle'], color: 'bg-green-500' },
    'UK': { count: 800, cities: ['London', 'Manchester'], color: 'bg-purple-500' },
    'Canada': { count: 600, cities: ['Toronto', 'Vancouver'], color: 'bg-red-500' },
    'Australia': { count: 400, cities: ['Sydney', 'Melbourne'], color: 'bg-yellow-500' },
    'Germany': { count: 300, cities: ['Berlin', 'Munich'], color: 'bg-pink-500' }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center mb-6">
        <span className="text-2xl mr-3">🌍</span>
        <h3 className="text-xl font-bold text-blue-800">Global Alumni Network</h3>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="relative">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 h-80 flex items-center justify-center border-2 border-dashed border-blue-300">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <p className="text-blue-600 font-semibold">Interactive World Map</p>
              <p className="text-sm text-gray-600 mt-2">Click countries to explore alumni distribution</p>
            </div>
          </div>
          
          {/* Floating country bubbles */}
          <div className="absolute top-4 left-4 space-y-2">
            {Object.entries(alumniData).slice(0, 3).map(([country, data], i) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`${data.color} text-white px-3 py-1 rounded-full text-sm font-bold hover:scale-110 transition-transform shadow-lg`}
              >
                {country}: {data.count}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-bold text-gray-800">🏆 Top Alumni Destinations</h4>
          {Object.entries(alumniData).map(([country, data]) => (
            <div
              key={country}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                selectedCountry === country ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setSelectedCountry(country)}
            >
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-bold text-gray-800">{country}</h5>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                  {data.count} Alumni
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.cities.map((city, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    📍 {city}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}