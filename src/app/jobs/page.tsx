'use client';

import Navbar from '@/components/Navbar';

export default function JobsPage() {
  const jobs = [
    { id: 1, title: 'Senior Software Engineer', company: 'Tech Solutions Inc.', location: 'Mumbai', type: 'Full Time', salary: '₹15-25 LPA', posted: '2 days ago' },
    { id: 2, title: 'Product Manager', company: 'StartupXYZ', location: 'Bangalore', type: 'Full Time', salary: '₹20-30 LPA', posted: '1 week ago' },
    { id: 3, title: 'Data Analyst', company: 'Analytics Corp', location: 'Remote', type: 'Remote', salary: '₹8-15 LPA', posted: '3 days ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-6 lg:mb-8">Job Board</h1>
        <div className="flex flex-wrap gap-1 mb-6 lg:mb-8 bg-white rounded-lg p-1 shadow-sm w-fit">
          <button className="px-4 lg:px-6 py-2 rounded-md font-semibold bg-red-600 text-white text-sm lg:text-base">Browse Jobs</button>
          <button className="px-4 lg:px-6 py-2 rounded-md font-semibold text-gray-600 hover:text-black text-sm lg:text-base">Post Job</button>
          <button className="px-4 lg:px-6 py-2 rounded-md font-semibold text-gray-600 hover:text-black text-sm lg:text-base">My Applications</button>
        </div>
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-6">
              <input type="text" placeholder="Search jobs by title, company, or skills..." className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm lg:text-base" />
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm lg:text-base">
                Search
              </button>
            </div>
            {jobs.map((job) => (
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
                  <button className="bg-red-600 text-white px-4 lg:px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm lg:text-base">
                    Apply Now
                  </button>
                  <button className="border border-gray-300 text-black px-4 lg:px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm lg:text-base">
                    Save Job
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
                        <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                        <span className="ml-2 text-gray-600 text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}