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
    <div className="min-h-screen bg-theme-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-theme-primary mb-8">Job Board</h1>
        <div className="flex flex-wrap gap-1 mb-8 bg-theme-surface rounded-lg p-1 shadow-sm w-fit">
          {['browse', 'post', 'applications'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                activeTab === tab ? 'bg-theme-primary text-white' : 'text-theme-secondary hover:text-theme-primary'
              }`}
            >
              {tab === 'browse' ? 'Browse Jobs' : tab === 'post' ? 'Post Job' : 'My Applications'}
            </button>
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <input 
                type="text" 
                placeholder="Search jobs by title, company, or skills..." 
                className="flex-1 px-4 py-3 border border-theme rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-theme-primary bg-theme-surface text-theme-primary text-lg" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <p className="text-theme-secondary mb-6 text-lg">Showing {filteredJobs.length} jobs</p>
            {filteredJobs.map((job) => (
              <div key={job.id} className="card p-6 hover:shadow-lg transition-all">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-theme-primary mb-2">{job.title}</h3>
                    <p className="text-theme-secondary mb-2">{job.company}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-theme-secondary">
                      <span>{job.location}</span>
                      <span>{job.type}</span>
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  <span className="text-sm text-theme-secondary self-start">{job.posted}</span>
                </div>
                <p className="text-theme-secondary mb-4">Looking for experienced professionals to join our growing team...</p>
                <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
                  <button 
                    onClick={() => handleApply(job.id)}
                    disabled={appliedJobs.includes(job.id)}
                    className={`btn px-6 py-2 rounded-lg font-semibold transition-colors ${
                      appliedJobs.includes(job.id)
                        ? 'bg-green-600 text-white cursor-not-allowed'
                        : 'bg-theme-primary text-white hover:bg-theme-primary-hover'
                    }`}
                  >
                    {appliedJobs.includes(job.id) ? 'Applied ✓' : 'Apply Now'}
                  </button>
                  <button 
                    onClick={() => handleSave(job.id)}
                    className={`btn border px-6 py-2 rounded-lg font-semibold transition-colors ${
                      savedJobs.includes(job.id)
                        ? 'border-theme-primary bg-theme-primary/10 text-theme-primary'
                        : 'border-theme text-theme-primary hover:bg-theme-background'
                    }`}
                  >
                    {savedJobs.includes(job.id) ? 'Saved ♥' : 'Save Job'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-bold text-theme-primary mb-6 text-lg">Job Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-theme-primary mb-2">Job Type</label>
                  <div className="space-y-2">
                    {['Full Time', 'Part Time', 'Remote', 'Contract'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded border-theme text-theme-primary focus:ring-theme-primary" 
                          checked={selectedFilters.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFilters(prev => [...prev, type]);
                            } else {
                              setSelectedFilters(prev => prev.filter(f => f !== type));
                            }
                          }}
                        />
                        <span className="ml-2 text-theme-secondary">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedFilters([])}
                  className="btn w-full bg-theme-primary text-white py-3 rounded-lg font-semibold hover:bg-theme-primary-hover"
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