'use client';

import Navbar from '@/components/Navbar';
import ProfileManager from '@/components/ProfileManager';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">My Profile</h1>
          <p className="text-gray-600 text-lg">Manage your account settings and privacy preferences</p>
        </div>
        
        <ProfileManager />
      </div>
    </div>
  );
}