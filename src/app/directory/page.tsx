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
    <div className="min-h-screen bg-theme-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 space-y-6">
            <div className="card p-6">
              <h3 className="font-bold text-theme-primary mb-6 text-lg">Filter Alumni</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-theme-primary mb-2">Graduation Year</label>
                  <select className="w-full px-4 py-3 border border-theme rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-theme-primary bg-theme-surface text-theme-primary" value={filters.year} onChange={(e) => setFilters({...filters, year: e.target.value})}>
                    <option value="">All Years</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-theme-primary mb-2">Location</label>
                  <input type="text" placeholder="City or Country" className="w-full px-4 py-3 border border-theme rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-theme-primary bg-theme-surface text-theme-primary" value={filters.location} onChange={(e) => setFilters({...filters, location: e.target.value})} />
                </div>
                <button 
                  onClick={() => {
                    // Filters are applied automatically via useMemo
                  }}
                  className="btn w-full bg-theme-primary text-white py-3 rounded-lg font-semibold hover:bg-theme-primary-hover"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-theme-primary mb-4">Alumni Directory</h1>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input 
                  type="text" 
                  placeholder="Search alumni by name, company, or position..." 
                  className="flex-1 px-4 py-3 border border-theme rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-theme-primary bg-theme-surface text-theme-primary text-lg" 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
              <p className="text-theme-secondary mb-6 text-lg">Showing {filteredAlumni.length} alumni</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAlumni.map((person) => (
                <div key={person.id} className="card p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-theme-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {person.firstName[0]}{person.lastName[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-theme-primary text-lg">{person.firstName} {person.lastName}</h3>
                      <p className="text-theme-secondary">Class of {person.graduationYear}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <p className="text-theme-primary font-semibold">{person.position || 'Position not specified'}</p>
                    <p className="text-theme-secondary">{person.company || 'Company not specified'}</p>
                    <p className="text-theme-secondary">{person.location || 'Location not specified'}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button 
                      onClick={() => handleConnect(person.id)}
                      disabled={connections.includes(person.id)}
                      className={`flex-1 py-2 rounded-lg font-semibold transition-colors text-xs lg:text-sm ${
                        connections.includes(person.id) 
                          ? 'bg-green-600 text-white cursor-not-allowed' 
                          : 'bg-theme-primary text-white hover:bg-theme-primary-hover'
                      }`}
                    >
                      {connections.includes(person.id) ? 'Connected' : 'Connect'}
                    </button>
                    <button className="flex-1 border border-theme text-theme-primary py-2 rounded-lg font-semibold hover:bg-theme-background transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-theme rounded-lg hover:bg-theme-background">Previous</button>
                <button className="px-4 py-2 bg-theme-primary text-white rounded-lg">1</button>
                <button className="px-4 py-2 border border-theme rounded-lg hover:bg-theme-background">2</button>
                <button className="px-4 py-2 border border-theme rounded-lg hover:bg-theme-background">3</button>
                <button className="px-4 py-2 border border-theme rounded-lg hover:bg-theme-background">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}