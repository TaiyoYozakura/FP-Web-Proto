'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('about');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 lg:p-8 mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-8">
            <div className="relative">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl lg:text-4xl font-bold">
                JD
              </div>
              <button className="absolute bottom-0 right-0 bg-white border-2 border-gray-300 rounded-full p-1 lg:p-2 hover:bg-gray-50 text-xs lg:text-base">
                📷
              </button>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-2xl lg:text-3xl font-bold text-black mb-2">John Doe</h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-2">Software Engineer at Tech Corp</p>
              <p className="text-gray-600 mb-3 lg:mb-4 text-sm lg:text-base">Class of 2015 • Mumbai, Maharashtra</p>
              <p className="text-gray-600 mb-4 lg:mb-6 text-sm lg:text-base">john.doe@email.com</p>
              <div className="flex flex-col sm:flex-row gap-2 lg:gap-4">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-red-600 text-white px-4 lg:px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm lg:text-base"
                >
                  {isEditing ? 'Save Profile' : 'Edit Profile'}
                </button>
                <button className="border border-gray-300 text-black px-4 lg:px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm lg:text-base">
                  Change Photo
                </button>
              </div>
            </div>
            <div className="text-center">
              <div className="flex sm:flex-col gap-4 sm:gap-2">
                <div className="bg-gray-100 px-3 lg:px-4 py-2 rounded-lg">
                  <p className="text-xs lg:text-sm text-gray-600">Profile Views</p>
                  <p className="text-xl lg:text-2xl font-bold text-black">234</p>
                </div>
                <div className="bg-gray-100 px-3 lg:px-4 py-2 rounded-lg">
                  <p className="text-xs lg:text-sm text-gray-600">Connections</p>
                  <p className="text-xl lg:text-2xl font-bold text-black">567</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex flex-wrap gap-1 mb-6 lg:mb-8 bg-white rounded-lg p-1 shadow-sm w-fit">
          {['about', 'experience', 'education', 'skills'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 lg:px-6 py-2 rounded-md font-semibold transition-colors capitalize text-sm lg:text-base ${
                activeTab === tab ? 'bg-red-600 text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'about' && (
              <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
                <h2 className="text-lg lg:text-xl font-bold text-black mb-4">About Me</h2>
                {isEditing ? (
                  <textarea
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm lg:text-base"
                    placeholder="Tell us about yourself..."
                    defaultValue="Passionate software engineer with 8+ years of experience in developing scalable web applications. Love connecting with fellow alumni and sharing knowledge."
                  />
                ) : (
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
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

          <div className="space-y-4 lg:space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
              <h3 className="font-bold text-black mb-4 text-sm lg:text-base">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-2 lg:p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-sm lg:text-base">
                  Download Resume
                </button>
                <button className="w-full text-left p-2 lg:p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-sm lg:text-base">
                  Share Profile
                </button>
                <button className="w-full text-left p-2 lg:p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-sm lg:text-base">
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