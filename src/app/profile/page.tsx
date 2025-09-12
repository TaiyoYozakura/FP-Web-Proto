'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('about');
  const [isEditing, setIsEditing] = useState(false);

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
              <Link href="/jobs" className="text-gray-600 hover:text-black">Jobs</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <div className="w-32 h-32 bg-red-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                JD
              </div>
              <button className="absolute bottom-0 right-0 bg-white border-2 border-gray-300 rounded-full p-2 hover:bg-gray-50">
                📷
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-black mb-2">John Doe</h1>
              <p className="text-xl text-gray-600 mb-2">Software Engineer at Tech Corp</p>
              <p className="text-gray-600 mb-4">Class of 2015 • Mumbai, Maharashtra</p>
              <p className="text-gray-600 mb-6">john.doe@email.com</p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  {isEditing ? 'Save Profile' : 'Edit Profile'}
                </button>
                <button className="border border-gray-300 text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Change Photo
                </button>
              </div>
            </div>
            <div className="text-center">
              <div className="space-y-2">
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <p className="text-sm text-gray-600">Profile Views</p>
                  <p className="text-2xl font-bold text-black">234</p>
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <p className="text-sm text-gray-600">Connections</p>
                  <p className="text-2xl font-bold text-black">567</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm w-fit">
          {['about', 'experience', 'education', 'skills'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md font-semibold transition-colors capitalize ${
                activeTab === tab ? 'bg-red-600 text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'about' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-black mb-4">About Me</h2>
                {isEditing ? (
                  <textarea
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Tell us about yourself..."
                    defaultValue="Passionate software engineer with 8+ years of experience in developing scalable web applications. Love connecting with fellow alumni and sharing knowledge."
                  />
                ) : (
                  <p className="text-gray-600 leading-relaxed">
                    Passionate software engineer with 8+ years of experience in developing scalable web applications. 
                    Love connecting with fellow alumni and sharing knowledge.
                  </p>
                )}
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-black mb-4">Professional Experience</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-red-600 pl-4">
                    <h3 className="font-bold text-black">Senior Software Engineer</h3>
                    <p className="text-red-600 font-semibold">Tech Corp</p>
                    <p className="text-gray-600">Jan 2020 - Present • Mumbai</p>
                    <p className="text-gray-600 mt-2">Leading development of cloud-based solutions...</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-black mb-4">Education</h2>
                <div className="border-l-4 border-red-600 pl-4">
                  <h3 className="font-bold text-black">Bachelor of Computer Science</h3>
                  <p className="text-red-600 font-semibold">St Andrews College Bandra West</p>
                  <p className="text-gray-600">2012 - 2015</p>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-black mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'].map((skill) => (
                    <span key={skill} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-black mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                  Download Resume
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                  Share Profile
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                  Privacy Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}