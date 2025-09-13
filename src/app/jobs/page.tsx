'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function JobsPage() {

  const jobs = [
    { id: 1, title: 'Senior Software Engineer', company: 'Tech Solutions Inc.', location: 'Mumbai', type: 'Full Time', salary: '₹15-25 LPA', posted: '2 days ago' },
    { id: 2, title: 'Product Manager', company: 'StartupXYZ', location: 'Bangalore', type: 'Full Time', salary: '₹20-30 LPA', posted: '1 week ago' },
    { id: 3, title: 'Data Analyst', company: 'Analytics Corp', location: 'Remote', type: 'Remote', salary: '₹8-15 LPA', posted: '3 days ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Image src="/SAC-header.png" alt="St Andrews College" width={40} height={40} className="rounded-full" />
              <h1 className="text-xl font-bold text-black">St Andrews Alumni Portal</h1>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-600 hover:text-black">Dashboard</Link>
              <Link href="/directory" className="text-gray-600 hover:text-black">Directory</Link>
              <Link href="/events" className="text-gray-600 hover:text-black">Events</Link>
              <Link href="/jobs" className="text-red-600 font-semibold">Jobs</Link>
              <Link href="/news" className="text-gray-600 hover:text-black">News</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-black mb-8">Job Board</h1>

        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm w-fit">
          <button className="px-6 py-2 rounded-md font-semibold bg-red-600 text-white">Browse Jobs</button>
          <button className="px-6 py-2 rounded-md font-semibold text-gray-600 hover:text-black">Post Job</button>
          <button className="px-6 py-2 rounded-md font-semibold text-gray-600 hover:text-black">My Applications</button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                placeholder="Search jobs by title, company, or skills..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Search
              </button>
            </div>

            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">{job.title}</h3>
                    <p className="text-gray-600 mb-1">{job.company}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>📍 {job.location}</span>
                      <span>💼 {job.type}</span>
                      <span>💰 {job.salary}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{job.posted}</span>
                </div>
                <p className="text-gray-600 mb-4">Looking for experienced professionals to join our growing team...</p>
                <div className="flex space-x-3">
                  <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                    Apply Now
                  </button>
                  <button className="border border-gray-300 text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    Save Job
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-black mb-4">Job Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Job Type</label>
                  <div className="space-y-2">
                    {['Full Time', 'Part Time', 'Remote', 'Contract'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                        <span className="ml-2 text-gray-600">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
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