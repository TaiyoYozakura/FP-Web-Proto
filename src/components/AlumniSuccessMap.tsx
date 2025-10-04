'use client';

import { useState, useEffect } from 'react';

interface AlumniData {
  id: string;
  name: string;
  company: string;
  position: string;
  location: string;
  country: string;
  batch: string;
  salary: string;
  success_score: number;
  privacy: {
    showLocation: boolean;
    showSalary: boolean;
    showCompany: boolean;
  };
}

export default function AlumniSuccessMap() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [alumniData, setAlumniData] = useState<AlumniData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  // Real alumni data simulation
  useEffect(() => {
    const loadAlumniData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockData: AlumniData[] = [
        { id: '1', name: 'Rajesh Sharma', company: 'Google', position: 'Senior SDE', location: 'Bangalore', country: 'India', batch: '2018', salary: '₹45L', success_score: 95, privacy: { showLocation: true, showSalary: false, showCompany: true } },
        { id: '2', name: 'Priya Mehta', company: 'Microsoft', position: 'Product Manager', location: 'Seattle', country: 'USA', batch: '2017', salary: '$120K', success_score: 92, privacy: { showLocation: true, showSalary: true, showCompany: true } },
        { id: '3', name: 'Amit Kumar', company: 'Amazon', position: 'Tech Lead', location: 'London', country: 'UK', batch: '2016', salary: '£85K', success_score: 88, privacy: { showLocation: false, showSalary: false, showCompany: true } },
        { id: '4', name: 'Sneha Patel', company: 'Meta', position: 'Data Scientist', location: 'San Francisco', country: 'USA', batch: '2019', salary: '$140K', success_score: 94, privacy: { showLocation: true, showSalary: false, showCompany: true } },
        { id: '5', name: 'Rohit Singh', company: 'Tesla', position: 'AI Engineer', location: 'Austin', country: 'USA', batch: '2020', salary: '$130K', success_score: 90, privacy: { showLocation: false, showSalary: false, showCompany: true } },
        { id: '6', name: 'Kavya Nair', company: 'Shopify', position: 'Full Stack Dev', location: 'Toronto', country: 'Canada', batch: '2018', salary: 'C$95K', success_score: 87, privacy: { showLocation: true, showSalary: true, showCompany: true } },
        { id: '7', name: 'Arjun Reddy', company: 'Atlassian', position: 'DevOps Lead', location: 'Sydney', country: 'Australia', batch: '2017', salary: 'A$110K', success_score: 89, privacy: { showLocation: true, showSalary: false, showCompany: true } },
        { id: '8', name: 'Neha Gupta', company: 'SAP', position: 'Solution Architect', location: 'Munich', country: 'Germany', batch: '2015', salary: '€75K', success_score: 86, privacy: { showLocation: false, showSalary: false, showCompany: true } }
      ];
      
      setAlumniData(mockData);
      setIsLoading(false);
    };
    
    loadAlumniData();
  }, []);

  const countryStats = alumniData.reduce((acc, alumni) => {
    if (!acc[alumni.country]) {
      acc[alumni.country] = { count: 0, avgSuccess: 0, topCompanies: new Set(), cities: new Set() };
    }
    acc[alumni.country].count++;
    acc[alumni.country].avgSuccess += alumni.success_score;
    
    // Only add company/location if user allows
    if (alumni.privacy.showCompany) {
      acc[alumni.country].topCompanies.add(alumni.company);
    }
    if (alumni.privacy.showLocation) {
      acc[alumni.country].cities.add(alumni.location);
    }
    return acc;
  }, {} as any);

  Object.keys(countryStats).forEach(country => {
    countryStats[country].avgSuccess = Math.round(countryStats[country].avgSuccess / countryStats[country].count);
    countryStats[country].topCompanies = Array.from(countryStats[country].topCompanies);
    countryStats[country].cities = Array.from(countryStats[country].cities);
  });

  const filteredAlumni = selectedCountry 
    ? alumniData.filter(a => a.country === selectedCountry)
    : alumniData;

  const getCountryColor = (country: string) => {
    const colors = {
      'India': 'bg-blue-500',
      'USA': 'bg-green-500', 
      'UK': 'bg-purple-500',
      'Canada': 'bg-red-500',
      'Australia': 'bg-yellow-500',
      'Germany': 'bg-pink-500'
    };
    return colors[country] || 'bg-gray-500';
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6 w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3].map(i => <div key={i} className="h-20 bg-gray-200 rounded"></div>)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <span className="text-2xl mr-3">🌍</span>
          <h3 className="text-2xl font-bold text-blue-800">Global Alumni Success Network</h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('map')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              viewMode === 'map' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🗺️ Map View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📋 List View
          </button>
        </div>
      </div>

      {viewMode === 'map' ? (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Interactive World Map */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 h-96 flex items-center justify-center border-2 border-dashed border-blue-300 relative overflow-hidden">
              <div className="text-center z-10">
                <div className="text-8xl mb-4">🗺️</div>
                <p className="text-blue-600 font-bold text-lg">Alumni Success Network</p>
                <p className="text-sm text-gray-600 mt-2">Privacy-first alumni mapping</p>
                <div className="mt-3 bg-white/80 rounded-lg p-2">
                  <p className="text-xs text-gray-600">
                    🔒 Only showing data with user consent
                  </p>
                </div>
              </div>
              
              {/* Floating Success Indicators */}
              <div className="absolute top-4 left-4 space-y-2">
                {Object.entries(countryStats).slice(0, 3).map(([country, stats]: [string, any]) => (
                  <div
                    key={country}
                    className={`${getCountryColor(country)} text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform`}
                    onClick={() => setSelectedCountry(country)}
                  >
                    {country}: {stats.count} Alumni
                    <div className="text-xs opacity-90">Avg Success: {stats.avgSuccess}%</div>
                  </div>
                ))}
              </div>

              {/* Success Metrics */}
              <div className="absolute bottom-4 right-4 bg-white rounded-lg p-3 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{alumniData.length}</div>
                  <div className="text-xs text-gray-600">Total Alumni</div>
                </div>
              </div>
            </div>
          </div>

          {/* Country Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-gray-800 text-lg">🏆 Success by Country</h4>
              {selectedCountry && (
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                >
                  ← Back to All
                </button>
              )}
            </div>
            
            <div className="max-h-80 overflow-y-auto space-y-3">
              {Object.entries(countryStats)
                .sort(([,a]: [string, any], [,b]: [string, any]) => b.avgSuccess - a.avgSuccess)
                .map(([country, stats]: [string, any]) => (
                <div
                  key={country}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedCountry === country 
                      ? 'border-blue-500 bg-blue-50 shadow-lg' 
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedCountry(selectedCountry === country ? null : country)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-bold text-gray-800 flex items-center">
                      <span className={`w-3 h-3 ${getCountryColor(country)} rounded-full mr-2`}></span>
                      {country}
                    </h5>
                    <div className="text-right">
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                        {stats.avgSuccess}% Success
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Alumni Count:</span>
                      <span className="font-semibold ml-2">{stats.count}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Cities:</span>
                      <span className="font-semibold ml-2">{stats.cities.length}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="text-xs text-gray-600 mb-1">Top Companies:</div>
                    <div className="flex flex-wrap gap-1">
                      {stats.topCompanies.slice(0, 3).map((company: string, i: number) => (
                        <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-gray-800 text-lg">📋 Alumni Success Stories</h4>
            <div className="text-sm text-gray-600">
              Showing {filteredAlumni.length} alumni {selectedCountry && `in ${selectedCountry}`}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAlumni
              .sort((a, b) => b.success_score - a.success_score)
              .map((alumni) => (
              <div key={alumni.id} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {alumni.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-3">
                      <h5 className="font-bold text-gray-800 text-sm">{alumni.name}</h5>
                      <p className="text-xs text-gray-600">Batch {alumni.batch}</p>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                    {alumni.success_score}%
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <span className="text-blue-600 font-semibold">
                      {alumni.privacy.showCompany ? alumni.company : 'Company Hidden'}
                    </span>
                  </div>
                  <div className="text-gray-700">{alumni.position}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                      📍 {alumni.privacy.showLocation ? alumni.location : 'Location Private'}
                    </span>
                    <span className="font-bold text-green-600">
                      {alumni.privacy.showSalary ? alumni.salary : 'Salary Private'}
                    </span>
                  </div>
                </div>
                
                {(!alumni.privacy.showLocation || !alumni.privacy.showSalary) && (
                  <div className="mt-2 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                    🔒 Some details are private as per user preference
                  </div>
                )}
                
                <button className="w-full mt-3 bg-blue-50 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-100 transition-colors text-sm">
                  Connect & Learn
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}