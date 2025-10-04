'use client';

import { useState, useRef } from 'react';
import { useSession } from 'next-auth/react';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  batch: string;
  course: string;
  company: string;
  position: string;
  location: string;
  bio: string;
  skills: string[];
  linkedin: string;
  website: string;
  avatar: string;
  privacy: {
    showEmail: boolean;
    showPhone: boolean;
    showLocation: boolean;
    showCompany: boolean;
  };
}

export default function ProfileManager() {
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'professional' | 'privacy' | 'security'>('basic');
  
  const [profile, setProfile] = useState<ProfileData>({
    name: session?.user?.name || 'Alumni User',
    email: session?.user?.email || 'alumni@example.com',
    phone: '+91 98765 43210',
    batch: '2020',
    course: 'B.Com',
    company: 'Tech Corp',
    position: 'Software Engineer',
    location: 'Mumbai',
    bio: 'Passionate about technology and innovation. Love to connect with fellow alumni.',
    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
    linkedin: 'https://linkedin.com/in/alumni',
    website: 'https://alumni-portfolio.com',
    avatar: '',
    privacy: {
      showEmail: false,
      showPhone: false,
      showLocation: true,
      showCompany: true
    }
  });

  const [newSkill, setNewSkill] = useState('');
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsEditing(false);
    alert('✅ Profile updated successfully!');
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({ ...prev, avatar: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      alert('❌ New passwords do not match');
      return;
    }
    if (passwords.new.length < 6) {
      alert('❌ Password must be at least 6 characters');
      return;
    }
    
    // Simulate password change
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPasswords({ current: '', new: '', confirm: '' });
    alert('✅ Password changed successfully!');
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <span className="text-2xl mr-3">👤</span>
          <h3 className="text-2xl font-bold text-blue-800">Profile Management</h3>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
              >
                {isSaving ? '💾 Saving...' : '✅ Save Changes'}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              ✏️ Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white text-2xl font-bold">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            {isEditing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 shadow-lg"
              >
                📷
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-gray-800">{profile.name}</h4>
            <p className="text-gray-600">{profile.position} at {profile.company}</p>
            <p className="text-sm text-gray-500">Batch {profile.batch} • {profile.course}</p>
            <div className="flex items-center mt-2 space-x-4">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                🟢 Online
              </span>
              <span className="text-gray-600 text-sm">📍 {profile.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 bg-gray-100 rounded-lg p-1">
        {[
          { key: 'basic', label: 'Basic Info', icon: '📝' },
          { key: 'professional', label: 'Professional', icon: '💼' },
          { key: 'privacy', label: 'Privacy', icon: '🔒' },
          { key: 'security', label: 'Security', icon: '🛡️' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === tab.key
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-blue-600 hover:bg-white'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'basic' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              disabled={!isEditing}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
      )}

      {activeTab === 'professional' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Graduation Year</label>
              <select
                value={profile.batch}
                onChange={(e) => setProfile(prev => ({ ...prev, batch: e.target.value }))}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              >
                {Array.from({length: 20}, (_, i) => 2024 - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Course</label>
              <select
                value={profile.course}
                onChange={(e) => setProfile(prev => ({ ...prev, course: e.target.value }))}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              >
                <option value="B.Com">B.Com</option>
                <option value="B.A">B.A</option>
                <option value="B.Sc">B.Sc</option>
                <option value="M.Com">M.Com</option>
                <option value="M.A">M.A</option>
                <option value="M.Sc">M.Sc</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
              <input
                type="text"
                value={profile.company}
                onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Position</label>
              <input
                type="text"
                value={profile.position}
                onChange={(e) => setProfile(prev => ({ ...prev, position: e.target.value }))}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Skills</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center"
                >
                  {skill}
                  {isEditing && (
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>
            {isEditing && (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <button
                  onClick={addSkill}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn URL</label>
              <input
                type="url"
                value={profile.linkedin}
                onChange={(e) => setProfile(prev => ({ ...prev, linkedin: e.target.value }))}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
              <input
                type="url"
                value={profile.website}
                onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'privacy' && (
        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-yellow-800 mb-2">🔒 Privacy Settings</h4>
            <p className="text-sm text-yellow-700">
              Control what information is visible to other alumni in the directory and success map.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { key: 'showEmail', label: 'Show Email Address', desc: 'Other alumni can see your email' },
              { key: 'showPhone', label: 'Show Phone Number', desc: 'Other alumni can see your phone' },
              { key: 'showLocation', label: 'Show Location', desc: 'Your city will be visible on maps' },
              { key: 'showCompany', label: 'Show Company', desc: 'Your workplace will be visible' }
            ].map((setting) => (
              <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h5 className="font-semibold text-gray-800">{setting.label}</h5>
                  <p className="text-sm text-gray-600">{setting.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.privacy[setting.key as keyof typeof profile.privacy]}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      privacy: { ...prev.privacy, [setting.key]: e.target.checked }
                    }))}
                    disabled={!isEditing}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-red-800 mb-2">🛡️ Security Settings</h4>
            <p className="text-sm text-red-700">
              Keep your account secure by updating your password regularly.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                value={passwords.current}
                onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={passwords.new}
                onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm new password"
              />
            </div>
            <button
              onClick={handlePasswordChange}
              disabled={!passwords.current || !passwords.new || !passwords.confirm}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🔐 Change Password
            </button>
          </div>

          <div className="border-t pt-6">
            <h5 className="font-semibold text-gray-800 mb-4">Account Actions</h5>
            <div className="space-y-3">
              <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h6 className="font-semibold text-gray-800">Download My Data</h6>
                    <p className="text-sm text-gray-600">Get a copy of all your profile data</p>
                  </div>
                  <span className="text-blue-600">📥</span>
                </div>
              </button>
              <button className="w-full text-left p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h6 className="font-semibold text-red-800">Delete Account</h6>
                    <p className="text-sm text-red-600">Permanently delete your account and data</p>
                  </div>
                  <span className="text-red-600">🗑️</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}