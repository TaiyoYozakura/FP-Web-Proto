'use client';

import { useState, useEffect, useMemo } from 'react';

interface Alumni {
  id: string;
  name: string;
  email: string;
  batch: string;
  course: string;
  company: string;
  position: string;
  location: string;
  skills: string[];
  experience: number;
  isOnline: boolean;
  lastActive: string;
  connections: number;
  profileViews: number;
  avatar?: string;
  privacy: {
    showEmail: boolean;
    showLocation: boolean;
    showCompany: boolean;
    showPhone: boolean;
  };
}

export default function DynamicAlumniDirectory() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [filteredAlumni, setFilteredAlumni] = useState<Alumni[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    batch: '',
    course: '',
    company: '',
    location: '',
    skills: '',
    experience: ''
  });
  const [sortBy, setSortBy] = useState<'name' | 'batch' | 'company' | 'connections' | 'views'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<Alumni[]>([]);

  // Load alumni data
  useEffect(() => {
    const loadAlumniData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const mockAlumni: Alumni[] = [
        {
          id: '1', name: 'Rajesh Sharma', email: 'rajesh@google.com', batch: '2018', course: 'B.Com',
          company: 'Google', position: 'Senior Software Engineer', location: 'Bangalore',
          skills: ['React', 'Node.js', 'Python', 'AWS'], experience: 6, isOnline: true,
          lastActive: '2 min ago', connections: 245, profileViews: 1250,
          privacy: { showEmail: false, showLocation: true, showCompany: true, showPhone: false }
        },
        {
          id: '2', name: 'Priya Mehta', email: 'priya@microsoft.com', batch: '2017', course: 'B.Sc IT',
          company: 'Microsoft', position: 'Product Manager', location: 'Seattle',
          skills: ['Product Strategy', 'Analytics', 'SQL', 'Figma'], experience: 7, isOnline: false,
          lastActive: '1 hour ago', connections: 189, profileViews: 890,
          privacy: { showEmail: true, showLocation: false, showCompany: true, showPhone: false }
        },
        {
          id: '3', name: 'Amit Kumar', email: 'amit@amazon.com', batch: '2016', course: 'B.Com',
          company: 'Amazon', position: 'Tech Lead', location: 'London',
          skills: ['Java', 'Microservices', 'Docker', 'Kubernetes'], experience: 8, isOnline: true,
          lastActive: 'Just now', connections: 312, profileViews: 1560,
          privacy: { showEmail: false, showLocation: false, showCompany: true, showPhone: false }
        },
        {
          id: '4', name: 'Sneha Patel', email: 'sneha@meta.com', batch: '2019', course: 'B.A Psychology',
          company: 'Meta', position: 'Data Scientist', location: 'San Francisco',
          skills: ['Python', 'Machine Learning', 'R', 'Tableau'], experience: 5, isOnline: true,
          lastActive: '5 min ago', connections: 156, profileViews: 720,
          privacy: { showEmail: true, showLocation: true, showCompany: true, showPhone: false }
        },
        {
          id: '5', name: 'Rohit Singh', email: 'rohit@tesla.com', batch: '2020', course: 'B.Sc Physics',
          company: 'Tesla', position: 'AI Engineer', location: 'Austin',
          skills: ['TensorFlow', 'PyTorch', 'Computer Vision', 'C++'], experience: 4, isOnline: false,
          lastActive: '3 hours ago', connections: 98, profileViews: 450,
          privacy: { showEmail: false, showLocation: false, showCompany: true, showPhone: false }
        },
        {
          id: '6', name: 'Kavya Nair', email: 'kavya@shopify.com', batch: '2018', course: 'B.Com',
          company: 'Shopify', position: 'Full Stack Developer', location: 'Toronto',
          skills: ['React', 'Ruby', 'GraphQL', 'PostgreSQL'], experience: 6, isOnline: true,
          lastActive: '1 min ago', connections: 203, profileViews: 980,
          privacy: { showEmail: true, showLocation: true, showCompany: true, showPhone: true }
        },
        {
          id: '7', name: 'Arjun Reddy', email: 'arjun@atlassian.com', batch: '2017', course: 'B.Sc CS',
          company: 'Atlassian', position: 'DevOps Lead', location: 'Sydney',
          skills: ['AWS', 'Jenkins', 'Terraform', 'Monitoring'], experience: 7, isOnline: false,
          lastActive: '2 hours ago', connections: 167, profileViews: 670,
          privacy: { showEmail: false, showLocation: true, showCompany: true, showPhone: false }
        },
        {
          id: '8', name: 'Neha Gupta', email: 'neha@sap.com', batch: '2015', course: 'B.Com',
          company: 'SAP', position: 'Solution Architect', location: 'Munich',
          skills: ['SAP', 'Enterprise Architecture', 'ABAP', 'Cloud'], experience: 9, isOnline: true,
          lastActive: '10 min ago', connections: 278, profileViews: 1340,
          privacy: { showEmail: true, showLocation: false, showCompany: true, showPhone: false }
        }
      ];
      
      setAlumni(mockAlumni);
      setFilteredAlumni(mockAlumni);
      
      // Generate connection suggestions
      const suggestions = mockAlumni.filter(a => a.isOnline).slice(0, 3);
      setSuggestions(suggestions);
      
      setIsLoading(false);
    };
    
    loadAlumniData();
  }, []);

  // Real-time filtering and search
  useEffect(() => {
    let filtered = alumni;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(person =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Advanced filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter(person => {
          const personValue = person[key as keyof Alumni];
          if (key === 'skills') {
            return person.skills.some(skill => 
              skill.toLowerCase().includes(value.toLowerCase())
            );
          }
          if (key === 'experience') {
            const exp = parseInt(value);
            return person.experience >= exp;
          }
          return String(personValue).toLowerCase().includes(value.toLowerCase());
        });
      }
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'batch':
          return parseInt(b.batch) - parseInt(a.batch);
        case 'company':
          return a.company.localeCompare(b.company);
        case 'connections':
          return b.connections - a.connections;
        case 'views':
          return b.profileViews - a.profileViews;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredAlumni(filtered);
  }, [alumni, searchQuery, filters, sortBy]);

  const uniqueValues = useMemo(() => ({
    batches: [...new Set(alumni.map(a => a.batch))].sort(),
    courses: [...new Set(alumni.map(a => a.course))].sort(),
    companies: [...new Set(alumni.map(a => a.company))].sort(),
    locations: [...new Set(alumni.map(a => a.location))].sort(),
    skills: [...new Set(alumni.flatMap(a => a.skills))].sort()
  }), [alumni]);

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({
      batch: '', course: '', company: '', location: '', skills: '', experience: ''
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="h-10 bg-gray-200 rounded"></div>)}
          </div>
          <div className="grid grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-48 bg-gray-200 rounded"></div>)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <span className="text-2xl mr-3">📊</span>
          <div>
            <h3 className="text-2xl font-bold text-blue-800">Dynamic Alumni Directory</h3>
            <p className="text-gray-600">Real-time search • {filteredAlumni.length} of {alumni.length} alumni</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            🔲 Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            📋 List
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="grid lg:grid-cols-4 gap-4 mb-4">
          <div className="lg:col-span-2">
            <input
              type="text"
              placeholder="🔍 Search by name, company, position, or skills..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="name">Sort by Name</option>
            <option value="batch">Sort by Batch</option>
            <option value="company">Sort by Company</option>
            <option value="connections">Sort by Connections</option>
            <option value="views">Sort by Profile Views</option>
          </select>
          <button
            onClick={clearFilters}
            className="bg-red-100 text-red-700 px-4 py-3 rounded-lg font-semibold hover:bg-red-200 transition-colors"
          >
            🗑️ Clear All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filters.batch}
            onChange={(e) => setFilters({...filters, batch: e.target.value})}
          >
            <option value="">All Batches</option>
            {uniqueValues.batches.map(batch => (
              <option key={batch} value={batch}>{batch}</option>
            ))}
          </select>

          <select
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filters.course}
            onChange={(e) => setFilters({...filters, course: e.target.value})}
          >
            <option value="">All Courses</option>
            {uniqueValues.courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>

          <select
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filters.company}
            onChange={(e) => setFilters({...filters, company: e.target.value})}
          >
            <option value="">All Companies</option>
            {uniqueValues.companies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>

          <select
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
          >
            <option value="">All Locations</option>
            {uniqueValues.locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Skills..."
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filters.skills}
            onChange={(e) => setFilters({...filters, skills: e.target.value})}
          />

          <input
            type="number"
            placeholder="Min Experience"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filters.experience}
            onChange={(e) => setFilters({...filters, experience: e.target.value})}
          />
        </div>
      </div>

      {/* Connection Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <h4 className="font-bold text-green-800 mb-3">💡 Suggested Connections (Online Now)</h4>
          <div className="flex space-x-4 overflow-x-auto">
            {suggestions.map(person => (
              <div key={person.id} className="flex-shrink-0 bg-white rounded-lg p-3 border border-green-200 min-w-[200px]">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-2">
                    <div className="font-semibold text-sm">{person.name}</div>
                    <div className="text-xs text-green-600">🟢 Online</div>
                  </div>
                </div>
                <div className="text-xs text-gray-600">{person.company}</div>
                <button className="w-full mt-2 bg-green-600 text-white py-1 rounded text-xs font-semibold hover:bg-green-700">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alumni Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAlumni.map(person => (
            <div key={person.id} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-lg transition-all hover:scale-105">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-3">
                    <h5 className="font-bold text-gray-800">{person.name}</h5>
                    <p className="text-xs text-gray-600">Batch {person.batch} • {person.course}</p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${person.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-sm">
                  <span className="font-semibold text-blue-600">
                    {person.privacy.showCompany ? person.company : 'Company Private'}
                  </span>
                  <div className="text-gray-700">{person.position}</div>
                  <div className="text-gray-600">
                    📍 {person.privacy.showLocation ? person.location : 'Location Private'}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {person.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                      {skill}
                    </span>
                  ))}
                  {person.skills.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      +{person.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                <span>👥 {person.connections} connections</span>
                <span>👁️ {person.profileViews} views</span>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
                  Connect
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAlumni.map(person => (
            <div key={person.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-800">{person.name}</h5>
                    <p className="text-sm text-gray-600">{person.position} at {person.privacy.showCompany ? person.company : 'Private Company'}</p>
                    <p className="text-xs text-gray-500">Batch {person.batch} • {person.course} • 📍 {person.privacy.showLocation ? person.location : 'Private'}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right text-sm">
                    <div className="text-gray-600">👥 {person.connections} • 👁️ {person.profileViews}</div>
                    <div className={`text-xs ${person.isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                      {person.isOnline ? '🟢 Online' : `Last seen ${person.lastActive}`}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
                      Connect
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm">
                      Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredAlumni.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h4 className="text-xl font-bold text-gray-800 mb-2">No Alumni Found</h4>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
          <button
            onClick={clearFilters}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}