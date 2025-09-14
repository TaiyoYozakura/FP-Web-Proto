'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import { useApp } from '@/contexts/AppContext';

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('browse');
  const { state } = useApp();
  
  const filteredJobs = useMemo(() => {
    return state.jobs.filter(job => {
      const matchesSearch = !searchTerm || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = selectedFilters.length === 0 || selectedFilters.includes(job.type);
      
      return matchesSearch && matchesFilter;
    });
  }, [state.jobs, searchTerm, selectedFilters]);
  
  const handleApply = (jobId: string) => {
    setAppliedJobs(prev => [...prev, jobId]);
  };
  
  const handleSave = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-6 lg:mb-8">Job Board</h1>
        <div className="flex flex-wrap gap-1 mb-6 lg:mb-8 bg-white rounded-lg p-1 shadow-sm w-fit">
          {['browse', 'post', 'applications'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 lg:px-6 py-2 rounded-md font-semibold text-sm lg:text-base transition-colors ${
                activeTab === tab ? 'bg-red-600 text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              {tab === 'browse' ? 'Browse Jobs' : tab === 'post' ? 'Post Job' : 'My Applications'}
            </button>
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-6">
              <input 
                type="text" 
                placeholder="Search jobs by title, company, or skills..." 
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm lg:text-base" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <p className="text-gray-600 mb-4">Showing {filteredJobs.length} jobs</p>
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-sm p-4 lg:p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-black mb-2">{job.title}</h3>
                    <p className="text-gray-600 mb-2 text-sm lg:text-base">{job.company}</p>
                    <div className="flex flex-wrap gap-2 lg:gap-4 text-xs lg:text-sm text-gray-600">
                      <span>📍 {job.location}</span>
                      <span>💼 {job.type}</span>
                      <span>💰 {job.salary}</span>
                    </div>
                  </div>
                  <span className="text-xs lg:text-sm text-gray-500 self-start">{job.posted}</span>
                </div>
                <p className="text-gray-600 mb-4 text-sm lg:text-base">Looking for experienced professionals to join our growing team...</p>
                <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
                  <button 
                    onClick={() => handleApply(job.id)}
                    disabled={appliedJobs.includes(job.id)}
                    className={`px-4 lg:px-6 py-2 rounded-lg font-semibold transition-colors text-sm lg:text-base ${
                      appliedJobs.includes(job.id)
                        ? 'bg-green-600 text-white cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    {appliedJobs.includes(job.id) ? 'Applied ✓' : 'Apply Now'}
                  </button>
                  <button 
                    onClick={() => handleSave(job.id)}
                    className={`border px-4 lg:px-6 py-2 rounded-lg font-semibold transition-colors text-sm lg:text-base ${
                      savedJobs.includes(job.id)
                        ? 'border-red-600 bg-red-50 text-red-600'
                        : 'border-gray-300 text-black hover:bg-gray-50'
                    }`}
                  >
                    {savedJobs.includes(job.id) ? 'Saved ♥' : 'Save Job'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4 lg:space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
              <h3 className="font-bold text-black mb-4 text-sm lg:text-base">Job Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs lg:text-sm font-semibold text-black mb-2">Job Type</label>
                  <div className="space-y-2">
                    {['Full Time', 'Part Time', 'Remote', 'Contract'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                          checked={selectedFilters.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFilters(prev => [...prev, type]);
                            } else {
                              setSelectedFilters(prev => prev.filter(f => f !== type));
                            }
                          }}
                        />
                        <span className="ml-2 text-gray-600 text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedFilters([])}
                  className="w-full bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-sm"
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