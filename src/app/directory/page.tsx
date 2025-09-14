'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import { useApp } from '@/contexts/AppContext';

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ year: '', location: '' });
  const [connections, setConnections] = useState<string[]>([]);
  const { state } = useApp();

  const filteredAlumni = useMemo(() => {
    return state.alumni.filter(person => {
      const matchesSearch = !searchTerm || 
        `${person.firstName} ${person.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (person.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (person.position || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesYear = !filters.year || person.graduationYear === filters.year;
      const matchesLocation = !filters.location || 
        (person.location || '').toLowerCase().includes(filters.location.toLowerCase());
      
      return matchesSearch && matchesYear && matchesLocation;
    });
  }, [state.alumni, searchTerm, filters]);
  
  const handleConnect = (personId: string) => {
    setConnections(prev => [...prev, personId]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="lg:w-64 space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
              <h3 className="font-bold text-black mb-4 text-sm lg:text-base">Filter Alumni</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs lg:text-sm font-semibold text-black mb-2">Graduation Year</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm" value={filters.year} onChange={(e) => setFilters({...filters, year: e.target.value})}>
                    <option value="">All Years</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs lg:text-sm font-semibold text-black mb-2">Location</label>
                  <input type="text" placeholder="City or Country" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm" value={filters.location} onChange={(e) => setFilters({...filters, location: e.target.value})} />
                </div>
                <button 
                  onClick={() => {
                    // Filters are applied automatically via useMemo
                  }}
                  className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-4">Alumni Directory</h1>
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-6">
                <input 
                  type="text" 
                  placeholder="Search alumni by name, company, or position..." 
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm lg:text-base" 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
              <p className="text-gray-600 mb-4">Showing {filteredAlumni.length} alumni</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {filteredAlumni.map((person) => (
                <div key={person.id} className="bg-white rounded-lg shadow-sm p-4 lg:p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 lg:space-x-4 mb-4">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-sm lg:text-xl font-bold">
                      {person.firstName[0]}{person.lastName[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-black text-sm lg:text-lg">{person.firstName} {person.lastName}</h3>
                      <p className="text-gray-600 text-xs lg:text-sm">Class of {person.graduationYear}</p>
                    </div>
                  </div>
                  <div className="space-y-1 lg:space-y-2 mb-4">
                    <p className="text-black font-semibold text-sm lg:text-base">{person.position || 'Position not specified'}</p>
                    <p className="text-gray-600 text-xs lg:text-sm">{person.company || 'Company not specified'}</p>
                    <p className="text-gray-600 text-xs lg:text-sm">📍 {person.location || 'Location not specified'}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button 
                      onClick={() => handleConnect(person.id)}
                      disabled={connections.includes(person.id)}
                      className={`flex-1 py-2 rounded-lg font-semibold transition-colors text-xs lg:text-sm ${
                        connections.includes(person.id) 
                          ? 'bg-green-600 text-white cursor-not-allowed' 
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      {connections.includes(person.id) ? 'Connected' : 'Connect'}
                    </button>
                    <button className="flex-1 border border-gray-300 text-black py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-xs lg:text-sm">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6 lg:mt-8">
              <div className="flex flex-wrap justify-center gap-2">
                <button className="px-3 lg:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">Previous</button>
                <button className="px-3 lg:px-4 py-2 bg-red-600 text-white rounded-lg text-sm">1</button>
                <button className="px-3 lg:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">2</button>
                <button className="px-3 lg:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">3</button>
                <button className="px-3 lg:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}