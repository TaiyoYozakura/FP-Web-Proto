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
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-blue-600 mb-2">Alumni Network</h1>
            <p className="text-gray-600 text-lg">Connect with 1500+ alumni worldwide</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setActiveView('directory')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeView === 'directory' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-blue-600 border border-blue-300 hover:bg-blue-50'
              }`}
            >
              📋 Directory
            </button>
            <button
              onClick={() => setActiveView('map')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
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