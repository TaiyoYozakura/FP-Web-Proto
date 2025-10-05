'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import AlumniSuccessMap from '@/components/AlumniSuccessMap';
import DynamicAlumniDirectory from '@/components/DynamicAlumniDirectory';
import { useApp } from '@/contexts/AppContext';

export default function DirectoryPage() {
  const [activeView, setActiveView] = useState<'directory' | 'map'>('directory');
  const { state } = useApp();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 md:mb-8 gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">Alumni Network</h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">Connect with 1500+ alumni worldwide</p>
          </div>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => setActiveView('directory')}
              className={`flex-1 sm:flex-none px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all ${
                activeView === 'directory' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-blue-600 border border-blue-300 hover:bg-blue-50'
              }`}
            >
              📋 Directory
            </button>
            <button
              onClick={() => setActiveView('map')}
              className={`flex-1 sm:flex-none px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all ${
                activeView === 'map' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-blue-600 border border-blue-300 hover:bg-blue-50'
              }`}
            >
              🌍 Success Map
            </button>
          </div>
        </div>
        
        {activeView === 'directory' ? (
          <DynamicAlumniDirectory />
        ) : (
          <AlumniSuccessMap />
        )}
      </div>
    </div>
  );
}