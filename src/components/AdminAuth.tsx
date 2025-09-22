'use client';

import { useState } from 'react';

interface AdminAuthProps {
  onAuthenticated: () => void;
}

export default function AdminAuth({ onAuthenticated }: AdminAuthProps) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Check credentials
    if (credentials.username === 'SPDCAdmin' && credentials.password === 'Admin@SPDC') {
      setTimeout(() => {
        setIsLoading(false);
        onAuthenticated();
      }, 500);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setError('Invalid username or password');
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-theme-background flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-theme-primary">Admin Access</h2>
          <p className="mt-2 text-theme-secondary">Enter your credentials to continue</p>
        </div>
        
        <form className="card p-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">
              Username
            </label>
            <input
              type="text"
              required
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full px-4 py-3 border border-theme rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-theme-primary bg-theme-surface text-theme-primary"
              placeholder="Enter username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-4 py-3 border border-theme rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-theme-primary bg-theme-surface text-theme-primary"
              placeholder="Enter password"
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-theme-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-theme-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}