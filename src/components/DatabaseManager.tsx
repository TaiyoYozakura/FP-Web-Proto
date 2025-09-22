'use client';

import { useState, useEffect } from 'react';
import { DatabaseConfig } from '@/lib/database';

export default function DatabaseManager() {
  const [configs, setConfigs] = useState<DatabaseConfig[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/database');
      const data = await response.json();
      setConfigs(data.configs || []);
      setError('');
    } catch {
      setError('Failed to load database configurations');
    } finally {
      setLoading(false);
    }
  };

  const handleSetActive = async (id: string) => {
    try {
      const response = await fetch('/api/database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'setActive', id })
      });
      
      if (response.ok) {
        fetchConfigs();
      } else {
        setError('Failed to set active database');
      }
    } catch {
      setError('Network error occurred');
    }
  };

  if (loading) {
    return (
      <div className="card p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-theme-primary">Database Connections</h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-theme-primary text-white px-4 py-2 rounded-lg text-sm"
        >
          {showAddForm ? 'Cancel' : 'Add Database'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-800 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {configs.map((config) => (
          <div key={config.id} className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-theme-primary">{config.name}</h4>
                <p className="text-sm text-theme-secondary">
                  {config.type.toUpperCase()} - {config.type === 'sqlite' ? config.path : `${config.host}:${config.port}`}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  config.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {config.isActive ? 'Active' : 'Inactive'}
                </span>
                {!config.isActive && (
                  <button
                    onClick={() => handleSetActive(config.id)}
                    className="text-theme-primary hover:text-theme-secondary text-sm font-medium"
                  >
                    Set Active
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {configs.length === 0 && (
          <div className="card p-6 text-center">
            <p className="text-theme-secondary">No database configurations found</p>
            <p className="text-sm text-theme-secondary mt-1">Add a database connection to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}