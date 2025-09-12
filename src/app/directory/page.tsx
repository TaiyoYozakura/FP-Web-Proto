'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    year: '',
    location: ''
  });

  const alumni = [
    { id: 1, name: 'John Smith', batch: '2015', position: 'Software Engineer', company: 'Tech Corp', location: 'Mumbai' },
    { id: 2, name: 'Sarah Johnson', batch: '2018', position: 'Product Manager', company: 'StartupXYZ', location: 'Bangalore' },
    { id: 3, name: 'Michael Brown', batch: '2012', position: 'Data Scientist', company: 'Analytics Inc', location: 'Pune' },
    { id: 4, name: 'Emily Davis', batch: '2020', position: 'Marketing Manager', company: 'Brand Co', location: 'Delhi' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Image src="/SAC-header.png" alt="St Andrews College" width={40} height={40} className="rounded-full" />
              <h1 className="text-xl font-bold text-black">St Andrews Alumni Portal</h1>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-600 hover:text-black">Dashboard</Link>
              <Link href="/directory" className="text-red-600 font-semibold">Directory</Link>
              <Link href="/events" className="text-gray-600 hover:text-black">Events</Link>
              <Link href="/jobs" className="text-gray-600 hover:text-black">Jobs</Link>
              <Link href="/news" className="text-gray-600 hover:text-black">News</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-black mb-4">Filter Alumni</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Graduation Year</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    value={filters.year}
                    onChange={(e) => setFilters({...filters, year: e.target.value})}
                  >
                    <option value="">All Years</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="City or Country"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                  />
                </div>

                <button className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-black mb-4">Alumni Directory</h1>
              
              {/* Search Bar */}
              <div className="flex gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Search alumni by name, company, or position..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Alumni Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {alumni.map((person) => (
                <div key={person.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-bold text-black text-lg">{person.name}</h3>
                      <p className="text-gray-600">Class of {person.batch}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-black font-semibold">{person.position}</p>
                    <p className="text-gray-600">{person.company}</p>
                    <p className="text-gray-600">📍 {person.location}</p>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                      Connect
                    </button>
                    <button className="flex-1 border border-gray-300 text-black py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg">1</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}