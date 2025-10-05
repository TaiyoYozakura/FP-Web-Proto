'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import { useApp } from '@/contexts/AppContext';
import { Search, MapPin, Briefcase, DollarSign, Clock, Heart, CheckCircle } from 'lucide-react';

const JobCard = ({ job, applied, saved, onApply, onSave }: any) => (
  <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all">
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
        <p className="text-gray-600 font-medium mb-2">{job.company}</p>
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{job.location}</span>
          <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" />{job.type}</span>
          <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" />{job.salary}</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{job.posted}</span>
        </div>
      </div>
    </div>
    
    <p className="text-gray-700 text-sm mb-4 leading-relaxed">Looking for experienced professionals to join our growing team...</p>
    
    <div className="flex gap-2">
      <button 
        onClick={() => onApply(job.id)}
        disabled={applied}
        className={`flex-1 px-4 py-2.5 rounded-xl font-semibold transition-all active:scale-95 ${
          applied 
            ? 'bg-green-600 text-white cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
        }`}
      >
        {applied ? <span className="flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4" />Applied</span> : 'Apply Now'}
      </button>
      <button 
        onClick={() => onSave(job.id)}
        className={`px-4 py-2.5 rounded-xl font-semibold transition-all active:scale-95 ${
          saved 
            ? 'bg-red-50 text-red-600 border-2 border-red-200' 
            : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100'
        }`}
      >
        <Heart className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
      </button>
    </div>
  </div>
);

export default function JobsPage() {
  const [search, setSearch] = useState('');
  const [applied, setApplied] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [tab, setTab] = useState('browse');
  const { state } = useApp();
  
  const filtered = useMemo(() => 
    state.jobs.filter(job => {
      const matchSearch = !search || 
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filters.length === 0 || filters.includes(job.type);
      return matchSearch && matchFilter;
    }), [state.jobs, search, filters]
  );

  const tabs = [
    { key: 'browse', label: 'Browse' },
    { key: 'post', label: 'Post' },
    { key: 'applications', label: 'Applications' }
  ];

  const filterTypes = ['Full Time', 'Part Time', 'Remote', 'Contract'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Job Board</h1>
        
        {/* Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-6 scrollbar-hide">
          {tabs.map(t => (
            <button 
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all whitespace-nowrap active:scale-95 ${
                tab === t.key 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:text-blue-600 shadow-md'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search jobs..." 
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white shadow-sm" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <p className="text-sm text-gray-600">Showing {filtered.length} jobs</p>
            
            {/* Jobs */}
            <div className="space-y-4">
              {filtered.map(job => (
                <JobCard 
                  key={job.id}
                  job={job}
                  applied={applied.includes(job.id)}
                  saved={saved.includes(job.id)}
                  onApply={(id: string) => setApplied([...applied, id])}
                  onSave={(id: string) => setSaved(saved.includes(id) ? saved.filter(s => s !== id) : [...saved, id])}
                />
              ))}
            </div>
          </div>
          
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-5 shadow-md sticky top-20">
              <h3 className="font-bold text-gray-900 mb-4">Filters</h3>
              <div className="space-y-3">
                {filterTypes.map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                      checked={filters.includes(type)}
                      onChange={(e) => setFilters(e.target.checked ? [...filters, type] : filters.filter(f => f !== type))}
                    />
                    <span className="text-gray-700 group-hover:text-blue-600 transition-colors">{type}</span>
                  </label>
                ))}
              </div>
              <button 
                onClick={() => setFilters([])}
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg active:scale-95 transition-all"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
