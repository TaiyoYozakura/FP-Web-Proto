'use client';

import { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useApp } from '@/contexts/AppContext';

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ year: '', location: '' });
  const [connections, setConnections] = useState<string[]>([]);
  interface AlumniData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    graduationYear: string;
    position?: string;
    company?: string;
    location?: string;
  }

  const [dbAlumni, setDbAlumni] = useState<AlumniData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const { state } = useApp();

  useEffect(() => {
    fetchAlumniFromDB();
  }, []);

  const fetchAlumniFromDB = async () => {
    try {
      const response = await fetch('/api/alumni');
      if (response.ok) {
        const data = await response.json();
        setDbAlumni(data.alumni || []);
        setError('');
      } else {
        throw new Error('Failed to fetch alumni data');
      }
    } catch (error) {
      setError('Database unavailable - using sample data');
      setDbAlumni([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Use database data if available, otherwise fallback to hardcoded data
  const alumniData = dbAlumni.length > 0 ? dbAlumni : state.alumni;

  const filteredAlumni = useMemo(() => {
    return alumniData.filter(person => {
      const matchesSearch = !searchTerm || 
        `${person.firstName} ${person.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (person.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (person.position || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesYear = !filters.year || person.graduationYear === filters.year;
      const matchesLocation = !filters.location || 
        (person.location || '').toLowerCase().includes(filters.location.toLowerCase());
      
      return matchesSearch && matchesYear && matchesLocation;
    });
  }, [alumniData, searchTerm, filters]);
  
  const handleConnect = (personId: string) => {
    setConnections(prev => [...prev, personId]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-theme-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-primary mx-auto"></div>
            <p className="mt-4 text-theme-secondary">Loading alumni directory...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <div className="lg:w-64 space-y-4 lg:space-y-6">
            <div className="card p-4 sm:p-6">
              <h3 className="font-bold text-theme-primary mb-4 lg:mb-6 text-base lg:text-lg">Filter Alumni</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-theme-primary mb-2">Graduation Year</label>
                  <select className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-theme rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-theme-primary bg-theme-surface text-theme-primary text-sm lg:text-base" value={filters.year} onChange={(e) => setFilters({...filters, year: e.target.value})}>
                    <option value="">All Years</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-theme-primary mb-2">Location</label>
                  <input type="text" placeholder="City or Country" className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-theme rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-theme-primary bg-theme-surface text-theme-primary text-sm lg:text-base" value={filters.location} onChange={(e) => setFilters({...filters, location: e.target.value})} />
                </div>
                <button 
                  onClick={() => {
                    // Filters are applied automatically via useMemo
                  }}
                  className="btn w-full bg-theme-primary text-white py-2 lg:py-3 rounded-lg font-semibold hover:bg-theme-primary-hover text-sm lg:text-base"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="mb-6 lg:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-theme-primary mb-4">Alumni Directory</h1>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input 
                  type="text" 
                  placeholder="Search alumni by name, company, or position..." 
                  className="flex-1 px-3 lg:px-4 py-2 lg:py-3 border border-theme rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-theme-primary bg-theme-surface text-theme-primary text-sm lg:text-lg" 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-theme-secondary text-sm lg:text-lg">Showing {filteredAlumni.length} alumni</p>
                <div className="flex items-center space-x-2">
                  {error && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                      {error}
                    </span>
                  )}
                  {dbAlumni.length > 0 && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      Database Connected
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
              {filteredAlumni.map((person) => (
                <div key={person.id} className="card p-4 lg:p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center space-x-3 lg:space-x-4 mb-4 lg:mb-6">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-theme-primary rounded-full flex items-center justify-center text-white text-lg lg:text-xl font-bold">
                      {person.firstName[0]}{person.lastName[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-theme-primary text-base lg:text-lg truncate">{person.firstName} {person.lastName}</h3>
                      <p className="text-theme-secondary text-sm lg:text-base">Class of {person.graduationYear}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4 lg:mb-6">
                    <p className="text-theme-primary font-semibold text-sm lg:text-base">{person.position || 'Position not specified'}</p>
                    <p className="text-theme-secondary text-sm lg:text-base">{person.company || 'Company not specified'}</p>
                    <p className="text-theme-secondary text-sm lg:text-base">{person.location || 'Location not specified'}</p>
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
                    <button className="flex-1 border border-theme text-theme-primary py-2 rounded-lg font-semibold hover:bg-theme-background transition-colors text-xs lg:text-sm">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {filteredAlumni.length === 0 && (
              <div className="text-center py-12">
                <p className="text-theme-secondary text-lg">No alumni found matching your criteria.</p>
              </div>
            )}
            <div className="flex justify-center mt-8 lg:mt-12">
              <div className="flex gap-1 lg:gap-2">
                <button className="px-3 lg:px-4 py-2 border border-theme rounded-lg hover:bg-theme-background text-sm lg:text-base">Previous</button>
                <button className="px-3 lg:px-4 py-2 bg-theme-primary text-white rounded-lg text-sm lg:text-base">1</button>
                <button className="px-3 lg:px-4 py-2 border border-theme rounded-lg hover:bg-theme-background text-sm lg:text-base">2</button>
                <button className="px-3 lg:px-4 py-2 border border-theme rounded-lg hover:bg-theme-background text-sm lg:text-base">3</button>
                <button className="px-3 lg:px-4 py-2 border border-theme rounded-lg hover:bg-theme-background text-sm lg:text-base">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}